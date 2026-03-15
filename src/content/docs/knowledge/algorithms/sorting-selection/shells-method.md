---
title: "셸 정렬 (Shellsort)"
description: "쉘 정렬(Shellsort)은 증분(increment) 수열을 사용하여 각 단계에서 간격 h만큼 떨어진 원소들끼리 삽입 정렬하는 방법으로, D. L. Shell이 1959년 제안했다"
tags: ["Shellsort", "Shell's Method", "Sorting", "TAOCP", "Diminishing Increment", "Gap Sequence"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/shells-method
sidebar:
  order: 29
---

## 핵심 개념

**쉘 정렬(Shell's Method / Shellsort)**은 직접 삽입 정렬의 개선판으로, 증분(increment) 수열 h_{t-1} > h_{t-2} > ... > h_1 > h_0 = 1을 사용하여, 각 단계에서 간격 h_s만큼 떨어진 원소들끼리만 삽입 정렬하는 방법이다. D. L. Shell이 1959년 제안했다.

## 동작 원리

**Algorithm D (Diminishing Increment Sort)**:
각 증분 h_s (s = t-1, t-2, ..., 0)에 대해:
- 파일을 간격 h_s로 이루어진 h_s개의 부분 파일로 나눔
- 각 부분 파일에 직접 삽입 정렬 적용
- 마지막 단계는 h_0 = 1로 전체 파일 정렬

**h-순서(h-ordered)**: 모든 i에 대해 K_i ≤ K_{i+h}인 파일. h-정렬 후 파일은 h-순서가 된다.

**Theorem K (핵심 정리)**: k-순서 파일을 h-정렬하면, 결과는 여전히 k-순서이다.
→ 이전 단계의 정렬 결과가 이후 단계에서도 유지된다!

**시간 복잡도**:
- 두 번의 증분 (h, 1): 평균 O(N^{5/3})
- 증분 h_s = 2^s - 1 사용 시: 최악 O(N^{3/2}) (Papernov-Stasevich)
- Pratt의 증분 {2^p · 3^q}: O(N · (log N)²)
- Sedgewick의 증분 수열: 최악 O(N^{4/3})

**최적 증분 수열**:
- 실용적 N(≤1000): 1, 3, 7, 21, 48, 112, ... (ρ ≈ 2.5)
- 대형 N: Sedgewick 수열 (1, 5, 19, 41, 109, 209, ...)
- Knuth 권장: 1, 4, 13, 40, ... (h_k = 3h_{k-1} + 1)

**증분 선택 원칙**:
- 각 증분이 이전 증분들 전체를 나누면 안 됨 (나누면 O(N²) 최악)
- 서로소인 증분이 좋음
- ρ = h_{s+1}/h_s ≈ 2~3 정도가 실용적으로 우수

## 예시

```python
def shellsort(a, increments=None):
    n = len(a)
    if increments is None:
        # Knuth의 증분 수열: 1, 4, 13, 40, ...
        h = 1
        increments = []
        while h < n:
            increments.append(h)
            h = 3 * h + 1
        increments.reverse()

    for h in increments:
        # h-간격 삽입 정렬
        for i in range(h, n):
            key = a[i]
            j = i - h
            while j >= 0 and a[j] > key:
                a[j + h] = a[j]
                j -= h
            a[j + h] = key
    return a

# 예 (증분 5, 1):
# 원본: [8, 5, 2, 6, 3, 7, 4, 1]
# 5-정렬: [7, 4, 1, 6, 3, 8, 5, 2] → 5-순서
# 1-정렬: [1, 2, 3, 4, 5, 6, 7, 8]
```

## 관련 개념

- [직접 삽입 정렬 (Straight Insertion Sort)](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [H-순서 순열 (H-ordered Permutation)](/knowledge/algorithms/sorting-selection/h-ordered-permutation/)
- [역순쌍 (Inversions)](/knowledge/algorithms/sorting-selection/inversions/)
- [삽입 정렬 (Insertion Sort)](/knowledge/algorithms/insertion-sort/)
