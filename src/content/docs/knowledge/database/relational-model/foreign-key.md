---
title: "Foreign Key"
description: "외래키(foreign key)는 한 릴레이션의 속성(들)이 다른 릴레이션의 기본키를 참조하는 제약 조건으로, 두 릴레이션 간의 관계를 정의하고 참조 무결성을 보장하는 수단이다"
tags: ['Foreign Key', 'Referential Integrity', 'Constraint', 'Relational Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/foreign-key
sidebar:
  order: 7
---

## 핵심 개념

외래키 제약 조건은 릴레이션 r1의 속성 집합 A에서 릴레이션 r2의 기본키 B로의 참조를 정의한다. 이 제약 조건은 데이터베이스의 모든 인스턴스에서 r1의 각 튜플의 A 값이 r2의 어떤 튜플의 B 값과 일치해야 함을 의미한다. 속성 집합 A를 외래키라 하며, r1을 참조 릴레이션(referencing relation), r2를 피참조 릴레이션(referenced relation)이라 한다.

예를 들어, instructor 릴레이션의 dept_name 속성은 department 릴레이션의 기본키인 dept_name을 참조하는 외래키이다. 이는 모든 교수의 학과명이 반드시 department 릴레이션에 존재하는 학과여야 함을 보장한다. 존재하지 않는 학과명을 교수에게 부여하려는 시도는 외래키 제약 위반으로 거부된다.

외래키 제약 조건은 참조 무결성(referential integrity)의 특수한 경우이다. 참조 무결성은 더 일반적인 개념으로, 피참조 속성이 반드시 기본키일 필요가 없는 경우까지 포함한다. 그러나 대부분의 데이터베이스 시스템에서는 외래키 제약 조건만을 직접 지원하며, 피참조 속성이 기본키가 아닌 참조 무결성 제약은 지원하지 않는 경우가 많다.

복합 외래키도 가능하다. section 릴레이션에서 (building, room_number) 속성 쌍이 classroom 릴레이션의 기본키 (building, room_number)를 참조하는 외래키가 된다.

## 예시

```sql
-- department 릴레이션 (피참조 릴레이션)
CREATE TABLE department (
    dept_name VARCHAR(20),
    building  VARCHAR(15),
    budget    NUMERIC(12,2),
    PRIMARY KEY (dept_name)
);

-- instructor 릴레이션 (참조 릴레이션)
CREATE TABLE instructor (
    ID        VARCHAR(5),
    name      VARCHAR(20) NOT NULL,
    dept_name VARCHAR(20),
    salary    NUMERIC(8,2),
    PRIMARY KEY (ID),
    FOREIGN KEY (dept_name) REFERENCES department
);

-- teaches 릴레이션: 여러 외래키를 가진 예
CREATE TABLE teaches (
    ID        VARCHAR(5),
    course_id VARCHAR(8),
    sec_id    VARCHAR(8),
    semester  VARCHAR(6),
    year      NUMERIC(4,0),
    PRIMARY KEY (ID, course_id, sec_id, semester, year),
    FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES section,
    FOREIGN KEY (ID) REFERENCES instructor
);
```

## 관련 개념

- [Primary Key](/knowledge/database/primary-key/)
- [Referential Integrity](/knowledge/database/referential-integrity/)
- [Integrity Constraint](/knowledge/database/integrity-constraint/)
- [Schema Diagram](/knowledge/database/schema-diagram/)
- [Relation](/knowledge/database/relation/)
