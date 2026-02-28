---
title: "Domain-Driven Design"
description: "비즈니스 도메인에 맞춰 소프트웨어 컴포넌트를 구성하는 아키텍처 접근법"
tags: ["Software Engineering", "Architecture", "Design Pattern"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/architectural-design/domain-driven-design
sidebar:
  order: 14
---

## 핵심 개념

도메인 주도 설계(Domain-Driven Design, DDD)는 비즈니스 도메인(회계, 청구, 배송 등)에 맞춰 소프트웨어 컴포넌트를 구성하는 아키텍처 접근법이다. Vaughn Vernon의 저서에서 체계화되었다. 도메인 지식을 캡슐화하면 높은 응집도와 낮은 결합도를 달성할 수 있으며, 변경의 "폭발 반경"을 줄인다.

## 동작 원리

기술 계층 기반 구조의 문제:
- 프론트엔드/미들/백엔드 계층으로 코드를 그룹화하면 단일 도메인에는 간단하지만 비즈니스 성장 시 복잡해진다
- 각 비즈니스 로직 변경이 모든 계층을 관통해야 한다
- 팀 간 조정 비용이 증가하고 도메인 간 로직이 혼합된다

DDD의 핵심 개념:
- **Bounded Context**: 각 도메인이 명확한 경계를 가진다
- **Ubiquitous Language**: 도메인 전문가와 개발자가 같은 언어를 사용한다
- **Aggregate**: 관련 객체들의 집합, 하나의 루트를 통해서만 접근

도메인 경계 식별은 과학이자 예술이다 — 완전한 DDD는 가장 복잡한 상황에서만 필요하다.

## 예시

전자상거래 시스템의 도메인 기반 구조:

```
# 도메인 기반 구조 (DDD)
orders/          # 주문(Order) 도메인
  ├── model.py
  ├── service.py
  └── repository.py
inventory/       # 재고(Inventory) 도메인
  ├── model.py
  ├── service.py
  └── repository.py
payments/        # 결제(Payment) 도메인
  ├── model.py
  ├── service.py
  └── repository.py
```

vs 기술 계층 기반 구조:
```
# 기술 계층 기반 구조 (전통적)
frontend/
  ├── order_ui.py
  ├── inventory_ui.py
  └── payment_ui.py
api/
  ├── order_api.py
  ├── inventory_api.py
  └── payment_api.py
database/
  ├── order_db.py
  ├── inventory_db.py
  └── payment_db.py
```

주문 로직 변경 시:
- **DDD**: orders/ 모듈만 수정
- **계층 구조**: frontend + api + database 모두 수정

도메인 간 통신:
```python
# Bad: 도메인 간 직접 의존
class OrderService:
    def create_order(self, items):
        # 재고 도메인에 직접 의존
        inventory_service.reserve(items)
        payment_service.charge(total)

# Good: 이벤트 기반 도메인 분리
class OrderService:
    def create_order(self, items):
        order = Order(items)
        event_bus.publish(OrderCreated(order))
        # Inventory와 Payment는 각자 이벤트를 구독하여 처리
```

## 관련 개념

- [Software Complexity](/knowledge/software-engineering/architectural-design/software-complexity/)
- [Cohesion](/knowledge/software-engineering/architectural-design/cohesion/)
- [Coupling](/knowledge/software-engineering/architectural-design/coupling/)
- [Conway's Law](/knowledge/software-engineering/architectural-design/conways-law/)
- [Schema Migration](/knowledge/software-engineering/quality-and-configuration/schema-migration/)
