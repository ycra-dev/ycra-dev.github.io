---
title: "Ordered Index"
description: "순서 인덱스(Ordered Index)는 검색 키 값을 정렬된 순서로 저장하고, 각 검색 키에 해당하는 레코드에 대한 포인터를 연관시키는 인덱스 구조이다"
tags: ['Ordered Index', 'Clustering Index', 'Nonclustering Index', 'Secondary Index', 'Index Sequential File']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/ordered-index
sidebar:
  order: 1
---

## 핵심 개념

순서 인덱스는 파일의 물리적 정렬 순서와의 관계에 따라 두 가지로 분류된다:

1. **클러스터링 인덱스(Clustering Index)**: 인덱스의 검색 키가 파일의 물리적 정렬 순서와 일치하는 경우. 기본 인덱스(primary index)라고도 하지만, 반드시 주 키에 대한 것일 필요는 없다. 클러스터링 인덱스와 검색 키에 따라 정렬된 파일의 조합을 인덱스 순차 파일(index-sequential file)이라 한다.

2. **비클러스터링 인덱스(Nonclustering Index)**: 인덱스의 검색 키 순서가 파일의 물리적 정렬 순서와 다른 경우. 보조 인덱스(secondary index)라고도 한다. 비고유 검색 키에 대한 보조 인덱스는 레코드를 직접 가리키지 않고, 레코드 포인터를 담은 버킷을 가리키는 추가 간접 참조 수준을 사용한다.

인덱스 평가 기준: 접근 유형(동등/범위 검색), 접근 시간, 삽입/삭제 시간, 공간 오버헤드.

하나의 파일에 여러 인덱스를 만들 수 있다. 예를 들어 학생 릴레이션에서 저자, 주제, 제목 각각에 인덱스를 구성할 수 있다. 복합 검색 키(composite search key)는 여러 속성의 조합으로 구성되며, 속성의 순서가 의미를 가진다.

대부분의 데이터베이스 시스템은 주 키에 대해 자동으로 인덱스를 생성하며, 외래 키에도 인덱스를 만드는 것이 일반적으로 좋다. 인덱스 튜닝 도구(index tuning wizard)가 쿼리 빈도를 분석하여 적절한 인덱스를 추천하기도 한다.

## 예시

클러스터링 vs 비클러스터링 인덱스:

```
instructor 파일 (ID 기준 정렬):
[10101, Srinivasan, Comp.Sci., 65000]
[12121, Wu, Finance, 90000]
[15151, Mozart, Music, 40000]
...

1) ID에 대한 클러스터링 인덱스:
   인덱스 순서 = 파일 물리적 순서
   → 범위 검색 시 연속 블록 읽기 가능

2) dept_name에 대한 비클러스터링(보조) 인덱스:
   인덱스: [Biology → 버킷] → [76766]
          [Comp.Sci. → 버킷] → [10101, 45565, 83821]
          [Finance → 버킷] → [12121, 76543]
   → 인덱스 순서 ≠ 파일 물리적 순서
   → 각 레코드가 서로 다른 블록에 있을 수 있음

복합 검색 키 예시:
  인덱스 on (course_id, semester, year)
  → WHERE course_id = 'CS101' AND semester = 'Fall' AND year = 2019
    에 효율적
```

## 관련 개념

- [Dense Index](/knowledge/database/dense-index/)
- [Sparse Index](/knowledge/database/sparse-index/)
- [B-Plus Tree](/knowledge/database/b-plus-tree/)
- [Sequential File](/knowledge/database/sequential-file/)
- [Hash Index](/knowledge/database/hash-index/)
