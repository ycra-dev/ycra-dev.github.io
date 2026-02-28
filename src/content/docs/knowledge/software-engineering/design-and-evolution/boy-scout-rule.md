---
title: "Boy Scout Rule"
description: "코드를 수정할 때마다 주변 코드를 조금씩 개선하라는 실천 지침"
tags: ["Software Engineering", "Code Quality", "Best Practice"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/boy-scout-rule
sidebar:
  order: 14
---

## 핵심 개념

보이스카우트 규칙(Boy Scout Rule)은 "캠프장을 떠날 때 도착했을 때보다 더 깨끗하게 남겨라"는 원칙을 코드에 적용한 것이다. Robert C. Martin(Uncle Bob)이 소프트웨어 개발에 도입했으며, 코드를 수정할 때마다 주변 코드를 조금씩 개선하라는 실천 지침이다.

## 동작 원리

핵심은 "점진적 개선"이다.

실천 방법:
- 파일을 열 때마다 작은 개선 사항을 하나라도 적용한다
- 변수명 개선, 주석 정리, 불필요한 코드 제거 등 작은 작업
- 원래 작업과 무관한 대규모 리팩토링은 피한다
- 각 변경은 별도 커밋으로 분리하여 추적 가능하게 한다

이 규칙은 개인이 실천할 때 효과적이지만, 팀 전체가 동의하지 않으면 "한 발 앞, 두 발 뒤"가 될 수 있다. 팀 문화로 자리잡아야 진정한 효과를 볼 수 있다.

## 예시

```python
# 버그 수정을 위해 파일을 열었을 때
# 원래 코드:
def calc(x, y, t):  # 모호한 이름
    # TODO: fix this later
    r = x * y
    if t == 1:
        r = r * 1.1
    return r

# 보이스카우트 규칙 적용 후:
def calculate_price(base_price, quantity, tax_type):
    subtotal = base_price * quantity
    if tax_type == 1:
        subtotal *= 1.1
    return subtotal
# TODO 제거, 변수명 개선 → 발견 시보다 더 깨끗해짐
```

## 관련 개념

- [Refactoring](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [Legacy Systems](/knowledge/software-engineering/design-and-evolution/legacy-systems/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [Broken Window Theory](/knowledge/software-engineering/foundations/broken-window-theory/)
