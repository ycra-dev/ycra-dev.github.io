---
title: "Software Reuse"
description: "소프트웨어 재사용은 기존 소프트웨어(코드, 설계, 컴포넌트, 시스템)를 새로운 시스템 개발에 활용하여 개발 비용과 시간을 절감하는 전략이다"
tags: ['Software Reuse', 'Component Reuse', 'Library', 'Framework', 'Cost Reduction']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-reuse
sidebar:
  order: 1
---

## 핵심 개념

소프트웨어 재사용은 추상화 수준(개념 재사용), 객체 수준(라이브러리, 프레임워크), 컴포넌트 수준(독립 실행 가능 컴포넌트), 시스템 수준(전체 시스템 통합)의 네 가지 수준에서 이루어진다. 재사용의 장점은 개발 비용 절감, 빠른 인도, 검증된 소프트웨어 사용으로 인한 신뢰성 향상, 프로세스 리스크 감소, 표준 준수 등이 있다. 단점은 재사용 가능한 컴포넌트 라이브러리 관리 비용, 적합한 컴포넌트를 찾고 이해하는 어려움, 유지보수 비용 증가, "여기서 만들지 않았다(Not-invented-here)" 증후군 등의 문제점이 존재한다. 재사용 방식에는 코드 자체를 재사용하는 것뿐만 아니라 설계 패턴, 시스템 모델 등의 개념 재사용(concept reuse)도 포함된다. 2000년대 이후 오픈소스의 확산과 함께 재사용 기반 소프트웨어 엔지니어링이 비즈니스 시스템 개발의 핵심 전략으로 자리잡았다.

## 예시

소프트웨어 재사용의 수준별 예시: (1) 추상화 수준 - MVC 패턴 재사용, (2) 객체 수준 - Apache Commons 라이브러리 사용, (3) 컴포넌트 수준 - Spring Security 모듈 통합, (4) 시스템 수준 - SAP ERP 시스템 구성.

## 관련 개념

- [Integration and Configuration](/knowledge/software-engineering/integration-and-configuration/)
- [Design Patterns](/knowledge/software-engineering/design-patterns/)
- [Open-source Development](/knowledge/software-engineering/open-source-development/)
- [Application Framework](/knowledge/software-engineering/application-framework/)
- [Software Product Line](/knowledge/software-engineering/software-product-line/)
- [Component-Based Software Engineering](/knowledge/software-engineering/component-based-software-engineering/)
- [Service-Oriented Architecture](/knowledge/software-engineering/service-oriented-architecture/)
- [Concept Reuse](/knowledge/software-engineering/concept-reuse/)
