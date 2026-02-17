---
title: "Superkey"
description: "슈퍼키(superkey)는 릴레이션에서 튜플을 고유하게 식별할 수 있는 하나 이상의 속성들의 집합이다"
tags: ['Superkey', 'Candidate Key', 'Key', 'Relational Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/superkey
sidebar:
  order: 5
---

## 핵심 개념

슈퍼키는 릴레이션 내에서 어떠한 두 개의 서로 다른 튜플도 슈퍼키를 구성하는 모든 속성에 대해 동일한 값을 가질 수 없다는 성질을 가진다. 수학적으로 표현하면, R이 릴레이션 스키마의 속성 집합이고 K가 R의 부분집합일 때, K가 슈퍼키이면 릴레이션 r의 임의의 두 튜플 t1, t2에 대해 t1 != t2이면 t1.K != t2.K가 성립한다.

슈퍼키는 여분의 속성을 포함할 수 있다. 예를 들어, instructor 릴레이션에서 {ID}가 슈퍼키라면, {ID, name}도 슈퍼키이다. K가 슈퍼키이면 K의 모든 상위집합(superset)도 슈퍼키가 된다.

진정한 의미의 최소 슈퍼키를 후보키(candidate key)라 한다. 후보키는 어떤 진부분집합도 슈퍼키가 되지 않는 슈퍼키이다. 예를 들어, {ID}가 후보키이면 ID의 어떤 부분집합도 슈퍼키가 될 수 없다(공집합은 당연히 슈퍼키가 아니므로). 릴레이션에는 여러 후보키가 존재할 수 있으며, 이 중 하나를 기본키(primary key)로 선택한다.

키는 개별 튜플이 아닌 릴레이션 전체의 속성이다. 어떤 두 튜플이든 키 속성에서 동일한 값을 가질 수 없다는 것은 현실 세계에서의 제약 조건을 모델링한 것이다.

## 예시

instructor 릴레이션에서의 슈퍼키, 후보키, 기본키 구분:

```
릴레이션: instructor(ID, name, dept_name, salary)

슈퍼키 예시:
  {ID}                        -- 최소 슈퍼키 = 후보키
  {ID, name}                  -- 슈퍼키 (여분의 속성 name 포함)
  {ID, name, dept_name}       -- 슈퍼키 (여분의 속성 포함)
  {name, dept_name}           -- name과 dept_name의 조합이 유일하다면 후보키

후보키: {ID}, {name, dept_name} (두 조합 모두 유일하다고 가정)
기본키: {ID} (데이터베이스 설계자가 선택)
```

```sql
-- 기본키 선언 (후보키 중 선택)
CREATE TABLE instructor (
    ID        VARCHAR(5),
    name      VARCHAR(20),
    dept_name VARCHAR(20),
    salary    NUMERIC(8,2),
    PRIMARY KEY (ID)    -- 후보키 {ID}를 기본키로 선택
);
```

## 관련 개념

- [Primary Key](/knowledge/database/primary-key/)
- [Foreign Key](/knowledge/database/foreign-key/)
- [Relation](/knowledge/database/relation/)
- [Integrity Constraint](/knowledge/database/integrity-constraint/)
