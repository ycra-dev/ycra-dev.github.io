---
title: "Test Doubles"
description: "테스트에서 실제 구현체를 대신하는 객체 또는 함수로, 영화의 스턴트 대역처럼 실제 구현체의 역할을 테스트 환경에서 수행한다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-doubles
sidebar:
  order: 63
---

## 핵심 개념

테스트 더블은 실제 구현을 테스트에 사용하기 어려울 때 필요하다. 예를 들어 외부 서버에 요청을 보내거나 데이터베이스에 저장하는 코드는 실제 의존성을 사용하면 테스트가 느리고 불안정해진다. 모킹 프레임워크의 과도한 사용이 큰 문제를 야기했다는 것이 Google의 경험이다.

## 동작 원리

**세 가지 주요 기법**:
1. **Faking**: 실제 구현과 유사하게 동작하는 경량 구현 (예: 인메모리 DB)
2. **Stubbing**: 함수의 반환값을 직접 지정하여 하드코딩된 동작을 제공
3. **Interaction Testing**: 함수가 올바르게 호출되었는지 검증 (실제 실행 없이)

**테스트 더블이 소프트웨어 개발에 미치는 영향**:
- **테스트 가능성(Testability)**: 테스트 더블을 사용하려면 코드가 테스트 가능하게 설계되어야 한다. 나중에 테스트 가능성을 추가하려면 대규모 리팩토링이 필요할 수 있다.
- **적용 가능성(Applicability)**: 적절한 사용은 엔지니어링 속도를 높이지만, 부적절한 사용은 취약하고 복잡하며 효과 없는 테스트를 만든다.
- **충실도(Fidelity)**: 테스트 더블이 실제 구현의 동작을 얼마나 잘 모방하는가. 완벽한 충실도는 불가능할 수 있지만, API 계약에 대한 충실도는 유지해야 한다.

## 예시

```java
// 실제 신용카드 서비스 대신 테스트 더블 사용
class FakeCreditCardService implements CreditCardService {
    @Override
    public boolean makePayment(CreditCard card, Money amount) {
        // 실제 결제 없이 간단한 검증만 수행
        return !card.isExpired();
    }
}
```

## 관련 개념

- [Faking](/knowledge/software-engineering/testing/faking/)
- [Stubbing](/knowledge/software-engineering/testing/stubbing/)
- [Interaction Testing](/knowledge/software-engineering/testing/interaction-testing/)
- [Mocking Frameworks](/knowledge/software-engineering/testing/mocking-frameworks/)
- [Classical vs Mockist Testing](/knowledge/software-engineering/testing/classical-vs-mockist-testing/)
