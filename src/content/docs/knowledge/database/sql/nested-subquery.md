---
title: "Nested Subquery"
description: "중첩 서브쿼리(nested subquery)는 다른 SQL 질의(외부 질의) 내부에 포함된 SELECT-FROM-WHERE 표현식으로, WHERE 절, FROM 절, SELECT 절 등에서 사용되어 복잡한 질의를 표현할 수 있게 한다"
tags: ['Subquery', 'Nested Query', 'Correlated Subquery', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/nested-subquery
sidebar:
  order: 11
---

## 핵심 개념

서브쿼리는 SQL의 강력한 기능 중 하나로, 질의의 모듈화와 복잡한 조건의 표현을 가능하게 한다. 서브쿼리가 사용되는 주요 맥락은 다음과 같다:

**집합 멤버십 검사(Set Membership):** IN과 NOT IN 연산자를 사용하여 특정 값이 서브쿼리 결과에 포함되는지 여부를 검사한다. 예를 들어, 2017년 가을과 2018년 봄 모두에 개설된 과목을 찾을 때 유용하다.

**집합 비교(Set Comparison):** SOME(또는 ANY)과 ALL 연산자를 비교 연산자와 결합하여 사용한다. > some은 "하나 이상보다 큰"을, > all은 "모두보다 큰"을 의미한다.

**존재 검사(Existence Check):** EXISTS와 NOT EXISTS를 사용하여 서브쿼리 결과가 비어 있는지 여부를 검사한다. EXISTS는 서브쿼리가 하나 이상의 튜플을 반환하면 true이다.

**상관 서브쿼리(Correlated Subquery):** 외부 질의의 속성을 참조하는 서브쿼리이다. 외부 질의의 각 튜플에 대해 서브쿼리가 실행되므로, 성능에 영향을 줄 수 있다.

**스칼라 서브쿼리(Scalar Subquery):** 단일 값(하나의 튜플의 하나의 속성)을 반환하는 서브쿼리로, 값이 기대되는 어떤 위치에서도 사용 가능하다.

**FROM 절의 서브쿼리:** 서브쿼리의 결과를 임시 릴레이션으로 사용한다. WITH 절을 사용하면 이름을 부여하여 가독성을 높일 수 있다.

서브쿼리를 사용한 대부분의 SQL 질의는 서브쿼리 없이도 재작성할 수 있지만, 서브쿼리를 사용한 표현이 더 직관적이고 이해하기 쉬운 경우가 많다.

## 예시

```sql
-- IN: 2017년 가을과 2018년 봄 모두 개설된 과목
SELECT DISTINCT course_id FROM section
WHERE semester = 'Fall' AND year = 2017
  AND course_id IN (
    SELECT course_id FROM section
    WHERE semester = 'Spring' AND year = 2018
  );

-- NOT IN
SELECT DISTINCT course_id FROM section
WHERE semester = 'Fall' AND year = 2017
  AND course_id NOT IN (
    SELECT course_id FROM section
    WHERE semester = 'Spring' AND year = 2018
  );

-- > SOME: Finance 학과의 누군가보다 급여가 높은 교수
SELECT name FROM instructor
WHERE salary > SOME (
    SELECT salary FROM instructor WHERE dept_name = 'Finance'
);

-- > ALL: Finance 학과의 모든 교수보다 급여가 높은 교수
SELECT name FROM instructor
WHERE salary > ALL (
    SELECT salary FROM instructor WHERE dept_name = 'Finance'
);

-- EXISTS: 2017년 가을과 2018년 봄 모두 개설된 과목
SELECT course_id FROM section AS S
WHERE semester = 'Fall' AND year = 2017
  AND EXISTS (
    SELECT * FROM section AS T
    WHERE T.semester = 'Spring' AND T.year = 2018
      AND S.course_id = T.course_id
  );

-- 스칼라 서브쿼리: 각 학과의 교수 수
SELECT dept_name,
       (SELECT COUNT(*) FROM instructor
        WHERE department.dept_name = instructor.dept_name) AS num_instructors
FROM department;

-- WITH 절
WITH dept_total(dept_name, value) AS (
    SELECT dept_name, SUM(salary) FROM instructor GROUP BY dept_name
)
SELECT dept_name FROM dept_total WHERE value > 50000;
```

## 관련 개념

- [WHERE Clause](/knowledge/database/where-clause/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [Set Operations](/knowledge/database/set-operations/)
- [SQL](/knowledge/database/sql/)
