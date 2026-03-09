---
title: "Build-Heap"
description: "BUILD-MAX-HEAP은 정렬되지 않은 배열 A[1:n]을 상향식(bottom-up) 방식으로 O(n) 선형 시간에 최대 힙으로 변환하는 프로시저이다"
tags: ['Build Heap', 'Heap', 'Bottom Up', 'Linear Time', 'Algorithm']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/build-heap
sidebar:
  order: 5
---

## 핵심 개념

배열의 후반부 A[floor(n/2)+1 : n]은 모두 리프 노드이므로 이미 1-원소 힙이다. BUILD-MAX-HEAP은 나머지 내부 노드들에 대해 역순으로 MAX-HEAPIFY를 호출하여 힙을 구축한다.

```
BUILD-MAX-HEAP(A, n)
1  A.heap-size = n
2  for i = floor(n/2) downto 1
3      MAX-HEAPIFY(A, i)
```

**정확성 증명 - 루프 불변식(Loop Invariant)**:
- "for 루프의 각 반복 시작 시, 노드 i+1, i+2, ..., n은 각각 최대 힙의 루트이다."
- 초기화: i = floor(n/2)일 때, floor(n/2)+1 이후 노드는 모두 리프 -> 자명한 최대 힙
- 유지: 노드 i의 자식은 i보다 큰 인덱스 -> 루프 불변식에 의해 이미 최대 힙의 루트 -> MAX-HEAPIFY(A, i) 호출이 유효
- 종료: i = 0일 때, 노드 1, 2, ..., n 모두 최대 힙의 루트 -> 특히 노드 1이 전체 최대 힙의 루트

**시간 복잡도 분석**:
- 단순 상한: O(n) * O(lg n) = O(n lg n) - 맞지만 타이트하지 않음
- **타이트한 분석**: 높이 h인 노드는 최대 ceil(n/2^(h+1))개, MAX-HEAPIFY는 O(h) 시간
- 총 비용: sum_{h=0}^{floor(lg n)} ceil(n/2^(h+1)) * O(h) <= cn * sum_{h=0}^{infinity} h/2^h = cn * 2 = **O(n)**
- 핵심 관찰: 대부분의 노드는 높이가 낮고, 높이가 높은 노드는 극소수

이것은 직관에 반하는 결과이다. n번의 O(lg n) 연산인데 총 시간이 O(n lg n)이 아닌 O(n)이다. 이유는 대부분의 MAX-HEAPIFY 호출이 높이가 낮은 노드에서 이루어지기 때문이다.

## 예시

A = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]에 BUILD-MAX-HEAP 적용:

```
i=5: MAX-HEAPIFY(A,5) - A[5]=16은 리프의 부모, 자식 없는 변화 없음
     [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
i=4: MAX-HEAPIFY(A,4) - A[4]=2, 자식 A[8]=14 > 2 -> 교환
     [4, 1, 3, 14, 16, 9, 10, 2, 8, 7]
i=3: MAX-HEAPIFY(A,3) - A[3]=3, 자식 A[7]=10 > 3 -> 교환
     [4, 1, 10, 14, 16, 9, 3, 2, 8, 7]
i=2: MAX-HEAPIFY(A,2) - A[2]=1, 자식 A[4]=14, A[5]=16이므로 최대자식 A[5]=16 > 1 -> 교환, 재귀
     [4, 16, 10, 14, 1, 9, 3, 2, 8, 7] -> [4, 16, 10, 14, 7, 9, 3, 2, 8, 1]
i=1: MAX-HEAPIFY(A,1) - A[1]=4, 자식 A[3]=10이 아닌 A[2]=14 > 4 -> 교환, 재귀
     최종: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
```

## 관련 개념

- [Heap](/knowledge/algorithms/heap/)
- [Max-Heapify](/knowledge/algorithms/max-heapify/)
- [Heapsort](/knowledge/algorithms/heapsort/)
- [Loop Invariant](/knowledge/algorithms/loop-invariant/)
- [Asymptotic Notation](/knowledge/algorithms/asymptotic-notation/)
