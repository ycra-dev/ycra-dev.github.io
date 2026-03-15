---
title: "고전파 vs 모의파 테스팅 (Classical vs Mockist Testing)"
description: "Classical testing은 테스트에서 실제 구현체를 우선 사용하는 스타일이고, Mockist testing은 모킹 프레임워크를 우선 사용하는 스타일이다. Google에서는 classical testing을 선호한다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/classical-vs-mockist-testing
sidebar:
  order: 67
---

## 핵심 개념

Classical testing은 테스트에서 실제 구현체를 우선 사용하는 스타일이고, Mockist testing은 모킹 프레임워크를 우선 사용하는 스타일이다. Google에서는 classical testing을 선호하며, mockist 방식은 Google 규모에서 확장하기 어렵다는 것이 밝혀졌다.

## 동작 원리

**Classical Testing (Google이 선호)**:
- 실제 구현체(real implementation)를 우선적으로 사용한다
- 테스트의 충실도(fidelity)가 높아 프로덕션 동작에 더 가까운 결과를 준다
- 실제 구현이 빠르고, 결정적이며, 의존성이 단순하면 실제 구현을 사용해야 한다
- 실제 구현의 버그가 테스트 실패로 이어지는 것이 바람직하다 (프로덕션에서도 동일하게 실패할 것이므로)

**Mockist Testing**:
- 모킹 프레임워크를 우선적으로 사용한다
- 초창기 모킹 프레임워크 창시자들이 실천한 방식
- Google 규모에서는 확장하기 어렵다는 것이 밝혀졌다

**실제 구현 사용 시 고려사항**:
- **실행 시간**: 실제 구현이 너무 느리면 테스트 더블 사용을 고려한다
- **결정성**: 비결정적인 실제 구현은 불안정한 테스트를 야기한다
- **의존성 구성**: 실제 구현의 의존성 트리가 복잡하면 구성이 어려워진다

값 객체(value objects), 날짜, 금액, 컬렉션 등은 항상 실제 구현을 사용해야 한다.

## 예시

Mockist 접근 (Google에서 비권장):
```java
@Mock Foo mockFoo;  // 모든 의존성을 mock으로 대체

@Test void test() {
    when(mockFoo.bar()).thenReturn(42);
    // 실제 구현과의 괴리가 생길 수 있다
}
```

Classical 접근 (Google에서 권장):
```java
Foo realFoo = new Foo(new RealDependencyA(), new RealDependencyB());

@Test void test() {
    // 실제 구현을 사용하므로 충실도가 높다
    assertEquals(42, realFoo.bar());
}
```

## 관련 개념

- [테스트 더블 (Test Doubles)](/knowledge/software-engineering/testing/test-doubles/)
- [페이킹 (Faking)](/knowledge/software-engineering/testing/faking/)
- [모킹 프레임워크 (Mocking Frameworks)](/knowledge/software-engineering/testing/mocking-frameworks/)
- [상태 테스팅 vs 상호작용 테스팅 (State Testing vs Interaction Testing)](/knowledge/software-engineering/testing/state-testing-vs-interaction-testing/)
