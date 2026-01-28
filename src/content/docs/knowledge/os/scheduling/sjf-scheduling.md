---
title: "SJF 스케줄링 (Shortest-Job-First Scheduling)"
description: "다음 CPU 버스트가 가장 짧은 프로세스에게 먼저 CPU를 할당하는 최적 스케줄링 알고리즘"
tags: ["OS", "Scheduling"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/sjf-scheduling
sidebar:
  order: 5
---

## 핵심 개념

SJF(Shortest-Job-First) 스케줄링은 다음 CPU 버스트가 **가장 짧은 프로세스**에게 먼저 CPU를 할당하는 알고리즘이다. **평균 대기 시간을 최소화**하는 것이 수학적으로 증명된 최적 알고리즘이다. 짧은 작업을 먼저 처리하면 뒤에 대기하는 프로세스들의 대기 시간을 줄일 수 있기 때문이다.

비유하면, 마트 계산대에서 물건이 적은 손님을 먼저 계산하면 전체 대기 시간이 감소하는 것이다.

## 동작 원리

### 기본 원리

1. Ready Queue의 프로세스 중 **다음 CPU 버스트가 가장 짧은 것** 선택
2. 버스트 길이가 같으면 FCFS로 결정

### CPU 버스트 예측: 지수 평균 (Exponential Average)

실제로 다음 CPU 버스트 길이를 정확히 알 수 없으므로 **과거 데이터로 예측**한다.

**τ(n+1) = α·t(n) + (1-α)·τ(n)**

- t(n): n번째 실제 CPU 버스트 길이
- τ(n): n번째 예측값
- α: 가중치 (0 ≤ α ≤ 1)

| α 값 | 의미 |
|------|------|
| α = 0 | 최근 기록 무시, 과거 예측값만 사용 |
| α = 1 | 직전 버스트만 반영 |
| α = 0.5 | 최근과 과거 기록 동등 반영 (일반적) |

### 선점형 SJF (SRTF: Shortest Remaining Time First)

새 프로세스 도착 시, **남은 시간**이 현재 실행 중인 것보다 짧으면 선점한다.

## 예시

### 비선점형 SJF

| 프로세스 | Burst Time |
|----------|------------|
| P1 | 6ms |
| P2 | 8ms |
| P3 | 7ms |
| P4 | 3ms |

```
P4  P1      P3      P2
├──┼───────┼───────┼───────┤
0  3       9      16      24

대기 시간: P4=0, P1=3, P3=9, P2=16
평균 대기 시간 = (0+3+9+16)/4 = 7ms
(FCFS라면 10.25ms)
```

### 선점형 SJF (SRTF)

| 프로세스 | 도착 | Burst |
|----------|------|-------|
| P1 | 0 | 8ms |
| P2 | 1 | 4ms |
| P3 | 2 | 9ms |
| P4 | 3 | 5ms |

```
P1 P2      P4     P1          P3
├─┼────────┼─────┼───────────┼─────────┤
0 1        5    10          17        26

평균 대기 시간 = 6.5ms (비선점형 SJF: 7.75ms)
```

## 관련 개념

- [CPU 스케줄링 (CPU Scheduling)](/knowledge/os/cpu-scheduling/) - 스케줄링의 일반 개념
- [FCFS 스케줄링](/knowledge/os/fcfs-scheduling/) - 가장 단순한 비선점형 스케줄링
- [우선순위 스케줄링](/knowledge/os/priority-scheduling/) - SJF는 버스트 길이의 역수를 우선순위로 사용하는 특수 케이스
- [라운드 로빈 스케줄링](/knowledge/os/round-robin/) - 공정성 중심의 선점형 스케줄링
