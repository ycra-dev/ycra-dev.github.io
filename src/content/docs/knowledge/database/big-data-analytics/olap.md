---
title: "OLAP"
description: "온라인 분석 처리(OLAP, Online Analytical Processing)는 데이터 분석가가 대용량 데이터에 대한 집계 질의에 거의 실시간으로 응답을 얻을 수 있게 하는 시스템으로, 다차원 데이터에 대한 대화형 분석을 지원한다"
tags: ['OLAP', 'Online Analytical Processing', 'Data Analysis', 'Cross Tabulation', 'Pivot']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/olap
sidebar:
  order: 10
---

## 핵심 개념

데이터 분석은 데이터 값이 "흥미로운" 방식으로 그룹화될 때 나타나는 패턴을 찾는 것을 포함한다. OLAP 시스템은 분석가가 동일한 데이터에 대해 서로 다른 교차표(cross-tab)를 대화형으로 선택할 수 있게 해준다.

OLAP의 주요 연산:
- **피벗(Pivoting)**: 교차표에 사용되는 차원을 변경하는 연산. 예를 들어, item_name과 color에서 item_name과 clothes_size로 변경.
- **슬라이싱(Slicing)**: 특정 차원의 고정된 값에 대한 교차표를 보는 연산. 데이터 큐브의 "슬라이스"를 보는 것과 같다.
- **다이싱(Dicing)**: 여러 차원의 값을 고정하는 연산.
- **롤업(Rollup)**: 세밀한 데이터에서 더 거친 입도(granularity)로 이동하는 연산 (집계를 통해).
- **드릴다운(Drill Down)**: 거친 입도에서 더 세밀한 입도로 이동하는 연산.

차원 속성에 대한 계층(hierarchy)을 정의할 수 있다. 예를 들어, 시간 차원은 datetime → date → month → quarter → year 계층을, 위치 차원은 city → state → country → region 계층을 가질 수 있다.

데이터베이스 구현 측면에서, 컬럼 지향 저장(column-oriented storage)은 OLAP 워크로드에 매우 효과적이다. 행 지향 저장과 달리 필요한 속성만 디스크에서 가져오므로 집계 질의에 유리하다.

## 예시

SQL에서 피벗 테이블 생성:

```sql
SELECT *
FROM sales
PIVOT (
    SUM(quantity)
    FOR color IN ('dark', 'pastel', 'white')
)
ORDER BY item_name;
```

SQL의 CUBE 연산으로 데이터 큐브 생성:

```sql
SELECT item_name, color, clothes_size, SUM(quantity)
FROM sales
GROUP BY CUBE(item_name, color, clothes_size);
```

이 질의는 3개 차원의 모든 가능한 조합에 대한 집계를 생성한다.

## 관련 개념

- [Data Cube](/knowledge/database/data-cube/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
- [Star Schema](/knowledge/database/star-schema/)
- [Column-Oriented Storage](/knowledge/database/column-oriented-storage/)
- [Decision Support System](/knowledge/database/decision-support-system/)
