---
title: "Domain Constraint"
description: "도메인 제약 조건(domain constraint)은 속성이 취할 수 있는 값의 범위(도메인)를 제한하는 가장 기본적인 형태의 무결성 제약 조건으로, SQL에서 속성의 데이터 타입 선언을 통해 구현된다"
tags: ['Domain Constraint', 'Data Type', 'Domain', 'SQL']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/domain-constraint
sidebar:
  order: 15
---

## 핵심 개념

도메인 제약은 무결성 제약 조건 중 가장 기본적인 형태이다. 속성에 대해 데이터 타입을 선언하면, 해당 속성에는 선언된 타입과 호환되는 값만 저장할 수 있다. 예를 들어, salary 속성을 NUMERIC(8,2)로 선언하면 정수나 소수점 이하 2자리까지의 숫자만 저장할 수 있고, 문자열 값은 저장할 수 없다.

SQL에서 제공하는 주요 데이터 타입(도메인)은 다음과 같다:

**문자열 타입:**
- CHAR(n): 고정 길이 문자열 (n자로 패딩)
- VARCHAR(n): 가변 길이 문자열 (최대 n자)

**숫자 타입:**
- INT/INTEGER: 정수
- SMALLINT: 작은 정수
- NUMERIC(p,d): 고정 소수점 (p자리, 소수점 이하 d자리)
- REAL, DOUBLE PRECISION: 부동 소수점
- FLOAT(n): 정밀도 n 이상의 부동 소수점

**날짜/시간 타입:**
- DATE: 날짜 (년, 월, 일)
- TIME: 시간 (시, 분, 초)
- TIMESTAMP: 날짜 + 시간
- INTERVAL: 시간 간격

SQL 표준에서는 CREATE DOMAIN 문을 통해 사용자 정의 도메인을 생성할 수 있다. 사용자 정의 도메인에 CHECK 제약을 추가하여 허용되는 값을 더 세밀하게 제한할 수 있다. 또한 CREATE TYPE 문을 통해 사용자 정의 타입을 생성할 수도 있으며, 이는 도메인보다 더 강력한 타입 안전성을 제공한다.

SQL에서 타입 변환(type casting)은 CAST 함수를 사용하여 수행할 수 있으며, COALESCE 함수는 null 값을 다른 값으로 대체하는 데 사용된다.

## 예시

```sql
-- 다양한 데이터 타입 사용
CREATE TABLE student (
    ID        VARCHAR(5),         -- 가변 문자열, 최대 5자
    name      VARCHAR(20) NOT NULL, -- 가변 문자열, null 불가
    dept_name VARCHAR(20),        -- 가변 문자열
    tot_cred  NUMERIC(3,0),       -- 3자리 정수
    PRIMARY KEY (ID)
);

-- 날짜/시간 타입
CREATE TABLE event (
    event_id    INT,
    event_date  DATE,              -- 'YYYY-MM-DD' 형식
    event_time  TIME,              -- 'HH:MM:SS' 형식
    created_at  TIMESTAMP,         -- 날짜 + 시간
    PRIMARY KEY (event_id)
);

-- 사용자 정의 도메인 (SQL 표준, 지원 여부는 시스템에 따라 다름)
CREATE DOMAIN dollar_amount NUMERIC(12,2);
CREATE DOMAIN semester_type VARCHAR(6)
    CHECK (VALUE IN ('Fall', 'Winter', 'Spring', 'Summer'));

-- CAST를 이용한 타입 변환
SELECT CAST(salary AS VARCHAR(10)) FROM instructor;

-- COALESCE: null 대체
SELECT ID, COALESCE(salary, 0) AS salary FROM instructor;

-- DEFAULT 값 설정
CREATE TABLE account (
    id      INT PRIMARY KEY,
    balance NUMERIC(12,2) DEFAULT 0.00,
    status  VARCHAR(10) DEFAULT 'active'
);
```

## 관련 개념

- [Integrity Constraint](/knowledge/database/integrity-constraint/)
- [Check Constraint](/knowledge/database/check-constraint/)
- [Attribute](/knowledge/database/attribute/)
- [SQL](/knowledge/database/sql/)
