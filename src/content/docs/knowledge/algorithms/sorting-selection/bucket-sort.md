---
title: "버킷 정렬 (Bucket Sort)"
description: "버킷 정렬(Bucket Sort)은 입력이 [0, 1) 구간에서 균등 분포(uniform distribution)를 따른다고 가정하고, 입력을 n개의 동일 크기 버킷에 분배한 후 각 버킷을 개별 정렬하여 연결하는 정렬 알고리즘으로, 평균 O(n) 시간에 동작한다"
tags: ['Bucket Sort', 'Linear Time Sorting', 'Average Case', 'Uniform Distribution', 'Non Comparison Sort']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/bucket-sort
sidebar:
  order: 14
---

## 핵심 개념

버킷 정렬은 입력의 확률적 분포에 대한 가정을 활용하여 선형 시간을 달성한다.

```
BUCKET-SORT(A, n)
1  let B[0:n-1] be a new array
2  for i = 0 to n - 1
3      make B[i] an empty list
4  for i = 1 to n
5      insert A[i] into list B[floor(n * A[i])]
6  for i = 0 to n - 1
7      sort list B[i] with insertion sort
8  concatenate the lists B[0], B[1], ..., B[n-1] together in order
9  return the concatenated lists
```

**동작 원리**:
1. [0, 1) 구간을 n개의 동일 크기 부분 구간(버킷)으로 나눔: B[i]는 [i/n, (i+1)/n) 범위
2. 각 원소 A[i]를 해당하는 버킷 B[floor(n * A[i])]에 삽입
3. 각 버킷을 삽입 정렬로 정렬
4. 버킷 순서대로 연결하면 정렬 완료

**시간 복잡도 분석**:
- 버킷 분배 및 연결: O(n)
- 각 버킷의 정렬 비용 합: sum of O(n_i^2)
- n_i: 버킷 i에 들어간 원소 수 (이항 분포, p = 1/n)
- E[n_i^2] = Var[n_i] + E[n_i]^2 = (1 - 1/n) + 1 = 2 - 1/n
- **평균 시간: Theta(n) + n * O(2 - 1/n) = Theta(n)**
- **최악의 경우: Theta(n^2)** - 모든 원소가 같은 버킷에 들어갈 때

**최악의 경우 개선**: 각 버킷을 삽입 정렬 대신 병합 정렬이나 다른 O(n lg n) 알고리즘으로 정렬하면 최악의 경우를 O(n lg n)으로 개선하면서 평균 선형 시간을 유지할 수 있다.

입력이 균등 분포가 아니더라도, 버킷 크기의 제곱합이 n에 선형이면 버킷 정렬은 선형 시간에 동작한다.

## 예시

A = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68], n = 10:

```
버킷 분배:
B[0]: (비어있음)
B[1]: 0.17 -> 0.12
B[2]: 0.26 -> 0.21 -> 0.23
B[3]: 0.39
B[4]: (비어있음)
B[5]: (비어있음)
B[6]: 0.68
B[7]: 0.78 -> 0.72
B[8]: (비어있음)
B[9]: 0.94

각 버킷 정렬 후 연결:
[0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]
```

대부분의 버킷에 0~2개의 원소만 들어가므로 삽입 정렬 비용이 거의 O(1)이다.

## 관련 개념

- [계수 정렬 (Counting Sort)](/knowledge/algorithms/counting-sort/)
- [기수 정렬 (Radix Sort)](/knowledge/algorithms/radix-sort/)
- [비교 정렬 하한 (Comparison Sort Lower Bound)](/knowledge/algorithms/comparison-sort-lower-bound/)
- [삽입 정렬 (Insertion Sort)](/knowledge/algorithms/insertion-sort/)
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/)
