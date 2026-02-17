---
title: "File Organization"
description: "파일 조직(File Organization)은 데이터베이스가 레코드를 디스크 블록에 매핑하여 파일로 저장하는 방식으로, 고정 길이 및 가변 길이 레코드의 효율적 저장과 접근을 위한 구조를 정의한다"
tags: ['File Organization', 'Record Storage', 'Block Structure', 'Fixed Length Record', 'Variable Length Record']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/file-organization
sidebar:
  order: 6
---

## 핵심 개념

데이터베이스는 운영체제 파일을 레코드 저장의 중간 계층으로 사용한다. 파일은 논리적으로 고정 길이의 블록(일반적으로 4~8KB)으로 분할되며, 블록은 저장 할당과 데이터 전송의 기본 단위이다. 각 레코드는 하나의 블록 안에 완전히 포함되어야 하며, 블록 경계를 넘지 않는다.

고정 길이 레코드 저장에서는 각 레코드가 동일한 크기를 차지하므로 i번째 레코드의 위치를 산술적으로 계산할 수 있다. 레코드 삭제 시에는 프리 리스트(free list)를 사용하여 빈 공간을 관리한다.

가변 길이 레코드는 varchar 같은 가변 길이 데이터 타입을 지원하기 위해 필요하다. 레코드 헤더에 각 속성의 오프셋과 길이를 저장하고, 널 비트맵(null bitmap)을 사용하여 null 값을 표시한다. 블록 내에서는 슬롯 페이지(slotted-page) 구조를 사용하여 가변 길이 레코드를 관리한다.

레코드를 파일에 조직하는 방식에는 힙 파일(임의 위치), 순차 파일(검색 키 순서), 다중 테이블 클러스터링, B+트리 파일, 해싱 파일 등이 있다.

## 예시

고정 길이 레코드 저장 예시:

```
instructor 레코드 구조:
  ID: varchar(5)     → 5바이트
  name: varchar(20)  → 20바이트
  dept_name: varchar(20) → 20바이트
  salary: numeric(8,2)   → 8바이트
  ─────────────────────
  총 레코드 크기: 53바이트

블록 크기: 4096바이트
블록당 레코드 수: floor(4096 / 53) = 77개

i번째 레코드 위치 = i × 53 바이트
```

## 관련 개념

- [Heap File](/knowledge/database/heap-file/)
- [Sequential File](/knowledge/database/sequential-file/)
- [Slotted Page](/knowledge/database/slotted-page/)
- [Buffer Pool](/knowledge/database/buffer-pool/)
- [B-Plus Tree](/knowledge/database/b-plus-tree/)
