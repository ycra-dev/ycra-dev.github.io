---
title: "트리 탐색 (Tree Search)"
description: "트리 검색(Tree Search)은 이진 탐색 트리에서 키를 찾거나 최솟값/최댓값, 후속자/선행자를 구하는 질의 연산들의 총칭으로, 모두 트리의 높이 h에 비례하는 O(h) 시간에 수행된다"
tags: ['Tree Search', 'Binary Search Tree', 'Query', 'Minimum', 'Maximum', 'Successor', 'Predecessor']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/tree-search
sidebar:
  order: 8
---

## 핵심 개념

**TREE-SEARCH(x, k):** 루트에서 시작하여 키 k와 현재 노드의 키를 비교하며 아래로 내려간다. k < x.key이면 왼쪽, k > x.key이면 오른쪽으로 이동. 키를 찾거나 NIL에 도달하면 종료한다. 반복적(iterative) 버전이 대부분의 컴퓨터에서 더 효율적이다.

**TREE-MINIMUM(x) / TREE-MAXIMUM(x):** BST 성질에 의해, 최솟값은 가장 왼쪽 노드, 최댓값은 가장 오른쪽 노드이다. 왼쪽/오른쪽 자식 포인터를 NIL까지 따라가면 된다.

**TREE-SUCCESSOR(x):** 중위 순회 순서에서 x 다음 노드를 찾는다.
- 경우 1: x에 오른쪽 부분 트리가 있으면, 그 부분 트리의 최솟값이 후속자
- 경우 2: x에 오른쪽 부분 트리가 없으면, x의 조상 중에서 왼쪽 자식이기도 한 가장 낮은 조상이 후속자
- TREE-PREDECESSOR는 대칭적으로 구현

**정리 12.2:** SEARCH, MINIMUM, MAXIMUM, SUCCESSOR, PREDECESSOR 모두 높이 h인 BST에서 O(h) 시간에 수행된다. 각 연산은 루트에서 리프까지 또는 리프에서 루트까지의 단순 경로만 따른다.

**높이에 따른 성능:**
- 균형 트리 (h = O(lg n)): 모든 질의 O(lg n)
- 최악 (선형 체인, h = n): 모든 질의 O(n)

## 예시

```
// 재귀적 검색
TREE-SEARCH(x, k)
  if x == NIL or k == x.key
    return x
  if k < x.key
    return TREE-SEARCH(x.left, k)
  else return TREE-SEARCH(x.right, k)

// 반복적 검색
ITERATIVE-TREE-SEARCH(x, k)
  while x != NIL and k != x.key
    if k < x.key
      x = x.left
    else x = x.right
  return x

// 최솟값/최댓값
TREE-MINIMUM(x)
  while x.left != NIL
    x = x.left
  return x

// 후속자 찾기
TREE-SUCCESSOR(x)
  if x.right != NIL
    return TREE-MINIMUM(x.right)
  else
    y = x.p
    while y != NIL and x == y.right
      x = y
      y = y.p
    return y

// 예시: 키 13의 후속자 찾기
//        15
//       /  \
//      6    18
//     / \   / \
//    3   7 17 20
//   / \   \
//  2   4  13
// 13은 오른쪽 부분 트리 없음 -> 위로 올라감
// 13 -> 7 (오른쪽 자식) -> 6 (오른쪽 자식) -> 15 (왼쪽 자식!) -> 후속자 = 15
```

## 관련 개념

- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [중위 순회 (Inorder Traversal)](/knowledge/algorithms/inorder-traversal/)
- [BST Insertion Deletion](/knowledge/algorithms/bst-insertion-deletion/)
