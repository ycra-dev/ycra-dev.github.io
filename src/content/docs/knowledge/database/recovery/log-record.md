---
title: "Log Record"
description: "로그 레코드(Log Record)는 트랜잭션이 데이터베이스에 수행한 각 변경사항을 기록하는 단위로, 변경 전 값(undo 정보)과 변경 후 값(redo 정보)을 포함하여 장애 복구 시 트랜잭션의 원자성과 지속성을 보장하는 데 사용된다"
tags: ['Log Record', 'Transaction Log', 'Redo', 'Undo']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/log-record
sidebar:
  order: 1
---

## 핵심 개념

**로그 레코드의 유형:**

1. **트랜잭션 시작:** `<Ti, start>` - 트랜잭션 Ti가 실행을 시작했음을 기록

2. **갱신 레코드:** `<Ti, Xj, V_old, V_new>` - 트랜잭션 Ti가 데이터 항목 Xj의 값을 V_old에서 V_new로 변경했음을 기록
   - V_old: 이전 값 (undo에 사용)
   - V_new: 새 값 (redo에 사용)

3. **커밋:** `<Ti, commit>` - 트랜잭션 Ti가 성공적으로 완료되었음을 기록

4. **중단:** `<Ti, abort>` - 트랜잭션 Ti가 중단되었음을 기록

5. **검사점:** `<checkpoint L>` - 검사점 레코드, L은 활성 트랜잭션 목록

6. **보상 로그 레코드(CLR):** `<Ti, Xj, V, undoNextLSN>` - undo 과정에서 생성되는 레코드, undoNextLSN은 다음으로 undo할 로그 레코드를 가리킴

**로그 시퀀스 번호(LSN):**
각 로그 레코드에 고유한 LSN이 부여된다. LSN은 단조 증가하며, 각 데이터 페이지에도 해당 페이지에 마지막으로 적용된 변경의 LSN(pageLSN)이 저장된다. redo 시 `pageLSN >= 로그 레코드의 LSN`이면 해당 변경은 이미 디스크에 반영되었으므로 skip한다.

**물리적 로깅 vs 논리적 로깅:**
- **물리적 로깅:** 변경된 바이트 또는 블록의 정확한 내용을 기록. 간단하지만 공간 소비가 클 수 있음
- **논리적 로깅:** 수행된 연산(예: "X에 10 추가")을 기록. 공간 효율적이지만 undo가 복잡할 수 있음
- **물리논리적(Physiological) 로깅:** ARIES에서 사용하는 방식으로, 페이지 수준에서는 물리적이지만 페이지 내에서는 논리적으로 기록. 대부분의 현대 시스템이 이 방식을 사용

**로그의 저장:**
로그는 안정적 저장소(stable storage)에 기록되어야 한다. 이를 위해 미러링된 디스크나 RAID를 사용한다. 로그 버퍼링을 통해 I/O 효율을 높이며, 커밋 시 로그를 강제로 디스크에 플러시한다.

## 예시

계좌 이체 트랜잭션의 로그:

```
LSN 101: <T1, start>
LSN 102: <T1, A, 1000, 950>     -- A에서 $50 인출
LSN 103: <T1, B, 2000, 2050>    -- B에 $50 입금
LSN 104: <T1, commit>           -- 트랜잭션 완료
```

Undo 시 CLR 생성 예:
```
T2가 중단되는 경우:
LSN 201: <T2, start>
LSN 202: <T2, C, 500, 600>      -- C를 600으로 변경
LSN 203: <T2, D, 700, 800>      -- D를 800으로 변경
  *** T2 중단 ***

Undo 과정 (역순):
LSN 204: <CLR, T2, D, 700, undoNext=202>  -- D를 700으로 복원
LSN 205: <CLR, T2, C, 500, undoNext=null> -- C를 500으로 복원
LSN 206: <T2, abort>
```

CLR의 undoNextLSN을 통해, undo 중 재장애가 발생해도
이미 undo된 변경을 다시 undo하지 않는다:
```
재장애 후 복구:
  Redo: LSN 202, 203, 204, 205 모두 redo
  Undo: T2의 마지막 CLR(205)의 undoNext=null → 더 이상 undo 불필요
```

## 관련 개념

- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
- [ARIES](/knowledge/database/aries/)
- [Checkpoint](/knowledge/database/checkpoint/)
