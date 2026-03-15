---
title: "레거시 코드 변경 알고리즘 (Legacy Code Change Algorithm)"
description: "Michael Feathers가 제안한 기존 코드를 안전하게 수정하는 5단계 알고리즘"
tags: ["Software Engineering", "Refactoring", "Legacy Code", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/legacy-code-change-algorithm
sidebar:
  order: 18
---

## 핵심 개념

레거시 코드 변경 알고리즘(Legacy Code Change Algorithm)은 Michael Feathers가 제안한 기존 코드를 안전하게 수정하는 5단계 프로세스이다. 밭에 씨 뿌리기 전에 울타리 치는 것과 같다: 먼저 기존 동작을 보호하는 테스트를 작성하고, 그 후에 안전하게 변경한다.

## 동작 원리

5단계 알고리즘:
1. **변경 지점 식별**: 수정이 필요한 코드를 정확히 파악
2. **테스트 지점 찾기**: 기존 동작을 검증할 수 있는 테스트 위치 확인
3. **의존성 깨기**: 동작 변경 없이 테스트 가능하게 구조를 변경
4. **테스트 작성**: 기존 동작을 캡처하는 특성 테스트(characterization test) 작성
5. **변경 및 리팩토링**: 테스트 보호 아래서 안전하게 변경

핵심 원칙: **변경하기 전에 테스트, 테스트하기 전에 의존성 분리**

의존성 깨기가 가장 위험한 단계이다. 접근 제어자를 public으로 변경하는 것은 나쁜 방법이다 — 캡슐화를 파괴하기 때문이다.

## 예시

```java
// Before: 테스트 불가능한 거대 메서드
public void processOrder(Order order) {
    // DB 조회 + 비즈니스 로직 + 외부 API 호출이 뒤섞임
}

// After: 의존성을 분리하여 테스트 가능
public void processOrder(Order order, PaymentGateway gateway) {
    OrderValidation validation = validateOrder(order);  // 순수 로직
    if (validation.isValid()) {
        gateway.charge(order);  // 인터페이스로 추상화
    }
}
```

Python 예시:
```python
# 1단계: 기존 동작을 캡처하는 특성 테스트 작성
def test_existing_behavior():
    result = mysterious_function(42, "test")
    assert result == "expected_output"  # 현재 동작을 기록

# 2단계: 리팩토링 (테스트가 보호하는 범위 내에서)
# 3단계: 새 기능 추가
# 4단계: 테스트 확인
```

## 관련 개념

- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [코드 스멜 (Code Smell)](/knowledge/software-engineering/design-and-evolution/code-smell/)
- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [테스트 주도 개발 (Test-Driven Development)](/knowledge/software-engineering/agile-methods/test-driven-development/)
