---
title: "Test Coverage"
description: "코드베이스에서 테스트에 의해 실행되는 코드의 비율을 나타내는 지표로, 테스트 스위트의 완전성을 평가하는 데 사용된다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-coverage
sidebar:
  order: 55
---

## 핵심 개념

Test Coverage(테스트 커버리지)는 코드베이스에서 테스트에 의해 실행되는 코드의 비율을 나타내는 지표다. 유용한 지표이지만 한계가 있다. 높은 커버리지가 좋은 테스트를 의미하지 않으며, 중요한 것은 라인 커버리지가 아닌 **동작 커버리지(behavioral coverage)**이다.

## 동작 원리

**장점**:
- 테스트되지 않은 코드 영역을 식별할 수 있다
- 팀의 테스트 관행을 추적하는 데 유용하다
- 코드 리뷰에서 테스트 누락을 발견하는 데 도움이 된다

**한계**:
- 높은 커버리지가 좋은 테스트를 의미하지 않는다 (코드 라인이 실행되었다고 해서 올바르게 검증된 것은 아니다)
- 100% 커버리지를 목표로 하면 비용 대비 효과가 떨어지는 테스트가 증가한다
- 커버리지 수치에 집중하면 실제 중요한 동작(behavior)의 테스트를 놓칠 수 있다

**Google의 접근**:
- 커버리지를 유일한 목표로 삼지 않는다
- 대신 **"Beyonce Rule"** 을 따른다: 특정 동작이 보장되기를 원한다면 테스트를 작성해야 한다
- 테스트가 실제로 의미 있는 검증(assertion)을 수행하는지가 중요하다

## 예시

커버리지가 높지만 가치가 낮은 테스트:
```java
// 100% 라인 커버리지를 달성하지만, 실제로 아무것도 검증하지 않는다
@Test void testSort() {
    List<Integer> list = Arrays.asList(3, 1, 2);
    sortAlgorithm.sort(list);
    // assertion이 없다!
}
```

## 관련 개념

- [Test Maintainability](/knowledge/software-engineering/testing/test-maintainability/)
- [Behavior Driven Testing](/knowledge/software-engineering/testing/behavior-driven-testing/)
- [Testing Culture](/knowledge/software-engineering/testing/testing-culture/)
