---
title: "Interaction Testing"
description: "함수의 구현을 실제로 실행하지 않고 함수가 올바르게 호출되었는지(호출 여부, 횟수, 인수)를 검증하는 테스트 기법"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/interaction-testing
sidebar:
  order: 68
---

## 핵심 개념

인터랙션 테스팅은 모킹 프레임워크로 쉽게 수행할 수 있지만, 가능한 한 피해야 한다. 인터랙션 테스팅은 시스템이 제대로 동작하는지가 아니라, 특정 함수가 호출되었는지만 알려준다.

## 동작 원리

**상태 테스팅이 선호되는 이유**:
- 인터랙션 테스팅은 "database.save(item)이 호출되었으므로 아이템이 저장되었을 것이다"라는 가정에 의존한다
- 상태 테스팅은 이 가정을 실제로 검증한다

**Change-Detector Tests**: 인터랙션 테스팅을 과도하게 사용한 테스트에 대한 Google의 별명. 프로덕션 코드의 모든 변경에 실패하며, 시스템 동작의 변경 여부와 무관하게 깨진다.

**인터랙션 테스팅이 적절한 경우**:
1. 상태 테스팅이 불가능할 때 (실제 구현도 Fake도 사용할 수 없는 경우)
2. 함수 호출의 횟수나 순서가 중요할 때 (예: 캐싱이 DB 호출 횟수를 줄이는지 확인)

**모범 사례**:
- **상태 변경 함수(state-changing)에만** 인터랙션 테스팅을 수행한다 (sendEmail, saveRecord 등)
- 비상태 변경 함수(getUser, findResults)에 대한 인터랙션 테스팅은 불필요한 취약성을 추가한다
- **과도한 명세(overspecification)를 피한다**: 각 테스트는 검증 중인 하나의 동작만 확인해야 한다

## 예시

과도한 명세 (나쁜 예):
```java
@Test void shouldGreetUser() {
    userGreeter.greet(user);
    // 불필요하게 많은 상호작용을 검증
    verify(nameService).getName(user);
    verify(emailService).getEmail(user);
    verify(outputSink).write("Hello, " + name);
}
```

적절한 명세 (좋은 예):
```java
@Test void shouldGreetUserByName() {
    userGreeter.greet(user);
    // 테스트하려는 동작만 검증
    verify(outputSink).write(contains("Bob"));
}

@Test void shouldSendGreetingEmail() {
    userGreeter.greet(user);
    verify(emailService).sendEmail(eq(user.email()), any());
}
```

## 관련 개념

- [Test Doubles](/knowledge/software-engineering/testing/test-doubles/)
- [State Testing vs Interaction Testing](/knowledge/software-engineering/testing/state-testing-vs-interaction-testing/)
- [Mocking Frameworks](/knowledge/software-engineering/testing/mocking-frameworks/)
- [Stubbing](/knowledge/software-engineering/testing/stubbing/)
