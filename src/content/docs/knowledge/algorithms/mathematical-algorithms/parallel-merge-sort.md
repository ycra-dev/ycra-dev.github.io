---
title: "Parallel Merge Sort"
description: "Parallel Merge Sort는 fork-join 병렬성을 활용하여 분할 정복 기반의 병합 정렬을 병렬화한 알고리즘으로, 재귀적 spawn을 통해 분할과 병합 과정을 동시에 수행한다"
tags: ['Parallel Merge Sort', 'Sorting', 'Divide And Conquer', 'Parallel Computing', 'Merge']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/parallel-merge-sort
sidebar:
  order: 20
---

## 핵심 개념

병합 정렬의 병렬화에서 핵심 과제는 **병합(merge)** 단계의 병렬화이다:

1. **단순 병렬화**: 두 재귀 호출을 spawn하면 분할은 병렬화되지만, 병합이 Θ(n)의 직렬 작업이므로 span이 Θ(n)이 된다.

2. **병렬 병합**: 두 정렬된 배열을 병렬로 병합하기 위해 분할 정복을 사용한다. 큰 배열의 중간 원소를 기준으로 작은 배열에서 이진 탐색하여 분할 지점을 찾고, 양쪽을 재귀적으로 병렬 병합한다.

병렬 병합의 복잡도:
- Work: Θ(n) (직렬 병합과 동일)
- Span: Θ(lg^2 n)

전체 병렬 병합 정렬의 복잡도:
- Work: T_1(n) = Θ(n lg n)
- Span: T_∞(n) = Θ(lg^3 n)
- Parallelism: Θ(n/lg^2 n)

이는 충분히 큰 n에 대해 상당한 수의 프로세서에서 효율적인 병렬화를 보장한다.

## 예시

병렬 병합의 기본 아이디어:
```
P-MERGE(A, B, C)
1  // A[1..n_a]와 B[1..n_b]를 C[1..n_a+n_b]로 병합
2  if n_a < n_b
3      exchange A with B  // A가 더 큰 배열이 되도록
4  if n_a == 0
5      return
6  mid_a = ⌊n_a / 2⌋
7  mid_b = BINARY-SEARCH(A[mid_a], B)  // 분할 지점
8  mid_c = mid_a + mid_b
9  C[mid_c] = A[mid_a]
10 spawn P-MERGE(A[1..mid_a-1], B[1..mid_b], C[1..mid_c-1])
11 P-MERGE(A[mid_a+1..n_a], B[mid_b+1..n_b], C[mid_c+1..n])
12 sync
```

병렬 병합 정렬:
```
P-MERGE-SORT(A, B, n)
1  if n == 1
2      B[1] = A[1]
3  else
4      let T be new array of size n
5      mid = ⌊n/2⌋
6      spawn P-MERGE-SORT(A[1..mid], T[1..mid], mid)
7      P-MERGE-SORT(A[mid+1..n], T[mid+1..n], n-mid)
8      sync
9      P-MERGE(T[1..mid], T[mid+1..n], B[1..n])
```

## 관련 개념

- [Fork-Join Parallelism](/knowledge/algorithms/fork-join-parallelism/) - 병렬 모델의 기반
- [Work](/knowledge/algorithms/work/) - Θ(n lg n)으로 직렬 병합 정렬과 동일
- [Span](/knowledge/algorithms/span/) - Θ(lg^3 n)으로 높은 병렬성 달성
- [Parallelism](/knowledge/algorithms/parallelism/) - Θ(n/lg^2 n)
- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/) - 분할 정복 패러다임의 병렬 적용
