---
title: "Transaction Isolation Level"
description: "트랜잭션 격리 수준(Transaction Isolation Level)은 동시에 실행되는 트랜잭션 간에 데이터 가시성을 제어하는 수준으로, SQL 표준에서는 Serializable, Repeatable Read, Read Committed, Read Uncommi..."
tags: ['Isolation Level', 'Read Committed', 'Repeatable Read', 'Serializable']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/transaction-isolation-level
sidebar:
  order: 7
---

## 핵심 개념

완전한 직렬 가능성을 보장하면 동시성이 크게 제한될 수 있다. 따라서 SQL 표준은 응용 프로그램의 요구에 따라 격리 수준을 선택할 수 있도록 한다. 낮은 격리 수준은 더 높은 동시성을 허용하지만 데이터 불일치 위험이 있다.

**Serializable (직렬 가능):**
가장 강력한 격리 수준이다. 트랜잭션의 동시 실행이 어떤 직렬 실행과 동등한 결과를 보장한다. 모든 이상 현상을 방지하지만 동시성이 가장 낮다.

**Repeatable Read (반복 가능 읽기):**
트랜잭션이 읽은 데이터를 다시 읽으면 같은 값을 얻는다. 단, 새로운 튜플이 삽입되어 나타나는 **팬텀(phantom)** 현상은 방지하지 못한다. 예를 들어, 범위 조건으로 조회할 때 다른 트랜잭션이 해당 범위에 새 튜플을 삽입하면 다른 결과를 볼 수 있다.

**Read Committed (커밋된 읽기):**
커밋된 데이터만 읽을 수 있다. 같은 데이터를 두 번 읽을 때 그 사이에 다른 트랜잭션이 해당 데이터를 수정하고 커밋하면, 두 번째 읽기에서 다른 값을 얻을 수 있다(**비반복 읽기, Non-repeatable Read**).

**Read Uncommitted (커밋되지 않은 읽기):**
가장 낮은 격리 수준이다. 아직 커밋되지 않은 다른 트랜잭션의 변경사항도 볼 수 있다(**더티 읽기, Dirty Read**). 이 수준은 대략적인 통계를 수집하는 등 정확성이 크게 중요하지 않은 경우에 사용된다.

| 격리 수준 | Dirty Read | Non-repeatable Read | Phantom |
|-----------|------------|---------------------|---------|
| Read Uncommitted | 가능 | 가능 | 가능 |
| Read Committed | 불가 | 가능 | 가능 |
| Repeatable Read | 불가 | 불가 | 가능 |
| Serializable | 불가 | 불가 | 불가 |

대부분의 데이터베이스 시스템은 Read Committed를 기본 격리 수준으로 사용한다.

## 예시

```sql
-- 격리 수준 설정
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 또는
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

Dirty Read 예시 (Read Uncommitted):
```
T1: UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    -- 아직 커밋하지 않음
T2: SELECT balance FROM accounts WHERE id = 1;
    -- T1의 미커밋 변경을 읽음 → dirty read
T1: ROLLBACK;
    -- T2가 읽은 값은 유효하지 않게 됨
```

Phantom 예시 (Repeatable Read):
```
T1: SELECT COUNT(*) FROM instructor WHERE dept = 'CS';
    -- 결과: 10
T2: INSERT INTO instructor VALUES (..., 'CS', ...);
T2: COMMIT;
T1: SELECT COUNT(*) FROM instructor WHERE dept = 'CS';
    -- 결과: 11 → 팬텀 발생 (Repeatable Read에서 가능)
```

## 관련 개념

- [Transaction](/knowledge/database/transaction/)
- [ACID Properties](/knowledge/database/acid-properties/)
- [Serializability](/knowledge/database/serializability/)
- [Snapshot Isolation](/knowledge/database/snapshot-isolation/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
