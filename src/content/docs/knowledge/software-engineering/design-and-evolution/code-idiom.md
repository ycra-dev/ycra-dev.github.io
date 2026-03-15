---
title: "코드 관용구 (Code Idiom)"
description: "특정 프로그래밍 언어에서 관례적으로 사용되는 표현 방식이나 패턴으로, 해당 언어 커뮤니티에서 자연스럽게 인정받는 작성 방식"
tags: ["Software Engineering", "Programming Language", "Convention"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/code-idiom
sidebar:
  order: 10
---

## 핵심 개념

코드 관용구(Code Idiom)는 특정 프로그래밍 언어에서 관례적으로 사용되는 표현 방식이나 패턴으로, 해당 언어 커뮤니티에서 "자연스러운" 코드로 인정받는 작성 방식이다. Python의 "Pythonic", Ruby의 "Ruby Way", C++의 RAII 등이 대표적이다.

## 동작 원리

관용구를 따르는 것이 중요한 이유:
- **가독성**: 해당 언어에 익숙한 개발자가 즉시 이해할 수 있다
- **정확성**: 관용구는 오랜 경험에서 나온 best practice를 반영한다
- **유지보수**: 팀원 모두가 익숙한 패턴으로 작성하면 협업이 쉽다
- **성능**: 언어의 관용구는 해당 언어의 최적화 특성을 반영하는 경우가 많다

한 언어의 관용구를 다른 언어에 강제로 적용하면 어색하고 비효율적인 코드가 된다.

## 예시

```python
# 비관용적 Python (Java 스타일)
result = []
for i in range(len(items)):
    if items[i].is_valid():
        result.append(items[i].value)

# 관용적 Python (Pythonic)
result = [item.value for item in items if item.is_valid()]
```

```cpp
// 비관용적 C++ (C 스타일 메모리 관리)
Widget* w = new Widget();
w->doWork();
delete w;

// 관용적 C++ (RAII)
auto w = std::make_unique<Widget>();
w->doWork();
// 자동 해제
```

## 관련 개념

- [코드 가독성 (Code Readability)](/knowledge/software-engineering/design-and-evolution/code-readability/)
- [코딩 표준 (Coding Standard)](/knowledge/software-engineering/foundations/coding-standard/)
- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
