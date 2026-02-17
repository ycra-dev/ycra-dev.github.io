---
title: "JOIN Operation"
description: "조인 연산(JOIN operation)은 두 개 이상의 릴레이션에서 관련된 튜플들을 결합하여 하나의 결과 릴레이션을 생성하는 SQL 연산으로, 여러 테이블에 분산된 정보를 통합하여 조회할 수 있게 한다"
tags: ['Join', 'Natural Join', 'Cartesian Product', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/join-operation
sidebar:
  order: 4
---

## 핵심 개념

SQL에서 조인을 수행하는 가장 기본적인 방법은 from 절에 여러 릴레이션을 나열하고, where 절에서 매칭 조건을 지정하는 것이다. 이는 카티션 곱(Cartesian product)을 먼저 구한 후 조건에 맞는 튜플만 선택하는 것과 동일하다.

**자연 조인(Natural Join):** 두 릴레이션에서 동일한 이름을 가진 모든 속성의 값이 같은 튜플 쌍만 결합한다. 결과에서 공통 속성은 한 번만 나타난다. student NATURAL JOIN takes는 두 릴레이션의 ID가 같은 행만 결합한다.

**JOIN ... USING:** 자연 조인과 유사하지만, 매칭에 사용할 속성을 명시적으로 지정한다. 이를 통해 동일한 이름의 속성 중 일부만 매칭 조건으로 사용할 수 있어, 자연 조인에서 발생할 수 있는 의도하지 않은 속성 매칭 문제를 방지한다.

**JOIN ... ON:** 임의의 조인 조건을 지정할 수 있는 가장 유연한 형태의 조인이다. on 절에 where 절과 동일한 형태의 조건을 명시한다. 내부적으로는 where 절의 조건과 동일하게 동작하지만, 조인 조건과 필터 조건을 분리하여 가독성을 높인다.

**CROSS JOIN:** 두 릴레이션의 카티션 곱을 명시적으로 수행한다. from student, takes와 from student CROSS JOIN takes는 동일하다.

자연 조인을 사용할 때는 주의가 필요하다. 의도하지 않은 속성 매칭이 발생할 수 있기 때문이다. 예를 들어, student NATURAL JOIN takes NATURAL JOIN course는 dept_name도 매칭 조건에 포함시켜, 학생이 자기 학과가 아닌 과목을 수강한 경우를 결과에서 누락시킬 수 있다.

## 예시

```sql
-- 카티션 곱 + WHERE 조건 (전통적 조인)
SELECT name, instructor.dept_name, building
FROM instructor, department
WHERE instructor.dept_name = department.dept_name;

-- 자연 조인
SELECT name, course_id
FROM student NATURAL JOIN takes;

-- JOIN ... USING
SELECT name, title
FROM (student NATURAL JOIN takes) JOIN course USING (course_id);

-- JOIN ... ON
SELECT *
FROM student JOIN takes ON student.ID = takes.ID;

-- 복합 조인 조건
SELECT name, title
FROM student JOIN takes ON student.ID = takes.ID,
     course
WHERE takes.course_id = course.course_id;
```

## 관련 개념

- [SELECT Statement](/knowledge/database/select-statement/)
- [Outer Join](/knowledge/database/outer-join/)
- [Relation](/knowledge/database/relation/)
- [Foreign Key](/knowledge/database/foreign-key/)
- [Relational Algebra](/knowledge/database/relational-algebra/)
