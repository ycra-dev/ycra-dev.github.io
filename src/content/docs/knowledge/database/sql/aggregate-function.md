---
title: "Aggregate Function"
description: "집계 함수(aggregate function)는 릴레이션의 한 열에 포함된 값들의 집합(멀티셋)을 입력으로 받아 단일 스칼라 값을 반환하는 SQL 함수로, 데이터의 요약 통계를 계산하는 데 사용된다"
tags: ['Aggregate Function', 'Count', 'Sum', 'Avg', 'Min', 'Max', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/aggregate-function
sidebar:
  order: 8
---

## 핵심 개념

SQL은 다섯 가지 기본 집계 함수를 제공한다:

- **avg(속성):** 값들의 평균을 반환한다. 숫자 타입에만 사용 가능하다.
- **min(속성):** 값들 중 최솟값을 반환한다.
- **max(속성):** 값들 중 최댓값을 반환한다.
- **sum(속성):** 값들의 합계를 반환한다. 숫자 타입에만 사용 가능하다.
- **count(속성):** 값들의 개수를 반환한다. count(*)는 튜플의 총 개수를 반환한다.

집계 함수는 기본적으로 null 값을 무시한다. 유일한 예외는 count(*)로, 이는 null 포함 여부와 관계없이 튜플의 총 수를 센다. 모든 입력 값이 null인 경우, count는 0을 반환하고, 나머지 집계 함수(sum, avg, min, max)는 null을 반환한다.

중복을 제거한 후 집계를 수행하려면 distinct 키워드를 사용한다. 예를 들어, count(distinct ID)는 중복을 제거한 고유 ID의 수를 반환한다.

집계 함수는 GROUP BY 절과 함께 사용되어 그룹별 집계를 수행할 수 있으며, HAVING 절을 통해 그룹 수준의 필터링이 가능하다.

주의할 점은 select 절에 집계 함수와 일반 속성이 함께 나타날 경우, 일반 속성은 반드시 GROUP BY 절에 포함되어야 한다는 것이다. 그렇지 않으면 SQL 표준에서는 오류로 처리하지만, 일부 시스템에서는 임의의 값을 반환할 수 있다.

## 예시

```sql
-- 평균 급여
SELECT AVG(salary) AS avg_salary FROM instructor;

-- 교수 수 (중복 제거 불필요)
SELECT COUNT(*) FROM instructor;

-- 고유 학과 수
SELECT COUNT(DISTINCT dept_name) FROM instructor;

-- 학과별 평균 급여
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name;

-- 최대, 최소 급여
SELECT MAX(salary), MIN(salary) FROM instructor;

-- 급여 합계
SELECT SUM(salary) FROM instructor WHERE dept_name = 'Comp. Sci.';

-- 집계 함수와 null
-- salary가 null인 튜플은 AVG 계산에서 제외됨
SELECT AVG(salary) FROM instructor;  -- null 무시
```

## 관련 개념

- [GROUP BY Clause](/knowledge/database/group-by-clause/)
- [HAVING Clause](/knowledge/database/having-clause/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [NULL Value](/knowledge/database/null-value/)
- [SQL](/knowledge/database/sql/)
