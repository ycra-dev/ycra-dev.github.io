---
title: "중앙값 (Median)"
description: "중앙값(Median)은 n개 원소 집합의 \"중간점\"으로, n이 홀수이면 i = (n+1)/2번째 원소이고, n이 짝수이면 하위 중앙값(i = n/2)과 상위 중앙값(i = n/2 + 1) 두 개가 존재한다"
tags: ['Median', 'Order Statistic', 'Selection', 'Linear Time', 'Median Of Medians']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/median
sidebar:
  order: 16
---

## 핵심 개념

중앙값은 선택 문제의 중요한 특수 경우이며, 통계학과 알고리즘 설계 모두에서 핵심적인 역할을 한다.

**중앙값 찾기 알고리즘**:

1. **정렬 기반**: O(n lg n) - 정렬 후 가운데 원소 반환
2. **RANDOMIZED-SELECT**: 기대 Theta(n) 시간
3. **SELECT (Median of Medians)**: 최악의 경우 Theta(n) 시간

**SELECT 알고리즘 (Blum, Floyd, Pratt, Rivest, Tarjan)**:
1. 원소를 5개씩 그룹으로 나눔 (g = n/5 그룹)
2. 각 그룹의 중앙값을 구함 (삽입 정렬, O(1)/그룹)
3. g개의 그룹 중앙값의 중앙값 x를 재귀적으로 구함 (피벗)
4. x를 기준으로 분할(partition)
5. 원하는 순서 통계량이 있는 쪽에서 재귀

```
SELECT(A, p, r, i)
// ... (전처리: n을 5의 배수로 조정)
11  g = (r - p + 1)/5
12  for j = p to p + g - 1          // 각 5원소 그룹 정렬
13      sort group in place
16  x = SELECT(A, p+2g, p+3g-1, ceil(g/2))  // 그룹 중앙값의 중앙값
17  q = PARTITION-AROUND(A, p, r, x)          // 피벗 기준 분할
// ... (재귀)
```

**핵심 보장**: 피벗 x는 최소 3g/2개 원소 이상이고, 최소 3g/2개 원소 이하이다. 따라서 분할의 각 쪽은 최대 7n/10개 원소를 가짐.

**시간 복잡도 (Theorem 9.3)**:
- 점화식: T(n) <= T(n/5) + T(7n/10) + Theta(n)
- n/5 + 7n/10 = 9n/10 < n이므로
- **T(n) = O(n)** -> 전체 Theta(n)

SELECT는 이론적으로 흥미로운 알고리즘이지만, 상수 인자가 크기 때문에 실용적으로는 RANDOMIZED-SELECT가 더 많이 사용된다. 중앙값의 정확한 비교 횟수 하한은 여전히 미해결 문제이며, 현재 알려진 범위는 (2+epsilon)n ~ 2.95n이다.

## 예시

15개 원소에서 SELECT로 중앙값(8번째 원소) 찾기:

```
A = [12, 3, 7, 19, 26, 4, 15, 1, 8, 22, 11, 6, 14, 9, 20]

그룹 나누기 (5개씩):
  G1: [12, 3, 7, 19, 26] -> 정렬: [3, 7, 12, 19, 26] -> 중앙값: 12
  G2: [4, 15, 1, 8, 22]  -> 정렬: [1, 4, 8, 15, 22] -> 중앙값: 8
  G3: [11, 6, 14, 9, 20] -> 정렬: [6, 9, 11, 14, 20] -> 중앙값: 11

그룹 중앙값의 중앙값: median({12, 8, 11}) = 11 -> 피벗 x = 11
PARTITION around 11: [3, 7, 4, 1, 8, 6, 9 | 11 | 12, 19, 26, 15, 22, 14, 20]
                     저쪽(7개)    피벗     고쪽(7개)

8번째 원소를 찾으므로 k=8 -> 피벗 자체가 답: 11
```

## 관련 개념

- [선택 문제 (Selection Problem)](/knowledge/algorithms/selection-problem/)
- [랜덤 선택 (Randomized Select)](/knowledge/algorithms/randomized-select/)
- [퀵 정렬 (Quicksort)](/knowledge/algorithms/quicksort/)
- [분할 (Partition)](/knowledge/algorithms/partition/)
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/)
- [점화식 (Recurrence)](/knowledge/algorithms/recurrence/)
