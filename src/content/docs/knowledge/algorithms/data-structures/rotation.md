---
title: "Rotation"
description: "회전(Rotation)은 이진 탐색 트리에서 BST 성질을 유지하면서 노드의 포인터 구조를 변경하는 O(1) 시간의 지역 연산으로, 레드-블랙 트리의 삽입/삭제 후 균형을 복구하는 핵심 도구이다"
tags: ['Rotation', 'Red Black Tree', 'Binary Search Tree', 'Left Rotation', 'Right Rotation', 'Tree Restructuring']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/rotation
sidebar:
  order: 18
---

## 핵심 개념

회전에는 좌회전(LEFT-ROTATE)과 우회전(RIGHT-ROTATE) 두 종류가 있으며, 서로 역연산이다.

**좌회전(LEFT-ROTATE(T, x)):**
- 전제: x의 오른쪽 자식 y가 T.nil이 아니어야 한다
- x를 루트로 하는 부분 트리의 구조를 변경:
  - y가 새로운 부분 트리의 루트가 된다
  - x가 y의 왼쪽 자식이 된다
  - y의 원래 왼쪽 자식 beta가 x의 오른쪽 자식이 된다
- BST 성질 유지: alpha < x.key < beta < y.key < gamma

**우회전(RIGHT-ROTATE(T, y)):**
- 좌회전의 역연산
- y의 왼쪽 자식 x가 새로운 부분 트리의 루트가 된다

**회전의 성질:**
- 상수 개의 포인터만 변경하므로 O(1) 시간
- 노드의 다른 속성(key 등)은 변경되지 않음
- BST 성질이 항상 유지됨 (중위 순회 순서 불변)
- n개 노드의 BST에는 정확히 n-1개의 가능한 회전이 존재
- 임의의 n개 노드 BST는 O(n)번의 회전으로 다른 임의의 n개 노드 BST로 변환 가능

레드-블랙 트리에서 INSERT는 최대 2회, DELETE는 최대 3회의 회전으로 균형을 복구한다.

## 예시

```
// 좌회전: x 기준
//     x              y
//    / \            / \
//   α   y    →    x   γ
//      / \       / \
//     β   γ     α   β

LEFT-ROTATE(T, x)
  y = x.right
  x.right = y.left         // β를 x의 오른쪽 자식으로
  if y.left != T.nil
    y.left.p = x
  y.p = x.p                // x의 부모를 y의 부모로
  if x.p == T.nil
    T.root = y
  elseif x == x.p.left
    x.p.left = y
  else x.p.right = y
  y.left = x               // x를 y의 왼쪽 자식으로
  x.p = y

// 우회전: y 기준 (좌회전의 역)
//       y            x
//      / \          / \
//     x   γ   →   α   y
//    / \              / \
//   α   β            β   γ

// 중위 순회 순서 보존:
// 좌회전 전: α, x, β, y, γ
// 좌회전 후: α, x, β, y, γ  (동일!)
```

## 관련 개념

- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
- [RB Insertion](/knowledge/algorithms/rb-insertion/)
- [RB Deletion](/knowledge/algorithms/rb-deletion/)
- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [Balanced Tree](/knowledge/algorithms/balanced-tree/)
