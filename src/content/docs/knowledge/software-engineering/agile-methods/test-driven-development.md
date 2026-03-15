---
title: "테스트 주도 개발 (Test-driven Development)"
description: "테스트 주도 개발(TDD)은 코드를 작성하기 전에 자동화된 테스트를 먼저 작성하고, 테스트를 통과하는 최소한의 코드를 작성한 후, 리팩토링하는 과정을 반복하는 소프트웨어 개발 기법이다"
tags: ['Tdd', 'Test First', 'Red Green Refactor', 'Agile', 'Automated Testing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/test-driven-development
sidebar:
  order: 5
---

## 핵심 개념

TDD의 기본 사이클은 실패하는 테스트 작성(Red), 테스트를 통과시키는 코드 작성(Green), 코드 개선(Refactor)이다. 이 접근법은 코드가 작성되자마자 테스트되므로 결함의 조기 발견이 가능하고, 테스트가 코드의 명세 역할을 한다. 또한 회귀 테스트(regression testing)를 자동화하여 변경으로 인한 새로운 결함 도입을 방지한다. TDD는 XP에서 처음 도입되었으나 현재는 주류 방법론으로 널리 채택되고 있다. 다만 멀티스레드 시스템이나 레거시 시스템에서는 적용이 어려울 수 있다.

## 예시

```java
// 1. 테스트 작성 (Red)
@Test
public void testAdd() {
    Calculator calc = new Calculator();
    assertEquals(5, calc.add(2, 3));
}

// 2. 코드 구현 (Green)
public int add(int a, int b) {
    return a + b;
}

// 3. 리팩토링 (Refactor) - 필요시 코드 개선
```

## 관련 개념

- [익스트림 프로그래밍 (Extreme Programming)](/knowledge/software-engineering/extreme-programming/)
- [회귀 테스팅 (Regression Testing)](/knowledge/software-engineering/regression-testing/)
- [단위 테스팅 (Unit Testing)](/knowledge/software-engineering/unit-testing/)
- [리팩토링 (Refactoring)](/knowledge/software-engineering/refactoring/)
