---
title: "SQL"
description: "SQL(Structured Query Language)은 관계형 데이터베이스에서 데이터를 정의, 조작, 제어하기 위한 표준화된 질의 언어로, 상용 관계형 데이터베이스 시스템에서 가장 널리 사용되는 언어이다"
tags: ['SQL', 'Query Language', 'Database Language', 'Standard']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/sql
sidebar:
  order: 1
---

## 핵심 개념

SQL은 여러 부분으로 구성된다. 데이터 정의 언어(DDL, Data-Definition Language)는 릴레이션 스키마의 정의, 삭제, 수정을 위한 명령어를 제공한다. 데이터 조작 언어(DML, Data-Manipulation Language)는 질의 언어와 데이터의 삽입, 삭제, 수정을 위한 명령어를 포함한다.

SQL의 DDL은 각 릴레이션에 대해 다음 정보를 지정할 수 있다: 각 릴레이션의 스키마, 각 속성의 값 도메인(타입), 무결성 제약 조건(기본키 제약, 외래키 제약 등), 그리고 각 릴레이션에 대해 유지할 인덱스의 집합, 보안 및 권한 정보, 디스크에서의 물리적 저장 구조 등이다.

SQL은 명령적(imperative), 함수적(functional), 선언적(declarative) 접근 방식의 요소를 모두 포함한다. 사용자는 원하는 결과를 기술하면, 데이터베이스 시스템이 최적의 실행 방법을 결정한다.

SQL은 IBM에서 1970년대에 System R 프로젝트의 일부로 개발되었으며, 이후 ANSI/ISO 표준으로 발전하였다. SQL-86, SQL-89, SQL-92, SQL:1999, SQL:2003, SQL:2008, SQL:2011, SQL:2016 등의 표준이 존재하며, 각 표준은 이전 버전의 기능을 확장한다.

SQL의 기본 질의 구조는 select, from, where 세 개의 절로 구성되며, 입력 릴레이션에서 조건을 만족하는 튜플을 선택하여 결과 릴레이션을 생성한다.

## 예시

```sql
-- DDL: 테이블 생성
CREATE TABLE department (
    dept_name VARCHAR(20),
    building  VARCHAR(15),
    budget    NUMERIC(12,2),
    PRIMARY KEY (dept_name)
);

-- DML: 데이터 삽입
INSERT INTO department VALUES ('Comp. Sci.', 'Taylor', 100000);

-- DML: 데이터 질의
SELECT name, salary
FROM instructor
WHERE dept_name = 'Comp. Sci.' AND salary > 70000;

-- DML: 데이터 수정
UPDATE instructor SET salary = salary * 1.05 WHERE salary < 70000;

-- DML: 데이터 삭제
DELETE FROM instructor WHERE dept_name = 'Finance';

-- DDL: 테이블 구조 변경
ALTER TABLE instructor ADD COLUMN phone VARCHAR(15);
```

## 관련 개념

- [SELECT Statement](/knowledge/database/select-statement/)
- [WHERE Clause](/knowledge/database/where-clause/)
- [JOIN Operation](/knowledge/database/join-operation/)
- [Aggregate Function](/knowledge/database/aggregate-function/)
- [Database Language](/knowledge/database/database-language/)
- [Relational Algebra](/knowledge/database/relational-algebra/)
