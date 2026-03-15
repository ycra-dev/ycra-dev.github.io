---
title: "명제 (Proposition)"
description: "명제(Proposition)란 참(True) 또는 거짓(False) 중 하나의 진리값을 가지며, 동시에 둘 다가 될 수 없는 선언적 문장이다"
tags: ['Proposition', 'Propositional Logic', 'Truth Value', 'Declarative Sentence']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/proposition
sidebar:
  order: 1
---

## 핵심 개념

명제는 논리학과 수학적 추론의 가장 기본적인 구성 요소이다. "워싱턴 D.C.는 미국의 수도이다"(참), "1 + 1 = 2"(참), "2 + 2 = 3"(거짓)과 같은 문장이 명제의 예시이다. 반면 "지금 몇 시인가?"(의문문), "이것을 주의 깊게 읽어라"(명령문), "x + 1 = 2"(변수의 값이 정해지지 않아 진리값을 판단할 수 없음)는 명제가 아니다.

명제를 표현하기 위해 p, q, r, s 등의 **명제 변수(propositional variable)**를 사용한다. 진리값이 참이면 T, 거짓이면 F로 표기한다. 더 단순한 명제로 분해할 수 없는 명제를 **원자 명제(atomic proposition)**라고 한다.

기존 명제에 논리 연산자(logical operator)를 적용하여 **합성 명제(compound proposition)**를 만들 수 있다. 합성 명제의 진리값은 구성 명제들의 진리값과 사용된 논리 연산자에 의해 결정된다.

명제 논리는 컴퓨터 회로 설계, 프로그램 검증, 인공지능, 프로그래밍 언어 등 컴퓨터 과학의 여러 분야에서 핵심적으로 활용된다.

## 예시

명제인 것:
- "토론토는 캐나다의 수도이다." (거짓인 명제)
- "1 + 1 = 2" (참인 명제)

명제가 아닌 것:
- "x + 1 = 2" (x의 값에 따라 참/거짓이 달라지므로 명제가 아님)
- "이 문장을 주의 깊게 읽어라." (명령문이므로 명제가 아님)

프로그래밍에서의 활용 (비트 표현):
```
참(T) → 1
거짓(F) → 0
```

Boolean 변수는 명제의 참/거짓을 비트(0 또는 1)로 표현한 것이다.

## 관련 개념

- [Logical Connective](/knowledge/mathematics/logical-connective/) - 명제들을 결합하여 합성 명제를 만드는 연산자
- [Truth Table](/knowledge/mathematics/truth-table/) - 합성 명제의 진리값을 체계적으로 평가하는 도구
- [Predicate](/knowledge/mathematics/predicate/) - 변수를 포함하여 명제를 일반화한 개념
