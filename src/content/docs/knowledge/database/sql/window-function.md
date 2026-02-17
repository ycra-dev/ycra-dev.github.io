---
title: "Window Function"
description: "윈도우 함수(window function)는 SQL에서 현재 행과 관련된 행 집합(윈도우)에 대해 계산을 수행하는 함수로, OVER 절을 사용하여 집계를 수행하면서도 개별 행의 정보를 유지할 수 있게 하는 고급 분석 기능이다"
tags: ['Window Function', 'Over Clause', 'Ranking', 'Partition', 'OLAP']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/window-function
sidebar:
  order: 22
---

## 핵심 개념

일반 집계 함수(GROUP BY)는 여러 행을 하나의 결과 행으로 축약하지만, 윈도우 함수는 각 행을 그대로 유지하면서 관련 행들에 대한 계산 결과를 추가한다. 이 특성 때문에 윈도우 함수는 분석 질의에서 매우 유용하다.

**OVER 절:** 윈도우 함수의 핵심 구문으로, 함수가 적용되는 행의 범위(윈도우)를 정의한다.

**PARTITION BY:** 윈도우를 그룹으로 분할하는 절이다. 각 파티션에 대해 독립적으로 윈도우 함수가 적용된다. GROUP BY와 유사하지만 행을 축약하지 않는다.

**ORDER BY:** 윈도우 내의 행 순서를 정의한다. 순위 함수나 누적 계산에 필요하다.

주요 윈도우 함수 유형:

**순위 함수(Ranking Functions):**
- RANK(): 동일한 값에 같은 순위를 부여하고, 다음 순위를 건너뛴다 (1, 2, 2, 4)
- DENSE_RANK(): 동일한 값에 같은 순위를 부여하되, 다음 순위를 건너뛰지 않는다 (1, 2, 2, 3)
- ROW_NUMBER(): 각 행에 고유한 순서 번호를 부여한다 (1, 2, 3, 4)
- NTILE(n): 행들을 n개의 동일한 크기의 그룹으로 나눈다

**집계 윈도우 함수:**
- SUM(), AVG(), COUNT(), MIN(), MAX() 등의 집계 함수를 OVER 절과 함께 사용하여, 누적합(running total), 이동 평균(moving average) 등을 계산할 수 있다.

**프레임(Frame) 지정:** ROWS 또는 RANGE 절을 사용하여 윈도우 내에서 함수가 적용되는 행의 범위를 더 세밀하게 지정할 수 있다. ROWS BETWEEN n PRECEDING AND CURRENT ROW는 현재 행 기준 이전 n개 행까지를 포함한다.

윈도우 함수는 SQL:2003 표준에서 도입되었으며, 현재 대부분의 상용 데이터베이스 시스템에서 지원된다.

## 예시

```sql
-- RANK: 학과별 급여 순위
SELECT ID, name, dept_name, salary,
       RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM instructor;

-- PARTITION BY: 학과 내에서의 순위
SELECT ID, name, dept_name, salary,
       RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC)
           AS dept_rank
FROM instructor;

-- DENSE_RANK vs RANK
SELECT ID, name, salary,
       RANK() OVER (ORDER BY salary DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM instructor;

-- NTILE: 급여를 4분위로 나누기
SELECT ID, name, salary,
       NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM instructor;

-- 집계 윈도우 함수: 누적합
SELECT dept_name, salary,
       SUM(salary) OVER (ORDER BY dept_name) AS running_total
FROM instructor;

-- 이동 평균 (3행 윈도우)
SELECT year, budget,
       AVG(budget) OVER (
           ORDER BY year
           ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
       ) AS moving_avg
FROM department_budget;

-- 파티션별 합계와 비율
SELECT dept_name, name, salary,
       SUM(salary) OVER (PARTITION BY dept_name) AS dept_total,
       salary * 100.0 / SUM(salary) OVER (PARTITION BY dept_name) AS pct
FROM instructor;
```

## 관련 개념

- [Aggregate Function](/knowledge/database/aggregate-function/)
- [GROUP BY Clause](/knowledge/database/group-by-clause/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [SQL](/knowledge/database/sql/)
