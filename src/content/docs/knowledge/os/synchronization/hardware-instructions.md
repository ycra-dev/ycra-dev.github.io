---
title: "하드웨어 동기화 명령어 (Hardware Instructions)"
description: "원자적(atomic)으로 실행되어 중간에 인터럽트되지 않는 특수 하드웨어 명령어로 상호배제를 구현"
tags: ["OS", "Synchronization", "Hardware"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/hardware-instructions
sidebar:
  order: 4
---

## 핵심 개념

하드웨어 동기화 명령어는 **원자적(atomic)**으로 실행되어 중간에 인터럽트되지 않는 특수 명령어입니다. 소프트웨어만으로는 현대 아키텍처에서 상호배제 보장이 어려우므로, 하드웨어 수준의 원자적 연산이 필요합니다. 고수준 동기화 도구(Mutex, Semaphore)의 기반이 됩니다.

## 동작 원리

### test_and_set()

```c
// 원자적으로 실행됨
boolean test_and_set(boolean *target) {
    boolean rv = *target;  // 현재 값 읽기
    *target = true;        // true로 설정
    return rv;             // 이전 값 반환
}
```

### compare_and_swap() (CAS)

```c
// 원자적으로 실행됨
int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;  // 예상값과 같을 때만 교체
    return temp;             // 이전 값 반환
}
```

두 명령어가 동시에 실행되면 하드웨어가 순차적으로 실행되도록 강제합니다.

## 예시

### test_and_set을 이용한 상호배제

```c
boolean lock = false;

do {
    while (test_and_set(&lock))
        ;  // busy wait - lock이 false가 될 때까지

    /* critical section */

    lock = false;

    /* remainder section */
} while (true);
```

### CAS를 이용한 상호배제

```c
int lock = 0;

while (true) {
    while (compare_and_swap(&lock, 0, 1) != 0)
        ;  // busy wait

    /* critical section */

    lock = 0;

    /* remainder section */
}
```

### Bounded Waiting을 보장하는 CAS

```c
boolean waiting[n];  // 모두 false로 초기화
int lock = 0;

while (true) {
    waiting[i] = true;
    key = 1;
    while (waiting[i] && key == 1)
        key = compare_and_swap(&lock, 0, 1);
    waiting[i] = false;

    /* critical section */

    j = (i + 1) % n;
    while ((j != i) && !waiting[j])
        j = (j + 1) % n;

    if (j == i)
        lock = 0;
    else
        waiting[j] = false;  // 다음 프로세스에게 양보

    /* remainder section */
}
```

### Intel x86의 CAS 구현

```asm
lock cmpxchg <destination>, <source>
; lock 접두어가 버스를 잠가 원자성 보장
```

### 장단점

| 장점 | 단점 |
|------|------|
| 하드웨어가 원자성 보장 | 응용 프로그래머가 직접 사용하기 어려움 |
| 멀티프로세서에서도 동작 | Busy waiting으로 CPU 낭비 |
| 고수준 동기화 도구의 기반 | 단순 CAS는 bounded waiting 미보장 |

## 관련 개념

- [임계구역 문제 (Critical Section Problem)](/knowledge/os/critical-section/)
- [원자적 변수 (Atomic Variable)](/knowledge/os/atomic-variable/)
