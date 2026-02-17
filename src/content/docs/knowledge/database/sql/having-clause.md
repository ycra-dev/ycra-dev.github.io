---
title: "HAVING Clause"
description: "HAVING 절은 GROUP BY 절에 의해 형성된 그룹 중에서 특정 조건을 만족하는 그룹만 결과에 포함시키기 위한 SQL 구문으로, 집계 함수의 결과값에 대한 필터링 역할을 한다"
tags: ['Having', 'Group Filter', 'Aggregation', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/having-clause
sidebar:
  order: 10
---

## 핵심 개념

HAVING 절은 WHERE 절과 유사하게 조건을 지정하지만, 적용 시점과 대상이 다르다. WHERE 절은 개별 튜플에 대한 조건을 지정하여 그룹핑 이전에 필터링하는 반면, HAVING 절은 그룹에 대한 조건을 지정하여 그룹핑 이후에 필터링한다.

HAVING 절의 조건은 주로 집계 함수를 포함한다. 예를 들어, "평균 급여가 42,000보다 큰 학과"를 찾으려면 HAVING AVG(salary) > 42000을 사용한다. HAVING 절에 나타나는 속성은 GROUP BY 절에 나열된 속성이거나 집계 함수 내부에 있는 속성이어야 한다.

SQL 질의의 실행 순서에서 HAVING 절의 위치는 다음과 같다:
1. FROM: 릴레이션 가져오기
2. WHERE: 개별 튜플 필터링
3. GROUP BY: 그룹 형성
4. HAVING: 그룹 필터링
5. SELECT: 결과 생성

이 순서가 중요한 이유는 WHERE 절에서 집계 함수를 사용할 수 없기 때문이다. 집계 함수는 그룹이 형성된 후에야 계산할 수 있으므로, 집계 결과에 대한 조건은 반드시 HAVING 절에서 지정해야 한다.

HAVING 절 없이 GROUP BY만 사용하면 모든 그룹이 결과에 포함된다. WHERE 절 없이 HAVING 절만 사용하면 모든 튜플이 그룹핑에 참여한다.

## 예시

```sql
-- 평균 급여가 42,000보다 큰 학과
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name
HAVING AVG(salary) > 42000;

-- 교수가 3명 이상인 학과
SELECT dept_name, COUNT(*) AS num_instructors
FROM instructor
GROUP BY dept_name
HAVING COUNT(*) >= 3;

-- WHERE와 HAVING의 결합 사용
-- 2017년 이후에 개설된 과목 중, 2개 이상의 섹션이 있는 과목
SELECT course_id, COUNT(*) AS num_sections
FROM section
WHERE year >= 2017
GROUP BY course_id
HAVING COUNT(*) >= 2;

-- 잘못된 예: WHERE 절에 집계 함수 사용 (오류)
-- SELECT dept_name FROM instructor
-- WHERE AVG(salary) > 42000  -- 오류!
-- GROUP BY dept_name;

-- 올바른 예: HAVING 절에 집계 함수 사용
SELECT dept_name FROM instructor
GROUP BY dept_name
HAVING AVG(salary) > 42000;
```

## 관련 개념

- [GROUP BY Clause](/knowledge/database/group-by-clause/)
- [Aggregate Function](/knowledge/database/aggregate-function/)
- [WHERE Clause](/knowledge/database/where-clause/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [SQL](/knowledge/database/sql/)
