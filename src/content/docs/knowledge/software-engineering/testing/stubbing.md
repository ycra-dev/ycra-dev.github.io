---
title: "스터빙 (Stubbing)"
description: "자체적으로 동작이 없는 함수에 특정 반환값을 직접 지정하여 하드코딩된 동작을 부여하는 테스트 더블 기법"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/stubbing
sidebar:
  order: 65
---

## 핵심 개념

Stubbing은 모킹 프레임워크를 통해 간편하게 적용할 수 있지만, 과도한 사용은 심각한 문제를 야기한다. 각 스텁은 테스트의 assertion과 직접적인 관계가 있어야 하며, 많은 스텁이 필요하다면 과도한 사용의 신호이다.

## 동작 원리

**Stubbing의 과도한 사용이 야기하는 문제**:

1. **테스트가 불분명해진다**: 스텁 정의 코드가 테스트의 의도를 가린다. 시스템 구현을 머릿속으로 추적해야 스텁이 왜 필요한지 이해할 수 있다.

2. **테스트가 취약해진다**: 구현 세부사항이 테스트에 노출된다. 프로덕션 코드의 구현이 바뀌면 스텁도 함께 업데이트해야 한다.

3. **테스트의 효과가 떨어진다**: 스텁된 함수가 실제 구현처럼 동작한다는 보장이 없다. `when(calc.add(1,2)).thenReturn(3)`은 계약을 복제한 것이지 검증한 것이 아니다. 또한 상태를 저장할 수 없으므로 save/get 패턴 테스트가 불가능하다.

**Stubbing이 적절한 경우**:
- 시스템을 특정 상태로 만들기 위해 함수의 반환값이 필요할 때
- 실제 구현이나 Fake로는 만들기 어려운 에러 조건을 시뮬레이션할 때
- 소수의 함수만 스텁해야 할 때

## 예시

과도한 스텁 사용 (나쁜 예):
```java
@Test void creditCardTest() {
    // 너무 많은 구현 세부사항을 스텁으로 지정
    when(mockProcessor.connect()).thenReturn(connection);
    when(mockProcessor.validate(card)).thenReturn(true);
    when(mockProcessor.process(card, amount)).thenReturn(receipt);
    when(mockProcessor.disconnect()).thenReturn(true);

    paymentService.makePayment(card, amount);
    verify(mockProcessor).process(card, amount);
}
```

적절한 스텁 사용 (좋은 예):
```java
@Test void shouldDeclineExpiredCard() {
    // 특정 상태를 만들기 위한 최소한의 스텁
    when(creditCardServer.isExpired(card)).thenReturn(true);

    boolean result = paymentService.makePayment(card, amount);
    assertFalse(result);
}
```

## 관련 개념

- [테스트 더블 (Test Doubles)](/knowledge/software-engineering/testing/test-doubles/)
- [페이킹 (Faking)](/knowledge/software-engineering/testing/faking/)
- [모킹 프레임워크 (Mocking Frameworks)](/knowledge/software-engineering/testing/mocking-frameworks/)
- [상호작용 테스팅 (Interaction Testing)](/knowledge/software-engineering/testing/interaction-testing/)
