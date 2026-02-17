---
title: "Snapshot Isolation"
description: "스냅샷 격리(Snapshot Isolation)는 각 트랜잭션이 시작 시점의 데이터베이스 스냅샷을 기반으로 실행되어, 트랜잭션 수행 중 다른 트랜잭션의 변경사항을 볼 수 없게 하는 다중 버전 동시성 제어 기법이다"
tags: ['Snapshot Isolation', 'Mvcc', 'Concurrency Control', 'Write Skew']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/snapshot-isolation
sidebar:
  order: 15
---

## 핵심 개념

스냅샷 격리에서 각 트랜잭션 Ti는 시작 시점에 커밋된 데이터의 일관된 스냅샷을 보게 된다. Ti 실행 중 다른 트랜잭션이 데이터를 변경하고 커밋하더라도, Ti는 자신의 스냅샷만 본다.

**쓰기 충돌 처리 (First-Committer-Wins):**
두 동시 트랜잭션 Ti와 Tj가 같은 데이터 항목을 갱신하면, 먼저 커밋하는 트랜잭션만 성공한다. 나중에 커밋하려는 트랜잭션은 중단(abort)된다. 이를 통해 "갱신 손실(lost update)" 문제를 방지한다.

**스냅샷 격리의 장점:**
- 읽기 연산이 절대 차단되지 않음 (스냅샷에서 읽으므로)
- 쓰기 연산이 읽기를 차단하지 않음
- 높은 동시성 제공
- Read Committed와 Repeatable Read 수준의 이상 현상 방지

**스냅샷 격리의 한계 - Write Skew:**
스냅샷 격리는 직렬 가능성을 완전히 보장하지 않는다. **쓰기 왜곡(Write Skew)** 이상 현상이 발생할 수 있다. 이는 두 트랜잭션이 같은 데이터 집합을 읽고, 각각 다른 데이터 항목을 갱신할 때 발생한다. 개별적으로는 무결성 제약을 만족하지만, 함께 실행하면 제약이 위반될 수 있다.

**Serializable Snapshot Isolation (SSI):**
스냅샷 격리에 추가적인 검사를 수행하여 직렬 가능성을 보장하는 기법이다. PostgreSQL 9.1 이상에서 SERIALIZABLE 격리 수준으로 구현되어 있다. 연속적인 rw-의존성(read-write dependency)을 추적하여 위험한 패턴을 감지하면 트랜잭션을 중단한다.

대부분의 상용 데이터베이스(Oracle, PostgreSQL, SQL Server 등)에서 스냅샷 격리를 지원하며, 많은 시스템에서 기본 격리 수준으로 사용한다.

## 예시

Write Skew 문제 예시:

```
제약조건: 최소 1명의 의사가 당직이어야 함
현재 상태: 의사 A와 B가 모두 당직 중 (on_call)

T1(A의 요청): T1 시작 시 스냅샷 → A, B 모두 당직
  read: B가 당직이므로 A가 퇴근 가능
  write: A를 비당직으로 변경

T2(B의 요청): T2 시작 시 스냅샷 → A, B 모두 당직
  read: A가 당직이므로 B가 퇴근 가능
  write: B를 비당직으로 변경

T1 커밋, T2 커밋 → 둘 다 성공!
결과: A, B 모두 비당직 → 제약조건 위반!
```

이 문제는 두 트랜잭션이 같은 스냅샷을 보고 각각 다른 항목을 수정하기 때문에 발생한다. First-Committer-Wins 규칙으로는 감지되지 않는다(서로 다른 데이터 항목을 수정했으므로).

First-Committer-Wins 적용 예:
```
T1: write(A) → A = 100
T2: write(A) → A = 200
T1: commit → 성공
T2: commit → 실패! (T1이 이미 A를 수정하고 커밋했으므로)
T2: abort and retry
```

## 관련 개념

- [Multiversion Concurrency Control](/knowledge/database/multiversion-concurrency-control/)
- [Transaction Isolation Level](/knowledge/database/transaction-isolation-level/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Serializability](/knowledge/database/serializability/)
