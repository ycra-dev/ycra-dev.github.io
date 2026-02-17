---
title: "Shadow Paging"
description: "그림자 페이징(Shadow Paging)은 데이터베이스의 변경사항을 원본 페이지가 아닌 새로운 페이지에 기록하고, 트랜잭션 커밋 시 페이지 테이블을 원자적으로 전환하여 복구를 지원하는 기법으로, 로그 없이도 원자성을 보장할 수 있는 대안적 복구 방법이다"
tags: ['Shadow Paging', 'Recovery', 'No Log', 'Copy On Write']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/shadow-paging
sidebar:
  order: 6
---

## 핵심 개념

**기본 개념:**
그림자 페이징은 두 개의 페이지 테이블을 유지한다:
- **현재 페이지 테이블(Current Page Table):** 트랜잭션이 수정 중인 최신 데이터를 가리킴
- **그림자 페이지 테이블(Shadow Page Table):** 트랜잭션 시작 시의 데이터를 가리킴 (수정되지 않음)

트랜잭션이 페이지를 수정할 때:
1. 해당 페이지의 복사본을 새로운 디스크 위치에 생성
2. 새 페이지에 변경사항을 기록
3. 현재 페이지 테이블이 새 페이지를 가리키도록 업데이트
4. 그림자 페이지 테이블은 원래 페이지를 계속 가리킴

**커밋과 중단:**
- **커밋:** 현재 페이지 테이블을 새로운 그림자 페이지 테이블로 설정 (원자적 포인터 교환)
- **중단:** 현재 페이지 테이블을 버리고 그림자 페이지 테이블로 복원

이 방식은 로그 기반 복구와 달리 redo/undo가 필요 없다. 장애 발생 시 그림자 페이지 테이블이 일관된 상태를 제공한다.

**장단점:**

*장점:*
- 개념적으로 간단하다
- 복구가 매우 빠르다 (로그 재생 불필요)
- 로그 관리 오버헤드가 없다

*단점:*
- 데이터 단편화가 심해짐 (페이지가 디스크의 여러 위치에 분산)
- 페이지 테이블 자체가 매우 커질 수 있음 (대규모 데이터베이스에서)
- 동시성 제어와 결합하기 어려움 (동시 트랜잭션 지원이 복잡)
- 페이지 테이블의 원자적 업데이트 보장이 복잡

이러한 단점들 때문에 현대의 대부분의 데이터베이스 시스템은 그림자 페이징 대신 WAL 기반 복구를 사용한다. 다만 일부 파일 시스템(예: ZFS)이나 특수 목적 시스템에서는 그림자 페이징의 변형이 사용된다.

## 예시

그림자 페이징의 동작:

```
초기 상태:
  Shadow Page Table → [Page1_addr, Page2_addr, Page3_addr]
  Current Page Table → [Page1_addr, Page2_addr, Page3_addr]
  (두 테이블이 같은 페이지를 가리킴)

T가 Page2를 수정:
  1. Page2의 복사본을 새 위치에 생성 → Page2'
  2. Page2'에 변경사항 기록
  3. Current Page Table → [Page1_addr, Page2'_addr, Page3_addr]
  4. Shadow Page Table → [Page1_addr, Page2_addr, Page3_addr] (불변)

T 커밋 전 장애:
  → Shadow Page Table이 유효 → 원래 상태로 자동 복구
  → Page2'는 가비지 컬렉션으로 회수

T 커밋:
  → db_pointer를 Current Page Table로 원자적으로 전환
  → Shadow = Current = [Page1_addr, Page2'_addr, Page3_addr]
  → 원래 Page2는 가비지 컬렉션으로 회수
```

커밋의 원자성 보장:
```
db_pointer: 디스크의 고정 위치에 저장되는 포인터
  - 그림자 페이지 테이블의 주소를 가리킴
  - 커밋 시: db_pointer를 현재 페이지 테이블 주소로 변경
  - 이 포인터 변경은 단일 디스크 블록 쓰기로 원자적
```

## 관련 개념

- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
- [Atomicity](/knowledge/database/atomicity/)
- [ACID Properties](/knowledge/database/acid-properties/)
