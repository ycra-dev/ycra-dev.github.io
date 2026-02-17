---
title: "Selection Operation"
description: "선택 연산(Selection Operation)은 주어진 선택 조건을 만족하는 레코드를 찾아 검색하는 쿼리 처리의 기본 연산으로, 파일 스캔(file scan)과 인덱스 스캔(index scan) 등 다양한 알고리즘을 통해 구현된다"
tags: ['Selection', 'Query Processing', 'Index Scan', 'File Scan']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/selection-operation
sidebar:
  order: 3
---

## 핵심 개념

선택 연산을 구현하는 주요 알고리즘은 다음과 같다:

**A1 (선형 검색, Linear Search):** 파일의 각 블록을 스캔하며 모든 레코드를 검사한다. 어떤 파일에도 적용 가능하지만 가장 느리다. 비용은 `t_S + b_r * t_T`이며, 키에 대한 동등 비교인 경우 평균 비용은 `t_S + (b_r/2) * t_T`이다.

**A2 (클러스터링 B+-tree 인덱스, 키 동등):** 인덱스를 사용하여 단일 레코드를 검색한다. 비용은 `(h_i + 1) * (t_T + t_S)`이다.

**A3 (클러스터링 인덱스, 비-키 동등):** 여러 레코드가 연속적으로 저장되어 있으므로 효율적으로 검색 가능하다. 비용은 `h_i * (t_T + t_S) + t_S + b * t_T`이다.

**A4 (보조 인덱스, 동등):** 보조(비클러스터링) 인덱스를 사용한 검색이다. 키에 대한 동등 비교는 A2와 동일하나, 비-키의 경우 각 레코드가 다른 블록에 있을 수 있어 비용이 `(h_i + n) * (t_T + t_S)`로 매우 높을 수 있다.

**복합 선택 조건 처리:**
- **A7 (인덱스 하나를 사용한 결합 선택):** 하나의 조건에 인덱스를 사용하고, 나머지 조건은 메모리에서 검증한다.
- **A9 (식별자 교집합에 의한 결합 선택):** 각 조건에 대해 별도로 인덱스를 스캔하고, 포인터의 교집합을 구한다.
- **A10 (식별자 합집합에 의한 이접 선택):** 각 조건의 인덱스 스캔 결과의 합집합을 구한다.

PostgreSQL은 보조 인덱스 사용 시 **비트맵 인덱스 스캔(bitmap index scan)** 하이브리드 알고리즘을 사용하여, 인덱스 스캔과 선형 스캔의 장점을 결합한다.

## 예시

다음 쿼리의 선택 연산을 고려하자:

```sql
SELECT * FROM instructor WHERE dept_name = 'Physics' AND salary > 80000;
```

A7 알고리즘을 사용하면:
1. dept_name에 대한 인덱스가 있다면 먼저 dept_name = 'Physics'인 레코드를 인덱스로 검색
2. 검색된 레코드에 대해 메모리에서 salary > 80000 조건을 추가로 검증

A9 알고리즘을 사용하면:
1. dept_name 인덱스에서 'Physics'에 해당하는 레코드 포인터 집합 획득
2. salary 인덱스에서 salary > 80000에 해당하는 레코드 포인터 집합 획득
3. 두 집합의 교집합에 해당하는 실제 레코드를 검색

## 관련 개념

- [Query Processing](/knowledge/database/query-processing/)
- [Query Cost](/knowledge/database/query-cost/)
- [External Sort-Merge](/knowledge/database/external-sort-merge/)
- [Hash Join](/knowledge/database/hash-join/)
