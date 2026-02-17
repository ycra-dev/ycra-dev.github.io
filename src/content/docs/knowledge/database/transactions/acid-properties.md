---
title: "ACID Properties"
description: "ACID 속성은 데이터베이스 트랜잭션이 보장해야 하는 네 가지 핵심 속성인 원자성(Atomicity), 일관성(Consistency), 격리성(Isolation), 지속성(Durability)을 의미하며, 이를 통해 데이터베이스의 무결성과 신뢰성을 보장한다"
tags: ['ACID', 'Atomicity', 'Consistency', 'Isolation', 'Durability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/acid-properties
sidebar:
  order: 1
---

## 핵심 개념

**원자성(Atomicity):**
트랜잭션의 모든 연산이 완전히 실행되거나 전혀 실행되지 않아야 한다. 트랜잭션이 중간에 실패하면, 이미 수행된 모든 변경사항이 롤백(되돌림)되어야 한다. 원자성은 데이터베이스의 복구 시스템(recovery system)에 의해 보장된다. 복구 시스템은 로그(log)를 사용하여 트랜잭션의 변경사항을 추적하고, 장애 발생 시 미완료 트랜잭션을 롤백한다.

**일관성(Consistency):**
트랜잭션이 시작되기 전에 데이터베이스가 일관된 상태에 있었다면, 트랜잭션 완료 후에도 일관된 상태를 유지해야 한다. 일관성은 무결성 제약조건(예: 외래 키, 유일성 제약)의 만족을 포함하며, 추가로 응용 프로그램 수준의 일관성(예: 계좌 이체 시 총 잔액 보존)도 포함한다. 일관성 보장의 일차적 책임은 트랜잭션을 작성하는 프로그래머에게 있다.

**격리성(Isolation):**
동시에 실행되는 트랜잭션들이 서로의 중간 결과를 볼 수 없어야 한다. 각 트랜잭션은 마치 시스템에서 혼자 실행되는 것처럼 동작해야 한다. 격리성은 동시성 제어 시스템(concurrency-control system)에 의해 보장된다. 가장 강력한 격리 수준은 직렬 가능성(serializability)으로, 동시 실행의 결과가 어떤 직렬 실행의 결과와 동일함을 보장한다.

**지속성(Durability):**
트랜잭션이 성공적으로 커밋(commit)되면, 이후에 시스템 장애가 발생하더라도 그 변경사항이 영구적으로 보존되어야 한다. 지속성은 복구 시스템에 의해 보장되며, 변경사항을 비휘발성 저장소(디스크)에 기록하거나, 장애 후 복구할 수 있는 충분한 정보를 로그에 기록함으로써 달성된다.

## 예시

은행 계좌 이체 예제에서 ACID 속성의 적용:

```
T: A에서 B로 $50 이체
read(A); A := A - 50; write(A);
read(B); B := B + 50; write(B);
```

**원자성:** write(A) 후 시스템 장애 → A만 감소하고 B는 증가하지 않은 상태
→ 복구 시스템이 A를 원래 값으로 복원 (전체 트랜잭션 취소)

**일관성:** 트랜잭션 전 A + B = 2000이면, 트랜잭션 후에도 A + B = 2000
→ 중간에는 A + B = 1950일 수 있지만 (A만 감소, B 아직 미증가)
   이 중간 상태는 다른 트랜잭션에 보이지 않아야 함

**격리성:** 동시에 실행 중인 T'이 A + B를 읽을 때, $50이 사라진
중간 상태를 볼 수 없어야 함. T가 완료 전이면 이전 값, 완료 후면
새 값을 봐야 함.

**지속성:** 커밋 후 정전 발생 → 재부팅 후에도 이체 결과가 유지됨
→ 로그를 기반으로 커밋된 변경사항 재적용 (redo)

## 관련 개념

- [Transaction](/knowledge/database/transaction/)
- [Atomicity](/knowledge/database/atomicity/)
- [Serializability](/knowledge/database/serializability/)
- [Transaction Isolation Level](/knowledge/database/transaction-isolation-level/)
- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
