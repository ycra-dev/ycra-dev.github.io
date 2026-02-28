---
title: "Merge Insertion (Ford-Johnson Algorithm)"
description: "병합 삽입 정렬(Ford-Johnson Algorithm)은 n≤11에서 최적인 최소 비교 정렬 알고리즘으로, F(n)번의 비교로 ⌈log₂ n!⌉에 매우 근접한 성능을 달성한다"
tags: ["Merge Insertion", "Ford-Johnson", "Optimal Sorting", "Minimum Comparison", "TAOCP", "Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/merge-insertion-ford-johnson
sidebar:
  order: 43
---

## 핵심 개념

병합 삽입 정렬(Merge Insertion Sort, Ford-Johnson Algorithm)은 1959년 L. R. Ford Jr.와 S. M. Johnson이 제안한 최소 비교 정렬 알고리즘이다. **n ≤ 11에서 최적**이며, F(n)으로 표기되는 최악의 경우 비교 횟수가 ⌈log₂ n!⌉에 매우 근접한다.

## 동작 원리

**F(n) 알고리즘 구조**:

1. **쌍 비교**: ⌊n/2⌋쌍의 원소를 비교하여 각 쌍에서 큰 것(bᵢ)과 작은 것(aᵢ)을 결정
2. **재귀 정렬**: b₁, b₂, ..., b⌊n/2⌋을 재귀적으로 정렬 (F(⌊n/2⌋) 비교 사용)
3. **삽입 단계**: 나머지 원소들을 최적 순서로 이진 삽입
   - 삽입 순서: t₁=1, t₂=3, t₃=5, t₄=11, t₅=21, t₆=43, ... (Jacobsthal 수와 관련)
   - 각 원소를 이진 탐색으로 삽입할 때 필요한 비교 수를 최소화

**알려진 F(n) 값**:
```
n:    1  2  3  4  5  6  7  8  9  10  11  12
F(n): 0  1  3  5  7  10 13 16 19  22  26  30
⌈log₂n!⌉: 0 1 3 5 7 10 13 16 19 22 26 29
```
n=12에서 처음으로 **F(12) = 30 > ⌈log₂(12!)⌉ = 29**

**삽입 순서의 최적화**: 이진 탐색 시 비교 횟수는 ⌈log₂(정렬된 수열 길이 + 1)⌉이므로, 2^k - 1개를 삽입할 때마다 동일한 비교 수가 필요한 그룹을 묶어서 처리.

**n ≤ 11 최적성**: Floyd와 Knuth가 1964-1966년에 n ≤ 8에서, Peczarski가 2004-2007년에 n ≤ 11과 n = 22에서 F(n) = S(n) 증명.

## 예시

```
n=5 병합 삽입 (7번 비교):
초기: a₁ a₂ a₃ a₄ a₅

단계 1: a₁:a₂, a₃:a₄ (2번 비교)
  → b₁=max(a₁,a₂), a₁=min(a₁,a₂), b₂=max(a₃,a₄), a₂=min(a₃,a₄)
단계 2: b₁:b₂ (1번 비교)
  → b₁ ≤ b₂ 가정, 현재 체인: a₁ ≤ b₁ ≤ b₂, a₂ ≤ b₂
단계 3: a₂을 [a₁, b₁, b₂]에 이진 삽입 (2번 비교)
단계 4: a₅을 적절한 위치에 이진 삽입 (2번 비교)
총 7번 = S(5) = F(5) ✓
```

## 관련 개념

- [Minimum-Comparison Sorting](/knowledge/algorithms/sorting-selection/minimum-comparison-sorting/)
- [Binary Insertion Sort](/knowledge/algorithms/sorting-selection/binary-insertion-sort/)
- [Comparison-Based Sorting Lower Bound](/knowledge/algorithms/sorting-selection/comparison-based-sorting-lower-bound/)
