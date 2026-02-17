---
title: "Write-Ahead Logging"
description: "선행 기록 로깅(Write-Ahead Logging, WAL)은 데이터베이스의 변경사항을 디스크에 기록하기 전에 반드시 해당 변경에 대한 로그 레코드를 먼저 안정적인 저장소에 기록해야 한다는 규칙으로, 데이터베이스 복구의 핵심 원칙이다"
tags: ['Write Ahead Logging', 'Wal', 'Recovery', 'Log']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/write-ahead-logging
sidebar:
  order: 2
---

## 핵심 개념

**WAL 원칙:**
1. 데이터베이스를 수정하기 전에 해당 수정에 대한 로그 레코드를 안정적 저장소에 기록
2. 트랜잭션이 커밋되기 전에 해당 트랜잭션의 모든 로그 레코드를 안정적 저장소에 기록

이 원칙은 시스템 장애 후 복구를 가능하게 한다. 로그에는 모든 변경의 undo 정보(이전 값)와 redo 정보(새 값)가 포함되어 있으므로, 장애 후 커밋된 트랜잭션은 redo하고 미커밋 트랜잭션은 undo할 수 있다.

**로그 기반 복구의 동작:**

*Undo(취소):* 로그 레코드의 이전 값을 사용하여 변경을 취소한다. 미커밋 트랜잭션의 변경사항을 복원하는 데 사용된다.

*Redo(재실행):* 로그 레코드의 새 값을 사용하여 변경을 다시 적용한다. 커밋된 트랜잭션의 변경사항이 디스크에 반영되지 않았을 경우 사용된다.

**WAL의 구현:**
로그는 순차적으로 기록되며, 로그 버퍼를 사용한다. 로그 버퍼는 다음 경우에 디스크에 플러시된다:
- 로그 버퍼가 가득 찼을 때
- 트랜잭션 커밋 시
- 특정 시간 간격마다

**WAL의 성능 장점:**
WAL은 데이터 페이지의 랜덤 I/O를 로그의 순차 I/O로 대체한다. 로그 기록은 순차적이므로 디스크 탐색이 거의 필요 없어 매우 빠르다. 실제 데이터 페이지의 디스크 기록은 나중에 배치 처리로 효율적으로 수행할 수 있다.

**그룹 커밋(Group Commit):**
여러 트랜잭션의 로그 레코드를 모아서 한 번에 디스크에 기록하여 I/O 효율을 높인다. 개별 커밋마다 디스크에 쓰는 것보다 훨씬 효율적이다.

PostgreSQL, MySQL/InnoDB, Oracle 등 거의 모든 현대 데이터베이스 시스템이 WAL을 사용한다.

## 예시

WAL의 동작 순서:

```
1. 트랜잭션 T 시작
   로그: <T, start>

2. T가 A를 100에서 50으로 변경
   로그: <T, A, 100, 50>    ← 먼저 로그에 기록 (WAL)
   버퍼의 A를 50으로 변경    ← 그 다음 데이터 변경

3. T가 B를 200에서 250으로 변경
   로그: <T, B, 200, 250>   ← 먼저 로그에 기록 (WAL)
   버퍼의 B를 250으로 변경   ← 그 다음 데이터 변경

4. T 커밋
   로그: <T, commit>        ← 로그를 안정적 저장소에 플러시
   (데이터 페이지는 아직 디스크에 기록되지 않았을 수 있음)
```

장애 후 복구 시나리오:
```
시나리오 1: 커밋 후 장애 (데이터가 디스크에 기록되지 않음)
  → 로그에서 <T, commit>을 발견
  → Redo: A=50, B=250을 디스크에 기록

시나리오 2: 커밋 전 장애
  → 로그에서 <T, commit>이 없음
  → Undo: A=100, B=200으로 복원
```

## 관련 개념

- [Log Record](/knowledge/database/log-record/)
- [Checkpoint](/knowledge/database/checkpoint/)
- [ARIES](/knowledge/database/aries/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
- [ACID Properties](/knowledge/database/acid-properties/)
