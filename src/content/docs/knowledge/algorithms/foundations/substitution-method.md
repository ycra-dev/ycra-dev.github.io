---
title: "치환법 (Substitution Method)"
description: "치환법(Substitution Method)은 점화식의 해를 구하는 방법으로, 해의 형태를 추측(guess)한 후 수학적 귀납법(mathematical induction)을 사용하여 추측이 올바름을 증명하고 상수를 결정하는 두 단계로 구성된다"
tags: ['Substitution Method', 'Recurrence', 'Mathematical Induction', 'Algorithm Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/substitution-method
sidebar:
  order: 10
---

## 핵심 개념

치환법은 이 장에서 소개하는 네 가지 점화식 풀이 방법 중 가장 범용적인 방법이다. 핵심 과정은 다음과 같다:

1. **추측 단계**: 해의 형태를 기호 상수를 사용하여 추측한다. 예를 들어, T(n) = 2T(n/2) + Theta(n)에 대해 T(n) <= cn lg n을 추측한다.
2. **귀납법 증명**: 추측한 해를 점화식에 대입(substitute)하여 귀납적 가정이 성립함을 보인다. 작은 값에서의 귀납적 가정을 큰 값에 대해 증명한다.

**주의사항 (Pitfalls)**:
- 귀납적 가정에 점근적 표기법(O-notation)을 사용하면 안 된다. 상수가 변할 수 있기 때문이다.
- 목표(예: T(n) = O(n lg n))와 귀납적 가정(예: T(n) <= cn lg n)을 구분해야 한다.
- 정확한 형태의 귀납적 가정을 증명해야 한다.

**저차항 빼기 기법 (Subtracting a low-order term)**:
추측이 거의 맞지만 귀납법이 성립하지 않을 때, 추측에서 저차항을 빼는 것이 효과적이다. 예를 들어, T(n) = 2T(n/2) + Theta(1)에서 T(n) <= cn이 성립하지 않으면, T(n) <= cn - d로 수정하면 재귀 호출의 계수(여기서 2)만큼 d를 빼는 효과가 누적되어 증명이 성립한다.

**좋은 추측을 하는 방법**:
- 유사한 점화식의 해를 참고한다
- 느슨한 상한과 하한을 먼저 구한 후 범위를 좁혀간다
- 재귀 트리 방법으로 직관을 얻은 후 치환법으로 검증한다

## 예시

T(n) = 2T(floor(n/2)) + Theta(n)에 대해 T(n) = O(n lg n)을 증명하는 과정:

```
추측: T(n) <= cn lg n  (c > 0, n >= n_0)

귀납 단계:
T(n) <= 2(c * floor(n/2) * lg(floor(n/2))) + Theta(n)
     <= 2(c(n/2) * lg(n/2)) + Theta(n)
     = cn * lg(n/2) + Theta(n)
     = cn * lg n - cn * lg 2 + Theta(n)
     = cn * lg n - cn + Theta(n)
     <= cn * lg n
     (cn이 Theta(n) 항을 지배하도록 c를 충분히 크게 선택)
```

저차항 빼기 기법의 예시:
```
점화식: T(n) = 2T(n/2) + Theta(1)
실패하는 추측: T(n) <= cn  ->  T(n) <= cn + Theta(1) (실패!)
성공하는 추측: T(n) <= cn - d
  T(n) <= 2(c(n/2) - d) + Theta(1)
       = cn - 2d + Theta(1)
       <= cn - d     (d >= Theta(1) 상수일 때)
```

## 관련 개념

- [점화식 (Recurrence)](/knowledge/algorithms/recurrence/) - 치환법으로 풀어야 하는 점화식
- [재귀 트리 (Recursion Tree)](/knowledge/algorithms/recursion-tree/) - 치환법의 추측을 생성하는 데 도움이 되는 도구
- [마스터 정리 (Master Theorem)](/knowledge/algorithms/master-theorem/) - 더 간편하지만 적용 범위가 제한적인 방법
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/) - 점근적 상한/하한 표기에 사용
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/) - 치환법으로 분석하는 분할 정복 알고리즘의 점화식
