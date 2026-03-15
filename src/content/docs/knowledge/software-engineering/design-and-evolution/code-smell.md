---
title: "코드 스멜 (Code Smell)"
description: "코드에 더 깊은 문제가 있을 수 있음을 암시하는 표면적 징후"
tags: ["Software Engineering", "Code Quality", "Anti-Pattern"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/code-smell
sidebar:
  order: 15
---

## 핵심 개념

코드 냄새(Code Smell)는 코드에 더 깊은 문제가 있을 수 있음을 암시하는 표면적 징후이다. 그 자체가 버그는 아니지만, 설계 결함이나 유지보수 문제를 경고한다. Martin Fowler가 체계화한 코드 냄새 개념은 리팩토링의 출발점이 된다.

## 동작 원리

대표적인 코드 냄새:
- **과도한 복잡성(Bloaters)**: 지나치게 큰 클래스나 메서드
- **응집도 부족(Lack of Cohesion)**: 관련 없는 기능이 한 모듈에 모여 있음
- **불필요한 결합(Unnecessary Coupling)**: 모듈 간 의존성이 과도함
- **중복 코드(Duplication)**: 같은 로직이 여러 곳에 존재
- **난해한 코드(Incomprehensibility)**: 이해하기 어려운 복잡한 로직
- **장황한 코드(Verbosity)**: 간결하게 표현할 수 있는 것을 길게 작성
- **엉뚱한 로직(Flappy Logic)**: 조건문이 지나치게 복잡하거나 중첩됨

코드 냄새 감지 능력은 경험에서 나온다. 정적 분석 도구도 도움이 되지만, 개발자의 직관이 가장 중요하다.

대표적 코드 스멜 목록:
- 중괄호 없는 if문 (의도치 않은 실행 가능)
- 과도하게 긴 메서드
- 중복 코드
- 과도한 분기/루프
- 매개변수 과다

## 예시

```python
# 코드 냄새: Long Method + Feature Envy
class OrderProcessor:
    def process(self, order):
        # 가격 계산 (Order의 책임이어야 함)
        total = 0
        for item in order.items:
            price = item.price * item.quantity
            if item.category == "electronics":
                price *= 0.9
            elif item.category == "books":
                price *= 0.95
            total += price

        # 배송비 계산 (Shipping의 책임이어야 함)
        if total > 100:
            shipping = 0
        elif order.address.country == "US":
            shipping = 5
        else:
            shipping = 15

        # 세금 계산, 결제, 알림... 전부 여기에
        # → 너무 많은 책임을 가진 메서드 (코드 냄새!)
```

Apple의 유명한 "goto fail" 보안 버그도 중괄호 없는 if문 패턴에서 발생했다.

## 관련 개념

- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [소프트웨어 복잡도 (Software Complexity)](/knowledge/software-engineering/architectural-design/software-complexity/)
- [레거시 시스템 (Legacy Systems)](/knowledge/software-engineering/design-and-evolution/legacy-systems/)
- [보이 스카우트 규칙 (Boy Scout Rule)](/knowledge/software-engineering/design-and-evolution/boy-scout-rule/)
- [소프트웨어 엔트로피 (Software Entropy)](/knowledge/software-engineering/design-and-evolution/software-entropy/)
