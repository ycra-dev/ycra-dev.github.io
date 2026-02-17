---
title: "Randomized Quicksort"
description: "무작위 퀵정렬(Randomized Quicksort)은 피벗을 무작위로 선택하여 어떤 특정 입력에서도 최악의 경우가 유발되지 않도록 한 퀵정렬의 변형으로, 모든 원소가 서로 다를 때 기대 수행 시간 O(n lg n)을 보장한다"
tags: ['Randomized Quicksort', 'Quicksort', 'Randomized Algorithm', 'Expected Time', 'Pivot']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/randomized-quicksort
sidebar:
  order: 10
---

## 핵심 개념

표준 PARTITION은 항상 A[r]을 피벗으로 선택하기 때문에, 이미 정렬된 배열 등 특정 입력 패턴에서 Theta(n^2) 최악의 경우가 발생한다. 무작위 퀵정렬은 이를 해결한다.

```
RANDOMIZED-PARTITION(A, p, r)
1  i = RANDOM(p, r)        // p~r 사이에서 균등하게 무작위 선택
2  exchange A[r] with A[i]  // 무작위 원소를 피벗 위치로
3  return PARTITION(A, p, r)

RANDOMIZED-QUICKSORT(A, p, r)
1  if p < r
2      q = RANDOMIZED-PARTITION(A, p, r)
3      RANDOMIZED-QUICKSORT(A, p, q - 1)
4      RANDOMIZED-QUICKSORT(A, q + 1, r)
```

**기대 수행 시간 분석 (Theorem 7.4)**:

핵심 아이디어: 전체 비교 횟수 X를 분석한다.

정렬된 원소를 z_1 < z_2 < ... < z_n이라 하면:
- z_i와 z_j(i < j)가 비교될 확률 = 2/(j - i + 1)
  (Lemma 7.3: Z_ij = {z_i, ..., z_j} 중에서 z_i 또는 z_j가 첫 번째 피벗으로 선택될 때만 비교)
- 두 원소는 최대 한 번만 비교됨 (Lemma 7.2)

기대 비교 횟수:
```
E[X] = sum_{i=1}^{n-1} sum_{j=i+1}^{n} 2/(j-i+1)
     = sum_{i=1}^{n-1} sum_{k=1}^{n-i} 2/(k+1)    (k = j-i 치환)
     < sum_{i=1}^{n-1} sum_{k=1}^{n} 2/k
     = sum_{i=1}^{n-1} O(lg n)
     = O(n lg n)
```

Lemma 7.1에 의해 수행 시간 = O(n + X)이므로, **기대 수행 시간 = O(n lg n)**.
최선의 경우 Theta(n lg n)과 합쳐 **기대 수행 시간 = Theta(n lg n)**.

**최악의 경우는 여전히 Theta(n^2)이지만**, 무작위화 덕분에 어떤 특정 입력이 항상 최악의 경우를 유발하지는 않는다. 많은 소프트웨어 라이브러리가 대규모 데이터 정렬에 무작위 퀵정렬을 선택한다.

## 예시

A = [1, 2, 3, 4, 5] (이미 정렬된 배열):
- 표준 QUICKSORT: 항상 A[r]이 최댓값 -> Theta(n^2) 최악의 경우
- RANDOMIZED-QUICKSORT: 피벗이 무작위 -> 평균적으로 균형 잡힌 분할 기대

RANDOM(1, 5)이 3을 반환하면:
- A[5]와 A[3] 교환 -> [1, 2, 5, 4, 3]
- PARTITION 실행 -> 피벗 3 기준으로 [1, 2 | 3 | 5, 4]
- 2:2의 균형 잡힌 분할 달성

## 관련 개념

- [Quicksort](/knowledge/algorithms/quicksort/)
- [Partition](/knowledge/algorithms/partition/)
- [Algorithm](/knowledge/algorithms/algorithm/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
- [Asymptotic Notation](/knowledge/algorithms/asymptotic-notation/)
- [Randomized Select](/knowledge/algorithms/randomized-select/)
