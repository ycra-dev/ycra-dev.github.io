---
title: "서비스 공학 (Service Engineering)"
description: "서비스 엔지니어링은 서비스 지향 애플리케이션에서 재사용하기 위한 서비스를 개발하는 프로세스로, 서비스 후보 식별, 서비스 설계, 서비스 구현/배포의 세 단계로 구성된다"
tags: ['Service Engineering', 'Service Design', 'Service Candidate', 'Service Interface', 'Service Implementation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/service-engineering
sidebar:
  order: 12
---

## 핵심 개념

서비스 후보 식별에서는 조직의 비즈니스 프로세스를 이해하고 분석하여 재사용 가능한 서비스를 결정한다. 서비스 유형에는 유틸리티 서비스(범용 기능), 비즈니스 서비스(특정 비즈니스 기능), 조정/프로세스 서비스(여러 활동을 포함하는 비즈니스 프로세스)가 있으며, 작업 지향(task-oriented)과 엔티티 지향(entity-oriented)으로 구분할 수도 있다. 서비스 인터페이스 설계에서는 추상적 인터페이스 설계 후 SOAP 기반 또는 RESTful 서비스로 구체화한다. 서비스 구현은 Java, C# 등의 언어로 프로그래밍하거나 기존 컴포넌트/레거시 시스템에 서비스 인터페이스를 생성하여 수행한다. 예외 처리 정의가 특히 중요하다.

## 예시

컴퓨터 장비 판매 회사의 카탈로그 서비스는 엔티티 지향 서비스로, MakeCatalog(회사별 카탈로그 생성), Lookup(항목 조회), Search(검색), Compare(비교), CheckDelivery(배송 확인), MakeVirtualOrder(가상 주문) 등의 연산을 제공한다.

## 관련 개념

- [서비스 지향 아키텍처 (Service-Oriented Architecture)](/knowledge/software-engineering/service-oriented-architecture/)
- [RESTful 서비스 (RESTful Service)](/knowledge/software-engineering/restful-service/)
- [서비스 합성 (Service Composition)](/knowledge/software-engineering/service-composition/)
- [컴포넌트 기반 소프트웨어 공학 (Component-Based Software Engineering)](/knowledge/software-engineering/component-based-software-engineering/)
