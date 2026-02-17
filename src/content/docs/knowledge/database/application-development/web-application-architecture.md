---
title: "Web Application Architecture"
description: "웹 애플리케이션 아키텍처(Web Application Architecture)는 웹 기반 데이터베이스 애플리케이션을 프레젠테이션 계층, 비즈니스 로직 계층, 데이터 접근 계층으로 분리하는 설계 구조로, MVC(Model-View-Controller) 패턴을 사용하..."
tags: ['Web Architecture', 'Mvc', 'Three Tier', 'Application Server', 'Presentation Layer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/web-application-architecture
sidebar:
  order: 7
---

## 핵심 개념

현대 웹 애플리케이션은 복잡성을 관리하기 위해 여러 계층으로 분리된다. 프레젠테이션(사용자 인터페이스) 계층은 사용자 상호작용을 처리하며, 웹 브라우저와 모바일 앱 등 다양한 인터페이스를 지원할 수 있다. 비즈니스 로직 계층은 데이터와 데이터에 대한 작업의 고수준 추상화를 제공한다. 데이터 접근 계층은 비즈니스 로직과 데이터베이스 사이의 인터페이스를 제공하며, ORM을 통한 객체-관계 매핑을 포함할 수 있다.

MVC(Model-View-Controller) 아키텍처는 많은 웹 프레임워크에서 사용된다. 모델(Model)은 비즈니스 로직에 해당하며, 뷰(View)는 데이터의 표현을 정의하고, 컨트롤러(Controller)는 사용자 이벤트를 받아 모델에 작업을 실행하고 뷰를 반환한다. 동일한 모델에 대해 장치에 따라 다른 뷰를 제공할 수 있다.

초기 웹 애플리케이션은 3계층 구조(웹 서버, 애플리케이션 서버, 데이터베이스 서버)를 사용했으나, 오버헤드를 줄이기 위해 현재는 대부분 2계층 구조(웹/애플리케이션 서버 통합, 데이터베이스 서버)를 사용한다. CGI(Common Gateway Interface)는 초기 표준이었으나 요청마다 새 프로세스를 생성하는 비효율이 있어, 서블릿 같은 기술로 대체되었다.

HTTP는 비연결(connectionless) 프로토콜이므로, 세션 관리를 위해 쿠키(cookie)를 사용한다. 서버는 세션 식별자를 생성하여 쿠키로 클라이언트에 전송하고, 클라이언트는 각 요청 시 이 쿠키를 함께 전송하여 세션 연속성을 유지한다.

성능 향상을 위해 커넥션 풀링(connection pooling), 쿼리 결과 캐싱, 웹 페이지 캐싱, memcached/Redis 같은 인메모리 캐시 시스템이 사용된다. 높은 부하를 처리하기 위해 다수의 애플리케이션 서버를 병렬로 운영하며, 라우터가 요청을 분배한다.

## 예시

```
-- 웹 애플리케이션 요청 처리 흐름 (MVC)

-- 1. 브라우저 -> 컨트롤러: HTTP 요청
-- 2. 컨트롤러 -> 모델: 비즈니스 로직 실행 요청
-- 3. 모델 -> 데이터 접근 계층: 데이터 조회/갱신
-- 4. 데이터 접근 계층 -> 데이터베이스: SQL 질의
-- 5. 데이터베이스 -> 데이터 접근 계층: 결과 반환
-- 6. 데이터 접근 계층 -> 모델: 객체 반환
-- 7. 모델 -> 뷰: 결과 객체 전달
-- 8. 뷰 -> 브라우저: HTML 응답

-- 커넥션 풀링 예시 (Java)
-- DataSource 객체에서 연결 획득
-- Connection conn = dataSource.getConnection();
-- ... 작업 수행 ...
-- conn.close();  // 연결을 풀에 반환 (실제 종료 아님)
```

## 관련 개념

- [Servlet](/knowledge/database/servlet/)
- [REST API](/knowledge/database/rest-api/)
- [Object-Relational Mapping](/knowledge/database/object-relational-mapping/)
- [Session Management](/knowledge/database/session-management/)
- [SQL Injection](/knowledge/database/sql-injection/)
