---
title: "Data Cube"
description: "데이터 큐브(Data Cube)는 교차표(cross-tabulation)의 n차원 일반화로, 다차원 데이터의 모든 가능한 그룹화 조합에 대한 집계 값을 포함하는 구조이다"
tags: ['Data Cube', 'OLAP', 'Multidimensional Data', 'Aggregation', 'Cross Tabulation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/data-cube
sidebar:
  order: 11
---

## 핵심 개념

교차표가 2차원인 것을 n차원으로 확장한 것이 데이터 큐브이다. 각 셀은 차원 속성들의 값으로 식별되며, 측정 속성(measure attribute)의 집계 값을 포함한다. 차원 값이 'all'인 경우 해당 차원의 모든 값에 대한 요약을 나타낸다.

n개의 차원을 가진 테이블에서 집계는 2^n개의 서로 다른 방식으로 수행될 수 있다. 예를 들어, item_name, color, clothes_size 3개 차원이 있고 각각 4, 3, 3개의 값을 가지면, all을 포함하여 (4+1) x (3+1) x (3+1) = 80 크기의 큐브가 된다.

관계형 표현에서는 특별한 값 'all'을 도입하여 소계(subtotals)를 포함한 교차표를 릴레이션 형태로 나타낼 수 있다. 예를 들어, (skirt, all, all, 53) 튜플은 skirt의 모든 색상과 모든 사이즈에 대한 수량 합계가 53임을 의미한다.

SQL에서는 GROUP BY CUBE 구문으로 데이터 큐브의 모든 집계를 단일 질의로 생성할 수 있다. 또한 GROUP BY ROLLUP은 특정 차원 계층에 따른 집계만 생성하며, GROUP BY GROUPING SETS는 원하는 그룹화만 선택적으로 지정할 수 있다.

## 예시

3차원 데이터 큐브의 관계형 표현:

```
item_name  | color  | clothes_size | quantity
-----------+--------+--------------+---------
skirt      | dark   | all          | 8
skirt      | pastel | all          | 35
skirt      | all    | all          | 53
dress      | dark   | all          | 20
all        | dark   | all          | 62
all        | all    | all          | 164
```

SQL CUBE 연산:

```sql
SELECT item_name, color, SUM(quantity)
FROM sales
GROUP BY CUBE(item_name, color);
```

이 질의는 다음 그룹화들을 모두 생성한다:
- (item_name, color) - 각 아이템/색상별
- (item_name) - 각 아이템별 (color가 all)
- (color) - 각 색상별 (item_name이 all)
- () - 전체 합계 (둘 다 all)

## 관련 개념

- [OLAP](/knowledge/database/olap/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [Star Schema](/knowledge/database/star-schema/)
- [Decision Support System](/knowledge/database/decision-support-system/)
