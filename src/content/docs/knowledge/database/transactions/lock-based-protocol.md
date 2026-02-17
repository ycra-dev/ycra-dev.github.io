---
title: "Lock-Based Protocol"
description: "잠금 기반 프로토콜(Lock-Based Protocol)은 트랜잭션이 데이터 항목에 접근하기 전에 해당 항목에 대한 잠금을 획득하도록 요구하여 동시 실행 트랜잭션 간의 충돌을 제어하는 동시성 제어 기법이다"
tags: ['Lock Based Protocol', 'Shared Lock', 'Exclusive Lock', 'Concurrency Control']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/lock-based-protocol
sidebar:
  order: 8
---

## 핵심 개념

**잠금 모드:**
- **공유 잠금(Shared Lock, S-lock):** 데이터 항목을 읽기만 할 때 사용한다. 여러 트랜잭션이 같은 데이터에 동시에 공유 잠금을 보유할 수 있다.
- **배타적 잠금(Exclusive Lock, X-lock):** 데이터 항목을 읽고 쓸 때 사용한다. 배타적 잠금은 다른 모든 잠금과 호환되지 않는다.

**잠금 호환성 매트릭스:**
```
       | S-lock | X-lock |
S-lock | 호환   | 비호환  |
X-lock | 비호환  | 비호환  |
```

**잠금 관리자(Lock Manager):**
잠금 관리자는 프로세스로 구현되어 트랜잭션으로부터 잠금 요청/해제 메시지를 받는다. 각 데이터 항목에 대해 잠금된 상태에서의 요청들을 연결 리스트로 관리하며, 이를 **잠금 테이블(lock table)**이라 한다. 해시 테이블로 인덱싱된다.

잠금 부여 규칙 (기아 방지):
- 해당 데이터에 충돌하는 잠금이 없어야 함
- 먼저 요청한 잠금이 모두 부여된 상태여야 함
이 두 조건으로 잠금 요청이 나중에 들어온 요청에 의해 무한히 차단되는 기아(starvation) 현상을 방지한다.

**잠금 프로토콜:**
단순히 잠금을 사용하는 것만으로는 일관성을 보장할 수 없다. 잠금의 획득과 해제 시점을 규제하는 규칙(프로토콜)이 필요하다. 데이터를 너무 일찍 해제하면 불일치가 발생할 수 있고, 해제를 너무 늦추면 교착 상태가 발생할 수 있다.

**그래프 기반 프로토콜:**
데이터 항목에 부분 순서를 부여하여 2PL이 아닌 방식으로도 직렬 가능성을 보장할 수 있다. 트리 프로토콜이 대표적인 예로, 배타적 잠금만 사용하며 교착 상태를 방지한다. 부모 노드를 잠금해야만 자식 노드를 잠금할 수 있다.

## 예시

잠금을 사용한 트랜잭션 예:

```
T1 (이체):                    T2 (잔액 조회):
lock-X(B);                   lock-S(A);
read(B);                     read(A);
B := B - 50;                 lock-S(B);
write(B);                    read(B);
lock-X(A);                   display(A + B);
read(A);                     unlock(A);
A := A + 50;                 unlock(B);
write(A);
unlock(B);
unlock(A);
```

잠금 없이 실행했을 때의 문제:
```
T1: read(B), B:=B-50, write(B)
T2: read(A), read(B)     ← B는 이미 $50 감소했지만 A는 아직 미증가
T2: display(A+B)          ← 총합이 $50 부족한 잘못된 값 표시
T1: read(A), A:=A+50, write(A)
```

잠금 테이블 예:
```
데이터 항목 I4:  T1(X, granted) → T23(S, waiting)
데이터 항목 I7:  T23(S, granted) → T1(S, granted) → T8(X, waiting)
데이터 항목 I23: T8(X, granted)
```

## 관련 개념

- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Deadlock](/knowledge/database/deadlock/)
- [Multiple Granularity Locking](/knowledge/database/multiple-granularity-locking/)
- [Timestamp-Based Protocol](/knowledge/database/timestamp-based-protocol/)
- [Transaction](/knowledge/database/transaction/)
