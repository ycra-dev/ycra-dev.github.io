---
title: "계수 정렬 (Counting Sort)"
description: "계수 정렬(Counting Sort)은 각 입력 원소가 0부터 k까지의 정수라고 가정하고, 각 값의 출현 횟수를 세어 원소를 직접 올바른 위치에 배치하는 비비교 기반의 안정적(stable) 선형 시간 정렬 알고리즘이다"
tags: ['Counting Sort', 'Linear Time Sorting', 'Stable Sort', 'Non Comparison Sort', 'Integer Sorting']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/counting-sort
sidebar:
  order: 12
---

## 핵심 개념

계수 정렬은 비교 정렬의 Omega(n lg n) 하한을 우회한다. 원소 간 비교를 전혀 수행하지 않고, 배열 인덱싱을 통해 상대적 순서를 결정한다.

```
COUNTING-SORT(A, n, k)
1   let B[1:n] and C[0:k] be new arrays
2   for i = 0 to k
3       C[i] = 0
4   for j = 1 to n                    // 각 값의 출현 횟수 계산
5       C[A[j]] = C[A[j]] + 1
6   // C[i]는 이제 값 i와 같은 원소의 개수
7   for i = 1 to k                    // 누적합 계산
8       C[i] = C[i] + C[i-1]
9   // C[i]는 이제 값 i 이하인 원소의 개수
10  // A를 역순으로 순회하며 B에 배치
11  for j = n downto 1
12      B[C[A[j]]] = A[j]
13      C[A[j]] = C[A[j]] - 1         // 중복값 처리
14  return B
```

**동작 원리**:
1. C[i]에 값 i의 출현 횟수를 저장 (lines 4-5)
2. C[i]를 누적합으로 변환하여 값 i 이하인 원소의 개수를 저장 (lines 7-8)
3. A를 역순으로 순회하며, C[A[j]]가 A[j]의 정확한 출력 위치를 알려줌 (lines 11-13)
4. 중복값 처리를 위해 배치할 때마다 C[A[j]]를 감소

**시간 복잡도**: Theta(n + k)
- Lines 2-3: Theta(k)
- Lines 4-5: Theta(n)
- Lines 7-8: Theta(k)
- Lines 11-13: Theta(n)
- k = O(n)이면 **Theta(n)** 선형 시간

**안정성(Stability)**: 같은 값을 가진 원소들이 입력에서의 순서를 출력에서도 유지한다. 이것은 기수 정렬의 서브루틴으로 사용될 때 필수적인 속성이다. 역순 순회(line 11의 downto)가 안정성을 보장한다.

**제약**: 제자리 정렬이 아님 (추가 배열 B와 C 필요), 입력이 제한된 범위의 정수여야 함.

## 예시

A = [2, 5, 3, 0, 2, 3, 0, 3], n = 8, k = 5:

```
Step 1 (출현 횟수): C = [2, 0, 2, 3, 0, 1]
                          0  1  2  3  4  5
Step 2 (누적합):    C = [2, 2, 4, 7, 7, 8]
                          0  1  2  3  4  5
Step 3 (역순 배치):
  j=8: A[8]=3, C[3]=7 -> B[7]=3, C[3]=6
  j=7: A[7]=0, C[0]=2 -> B[2]=0, C[0]=1
  j=6: A[6]=3, C[3]=6 -> B[6]=3, C[3]=5
  ...
결과: B = [0, 0, 2, 2, 3, 3, 3, 5]
```

## 관련 개념

- [비교 정렬 하한 (Comparison Sort Lower Bound)](/knowledge/algorithms/comparison-sort-lower-bound/)
- [기수 정렬 (Radix Sort)](/knowledge/algorithms/radix-sort/)
- [버킷 정렬 (Bucket Sort)](/knowledge/algorithms/bucket-sort/)
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/)
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/)
