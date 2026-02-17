---
title: "Integrity Constraint"
description: "무결성 제약 조건(integrity constraint)은 데이터베이스에 저장되는 데이터가 반드시 만족해야 하는 규칙으로, 데이터의 정확성과 일관성을 보장하기 위해 데이터베이스 스키마의 일부로 정의된다"
tags: ['Integrity Constraint', 'Data Integrity', 'Constraint', 'SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/integrity-constraint
sidebar:
  order: 14
---

## 핵심 개념

무결성 제약 조건은 데이터베이스에 대한 허가된 변경이 데이터의 일관성을 손상시키지 않도록 보장하는 수단이다. 즉, 인가된 사용자에 의한 데이터 수정이라도 제약 조건을 위반하면 거부된다.

SQL에서 지원하는 주요 무결성 제약 조건은 다음과 같다:

**NOT NULL 제약:** 속성 값이 null이 될 수 없음을 명시한다. 예를 들어, name VARCHAR(20) NOT NULL은 이름이 반드시 지정되어야 함을 의미한다.

**UNIQUE 제약:** 지정된 속성(들)의 값이 릴레이션 내에서 유일해야 함을 명시한다. 후보키를 선언하는 데 사용되며, null 값은 유일성 검사에서 제외된다(null != null이므로).

**CHECK 제약:** 속성 값이 만족해야 하는 조건(술어)을 지정한다. 예를 들어, CHECK(semester IN ('Fall', 'Winter', 'Spring', 'Summer'))는 학기 값을 네 가지로 제한한다.

**기본키 제약(PRIMARY KEY):** 튜플을 고유하게 식별하는 속성(들)을 지정한다. 기본키 속성은 자동으로 NOT NULL이 된다.

**외래키 제약(FOREIGN KEY):** 한 릴레이션의 속성이 다른 릴레이션의 기본키를 참조해야 함을 지정한다.

**참조 무결성 제약(REFERENTIAL INTEGRITY):** 외래키 제약의 일반화된 형태로, 참조되는 값이 피참조 릴레이션에 반드시 존재해야 한다.

무결성 제약 조건은 데이터의 삽입, 수정, 삭제 시 검사된다. 제약 조건 위반이 감지되면 해당 연산은 거부되거나, CASCADE, SET NULL 등의 보상 동작이 수행된다.

## 예시

```sql
CREATE TABLE student (
    ID        VARCHAR(5),
    name      VARCHAR(20) NOT NULL,           -- NOT NULL 제약
    dept_name VARCHAR(20),
    tot_cred  NUMERIC(3,0) CHECK (tot_cred >= 0),  -- CHECK 제약
    PRIMARY KEY (ID),                          -- 기본키 제약
    FOREIGN KEY (dept_name) REFERENCES department  -- 외래키 제약
);

-- UNIQUE 제약
CREATE TABLE instructor (
    ID        VARCHAR(5),
    name      VARCHAR(20) NOT NULL,
    dept_name VARCHAR(20),
    salary    NUMERIC(8,2),
    PRIMARY KEY (ID),
    UNIQUE (name, dept_name),                  -- 이름+학과 조합 유일
    FOREIGN KEY (dept_name) REFERENCES department
);

-- CHECK 제약 (도메인 제한)
CREATE TABLE section (
    course_id   VARCHAR(8),
    sec_id      VARCHAR(8),
    semester    VARCHAR(6) CHECK (semester IN ('Fall', 'Winter', 'Spring', 'Summer')),
    year        NUMERIC(4,0) CHECK (year > 1701 AND year < 2100),
    PRIMARY KEY (course_id, sec_id, semester, year)
);

-- 외래키의 CASCADE 동작
CREATE TABLE course (
    course_id VARCHAR(8) PRIMARY KEY,
    title     VARCHAR(50),
    dept_name VARCHAR(20),
    credits   NUMERIC(2,0),
    FOREIGN KEY (dept_name) REFERENCES department
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
```

## 관련 개념

- [Check Constraint](/knowledge/database/check-constraint/)
- [Referential Integrity](/knowledge/database/referential-integrity/)
- [Domain Constraint](/knowledge/database/domain-constraint/)
- [Primary Key](/knowledge/database/primary-key/)
- [Foreign Key](/knowledge/database/foreign-key/)
- [SQL](/knowledge/database/sql/)
