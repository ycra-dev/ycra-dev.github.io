---
title: "SELECT Statement"
description: "SELECT 문은 SQL에서 데이터를 검색하기 위한 기본 구문으로, select, from, where 세 개의 절로 구성되며 입력 릴레이션에서 조건을 만족하는 데이터를 추출하여 결과 릴레이션을 생성한다"
tags: ['Select', 'SQL Query', 'Dml', 'Projection']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/select-statement
sidebar:
  order: 2
---

## 핵심 개념

SELECT 문의 기본 구조는 다음과 같다: select 절은 결과에 포함할 속성을 지정하고(관계 대수의 프로젝션에 대응), from 절은 질의에 사용할 릴레이션을 나열하며, where 절은 from 절의 릴레이션에서 튜플을 선택하는 조건을 지정한다(관계 대수의 선택에 대응).

SQL에서는 릴레이션이 수학적 집합이 아닌 멀티셋(multiset)으로 취급되므로, 질의 결과에 중복 튜플이 포함될 수 있다. 중복을 제거하려면 select 다음에 distinct 키워드를 사용한다. 반대로, 중복을 명시적으로 유지하려면 all 키워드를 사용할 수 있지만, 중복 유지가 기본 동작이므로 보통 생략한다.

select 절에서는 산술 표현식(+, -, *, /)도 사용할 수 있다. 예를 들어, salary * 1.1은 급여를 10% 인상한 결과를 보여준다(실제 데이터는 변경하지 않음).

select *는 모든 속성을 선택하는 약식 표현이다. 여러 릴레이션에서 데이터를 가져올 때는 from 절에 여러 릴레이션을 나열하고, where 절에서 조인 조건을 지정한다.

결과의 정렬은 ORDER BY 절을 통해 지정할 수 있으며, ASC(오름차순, 기본값)와 DESC(내림차순)를 사용한다. AS 키워드를 통해 속성이나 릴레이션에 별칭(alias)을 부여할 수 있다.

## 예시

```sql
-- 기본 SELECT 문
SELECT name FROM instructor;

-- 중복 제거
SELECT DISTINCT dept_name FROM instructor;

-- 산술 표현식
SELECT ID, name, salary * 1.1 AS new_salary FROM instructor;

-- 여러 릴레이션에서 질의 (조인)
SELECT name, instructor.dept_name, building
FROM instructor, department
WHERE instructor.dept_name = department.dept_name;

-- 별칭 사용
SELECT T.name, S.course_id
FROM instructor AS T, teaches AS S
WHERE T.ID = S.ID;

-- 결과 정렬
SELECT name, salary
FROM instructor
ORDER BY salary DESC, name ASC;

-- 모든 속성 선택
SELECT * FROM instructor WHERE dept_name = 'Comp. Sci.';
```

## 관련 개념

- [SQL](/knowledge/database/sql/)
- [WHERE Clause](/knowledge/database/where-clause/)
- [JOIN Operation](/knowledge/database/join-operation/)
- [GROUP BY Clause](/knowledge/database/group-by-clause/)
- [Relational Algebra](/knowledge/database/relational-algebra/)
