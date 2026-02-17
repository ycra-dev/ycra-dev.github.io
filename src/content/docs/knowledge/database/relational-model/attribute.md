---
title: "Attribute"
description: "속성(attribute)은 릴레이션에서 하나의 열(column)을 의미하며, 릴레이션 내 각 튜플이 가지는 특성이나 성질을 나타내는 이름이 부여된 데이터 항목이다"
tags: ['Attribute', 'Column', 'Domain', 'Relational Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/attribute
sidebar:
  order: 3
---

## 핵심 개념

각 속성은 이름(name)과 도메인(domain)을 가진다. 도메인은 해당 속성에 허용되는 값들의 집합이다. 예를 들어, instructor 릴레이션의 salary 속성의 도메인은 가능한 모든 급여 값의 집합이다.

관계형 모델에서 속성의 값은 원자적(atomic)이어야 한다는 것이 중요한 제약이다. 원자적이란 속성 값이 더 이상 분할할 수 없는 단위(indivisible unit)라는 의미이다. 예를 들어, 전화번호 속성에 여러 전화번호를 저장하는 것은 원자성을 위반하는 것이다. 이 원자성 조건은 제1정규형(1NF)의 기본 요구 사항이다.

모든 속성의 도메인에는 null 값이 포함될 수 있다. null 값은 해당 값이 존재하지 않거나, 알 수 없거나, 해당되지 않는 경우를 나타낸다. null 값의 존재는 데이터베이스 연산을 복잡하게 만들 수 있으므로, 가능한 한 null 값의 사용을 최소화하는 것이 좋다.

SQL에서는 다양한 도메인 타입을 지원한다: char(n), varchar(n), int, smallint, numeric(p,d), real, double precision, float(n) 등이 있다. 적절한 도메인 타입의 선택은 데이터 무결성과 저장 효율성에 중요한 영향을 미친다.

## 예시

instructor 릴레이션의 속성들:

```sql
CREATE TABLE instructor (
    ID        VARCHAR(5),      -- 속성: ID, 도메인: 최대 5자의 가변 문자열
    name      VARCHAR(20),     -- 속성: name, 도메인: 최대 20자의 가변 문자열
    dept_name VARCHAR(20),     -- 속성: dept_name, 도메인: 최대 20자의 가변 문자열
    salary    NUMERIC(8,2)     -- 속성: salary, 도메인: 최대 8자리 숫자 (소수점 2자리)
);
```

속성을 선택하여 프로젝션하는 예:

```sql
-- ID, name, salary 속성만 선택 (프로젝션)
SELECT ID, name, salary FROM instructor;
```

## 관련 개념

- [Relation](/knowledge/database/relation/)
- [Tuple](/knowledge/database/tuple/)
- [Domain Constraint](/knowledge/database/domain-constraint/)
- [Database Schema](/knowledge/database/database-schema/)
