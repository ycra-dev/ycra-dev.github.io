---
title: "Multiversion Concurrency Control"
description: "다중 버전 동시성 제어(Multiversion Concurrency Control, MVCC)는 각 데이터 항목의 여러 버전을 유지하여, 읽기 연산이 쓰기 연산을 차단하지 않고 적절한 버전을 읽을 수 있게 하는 동시성 제어 기법이다"
tags: ['Mvcc', 'Multiversion', 'Concurrency Control', 'Snapshot']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/multiversion-concurrency-control
sidebar:
  order: 14
---

## 핵심 개념

기존의 단일 버전 동시성 제어에서는 읽기와 쓰기가 충돌하여 하나가 다른 하나를 차단해야 했다. MVCC에서는 데이터 항목의 여러 버전을 유지하여 읽기 트랜잭션이 항상 적절한(일관된) 버전을 찾아 읽을 수 있으므로 대기가 줄어든다.

**다중 버전 타임스탬프 순서(Multiversion Timestamp Ordering):**
각 데이터 항목 Q에 대해 버전 시퀀스 {Q1, Q2, ..., Qk}를 유지한다. 각 버전 Qi에는:
- **Content:** 데이터 값
- **W-timestamp(Qi):** 버전을 생성한 트랜잭션의 타임스탬프
- **R-timestamp(Qi):** 이 버전을 읽은 가장 큰 타임스탬프

읽기 연산: Ti가 Q를 읽을 때, W-timestamp가 TS(Ti) 이하인 가장 최근 버전을 반환한다. 읽기는 절대 거부되지 않는다.

쓰기 연산: Ti가 Q에 쓸 때, 가장 최근 버전 Qk를 찾는다:
- TS(Ti) < R-timestamp(Qk)이면: 이미 나중 트랜잭션이 Qk를 읽었으므로 Ti 롤백
- 그렇지 않으면: 새 버전 생성

**다중 버전 2단계 잠금(Multiversion 2PL):**
2PL과 MVCC를 결합한 방식으로, 상용 시스템에서 널리 사용된다:
- 읽기 전용 트랜잭션에는 타임스탬프를 부여하고, 적절한 버전을 읽게 함 (잠금 불필요)
- 갱신 트랜잭션에는 엄밀한 2PL을 적용

이를 통해 읽기 전용 트랜잭션이 갱신 트랜잭션을 차단하지 않으며, 갱신 트랜잭션도 읽기 전용 트랜잭션을 차단하지 않는다.

**버전 관리:**
오래된 버전은 더 이상 필요하지 않을 때 가비지 컬렉션으로 제거한다. 현재 활성화된 가장 오래된 트랜잭션보다 이전의 버전만 유지하면 된다.

MVCC는 PostgreSQL, Oracle, MySQL/InnoDB 등 대부분의 현대 데이터베이스 시스템에서 사용된다.

## 예시

데이터 항목 A의 버전 관리:

```
시간 0: A_0 = 100 (초기 값, W-ts = 0)

T1(TS=5): write(A) → A=150
  → 새 버전 생성: A_1 = 150, W-ts = 5

T2(TS=10): write(A) → A=200
  → 새 버전 생성: A_2 = 200, W-ts = 10

버전 체인: A_0(W-ts=0) → A_1(W-ts=5) → A_2(W-ts=10)
```

읽기 연산:
```
T3(TS=7): read(A)
  → W-ts ≤ 7인 가장 최근 버전 = A_1 (W-ts=5)
  → A = 150 반환 (대기 없음!)

T4(TS=3): read(A)
  → W-ts ≤ 3인 가장 최근 버전 = A_0 (W-ts=0)
  → A = 100 반환 (대기 없음!)
```

다중 버전 2PL:
```
읽기 전용 T_ro(TS=7):
  read(A) → A_1(W-ts=5)의 값 150 반환 (잠금 불필요)

갱신 T_up:
  lock-X(A);   ← 2PL 적용
  read(A);     ← 최신 버전 읽기
  write(A);    ← 새 버전 생성
  commit;      ← 잠금 해제
```

## 관련 개념

- [Snapshot Isolation](/knowledge/database/snapshot-isolation/)
- [Timestamp-Based Protocol](/knowledge/database/timestamp-based-protocol/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Transaction Isolation Level](/knowledge/database/transaction-isolation-level/)
