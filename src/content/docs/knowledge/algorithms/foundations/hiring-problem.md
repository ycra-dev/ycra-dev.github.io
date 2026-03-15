---
title: "고용 문제 (Hiring Problem)"
description: "고용 문제(Hiring Problem)는 n명의 후보자를 순서대로 면접하면서, 현재까지의 최고 후보보다 더 나은 후보를 만나면 반드시 고용하는 전략의 비용을 분석하는 문제로, 확률적 분석과 무작위화 알고리즘의 핵심 개념을 설명하는 모델 문제이다"
tags: ['Hiring Problem', 'Probabilistic Analysis', 'Algorithm Analysis', 'Expected Value']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/hiring-problem
sidebar:
  order: 20
---

## 핵심 개념

고용 문제는 순차적으로 최대값(또는 최소값)을 갱신하는 알고리즘의 일반적 패러다임을 모델링한다. 비용 모델은 면접 비용 c_i와 고용 비용 c_h로 구성되며, 총 비용은 O(c_i * n + c_h * m)이다 (m = 고용 횟수).

**최악의 경우 분석**: 후보자가 품질의 오름차순으로 오면 매번 고용이 발생하여 m = n, 총 고용 비용 O(c_h * n)이 된다.

**확률적 분석**: 후보자가 무작위 순서(균일 무작위 순열)로 오면, 지시자 확률 변수를 사용하여 기대 고용 횟수를 분석할 수 있다:
- X_i = I{i번째 후보가 고용됨}
- i번째 후보가 고용될 확률 = 1/i (첫 i명 중 최고일 확률)
- E[X] = sum(1/i, i=1..n) = H_n ~= ln n (조화급수)
- 평균적 고용 비용: O(c_h * ln n)

**무작위화 버전 (RANDOMIZED-HIRE-ASSISTANT)**: 면접 전에 후보자 목록을 무작위 순열로 변환하면, 입력의 분포에 대한 가정 없이도 기대 고용 비용 O(c_h * ln n)을 보장할 수 있다.

**확률적 분석 vs 무작위화 알고리즘의 핵심 차이점**:
- 확률적 분석 (Lemma 5.2): 입력에 대한 가정이 필요 -> "평균적 경우(average-case)" 비용
- 무작위화 알고리즘 (Lemma 5.3): 입력에 대한 가정 불필요 -> "기대(expected)" 비용
- 무작위화에서는 어떤 특정 입력도 최악의 경우를 유발하지 않음

## 예시

HIRE-ASSISTANT 의사코드:
```
HIRE-ASSISTANT(n)
  best = 0          // 더미 후보 (가장 낮은 품질)
  for i = 1 to n
    interview candidate i
    if candidate i is better than candidate best
      best = i
      hire candidate i
```

구체적 예시 (n=10):
```
순위 리스트 A1 = <1,2,3,4,5,6,7,8,9,10>  -> 10번 고용 (최악)
순위 리스트 A2 = <10,9,8,7,6,5,4,3,2,1>  -> 1번 고용 (최선)
순위 리스트 A3 = <5,2,1,8,4,7,10,9,3,6>  -> 3번 고용 (5,8,10)

기대 고용 횟수 ~= ln(10) ~= 2.3번
```

무작위화 버전:
```
RANDOMIZED-HIRE-ASSISTANT(n)
  randomly permute the list of candidates
  HIRE-ASSISTANT(n)
```

## 관련 개념

- [확률적 분석 (Probabilistic Analysis)](/knowledge/algorithms/probabilistic-analysis/) - 고용 문제에 적용되는 분석 기법
- [지시 확률 변수 (Indicator Random Variable)](/knowledge/algorithms/indicator-random-variable/) - 고용 횟수의 기대값 계산에 사용
- [랜덤 알고리즘 (Randomized Algorithm)](/knowledge/algorithms/randomized-algorithm/) - 고용 문제의 무작위화 버전
- [기대값 (Expected Value)](/knowledge/algorithms/expected-value/) - 기대 고용 비용 O(c_h * ln n)
- [최악의 경우 분석 (Worst-Case Analysis)](/knowledge/algorithms/worst-case-analysis/) - 최악의 경우 O(c_h * n)과의 비교
- [루프 불변량 (Loop Invariant)](/knowledge/algorithms/loop-invariant/) - RANDOMLY-PERMUTE의 정당성 증명에 사용
