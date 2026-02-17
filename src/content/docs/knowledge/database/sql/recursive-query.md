---
title: "Recursive Query"
description: "재귀 질의(recursive query)는 SQL에서 WITH RECURSIVE 구문을 사용하여 릴레이션이 자기 자신을 참조하는 질의를 정의하는 것으로, 계층적 데이터나 그래프 구조에서 이행적 폐포(transitive closure)를 계산하는 데 사용된다"
tags: ['Recursive Query', 'With Recursive', 'Cte', 'Transitive Closure', 'SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/recursive-query
sidebar:
  order: 21
---

## 핵심 개념

재귀 질의는 선형 재귀(linear recursion)의 형태로 정의되며, 기저 질의(base query)와 재귀 질의(recursive query)의 UNION으로 구성된다. 기저 질의는 초기 결과를 생성하고, 재귀 질의는 이전 단계의 결과를 사용하여 추가 결과를 생성하며, 새로운 튜플이 더 이상 생성되지 않을 때까지 반복된다.

재귀 질의의 가장 대표적인 사용 사례는 이행적 폐포(transitive closure)의 계산이다. 예를 들어, prereq 릴레이션에서 특정 과목의 모든 선수 과목(직접적 선수 과목뿐 아니라 선수 과목의 선수 과목도 포함)을 찾는 문제이다.

고정점(fixpoint) 의미론에 기반한 재귀 질의의 실행 과정:
1. 재귀 뷰의 내용을 빈 릴레이션으로 초기화한다.
2. 기저 질의를 평가하여 초기 결과를 생성한다.
3. 재귀 질의를 현재까지의 결과에 대해 평가하여 새로운 튜플을 추가한다.
4. 새로운 튜플이 추가되지 않을 때까지 3단계를 반복한다(고정점 도달).

SQL 표준에서는 재귀 질의가 단조적(monotonic)이어야 한다는 제약이 있다. 즉, 재귀 뷰에 대해 집계(aggregation), EXCEPT(차집합), NOT EXISTS 등을 사용할 수 없다. 이는 비단조적 질의에서는 고정점이 존재하지 않을 수 있기 때문이다.

대부분의 상용 데이터베이스 시스템(PostgreSQL, Oracle, SQL Server 등)에서 WITH RECURSIVE 구문을 지원한다. Oracle에서는 CONNECT BY 구문이라는 고유한 방식도 제공한다.

## 예시

```sql
-- 재귀 질의: 특정 과목의 모든 선수 과목 찾기
WITH RECURSIVE rec_prereq(course_id, prereq_id) AS (
    -- 기저 질의: 직접적 선수 과목
    SELECT course_id, prereq_id
    FROM prereq
    UNION
    -- 재귀 질의: 선수 과목의 선수 과목
    SELECT rec_prereq.course_id, prereq.prereq_id
    FROM rec_prereq, prereq
    WHERE rec_prereq.prereq_id = prereq.course_id
)
SELECT * FROM rec_prereq;

-- CS-347의 모든 직간접 선수 과목
WITH RECURSIVE rec_prereq(course_id, prereq_id) AS (
    SELECT course_id, prereq_id
    FROM prereq
    UNION
    SELECT rec_prereq.course_id, prereq.prereq_id
    FROM rec_prereq, prereq
    WHERE rec_prereq.prereq_id = prereq.course_id
)
SELECT prereq_id
FROM rec_prereq
WHERE course_id = 'CS-347';

-- 재귀 질의: 관리자 계층 탐색
WITH RECURSIVE manager_hierarchy(employee_id, manager_id, level) AS (
    -- 기저: 직접 관리자
    SELECT employee_id, manager_id, 1
    FROM employee
    WHERE employee_id = '12345'
    UNION ALL
    -- 재귀: 상위 관리자
    SELECT e.employee_id, e.manager_id, mh.level + 1
    FROM employee e, manager_hierarchy mh
    WHERE e.employee_id = mh.manager_id
)
SELECT * FROM manager_hierarchy;
```

## 관련 개념

- [SQL](/knowledge/database/sql/)
- [Nested Subquery](/knowledge/database/nested-subquery/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [View](/knowledge/database/view/)
