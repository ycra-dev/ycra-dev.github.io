---
title: "Binary Search"
description: "이진 탐색(Binary Search)은 정렬된 리스트에서 중간 원소와 비교하여 탐색 범위를 반씩 줄여나가는 탐색 알고리즘이다"
tags: ['Binary Search', 'Searching Algorithm', 'Divide And Conquer', 'Logarithmic Complexity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/binary-search
sidebar:
  order: 27
---

## 핵심 개념

이진 탐색은 리스트가 오름차순으로 정렬되어 있을 때 사용할 수 있는 매우 효율적인 탐색 알고리즘이다. 분할 정복(divide and conquer) 전략의 대표적 사례이다.

**동작 원리:**
1. 리스트의 중간 원소 a_m (m = ⌊(i+j)/2⌋)과 목표값 x를 비교한다.
2. x > a_m이면, 탐색 범위를 리스트의 후반부(a_{m+1}, ..., a_j)로 축소한다.
3. x <= a_m이면, 탐색 범위를 리스트의 전반부(a_i, ..., a_m)로 축소한다.
4. 탐색 범위에 원소가 하나만 남을 때까지 반복한다.
5. 남은 원소가 x와 같으면 위치를 반환, 아니면 0을 반환한다.

**시간 복잡도 분석:**
n = 2^k개의 원소가 있을 때, 각 단계에서 리스트 크기가 절반으로 줄어든다:
- 1단계: 2^k → 2^(k-1)
- 2단계: 2^(k-1) → 2^(k-2)
- ...
- k단계: 2^1 → 2^0 = 1

총 최대 2k + 2 = 2log(n) + 2번의 비교가 필요하므로, 최악의 경우 Θ(log n)이다. 이는 선형 탐색의 Θ(n)보다 훨씬 효율적이다.

**선형 탐색과의 비교:**
n = 1,000,000일 때:
- 선형 탐색: 최대 약 1,000,000번 비교
- 이진 탐색: 최대 약 40번 비교 (2 × log₂(1,000,000) + 2 ≈ 42)

## 예시

의사코드:

```
procedure binary_search(x: integer, a1, a2, ..., an: increasing integers)
  i := 1
  j := n
  while i < j
    m := floor((i + j) / 2)
    if x > am then i := m + 1
    else j := m
  if x = ai then location := i
  else location := 0
  return location
```

리스트 [1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 15, 16, 18, 19, 20, 22]에서 19를 탐색:

1. 전체 리스트(16개), 중간값 = a8 = 10. 19 > 10 → 후반부 [12,13,15,16,18,19,20,22]
2. 8개 원소, 중간값 = a12 = 16. 19 > 16 → 후반부 [18,19,20,22]
3. 4개 원소, 중간값 = a14 = 19. 19 <= 19 → 전반부 [18,19]
4. 2개 원소, 중간값 = a13 = 18. 19 > 18 → 후반부 [19]
5. 1개 원소, a14 = 19 = x → location = 14 반환

## 관련 개념

- [Algorithm](/knowledge/algorithms/algorithm/) - 알고리즘의 기본 개념
- [Linear Search](/knowledge/algorithms/linear-search/) - 선형 탐색과의 비교
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - 복잡도 O(log n) 표기
- [Time Complexity](/knowledge/algorithms/time-complexity/) - 로그 시간 복잡도
- [Sorting Algorithm](/knowledge/algorithms/sorting-algorithm/) - 이진 탐색을 위해 필요한 전제 조건
