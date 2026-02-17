---
title: "Layered Architecture"
description: "계층화 아키텍처는 시스템을 여러 개의 계층(layer)으로 구성하여, 각 계층이 하위 계층의 서비스만 사용하도록 하는 아키텍처 패턴이다"
tags: ['Layered Architecture', 'N Tier', 'Separation Of Concerns', 'Presentation Layer', 'Business Logic']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/layered-architecture
sidebar:
  order: 4
---

## 핵심 개념

계층화 아키텍처에서 각 계층은 특정 관심사를 담당하며, 상위 계층은 하위 계층에만 의존한다. 일반적인 4계층 구조는 프레젠테이션(UI) → 비즈니스 로직 → 데이터 접근 → 데이터베이스이다. 장점은 각 계층의 독립적 교체가 가능하고 관심사가 명확히 분리된다는 것이다. 단점은 계층 간 명확한 분리가 어려울 수 있고, 여러 계층을 거치면서 성능 오버헤드가 발생할 수 있다는 것이다.

## 예시

전형적인 웹 애플리케이션의 4계층: Layer 1 (UI) - 웹 브라우저, Layer 2 (Application) - 비즈니스 로직 처리, Layer 3 (Data Access) - ORM/SQL 쿼리, Layer 4 (Database) - MySQL/PostgreSQL.

## 관련 개념

- [Architectural Patterns](/knowledge/software-engineering/architectural-patterns/)
- [Software Architecture](/knowledge/software-engineering/software-architecture/)
- [MVC Pattern](/knowledge/software-engineering/mvc-pattern/)
