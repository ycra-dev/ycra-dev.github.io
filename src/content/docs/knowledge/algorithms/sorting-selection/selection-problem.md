---
title: "Selection Problem"
description: "선택 문제(Selection Problem)는 n개의 서로 다른 원소로 이루어진 집합에서 i번째로 작은 원소(i번째 순서 통계량)를 찾는 문제이다"
tags: ['Selection Problem', 'Order Statistic', 'Minimum', 'Maximum', 'Linear Time']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/selection-problem
sidebar:
  order: 15
---

## 핵심 개념

**순서 통계량(Order Statistic)**: n개 원소 집합의 i번째 순서 통계량은 i번째로 작은 원소이다.
- i = 1: 최솟값(minimum)
- i = n: 최댓값(maximum)
- i = floor((n+1)/2): 하위 중앙값(lower median)
- i = ceil((n+1)/2): 상위 중앙값(upper median)

**형식적 정의**:
- 입력: n개의 서로 다른 수의 집합 A와 정수 i (1 <= i <= n)
- 출력: A에서 정확히 i-1개의 다른 원소보다 큰 원소 x

**접근법들**:

1. **정렬 후 인덱싱**: 힙정렬이나 병합 정렬로 정렬 후 i번째 원소 -> O(n lg n)
   - 비교 정렬 하한에 의해 이 방법은 Omega(n lg n)

2. **최솟값/최댓값 찾기**: n - 1번의 비교로 충분 (최적)
   - 토너먼트 논증: 최솟값이 아닌 모든 원소는 최소 한 번은 져야 함 -> n-1번 비교 필수

3. **동시 최솟값/최댓값**: ceil(3n/2)-2번의 비교로 가능
   - 원소를 쌍으로 처리: 먼저 쌍 내에서 비교 -> 작은 것은 현재 최솟값과, 큰 것은 현재 최댓값과 비교
   - 원소 2개당 비교 3번 (개별 처리 시 2번 x 2 = 4번보다 효율적)

4. **RANDOMIZED-SELECT**: 기대 Theta(n) 시간 (최악 Theta(n^2))

5. **SELECT (median of medians)**: 최악의 경우에도 Theta(n) 시간

정렬 없이도 선형 시간에 선택 문제를 풀 수 있다는 것은 놀라운 결과이다. 비교 정렬의 Omega(n lg n) 하한이 선택 문제에는 적용되지 않는다 -- 선택 알고리즘은 모든 원소를 완전히 정렬하지 않고도 원하는 순서 통계량을 찾을 수 있기 때문이다.

## 예시

```
MINIMUM(A, n)
1  min = A[1]
2  for i = 2 to n
3      if min > A[i]
4          min = A[i]
5  return min
```

동시 최솟값/최댓값 (n=8):
```
A = [3, 7, 2, 9, 1, 5, 8, 4]

쌍 비교:       (3,7)->min=3,max=7  (2,9)->min=2,max=9
               (1,5)->min=1,max=5  (8,4)->min=4,max=8
현재 최솟값과:  3, 2->2, 1->1, 4->1  (3번 비교)
현재 최댓값과:  7, 9->9, 5->9, 8->9  (3번 비교)
총 비교: 4(쌍 내) + 3(최솟값) + 3(최댓값) = 10 = 3*floor(8/2) - 2
vs 개별 처리: 7 + 7 = 14번
```

## 관련 개념

- [Median](/knowledge/algorithms/median/)
- [Randomized Select](/knowledge/algorithms/randomized-select/)
- [Comparison Sort Lower Bound](/knowledge/algorithms/comparison-sort-lower-bound/)
- [Algorithm](/knowledge/algorithms/algorithm/)
- [Computational Problem](/knowledge/algorithms/computational-problem/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
