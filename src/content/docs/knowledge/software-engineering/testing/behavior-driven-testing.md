---
title: "행위 주도 테스팅 (Behavior Driven Testing)"
description: "메서드가 아닌 동작(behavior)을 기준으로 테스트를 작성하는 접근 방식으로, Given-When-Then 구조를 따라 테스트의 의도를 명확하게 표현한다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/behavior-driven-testing
sidebar:
  order: 59
---

## 핵심 개념

많은 엔지니어의 첫 번째 본능은 테스트 구조를 코드 구조에 맞추는 것이다 (각 프로덕션 메서드에 대응하는 테스트 메서드). 하지만 이는 시간이 지남에 따라 문제를 일으킨다. 더 나은 방법은 **각 동작(behavior)에 대해 테스트를 작성하는 것**이다.

## 동작 원리

**동작(Behavior)의 정의**: 시스템이 특정 상태에서 일련의 입력에 대해 어떻게 응답할지에 대한 보장(guarantee). "Given-When-Then"으로 표현 가능하다.

**Given-When-Then 구조**:
- **Given (준비)**: 시스템의 초기 상태를 설정 (= Arrange)
- **When (실행)**: 시스템에 대한 행동을 수행 (= Act)
- **Then (검증)**: 결과를 확인 (= Assert)

**테스트 이름 짓기**:
- 테스트 이름은 테스트 중인 동작을 요약해야 한다
- 행동과 기대 결과를 모두 포함해야 한다
- "should"로 시작하면 자연어처럼 읽힌다
- 예: `shouldNotAllowWithdrawalsWhenBalanceIsEmpty`
- 이름에 "and"가 필요하면, 여러 동작을 테스트하고 있다는 신호

메서드와 동작의 관계는 다대다(many-to-many)이다: 대부분의 메서드는 여러 동작을 구현하고, 일부 동작은 여러 메서드의 상호작용에 의존한다.

## 예시

메서드 기반 테스트 (나쁜 예):
```java
@Test void testDisplayTransaction() {
    // 성공과 실패 케이스를 하나의 테스트에서 모두 검증
    assert(displayTransaction(t1).contains("Success"));
    assert(displayTransaction(t2).contains("Failure"));
}
```

동작 기반 테스트 (좋은 예):
```java
@Test void shouldDisplaySuccessWhenTransactionApproved() {
    // Given
    Transaction approved = newApprovedTransaction();
    // When
    String display = displayTransaction(approved);
    // Then
    assertThat(display).contains("Success");
}

@Test void shouldDisplayFailureWhenTransactionDeclined() {
    // Given
    Transaction declined = newDeclinedTransaction();
    // When
    String display = displayTransaction(declined);
    // Then
    assertThat(display).contains("Failure");
}
```

## 관련 개념

- [테스트 유지보수성 (Test Maintainability)](/knowledge/software-engineering/testing/test-maintainability/)
- [테스트 명확성 (Test Clarity)](/knowledge/software-engineering/testing/test-clarity/)
- [테스트에서의 DAMP vs DRY (DAMP vs DRY in Tests)](/knowledge/software-engineering/testing/damp-vs-dry-in-tests/)
