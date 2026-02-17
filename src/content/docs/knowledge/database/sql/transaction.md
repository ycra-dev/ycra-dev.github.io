---
title: "Transaction"
description: "트랜잭션(transaction)은 하나의 논리적 작업 단위(unit of work)를 구성하는 일련의 SQL 문장들의 시퀀스로, 전체가 성공적으로 완료(commit)되거나 전체가 취소(rollback)되어 데이터베이스의 일관성을 보장하는 원자적 실행 단위이다"
tags: ['Transaction', 'ACID', 'Atomicity', 'Commit', 'Rollback', 'Consistency', 'Recovery']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/transaction
sidebar:
  order: 13
---

## 핵심 개념

트랜잭션은 데이터베이스 시스템의 핵심 개념으로, ACID 속성을 통해 데이터의 무결성과 일관성을 보장한다:

**원자성(Atomicity):** 트랜잭션의 모든 연산이 완전히 수행되거나 전혀 수행되지 않아야 한다. 트랜잭션 수행 중 장애가 발생하면, 부분적으로 수행된 변경 사항은 모두 취소되어야 한다.

**일관성(Consistency):** 트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다. 모든 무결성 제약 조건이 만족되어야 한다.

**격리성(Isolation):** 동시에 실행되는 트랜잭션들은 서로의 중간 상태를 볼 수 없어야 한다. 각 트랜잭션은 마치 데이터베이스에서 혼자 실행되는 것처럼 동작해야 한다.

**지속성(Durability):** 성공적으로 완료(커밋)된 트랜잭션의 결과는 시스템 장애가 발생하더라도 영구적으로 보존되어야 한다.

SQL에서 트랜잭션은 COMMIT WORK(또는 COMMIT)으로 확정하거나 ROLLBACK WORK(또는 ROLLBACK)으로 취소한다. 대부분의 SQL 시스템에서는 각 SQL 문이 자동으로 커밋되는 자동 커밋(autocommit) 모드가 기본이지만, 이를 끄고 명시적으로 트랜잭션을 관리할 수 있다.

트랜잭션은 데이터베이스 시스템에서 두 가지 주요 문제를 해결한다:

1. **동시 실행(Concurrent Execution):** 여러 트랜잭션이 동시에 데이터에 접근할 때 일관성을 유지해야 한다. 동시 실행은 처리량(throughput)을 높이고 대기 시간을 줄여주지만, 적절한 제어 없이는 데이터 불일치가 발생할 수 있다.

2. **시스템 장애(System Failures):** 하드웨어 오류, 소프트웨어 오류, 정전 등으로 트랜잭션이 중간에 중단될 수 있다. 이 경우 데이터베이스가 일관된 상태를 유지하도록 보장해야 한다.

**트랜잭션의 상태:**
- **Active:** 초기 상태, 실행 중
- **Partially committed:** 마지막 문장 실행 후 (커밋 전)
- **Committed:** 성공적으로 완료
- **Failed:** 정상 실행이 더 이상 불가능한 상태
- **Aborted:** 트랜잭션이 롤백되고 데이터베이스가 트랜잭션 시작 전 상태로 복구

중단(abort)된 트랜잭션에 대해서는 **재시작(restart)** 또는 **종료(kill)** 중 하나를 선택한다. 하드웨어나 소프트웨어 오류가 원인이면 재시작, 내부 논리 오류가 원인이면 종료한다.

## 예시

SQL 수준의 트랜잭션 예시:

```sql
-- 트랜잭션 예시: 계좌 이체
BEGIN;
UPDATE account SET balance = balance - 500 WHERE account_id = 'A-101';
UPDATE account SET balance = balance + 500 WHERE account_id = 'A-201';
COMMIT;

-- 오류 발생 시 롤백
BEGIN;
UPDATE instructor SET salary = salary * 1.05 WHERE dept_name = 'Comp. Sci.';
-- 문제 발생 시
ROLLBACK;  -- 모든 변경 취소
```

추상적 표현 수준의 트랜잭션 예시 (A에서 B로 $50 이체):

```
read(A);
A := A - 50;
write(A);
read(B);
B := B + 50;
write(B);
```

이 트랜잭션에서:
- A의 인출과 B의 입금이 모두 수행되거나 모두 수행되지 않아야 함 (원자성)
- A + B의 합계가 트랜잭션 전후에 동일해야 함 (일관성)
- 다른 트랜잭션이 중간 상태를 볼 수 없어야 함 (격리성)
- 커밋 후에는 시스템 장애에도 결과가 유지되어야 함 (지속성)

## 관련 개념

- [SQL](/knowledge/database/sql/)
- [Integrity Constraint](/knowledge/database/integrity-constraint/)
- [DBMS](/knowledge/database/dbms/)
- [ACID Properties](/knowledge/database/acid-properties/)
- [Atomicity](/knowledge/database/atomicity/)
- [Serializability](/knowledge/database/serializability/)
- [Schedule](/knowledge/database/schedule/)
- [Transaction Isolation Level](/knowledge/database/transaction-isolation-level/)
