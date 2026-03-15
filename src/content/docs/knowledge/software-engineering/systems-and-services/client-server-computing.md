---
title: "클라이언트-서버 컴퓨팅 (Client-Server Computing)"
description: "클라이언트-서버 컴퓨팅은 사용자가 로컬 컴퓨터(클라이언트)의 프로그램을 통해 원격 컴퓨터(서버)가 제공하는 서비스에 접근하는 분산 시스템 모델이다"
tags: ['Client Server', 'Thin Client', 'Fat Client', 'Multi Tier', 'Distributed Computing', 'Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/client-server-computing
sidebar:
  order: 8
---

## 핵심 개념

클라이언트-서버 시스템은 프레젠테이션, 데이터 처리, 애플리케이션 처리, 데이터베이스의 4개 논리적 계층으로 구성된다. 아키텍처 유형에는 2계층(thin-client와 fat-client 모델)과 다중 계층(multi-tier) 아키텍처가 있다. thin-client 모델은 서버에 처리 부담이 크지만 클라이언트 관리가 쉽고, fat-client 모델은 클라이언트의 처리 능력을 활용하지만 소프트웨어 관리가 복잡하다. 다중 계층 아키텍처는 서버 간 처리를 분산시켜 확장성이 뛰어나다. 모바일 기기의 보편화로 thin-client와 fat-client의 구분이 모호해지고 있다.

## 예시

은행 ATM 시스템은 fat-client 아키텍처의 대표적 예이다. ATM 기기(클라이언트)가 고객 관련 처리의 상당 부분을 수행하고, 메인프레임(서버)이 고객 계좌 데이터베이스와 트랜잭션을 관리한다. 텔레프로세싱(TP) 모니터가 미들웨어로서 원격 클라이언트 통신을 조직하고 트랜잭션을 직렬화한다.

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/software-engineering/distributed-system/)
- [미들웨어 (Middleware)](/knowledge/software-engineering/middleware/)
- [서비스형 소프트웨어 (Software as a Service)](/knowledge/software-engineering/software-as-a-service/)
- [서비스 지향 아키텍처 (Service-Oriented Architecture)](/knowledge/software-engineering/service-oriented-architecture/)
