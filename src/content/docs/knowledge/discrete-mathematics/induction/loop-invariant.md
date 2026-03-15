---
title: "루프 불변량 (Loop Invariant)"
description: "루프 불변식(Loop Invariant)은 반복문(loop)의 매 반복 실행 전후에 항상 참으로 유지되는 단언(assertion)이다"
tags: ['Loop Invariant', 'Program Correctness', 'Partial Correctness', 'Hoare Triple', 'Verification']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/loop-invariant
sidebar:
  order: 11
---

## 핵심 개념

### 루프 불변식의 역할

while 루프의 형태:
```
while condition
    S
```

이 루프에 대한 추론 규칙(rule of inference)은 다음과 같다:

```
(p ∧ condition){S}p
∴ p{while condition S}(¬condition ∧ p)
```

이 규칙의 의미:
1. p가 루프 불변식이면 (즉, 매 반복에서 조건이 참일 때 S 실행 후에도 p가 참이면)
2. 루프 시작 전에 p가 참이고
3. 루프가 종료되면
4. 종료 시 p와 ¬condition이 모두 참이다

### 루프 불변식을 이용한 증명 절차

1. **적절한 불변식 p 선택**: 루프의 목적을 반영하는 성질을 표현
2. **초기 조건 확인**: 루프 진입 전에 p가 참임을 보임
3. **불변성 증명**: (p ∧ condition){S}p 가 참임을 보임 (귀납적 단계)
4. **종료 후 결론**: ¬condition ∧ p 에서 원하는 최종 단언(final assertion)이 도출됨을 확인
5. **종료성 증명**: 루프가 유한 번 반복 후 반드시 종료함을 보임 (부분 정확성에서 완전 정확성으로)

루프 불변식의 선택은 증명의 가장 어려운 부분이다. 좋은 불변식은 충분히 강력하여 최종 단언을 유도할 수 있어야 하고, 동시에 매 반복에서 유지 가능해야 한다.

### Hoare 트리플과의 관계

p{S}q 표기법은 Hoare 트리플(Hoare Triple)이라 불리며, Tony Hoare가 도입한 프로그램 부분 정확성의 표기법이다. 루프 불변식은 이 체계에서 반복문의 정확성을 다루는 핵심 개념이다.

## 예시

**예시 1: 팩토리얼 계산의 루프 불변식**

```
i := 1
factorial := 1
while i < n
    i := i + 1
    factorial := factorial * i
```

루프 불변식: **p: "factorial = i! 이고 i <= n"**

증명:
- **초기 조건**: i=1, factorial=1=1!, i=1 <= n. p가 참.
- **불변성**: p가 참이고 i < n일 때:
  - i_new = i + 1
  - factorial_new = factorial * (i+1) = i! * (i+1) = (i+1)! = i_new!
  - i_new = i + 1 <= n (i < n이므로)
  - 따라서 p가 유지됨.
- **종료 후**: p가 참이고 ¬(i < n), 즉 i >= n. p에 의해 i <= n이므로 i = n. 따라서 factorial = n!.
- **종료성**: 각 반복에서 i가 1씩 증가하므로, n-1번 반복 후 i = n이 되어 종료.

**예시 2: 곱셈 프로그램의 루프 불변식**

```
k := 0
x := 0
while k < a
    x := x + m
    k := k + 1
```

루프 불변식: **"x = mk 이고 k <= a"**

- **초기 조건**: x=0=m*0, k=0 <= a. 참.
- **불변성**: x = mk이고 k < a일 때:
  - x_new = x + m = mk + m = m(k+1) = m * k_new
  - k_new = k + 1 <= a (k < a이므로)
- **종료 후**: x = mk이고 k = a이므로 x = ma.
- **종료성**: k가 매 반복마다 1씩 증가하여 a에 도달.

**예시 3: 거듭제곱 계산**

```
power := 1
i := 1
while i <= n
    power := power * x
    i := i + 1
```

루프 불변식: **"power = x^(i-1) 이고 i <= n+1"**

## 관련 개념

- [Program Correctness](/knowledge/mathematics/program-correctness/) - 루프 불변식은 프로그램 정확성 증명의 핵심
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 루프 불변식 증명은 수학적 귀납법과 유사
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 루프를 포함한 알고리즘의 정확성 보장
