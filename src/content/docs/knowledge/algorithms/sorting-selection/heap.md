---
title: "힙 (Heap)"
description: "힙(Heap)은 거의 완전한 이진 트리(nearly complete binary tree) 형태를 가진 배열 기반 자료구조로, 부모-자식 간의 크기 관계를 나타내는 힙 속성(heap property)을 만족한다"
tags: ['Heap', 'Data Structure', 'Binary Tree', 'Array', 'Max Heap', 'Min Heap']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/heap
sidebar:
  order: 3
---

## 핵심 개념

이진 힙은 배열 A[1:n]으로 표현되며, 인덱스 i인 노드에 대해 부모, 왼쪽 자식, 오른쪽 자식의 인덱스를 O(1) 시간에 계산할 수 있다:
- PARENT(i) = floor(i/2)
- LEFT(i) = 2i
- RIGHT(i) = 2i + 1

힙에는 두 종류가 있다:
- **최대 힙(Max-Heap)**: 모든 노드 i에 대해 A[PARENT(i)] >= A[i]를 만족. 루트가 최댓값.
- **최소 힙(Min-Heap)**: 모든 노드 i에 대해 A[PARENT(i)] <= A[i]를 만족. 루트가 최솟값.

n개 원소를 가진 힙의 높이는 Theta(lg n)이며, 힙의 기본 연산들은 높이에 비례하는 O(lg n) 시간에 수행된다. 힙은 A.heap-size 속성을 통해 배열 내 유효한 힙 원소의 수를 관리한다. LEFT와 RIGHT 연산은 비트 시프트 연산으로 매우 효율적으로 구현할 수 있다.

힙은 heapsort 알고리즘과 우선순위 큐(priority queue) 구현의 기반이 되는 핵심 자료구조이다.

## 예시

배열 A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]은 최대 힙이다:

```
         16
       /    \
     14      10
    /  \    /  \
   8    7  9    3
  / \  /
 2  4 1
```

인덱스 관계 확인:
- A[1]=16의 자식: A[LEFT(1)]=A[2]=14, A[RIGHT(1)]=A[3]=10
- A[2]=14의 자식: A[LEFT(2)]=A[4]=8, A[RIGHT(2)]=A[5]=7
- 모든 노드에서 부모 >= 자식 조건 만족

## 관련 개념

- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
- [힙 정렬 (Heapsort)](/knowledge/algorithms/heapsort/)
- [우선순위 큐 (Priority Queue)](/knowledge/algorithms/priority-queue/)
- [최대 힙화 (Max-Heapify)](/knowledge/algorithms/max-heapify/)
- [힙 구성 (Build-Heap)](/knowledge/algorithms/build-heap/)
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/)
