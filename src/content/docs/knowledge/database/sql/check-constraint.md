---
title: "Check Constraint"
description: "CHECK 제약 조건은 릴레이션의 속성 값이 반드시 만족해야 하는 술어(predicate)를 지정하는 무결성 제약 조건으로, 데이터 삽입이나 수정 시 지정된 조건이 위반되면 해당 연산을 거부한다"
tags: ['Check Constraint', 'Validation', 'Predicate', 'SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/check-constraint
sidebar:
  order: 16
---

## 핵심 개념

CHECK 제약 조건은 CREATE TABLE 문 내에서 정의되며, 속성 수준 또는 튜플 수준에서 적용될 수 있다. 속성 수준의 CHECK는 개별 속성에 대한 조건을 지정하고, 튜플 수준의 CHECK는 튜플 내 여러 속성 간의 관계를 지정할 수 있다.

CHECK 절에는 WHERE 절에 사용할 수 있는 모든 술어를 사용할 수 있다. 가장 일반적인 용도는 속성의 값 범위를 제한하거나, 허용되는 값의 목록을 지정하는 것이다.

SQL 표준에서는 CHECK 절 내에 서브쿼리를 포함할 수 있도록 정의되어 있다. 예를 들어, CHECK (time_slot_id IN (SELECT time_slot_id FROM time_slot))과 같은 조건을 사용하여 다른 릴레이션의 값을 참조할 수 있다. 그러나 이러한 복잡한 CHECK 조건은 대부분의 데이터베이스 시스템에서 지원되지 않으며, 이 경우 외래키 제약이나 트리거(trigger)를 대신 사용해야 한다.

CHECK 제약 조건은 해당 릴레이션에 데이터가 삽입되거나 수정될 때만 검사된다. 참조하는 다른 릴레이션의 데이터가 변경될 때는 검사되지 않으므로, 서브쿼리를 포함한 CHECK 조건은 완전한 무결성 보장이 어려울 수 있다. 이런 경우에는 ASSERTION(SQL 표준에 정의되어 있지만 대부분 미지원)이나 트리거를 사용하는 것이 더 적절하다.

## 예시

```sql
-- 속성 수준 CHECK: 학점이 0 이상
CREATE TABLE student (
    ID        VARCHAR(5),
    name      VARCHAR(20) NOT NULL,
    dept_name VARCHAR(20),
    tot_cred  NUMERIC(3,0) CHECK (tot_cred >= 0),
    PRIMARY KEY (ID)
);

-- 값 목록 제한
CREATE TABLE section (
    course_id   VARCHAR(8),
    sec_id      VARCHAR(8),
    semester    VARCHAR(6) CHECK (semester IN ('Fall', 'Winter', 'Spring', 'Summer')),
    year        NUMERIC(4,0) CHECK (year > 1701 AND year < 2100),
    building    VARCHAR(15),
    room_number VARCHAR(7),
    time_slot_id VARCHAR(4),
    PRIMARY KEY (course_id, sec_id, semester, year)
);

-- 튜플 수준 CHECK: 여러 속성 간 관계
CREATE TABLE instructor (
    ID        VARCHAR(5),
    name      VARCHAR(20),
    dept_name VARCHAR(20),
    salary    NUMERIC(8,2),
    PRIMARY KEY (ID),
    CHECK (salary >= 29000)  -- 최저 급여 제한
);

-- 복합 조건
CREATE TABLE account (
    account_id VARCHAR(10),
    balance    NUMERIC(12,2),
    status     VARCHAR(10),
    CHECK (balance >= 0 OR status = 'overdraft')
);
```

## 관련 개념

- [Integrity Constraint](/knowledge/database/integrity-constraint/)
- [Domain Constraint](/knowledge/database/domain-constraint/)
- [Trigger](/knowledge/database/trigger/)
- [SQL](/knowledge/database/sql/)
