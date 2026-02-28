---
title: "Mocking Frameworks"
description: "테스트 내에서 테스트 더블을 쉽게 생성할 수 있게 해주는 소프트웨어 라이브러리로, mock 객체의 동작을 테스트 코드 내에서 인라인으로 정의할 수 있게 한다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/mocking-frameworks
sidebar:
  order: 66
---

## 핵심 개념

모킹 프레임워크는 테스트 더블 생성의 보일러플레이트를 줄여주지만, 과도한 사용 시 심각한 문제를 야기한다. Google의 경험: 수년과 수많은 테스트 후, 비용이 드러났다. 테스트 유지보수에 끊임없는 노력이 필요했고 버그는 거의 발견하지 못했다. Google의 추는 이제 반대 방향으로 움직이고 있다: 많은 엔지니어가 모킹 프레임워크를 피하고 더 현실적인 테스트를 작성한다.

## 동작 원리

**주요 모킹 프레임워크**:
- Java: Mockito
- C++: googlemock (Googletest의 일부)
- Python: unittest.mock

**@DoNotMock 어노테이션**:
- Google의 ErrorProne 정적 분석 도구의 일부
- API 소유자가 "이 타입은 모킹하지 마세요"라고 선언할 수 있다
- 모킹하면 API 소유자가 구현을 변경할 능력이 심각하게 제약된다
- 수천, 수만 건의 모킹이 존재하면 API 계약을 위반하는 동작이 넘쳐난다

**핵심 교훈**: 모킹 프레임워크의 용이성이 과도한 사용을 유발한다. Google에서는 Mockito만을 Java의 표준 모킹 프레임워크로 지정하여 통일성을 유지한다.

## 예시

```java
// Mockito를 사용한 테스트 더블 생성
@Test void testPayment() {
    // mock 생성
    CreditCardService mockService = mock(CreditCardService.class);
    // 동작 정의 (stubbing)
    when(mockService.charge(card, amount)).thenReturn(Receipt.success());
    // 시스템 언더 테스트에 주입
    PaymentProcessor processor = new PaymentProcessor(mockService);
    processor.processPayment(card, amount);
    // 호출 검증 (interaction testing)
    verify(mockService).charge(card, amount);
}
```

## 관련 개념

- [Test Doubles](/knowledge/software-engineering/testing/test-doubles/)
- [Stubbing](/knowledge/software-engineering/testing/stubbing/)
- [Interaction Testing](/knowledge/software-engineering/testing/interaction-testing/)
- [Classical vs Mockist Testing](/knowledge/software-engineering/testing/classical-vs-mockist-testing/)
