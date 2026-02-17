---
title: "Multiple Granularity Locking"
description: "다중 단위 잠금(Multiple Granularity Locking)은 데이터 항목을 여러 크기의 단위(데이터베이스, 테이블, 페이지, 행 등)로 계층적으로 구성하고, 트랜잭션이 적절한 크기의 단위에 잠금을 걸 수 있도록 하는 동시성 제어 기법이다"
tags: ['Multiple Granularity', 'Intention Lock', 'Lock Hierarchy', 'Concurrency Control']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/multiple-granularity-locking
sidebar:
  order: 10
---

## 핵심 개념

**잠금 단위(Granularity)의 계층:**
데이터베이스의 데이터 항목은 다음과 같은 계층 구조로 표현된다:
```
데이터베이스 → 영역(area) → 테이블 → 페이지/블록 → 튜플/행
```

작은 단위(행 수준)의 잠금은 높은 동시성을 제공하지만 잠금 관리 오버헤드가 크다. 큰 단위(테이블 수준)의 잠금은 관리가 간단하지만 동시성이 낮다.

**의도 잠금(Intention Lock):**
상위 노드에 의도 잠금을 설정하여, 하위 노드에서 어떤 유형의 잠금이 요청되었는지를 나타낸다:
- **IS (Intention Shared):** 하위 노드에 공유 잠금을 설정할 의도
- **IX (Intention Exclusive):** 하위 노드에 배타적 잠금을 설정할 의도
- **SIX (Shared and Intention Exclusive):** 현재 노드에 공유 잠금 + 하위에 배타적 잠금 의도

**호환성 매트릭스:**
```
     | IS  | IX  | S   | SIX | X   |
IS   | 호환 | 호환 | 호환 | 호환 | 비호환 |
IX   | 호환 | 호환 | 비호환 | 비호환 | 비호환 |
S    | 호환 | 비호환 | 호환 | 비호환 | 비호환 |
SIX  | 호환 | 비호환 | 비호환 | 비호환 | 비호환 |
X    | 비호환 | 비호환 | 비호환 | 비호환 | 비호환 |
```

**잠금 프로토콜:**
1. 잠금은 루트에서 시작하여 계층을 따라 하향식으로 획득
2. S 또는 IS를 설정하려면 부모에 IS 이상의 잠금 필요
3. X, IX, 또는 SIX를 설정하려면 부모에 IX 이상의 잠금 필요
4. 잠금 해제는 하위에서 상위로 상향식으로 수행
5. 2PL 프로토콜을 따라야 함

이 프로토콜은 테이블 전체를 잠그는 트랜잭션과 개별 행을 잠그는 트랜잭션이 공존할 수 있게 한다.

## 예시

트랜잭션 T1이 instructor 테이블 전체를 읽고, T2가 특정 행을 수정하는 경우:

```
T1 (전체 읽기):
  lock-IS(database)
  lock-S(instructor_table)     ← 테이블 수준 공유 잠금
  read entire instructor table
  unlock(instructor_table)
  unlock(database)

T2 (특정 행 수정):
  lock-IX(database)
  lock-IX(instructor_table)    ← 테이블에 의도 배타적 잠금
  lock-X(instructor_row_42)    ← 행 수준 배타적 잠금
  write(instructor_row_42)
  unlock(instructor_row_42)
  unlock(instructor_table)
  unlock(database)
```

T1이 S 잠금을 가진 상태에서 T2가 IX를 요청:
```
S와 IX는 비호환 → T2는 T1이 완료될 때까지 대기
```

T1이 IS만 가지고 개별 행에 S 잠금을 거는 경우:
```
T1: lock-IS(instructor_table)
T2: lock-IX(instructor_table)  ← IS와 IX는 호환 → 동시 실행 가능!
T2: lock-X(row_42)
T1: lock-S(row_99)             ← 다른 행이므로 충돌 없음
→ 높은 동시성 달성
```

## 관련 개념

- [Lock-Based Protocol](/knowledge/database/lock-based-protocol/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Deadlock](/knowledge/database/deadlock/)
- [Transaction Isolation Level](/knowledge/database/transaction-isolation-level/)
