---
title: "Binary Search Tree"
description: "이진 탐색 트리(Binary Search Tree, BST)는 각 노드 x에 대해 왼쪽 부분 트리의 모든 키가 x"
tags: ['Binary Search Tree', 'Bst', 'Data Structure', 'Tree', 'Search', 'Dynamic Set']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/binary-search-tree
sidebar:
  order: 13
---

## 핵심 개념

이진 탐색 트리는 연결 데이터 구조로 표현되며, 각 노드는 key, left, right, p(부모) 속성을 가진다. T.root가 트리의 루트를 가리킨다.

**이진 탐색 트리 성질(BST Property):**
노드 x에 대해, 왼쪽 부분 트리의 임의의 노드 y에 대해 y.key <= x.key이고, 오른쪽 부분 트리의 임의의 노드 y에 대해 y.key >= x.key이다.

이 성질 덕분에 중위 순회(inorder tree walk)로 정렬된 순서로 모든 키를 출력할 수 있다.

**핵심 연산과 시간 복잡도 (높이 h인 트리):**
- TREE-SEARCH: 루트에서 아래로 경로 추적 - O(h)
- TREE-MINIMUM / TREE-MAXIMUM: 왼쪽/오른쪽 끝까지 이동 - O(h)
- TREE-SUCCESSOR / TREE-PREDECESSOR: O(h)
- TREE-INSERT: 적절한 NIL 위치 탐색 후 삽입 - O(h)
- TREE-DELETE: 자식 수에 따라 경우 분류 후 삭제 - O(h)
- INORDER-TREE-WALK: 전체 트리 순회 - Theta(n)

**높이 분석:**
- 완전 이진 트리: h = Theta(lg n) -> 모든 연산 Theta(lg n)
- 최악의 경우 (선형 체인): h = n -> 모든 연산 Theta(n)
- 무작위 구축 BST: 기대 높이 O(lg n)

BST는 딕셔너리와 우선순위 큐 모두로 사용 가능하며, 레드-블랙 트리 등 균형 트리의 기초가 된다.

## 예시

```
// BST 성질 예시
//       6
//      / \
//     5   7
//    / \   \
//   2   5   8
// 중위 순회: 2, 5, 5, 6, 7, 8 (정렬된 순서)

// 재귀적 검색
TREE-SEARCH(x, k)
  if x == NIL or k == x.key
    return x
  if k < x.key
    return TREE-SEARCH(x.left, k)
  else return TREE-SEARCH(x.right, k)

// 반복적 검색 (더 효율적)
ITERATIVE-TREE-SEARCH(x, k)
  while x != NIL and k != x.key
    if k < x.key
      x = x.left
    else x = x.right
  return x

// 최솟값: 왼쪽 자식을 계속 따라감
TREE-MINIMUM(x)
  while x.left != NIL
    x = x.left
  return x
```

## 관련 개념

- [Inorder Traversal](/knowledge/algorithms/inorder-traversal/)
- [Tree Search](/knowledge/algorithms/tree-search/)
- [BST Insertion Deletion](/knowledge/algorithms/bst-insertion-deletion/)
- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
- [Rooted Tree](/knowledge/algorithms/rooted-tree/)
- [Data Structure](/knowledge/algorithms/data-structure/)
