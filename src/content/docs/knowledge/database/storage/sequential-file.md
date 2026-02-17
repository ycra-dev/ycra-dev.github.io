---
title: "Sequential File"
description: "순차 파일(Sequential File)은 레코드를 검색 키(search key)의 정렬 순서대로 저장하는 파일 조직 방식으로, 정렬된 순서의 레코드 처리를 효율적으로 지원한다"
tags: ['Sequential File', 'Search Key Order', 'Overflow Block', 'File Organization', 'Sorted Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/sequential-file
sidebar:
  order: 8
---

## 핵심 개념

순차 파일에서 검색 키는 임의의 속성 또는 속성 집합일 수 있으며, 반드시 주 키(primary key)일 필요는 없다. 레코드는 포인터로 체인 연결되어 검색 키 순서를 유지하며, 물리적으로도 가능한 한 검색 키 순서에 가깝게 저장한다.

삽입과 삭제에 따른 물리적 순서 유지가 핵심 과제이다. 삭제는 포인터 체인으로 처리하고, 삽입 시에는 두 가지 규칙을 적용한다:
1. 검색 키 순서에서 삽입할 레코드 바로 앞의 레코드를 찾는다.
2. 같은 블록에 빈 공간이 있으면 그곳에 삽입하고, 없으면 오버플로 블록(overflow block)에 삽입한다. 어느 경우든 포인터를 조정하여 검색 키 순서를 유지한다.

오버플로 블록의 사용이 적을 때는 이 방식이 잘 동작하지만, 시간이 지남에 따라 검색 키 순서와 물리적 순서의 대응이 완전히 깨질 수 있다. 이때 파일을 재조직(reorganization)하여 물리적 순서를 복원해야 하며, 이는 비용이 높아 시스템 부하가 낮을 때 수행한다. B+트리 파일 조직은 이러한 비용 높은 재조직 없이도 효율적인 정렬 접근을 제공하는 대안이다.

## 예시

순차 파일에서 레코드 삽입 예시:

```
기존 파일 (검색 키: ID):
블록 1: [10101, Srinivasan] → [12121, Wu] → [15151, Mozart]
블록 2: [22222, Einstein] → [32343, El Said] → [33456, Gold]

(32222, Verdi, Music, 48000) 삽입:
1. 검색 키 순서에서 바로 앞 레코드: 22222 (블록 2)
2. 블록 2에 공간 없음 → 오버플로 블록에 삽입
3. 포인터 조정: 22222 → 32222(오버플로) → 32343

오버플로 블록: [32222, Verdi]

시간이 지나면 재조직이 필요함
```

## 관련 개념

- [File Organization](/knowledge/database/file-organization/)
- [Heap File](/knowledge/database/heap-file/)
- [B-Plus Tree](/knowledge/database/b-plus-tree/)
- [Ordered Index](/knowledge/database/ordered-index/)
