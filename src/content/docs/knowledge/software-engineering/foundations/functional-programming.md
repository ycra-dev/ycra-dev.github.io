---
title: "함수형 프로그래밍 (Functional Programming)"
description: "함수를 일급 객체로 취급하고, 부작용 없는 순수 함수와 불변 데이터를 기반으로 프로그램을 구성하는 프로그래밍 패러다임이다."
tags: ["Software Engineering", "Programming Paradigm", "Functional"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/functional-programming
sidebar:
  order: 26
---

## 핵심 개념

함수형 프로그래밍(FP)은 프로그램을 순수 함수들의 조합으로 표현하는 패러다임이다. 핵심 특성은 세 가지다: (1) **순수 함수** - 같은 입력에는 항상 같은 출력, 부작용 없음. (2) **불변성** - 데이터를 변경하지 않고 새 데이터를 생성. (3) **함수를 값으로** - 함수를 변수에 담거나 다른 함수의 인자로 전달 가능.

## 동작 원리

명령형 vs 함수형 비교:

```python
# 명령형: 상태를 변경하며 진행
numbers = [1, 2, 3, 4, 5]
result = []
for n in numbers:
    if n % 2 == 0:
        result.append(n * 2)

# 함수형: 데이터 변환의 파이프라인
result = list(map(lambda x: x * 2, filter(lambda x: x % 2 == 0, numbers)))
```

핵심 개념:
- **고차 함수(Higher-order functions)**: `map`, `filter`, `reduce` - 함수를 인자로 받는 함수
- **클로저(Closure)**: 외부 변수를 캡처하는 함수
- **커링(Currying)**: 다인자 함수를 단인자 함수 체인으로 변환
- **모나드**: 연산을 체이닝하는 컨테이너 패턴

## 예시

- JavaScript: `array.map().filter().reduce()` 체이닝
- 리액트(React)의 순수 컴포넌트: 같은 props → 같은 렌더링 결과
- 하스켈(Haskell), 엘릭서(Elixir): 완전한 함수형 언어
- Python, JavaScript, Kotlin: 멀티 패러다임으로 FP 스타일 지원

## 관련 개념

- [컴파일 vs 인터프리터 언어](/knowledge/software-engineering/foundations/compiled-vs-interpreted-languages/)
- [객체지향 설계](/knowledge/software-engineering/design-and-evolution/object-oriented-design/)
