---
title: "Merge Sort"
description: "병합 정렬(Merge Sort)은 리스트를 반으로 나누어 각각을 재귀적으로 정렬한 후, 두 정렬된 리스트를 하나의 정렬된 리스트로 병합(merge)하는 분할 정복(divide and conquer) 기반의 재귀적 정렬 알고리즘이다"
tags: ['Merge Sort', 'Sorting Algorithm', 'Divide And Conquer', 'Recursive Algorithm', 'Complexity Analysis']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/merge-sort
sidebar:
  order: 9
---

## 핵심 개념

### 알고리즘 구조

병합 정렬은 세 단계로 구성된다:

1. **분할 (Divide)**: 리스트를 거의 같은 크기의 두 부분 리스트로 분할
2. **정복 (Conquer)**: 각 부분 리스트를 재귀적으로 병합 정렬
3. **병합 (Merge)**: 두 정렬된 부분 리스트를 하나의 정렬된 리스트로 합침

분할은 각 부분 리스트가 원소 하나만 포함할 때까지 계속되며, 원소 하나짜리 리스트는 이미 정렬된 상태이다.

### 병합 과정

두 정렬된 리스트 L1(m개 원소)과 L2(n개 원소)를 병합할 때:
- 양 리스트의 가장 작은 원소를 비교
- 더 작은 원소를 결과 리스트 끝에 추가하고 해당 리스트에서 제거
- 한 리스트가 빌 때까지 반복
- 나머지 리스트의 원소를 모두 결과에 추가

**Lemma**: m개와 n개 원소의 정렬된 리스트를 병합하는 데 최대 m + n - 1번의 비교가 필요하다.

### 복잡도 분석

n = 2^m (2의 거듭제곱)인 경우를 분석한다:
- 레벨 k에서 레벨 k-1로의 병합: 2^(k-1)번의 병합, 각각 최대 2^(m-k+1) - 1번 비교
- 레벨 k에서의 총 비교 횟수: 2^(k-1) * (2^(m-k+1) - 1)

전체 비교 횟수:
```
Σ(k=1 to m) 2^(k-1)(2^(m-k+1) - 1) = m * 2^m - (2^m - 1) = n log n - n + 1
```

따라서 병합 정렬의 시간 복잡도는 **O(n log n)** 이다.

이것은 비교 기반 정렬 알고리즘의 최적 복잡도이다. 즉, 어떤 비교 기반 정렬 알고리즘도 최악의 경우 O(n log n)보다 빠를 수 없다.

## 예시

**예시 1: 리스트 [8, 2, 4, 6, 9, 7, 10, 1, 5, 3] 정렬**

분할 과정 (이진 트리 형태):
```
[8, 2, 4, 6, 9, 7, 10, 1, 5, 3]
         ↙                ↘
[8, 2, 4, 6, 9]     [7, 10, 1, 5, 3]
   ↙       ↘            ↙        ↘
[8, 2, 4] [6, 9]  [7, 10, 1] [5, 3]
  ↙   ↘              ↙    ↘
[8, 2] [4]       [7, 10]  [1]  [5] [3]
↙  ↘              ↙  ↘
[8] [2]          [7] [10]
```

병합 과정 (아래에서 위로):
```
[2, 8] → [2, 4, 8] → [2, 4, 6, 8, 9]
[6, 9]                                  → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[7, 10] → [1, 7, 10] → [1, 3, 5, 7, 10]
[3, 5]
```

**예시 2: 두 리스트 [2, 3, 5, 6]과 [1, 4]의 병합**

| 비교 | 결과 리스트 |
|------|-------------|
| 1 < 2 | [1] |
| 2 < 4 | [1, 2] |
| 3 < 4 | [1, 2, 3] |
| 4 < 5 | [1, 2, 3, 4] |
| (2번째 리스트 비어있음) | [1, 2, 3, 4, 5, 6] |

비교 횟수: 4회 (최대 m+n-1 = 4+2-1 = 5)

**의사코드 (Pseudocode):**

```
procedure mergesort(L = a1, ..., an)
  if n > 1 then
    m := floor(n/2)
    L1 := a1, a2, ..., am
    L2 := am+1, am+2, ..., an
    L := merge(mergesort(L1), mergesort(L2))
```

## 관련 개념

- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - 병합 정렬은 대표적인 재귀 알고리즘
- [Algorithm](/knowledge/algorithms/algorithm/) - 정렬 알고리즘의 한 종류
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - 병합 정렬의 복잡도는 O(n log n)으로 표현
- [Complexity](/knowledge/algorithms/time-complexity/) - 비교 기반 정렬의 최적 복잡도 달성
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 병합 정렬의 정확성 증명에 사용
- [Sequence](/knowledge/mathematics/sequence/) - 정렬 대상인 수열/리스트
