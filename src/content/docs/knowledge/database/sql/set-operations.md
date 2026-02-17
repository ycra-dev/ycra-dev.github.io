---
title: "Set Operations"
description: "집합 연산(set operations)은 SQL에서 두 개의 질의 결과 릴레이션에 대해 합집합(union), 교집합(intersect), 차집합(except)을 수행하는 연산으로, 수학적 집합 연산 ∪, ∩, −에 대응된다"
tags: ['Set Operations', 'Union', 'Intersect', 'Except', 'SQL Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/set-operations
sidebar:
  order: 6
---

## 핵심 개념

SQL의 집합 연산은 두 입력 릴레이션이 동일한 수의 속성을 가지며, 대응하는 속성의 도메인이 호환 가능해야(compatible) 한다.

**UNION(합집합):** 두 질의 결과의 합집합을 반환한다. 기본적으로 중복을 제거한다(관계 대수의 집합 의미론과 동일). 중복을 유지하려면 UNION ALL을 사용한다.

**INTERSECT(교집합):** 두 질의 결과 모두에 포함되는 튜플만 반환한다. 마찬가지로 기본적으로 중복을 제거하며, INTERSECT ALL을 사용하면 중복을 유지한다.

**EXCEPT(차집합):** 첫 번째 질의 결과에는 있지만 두 번째 질의 결과에는 없는 튜플을 반환한다. 기본적으로 중복을 제거하며, EXCEPT ALL을 사용하면 중복을 유지한다. EXCEPT는 일부 SQL 구현에서 MINUS로 표현되기도 한다.

UNION ALL, INTERSECT ALL, EXCEPT ALL에서 중복 튜플의 처리 방식은 다음과 같다: 첫 번째 릴레이션에 m개, 두 번째 릴레이션에 n개의 동일한 튜플이 있을 때, UNION ALL의 결과에는 m+n개, INTERSECT ALL의 결과에는 min(m,n)개, EXCEPT ALL의 결과에는 max(0, m-n)개가 포함된다.

집합 연산은 SQL에서 복잡한 조건의 질의를 간결하게 표현하는 데 유용하다. 특히 "A이거나 B인 경우"는 UNION으로, "A이면서 B인 경우"는 INTERSECT로, "A이지만 B가 아닌 경우"는 EXCEPT로 표현할 수 있다.

## 예시

```sql
-- UNION: 2017년 가을 또는 2018년 봄에 개설된 과목
(SELECT course_id FROM section WHERE semester = 'Fall' AND year = 2017)
UNION
(SELECT course_id FROM section WHERE semester = 'Spring' AND year = 2018);

-- INTERSECT: 2017년 가을과 2018년 봄 모두에 개설된 과목
(SELECT course_id FROM section WHERE semester = 'Fall' AND year = 2017)
INTERSECT
(SELECT course_id FROM section WHERE semester = 'Spring' AND year = 2018);

-- EXCEPT: 2017년 가을에 개설되었지만 2018년 봄에는 개설되지 않은 과목
(SELECT course_id FROM section WHERE semester = 'Fall' AND year = 2017)
EXCEPT
(SELECT course_id FROM section WHERE semester = 'Spring' AND year = 2018);

-- UNION ALL: 중복 유지
(SELECT course_id FROM section WHERE semester = 'Fall' AND year = 2017)
UNION ALL
(SELECT course_id FROM section WHERE semester = 'Spring' AND year = 2018);
```

## 관련 개념

- [SQL](/knowledge/database/sql/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [Relational Algebra](/knowledge/database/relational-algebra/)
- [Relation](/knowledge/database/relation/)
