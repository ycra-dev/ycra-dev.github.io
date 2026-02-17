---
title: "Max-Heapify"
description: "MAX-HEAPIFY는 특정 노드에서 최대 힙 속성이 위반될 수 있을 때, 해당 노드의 값을 아래 방향으로 \"떨어뜨려(float down)\" 서브트리 전체의 최대 힙 속성을 복원하는 핵심 프로시저이다"
tags: ['Max Heapify', 'Heap', 'Heap Property', 'Recursive', 'Algorithm']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/max-heapify
sidebar:
  order: 4
---

## 핵심 개념

MAX-HEAPIFY(A, i)는 LEFT(i)와 RIGHT(i)를 루트로 하는 서브트리가 이미 최대 힙이라는 전제 하에서 동작한다. A[i]가 자식보다 작을 수 있는 유일한 위반 지점이다.

**동작 원리**:
1. A[i], A[LEFT(i)], A[RIGHT(i)] 중 가장 큰 원소의 인덱스를 largest에 저장
2. A[i]가 가장 크면 힙 속성이 이미 만족 -> 종료
3. 그렇지 않으면 A[i]와 A[largest]를 교환
4. largest 위치의 서브트리에서 힙 속성이 깨질 수 있으므로 재귀적으로 MAX-HEAPIFY(A, largest) 호출

```
MAX-HEAPIFY(A, i)
1   l = LEFT(i)
2   r = RIGHT(i)
3   if l <= A.heap-size and A[l] > A[i]
4       largest = l
5   else largest = i
6   if r <= A.heap-size and A[r] > A[largest]
7       largest = r
8   if largest != i
9       exchange A[i] with A[largest]
10      MAX-HEAPIFY(A, largest)
```

**시간 복잡도 분석**:
- 자식 서브트리의 크기는 최대 2n/3 (최악: 트리의 마지막 레벨이 정확히 반만 찬 경우)
- 점화식: T(n) <= T(2n/3) + Theta(1)
- 마스터 정리의 Case 2에 의해 **T(n) = O(lg n)**
- 높이 h인 노드에서의 수행 시간: O(h)
- 최악의 경우 Omega(lg n) (루트에서 리프까지 매번 재귀)

반복문(iterative) 버전으로 구현하면 재귀 호출 오버헤드를 제거할 수 있다 (꼬리 재귀 제거).

## 예시

MAX-HEAPIFY(A, 2)의 동작 (A.heap-size = 10):

```
초기 상태:        교환 후(A[2]<->A[4]):    교환 후(A[4]<->A[9]):
      16                16                      16
     / \              /   \                   /    \
   [4]  10          14     10               14     10
   / \  / \        / \    / \              / \    / \
  14  7 9  3      [4]  7  9  3            8   7  9  3
 /\ /            /\ /                    /\ /
2 8 1           2 8 1                   2 [4] 1
```

노드 2의 값 4가 자식 14보다 작으므로 교환 -> 노드 4에서 다시 자식 8보다 작으므로 교환 -> 노드 9는 리프이므로 종료.

## 관련 개념

- [Heap](/knowledge/algorithms/heap/)
- [Heapsort](/knowledge/algorithms/heapsort/)
- [Build-Heap](/knowledge/algorithms/build-heap/)
- [Priority Queue](/knowledge/algorithms/priority-queue/)
- [Recurrence](/knowledge/algorithms/recurrence/)
