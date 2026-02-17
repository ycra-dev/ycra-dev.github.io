---
title: "Indicator Random Variable"
description: "지시자 확률 변수(Indicator Random Variable)는 표본 공간 S와 사건 A에 대해 I{A}로 정의되며, 사건 A가 발생하면 1, 발생하지 않으면 0의 값을 갖는 확률 변수로, 확률과 기대값 사이의 변환을 간편하게 만드는 도구이다"
tags: ['Indicator Random Variable', 'Probability', 'Expected Value', 'Linearity Of Expectation', 'Algorithm Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/indicator-random-variable
sidebar:
  order: 21
---

## 핵심 개념

지시자 확률 변수의 핵심 성질은 **Lemma 5.1**: E[X_A] = Pr{A}이다. 즉, 지시자 확률 변수의 기대값은 해당 사건의 확률과 같다. 이 단순한 성질이 복잡한 기대값 계산을 극적으로 단순화한다.

**강력함의 원천 -- 기대값의 선형성(Linearity of Expectation)**:
기대값의 선형성은 E[X1 + X2 + ... + Xn] = E[X1] + E[X2] + ... + E[Xn]이 **확률 변수의 독립 여부와 관계없이** 항상 성립한다는 성질이다. 지시자 확률 변수와 결합하면:

1. 복잡한 사건을 여러 단순한 이진(0/1) 사건으로 분해한다
2. 각 지시자 확률 변수의 기대값(= 확률)을 개별적으로 구한다
3. 기대값의 선형성으로 이들을 합산한다

이 방법은 직접 기대값을 정의에 따라 계산하는 것(각 가능한 결과의 확률을 열거)보다 훨씬 간단하다.

**사용 패턴**:
- 개별 시행(trial)을 지시자 확률 변수로 정의한다
- 전체 횟수를 나타내는 확률 변수를 지시자들의 합으로 표현한다
- 기대값의 선형성을 적용하여 합의 기대값을 개별 기대값의 합으로 변환한다

**적용 사례**: 동전 던지기에서 앞면 기대 횟수, 고용 문제의 기대 고용 횟수, 생일 패러독스의 기대 일치 쌍 수, 역전(inversion) 기대 개수, 모자 확인 문제(hat-check problem) 등.

## 예시

동전 n번 던지기에서 앞면의 기대 횟수:

```
직접 계산 (복잡):
  E[X] = sum(k * C(n,k) * (1/2)^n, k=0..n)

지시자 확률 변수 (간단):
  X_i = I{i번째 동전이 앞면}  (i = 1, ..., n)
  X = X_1 + X_2 + ... + X_n   (총 앞면 수)

  E[X] = E[X_1 + X_2 + ... + X_n]
       = E[X_1] + E[X_2] + ... + E[X_n]  (선형성)
       = 1/2 + 1/2 + ... + 1/2
       = n/2
```

고용 문제에서의 적용:
```
X_i = I{i번째 후보가 고용됨}

E[X_i] = Pr{i번째 후보가 고용됨}
       = 1/i  (첫 i명 중 i가 최고일 확률)

E[X] = sum(E[X_i], i=1..n) = sum(1/i) = H_n ~= ln n
```

생일 패러독스에서 기대 일치 쌍 수:
```
X_ij = I{i번째와 j번째 사람이 같은 생일}
E[X_ij] = 1/365

X = sum(X_ij, 1<=i<j<=k)  (총 일치 쌍 수)
E[X] = C(k,2) * (1/365) = k(k-1) / (2*365)

k=28일 때: E[X] ~= 1.04 -> 최소 1쌍의 일치 기대
```

## 관련 개념

- [Expected Value](/knowledge/algorithms/expected-value/) - 지시자 확률 변수의 기대값 = 사건의 확률
- [Probabilistic Analysis](/knowledge/algorithms/probabilistic-analysis/) - 지시자 확률 변수를 활용하는 분석 기법
- [Hiring Problem](/knowledge/algorithms/hiring-problem/) - 지시자 확률 변수의 대표적 응용
- [Birthday Paradox](/knowledge/algorithms/birthday-paradox/) - 지시자 확률 변수를 이용한 근사 분석
- [Randomized Algorithm](/knowledge/algorithms/randomized-algorithm/) - 무작위화 알고리즘의 기대 수행 시간 분석에 활용
