---
title: "Probabilistic Analysis"
description: "확률적 분석(Probabilistic Analysis)은 입력의 확률 분포에 대한 지식 또는 가정을 이용하여 알고리즘의 수행 시간이나 기타 비용의 평균적 경우(average-case)를 분석하는 기법이다"
tags: ['Probabilistic Analysis', 'Average Case', 'Algorithm Analysis', 'Probability', 'Expected Value']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/probabilistic-analysis
sidebar:
  order: 18
---

## 핵심 개념

확률적 분석은 입력에 대한 확률 분포를 활용하여 알고리즘의 전형적인(typical) 성능을 분석한다. 가능한 입력들에 대해 수행 시간의 기대값(expected value)을 계산하며, 이를 **평균적 경우 수행 시간(average-case running time)**이라 한다.

**확률적 분석의 전제 조건**:
- 입력의 분포에 대한 지식이나 합리적인 가정이 필요하다
- 흔히 "균일 무작위 순열(uniform random permutation)" 가정을 사용한다
- 입력 분포를 특성화할 수 없는 문제에는 적용할 수 없다

**확률적 분석과 무작위화 알고리즘의 구분**:
- **확률적 분석**: 입력이 특정 분포를 따른다고 **가정**하고 결정론적 알고리즘을 분석
  - "평균적 경우 수행 시간"이라 부름
  - 확률 분포가 입력에 있음
- **무작위화 알고리즘**: 알고리즘 자체가 난수를 사용하여 분포를 **부과**
  - "기대 수행 시간(expected running time)"이라 부름
  - 확률 분포가 알고리즘 내부에 있음
  - 어떤 특정 입력도 최악의 경우를 유발하지 않음

**주요 분석 도구**:
- 지시자 확률 변수: 복잡한 기대값 계산을 단순화
- 기대값의 선형성(linearity of expectation): 독립 여부와 관계없이 적용
- 조건부 확률과 전확률 법칙

**적용 분야**: 고용 문제, 생일 패러독스, 공과 상자 문제, 연속 앞면(streak) 문제, 온라인 고용 문제 등에서 알고리즘의 기대 성능을 분석하는 데 사용된다.

## 예시

고용 문제에서의 확률적 분석:

```
가정: n명의 후보자가 균일 무작위 순열로 도착

지시자 확률 변수 정의:
  X_i = I{i번째 후보가 고용됨}

각 후보의 고용 확률:
  Pr{i번째 후보가 고용됨} = 1/i
  (첫 i명 중 최고일 확률)

기대 고용 횟수:
  E[X] = E[sum(X_i)]
       = sum(E[X_i])        (기대값의 선형성)
       = sum(1/i, i=1..n)
       = H_n                 (조화급수)
       ~= ln n

결론: 평균적 고용 비용 = O(c_h * ln n)
```

공과 상자 문제 (Balls and Bins):
```
n개의 공을 b개의 상자에 무작위로 던질 때:
- 특정 상자에 떨어지는 공의 기대 개수: n/b
- 특정 상자에 처음 공이 들어가기까지 기대 시행 횟수: b
- 모든 상자에 최소 1개의 공이 들어가기까지: b * ln(b)
  (쿠폰 수집가 문제, coupon collector's problem)
```

## 관련 개념

- [Hiring Problem](/knowledge/algorithms/hiring-problem/) - 확률적 분석의 대표적 예제
- [Expected Value](/knowledge/algorithms/expected-value/) - 확률적 분석의 핵심 수학 도구
- [Indicator Random Variable](/knowledge/algorithms/indicator-random-variable/) - 기대값 계산을 단순화하는 기법
- [Randomized Algorithm](/knowledge/algorithms/randomized-algorithm/) - 확률적 분석과 대비되는 접근법
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/) - 확률적 분석과 상보적인 분석 방법
- [Birthday Paradox](/knowledge/algorithms/birthday-paradox/) - 확률적 분석의 흥미로운 응용 예시
