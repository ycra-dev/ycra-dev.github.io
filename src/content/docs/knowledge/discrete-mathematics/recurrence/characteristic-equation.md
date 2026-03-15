---
title: "특성 방정식 (Characteristic Equation)"
description: "특성 방정식(characteristic equation)은 선형 동차 점화식 a_n = c_1*a_{n-1} + c_2*a_{n-2} + "
tags: ['Characteristic Equation', 'Characteristic Root', 'Recurrence Relation', 'Polynomial', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/characteristic-equation
sidebar:
  order: 2
---

## 핵심 개념

특성 방정식의 핵심 아이디어는 다음과 같다: a_n = r^n 형태의 해를 시도(trial solution)하면, 점화식에 대입 후 양변을 r^{n-k}로 나누어 r에 대한 다항 방정식을 얻을 수 있다. 이 방정식의 근이 바로 특성근이다.

특성근의 구조에 따라 일반해의 형태가 결정된다:

**정리 1 (상이한 근)**: 특성 방정식이 k개의 서로 다른 근 r_1, ..., r_k를 가지면, 일반해는 a_n = alpha_1*r_1^n + alpha_2*r_2^n + ... + alpha_k*r_k^n이다.

**정리 4 (중복근 포함)**: 특성 방정식이 t개의 서로 다른 근 r_1, ..., r_t를 가지고, r_i의 중복도가 m_i이면, 일반해는 각 근 r_i에 대해 (alpha_{i,0} + alpha_{i,1}*n + ... + alpha_{i,m_i-1}*n^{m_i-1}) * r_i^n 형태의 항들의 합이다.

선형 동차 점화식 해의 중요한 성질: 두 해의 선형결합도 역시 해가 된다. 이는 초기 조건을 만족하는 유일한 해를 구하는 데 핵심적인 역할을 한다.

## 예시

**차수 3, 상이한 근**: a_n = 6a_{n-1} - 11a_{n-2} + 6a_{n-3}
```
특성 방정식: r^3 - 6r^2 + 11r - 6 = (r-1)(r-2)(r-3) = 0
특성근: r = 1, 2, 3
일반해: a_n = alpha_1 * 1^n + alpha_2 * 2^n + alpha_3 * 3^n
```

**중복근 예시**: 특성근이 2(중복도 3), 5(중복도 2), 9(중복도 1)인 경우
```
일반해: (alpha_{1,0} + alpha_{1,1}*n + alpha_{1,2}*n^2) * 2^n
      + (alpha_{2,0} + alpha_{2,1}*n) * 5^n
      + alpha_{3,0} * 9^n
```

**비동차 점화식에서의 활용**: a_n = 6a_{n-1} - 9a_{n-2} + F(n)
```
동차 방정식의 특성근: r = 3 (중복도 2)
F(n) = 3^n일 때: s = 3이 중복도 2인 근이므로
  특수해 형태: p_0 * n^2 * 3^n
F(n) = n^2 * 2^n일 때: s = 2는 특성근이 아니므로
  특수해 형태: (p_2*n^2 + p_1*n + p_0) * 2^n
```

## 관련 개념

- [Linear Homogeneous Recurrence Relation](/knowledge/mathematics/linear-homogeneous-recurrence-relation/) - 특성 방정식이 적용되는 점화식의 유형
- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 상위 개념
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 특성근으로 구한 해의 정확성 증명에 사용
