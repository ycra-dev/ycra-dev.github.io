---
title: "Coupling"
description: "소프트웨어 모듈 간의 상호 의존성 정도를 나타내는 척도"
tags: ["Software Engineering", "Architecture", "Design Principle"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/architectural-design/coupling
sidebar:
  order: 11
---

## 핵심 개념

결합도(Coupling)는 소프트웨어 모듈 간의 상호 의존성 정도를 나타내는 척도이다. **낮은 결합도(Loose Coupling)가 좋은 설계를 나타낸다.** 결합도가 높으면 하나의 모듈을 변경할 때 다른 모듈도 함께 변경해야 하므로 유지보수 비용이 급증한다.

## 동작 원리

결합의 유형 (약한 것부터 강한 순서):
- **데이터 결합**: 단순 데이터만 전달 (가장 약한 결합)
- **스탬프 결합**: 구조체/객체를 전달하지만 일부만 사용
- **제어 결합**: 제어 플래그를 전달하여 내부 동작에 영향
- **공통 결합**: 전역 데이터를 공유
- **내용 결합**: 다른 모듈의 내부에 직접 접근 (가장 강한 결합)

결합도를 낮추는 방법:
- 인터페이스를 통한 추상화
- 의존성 주입(Dependency Injection)
- 이벤트 기반 아키텍처
- 중간 계층(매개자) 도입

특히 주의해야 할 것: **순환 의존성(Circular Dependency)**은 A→B→C→A와 같은 구조로 시스템을 이해하고 변경하기 극히 어렵게 만든다.

## 예시

```python
# 높은 결합도: 구체 구현에 직접 의존
class OrderService:
    def __init__(self):
        self.db = MySQLDatabase("localhost", 3306)  # 구체 구현에 묶임
        self.email = SmtpEmailService("smtp.gmail.com")

# 낮은 결합도: 추상에 의존 + 의존성 주입
class OrderService:
    def __init__(self, database: Database, email: EmailService):
        self.db = database
        self.email = email

# 프로덕션
order_service = OrderService(
    database=MySQLDatabase("localhost", 3306),
    email=SmtpEmailService("smtp.gmail.com")
)

# 테스트
test_service = OrderService(
    database=InMemoryDatabase(),
    email=MockEmailService()
)
```

이벤트 기반으로 결합도 낮추기:
```python
# 직접 호출 (높은 결합도)
def create_order(order):
    order_repo.save(order)
    email_service.send_confirmation(order)  # 직접 의존
    inventory.reserve(order.items)          # 직접 의존

# 이벤트 기반 (낮은 결합도)
def create_order(order):
    order_repo.save(order)
    event_bus.publish(OrderCreated(order))  # 이메일, 재고는 각자 구독
```

## 관련 개념

- [Cohesion](/knowledge/software-engineering/architectural-design/cohesion/)
- [Software Complexity](/knowledge/software-engineering/architectural-design/software-complexity/)
- [Dependency Injection](/knowledge/software-engineering/design-and-evolution/dependency-injection/)
- [Circular Dependency](/knowledge/software-engineering/quality-and-configuration/circular-dependency/)
