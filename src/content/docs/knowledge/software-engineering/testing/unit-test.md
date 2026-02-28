---
title: "Unit Test"
description: "소프트웨어의 가장 작은 테스트 가능한 단위를 독립적으로 검증하는 자동화 테스트로, 테스트 피라미드의 최하단을 구성한다"
tags: ["SoftwareEngineering", "Testing", "QA", "Automation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/unit-test
sidebar:
  order: 303
---

## 핵심 개념

단위 테스트(Unit Test)는 소프트웨어의 가장 작은 테스트 가능한 단위(함수, 메서드, 클래스)를 독립적으로 검증하는 자동화된 테스트다. 테스트 피라미드에서 가장 하단에 위치하며 가장 많은 수를 차지해야 한다.

## 동작 원리

**테스트 피라미드 3계층:**
- **단위 테스트(Unit Test)**: 개별 함수/클래스를 격리하여 테스트. 빠르고 많이 작성
- **통합 테스트(Integration Test)**: 여러 모듈의 상호작용 검증. 중간 수준
- **시스템 테스트(System/E2E Test)**: 전체 시스템 동작 검증. 느리고 적게 작성

**좋은 단위 테스트의 특성 (F.I.R.S.T):**
- **빠름(Fast)**: 밀리초 단위로 실행되어야 한다
- **독립적(Independent)**: 다른 테스트에 의존하지 않고 순서 무관하게 실행 가능
- **반복 가능(Repeatable)**: 같은 입력에 항상 같은 결과
- **자기 검증적(Self-Validating)**: 통과/실패를 자동으로 판단
- **적시 작성(Timely)**: 프로덕션 코드와 함께 작성

**테스트 더블(Test Doubles):**
- **Stub**: 미리 정의된 값을 반환하는 대역
- **Mock**: 호출 여부를 검증하는 대역
- **Dummy**: 파라미터를 채우기 위한 빈 대역
- **Fake**: 실제 구현의 단순화된 버전 (메모리 DB 등)

## 예시

```python
# Arrange-Act-Assert 패턴의 단위 테스트
import pytest

class TestShoppingCart:
    def test_empty_cart_has_zero_total(self):
        # Arrange
        cart = ShoppingCart()

        # Act
        total = cart.total()

        # Assert
        assert total == 0

    def test_add_item_increases_total(self):
        # Arrange
        cart = ShoppingCart()

        # Act
        cart.add_item(Item("Book", price=29.99))

        # Assert
        assert cart.total() == 29.99

    def test_remove_item_decreases_total(self):
        cart = ShoppingCart()
        cart.add_item(Item("Book", price=29.99))
        cart.remove_item("Book")
        assert cart.total() == 0

# Mock을 사용한 테스트
from unittest.mock import Mock

def test_order_sends_email_on_completion():
    # Arrange
    email_service = Mock()
    order = Order(email_service=email_service)

    # Act
    order.complete()

    # Assert
    email_service.send_confirmation.assert_called_once()
```

## 관련 개념

- [Test-Driven Development](/knowledge/software-engineering/testing/test-driven-development/)
- [Test Automation Collaboration](/knowledge/software-engineering/testing/test-automation-collaboration/)
