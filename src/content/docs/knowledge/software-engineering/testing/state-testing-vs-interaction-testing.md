---
title: "State Testing vs Interaction Testing"
description: "상태 테스팅은 시스템 호출 후 상태를 직접 관찰하여 검증하고, 인터랙션 테스팅은 의존성에 대해 수행한 호출을 검증하는 두 가지 테스트 검증 방식"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/state-testing-vs-interaction-testing
sidebar:
  order: 58
---

## 핵심 개념

테스트 결과를 검증하는 두 가지 방식이다. 상태 테스팅은 "결과가 무엇인가?"에 초점을 맞추고, 인터랙션 테스팅은 "어떻게 도달했는가?"에 초점을 맞춘다. Google에서는 상태 테스팅을 선호한다.

## 동작 원리

**상태 테스팅(State Testing)**:
- 시스템을 호출한 후 시스템의 상태를 직접 관찰한다
- "결과가 무엇인가?"에 초점을 맞춘다
- 더 안정적이고 유지보수하기 쉽다
- Google에서 선호하는 방식이다

**인터랙션 테스팅(Interaction Testing)**:
- 시스템이 의존성에 대해 특정 호출을 했는지 검증한다
- "어떻게 도달했는가?"에 초점을 맞춘다
- 구현 세부사항에 의존하므로 더 취약하다
- 모킹 프레임워크의 과도한 사용으로 이어지기 쉽다

인터랙션 테스트의 문제점:
1. 시스템이 특정 DB API를 호출했는지만 검증하면, 데이터가 실제로 저장되었는지는 알 수 없다
2. 시스템이 약간 다른 API를 호출하도록 리팩토링하면, 동등한 결과를 내더라도 테스트가 실패한다

## 예시

인터랙션 테스트 (취약):
```java
@Test void shouldWriteToDatabase() {
    accounts.createUser("foobar");
    // 내부 구현에 의존: 특정 메서드가 호출되었는지 확인
    verify(database).put("foobar");
}
```

상태 테스트 (견고):
```java
@Test void shouldCreateUser() {
    accounts.createUser("foobar");
    // 최종 상태를 확인: 사용자가 실제로 존재하는지 확인
    assertEquals("foobar", accounts.getUser("foobar").name());
}
```

## 관련 개념

- [Test via Public APIs](/knowledge/software-engineering/testing/test-via-public-apis/)
- [Interaction Testing](/knowledge/software-engineering/testing/interaction-testing/)
- [Test Doubles](/knowledge/software-engineering/testing/test-doubles/)
- [Mocking Frameworks](/knowledge/software-engineering/testing/mocking-frameworks/)
