---
title: "View"
description: "뷰(view)는 SQL 질의의 결과로 정의되는 가상 릴레이션(virtual relation)으로, 실제로 데이터를 물리적으로 저장하지 않고 질의가 참조될 때마다 동적으로 계산되는 논리적 테이블이다"
tags: ['View', 'Virtual Relation', 'Materialized View', 'SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/view
sidebar:
  order: 12
---

## 핵심 개념

뷰는 CREATE VIEW 문을 사용하여 정의한다. 뷰의 정의는 데이터베이스에 저장되며, 뷰를 참조하는 질의가 실행될 때 뷰 정의의 질의 표현식이 평가되어 결과가 생성된다.

뷰를 사용하는 주요 이유는 다음과 같다:
1. **보안:** 특정 사용자에게 데이터의 일부만 노출하고 나머지를 숨길 수 있다. 예를 들어, salary 속성을 제외한 교수 정보 뷰를 제공할 수 있다.
2. **단순화:** 복잡한 질의를 뷰로 정의하여 사용자에게 간단한 인터페이스를 제공한다.
3. **논리적 데이터 독립성:** 기저 테이블의 구조가 변경되더라도 뷰를 통해 이전 인터페이스를 유지할 수 있다.

뷰는 다른 뷰의 정의에도 사용될 수 있다. 하지만 뷰 정의가 자기 자신을 직접 또는 간접적으로 참조하면(순환 참조), 대부분의 SQL 구현에서는 이를 허용하지 않는다.

**구체화된 뷰(Materialized View):** 일반 뷰와 달리 질의 결과를 물리적으로 저장한다. 기저 릴레이션이 변경되면 구체화된 뷰도 갱신해야 한다(뷰 유지보수, view maintenance). 구체화된 뷰는 자주 사용되는 복잡한 집계 질의의 성능을 크게 향상시킬 수 있다.

**뷰의 갱신:** 뷰를 통한 삽입, 삭제, 수정은 제한적으로만 가능하다. 단순 뷰(하나의 릴레이션, 집계 없음, DISTINCT 없음)에 대해서만 갱신이 허용되며, 복잡한 뷰에 대한 갱신은 모호성 문제로 인해 대부분 허용되지 않는다.

## 예시

```sql
-- 뷰 생성: salary를 제외한 교수 정보
CREATE VIEW faculty AS
SELECT ID, name, dept_name
FROM instructor;

-- 뷰 사용
SELECT name FROM faculty WHERE dept_name = 'Biology';

-- 학과별 급여 합계 뷰
CREATE VIEW departments_total_salary(dept_name, total_salary) AS
SELECT dept_name, SUM(salary)
FROM instructor
GROUP BY dept_name;

-- 뷰를 사용한 질의
SELECT dept_name FROM departments_total_salary
WHERE total_salary > 100000;

-- 복잡한 질의를 뷰로 단순화
CREATE VIEW physics_fall_2017 AS
SELECT course.course_id, sec_id, building, room_number
FROM course, section
WHERE course.course_id = section.course_id
  AND course.dept_name = 'Physics'
  AND section.semester = 'Fall'
  AND section.year = 2017;

-- 뷰에 대한 질의 (실제로는 기저 테이블에서 계산)
SELECT course_id FROM physics_fall_2017
WHERE building = 'Watson';

-- 뷰 삭제
DROP VIEW faculty;
```

## 관련 개념

- [SQL](/knowledge/database/sql/)
- [Authorization](/knowledge/database/authorization/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [Data Abstraction](/knowledge/database/data-abstraction/)
