---
title: "Peterson's Solution"
description: "두 프로세스 간 상호배제를 보장하는 고전적인 소프트웨어 기반 알고리즘"
tags: ["OS", "Synchronization"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/petersons-solution
sidebar:
  order: 3
---

## 핵심 개념

Peterson's Solution은 **두 프로세스 간 상호배제**를 보장하는 고전적인 소프트웨어 기반 알고리즘이다. 하드웨어 명령어에 의존하지 않고 순수 소프트웨어로 임계구역 문제를 해결하는 알고리즘적 접근의 예시이다.

비유하면, 좁은 문 앞에 두 사람이 서 있는 상황이다. 각자 "나 들어갈래"라고 말하고(flag), "먼저 가세요"라고 양보한다(turn). 상대방이 원하고 상대방 차례이면 기다리고, 그렇지 않으면 내가 들어간다.

## 동작 원리

### 공유 변수

- `turn`: 누구 차례인지 표시
- `flag[i]`: 프로세스 i의 진입 의사 표시

### 알고리즘

```c
// 공유 변수
int turn;
boolean flag[2];

// 프로세스 Pi의 구조
while (true) {
    flag[i] = true;           // 진입 의사 표명
    turn = j;                 // 상대에게 양보
    while (flag[j] && turn == j)
        ;                     // busy wait

    /* critical section */

    flag[i] = false;          // 진입 의사 철회

    /* remainder section */
}
```

### 3가지 요구사항 만족

| 요구사항 | 증명 |
|---------|------|
| **Mutual Exclusion** | turn은 0 또는 1 중 하나만 가능 → 동시 진입 불가 |
| **Progress** | 상대방이 원하지 않으면(`flag[j]==false`) 즉시 진입 |
| **Bounded Waiting** | 상대방이 임계구역 나오면 최대 1번 진입 후 내 차례 |

### 현대 아키텍처에서의 문제

```
프로세서/컴파일러가 의존성 없는 명령을 재정렬할 수 있음

원래 순서:          재정렬 후:
flag[0] = true      turn = 1
turn = 1            flag[0] = true

→ 두 프로세스가 동시에 임계구역 진입 가능!
```

해결책: 메모리 배리어를 사용하여 재정렬 방지

## 예시

- 2개 프로세스만 존재하는 환경에서의 상호배제 구현
- load/store 명령이 원자적이라고 가정할 때의 이론적 해법

## 관련 개념

- [임계구역 문제 (Critical Section)](/knowledge/os/critical-section/) - Peterson's Solution이 해결하는 문제
- [메모리 배리어 (Memory Barrier)](/knowledge/os/memory-barrier/) - 명령어 재정렬 방지
- [하드웨어 동기화 명령어](/knowledge/os/hardware-instructions/) - 하드웨어 기반 해결책
- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - 고수준 상호배제 도구
