---
title: "Outer Join"
description: "외부 조인(outer join)은 일반 조인(내부 조인)에서 매칭되지 않아 결과에서 누락되는 튜플을 보존하기 위해, 매칭되지 않는 속성에 null 값을 채워 결과에 포함시키는 조인 연산이다"
tags: ['Outer Join', 'Left Join', 'Right Join', 'Full Join', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/outer-join
sidebar:
  order: 5
---

## 핵심 개념

내부 조인(inner join)에서는 양쪽 릴레이션에서 조인 조건을 만족하는 튜플 쌍만 결과에 포함된다. 이 때문에 한쪽 릴레이션에만 존재하고 다른 쪽에 매칭되는 튜플이 없는 튜플은 결과에서 "손실"된다. 외부 조인은 이러한 손실을 방지한다.

외부 조인에는 세 가지 형태가 있다:

**LEFT OUTER JOIN:** 왼쪽(첫 번째) 릴레이션의 모든 튜플을 보존한다. 오른쪽 릴레이션에서 매칭되는 튜플이 없으면, 오른쪽 릴레이션의 속성에 null 값을 채운다. 예를 들어, student LEFT OUTER JOIN takes에서 수강 이력이 없는 학생도 결과에 포함되며, takes의 속성(course_id, sec_id 등)에 null이 채워진다.

**RIGHT OUTER JOIN:** 오른쪽(두 번째) 릴레이션의 모든 튜플을 보존한다. 왼쪽 릴레이션에서 매칭되는 튜플이 없으면, 왼쪽 릴레이션의 속성에 null 값을 채운다.

**FULL OUTER JOIN:** 양쪽 릴레이션의 모든 튜플을 보존한다. 어느 쪽에서든 매칭되지 않는 튜플은 상대쪽 속성에 null 값이 채워진 채 결과에 포함된다.

외부 조인에서 on 조건과 where 조건은 다르게 동작한다. on 조건은 외부 조인의 매칭 여부를 결정하는 데 사용되며, 매칭되지 않는 튜플에 null을 채워 보존한다. 반면, where 조건은 조인 결과에 적용되어 조건을 만족하지 않는 튜플(null이 채워진 튜플 포함)을 제거한다. 따라서 외부 조인에서는 조인 조건을 on 절에 두어야 의도한 결과를 얻을 수 있다.

외부 조인은 natural, using, on 조건과 결합하여 사용할 수 있다.

## 예시

```sql
-- LEFT OUTER JOIN: 수강 이력이 없는 학생도 포함
SELECT *
FROM student NATURAL LEFT OUTER JOIN takes;
-- 학생 Snow(ID 70557)는 수강 이력이 없어도 결과에 포함
-- takes의 속성(course_id, sec_id 등)에 null이 채워짐

-- 수강하지 않은 학생 찾기
SELECT ID
FROM student NATURAL LEFT OUTER JOIN takes
WHERE course_id IS NULL;

-- RIGHT OUTER JOIN
SELECT *
FROM takes NATURAL RIGHT OUTER JOIN student;
-- LEFT OUTER JOIN과 동일한 결과 (속성 순서만 다름)

-- FULL OUTER JOIN
SELECT *
FROM student FULL OUTER JOIN takes ON student.ID = takes.ID;
-- 수강 이력 없는 학생과, 학생이 없는 수강 기록 모두 포함

-- ON 조건 사용
SELECT *
FROM student LEFT OUTER JOIN takes ON student.ID = takes.ID;

-- on vs where의 차이
-- on: 매칭되지 않는 튜플을 null로 채워 보존
SELECT * FROM student LEFT JOIN takes ON student.ID = takes.ID;
-- where: 조인 후 필터링하여 null 튜플 제거 가능
SELECT * FROM student LEFT JOIN takes ON student.ID = takes.ID
WHERE takes.year = 2017;  -- null 행은 제거됨
```

## 관련 개념

- [JOIN Operation](/knowledge/database/join-operation/)
- [NULL Value](/knowledge/database/null-value/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [SQL](/knowledge/database/sql/)
