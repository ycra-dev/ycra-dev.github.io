---
title: "술어 (Predicate)"
description: "술어(Predicate)는 변수를 포함하는 문장으로, 변수에 특정 값을 대입하면 참 또는 거짓의 진리값을 갖는 명제가 되는 명제 함수(propositional function)이다"
tags: ['Predicate', 'Propositional Function', 'Predicate Logic', 'Precondition', 'Postcondition']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/predicate
sidebar:
  order: 6
---

## 핵심 개념

술어 논리(predicate logic)는 명제 논리(propositional logic)를 확장한 것으로, 명제 논리만으로는 표현할 수 없는 수학적/논리적 진술을 다룰 수 있게 한다.

예를 들어, 명제 논리로는 "대학 네트워크에 연결된 모든 컴퓨터가 정상적으로 작동한다"는 문장에서 "MATH3는 정상적으로 작동한다"를 도출할 수 없다. 술어 논리는 이러한 추론을 가능하게 한다.

**술어의 구조:**
- **단항 술어**: P(x) - 한 개의 변수 (예: "x > 3")
- **이항 술어**: Q(x, y) - 두 개의 변수 (예: "x = y + 3")
- **n항 술어**: R(x₁, x₂, ..., xₙ) - n개의 변수

변수에 값이 대입되면 술어는 명제가 되어 진리값을 갖는다. 예를 들어 P(x)가 "x > 3"이면, P(4)는 "4 > 3"으로 참이고, P(2)는 "2 > 3"으로 거짓이다.

**컴퓨터 과학에서의 핵심 활용:**
- **전제조건(Precondition)**: 프로그램의 유효한 입력을 기술하는 술어
- **후제조건(Postcondition)**: 프로그램 실행 후 출력이 만족해야 하는 조건을 기술하는 술어
- 프로그램의 **정확성 검증(correctness verification)**에 사용

술어를 명제로 변환하는 두 가지 방법:
1. 변수에 특정 값을 대입
2. **양화사(quantifier)**를 사용 (모든 x에 대해, 어떤 x가 존재하여 등)

## 예시

단항 술어:
```
P(x) = "x > 3"이라 하면
P(4) = "4 > 3" → 참
P(2) = "2 > 3" → 거짓
```

이항 술어:
```
Q(x, y) = "x = y + 3"이라 하면
Q(1, 2) = "1 = 2 + 3" → 거짓
Q(3, 0) = "3 = 0 + 3" → 참
```

프로그램 정확성 검증 예시:
```
프로그램: 두 변수 x, y의 값을 교환
  temp := x
  x := y
  y := temp

전제조건 P(x,y): "x = a이고 y = b"
후제조건 Q(x,y): "x = b이고 y = a"

실행 추적:
  temp := x → x=a, temp=a, y=b
  x := y   → x=b, temp=a, y=b
  y := temp → x=b, temp=a, y=a ✓ 후제조건 만족
```

프로그래밍에서의 조건문:
```
if x > 0 then x := x + 1
// P(x) = "x > 0"이라는 술어를 평가하여
// 참이면 대입문 실행, 거짓이면 건너뜀
```

## 관련 개념

- [Proposition](/knowledge/mathematics/proposition/) - 술어에 값을 대입하면 명제가 됨
- [Quantifier](/knowledge/mathematics/quantifier/) - 술어를 양화하여 명제로 변환하는 도구
- [Nested Quantifier](/knowledge/mathematics/nested-quantifier/) - 다변수 술어에 대한 양화
