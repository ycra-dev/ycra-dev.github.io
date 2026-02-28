---
title: "Heapsort"
description: "힙정렬(Heapsort)은 최대 힙 자료구조를 이용하여 배열을 제자리(in-place)에서 O(n lg n) 시간에 정렬하는 비교 기반 정렬 알고리즘이다"
tags: ['Heapsort', 'Sorting', 'In Place', 'Comparison Sort', 'Heap']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/heapsort
sidebar:
  order: 6
---

## 핵심 개념

힙정렬은 병합 정렬의 O(n lg n) 시간 복잡도와 삽입 정렬의 제자리 정렬 특성을 결합한 알고리즘이다. 동작 원리는 다음과 같다:

1. BUILD-MAX-HEAP을 호출하여 입력 배열을 최대 힙으로 변환한다 - O(n) 시간.
2. 루트(최댓값) A[1]과 마지막 원소 A[i]를 교환한다.
3. heap-size를 1 감소시킨 후, MAX-HEAPIFY(A, 1)을 호출하여 힙 속성을 복원한다.
4. 단계 2-3을 heap-size가 2가 될 때까지 반복한다.

```
HEAPSORT(A, n)
1  BUILD-MAX-HEAP(A, n)
2  for i = n downto 2
3      exchange A[1] with A[i]
4      A.heap-size = A.heap-size - 1
5      MAX-HEAPIFY(A, 1)
```

**시간 복잡도 분석**:
- BUILD-MAX-HEAP: O(n)
- n-1번의 MAX-HEAPIFY 호출: 각각 O(lg n)
- **전체: O(n lg n)** (최악의 경우에도 동일)
- **최선의 경우도 Omega(n lg n)** (모든 원소가 서로 다를 때)

힙정렬은 비교 기반 정렬의 하한 Omega(n lg n)에 부합하므로 점근적으로 최적(asymptotically optimal)이다. 다만, 실제로는 상수 인자가 작은 퀵정렬에 비해 느린 경우가 많다.

## 예시

A = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]을 힙정렬하는 과정:

1단계: BUILD-MAX-HEAP 후 -> [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
2단계: A[1]=16과 A[10]=1 교환 -> [1, 14, 10, 8, 7, 9, 3, 2, 4, | 16]
        MAX-HEAPIFY -> [14, 8, 10, 4, 7, 9, 3, 2, 1, | 16]
3단계: A[1]=14와 A[9]=4 교환 -> [4, 8, 10, 4, 7, 9, 3, 2, | 14, 16]
        MAX-HEAPIFY -> [10, 8, 9, 4, 7, 4, 3, 2, | 14, 16]
... (반복)
최종: [1, 2, 3, 4, 7, 8, 9, 10, 14, 16]

## TAOCP 분석 (Knuth, Vol.3)

TAOCP의 힙정렬(Algorithm H, J. W. J. Williams 1964)의 주요 특성:

**힙 성질**: 완전 이진 트리에서 부모 ≥ 두 자식 (최대 힙). 배열 표현: 인덱스 i의 자식은 2i와 2i+1.

**성능 비교 (Table 1, MIX 컴퓨터)**:
- 평균 시간: ≈ 2N log N × (MIX 상수)
- 최악의 경우: 퀵정렬의 평균과 비슷 (약 2배 느림)
- 추가 메모리: **O(1) (in-place)**
- 안정성: **불안정 (unstable)**

**퀵정렬과 비교**:
- Heapsort: 최악 보장 O(N log N), 추가 공간 O(1)
- Quicksort: 평균이 Heapsort보다 약 1.5배 빠르지만 최악 O(N²)
- 실용적으로 Quicksort가 더 많이 사용됨 (지역성, 캐시 효율)

**캐시 친화성**: Heapsort는 캐시 비친화적 (LaMarca-Ladner 1999):
- 힙 접근 패턴이 랜덤하여 캐시 미스 많음
- 현대 컴퓨터에서 이론적 장점이 상쇄됨

**최소 저장 공간**: 힙 정렬은 O(log N)² 비트 이외의 추가 공간 없이 O(N log N) 성능.

**Introsort**: 실용적 개선안 - Quicksort로 시작, 재귀 깊이가 O(log N)을 초과하면 Heapsort로 전환.

## 관련 개념

- [Heap](/knowledge/algorithms/heap/)
- [Max-Heapify](/knowledge/algorithms/max-heapify/)
- [Build-Heap](/knowledge/algorithms/build-heap/)
- [Merge Sort](/knowledge/algorithms/merge-sort/)
- [Insertion Sort](/knowledge/algorithms/insertion-sort/)
- [Comparison Sort Lower Bound](/knowledge/algorithms/comparison-sort-lower-bound/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
- [Internal Sorting Summary](/knowledge/algorithms/sorting-selection/internal-sorting-summary/)
