---
title: "식사하는 철학자 문제 (Dining-Philosophers Problem)"
description: "5명의 철학자가 원형 테이블에서 5개의 젓가락을 공유하며 발생하는 교착 상태와 기아 문제를 모델링한 동기화 문제"
tags: ["OS", "Synchronization", "Deadlock"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/dining-philosophers
sidebar:
  order: 17
---

## 핵심 개념

식사하는 철학자 문제는 5명의 철학자가 원형 테이블에서 5개의 젓가락을 공유하며 식사할 때 발생하는 **교착 상태**와 **기아** 문제를 모델링한 동기화 문제입니다. 여러 프로세스가 **여러 자원을 동시에** 할당받아야 하는 상황을 대표하며, 새로운 동기화 기법 검증의 표준 문제로 사용됩니다.

```
        철학자 0
          ○
     젓가락0   젓가락1
    ○               ○ 철학자 1
철학자 4    [밥]
    ○               ○ 철학자 2
     젓가락4   젓가락2
          ○
        철학자 3
         젓가락3
```

철학자는 **생각**과 **식사**를 반복합니다. 식사하려면 **양쪽 젓가락 모두** 필요합니다.

## 동작 원리

### 세마포어 해법 (교착 상태 가능)

```c
semaphore chopstick[5];  // 모두 1로 초기화

// 철학자 i
while (true) {
    wait(chopstick[i]);           // 왼쪽 젓가락
    wait(chopstick[(i+1) % 5]);   // 오른쪽 젓가락
    /* 식사 */
    signal(chopstick[i]);
    signal(chopstick[(i+1) % 5]);
    /* 생각 */
}
```

**문제점**: 5명이 동시에 왼쪽 젓가락을 집으면 모두 오른쪽 대기 → **교착 상태**

### 교착 상태 해결책

| 해결책 | 설명 |
|--------|------|
| **최대 4명** | 동시에 테이블에 앉는 철학자 수 제한 |
| **양쪽 동시 획득** | 임계 영역 내에서 두 젓가락 모두 사용 가능할 때만 집기 |
| **비대칭 순서** | 홀수 철학자: 왼쪽→오른쪽 / 짝수 철학자: 오른쪽→왼쪽 |

### 모니터 해법 (교착 상태 없음)

```c
enum {THINKING, HUNGRY, EATING} state[5];
condition self[5];

void pickup(int i) {
    state[i] = HUNGRY;
    test(i);                      // 식사 가능한지 확인
    if (state[i] != EATING)
        self[i].wait();           // 불가능하면 대기
}

void putdown(int i) {
    state[i] = THINKING;
    test((i + 4) % 5);            // 왼쪽 이웃 확인
    test((i + 1) % 5);            // 오른쪽 이웃 확인
}

void test(int i) {
    if ((state[(i+4) % 5] != EATING) &&  // 왼쪽 이웃 식사 중 아님
        (state[i] == HUNGRY) &&          // 내가 배고픔
        (state[(i+1) % 5] != EATING)) {  // 오른쪽 이웃 식사 중 아님
        state[i] = EATING;
        self[i].signal();                // 대기 중이면 깨우기
    }
}
```

1. `pickup(i)` 호출 → HUNGRY 상태로 전환
2. 양쪽 이웃이 식사 중이 아니면 → EATING으로 전환
3. 식사 불가능 → `self[i].wait()`로 대기
4. `putdown(i)` 호출 → 이웃들의 식사 가능 여부 확인 후 깨움

모니터 해법은 교착 상태를 방지하지만 **기아는 여전히 가능**합니다 (특정 철학자가 계속 배제될 수 있음).

## 예시

은행 송금 시스템에서 유사한 문제가 발생합니다. 계좌 A→B 송금과 B→A 송금이 동시에 발생하면, 각각 A/B 락을 먼저 잡고 상대 락을 기다려 교착 상태가 됩니다.

## 관련 개념

- [교착 상태 (Deadlock)](/knowledge/os/deadlock/)
- [유한 버퍼 문제 (Bounded-Buffer Problem)](/knowledge/os/bounded-buffer/)
- [임계구역 문제 (Critical Section Problem)](/knowledge/os/critical-section/)
- [조건 변수 (Condition Variable)](/knowledge/os/condition-variable/)
