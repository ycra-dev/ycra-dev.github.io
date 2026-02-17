---
title: "NULL Value"
description: "NULL 값은 SQL에서 알 수 없거나(unknown), 존재하지 않거나(nonexistent), 해당되지 않는(inapplicable) 값을 나타내기 위한 특수한 표시자로, 일반적인 데이터 값과는 다른 특별한 의미론을 가진다"
tags: ['Null', 'Unknown', 'Three Valued Logic', 'SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/null-value
sidebar:
  order: 7
---

## 핵심 개념

NULL 값은 SQL의 3치 논리(three-valued logic) 체계의 근간을 이룬다. 일반적인 불리언 논리가 true와 false 두 가지 진리값을 사용하는 반면, SQL에서는 null이 포함된 비교 연산의 결과로 unknown이라는 제3의 진리값이 추가된다.

NULL 값이 포함된 산술 연산(+, -, *, /)의 결과는 항상 null이다. 예를 들어, 5 + null의 결과는 null이다.

NULL 값이 포함된 비교 연산(=, <>, <, > 등)의 결과는 unknown이다. 1 < null, null = null, null <> null 모두 unknown을 반환한다. 이는 매우 중요한 특성으로, null = null이 true가 아닌 unknown이라는 점에 유의해야 한다.

3치 논리에서의 논리 연산 규칙:
- AND: true AND unknown = unknown, false AND unknown = false, unknown AND unknown = unknown
- OR: true OR unknown = true, false OR unknown = unknown, unknown OR unknown = unknown
- NOT: NOT unknown = unknown

WHERE 절에서 조건의 결과가 unknown인 튜플은 결과에 포함되지 않는다(false와 동일하게 처리).

NULL 값의 존재 여부를 검사하려면 IS NULL 또는 IS NOT NULL을 사용해야 한다. = null을 사용하면 결과가 항상 unknown이 되어 원하는 결과를 얻을 수 없다.

집계 함수에서 null 값은 일반적으로 무시된다(count(*) 제외). 모든 값이 null인 경우 sum, avg 등은 null을 반환하지만, count는 0을 반환한다.

## 예시

```sql
-- NULL 검사: IS NULL 사용
SELECT name FROM instructor WHERE salary IS NULL;

-- 잘못된 NULL 검사 (항상 빈 결과)
SELECT name FROM instructor WHERE salary = NULL;  -- 올바르지 않음

-- NULL과 산술 연산
SELECT name, salary * 1.1 FROM instructor;
-- salary가 null인 경우, salary * 1.1도 null

-- NULL과 집계 함수
SELECT SUM(salary) FROM instructor;
-- null 값은 무시되고 나머지 값의 합계 반환

-- COALESCE: null을 다른 값으로 대체
SELECT name, COALESCE(salary, 0) AS salary FROM instructor;

-- 3치 논리 예시
SELECT name FROM instructor
WHERE salary > 50000 OR dept_name = 'Music';
-- salary가 null이고 dept_name이 'Music'이면 포함됨 (unknown OR true = true)
```

## 관련 개념

- [WHERE Clause](/knowledge/database/where-clause/)
- [Aggregate Function](/knowledge/database/aggregate-function/)
- [Outer Join](/knowledge/database/outer-join/)
- [SQL](/knowledge/database/sql/)
