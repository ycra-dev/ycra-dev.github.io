---
title: "Primary Key"
description: "기본키(primary key)는 릴레이션 내에서 각 튜플을 고유하게 식별하기 위해 데이터베이스 설계자가 후보키(candidate key) 중에서 선택한 주된 식별 수단이다"
tags: ['Primary Key', 'Candidate Key', 'Constraint', 'Relational Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/primary-key
sidebar:
  order: 6
---

## 핵심 개념

기본키는 후보키 중 하나를 선택한 것으로, 릴레이션 내에서 튜플을 구분하는 가장 중요한 수단이다. 기본키로 선택된 속성(들)은 어떤 두 튜플에서도 동일한 값을 가질 수 없으며, 이를 기본키 제약 조건(primary key constraint)이라 한다.

기본키를 선택할 때는 몇 가지 원칙을 고려해야 한다. 첫째, 기본키 속성의 값은 변경되지 않거나 매우 드물게 변경되어야 한다. 예를 들어, 주소(address)는 자주 변경될 수 있으므로 기본키로 부적합하다. 둘째, 기본키는 가능한 한 의미를 가지지 않는 인공 식별자를 사용하는 것이 좋다. 기업에서 고유 식별자를 생성하는 것이 일반적이며, 두 기업이 합병할 경우 식별자의 재할당이 필요할 수 있다.

관례적으로 릴레이션 스키마를 표기할 때 기본키 속성을 다른 속성보다 먼저 나열하고, 밑줄을 그어 표시한다. 예를 들어, department(dept_name, building, budget)에서 dept_name이 기본키이다.

기본키는 단일 속성으로 구성될 수도 있고, 여러 속성의 조합(복합 기본키)으로 구성될 수도 있다. classroom(building, room_number, capacity)에서는 building과 room_number가 함께 기본키를 구성한다.

기본키는 외래키(foreign key)가 참조하는 대상이 되므로, 릴레이션 간의 관계를 정의하는 데 핵심적인 역할을 한다.

## 예시

```sql
-- 단일 속성 기본키
CREATE TABLE department (
    dept_name VARCHAR(20),
    building  VARCHAR(15),
    budget    NUMERIC(12,2),
    PRIMARY KEY (dept_name)
);

-- 복합 기본키 (여러 속성의 조합)
CREATE TABLE section (
    course_id   VARCHAR(8),
    sec_id      VARCHAR(8),
    semester    VARCHAR(6),
    year        NUMERIC(4,0),
    building    VARCHAR(15),
    room_number VARCHAR(7),
    time_slot_id VARCHAR(4),
    PRIMARY KEY (course_id, sec_id, semester, year)
);

-- time_slot 릴레이션: 3개 속성의 복합 기본키
CREATE TABLE time_slot (
    time_slot_id VARCHAR(4),
    day          VARCHAR(1),
    start_time   TIME,
    end_time     TIME,
    PRIMARY KEY (time_slot_id, day, start_time)
);
```

## 관련 개념

- [Superkey](/knowledge/database/superkey/)
- [Foreign Key](/knowledge/database/foreign-key/)
- [Relation](/knowledge/database/relation/)
- [Integrity Constraint](/knowledge/database/integrity-constraint/)
- [Referential Integrity](/knowledge/database/referential-integrity/)
