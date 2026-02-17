---
title: "Recovery Algorithm"
description: "복구 알고리즘(Recovery Algorithm)은 시스템 장애(크래시) 후 데이터베이스를 마지막 일관된 상태로 복원하는 절차로, 커밋된 트랜잭션의 변경사항은 유지(redo)하고 미커밋 트랜잭션의 변경사항은 취소(undo)하여 원자성과 지속성을 보장한다"
tags: ['Recovery Algorithm', 'Redo', 'Undo', 'Crash Recovery']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/recovery-algorithm
sidebar:
  order: 4
---

## 핵심 개념

**복구의 두 가지 상황:**

1. **트랜잭션 롤백(정상 실행 중):** 트랜잭션이 중단(abort)되면, 해당 트랜잭션의 로그 레코드를 역순으로 처리하여 모든 변경사항을 취소한다.

2. **장애 후 복구:** 시스템 크래시 후, 데이터베이스를 일관된 상태로 복구한다. WAL 기반 시스템에서는 redo와 undo 두 단계로 수행한다.

**Redo 단계:**
- 로그를 마지막 검사점부터 정방향으로 스캔
- 커밋 여부에 관계없이 모든 트랜잭션의 변경사항을 재적용
- 이를 통해 장애 시점의 정확한 데이터베이스 상태를 재구성
- 이미 디스크에 반영된 변경은 skip (페이지 LSN 확인)

**Undo 단계:**
- 로그를 역방향으로 스캔
- 장애 시점에 활성이었던(미커밋) 트랜잭션의 변경사항을 취소
- 각 undo 작업에 대해 보상 로그 레코드(CLR)를 기록
- CLR을 기록함으로써 undo 중 재장애에도 안전

**Steal/No-Force와 복구:**
- **Steal 정책:** 커밋 전 수정 페이지를 디스크에 쓸 수 있음 → undo가 필요한 이유
- **No-Force 정책:** 커밋 시 수정 페이지를 디스크에 안 써도 됨 → redo가 필요한 이유
- **No-Steal/Force:** redo/undo 불필요하지만 성능이 나쁨
- 현대 시스템은 성능을 위해 Steal/No-Force를 사용하며, 이에 따라 redo와 undo 모두 필요

**논리적 undo:**
일부 연산(예: B+-tree 삽입)은 물리적으로 undo하기 어렵다. 대신 역연산(예: B+-tree 삭제)을 수행하는 논리적 undo를 사용한다. 논리적 undo는 잠금이 필요하므로, undo 중에도 적절한 잠금을 획득해야 한다.

**미디어 복구:**
디스크 자체의 장애에 대비하여 데이터베이스 덤프(backup)를 주기적으로 생성한다. 디스크 장애 시 덤프를 복원하고, 덤프 이후의 로그를 redo하여 복구한다.

## 예시

장애 후 복구 과정:

```
로그:
  <T1, start>
  <T1, A, 100, 200>
  <T2, start>
  <T2, B, 300, 400>
  <T1, commit>
  <T3, start>
  <T3, C, 500, 600>
  <checkpoint {T2, T3}>
  <T2, D, 700, 800>
  <T3, E, 900, 1000>
  <T2, commit>
  *** 장애 발생 ***
```

```
1. Redo 단계 (검사점부터 정방향):
   미커밋이든 커밋이든 모든 변경 재적용:
   - T2: D = 800 (redo)
   - T3: E = 1000 (redo)
   - T2: commit 기록
   → 장애 시점의 상태 재구성 완료

2. Undo 단계 (역방향, T3만 미커밋):
   - T3: E = 900으로 복원 (undo), CLR 기록
   - T3: C = 500으로 복원 (undo), CLR 기록
   - T3: abort 기록

최종 결과: T1, T2의 변경은 유지, T3의 변경은 취소
  A=200, B=400, C=500, D=800, E=900
```

## 관련 개념

- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [ARIES](/knowledge/database/aries/)
- [Checkpoint](/knowledge/database/checkpoint/)
- [Log Record](/knowledge/database/log-record/)
- [Atomicity](/knowledge/database/atomicity/)
