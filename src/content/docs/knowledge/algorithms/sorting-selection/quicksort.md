---
title: "Quicksort"
description: "퀵정렬(Quicksort)은 분할 정복(divide-and-conquer) 전략을 사용하여 배열을 피벗(pivot) 원소를 기준으로 분할한 후 재귀적으로 정렬하는 제자리(in-place) 비교 기반 정렬 알고리즘이다"
tags: ['Quicksort', 'Sorting', 'Divide And Conquer', 'In Place', 'Comparison Sort', 'Pivot']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/quicksort
sidebar:
  order: 8
---

## 핵심 개념

퀵정렬은 실무에서 가장 널리 사용되는 정렬 알고리즘 중 하나이다. 분할 정복의 세 단계:

1. **분할(Divide)**: PARTITION을 호출하여 A[p:r]을 피벗 A[q] 기준으로 두 부분으로 나눔
   - 저쪽(low side) A[p:q-1]: 피벗 이하의 원소들
   - 고쪽(high side) A[q+1:r]: 피벗 이상의 원소들
2. **정복(Conquer)**: A[p:q-1]과 A[q+1:r]을 재귀적으로 퀵정렬
3. **결합(Combine)**: 아무 작업 불필요 - 부분 배열들이 이미 정렬되어 있으므로 전체 배열도 정렬됨

```
QUICKSORT(A, p, r)
1  if p < r
2      // Partition the subarray around the pivot
3      q = PARTITION(A, p, r)
4      QUICKSORT(A, p, q - 1)    // recursively sort low side
5      QUICKSORT(A, q + 1, r)    // recursively sort high side
```

**시간 복잡도**:
- **최악의 경우: Theta(n^2)** - 매번 한쪽이 n-1개, 다른 쪽이 0개인 최대 불균형 분할 발생 시
  - 점화식: T(n) = T(n-1) + T(0) + Theta(n) = T(n-1) + Theta(n) -> Theta(n^2)
  - 이미 정렬된 배열에서 발생 가능
- **최선의 경우: Theta(n lg n)** - 매번 균등 분할
  - 점화식: T(n) = 2T(n/2) + Theta(n) -> Theta(n lg n)
- **기대 수행 시간: Theta(n lg n)** (무작위화 버전, 모든 원소가 다를 때)
- **공간 복잡도**: 재귀 스택 깊이에 비례 - 최악 Theta(n), 꼬리 재귀 최적화 시 Theta(lg n)

**핵심 관찰**: 9:1과 같은 불균형 분할도 재귀 트리 깊이가 Theta(lg n)이므로 O(n lg n) 시간을 유지한다. 상수 비율의 분할이면 충분하다. 퀵정렬의 숨겨진 상수 인자가 작아서 병합 정렬, 힙정렬보다 실제로 더 빠른 경우가 많다.

## 예시

A = [2, 8, 7, 1, 3, 5, 6, 4]를 퀵정렬 (피벗 = A[r] = 4):

1단계: PARTITION -> [2, 1, 3, | 4, | 7, 5, 6, 8], q = 4
2단계: QUICKSORT(A, 1, 3) 재귀 -> [1, 2, 3]
3단계: QUICKSORT(A, 5, 8) 재귀 -> [5, 6, 7, 8]
결과: [1, 2, 3, 4, 5, 6, 7, 8]

## 관련 개념

- [Partition](/knowledge/algorithms/partition/)
- [Randomized Quicksort](/knowledge/algorithms/randomized-quicksort/)
- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/)
- [Insertion Sort](/knowledge/algorithms/insertion-sort/)
- [Merge Sort](/knowledge/algorithms/merge-sort/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
- [Recurrence](/knowledge/algorithms/recurrence/)
