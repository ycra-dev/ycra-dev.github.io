---
title: "Component Model"
description: "컴포넌트 모델은 컴포넌트 구현, 문서화, 배포에 대한 표준을 정의하는 것으로, 컴포넌트 간 상호운용성을 보장하기 위한 규범이다"
tags: ['Component Model', 'Interface', 'Deployment', 'Ejb', 'Dotnet', 'Interoperability', 'Standard']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/component-model
sidebar:
  order: 9
---

## 핵심 개념

컴포넌트 모델의 기본 요소에는 인터페이스(operation names, parameters, exceptions), 사용법(고유 이름/핸들, 메타데이터), 배포(패키징, 이진 조직 정보)가 포함된다. 대표적인 컴포넌트 모델로는 웹 서비스 모델, Enterprise Java Beans(EJB), Microsoft .NET이 있다. 컴포넌트 모델 구현은 플랫폼 서비스(통신, 상호운용 지원)와 지원 서비스(인증, 트랜잭션 관리 등 공통 서비스)를 제공한다. 컴포넌트는 "컨테이너"에 배포되며, 컨테이너는 지원 서비스의 구현과 컴포넌트 통합을 위한 인터페이스 정의를 포함한다. 서로 다른 벤더들이 호환되지 않는 표준을 제안하여 이 접근법의 영향력이 제한되었다.

## 예시

EJB 모델에서는 인터넷 도메인 이름 기반의 계층적 이름이 생성되어 각 컴포넌트가 고유하게 식별된다. .NET에서는 Microsoft의 Common Intermediate Language(CIL)로 인터페이스가 정의된다.

## 관련 개념

- [Component-Based Software Engineering](/knowledge/software-engineering/component-based-software-engineering/)
- [Middleware](/knowledge/software-engineering/middleware/)
- [Service-Oriented Architecture](/knowledge/software-engineering/service-oriented-architecture/)
- [Component Composition](/knowledge/software-engineering/component-composition/)
