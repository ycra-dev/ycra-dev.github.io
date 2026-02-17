---
title: "Timestamp-Based Protocol"
description: "타임스탬프 기반 프로토콜(Timestamp-Based Protocol)은 각 트랜잭션에 고유한 타임스탬프를 부여하고, 데이터 항목에 대한 읽기/쓰기 순서가 타임스탬프 순서와 일치하도록 강제하여 충돌 직렬 가능성을 보장하는 잠금 없는 동시성 제어 기법이다"
tags: ['Timestamp', 'Concurrency Control', 'Timestamp Ordering', 'Protocol']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/timestamp-based-protocol
sidebar:
  order: 12
---

## 핵심 개념

**타임스탬프 할당:**
각 트랜잭션 Ti에 시스템 진입 시 고유 타임스탬프 TS(Ti)를 부여한다. 시스템 클럭이나 논리적 카운터를 사용한다. Ti가 Tj보다 먼저 시작했으면 TS(Ti) < TS(Tj)이다.

**데이터 항목의 타임스탬프:**
각 데이터 항목 Q에 대해 두 가지 타임스탬프를 유지한다:
- **W-timestamp(Q):** Q에 성공적으로 write한 가장 큰 타임스탬프
- **R-timestamp(Q):** Q를 성공적으로 read한 가장 큰 타임스탬프

**프로토콜 규칙:**

*read(Q)를 실행하려는 Ti:*
- TS(Ti) < W-timestamp(Q)이면: Ti가 이미 덮어쓰인 값을 읽으려 함 → Ti 롤백
- 그렇지 않으면: read 허용, R-timestamp(Q) = max(R-timestamp(Q), TS(Ti))

*write(Q)를 실행하려는 Ti:*
- TS(Ti) < R-timestamp(Q)이면: Ti가 쓰려는 값이 이미 나중 트랜잭션에 의해 읽힘 → Ti 롤백
- TS(Ti) < W-timestamp(Q)이면: Ti의 쓰기가 이미 나중 트랜잭션에 의해 덮어쓰임 → Ti 롤백 (또는 Thomas의 쓰기 규칙에 의해 쓰기를 무시)
- 그렇지 않으면: write 수행, W-timestamp(Q) = TS(Ti)

**Thomas의 쓰기 규칙:**
TS(Ti) < W-timestamp(Q)인 경우, 더 나중 트랜잭션이 이미 Q에 쓴 상태이므로 Ti의 쓰기는 어차피 덮어쓰인다. 롤백 대신 Ti의 쓰기를 무시(skip)하여 불필요한 롤백을 줄인다. 이 규칙은 뷰 직렬 가능성을 보장하지만 충돌 직렬 가능성은 보장하지 않을 수 있다.

**특성:**
- 교착 상태가 발생하지 않음 (잠금을 사용하지 않으므로)
- 연쇄적 롤백이 발생할 수 있음
- 충돌이 많은 경우 반복적인 롤백과 재시작으로 비효율적일 수 있음

## 예시

T1(TS=1)과 T2(TS=2)가 데이터 항목 A에 접근하는 경우:

```
초기 상태: W-timestamp(A) = 0, R-timestamp(A) = 0

T2: read(A)
  TS(T2)=2 ≥ W-timestamp(A)=0 → 허용
  R-timestamp(A) = max(0, 2) = 2

T1: write(A)
  TS(T1)=1 < R-timestamp(A)=2 → T1 롤백!
  (T2가 이미 A를 읽었으므로, T1이 A를 변경하면 T2의 읽기 결과가 무효화됨)
```

Thomas의 쓰기 규칙 적용 예:
```
초기 상태: W-timestamp(A) = 0

T2: write(A)
  W-timestamp(A) = 2

T1: write(A)
  TS(T1)=1 < W-timestamp(A)=2
  Thomas의 쓰기 규칙: T1의 write를 무시 (어차피 T2의 값으로 덮어쓰이므로)
  → T1 롤백 불필요
```

## 관련 개념

- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Multiversion Concurrency Control](/knowledge/database/multiversion-concurrency-control/)
- [Conflict Serializability](/knowledge/database/conflict-serializability/)
- [Deadlock](/knowledge/database/deadlock/)
- [Validation-Based Protocol](/knowledge/database/validation-based-protocol/)
