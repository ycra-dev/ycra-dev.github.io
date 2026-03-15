---
title: "최소 비교 정렬 (Minimum-Comparison Sorting)"
description: "최소 비교 정렬(Minimum-Comparison Sorting)은 n개의 원소를 정렬하는 데 필요한 비교 횟수의 이론적 하한 S(n)을 연구하며, Ford-Johnson 알고리즘이 n≤11에서 최적이다"
tags: ["Minimum-Comparison Sorting", "Lower Bounds", "Information Theory", "TAOCP", "Comparison Tree", "Ford-Johnson"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/minimum-comparison-sorting
sidebar:
  order: 39
---

## 핵심 개념

최소 비교 정렬(Minimum-Comparison Sorting)은 n개의 원소를 정렬하는 데 필요한 비교 횟수의 이론적 하한과, 그 하한에 근접하는 알고리즘을 연구하는 분야다. **S(n)**은 n개 원소를 최악의 경우에 정렬하는 데 항상 충분한 최소 비교 횟수를 나타낸다.

## 동작 원리

**정보 이론적 하한**: n!가지 순열이 존재하므로 비교 트리의 외부 노드가 최소 n!개 필요. 따라서 `S(n) ≥ ⌈log₂(n!)⌉`

**알려진 정확한 값**:
- n ≤ 11일 때 S(n) = ⌈log₂ n!⌉ (Floyd-Knuth 증명 n≤8; Peczarski n≤11)
- **n = 12일 때 S(12) = 30 > ⌈log₂ 12!⌉ = 29** (Wells 증명)
  → 정보 이론적 하한이 항상 달성 가능하지 않음!

**병합 삽입(Merge Insertion, F(n))**: Ford-Johnson이 1959년 제안.

```
n:    1  2  3  4  5  6  7  8  9  10  11  12
F(n): 0  1  3  5  7  10 13 16 19  22  26  30
⌈log₂n!⌉: 0 1 3 5 7 10 13 16 19 22 26 29
```

n=12에서 처음으로 F(12) = 30 > ⌈log₂(12!)⌉ = 29

**비교 트리 구조**: 완전 이진 트리에 n! 외부 노드가 있을 때, 외부 경로 길이를 최소화하는 트리가 평균 비교 횟수를 최소화.

**S(n)과 Ŝ(n)의 관계**: 소팅 네트워크의 최소 비교자 수 Ŝ(n) ≥ S(n)이지만, n ≥ 5에서 Ŝ(n) > S(n).

## 예시

```
n=5의 경우:
log₂(5!) = log₂(120) ≈ 6.91, 따라서 하한 = 7
S(5) = 7 (Ford-Johnson 알고리즘으로 달성)

병합 삽입 알고리즘 (5원소):
1. R1:R2 비교 → 작은 것을 a₁, 큰 것을 b₁
2. R3:R4 비교 → 작은 것을 a₂, 큰 것을 b₂
3. b₁:b₂ 비교 → b₁ < b₂ 가정
4. a₂를 {a₁, b₁, b₂}에 이진 삽입 (2번 비교)
5. R5를 삽입 (2번 비교)
총 7번 비교로 완성 ✓
```

## 관련 개념

- [정렬 네트워크 (Sorting Networks)](/knowledge/algorithms/sorting-selection/sorting-networks/)
- [Merge Insertion (Ford-Johnson)](/knowledge/algorithms/sorting-selection/merge-insertion-ford-johnson/)
- [비교 기반 정렬 하한 (Comparison-Based Sorting Lower Bound)](/knowledge/algorithms/sorting-selection/comparison-based-sorting-lower-bound/)
- [정렬 복잡도 이론 (Sorting Complexity Theory)](/knowledge/algorithms/sorting-selection/sorting-complexity-theory/)
