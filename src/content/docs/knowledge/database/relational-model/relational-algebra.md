---
title: "Relational Algebra"
description: "관계 대수(relational algebra)는 하나 또는 두 개의 릴레이션을 입력으로 받아 새로운 릴레이션을 결과로 산출하는 연산들의 집합으로, SQL 질의 언어의 이론적 기초를 형성하는 함수적 질의 언어이다"
tags: ['Relational Algebra', 'Query Language', 'Formal Language', 'Relational Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/relational-algebra
sidebar:
  order: 8
---

## 핵심 개념

관계 대수는 순수한 형태의 질의 언어 중 하나로, 함수적(functional) 질의 언어에 해당한다. 연산의 결과가 다시 릴레이션이므로, 연산들을 조합(compose)하여 복잡한 질의를 표현할 수 있다. 이는 산술 연산을 조합하여 산술 표현식을 구성하는 것과 유사하다.

관계 대수의 기본 연산은 다음과 같다:

**단항 연산(unary operations)** - 하나의 릴레이션에 적용:
- 선택(select, σ): 주어진 술어(predicate)를 만족하는 튜플만 선택한다. 예: σ_dept_name="Physics"(instructor)
- 프로젝션(project, Π): 지정된 속성만 포함하는 릴레이션을 반환한다. 예: Π_ID,name,salary(instructor)
- 재명명(rename, ρ): 릴레이션이나 속성의 이름을 변경한다.

**이항 연산(binary operations)** - 두 개의 릴레이션에 적용:
- 합집합(union, ∪): 두 릴레이션의 합집합을 반환한다.
- 카티션 곱(Cartesian product, ×): 두 릴레이션의 모든 튜플 쌍을 결합한다.
- 차집합(set difference, −): 첫 번째 릴레이션에만 있는 튜플을 반환한다.

이 기본 연산들의 조합으로 자연 조인(natural join, ⋈) 등의 추가 연산을 정의할 수 있다.

관계 대수에서는 릴레이션이 집합이므로 중복 튜플이 제거된다. SQL은 이를 확장하여 멀티셋(multiset) 기반으로 동작하며, 중복을 허용한다.

## 예시

```
-- 선택 연산: Physics 학과 교수만 선택
σ_dept_name="Physics"(instructor)
결과: {(22222, Einstein, Physics, 95000), (33456, Gold, Physics, 87000)}

-- 프로젝션 연산: ID, name, salary만 추출
Π_ID,name,salary(instructor)

-- 연산의 조합: Physics 학과 교수의 이름만 추출
Π_name(σ_dept_name="Physics"(instructor))
결과: {(Einstein), (Gold)}

-- 카티션 곱과 선택의 조합 (자연 조인과 동일)
σ_instructor.dept_name=department.dept_name(instructor × department)
```

이 연산들은 SQL에서 다음과 같이 대응된다:

```sql
-- 선택(σ) -> WHERE 절
SELECT * FROM instructor WHERE dept_name = 'Physics';

-- 프로젝션(Π) -> SELECT 절의 속성 목록
SELECT ID, name, salary FROM instructor;

-- 조합 -> 중첩된 질의
SELECT name FROM instructor WHERE dept_name = 'Physics';
```

## 관련 개념

- [Relation](/knowledge/database/relation/)
- [SELECT Statement](/knowledge/database/select-statement/)
- [WHERE Clause](/knowledge/database/where-clause/)
- [JOIN Operation](/knowledge/database/join-operation/)
- [Set Operations](/knowledge/database/set-operations/)
- [Database Language](/knowledge/database/database-language/)
