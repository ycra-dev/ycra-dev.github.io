---
title: "Unchanging Tests"
description: "한번 작성된 후 시스템의 요구사항이 변경되지 않는 한 수정할 필요가 없는 이상적인 테스트의 특성"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/unchanging-tests
sidebar:
  order: 62
---

## 핵심 개념

이상적인 테스트는 변경되지 않는 테스트이다. 기존 테스트를 업데이트하는 데 소요되는 시간은 더 가치 있는 작업에 쓸 수 없는 시간이다. 이 이해가 시스템을 대규모로 작업할 수 있게 만든다: 시스템 확장 시 변경과 관련된 소수의 새 테스트만 작성하면 된다.

## 동작 원리

네 가지 코드 변경 유형과 테스트의 기대 반응:

1. **순수 리팩토링(Pure Refactoring)**: 시스템의 인터페이스를 변경하지 않고 내부를 수정할 때, 테스트가 변경되면 안 된다. 테스트가 변경된다면 적절한 추상화 수준에서 작성되지 않았다는 신호이다.

2. **새 기능(New Features)**: 기존 동작은 영향받지 않아야 한다. 새 동작을 커버하는 새 테스트만 추가하고, 기존 테스트 변경은 불필요해야 한다.

3. **버그 수정(Bug Fixes)**: 초기 테스트 스위트에서 누락된 케이스가 있었음을 의미한다. 누락된 테스트만 추가한다.

4. **동작 변경(Behavior Changes)**: 기존 테스트 수정이 필요한 **유일한** 정당한 경우이다. 시스템의 명시적 계약을 깨뜨리는 것이므로 비용이 가장 크다.

## 예시

리팩토링 시 테스트가 깨지는 상황 (문제):
```java
// 내부 구현을 테스트했기 때문에 리팩토링 시 깨진다
@Test void testInternalCache() {
    processor.processItem(item);
    assertEquals(1, processor.cacheSize());  // 내부 캐시 크기 검증
}
// 캐시 전략을 변경하면 동작은 동일하더라도 테스트가 실패한다
```

## 관련 개념

- [Test Maintainability](/knowledge/software-engineering/testing/test-maintainability/)
- [Test via Public APIs](/knowledge/software-engineering/testing/test-via-public-apis/)
- [Behavior Driven Testing](/knowledge/software-engineering/testing/behavior-driven-testing/)
