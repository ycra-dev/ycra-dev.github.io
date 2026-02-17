---
title: "BST Insertion and Deletion"
description: "BST 삽입과 삭제(BST Insertion and Deletion)는 이진 탐색 트리에서 원소를 추가하거나 제거하면서 BST 성질을 유지하는 수정 연산으로, 모두 트리 높이 h에 비례하는 O(h) 시간에 수행된다"
tags: ['Bst Insertion Deletion', 'Binary Search Tree', 'Tree Insert', 'Tree Delete', 'Transplant', 'Dynamic Set']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/bst-insertion-deletion
sidebar:
  order: 15
---

## 핵심 개념

**TREE-INSERT(T, z):**
루트에서 시작하여 z.key와 현재 노드의 키를 비교하며 NIL에 도달할 때까지 내려간다. 추적 포인터(trailing pointer) y가 z의 부모가 될 노드를 기억한다. NIL 위치에 z를 삽입하고 부모-자식 관계를 설정한다.

**TRANSPLANT(T, u, v):**
부분 트리 교체 서브루틴으로, u가 루트인 부분 트리를 v가 루트인 부분 트리로 대체한다. u의 부모가 이제 v의 부모가 되고, v가 u의 위치를 차지한다. v는 NIL일 수 있다.

**TREE-DELETE(T, z):** 세 가지 기본 경우:
1. **z에 자식이 없는 경우:** z를 NIL로 대체 (TRANSPLANT)
2. **z에 자식이 하나인 경우:** z를 유일한 자식으로 대체 (TRANSPLANT)
3. **z에 자식이 둘인 경우 (복잡한 경우):**
   - z의 후속자 y를 찾는다 (z의 오른쪽 부분 트리의 최솟값, 왼쪽 자식 없음)
   - y가 z의 오른쪽 자식이면: y로 z를 대체, y의 왼쪽 자식을 z의 왼쪽 자식으로 설정
   - y가 z의 오른쪽 자식이 아니면: 먼저 y를 y의 오른쪽 자식으로 대체, z의 오른쪽 자식을 y의 오른쪽 자식으로 설정, 그 후 z를 y로 대체

**정리 12.3:** INSERT와 DELETE 모두 높이 h인 BST에서 O(h) 시간에 수행된다.

**중요 설계 결정:** 이 교재에서는 삭제 시 노드의 키/위성 데이터를 복사하는 대신 실제 노드를 이동시킨다. 이렇게 하면 다른 컴포넌트가 노드에 대한 포인터를 유지할 때 "stale pointer" 문제를 방지할 수 있다.

## 예시

```
TREE-INSERT(T, z)
  x = T.root        // 비교할 노드
  y = NIL            // z의 부모가 될 노드
  while x != NIL     // 리프까지 내려감
    y = x
    if z.key < x.key
      x = x.left
    else x = x.right
  z.p = y
  if y == NIL
    T.root = z       // 빈 트리였음
  elseif z.key < y.key
    y.left = z
  else y.right = z

TRANSPLANT(T, u, v)  // u를 v로 교체
  if u.p == NIL
    T.root = v
  elseif u == u.p.left
    u.p.left = v
  else u.p.right = v
  if v != NIL
    v.p = u.p

TREE-DELETE(T, z)
  if z.left == NIL
    TRANSPLANT(T, z, z.right)    // 왼쪽 자식 없음
  elseif z.right == NIL
    TRANSPLANT(T, z, z.left)     // 오른쪽 자식 없음
  else                            // 자식 둘
    y = TREE-MINIMUM(z.right)    // 후속자 찾기
    if y != z.right
      TRANSPLANT(T, y, y.right)  // y를 y의 오른쪽 자식으로 교체
      y.right = z.right
      y.right.p = y
    TRANSPLANT(T, z, y)          // z를 y로 교체
    y.left = z.left
    y.left.p = y
```

## 관련 개념

- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [Tree Search](/knowledge/algorithms/tree-search/)
- [Inorder Traversal](/knowledge/algorithms/inorder-traversal/)
- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
- [RB Insertion](/knowledge/algorithms/rb-insertion/)
- [RB Deletion](/knowledge/algorithms/rb-deletion/)
