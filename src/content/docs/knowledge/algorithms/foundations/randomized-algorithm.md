---
title: "랜덤 알고리즘 (Randomized Algorithm)"
description: "무작위화 알고리즘(Randomized Algorithm)은 입력뿐만 아니라 난수 생성기(random-number generator)가 생성하는 값에 의해서도 동작이 결정되는 알고리즘으로, 동일한 입력에 대해서도 실행할 때마다 다른 동작과 결과를 보일 수 있다"
tags: ['Randomized Algorithm', 'Random Number Generator', 'Expected Running Time', 'Probability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/randomized-algorithm
sidebar:
  order: 19
---

## 핵심 개념

무작위화 알고리즘의 핵심 특징은 **어떤 특정 입력도 최악의 경우를 항상 유발하지 않는다**는 것이다. 최악의 경우는 "불운한" 난수 선택에 의해서만 발생하며, 이는 적대적 입력에 의해 유발되지 않는다.

**난수 생성기 (RANDOM)**:
- RANDOM(a, b): a 이상 b 이하의 정수를 균등 확률로 반환
- 각 호출은 이전 호출과 독립적
- 실제로는 의사 난수 생성기(pseudorandom-number generator)를 사용

**확률적 분석과의 핵심 차이**:
- 확률적 분석: 입력이 특정 분포를 따른다고 **가정** -> 평균적 경우(average-case) 분석
- 무작위화 알고리즘: 분포를 알고리즘이 **부과** -> 기대 수행 시간(expected running time) 분석

**무작위 순열 생성 (RANDOMLY-PERMUTE)**:
균일 무작위 순열(uniform random permutation)을 in-place로 생성하는 알고리즘:
- i번째 반복에서 A[i]를 A[i..n] 중 무작위 원소와 교환
- Theta(n) 시간에 수행
- 루프 불변식과 k-순열의 확률 (n-i+1)!/n!를 이용하여 정당성 증명

**장점**:
- 적대적 입력에 대한 강건성: 어떤 적도 나쁜 입력을 만들어낼 수 없음
- 단순성: 종종 가장 간단하고 효율적인 해법을 제공
- 범용성: 입력 분포에 대한 가정이 불필요

**온라인 고용 문제 (Secretary Problem)**:
첫 k = n/e명을 면접 후 거절하고, 이후 처음으로 이전 최고보다 나은 후보를 선택하면, 최고 후보를 선택할 확률이 최소 1/e (~36.8%)이 된다.

## 예시

무작위 순열 생성:
```
RANDOMLY-PERMUTE(A, n)
  for i = 1 to n
    swap A[i] with A[RANDOM(i, n)]
```

정당성 증명 (루프 불변식):
```
i번째 반복 직전에, 가능한 모든 (i-1)-순열에 대해
A[1:i-1]이 해당 순열을 포함할 확률 = (n-i+1)!/n!

종료 시 (i = n+1):
A[1:n]이 특정 n-순열일 확률 = 0!/n! = 1/n!
-> 균일 무작위 순열
```

무작위화 고용 알고리즘:
```
RANDOMIZED-HIRE-ASSISTANT(n)
  randomly permute the list of candidates
  HIRE-ASSISTANT(n)

기대 고용 비용 = O(c_h * ln n)
(어떤 입력에 대해서든 동일한 기대치)
```

온라인 고용 문제:
```
ONLINE-MAXIMUM(k, n)
  best-score = -infinity
  for i = 1 to k              // 첫 k명 면접 후 거절
    if score(i) > best-score
      best-score = score(i)
  for i = k+1 to n            // 이후 최초의 최고 후보 선택
    if score(i) > best-score
      return i
  return n

최적 k = n/e 일 때 성공 확률 >= 1/e ~= 0.368
```

## 관련 개념

- [확률적 분석 (Probabilistic Analysis)](/knowledge/algorithms/probabilistic-analysis/) - 무작위화 알고리즘과 대비되는 분석 기법
- [고용 문제 (Hiring Problem)](/knowledge/algorithms/hiring-problem/) - 무작위화 알고리즘의 동기가 되는 모델 문제
- [기대값 (Expected Value)](/knowledge/algorithms/expected-value/) - 무작위화 알고리즘의 성능 측정에 사용
- [지시 확률 변수 (Indicator Random Variable)](/knowledge/algorithms/indicator-random-variable/) - 기대 수행 시간 분석의 핵심 도구
- [루프 불변량 (Loop Invariant)](/knowledge/algorithms/loop-invariant/) - RANDOMLY-PERMUTE의 정당성 증명에 사용
- [정확성 (Correctness)](/knowledge/algorithms/correctness/) - 무작위화 알고리즘의 정당성 보장 방법
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 무작위화는 알고리즘 설계의 중요한 패러다임
