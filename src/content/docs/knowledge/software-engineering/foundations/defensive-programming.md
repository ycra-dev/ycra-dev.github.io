---
title: "방어적 프로그래밍 (Defensive Programming)"
description: "예상치 못한 입력, 상태, 또는 오류 상황에서도 프로그램이 안전하게 동작하도록 사전에 보호 코드를 작성하는 프로그래밍 방식"
tags: ["Software Engineering", "Reliability", "Robustness"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/defensive-programming
sidebar:
  order: 12
---

## 핵심 개념

방어적 프로그래밍(Defensive Programming)은 예상치 못한 입력, 상태, 또는 오류 상황에서도 프로그램이 안전하게 동작하도록 사전에 보호 코드를 작성하는 프로그래밍 방식이다. "예상치 못한 것을 예상하라(Expect the Unexpected)"가 핵심이다.

안전한 코드(safe code)와 회복력 있는 코드(resilient code)를 모두 포함한다:
- **안전한 코드**: 불변 변수, 접근 제어자로 범위 제한, 정적 타입 체커, 입력 검증
- **회복력 있는 코드**: 예외 처리 모범 사례, 우아한 실패 처리 (graceful degradation)

## 동작 원리

방어적 프로그래밍 기법:
- **어설션(Assertions)**: 개발 시 불변 조건을 검증. 위반 시 즉시 실패하여 버그를 조기에 발견
- **입력 검증**: 외부에서 들어오는 모든 데이터의 유효성 확인
- **가드 절(Guard Clauses)**: 함수 시작 부분에서 전제 조건 검증
- **불변 조건 확인**: 객체 상태가 항상 유효한지 검증

핵심 원칙:
- 컴파일 에러를 런타임 에러보다 선호
- 입출력 항상 검증
- OWASP Top 10 숙지

주의: 방어적 프로그래밍을 과도하게 적용하면 코드가 불필요하게 복잡해진다. 시스템 경계(사용자 입력, 외부 API)에서는 철저히, 내부 코드에서는 어설션으로 적절한 수준을 유지하는 것이 좋다.

## 예시

```python
def transfer_money(from_account, to_account, amount):
    # 가드 절: 전제 조건 검증
    assert from_account is not None, "Source account must exist"
    assert to_account is not None, "Target account must exist"

    if amount <= 0:
        raise ValueError(f"Transfer amount must be positive: {amount}")

    if from_account.balance < amount:
        raise InsufficientFundsError(
            f"Balance {from_account.balance} < {amount}"
        )

    # 불변 조건: 전체 금액은 보존되어야 함
    total_before = from_account.balance + to_account.balance

    from_account.withdraw(amount)
    to_account.deposit(amount)

    assert from_account.balance + to_account.balance == total_before, \
        "Money conservation violated!"
```

```python
# 방어적 프로그래밍 적용 전
def process_payment(amount, user_id):
    charge(user_id, amount)

# 방어적 프로그래밍 적용 후
def process_payment(amount: float, user_id: str) -> Result:
    if amount <= 0:
        raise ValueError(f"Invalid amount: {amount}")
    if not user_id:
        raise ValueError("user_id is required")

    try:
        result = charge(user_id, amount)
        return Result.success(result)
    except PaymentGatewayError as e:
        log.error("Payment failed for user {}: {}", user_id, e)
        return Result.failure(e)
```

## 관련 개념

- [오류 처리 (Error Handling)](/knowledge/software-engineering/foundations/error-handling/)
- [디버깅 (Debugging)](/knowledge/software-engineering/foundations/debugging/)
- [널 객체 패턴 (Null Object Pattern)](/knowledge/software-engineering/design-and-evolution/null-object-pattern/)
- [불변성 (Immutability)](/knowledge/software-engineering/foundations/immutability/)
