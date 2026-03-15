---
title: "죽은 코드 (Dead Code)"
description: "프로그램 실행 중 절대 도달하지 않거나 더 이상 사용되지 않는 코드"
tags: ["Software Engineering", "Code Quality", "Maintenance"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/dead-code
sidebar:
  order: 12
---

## 핵심 개념

데드 코드(Dead Code)는 프로그램 실행 중 절대 도달하지 않거나 더 이상 사용되지 않는 코드를 말한다. 주석 처리된 코드, 호출되지 않는 함수, 도달 불가능한 분기 등이 포함된다. 소프트웨어가 성장하면서 기능 변경, 요구사항 수정, 리팩토링 과정에서 자연스럽게 발생한다.

## 동작 원리

데드 코드의 해악:
- **혼란 유발**: 다른 개발자가 사용되는 코드로 착각하여 시간을 낭비한다
- **유지보수 부담**: 컴파일은 되어야 하므로 관련 코드 변경 시 함께 수정해야 한다
- **코드베이스 비대화**: 불필요한 복잡성을 추가하여 전체적인 이해를 어렵게 만든다

"코드를 개선하는 가장 좋은 방법은 코드를 제거하는 것"이라는 원칙이 있다. 버전 관리 시스템이 있으므로 삭제한 코드는 언제든 복원할 수 있다. 주석 처리하여 남겨두는 것보다 과감히 삭제하는 것이 낫다.

## 예시

```python
# 데드 코드의 다양한 형태

# 1. 주석 처리된 코드
def process_data(data):
    # result = old_algorithm(data)  # 왜 남겨둔 거지?
    result = new_algorithm(data)
    return result

# 2. 도달 불가능한 코드
def calculate(x):
    return x * 2
    print("이 줄은 절대 실행되지 않음")  # dead code

# 3. 호출되지 않는 함수
def deprecated_helper():  # 아무도 호출하지 않음
    pass

# 해결: 과감히 삭제하자. VCS가 기록을 보관한다.
```

## 관련 개념

- [YAGNI 원칙 (YAGNI)](/knowledge/software-engineering/design-and-evolution/yagni/)
- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [소프트웨어 엔트로피 (Software Entropy)](/knowledge/software-engineering/design-and-evolution/software-entropy/)
