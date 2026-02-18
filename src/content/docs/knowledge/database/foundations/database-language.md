---
title: "Database Language (DDL/DML)"
description: "데이터베이스 언어는 데이터베이스 스키마를 정의하는 데이터 정의 언어(DDL)와 데이터베이스 질의 및 갱신을 표현하는 데이터 조작 언어(DML)로 구성된다"
tags: ['Ddl', 'Dml', 'Database Language', 'Query Language']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/database-language
sidebar:
  order: 5
---

## 핵심 개념

데이터 정의 언어(Data-Definition Language, DDL)는 데이터베이스 스키마를 정의하는 데 사용되는 언어이다. DDL을 통해 테이블 구조, 데이터 타입, 무결성 제약 조건(도메인 제약 조건, 참조 무결성, 권한 등)을 명세할 수 있다. DDL 문의 처리 결과는 데이터 사전(data dictionary)에 저장되며, 데이터 사전은 메타데이터(데이터에 대한 데이터)를 포함한다.

데이터 조작 언어(Data-Manipulation Language, DML)는 사용자가 데이터 모델에 의해 조직된 데이터에 접근하거나 조작할 수 있게 하는 언어이다. DML의 접근 유형에는 정보 검색, 새 정보 삽입, 정보 삭제, 정보 수정이 있다.

DML은 두 가지 유형으로 나뉜다. 절차적 DML(Procedural DML)은 사용자가 어떤 데이터가 필요한지와 어떻게 그 데이터를 얻을지를 모두 지정해야 한다. 선언적 DML(Declarative DML, 비절차적 DML)은 어떤 데이터가 필요한지만 지정하면 되고, 시스템이 효율적인 데이터 접근 방법을 결정한다.

실제로 DDL과 DML은 별개의 언어가 아니라 SQL과 같은 단일 데이터베이스 언어의 구성 요소이다. SQL은 비절차적 질의 언어로, 거의 모든 관계형 데이터베이스 시스템에서 사용된다.

응용 프로그램에서 데이터베이스에 접근하기 위해서는 ODBC(C 언어용)나 JDBC(Java용)와 같은 응용 프로그램 인터페이스(API)를 사용하여 DML과 DDL 문을 데이터베이스로 전송하고 결과를 검색한다.

## 예시

```sql
-- DDL 예시: 테이블 정의
create table department
  (dept_name  char(20),
   building   char(15),
   budget     numeric(12,2));

-- DML 예시: 데이터 검색 (선언적)
select instructor.name
from instructor
where instructor.dept_name = 'History';
```

## 관련 개념

- [Database Schema](/knowledge/database/database-schema/)
- [SQL](/knowledge/database/sql/)
- [Query Processor](/knowledge/database/query-processor/)
