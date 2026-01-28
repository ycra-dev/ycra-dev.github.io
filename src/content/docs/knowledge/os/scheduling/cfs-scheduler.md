---
title: "CFS 스케줄러 (Completely Fair Scheduler)"
description: "고정 타임 슬라이스 대신 CPU 시간의 비율을 공정하게 할당하는 Linux 기본 스케줄러"
tags: ["OS", "Scheduling", "Linux"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/cfs-scheduler
sidebar:
  order: 13
---

## 핵심 개념

CFS(Completely Fair Scheduler)는 **모든 스레드에게 CPU 시간을 공정하게 비율로 나눠주는** Linux의 기본 스케줄러이다.

핵심 아이디어는 단순하다. N개의 실행 가능한 스레드가 있으면, 각 스레드는 **1/N의 CPU 시간**을 받아야 한다. 피자를 N명이 공평하게 나눠 먹는 것과 같다. VIP(낮은 nice 값)는 더 큰 조각을 받지만, 모든 사람이 먹을 기회는 보장된다.

전통적인 UNIX 스케줄러는 고정 타임 슬라이스를 할당했지만, CFS는 **동적으로 비율을 계산**하여 공정성과 인터랙티브 성능을 모두 잡았다.

## 동작 원리

### Linux 스케줄러 진화

| 버전 | 스케줄러 | 특징 |
|------|---------|------|
| ~커널 2.5 | 전통적 UNIX | SMP 지원 미흡, 확장성 문제 |
| 커널 2.5 | O(1) 스케줄러 | 확장성 개선, 인터랙티브 성능 저하 |
| 커널 2.6~ | **CFS** | 공정성 + 인터랙티브 성능 모두 해결 |

### Linux 우선순위 체계

```
우선순위 범위:
┌────────────────────────────────────┐
│  0 ─────────── 99  │ 100 ──── 139 │
│   실시간 태스크      │  일반 태스크   │
│ (SCHED_FIFO/RR)    │  (CFS)       │
│   높은 우선순위      │  Nice 기반    │
└────────────────────────────────────┘
                          │
                Nice -20 → 100
                Nice 0   → 120
                Nice +19 → 139
```

실시간 태스크(0-99)는 별도의 스케줄링 클래스(SCHED_FIFO, SCHED_RR)를 사용하며, **항상 CFS 태스크보다 우선**한다. CFS는 일반 태스크(100-139) 전용이다.

### 핵심 변수

1. **target latency**: 모든 실행 가능 스레드가 **최소 1번은 실행되는 간격**
   - 예: target latency = 10ms, 스레드 2개 -> 각 5ms씩 실행
2. **minimum granularity**: 스레드의 **최소 실행 시간**
   - 스레드가 너무 많아서 각 스레드의 할당 시간이 지나치게 짧아지는 것을 방지
   - 컨텍스트 스위칭 오버헤드보다 실행 시간이 짧아지면 의미가 없기 때문
3. **vruntime (가상 실행 시간)**: 각 태스크가 사용한 **가중치 적용 실행 시간**
   - CFS는 항상 **vruntime이 가장 작은 태스크**를 다음에 실행

### nice 값에 따른 가중치

| nice 값 | 의미 | 가중치 | vruntime 증가 속도 |
|---------|------|--------|-------------------|
| -20 (최고 우선순위) | 더 많은 CPU 시간 | 높음 | 느림 → 더 자주 선택 |
| 0 (기본값) | 표준 | 기준(1) | 표준 |
| +19 (최저 우선순위) | 더 적은 CPU 시간 | 낮음 | 빠름 → 덜 자주 선택 |

### vruntime 계산

```
vruntime += 실제_실행_시간 × (기준_가중치 / 태스크_가중치)
```

- 높은 우선순위(낮은 nice) → 큰 가중치 → vruntime 느리게 증가 → 더 자주 선택됨
- 낮은 우선순위(높은 nice) → 작은 가중치 → vruntime 빠르게 증가 → 덜 자주 선택됨

### 실행 시간 계산

```
스레드의 실행 시간 = target_latency x (스레드 가중치 / 전체 가중치 합)
```

nice 값이 같은 스레드들은 동일한 시간을 받고, nice 값이 낮을수록(우선순위 높을수록) 더 많은 시간을 받는다.

### Red-Black Tree 자료구조

CFS는 실행 가능 태스크를 **Red-Black Tree**에 저장한다. 키는 vruntime이다.

```
              T4 (vruntime=150)
             /                 \
     T2 (vruntime=100)    T6 (vruntime=200)
     /        \                    \
T1 (80)    T3 (120)            T7 (250)
    ↑
최소 vruntime = 다음 실행 태스크
```

- 검색: O(log N), 단 `rb_leftmost` 캐싱으로 **다음 실행 태스크 선택은 O(1)**
- 삽입/삭제: O(log N)

### I/O-bound vs CPU-bound 자동 구분

```
CPU-bound: 오래 실행 → vruntime 많이 증가 → 낮은 우선순위
I/O-bound: 짧게 실행 후 블록 → vruntime 적게 증가 → 높은 우선순위

결과: I/O-bound 태스크가 CPU를 받을 때 즉시 선점 가능
```

CFS는 별도의 I/O-bound 감지 로직 없이, vruntime 메커니즘만으로 **I/O-bound 태스크를 자연스럽게 우대**한다.

### 전통적 스케줄러 vs CFS

```
[전통적]                     [CFS]
고정 타임슬라이스            동적 비율 할당
우선순위 -> 타임슬라이스 매핑  nice -> 가중치 매핑

스레드 수 증가 시:           스레드 수 증가 시:
- 응답 시간 증가             - 각 스레드의 비율 감소
- 공정성 문제 발생 가능       - 공정성 유지 (minimum granularity까지)
```

### NUMA-aware 부하 균형

```
시스템 도메인 (전체 시스템)
├── NUMA Node 0
│   ├── Domain0 (Core0, Core1 - L2 공유)
│   └── Domain1 (Core2, Core3 - L2 공유)
└── NUMA Node 1
    ├── Domain2
    └── Domain3

부하 균형 전략:
1. 같은 Domain 내에서 먼저 균형
2. 같은 NUMA Node 내 균형
3. NUMA Node 간 균형 (메모리 지역성 비용 고려, 최후 수단)
```

태스크의 **부하(Load)**는 다음과 같이 정의한다:

```
태스크 부하 = 우선순위 × 평균 CPU 이용률
큐 부하 = Σ(태스크 부하)
균형 목표: 모든 큐의 부하를 비슷하게
```

## 예시

target latency = 10ms인 시스템에서:

**스레드 2개 (동일 nice=0)**
- 스레드 A: 5ms 실행
- 스레드 B: 5ms 실행
- 다시 A: 5ms ... 반복

**스레드 2개 (다른 nice 값)**
- 스레드 A(nice=-5, 가중치 3): 10ms x 3/4 = 7.5ms
- 스레드 B(nice=0, 가중치 1): 10ms x 1/4 = 2.5ms

**스레드 1000개**
- 계산상 각 0.01ms이지만, minimum granularity(예: 1ms)가 적용되어 각 **1ms씩** 실행
- 이 경우 전체 한 바퀴 도는 데 1000ms가 걸리므로, 완벽한 공정성은 보장 불가

## 관련 개념

- [CPU 스케줄링](/knowledge/os/cpu-scheduling/) - CFS의 상위 개념
- [선점형 스케줄링](/knowledge/os/preemptive-scheduling/) - CFS는 선점형 스케줄러
- [컨텍스트 스위치](/knowledge/os/context-switch/) - minimum granularity와 관련
- [실시간 스케줄링](/knowledge/os/realtime-scheduling/) - 실시간 태스크는 별도 스케줄링 클래스 사용
- [UNIX CPU 스케줄링](/knowledge/os/unix-cpu-scheduling/) - Linux 스케줄링 전체 구조
