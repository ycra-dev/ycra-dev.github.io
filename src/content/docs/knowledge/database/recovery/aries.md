---
title: "ARIES"
description: "ARIES(Algorithm for Recovery and Isolation Exploiting Semantics)는 IBM에서 개발한 고성능 데이터베이스 복구 알고리즘으로, WAL 기반의 steal/no-force 정책을 사용하며, 분석(Analysis), 재실..."
tags: ['Aries', 'Recovery Algorithm', 'Wal', 'Steal No Force']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/aries
sidebar:
  order: 5
---

## 핵심 개념

ARIES는 현대 데이터베이스 시스템에서 가장 널리 사용되는 복구 알고리즘의 기반이다. 핵심 원칙은 세 가지이다:

**1. Write-Ahead Logging:** 모든 변경을 로그에 먼저 기록한다.

**2. Repeating History During Redo:** 장애 후 복구 시, 장애 시점의 정확한 데이터베이스 상태를 재구성한다. 커밋된 트랜잭션과 미커밋 트랜잭션의 변경사항을 모두 redo한 후, 미커밋 트랜잭션을 undo한다.

**3. Logging Changes During Undo:** undo 과정에서 수행되는 변경사항도 로그에 기록한다(CLR: Compensation Log Record). 이를 통해 undo 중 다시 장애가 발생하더라도 올바른 복구가 가능하다.

**세 단계 복구:**

*분석 단계(Analysis Pass):*
가장 최근 검사점부터 로그를 정방향으로 스캔하여:
- 장애 시점에 활성이었던 트랜잭션 집합(undo-list) 결정
- 수정되었지만 디스크에 기록되지 않았을 수 있는 페이지 집합(dirty page table) 결정
- redo를 시작할 로그 위치(RedoLSN) 결정

*Redo 단계(Redo Pass):*
RedoLSN부터 로그를 정방향으로 스캔하여 모든 변경을 재적용한다. 단, 이미 디스크에 반영된 변경은 건너뛴다(페이지의 LSN을 확인하여 판단).

*Undo 단계(Undo Pass):*
로그를 역방향으로 스캔하며 미커밋 트랜잭션의 변경을 취소한다. 각 undo 작업에 대해 CLR을 기록한다. CLR에는 UndoNextLSN이 포함되어, undo 중 장애가 발생해도 이미 undo된 부분을 다시 undo하지 않는다.

**LSN(Log Sequence Number):**
각 로그 레코드에 부여되는 고유 번호로, 각 데이터 페이지에도 해당 페이지에 마지막으로 적용된 LSN이 저장된다. 이를 통해 redo 시 불필요한 재적용을 피한다.

**Steal/No-Force 정책:**
- Steal: 커밋 전에도 수정된 페이지를 디스크에 기록할 수 있음 (메모리 관리 유연성)
- No-Force: 커밋 시 수정된 페이지를 반드시 디스크에 기록할 필요 없음 (성능 향상)

## 예시

ARIES 복구의 세 단계:

```
로그 (LSN 순서):
  LSN 1: <T1, start>
  LSN 2: <T1, A, 100, 50>     pageA.LSN = 2
  LSN 3: <T2, start>
  LSN 4: <T2, B, 200, 150>    pageB.LSN = 4
  LSN 5: <checkpoint, {T1, T2}, dirty={pageA:2, pageB:4}>
  LSN 6: <T1, C, 300, 350>    pageC.LSN = 6
  LSN 7: <T1, commit>
  LSN 8: <T2, D, 400, 450>    pageD.LSN = 8
  *** 장애 ***

1. 분석 단계 (LSN 5부터 정방향):
   활성 트랜잭션: T1(커밋됨), T2(미커밋)
   Undo-list = {T2}
   Dirty pages = {pageA, pageB, pageC, pageD}
   RedoLSN = min(dirty page table의 recLSN) = 2

2. Redo 단계 (LSN 2부터 정방향):
   LSN 2: pageA가 디스크에 있고 pageLSN < 2이면 redo
   LSN 4: pageB의 pageLSN < 4이면 redo
   LSN 6: pageC의 pageLSN < 6이면 redo
   LSN 8: pageD의 pageLSN < 8이면 redo

3. Undo 단계 (T2의 변경을 역순으로 undo):
   LSN 8: D = 400으로 복원, CLR 기록: <CLR, T2, D, 400, undoNext=4>
   LSN 4: B = 200으로 복원, CLR 기록: <CLR, T2, B, 200, undoNext=null>
   T2: <T2, abort> 기록
```

## 관련 개념

- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
- [Checkpoint](/knowledge/database/checkpoint/)
- [Log Record](/knowledge/database/log-record/)
