---
title: "단위 테스팅 (Unit Testing)"
description: "단위 테스트는 소프트웨어의 가장 작은 테스트 가능 단위(함수, 메서드, 클래스)를 독립적으로 테스트하여 각 단위가 올바르게 동작하는지 확인하는 테스트 기법이다"
tags: ['Unit Testing', 'Automated Testing', 'Junit', 'Pytest', 'Mock Objects', 'Development Testing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/unit-testing
sidebar:
  order: 2
---

## 핵심 개념

단위 테스트는 자동화된 테스트 프레임워크(JUnit, pytest 등)를 사용하여 수행되며, 테스트 설정(setup), 테스트 실행(call), 결과 검증(assertion)의 3단계로 구성된다. Mock 객체는 테스트 대상 객체가 의존하는 외부 객체를 시뮬레이션하는 데 사용된다. 단위 테스트는 개발 단계에서 수행되는 개발 테스트(development testing)의 일부이며, TDD에서는 코드 작성 전에 단위 테스트를 먼저 작성한다.

## 예시

```python
# Python pytest 예시
def test_calculate_discount():
    # Setup
    order = Order(total=100)
    # Call
    discount = order.calculate_discount(percentage=10)
    # Assert
    assert discount == 10.0
    assert order.total_after_discount == 90.0
```

## 관련 개념

- [테스트 주도 개발 (Test-driven Development)](/knowledge/software-engineering/test-driven-development/)
- [동치 분할 (Equivalence Partitioning)](/knowledge/software-engineering/equivalence-partitioning/)
- [회귀 테스팅 (Regression Testing)](/knowledge/software-engineering/regression-testing/)
- [컴포넌트 테스팅 (Component Testing)](/knowledge/software-engineering/component-testing/)
