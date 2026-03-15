---
title: "미들웨어 (Middleware)"
description: "미들웨어는 분산 컴포넌트 사이에 위치하여 다양한 부분들 간의 통신과 데이터 교환을 관리하는 소프트웨어 계층이다"
tags: ['Middleware', 'Distributed System', 'Communication', 'Interoperability', 'Corba', 'Transaction Management']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/middleware
sidebar:
  order: 10
---

## 핵심 개념

미들웨어는 운영 체제와 애플리케이션 프로그램 사이에 위치하며, 분산 컴퓨터에 설치되는 라이브러리 세트와 통신 관리를 위한 런타임 시스템으로 구현된다. 미들웨어가 제공하는 두 가지 유형의 지원은 상호작용 지원(위치 투명성, 매개변수 변환, 이벤트 감지, 통신)과 공통 서비스 제공(보안 서비스, 명명 서비스, 트랜잭션 관리 서비스 등)이다. 데이터베이스 통신 관리, 트랜잭션 매니저, 데이터 변환기, 통신 컨트롤러 등이 미들웨어의 예이다. 분산 컴포넌트 시스템에서 미들웨어는 컴포넌트 통신을 관리하고 매개변수 유형 차이를 조정하며 공통 서비스 세트를 제공하는 핵심 역할을 한다.

## 예시

CORBA(Common Object Request Broker Architecture)는 1990년대에 제안된 분산 컴포넌트 통신 및 실행을 지원하기 위한 미들웨어 표준이다. Enterprise Java Beans(EJB)와 Microsoft .NET도 컴포넌트 간 통신을 지원하는 미들웨어 역할을 한다.

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/software-engineering/distributed-system/)
- [클라이언트-서버 컴퓨팅 (Client-Server Computing)](/knowledge/software-engineering/client-server-computing/)
- [컴포넌트 기반 소프트웨어 공학 (Component-Based Software Engineering)](/knowledge/software-engineering/component-based-software-engineering/)
- [컴포넌트 모델 (Component Model)](/knowledge/software-engineering/component-model/)
