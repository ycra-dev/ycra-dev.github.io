---
title: "Arrange-Act-Assert"
description: "단위 테스트를 세 단계로 구조화하는 패턴"
tags: ["Software Engineering", "Testing", "Pattern"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/arrange-act-assert
sidebar:
  order: 12
---

## 핵심 개념

AAA(Arrange-Act-Assert)는 단위 테스트를 세 단계로 구조화하는 패턴이다. 테스트의 사전 조건 설정, 실행, 결과 검증을 명확히 분리하여 가독성과 유지보수성을 높이는 표준적인 구조이다.

## 동작 원리

세 단계:
- **Arrange (준비)**: 테스트에 필요한 객체 생성, 상태 설정, 의존성 주입
- **Act (실행)**: 테스트 대상 메서드나 동작을 하나만 실행
- **Assert (검증)**: 예상 결과와 실제 결과를 비교

핵심 원칙:
- 각 테스트는 하나의 동작만 검증해야 한다
- Assert 단계에서는 가능하면 하나의 어설션만 사용한다
- 테스트 이름은 검증하는 동작을 명확히 설명해야 한다

BDD(Behavior-Driven Development)의 Given-When-Then도 본질적으로 같은 구조이다.

## 예시

```python
def test_user_registration_sends_welcome_email():
    # Arrange: 필요한 객체와 상태 설정
    email_service = MockEmailService()
    user_service = UserService(email_service=email_service)
    user_data = {"name": "Alice", "email": "alice@example.com"}

    # Act: 테스트 대상 동작 실행
    user_service.register(user_data)

    # Assert: 결과 검증
    assert email_service.was_called_with(
        to="alice@example.com",
        subject="Welcome!"
    )
```

실제 쇼핑 카트 테스트:
```python
class TestShoppingCart:
    def test_add_item_increases_total(self):
        # Arrange
        cart = ShoppingCart()

        # Act
        cart.add_item(Item("Book", price=29.99))

        # Assert
        assert cart.total() == 29.99
```

## 관련 개념

- [Unit Testing](/knowledge/software-engineering/testing/unit-testing/)
- [Test-Driven Development](/knowledge/software-engineering/testing/test-driven-development/)
- [Mocking](/knowledge/software-engineering/testing/mocking/)
