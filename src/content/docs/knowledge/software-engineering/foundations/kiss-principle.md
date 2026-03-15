---
title: "KISS 원칙 (KISS Principle)"
description: "시스템이나 코드를 가능한 한 단순하게 유지해야 한다는 설계 원칙"
tags: ["Software Engineering", "Design Principle", "Simplicity"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/kiss-principle
sidebar:
  order: 17
---

## 핵심 개념

KISS(Keep It Simple, Stupid) 원칙은 시스템이나 코드를 가능한 한 단순하게 유지해야 한다는 설계 원칙이다. 불필요한 복잡성을 피하고 가장 간단한 해결책을 선호한다. "단순(Simple)"과 "단순화(Simplistic)"는 다르다 — KISS는 문제를 지나치게 단순화하라는 것이 아니라, 해결책에 불필요한 복잡성을 추가하지 말라는 것이다.

## 동작 원리

단순한 설계의 특징:
- 각 부분이 하나의 명확한 역할을 가진다
- 코드 경로가 짧고 직관적이다
- 간접 참조(indirection)를 최소화한다
- 필요 이상으로 추상화하지 않는다

단순함의 적:
- **과도한 추상화**: "나중에 필요할까봐" 미리 만드는 인터페이스와 팩토리
- **조기 최적화(Premature Optimization)**: Knuth의 경고 - "조기 최적화는 만악의 근원"
- **불필요한 일반화**: 하나의 사용 사례를 위해 범용 프레임워크를 만드는 것
- **지나친 디자인 패턴 적용**: 패턴을 위한 패턴

## 예시

```python
# 과도하게 복잡한 코드 (KISS 위반)
class AbstractStrategyFactory:
    def create_strategy(self, strategy_type):
        registry = StrategyRegistry.get_instance()
        strategy_class = registry.lookup(strategy_type)
        return strategy_class.create()

# KISS 적용: 단순하게
def sort_users(users, key="name"):
    return sorted(users, key=lambda u: getattr(u, key))
```

## 관련 개념

- [YAGNI 원칙 (YAGNI)](/knowledge/software-engineering/design-and-evolution/yagni/)
- [조기 최적화 (Premature Optimization)](/knowledge/software-engineering/foundations/premature-optimization/)
- [소프트웨어 복잡도 (Software Complexity)](/knowledge/software-engineering/architectural-design/software-complexity/)
