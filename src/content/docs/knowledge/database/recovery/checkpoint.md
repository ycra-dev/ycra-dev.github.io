---
title: "Checkpoint"
description: "검사점(Checkpoint)은 데이터베이스 시스템이 주기적으로 수행하는 작업으로, 메모리의 변경된 데이터 블록을 디스크에 기록하고 로그에 검사점 레코드를 남겨, 복구 시 로그 전체를 처리하지 않고 가장 최근 검사점부터 복구를 시작할 수 있게 하는 메커니즘이다"
tags: ['Checkpoint', 'Recovery', 'Log', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/checkpoint
sidebar:
  order: 3
---

## 핵심 개념

**검사점의 필요성:**
WAL 기반 복구에서 장애 후 전체 로그를 처음부터 검사하면 시간이 오래 걸린다. 검사점은 "이 시점까지의 모든 변경사항이 디스크에 반영되었다"는 것을 보장하므로, 검사점 이전의 로그는 복구에서 무시할 수 있다.

**단순 검사점 프로토콜:**
1. 모든 로그 레코드를 안정적 저장소에 기록 (로그 플러시)
2. 수정된 모든 버퍼 블록을 디스크에 기록
3. 로그에 `<checkpoint L>` 레코드를 기록 (L은 검사점 시점에 활성인 트랜잭션 목록)

단순 검사점의 문제점은 검사점 수행 중 모든 트랜잭션이 중단되어야 한다는 것이다. 이는 성능에 큰 영향을 미친다.

**퍼지 검사점(Fuzzy Checkpoint):**
실제 시스템에서는 퍼지 검사점을 사용한다. 트랜잭션 처리를 중단하지 않고 검사점을 수행한다:
1. `<checkpoint L>` 레코드를 로그에 기록
2. 수정된 블록을 백그라운드에서 점진적으로 디스크에 기록
3. 모든 수정된 블록이 기록되면 `last_checkpoint` 포인터를 업데이트

퍼지 검사점에서는 검사점 레코드에 수정된 블록의 목록(dirty page list)을 포함한다. 복구 시 이 목록을 사용하여 어떤 블록이 디스크에 기록되지 않았을 수 있는지 파악한다.

**복구에서의 검사점 활용:**
1. 로그를 역방향으로 스캔하여 가장 최근 `<checkpoint L>` 레코드를 찾음
2. L에 있는 트랜잭션부터 복구 시작
3. 검사점 이전에 커밋된 트랜잭션은 이미 디스크에 반영되었으므로 무시
4. 검사점 이후의 트랜잭션에 대해 redo/undo 수행

**검사점 빈도:**
검사점이 너무 자주 → 성능 저하 (디스크 쓰기 오버헤드)
검사점이 너무 드물게 → 복구 시간 증가 (더 많은 로그 처리)
적절한 빈도를 선택하는 것이 중요하다.

## 예시

검사점을 포함한 로그와 복구:

```
로그:
  <T1, start>
  <T1, A, 100, 50>
  <T1, commit>
  <T2, start>
  <T2, B, 200, 150>
  <checkpoint {T2}>       ← 검사점 시 T2만 활성
  <T2, C, 300, 350>
  <T3, start>
  <T3, D, 400, 450>
  <T2, commit>
  *** 장애 발생 ***
```

복구 과정:
```
1. 가장 최근 검사점 찾기: <checkpoint {T2}>
2. 검사점 이후 활성 트랜잭션: T2, T3

3. Redo (검사점부터 정방향):
   T2: C=350 (redo), T3: D=450 (redo), T2: commit (기록)

4. Undo (역방향, 미커밋 트랜잭션):
   T3: 커밋 없음 → D=400으로 복원 (undo)
   T2: 커밋됨 → undo 불필요

주의: T1은 검사점 전에 이미 커밋 → 복구 대상 아님!
```

## 관련 개념

- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
- [ARIES](/knowledge/database/aries/)
- [Log Record](/knowledge/database/log-record/)
