---
title: "Database Management System (DBMS)"
description: "데이터베이스 관리 시스템(DBMS)은 상호 연관된 데이터의 집합과 그 데이터에 접근하기 위한 프로그램들의 모음으로, 데이터를 편리하고 효율적으로 저장하고 검색하는 것을 목표로 한다"
tags: ['DBMS', 'Database System', 'Data Management']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/dbms
sidebar:
  order: 1
---

## 핵심 개념

DBMS는 대규모 정보를 관리하기 위해 설계된 소프트웨어 시스템이다. 데이터의 저장 구조를 정의하고, 정보를 조작하기 위한 메커니즘을 제공하며, 시스템 충돌이나 무단 접근에도 불구하고 저장된 정보의 안전성을 보장한다.

DBMS가 등장하기 전에는 파일 처리 시스템(file-processing system)이 사용되었는데, 이 시스템은 데이터 중복과 비일관성, 데이터 접근의 어려움, 데이터 고립, 무결성 문제, 원자성 문제, 동시 접근 이상 현상, 보안 문제 등 심각한 단점이 있었다. DBMS는 이러한 모든 문제를 해결하기 위해 1960년대와 1970년대에 개발되었다.

현대의 DBMS는 크게 두 가지 모드로 사용된다. 첫째는 온라인 트랜잭션 처리(OLTP)로, 대규모 사용자가 소량의 데이터를 검색하고 갱신하는 방식이다. 둘째는 데이터 분석(data analytics)으로, 데이터로부터 결론을 도출하고 규칙이나 의사결정 절차를 추론하는 방식이다.

DBMS의 기능적 구성요소는 크게 저장 관리자(storage manager), 질의 처리기(query processor), 트랜잭션 관리 구성요소(transaction management component)로 나뉜다. 저장 관리자는 저수준 데이터와 응용 프로그램 간의 인터페이스를 제공하고, 질의 처리기는 데이터 접근을 단순화하며, 트랜잭션 관리자는 일련의 데이터베이스 접근을 하나의 원자적 단위로 처리할 수 있게 한다.

현대의 데이터베이스 응용 프로그램은 주로 3계층 아키텍처(three-tier architecture)를 사용하며, 클라이언트(프론트엔드), 응용 서버, 데이터베이스 시스템으로 구성된다.

## 예시

대학교 데이터베이스 시스템을 예로 들면, DBMS는 다음과 같은 기능을 수행한다:

- 학생, 교수, 과목 정보를 저장하고 관리
- 수강 신청 시 동시 접근 제어 (예: 수강 인원 제한)
- 시스템 장애 시 데이터 복구
- 사용자별 접근 권한 관리 (예: 등록처 직원은 학생 정보만 접근 가능)

```sql
-- DBMS를 통한 테이블 생성 예시
create table department
  (dept_name  char(20),
   building   char(15),
   budget     numeric(12,2));
```

## 관련 개념

- [Data Abstraction](/knowledge/database/data-abstraction/)
- [Data Model](/knowledge/database/data-model/)
- [Database Schema](/knowledge/database/database-schema/)
- [Storage Manager](/knowledge/database/storage-manager/)
- [Query Processor](/knowledge/database/query-processor/)
