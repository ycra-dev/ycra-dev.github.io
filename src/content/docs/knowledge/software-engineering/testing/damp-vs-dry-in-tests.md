---
title: "테스트에서의 DAMP vs DRY (DAMP vs DRY in Tests)"
description: "DAMP(Descriptive And Meaningful Phrases)는 테스트 코드에서 DRY 원칙 대신 약간의 중복을 허용하여 각 테스트를 더 이해하기 쉽게 만드는 원칙"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/damp-vs-dry-in-tests
sidebar:
  order: 61
---

## 핵심 개념

DAMP(Descriptive And Meaningful Phrases)는 테스트 코드에서 DRY(Don't Repeat Yourself) 원칙 대신 약간의 중복을 허용하여 각 테스트를 더 이해하기 쉽게 만드는 원칙이다. DAMP는 DRY를 대체하는 것이 아니라 보완한다. 핵심은 반복 줄이기가 아니라 테스트를 더 서술적이고 의미 있게 만드는 방향으로 리팩토링하는 것이다.

## 동작 원리

프로덕션 코드에서 DRY는 유지보수를 위해 매우 중요하지만, 테스트 코드에서는 다른 비용-편익 분석이 적용된다:

**DRY의 한계 (테스트에서)**:
- 테스트는 안정적이도록 설계되므로, DRY의 "변경 용이성" 이점이 덜 중요하다
- 테스트를 검증할 별도의 테스트가 없으므로, 테스트는 자체적으로 명백히 올바라야 한다
- 과도한 추상화는 테스트의 의도를 숨긴다

**DAMP의 장점**:
- 각 테스트가 독립적으로 이해 가능하다
- 헬퍼 메서드로 스크롤할 필요가 없다
- 테스트의 의도가 즉각적으로 명확하다

**공유 코드 패턴**:
1. **공유 값(Shared Values)**: 모호한 이름(`ACCOUNT_1`) 대신 의미 있는 이름(`CLOSED_ACCOUNT`)을 사용하거나, 헬퍼 메서드로 필요한 값만 지정한다
2. **공유 설정(Shared Setup)**: `setUp()` 메서드는 테스트 대상 객체 구성에만 사용하고, 특정 값에 의존하는 테스트는 직접 값을 설정한다
3. **공유 헬퍼(Shared Helpers)**: "단일 개념적 사실"을 검증하는 헬퍼만 사용한다

## 예시

DRY (과도한 추상화):
```java
@Test void shouldAllowWithdrawal() {
    account = createAccount(STANDARD);
    doWithdrawal(AMOUNT);
    verifyBalance(EXPECTED);
}
// 독자는 STANDARD, AMOUNT, EXPECTED의 값을 찾아야 함
```

DAMP (서술적):
```java
@Test void shouldAllowWithdrawal() {
    Account account = newAccountWithBalance(100);
    account.withdraw(50);
    assertThat(account.getBalance()).isEqualTo(50);
}
// 모든 정보가 테스트 내에 있어 바로 이해 가능
```

## 관련 개념

- [테스트 명확성 (Test Clarity)](/knowledge/software-engineering/testing/test-clarity/)
- [테스트 유지보수성 (Test Maintainability)](/knowledge/software-engineering/testing/test-maintainability/)
- [행위 주도 테스팅 (Behavior Driven Testing)](/knowledge/software-engineering/testing/behavior-driven-testing/)
