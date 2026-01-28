---
title: "FCFS 스케줄링 (First-Come, First-Served)"
description: "먼저 도착한 프로세스에게 먼저 CPU를 할당하는 가장 단순한 비선점형 스케줄링 알고리즘"
tags: ["OS", "Scheduling", "Algorithm"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/fcfs-scheduling
sidebar:
  order: 4
---

## 핵심 개념

FCFS(First-Come, First-Served)는 먼저 도착한 프로세스에게 먼저 CPU를 할당하는 가장 단순한 **비선점형** 스케줄링 알고리즘입니다. FIFO 큐 하나로 구현 가능하며, 프로세스가 종료되거나 I/O 대기에 들어갈 때까지 CPU를 점유합니다.

```
Ready Queue (FIFO):
┌────┬────┬────┬────┐
│ P4 │ P3 │ P2 │ P1 │──────▶ CPU
└────┴────┴────┴────┘
 Tail            Head
```

## 동작 원리

1. 프로세스가 도착하면 Ready Queue(FIFO)의 꼬리에 PCB 연결
2. CPU가 유휴 상태가 되면 Queue의 머리에서 프로세스 선택
3. 선택된 프로세스는 **종료되거나 I/O 대기**까지 CPU 점유 (비선점)

### 호위 효과 (Convoy Effect)

FCFS의 대표적인 문제점입니다:

- 하나의 CPU-bound 프로세스가 CPU를 점유하는 동안 여러 I/O-bound 프로세스들이 Ready Queue에서 대기
- CPU-bound 프로세스가 I/O를 시작하면 I/O-bound 프로세스들이 빠르게 실행 후 I/O 큐로 이동
- 결과: CPU와 I/O 장치 **모두** 이용률 저하

## 예시

| 프로세스 | Burst Time |
|----------|------------|
| P1 | 24ms |
| P2 | 3ms |
| P3 | 3ms |

**도착 순서 P1→P2→P3일 때:**

```
P1          P2   P3
├───────────┼───┼───┤
0          24  27  30

대기 시간: P1=0, P2=24, P3=27
평균 대기 시간 = (0+24+27)/3 = 17ms
```

**도착 순서 P2→P3→P1일 때:**

```
P2  P3  P1
├──┼──┼────────────────┤
0  3  6               30

대기 시간: P2=0, P3=3, P1=6
평균 대기 시간 = (0+3+6)/3 = 3ms
```

도착 순서에 따라 성능이 크게 달라집니다.

### 장단점

- **장점**: 구현이 매우 단순, 기아(Starvation) 발생 안 함, 오버헤드 최소
- **단점**: 호위 효과, 평균 대기 시간 비최적, 대화형 시스템에 부적합

## 관련 개념

- [CPU 스케줄링 (CPU Scheduling)](/knowledge/os/cpu-scheduling/)
- [선점형 vs 비선점형 스케줄링](/knowledge/os/preemptive-scheduling/)
- [스케줄링 평가 기준 (Scheduling Criteria)](/knowledge/os/scheduling-criteria/)
