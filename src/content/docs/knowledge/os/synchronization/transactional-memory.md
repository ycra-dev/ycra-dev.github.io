---
title: "트랜잭셔널 메모리 (Transactional Memory)"
description: "데이터베이스 트랜잭션 개념을 메모리 연산에 적용하여 락 없이 원자적 메모리 접근을 보장하는 동기화 기법"
tags: ["OS", "Synchronization"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/transactional-memory
sidebar:
  order: 11
---

## 핵심 개념

트랜잭셔널 메모리(Transactional Memory)는 데이터베이스 트랜잭션 개념을 메모리 연산에 적용하여, **락 없이 원자적 메모리 접근을 보장**하는 동기화 기법이다. 락 기반 동기화는 교착 상태 가능성, 확장성 저하, 복잡한 설계 등의 문제가 있어, 멀티코어 시대에 **시스템이 원자성을 자동 보장**하는 방법이 필요하다.

비유하면, 은행 계좌 이체에서 전통 방식은 양쪽 계좌에 락을 걸어야 하지만, 트랜잭셔널 메모리는 "A에서 빼고 B에 넣기"를 원자적으로 선언만 하면 시스템이 처리한다.

## 동작 원리

### 락 방식 vs 트랜잭셔널 메모리

```c
// 전통적 락 방식
void update() {
    acquire();
    /* modify shared data */
    release();
}

// Transactional Memory 방식
void update() {
    atomic {
        /* modify shared data */
    }
}
```

개발자는 "이 블록은 원자적으로 실행되어야 한다"만 명시하고, 시스템이 충돌 감지, 롤백, 재시도를 **자동 처리**한다.

### 동작 흐름

1. 트랜잭션 시작 → 읽기/쓰기 추적
2. 충돌 감지 (다른 트랜잭션과 겹침?)
   - 충돌 없음 → **Commit** (확정)
   - 충돌 있음 → **Abort** (롤백) → 재시도

### 구현 방식

| 방식 | 설명 | 장점 | 단점 |
|------|------|------|------|
| **STM** (Software) | 컴파일러가 계측 코드 삽입 | 특수 하드웨어 불필요 | 오버헤드 큼 |
| **HTM** (Hardware) | 캐시/캐시 일관성 프로토콜 활용 | 오버헤드 적음 | 하드웨어 수정 필요 |

### 대안적 접근법

**함수형 프로그래밍**: 불변 상태(immutable state)로 경쟁 조건, 교착 상태 자체를 원천 차단한다. Erlang(동시성/분산 강점), Scala(함수형+객체지향) 등이 대표적이다.

## 예시

두 스레드가 동시에 같은 변수 수정 시도:

```
Thread A:                  Thread B:
atomic {                   atomic {
    read counter (=10)         read counter (=10)
    counter = 10 + 1           counter = 10 + 5
}                          }

→ Thread A가 먼저 commit → counter = 11
→ Thread B는 충돌 감지 → rollback → 재시도
→ Thread B 재시도: read counter (=11), counter = 16 → commit
```

## 관련 개념

- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - 전통적 상호배제 도구
- [세마포어 (Semaphore)](/knowledge/os/semaphore/) - 카운팅 가능한 동기화 도구
- [교착 상태 (Deadlock)](/knowledge/os/deadlock/) - 트랜잭셔널 메모리가 회피하는 문제
- [원자적 변수 (Atomic Variable)](/knowledge/os/atomic-variable/) - 단일 변수에 대한 lock-free 동기화
