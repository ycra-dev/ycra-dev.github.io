---
title: "루트 트리 (Rooted Tree)"
description: "루트 트리(Rooted Tree)는 하나의 루트 노드를 가지며, 각 노드가 부모-자식 관계로 연결된 계층적 자료구조로, 연결 데이터 구조를 사용하여 표현한다"
tags: ['Rooted Tree', 'Data Structure', 'Binary Tree', 'Tree Representation', 'Left Child Right Sibling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/rooted-tree
sidebar:
  order: 6
---

## 핵심 개념

트리의 각 노드는 key 속성과 다른 노드를 가리키는 포인터 속성을 가진 객체이다. 트리의 종류에 따라 포인터 구성이 달라진다.

**이진 트리(Binary Tree) 표현:**
- 각 노드 x는 p(부모), left(왼쪽 자식), right(오른쪽 자식) 속성을 가진다
- x.p = NIL이면 x는 루트
- x.left = NIL이면 왼쪽 자식이 없음
- T.root가 트리 전체의 루트를 가리킨다

**무한 분기 트리(Unbounded Branching) 표현:**
자식 수가 제한되지 않은 트리를 효율적으로 표현하기 위해 **왼쪽 자식, 오른쪽 형제(left-child, right-sibling)** 표현을 사용한다:
- x.left-child: x의 가장 왼쪽 자식을 가리킨다
- x.right-sibling: x의 바로 오른쪽 형제를 가리킨다
- x.p: x의 부모를 가리킨다

이 방법은 자식 수에 관계없이 노드당 상수 개의 포인터만 사용하므로, n개 노드를 가진 임의의 루트 트리를 O(n) 공간에 저장할 수 있다.

**기타 표현:**
- 완전 이진 트리는 배열로 표현 가능 (힙에서 사용)
- 부모 포인터만 가진 트리 (루트 방향으로만 탐색)
- 응용에 따라 최적의 표현이 달라진다

## 예시

```
// 이진 트리 노드 구조
// 노드 x: x.p (부모), x.left (왼쪽 자식), x.right (오른쪽 자식), x.key

// 왼쪽 자식-오른쪽 형제 표현
// 노드 x: x.p (부모), x.left-child (첫째 자식), x.right-sibling (오른쪽 형제)

// 예시: 루트 A, A의 자식 B, C, D
// A.left-child = B
// B.right-sibling = C
// C.right-sibling = D
// D.right-sibling = NIL
// B.p = C.p = D.p = A

// O(n) 시간에 트리의 모든 키 출력 (재귀)
PRINT-TREE(x)
  if x != NIL
    print x.key
    PRINT-TREE(x.left)   // 이진 트리의 경우
    PRINT-TREE(x.right)
```

## 관련 개념

- [연결 리스트 (Linked List)](/knowledge/algorithms/linked-list/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [레드-블랙 트리 (Red-Black Tree)](/knowledge/algorithms/red-black-tree/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
