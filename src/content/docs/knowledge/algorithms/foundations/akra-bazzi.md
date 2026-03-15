---
title: "아크라-바지 방법 (Akra-Bazzi Method)"
description: "아크라-바지 방법(Akra-Bazzi Method)은 T(n) = sum(a_i * T(n/b_i)) + f(n) 형태의 일반적인 분할 정복 점화식을 풀기 위한 방법으로, 부분 문제들이 서로 다른 크기를 가질 수 있는 경우까지 처리할 수 있으며, 적분을 이용하여 ..."
tags: ['Akra Bazzi', 'Recurrence', 'Divide And Conquer', 'Algorithm Analysis', 'Calculus']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/akra-bazzi
sidebar:
  order: 13
---

## 핵심 개념

아크라-바지 점화식은 마스터 점화식의 일반화이다. M. Akra와 L. Bazzi가 연구한 이 방법은 다음 형태의 점화식을 다룬다:

T(n) = a_1*T(n/b_1) + a_2*T(n/b_2) + ... + a_k*T(n/b_k) + f(n)

여기서 모든 a_i > 0이고 모든 b_i > 1이다. 마스터 정리가 모든 부분 문제가 같은 크기(n/b)인 경우만 다루는 반면, 아크라-바지 방법은 부분 문제들이 서로 다른 크기를 가질 수 있다.

**풀이 절차**:
1. sum(a_i / b_i^p) = 1을 만족하는 유일한 실수 p를 구한다
2. 해는 T(n) = Theta(n^p * (1 + integral_1^n (f(u)/u^(p+1)) du))

**다항식 성장 조건 (Polynomial-Growth Condition)**:
구동 함수 f(n)이 바닥/천장 함수를 무시할 수 있으려면 다항식 성장 조건을 만족해야 한다. 이 조건은 대략적으로 f(Theta(n)) = Theta(f(n))을 의미한다. Theta(n^alpha * lg^beta(n) * lg lg^gamma(n)) 형태의 함수는 이 조건을 만족하지만, 지수 함수(예: 2^n)는 만족하지 않는다.

**정리 4.5 (바닥/천장 처리)**: 구동 함수가 다항식 성장 조건을 만족하면, n/b_i를 floor(n/b_i) 또는 ceil(n/b_i)로 바꿔도 점근적 해는 변하지 않는다. 더 나아가, |h_i(n)| = O(n/lg^(1+epsilon) n)인 섭동 n/b_i + h_i(n)도 허용된다.

**마스터 정리와의 비교**:
- 아크라-바지가 더 일반적 (서로 다른 크기의 부분 문제 처리 가능)
- 마스터 정리가 더 간편 (세 가지 사례만 기억하면 됨)
- 아크라-바지는 미적분(적분)이 필요

## 예시

점화식 T(n) = T(n/5) + T(7n/10) + n 풀기:

```
1. p 결정: (1/5)^p + (7/10)^p = 1
   p=0일 때: 1/1 + 1/1 = 2 (> 1)
   p=1일 때: 1/5 + 7/10 = 9/10 (< 1)
   따라서 0 < p < 1

2. 아크라-바지 공식 적용:
   T(n) = Theta(n^p * (1 + integral_1^n (u / u^(p+1)) du))
        = Theta(n^p * (1 + integral_1^n u^(-p) du))
        = Theta(n^p * (1 + [u^(1-p)/(1-p)]_1^n))
        = Theta(n^p * (1 + n^(1-p)/(1-p)))
        = Theta(n^p * n^(1-p))    (0 < p < 1이므로)
        = Theta(n)
```

다른 예시:
```
T(n) = T(n/2) + T(n/3) + T(n/6) + n lg n
p 결정: (1/2)^p + (1/3)^p + (1/6)^p = 1
p=1일 때: 1/2 + 1/3 + 1/6 = 1 ✓
T(n) = Theta(n * (1 + integral_1^n (u lg u / u^2) du))
     = Theta(n * lg^2 n)
```

## 관련 개념

- [마스터 정리 (Master Theorem)](/knowledge/algorithms/master-theorem/) - 아크라-바지의 특수한 경우인 마스터 정리
- [점화식 (Recurrence)](/knowledge/algorithms/recurrence/) - 아크라-바지 방법으로 풀이하는 점화식
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/) - 서로 다른 크기의 부분 문제를 만드는 알고리즘 분석
- [치환법 (Substitution Method)](/knowledge/algorithms/substitution-method/) - 아크라-바지가 적용 불가할 때의 대안
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/) - 해의 점근적 표현
