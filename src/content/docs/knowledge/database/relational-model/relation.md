---
title: "Relation"
description: "릴레이션(relation)은 관계형 모델에서 데이터를 표현하는 기본 구조로, 행(튜플)과 열(속성)로 구성된 2차원 테이블 형태의 데이터 집합이다"
tags: ['Relation', 'Relational Model', 'Table', 'Database']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/relation
sidebar:
  order: 1
---

## 핵심 개념

릴레이션은 관계형 데이터베이스의 핵심 개념이다. 수학적으로 릴레이션은 도메인(domain)들의 카티션 곱(Cartesian product)의 부분집합으로 정의된다. 각 도메인은 허용되는 값들의 집합이며, 릴레이션의 모든 속성은 특정 도메인에 속한다.

릴레이션은 릴레이션 스키마(relation schema)와 릴레이션 인스턴스(relation instance)로 구분된다. 릴레이션 스키마는 릴레이션의 구조, 즉 속성의 이름과 각 속성의 도메인을 정의하며, 릴레이션 인스턴스는 특정 시점에 릴레이션에 저장된 실제 데이터(튜플들의 집합)를 말한다.

수학적 정의에서 릴레이션은 집합(set)이므로 중복 튜플이 존재할 수 없다. 그러나 실제 상용 데이터베이스 시스템에서는 특별한 제약 조건이 없는 한 중복을 허용하기도 한다. 이러한 차이로 인해 SQL에서는 중복 제거를 위해 DISTINCT 키워드를 명시적으로 사용해야 한다.

릴레이션의 속성 값은 원자적(atomic)이어야 한다. 즉, 각 속성의 값은 더 이상 분해할 수 없는 단일 값이어야 하며, 이를 제1정규형(First Normal Form)의 기본 조건이라 한다. null 값은 알 수 없거나 존재하지 않는 값을 나타내기 위해 사용되며, 모든 도메인의 구성원이 될 수 있다.

## 예시

대학교 데이터베이스에서 instructor 릴레이션은 다음과 같이 정의된다:

```sql
-- instructor 릴레이션 스키마
-- instructor(ID, name, dept_name, salary)

CREATE TABLE instructor (
    ID          VARCHAR(5),
    name        VARCHAR(20) NOT NULL,
    dept_name   VARCHAR(20),
    salary      NUMERIC(8,2),
    PRIMARY KEY (ID)
);
```

릴레이션 인스턴스의 예:

| ID    | name       | dept_name  | salary |
|-------|------------|------------|--------|
| 10101 | Srinivasan | Comp. Sci. | 65000  |
| 12121 | Wu         | Finance    | 90000  |
| 22222 | Einstein   | Physics    | 95000  |

각 행이 하나의 튜플이고, 각 열이 하나의 속성이다.

## 관련 개념

- [Tuple](/knowledge/database/tuple/)
- [Attribute](/knowledge/database/attribute/)
- [Database Schema](/knowledge/database/database-schema/)
- [Primary Key](/knowledge/database/primary-key/)
- [Data Model](/knowledge/database/data-model/)
