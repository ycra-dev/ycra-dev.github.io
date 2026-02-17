---
title: "GROUP BY Clause"
description: "GROUP BY 절은 SQL에서 지정된 속성(들)의 값이 동일한 튜플들을 하나의 그룹으로 묶어, 각 그룹에 대해 별도로 집계 함수를 적용할 수 있게 하는 구문이다"
tags: ['Group By', 'Aggregation', 'Grouping', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/group-by-clause
sidebar:
  order: 9
---

## 핵심 개념

GROUP BY 절은 집계 함수와 함께 사용되어 데이터를 의미 있는 그룹으로 분류하고, 각 그룹의 요약 정보를 산출한다. GROUP BY 절에 나열된 속성의 값이 동일한 모든 튜플이 하나의 그룹을 형성한다.

SQL 질의에서 GROUP BY 절이 사용될 때, select 절에는 두 종류의 항목만 나타날 수 있다: (1) GROUP BY 절에 나열된 속성, (2) 집계 함수 호출. GROUP BY 절에 나열되지 않은 일반 속성이 select 절에 나타나면 오류가 발생한다. 이는 하나의 그룹 내에서 해당 속성이 여러 다른 값을 가질 수 있어 어떤 값을 표시해야 할지 모호하기 때문이다.

GROUP BY 절의 처리 순서는 다음과 같다: (1) FROM 절에서 릴레이션을 가져온다, (2) WHERE 절로 튜플을 필터링한다, (3) GROUP BY 절로 그룹을 형성한다, (4) HAVING 절로 그룹을 필터링한다, (5) SELECT 절에서 집계 연산을 수행하고 결과를 생성한다.

여러 속성으로 그룹핑하려면 GROUP BY 절에 쉼표로 구분하여 나열한다. 예를 들어, GROUP BY dept_name, semester는 학과와 학기의 각 조합에 대해 하나의 그룹을 생성한다.

GROUP BY가 없이 집계 함수를 사용하면 전체 릴레이션이 하나의 그룹으로 취급되며, 단일 결과 행이 반환된다.

## 예시

```sql
-- 학과별 평균 급여
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name;

-- 학과별 교수 수
SELECT dept_name, COUNT(*) AS num_instructors
FROM instructor
GROUP BY dept_name;

-- 여러 속성으로 그룹핑
SELECT dept_name, semester, COUNT(*) AS num_sections
FROM section
GROUP BY dept_name, semester;

-- GROUP BY 없이 집계 (전체를 하나의 그룹으로)
SELECT AVG(salary) FROM instructor;

-- 잘못된 예: select에 GROUP BY에 없는 속성 포함
-- SELECT dept_name, name, AVG(salary)  -- 오류! name이 GROUP BY에 없음
-- FROM instructor
-- GROUP BY dept_name;

-- 올바른 예: GROUP BY에 포함된 속성만 select에 사용
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name
ORDER BY avg_salary DESC;
```

## 관련 개념

- [Aggregate Function](/knowledge/database/aggregate-function/)
- [HAVING Clause](/knowledge/database/having-clause/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [SQL](/knowledge/database/sql/)
