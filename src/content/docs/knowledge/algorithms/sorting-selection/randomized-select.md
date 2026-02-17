---
title: "Randomized Select"
description: "RANDOMIZED-SELECT는 퀵정렬의 분할 기법을 활용하되 한쪽 부분만 재귀하여 n개의 서로 다른 원소에서 i번째 순서 통계량을 기대 Theta(n) 시간에 찾는 무작위 분할-정복 알고리즘이다"
tags: ['Randomized Select', 'Selection', 'Randomized Algorithm', 'Expected Linear Time', 'Order Statistic']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/randomized-select
sidebar:
  order: 17
---

## 핵심 개념

RANDOMIZED-SELECT는 퀵정렬과 유사하지만 핵심적인 차이가 있다: 퀵정렬은 분할의 양쪽 모두를 재귀하지만, RANDOMIZED-SELECT는 원하는 원소가 있는 한쪽만 재귀한다.

```
RANDOMIZED-SELECT(A, p, r, i)
1   if p == r
2       return A[p]                 // 기저 사례: 원소 1개
3   q = RANDOMIZED-PARTITION(A, p, r)
4   k = q - p + 1                  // 저쪽 원소 수 + 피벗
5   if i == k
6       return A[q]                // 피벗이 답
7   elseif i < k
8       return RANDOMIZED-SELECT(A, p, q-1, i)      // 저쪽에서 탐색
9   else return RANDOMIZED-SELECT(A, q+1, r, i-k)   // 고쪽에서 탐색
```

**시간 복잡도**:
- **최악의 경우: Theta(n^2)** - 매번 최대/최소 원소가 피벗이 되어 한 원소만 제거
- **기대 수행 시간: Theta(n)** (Theorem 9.2)

**기대 선형 시간의 직관적 이해**:
- 피벗이 "중간 절반(middle half)"에 떨어지면 "도움되는 분할(helpful partitioning)"
- 도움되는 분할: 남은 원소가 3/4 이하로 감소
- 무작위 피벗이 중간 절반에 들어갈 확률 >= 1/2 (Lemma 9.1)
- 기하 분포에 의해 평균 2번 시도면 도움되는 분할 발생

**엄밀한 증명 (Theorem 9.2)**:
- 분할을 "세대(generation)"로 구분: 도움되는 분할에서 다음 도움되는 분할까지가 한 세대
- k번째 도움되는 분할 후 남은 원소 수 n_k <= (3/4)^k * n_0
- 세대 k의 각 분할 비용 < n_k <= (3/4)^k * n
- 세대 k의 분할 횟수 X_k의 기대값 E[X_k] <= 2
- 총 기대 비교 수 < sum_k (3/4)^k * n * E[X_k] <= 2n * sum_k (3/4)^k = 2n * 4 = 8n
- **따라서 기대 수행 시간 = O(n)**, 하한 Omega(n)과 합쳐 **Theta(n)**

RANDOMIZED-SELECT는 RANDOMIZED-QUICKSORT의 RANDOMIZED-PARTITION을 재사용하므로 구현이 간결하다. 무작위화 덕분에 특정 입력이 최악의 경우를 유발하지 않는다. 실용적으로 SELECT보다 더 많이 사용되며, 상수 인자가 훨씬 작다.

## 예시

A = [6, 10, 13, 5, 8, 3, 2, 11]에서 i = 3 (3번째로 작은 원소) 찾기:

```
1단계: RANDOMIZED-PARTITION -> 피벗=8
       [6, 5, 3, 2, | 8, | 13, 10, 11], q=5, k=5
       i=3 < k=5 -> 저쪽 [6, 5, 3, 2]에서 3번째 원소 탐색

2단계: RANDOMIZED-PARTITION -> 피벗=5
       [3, 2, | 5, | 6], q=3, k=3
       i=3 == k=3 -> A[q]=5가 답!

결과: 3번째로 작은 원소 = 5
```

## 관련 개념

- [Selection Problem](/knowledge/algorithms/selection-problem/)
- [Median](/knowledge/algorithms/median/)
- [Randomized Quicksort](/knowledge/algorithms/randomized-quicksort/)
- [Partition](/knowledge/algorithms/partition/)
- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/)
- [Quicksort](/knowledge/algorithms/quicksort/)
- [Algorithm](/knowledge/algorithms/algorithm/)
