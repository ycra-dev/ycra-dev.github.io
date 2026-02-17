---
title: "Bitmap Index"
description: "비트맵 인덱스(Bitmap Index)는 각 속성 값에 대해 비트 배열(bitmap)을 유지하는 특수한 인덱스 구조로, 복수 키에 대한 결합 질의를 비트 연산으로 효율적으로 처리한다"
tags: ['Bitmap Index', 'Bitmap', 'Bitwise Operation', 'Low Cardinality', 'Data Warehouse']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/bitmap-index
sidebar:
  order: 8
---

## 핵심 개념

비트맵 인덱스에서 속성 A의 각 가능한 값 v_j에 대해 하나의 비트맵이 생성된다. 비트맵의 i번째 비트는 i번째 레코드의 A 속성 값이 v_j이면 1, 아니면 0이다. 이를 위해 릴레이션의 레코드에 0부터 순차적으로 번호가 매겨져야 한다.

비트맵 인덱스의 핵심 장점은 복수 속성에 대한 선택 조건을 비트 단위 AND, OR 연산으로 결합할 수 있다는 점이다. 예를 들어 "성별이 여성이고 소득 수준이 L1"인 레코드를 찾으려면, 성별=f 비트맵과 소득수준=L1 비트맵의 AND 연산 결과에서 1인 위치의 레코드를 가져오면 된다.

단일 속성에 대한 단순 선택에서는 비트맵 인덱스가 큰 이점을 제공하지 못한다. 카디널리티가 낮은 속성(2~20개 정도의 고유 값)에서 가장 효과적이며, 데이터 웨어하우스와 같은 분석 환경에서 주로 사용된다.

비트맵 인덱스는 컬럼 지향 저장과 잘 어울린다. 컬럼 저장 방식에서 비트맵을 활용한 인덱싱과 쿼리 처리 기법이 함께 사용된다.

레코드 수가 n이고 속성의 고유 값 수가 v이면, 비트맵 인덱스의 총 크기는 n * v 비트이다. 카디널리티가 낮을 때 이 크기는 B+트리 인덱스보다 상당히 작다.

## 예시

비트맵 인덱스를 이용한 복합 질의:

```
instructor_info 릴레이션 (10개 레코드):
번호  gender  income_level
0     m       L1
1     f       L2
2     f       L3
3     m       L4
4     m       L2
5     f       L3
6     m       L4
7     f       L1
8     m       L5
9     f       L2

gender 비트맵:
  m: 1 0 0 1 1 0 1 0 1 0
  f: 0 1 1 0 0 1 0 1 0 1

income_level 비트맵:
  L1: 1 0 0 0 0 0 0 1 0 0
  L2: 0 1 0 0 1 0 0 0 0 1
  L3: 0 0 1 0 0 1 0 0 0 0
  ...

쿼리: gender = 'f' AND income_level = 'L2'
  f:  0 1 1 0 0 1 0 1 0 1
  L2: 0 1 0 0 1 0 0 0 0 1
AND: 0 1 0 0 0 0 0 0 0 1
  → 레코드 1번과 9번이 조건 만족
```

## 관련 개념

- [Column-Oriented Storage](/knowledge/database/column-oriented-storage/)
- [B-Plus Tree](/knowledge/database/b-plus-tree/)
- [Ordered Index](/knowledge/database/ordered-index/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [OLAP](/knowledge/database/olap/)
