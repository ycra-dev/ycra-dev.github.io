---
title: "Inorder Traversal"
description: "중위 순회(Inorder Traversal)는 이진 탐색 트리에서 왼쪽 부분 트리, 루트, 오른쪽 부분 트리 순서로 재귀적으로 방문하는 트리 순회 알고리즘으로, BST 성질에 의해 키를 정렬된 순서로 출력한다"
tags: ['Inorder Traversal', 'Tree Walk', 'Binary Search Tree', 'Recursion', 'Sorted Order']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/inorder-traversal
sidebar:
  order: 14
---

## 핵심 개념

이진 탐색 트리의 세 가지 순회 방법:
1. **중위 순회(Inorder):** 왼쪽 -> 루트 -> 오른쪽 (정렬 순서 출력)
2. **전위 순회(Preorder):** 루트 -> 왼쪽 -> 오른쪽
3. **후위 순회(Postorder):** 왼쪽 -> 오른쪽 -> 루트

**중위 순회의 핵심 특성:**
- BST 성질에 의해 중위 순회는 항상 키를 비내림차순으로 출력한다
- 정확성은 BST 성질에 대한 귀납법으로 증명된다

**시간 복잡도 분석 (정리 12.1):**
- n개 노드의 부분 트리에서 INORDER-TREE-WALK(x)는 Theta(n) 시간 소요
- 증명: T(n) <= T(k) + T(n-k-1) + d, 치환법으로 T(n) = O(n)
- 각 노드에서 정확히 두 번의 재귀 호출 (왼쪽 자식, 오른쪽 자식)

**대안적 구현:**
- TREE-MINIMUM으로 최솟값 노드를 찾고, n-1번의 TREE-SUCCESSOR 호출로도 Theta(n) 시간에 정렬된 순서로 출력 가능 (각 간선을 최대 2번 통과)
- 스택을 사용한 비재귀적 구현도 가능

정렬 알고리즘 관점에서, n개 원소를 BST에 삽입한 후 중위 순회하면 정렬이 된다. 비교 기반 정렬의 하한 Omega(n lg n)에 의해, BST 구축에도 최악 Omega(n lg n) 시간이 필요하다.

## 예시

```
INORDER-TREE-WALK(x)
  if x != NIL
    INORDER-TREE-WALK(x.left)
    print x.key
    INORDER-TREE-WALK(x.right)

// 예시 트리:
//       6
//      / \
//     5   7
//    / \   \
//   2   5   8

// INORDER-TREE-WALK 실행 순서:
// WALK(6) -> WALK(5) -> WALK(2) -> WALK(NIL)
// -> print 2 -> WALK(NIL)
// -> print 5 -> WALK(5) -> WALK(NIL)
// -> print 5 -> WALK(NIL)
// -> print 6 -> WALK(7) -> WALK(NIL)
// -> print 7 -> WALK(8) -> WALK(NIL)
// -> print 8 -> WALK(NIL)
// 출력: 2, 5, 5, 6, 7, 8

// 전위 순회: 6, 5, 2, 5, 7, 8
// 후위 순회: 2, 5, 5, 8, 7, 6
```

## 관련 개념

- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [Tree Search](/knowledge/algorithms/tree-search/)
- [BST Insertion Deletion](/knowledge/algorithms/bst-insertion-deletion/)
