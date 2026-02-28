---
title: "DRY Principle"
description: "모든 지식이 시스템 내에서 단 하나의 명확하고 권위 있는 표현을 가져야 한다는 소프트웨어 설계 원칙 — Don't Repeat Yourself"
tags: ["SoftwareEngineering", "DesignPrinciples", "CodeQuality"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/dry-principle
sidebar:
  order: 306
---

## 핵심 개념

DRY(Don't Repeat Yourself) 원칙은 모든 지식(knowledge)이 시스템 내에서 단 하나의 명확하고 권위 있는 표현을 가져야 한다는 소프트웨어 설계 원칙이다. 단순한 "코드 복사 금지"를 넘어, 코드·로직·지식·의도의 중복을 모두 제거하는 것이 목표다.

## 동작 원리

중복은 소프트웨어의 가장 큰 적 중 하나이며, 다음과 같은 문제를 야기한다:

- **일관성 파괴**: 한 곳을 수정하면 다른 곳도 수정해야 하는데, 놓치기 쉽다
- **유지보수 비용 증가**: 같은 로직이 여러 곳에 있으면 변경 비용이 배로 늘어난다
- **버그 증식**: 한 곳의 버그 수정이 다른 곳에 반영되지 않으면 버그가 계속 존재한다

코드 재사용의 4가지 패턴:
1. **Copy-Pasta**: 복사-붙여넣기 (가장 나쁜 방법)
2. **Design for Reuse**: 처음부터 재사용을 고려한 설계
3. **Promote and Refactor**: 기존 코드를 공통 모듈로 승격
4. **Buy In**: 외부 라이브러리/프레임워크 활용

## 예시

```python
# DRY 위반: 동일 로직 중복
def validate_email(email):
    if '@' not in email:
        print("Error: invalid email")
        return False
    return True

def validate_admin_email(email):
    if '@' not in email:
        print("Error: invalid email")  # 중복!
        return False
    if not email.endswith('@company.com'):
        print("Error: not admin email")
        return False
    return True

# DRY 준수: 공통 로직 재사용
def validate_email(email):
    if '@' not in email:
        print("Error: invalid email")
        return False
    return True

def validate_admin_email(email):
    if not validate_email(email):
        return False
    if not email.endswith('@company.com'):
        print("Error: not admin email")
        return False
    return True
```

## 관련 개념

- [Code Reuse](/knowledge/software-engineering/design-and-evolution/code-reuse/)
- [Refactoring](/knowledge/software-engineering/design-and-evolution/refactoring/)
