---
title: "Database Standardization"
description: "데이터베이스 표준화(Database Standardization)는 소프트웨어 시스템의 인터페이스를 정의하여 서로 다른 데이터베이스 시스템, 클라이언트, 애플리케이션 간의 상호운용성(interoperability)을 보장하는 과정으로, SQL 표준, 데이터베이스 ..."
tags: ['Database Standardization', 'SQL Standard', 'Odbc', 'Jdbc', 'Interoperability', 'Formal Standard']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/database-standardization
sidebar:
  order: 5
---

## 핵심 개념

데이터베이스 시스템은 복잡하며, 독립적으로 생성된 여러 부분이 상호작용해야 한다. 클라이언트 프로그램은 백엔드 시스템과 독립적으로 생성되지만, 둘 사이의 상호작용이 가능해야 한다. 이러한 상황에서 표준이 중요한 역할을 한다.

**표준의 유형**:
- **공식 표준(Formal standards)**: 표준 기관이나 산업 그룹이 공개 과정을 통해 개발한다.
- **사실상 표준(De facto standards)**: 공식적 인정 없이 시장 지배적 제품이 일반적으로 표준으로 받아들여진다.
- **선행 표준(Anticipatory standards)**: 시장을 선도하여 벤더가 구현할 기능을 정의한다 (예: SQL-92의 많은 부분).
- **반응 표준(Reactionary standards)**: 일부 벤더가 이미 구현한 기능을 표준화한다 (예: SQL-89).

**SQL 표준**: ANSI와 ISO가 주도하며, 주요 버전은 다음과 같다:
- **SQL-86**: 최초 공식 버전
- **SQL-92**: 대폭 확장된 버전
- **SQL:1999**: 다양한 새 기능 추가
- **SQL:2003**: SQL:1999의 소규모 확장
- **SQL:2006**: XML 관련 기능 추가
- **SQL:2008**: MERGE 절 확장 등 소규모 확장
- **SQL:2011**: 시간적(temporal) 확장, 윈도우 구성 확장
- **SQL:2016**: JSON 지원, LISTAGG 집계 함수 추가

**데이터베이스 연결 표준**:
- **ODBC(Open Database Connectivity)**: 클라이언트 애플리케이션과 데이터베이스 시스템 간 통신을 위한 표준으로, SQL CLI(Call Level Interface)를 기반으로 한다. 핵심(core), 레벨 1, 레벨 2의 적합성 수준이 있다.
- **JDBC**: Java 애플리케이션용 데이터베이스 연결 표준으로, ODBC를 모델로 개발되었다.
- **X/Open XA**: 분산 트랜잭션의 상호운용을 위한 표준으로, 2단계 커밋을 구현하기 위한 트랜잭션 관리 프리미티브를 정의한다.
- **OLE-DB**: 비데이터베이스 데이터 소스를 포함하여 제한적인 쿼리와 갱신 기능을 제공하는 C++ API이다.

**객체 데이터베이스 표준**: ODMG(Object Database Management Group)가 객체 지향 데이터베이스의 데이터 모델과 언어 인터페이스를 표준화했으나, 현재는 대부분 사용되지 않는다. 대신 Hibernate나 Django 등의 객체-관계 매핑(ORM) 기술이 실용적으로 널리 사용되고 있다.

## 예시

SQL 표준 진화와 주요 기능:

```sql
-- SQL:2011 시간적 확장 예시
-- 튜플에 시간 기간(time period)을 연관시킬 수 있음

-- SQL:2016 JSON 지원 예시
-- JSON 데이터 처리를 위한 표준 함수 제공

-- SQL:2016 LISTAGG 집계 함수
SELECT dept_name, LISTAGG(name, ', ')
FROM instructor
GROUP BY dept_name;
-- 결과: 부서별 교수 이름을 쉼표로 구분된 문자열로 집계
```

ODBC 적합성 수준:

```
Core Level: 데이터베이스 연결, SQL 문 준비/실행,
            결과/상태값 반환, 트랜잭션 관리

Level 1:    카탈로그 정보 검색 등 추가 기능

Level 2:    매개변수 값 배열 전송/수신,
            상세 카탈로그 정보 검색 등
```

## 관련 개념

- [LDAP](/knowledge/database/ldap/)
- [Performance Tuning](/knowledge/database/performance-tuning/)
- [Query Tuning](/knowledge/database/query-tuning/)
- [TPC Benchmark](/knowledge/database/tpc-benchmark/)
