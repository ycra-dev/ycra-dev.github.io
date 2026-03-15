---
title: "공개 API를 통한 테스트 (Test via Public APIs)"
description: "시스템의 구현 세부사항이 아닌 공개 API를 통해 테스트를 작성하는 원칙으로, 취약한 테스트를 방지하고 자유로운 리팩토링을 가능하게 한다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-via-public-apis
sidebar:
  order: 57
---

## 핵심 개념

취약한 테스트를 방지하는 가장 중요한 방법은 시스템의 사용자가 호출하는 것과 동일한 방식으로 테스트를 작성하는 것이다. 즉, 구현 세부사항이 아닌 공개 API에 대해 테스트를 호출한다. 공개 API를 통해 테스트하면 내부 리팩토링이 자유로워지고, 테스트가 사용자를 위한 예시와 문서 역할을 할 수 있다.

## 동작 원리

**"공개 API"의 정의**:
- 프로그래밍 언어의 가시성(visibility) 수준과 반드시 일치하지 않는다
- 팀 외부의 제3자에게 노출되는 API를 의미한다
- "단위(unit)"는 개별 함수만큼 작을 수도 있고, 관련 패키지 집합만큼 클 수도 있다

**핵심 이점**:
- 공개 API를 통한 테스트가 실패하면, 실제 사용자도 영향을 받을 가능성이 높다
- 내부 리팩토링이 자유로워진다 (테스트가 구현이 아닌 계약을 검증하므로)

**규칙**:
- 헬퍼 클래스(다른 1~2개 클래스만 지원)는 별도 단위가 아니므로 직접 테스트하지 않는다
- 누구나 접근 가능한 패키지/클래스는 단위로 간주하여 직접 테스트한다

## 예시

나쁜 예 - 구현 세부사항 테스트:
```java
@Test void testProcessTransaction_internal() {
    processor.setIsValid(true);  // 내부 상태 직접 조작
    processor.setResult("success");  // 내부 상태 직접 조작
    assertEquals("success", processor.getResult());
}
```

좋은 예 - 공개 API를 통한 테스트:
```java
@Test void testProcessTransaction() {
    processor.processTransaction(newTransaction());
    assertTrue(processor.isTransactionComplete());
}
```

## 관련 개념

- [테스트 유지보수성 (Test Maintainability)](/knowledge/software-engineering/testing/test-maintainability/)
- [상태 테스팅 vs 상호작용 테스팅 (State Testing vs Interaction Testing)](/knowledge/software-engineering/testing/state-testing-vs-interaction-testing/)
- [테스트 더블 (Test Doubles)](/knowledge/software-engineering/testing/test-doubles/)
