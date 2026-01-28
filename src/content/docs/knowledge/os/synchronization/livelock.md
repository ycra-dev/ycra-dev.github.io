---
title: "라이브락 (Livelock)"
description: "스레드들이 블록되지 않고 계속 동작하지만 실패하는 동작을 무한 반복하며 진전이 없는 상태"
tags: ["OS", "Deadlock", "Concurrency"]
created: 2026-01-23
updated: 2026-01-27
draft: false
slug: knowledge/os/livelock
sidebar:
  order: 26
---

## 핵심 개념

라이브락(Livelock)은 스레드들이 블록되지 않고 계속 동작하지만, 실패하는 동작을 무한 반복하며 진전이 없는 상태입니다. Deadlock을 피하려고 trylock 등을 사용했는데, 오히려 무한 재시도에 빠질 수 있습니다.

## 동작 원리

1. T1: lock(A) 성공 → trylock(B) 실패 → unlock(A) → 재시도
2. T2: lock(B) 성공 → trylock(A) 실패 → unlock(B) → 재시도
3. 동시에 재시도하면 같은 상황 반복 → 진전 없음

### Deadlock vs Livelock

| 구분 | Deadlock | Livelock |
|------|----------|----------|
| 스레드 상태 | **블록됨** (대기) | **활성** (실행 중) |
| CPU 사용 | 없음 | 높음 (busy waiting) |
| 원인 | 자원 대기 | 반복적 실패 & 재시도 |
| 탐지 | Wait-for graph 사이클 | 탐지 어려움 |

## 예시

좁은 복도에서 두 사람이 마주치는 상황과 유사합니다. 서로 오른쪽으로 비켜서면 또 막히고, 서로 왼쪽으로 비켜서면 또 막힙니다. 블록된 건 아니지만 진전이 없습니다.

```c
// T1
while (!done) {
    lock(A);
    if (trylock(B)) {
        // 작업 수행
        unlock(B); unlock(A);
        done = 1;
    } else {
        unlock(A);  // 양보 후 재시도
    }
}

// T2
while (!done) {
    lock(B);
    if (trylock(A)) {
        // 작업 수행
        unlock(A); unlock(B);
        done = 1;
    } else {
        unlock(B);  // 양보 후 재시도
    }
}
```

T1과 T2가 동시에 실행되면 livelock이 발생합니다.

### 해결책

1. **무작위 백오프 (Random Backoff)**: 재시도 전 무작위 시간만큼 대기. 이더넷 충돌 처리의 exponential backoff와 동일한 원리
2. **락 순서 고정**: 모든 스레드가 동일한 순서로 락 획득 시도

## 관련 개념

- [[교착 상태 (Deadlock)]]
- [[교착 상태 필요조건 (Necessary Conditions)]]
- [[교착 상태 탐지 (Deadlock Detection)]]
