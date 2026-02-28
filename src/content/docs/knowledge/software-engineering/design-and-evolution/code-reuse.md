---
title: "Code Reuse"
description: "기존에 작성된 코드를 새로운 맥락에서 활용하는 소프트웨어 개발의 핵심 실천법으로, 복사-붙여넣기부터 외부 라이브러리 활용까지 4가지 패턴으로 구분된다"
tags: ["SoftwareEngineering", "DesignPrinciples", "Modularity", "Productivity"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/code-reuse
sidebar:
  order: 308
---

## 핵심 개념

코드 재사용(Code Reuse)은 기존에 작성된 코드를 새로운 맥락에서 활용하는 것으로, 소프트웨어 개발의 효율성을 높이는 핵심 실천법이다. [DRY 원칙](/knowledge/software-engineering/design-and-evolution/dry-principle/)의 구체적 구현이다.

## 동작 원리

코드 재사용의 4가지 패턴:

| 패턴 | 방법 | 장단점 |
|------|------|--------|
| **Copy-Pasta** | 복사-붙여넣기 | 빠르지만 중복 발생, 유지보수 최악 |
| **Design for Reuse** | 처음부터 재사용 설계 | 올바르게 설계되면 강력하지만, YAGNI 위반 위험 |
| **Promote and Refactor** | 기존 코드를 공통 모듈로 승격 | 가장 실용적인 접근 |
| **Buy In** | 라이브러리·프레임워크 활용 | 바퀴를 재발명하지 않지만 의존성 관리 필요 |

재사용을 현명하게 판단하는 기준:
- 재사용이 실제로 시간을 절약하는가?
- 외부 라이브러리의 라이선스는 적합한가?
- 의존성을 추가하는 비용 대비 이점이 있는가?
- "여기서 만들지 않았다(Not Invented Here)" 증후군을 경계하라

## 예시

```python
# 패턴 3: Promote and Refactor (가장 실용적)

# Before: 특수 목적 코드가 두 곳에 중복
class UserController:
    def validate_email(self, email):
        import re
        return bool(re.match(r'^[\w.]+@[\w.]+\.\w+$', email))

class AdminController:
    def check_email(self, email):
        import re
        return bool(re.match(r'^[\w.]+@[\w.]+\.\w+$', email))  # 중복!

# After: 공통 모듈로 승격
# validators.py
def is_valid_email(email: str) -> bool:
    import re
    return bool(re.match(r'^[\w.]+@[\w.]+\.\w+$', email))

# 두 컨트롤러에서 import하여 사용
from validators import is_valid_email

class UserController:
    def validate_email(self, email):
        return is_valid_email(email)

class AdminController:
    def check_email(self, email):
        return is_valid_email(email)
```

## 관련 개념

- [DRY Principle](/knowledge/software-engineering/design-and-evolution/dry-principle/)
- [Refactoring](/knowledge/software-engineering/design-and-evolution/refactoring/)
