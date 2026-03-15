---
title: "기대값 (Expected Value)"
description: "기대값(Expected Value)은 확률 변수의 가능한 모든 값에 각각의 확률을 곱한 가중 평균으로, 알고리즘 분석에서는 수행 시간이나 비용의 \"평균적인\" 크기를 정량적으로 나타내는 핵심 측도이다"
tags: ['Expected Value', 'Probability', 'Linearity Of Expectation', 'Algorithm Analysis', 'Average Case']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/expected-value
sidebar:
  order: 22
---

## 핵심 개념

기대값은 확률적 분석과 무작위화 알고리즘 분석의 핵심 수학적 도구이다. 이산 확률 변수 X에 대해 E[X] = sum(x * Pr{X = x})로 정의된다.

**기대값의 선형성 (Linearity of Expectation)**:
가장 중요한 성질로, E[X1 + X2 + ... + Xn] = E[X1] + E[X2] + ... + E[Xn]이 **확률 변수의 독립 여부와 무관하게** 항상 성립한다. 이 성질 덕분에:
- 복잡한 확률 변수를 단순한 지시자 확률 변수의 합으로 분해
- 각 지시자의 기대값을 독립적으로 계산
- 단순히 합산하여 전체 기대값을 구함

**알고리즘 분석에서의 두 가지 맥락**:
1. **평균적 경우 수행 시간(Average-case running time)**: 입력의 확률 분포에 대해 기대값을 계산. 확률 분포가 입력에 있다.
2. **기대 수행 시간(Expected running time)**: 알고리즘 내부의 무작위 선택에 대해 기대값을 계산. 확률 분포가 알고리즘에 있다.

**주요 확률 분포와 기대값**:
- 기하 분포: 성공 확률 p일 때, 첫 성공까지 기대 시행 횟수 = 1/p
- 이항 분포: n번 시행, 성공 확률 p일 때, 기대 성공 횟수 = np
- 조화급수: H_n = sum(1/i, i=1..n) = ln n + O(1)

**기대값과 최악의 경우의 관계**:
기대값은 항상 최악의 경우 이하이다. 무작위화 알고리즘에서 기대 수행 시간은 종종 최악의 경우 수행 시간보다 현저히 작다. 예를 들어, 고용 문제에서 기대 고용 비용 O(ln n)은 최악의 경우 O(n)보다 훨씬 작다.

## 예시

지시자 확률 변수와 기대값의 선형성을 이용한 계산:

```
문제: n개의 주사위를 던질 때 눈의 합의 기대값

X_i = i번째 주사위의 눈 (1~6)
E[X_i] = (1+2+3+4+5+6)/6 = 3.5

X = X_1 + X_2 + ... + X_n
E[X] = E[X_1] + E[X_2] + ... + E[X_n]  (선형성)
     = 3.5n
```

쿠폰 수집가 문제 (Coupon Collector's Problem):
```
b종류의 쿠폰을 모두 수집하려면 기대 몇 개의 쿠폰이 필요한가?

i번째 단계: i-1종류를 이미 수집한 후 새 종류를 얻기까지
  성공 확률: (b-i+1)/b
  기대 시행 횟수: n_i = b/(b-i+1)  (기하 분포)

E[n] = sum(b/(b-i+1), i=1..b)
     = b * sum(1/j, j=1..b)
     = b * H_b
     ~= b * ln(b)
```

기대값의 선형성이 종속적 변수에도 적용되는 예시:
```
두 주사위: 첫 번째를 정상적으로 던지고, 두 번째 = 첫 번째 값
X = X_1 + X_2 (종속적!)
E[X] = E[X_1] + E[X_2] = 3.5 + 3.5 = 7
(독립적으로 던질 때와 같은 기대값!)
```

## 관련 개념

- [지시 확률 변수 (Indicator Random Variable)](/knowledge/algorithms/indicator-random-variable/) - 기대값 계산을 단순화하는 핵심 도구
- [확률적 분석 (Probabilistic Analysis)](/knowledge/algorithms/probabilistic-analysis/) - 기대값을 이용한 분석 기법
- [랜덤 알고리즘 (Randomized Algorithm)](/knowledge/algorithms/randomized-algorithm/) - 기대 수행 시간의 정의에 사용
- [고용 문제 (Hiring Problem)](/knowledge/algorithms/hiring-problem/) - 기대값 분석의 대표적 예시
- [최악의 경우 분석 (Worst-Case Analysis)](/knowledge/algorithms/worst-case-analysis/) - 기대값과 상보적인 분석 관점
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/) - 기대값의 점근적 표현
