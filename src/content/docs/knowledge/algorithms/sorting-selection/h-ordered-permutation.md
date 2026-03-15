---
title: "H-순서 순열 (H-ordered Permutation)"
description: "h-순서(h-ordered) 파일은 모든 i에 대해 K_i ≤ K_{i+h}를 만족하는 파일로, Shellsort의 핵심 불변 조건이다"
tags: ["H-ordered", "Shellsort", "Sorting", "TAOCP", "Permutations", "Gap Sequence"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/h-ordered-permutation
sidebar:
  order: 32
---

## 핵심 개념

순열 K_1, K_2, ..., K_N이 **h-순서(h-ordered)**라 함은 모든 i에 대해 K_i ≤ K_{i+h}를 만족하는 것이다. 즉, 간격 h만큼 떨어진 모든 쌍이 이미 정렬된 상태이다. Shellsort의 각 단계는 파일을 h-순서로 만들며, 이 구조가 이후 단계에서 유지된다.

## 동작 원리

**Theorem K (쉘 정렬의 핵심 정리)**: k-순서 파일을 h-정렬하면, 결과 파일은 여전히 k-순서이다.

이 정리의 의미: 한 번 h-정렬된 구조는 이후 다른 증분으로 정렬해도 파괴되지 않는다.

**증명 핵심 (Lemma L)**: m, n, r이 음이 아닌 정수이고 두 수열이 x_{m+j} ≥ y_j (1 ≤ j ≤ r)를 만족할 때, 각각 독립적으로 정렬해도 이 관계가 유지된다.

**h-순서 순열의 역위 수** (Theorem H, Hunt):
```
f(n, h) = (h-r)·C(q,2) + r·C(q+1,2) + h²·C(q,2)/2·...
여기서 q = n div h, r = n mod h
```

**두 번의 증분 (h, 1)의 최적화**:
- 최적 h ≈ N^(2/3)
- 이 경우 평균 이동 수 ∝ N^(5/3)
- 직접 삽입(O(N²))보다 실질적 개선

**서로소 증분의 중요성**:
- 8, 4, 2, 1 증분: 짝수/홀수 위치간 교류 없음 → 마지막 1-정렬이 많은 역위 처리
- 7, 5, 3, 1 증분: 충분한 혼합 → 마지막 1-정렬이 최대 2N 역위만 처리

**Pratt의 방법**: 증분 집합 {2^p·3^q | 2^p·3^q < N} 사용
- 최악 O(N·(log N)²) 보장

## 예시

```
h=3 순서 순열의 예:
위치:  1  2  3  4  5  6  7  8  9
값:    1  2  3  4  5  6  7  8  9  (완전 3-순서)
값:    1  4  7  2  5  8  3  6  9  (3-순서이지만 1-순서 아님)
       ↑         ↑         ↑      (K1<K4<K7)

Theorem K 예:
  3-정렬 후 [3-순서] → 2-정렬 → [여전히 3-순서이면서 2-순서]
  ∴ 마지막 1-정렬이 처리해야 할 역위 수가 크게 줄어듦
```

## 관련 개념

- [Shell's Method](/knowledge/algorithms/sorting-selection/shells-method/)
- [역순쌍 (Inversions)](/knowledge/algorithms/sorting-selection/inversions/)
- [직접 삽입 정렬 (Straight Insertion Sort)](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
