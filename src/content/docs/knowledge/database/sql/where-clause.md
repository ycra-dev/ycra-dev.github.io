---
title: "WHERE Clause"
description: "WHERE 절은 SQL SELECT 문에서 from 절에 지정된 릴레이션의 튜플 중 특정 조건(술어, predicate)을 만족하는 튜플만 선택하기 위한 필터링 구문이다"
tags: ['Where Clause', 'Predicate', 'Filter', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/where-clause
sidebar:
  order: 3
---

## 핵심 개념

WHERE 절에는 비교 연산자(<, <=, >, >=, =, <>)를 사용한 조건식을 지정할 수 있다. 이 비교 연산자는 숫자, 문자열, 날짜 등 다양한 타입의 값에 적용할 수 있다.

논리 접속사 AND, OR, NOT을 사용하여 여러 조건을 결합할 수 있다. AND는 모든 조건이 참이어야 하고, OR는 하나 이상의 조건이 참이면 되며, NOT은 조건의 결과를 부정한다.

SQL은 BETWEEN 연산자를 제공하여 범위 조건을 간결하게 표현할 수 있다. 예를 들어, salary BETWEEN 90000 AND 100000은 salary >= 90000 AND salary <= 100000과 동일하다.

문자열 비교를 위해 LIKE 연산자를 사용할 수 있다. '%'는 임의의 문자열(빈 문자열 포함)과 매칭되고, '_'는 정확히 하나의 문자와 매칭된다. 예를 들어, 'Intro%'는 'Intro'로 시작하는 모든 문자열과 매칭된다.

WHERE 절에서 null 값을 다룰 때는 IS NULL 또는 IS NOT NULL을 사용해야 한다. null과의 산술 비교(= null, <> null 등)는 항상 unknown 결과를 반환하므로, 정확한 null 검사를 위해서는 반드시 IS NULL 구문을 사용해야 한다.

WHERE 절에는 중첩 서브쿼리(nested subquery), IN, NOT IN, EXISTS, NOT EXISTS 등의 복잡한 조건도 사용할 수 있다.

## 예시

```sql
-- 단순 비교
SELECT name FROM instructor WHERE dept_name = 'Comp. Sci.';

-- 복합 조건 (AND)
SELECT name FROM instructor
WHERE dept_name = 'Comp. Sci.' AND salary > 70000;

-- OR 조건
SELECT name FROM instructor
WHERE dept_name = 'Comp. Sci.' OR dept_name = 'Physics';

-- BETWEEN 연산자
SELECT name FROM instructor
WHERE salary BETWEEN 90000 AND 100000;

-- LIKE 연산자 (패턴 매칭)
SELECT course_id FROM course WHERE title LIKE '%Intro%';

-- NOT 연산자
SELECT name FROM instructor
WHERE NOT (dept_name = 'Physics');

-- NULL 검사
SELECT name FROM instructor WHERE salary IS NOT NULL;

-- IN 연산자
SELECT name FROM instructor
WHERE dept_name IN ('Comp. Sci.', 'Physics', 'Music');
```

## 관련 개념

- [SELECT Statement](/knowledge/database/select-statement/)
- [NULL Value](/knowledge/database/null-value/)
- [Nested Subquery](/knowledge/database/nested-subquery/)
- [SQL](/knowledge/database/sql/)
