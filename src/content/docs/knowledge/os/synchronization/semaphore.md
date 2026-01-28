---
title: "세마포어 (Semaphore)"
description: "정수 값을 가지며 wait()과 signal() 두 원자적 연산으로만 접근하는 동기화 도구"
tags: ["OS", "Synchronization"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/semaphore
sidebar:
  order: 8
---

## 핵심 개념

세마포어(Semaphore)는 정수 값을 가지며 **wait()과 signal()** 두 원자적 연산으로만 접근하는 동기화 도구이다. Edsger Dijkstra가 제안했으며, 뮤텍스보다 표현력이 높아 자원 관리와 순서 제어 등 **다양한 동기화 문제**를 해결할 수 있다.

비유하면, 주차장 관리 시스템이다. 세마포어 값 = 남은 주차 공간 수. 차가 들어오면 wait() → 공간 감소, 차가 나가면 signal() → 공간 증가, 공간이 0이면 대기.

## 동작 원리

### 기본 연산

- **P 연산 (wait, proberen)**: S ≤ 0이면 대기, 아니면 S-- 후 진행
- **V 연산 (signal, verhogen)**: S++ 후, 대기 중인 프로세스 깨움

### 세마포어 종류

| 종류 | 값 범위 | 용도 |
|-----|--------|------|
| **Binary Semaphore** | 0, 1 | 상호배제 (Mutex처럼 사용) |
| **Counting Semaphore** | 0 ~ N | 유한 자원 관리 (N개 자원) |

### Sleep/Wakeup 구현 (Busy Waiting 제거)

```c
typedef struct {
    int value;
    struct process *list;  // waiting queue
} semaphore;

wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        add this process to S->list;
        sleep();
    }
}

signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        remove a process P from S->list;
        wakeup(P);
    }
}
```

이 구현에서 **음수 값 = 대기 중인 프로세스 수**.

### 활용 패턴

**1. 상호배제:**
```c
semaphore mutex = 1;
wait(mutex);
/* critical section */
signal(mutex);
```

**2. 실행 순서 제어 (S1 → S2):**
```c
semaphore synch = 0;
// P1: S1; signal(synch);
// P2: wait(synch); S2;
```

**3. 유한 자원 관리 (N개 자원):**
```c
semaphore resource = N;
wait(resource);    // 자원 획득
/* use resource */
signal(resource);  // 자원 반환
```

### 흔한 실수

```c
// 실수 1: 순서 뒤바꿈 → 상호배제 위반
signal(mutex); /* CS */ wait(mutex);

// 실수 2: wait 두 번 → 영구 블록(deadlock)
wait(mutex); /* CS */ wait(mutex);

// 실수 3: wait 또는 signal 누락
```

이런 문제를 해결하기 위해 **모니터(Monitor)**가 등장했다.

## 예시

생산자-소비자 문제에서 counting semaphore 활용:
- `empty = N` (빈 슬롯 수), `full = 0` (찬 슬롯 수), `mutex = 1`
- 생산자: wait(empty) → wait(mutex) → 생산 → signal(mutex) → signal(full)
- 소비자: wait(full) → wait(mutex) → 소비 → signal(mutex) → signal(empty)

## 관련 개념

- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - 단순 상호배제 도구
- [모니터 (Monitor)](/knowledge/os/monitor/) - 구조화된 고수준 동기화 도구
- [조건 변수 (Condition Variable)](/knowledge/os/condition-variable/) - 모니터 내 대기/신호 메커니즘
- [유한 버퍼 문제 (Bounded-Buffer)](/knowledge/os/bounded-buffer/) - 세마포어 활용의 대표적 사례
