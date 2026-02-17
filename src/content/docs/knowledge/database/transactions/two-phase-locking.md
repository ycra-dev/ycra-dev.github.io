---
title: "Two-Phase Locking"
description: "2단계 잠금 프로토콜(Two-Phase Locking Protocol, 2PL)은 각 트랜잭션이 잠금 획득과 해제를 두 단계(성장 단계와 수축 단계)로 나누어 수행하도록 요구하여 충돌 직렬 가능성을 보장하는 동시성 제어 프로토콜이다"
tags: ['Two Phase Locking', '2pl', 'Concurrency Control', 'Lock Protocol']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/two-phase-locking
sidebar:
  order: 9
---

## 핵심 개념

**두 단계:**
1. **성장 단계(Growing Phase):** 트랜잭션이 잠금을 획득할 수 있지만, 어떤 잠금도 해제할 수 없다.
2. **수축 단계(Shrinking Phase):** 트랜잭션이 잠금을 해제할 수 있지만, 새로운 잠금을 획득할 수 없다.

트랜잭션이 마지막 잠금을 획득하는 시점(성장 단계의 끝)을 **잠금 지점(lock point)**이라 한다. 트랜잭션들은 잠금 지점 순서대로 직렬화된다.

**2PL의 변형:**

- **엄격한 2PL (Strict 2PL):** 기본 2PL에 추가로, 모든 배타적(exclusive) 잠금을 트랜잭션 커밋 시까지 유지한다. 이를 통해 비연쇄 스케줄을 보장한다. 미커밋 트랜잭션이 쓴 데이터가 배타적 잠금으로 보호되므로 다른 트랜잭션이 읽을 수 없다.

- **엄밀한 2PL (Rigorous 2PL):** 모든 잠금(공유 및 배타적)을 트랜잭션 커밋 시까지 유지한다. 트랜잭션들이 커밋 순서대로 직렬화된다.

**잠금 변환(Lock Conversion):**
기본 2PL을 개선하여 잠금 모드 변환을 허용한다:
- **업그레이드(Upgrade):** 성장 단계에서만 공유 잠금을 배타적 잠금으로 변환
- **다운그레이드(Downgrade):** 수축 단계에서만 배타적 잠금을 공유 잠금으로 변환

이를 통해 동시성을 높일 수 있다. 예를 들어, 트랜잭션이 처음에 데이터를 읽기만 할 때 공유 잠금을 사용하다가, 나중에 쓰기가 필요할 때 배타적 잠금으로 업그레이드할 수 있다.

**2PL의 한계:**
- 교착 상태(deadlock)를 방지하지 못한다
- 기본 2PL은 연쇄적 롤백이 발생할 수 있다 (엄격한 2PL로 해결)

상용 데이터베이스 시스템에서는 엄격한 2PL과 엄밀한 2PL(잠금 변환 포함)이 광범위하게 사용된다.

## 예시

2단계 잠금을 따르는 트랜잭션:
```
T3: lock-X(B);      ← 성장 단계 시작
    read(B);
    B := B - 50;
    write(B);
    lock-X(A);       ← 여전히 성장 단계 (잠금만 획득)
    read(A);         ← lock point (마지막 잠금 획득)
    A := A + 50;
    write(A);
    unlock(B);       ← 수축 단계 시작 (잠금 해제)
    unlock(A);
```

2단계 잠금을 따르지 않는 트랜잭션:
```
T1: lock-X(B);
    read(B);
    B := B - 50;
    write(B);
    unlock(B);       ← 잠금 해제
    lock-X(A);       ← 해제 후 다시 획득! → 2PL 위반
    read(A);
    A := A + 50;
    write(A);
    unlock(A);
```

잠금 변환 예:
```
T8: lock-S(a1);      ← 공유 잠금으로 시작
    read(a1);
    lock-S(a2);
    read(a2);
    ...
    lock-S(an);
    read(an);
    upgrade(a1);      ← 배타적 잠금으로 업그레이드
    write(a1);
    unlock(a1);
    ...
```

## 관련 개념

- [Lock-Based Protocol](/knowledge/database/lock-based-protocol/)
- [Deadlock](/knowledge/database/deadlock/)
- [Conflict Serializability](/knowledge/database/conflict-serializability/)
- [Cascadeless Schedule](/knowledge/database/cascadeless-schedule/)
- [Multiple Granularity Locking](/knowledge/database/multiple-granularity-locking/)
