---
title: "RB Deletion"
description: "레드-블랙 트리 삭제(RB Deletion)는 노드를 삭제한 후, 삭제된 노드의 원래 색이 BLACK이었을 때 RB-DELETE-FIXUP을 통해 색상 변경과 회전을 수행하여 레드-블랙 성질을 O(lg n) 시간에 복구하는 연산이다"
tags: ['Rb Deletion', 'Red Black Tree', 'Deletion', 'Fixup', 'Rotation', 'Doubly Black']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/rb-deletion
sidebar:
  order: 20
---

## 핵심 개념

**RB-DELETE(T, z):** BST 삭제를 기반으로 하되, 추가적으로 노드 y(실제 제거/이동되는 노드)와 x(y의 위치를 대체하는 노드)를 추적한다.

**y와 x의 결정:**
- z에 자식이 최대 하나: y = z, x = z의 비NIL 자식(또는 T.nil)
- z에 자식이 둘: y = z의 후속자(TREE-MINIMUM(z.right)), x = y.right
  - y가 z의 오른쪽 자식이면 직접 교체
  - 아니면 y를 먼저 y.right로 교체 후 z 위치로 이동
  - y는 z의 색을 물려받음

**y가 RED였으면:** 레드-블랙 성질 위반 없음 (흑색 높이 불변, 인접 RED 없음)

**y가 BLACK이었으면:** 세 가지 문제 발생 가능
1. y가 루트이고 RED 자식이 새 루트가 된 경우 (성질 2 위반)
2. x와 x.p 모두 RED (성질 4 위반)
3. y를 포함하던 경로의 BLACK 수가 1 감소 (성질 5 위반)
   - 해결: x에 "추가 흑색(extra black)" 부여 -> x가 "이중 흑색" 또는 "적흑색"

**RB-DELETE-FIXUP(T, x)의 네 가지 경우 (x가 왼쪽 자식일 때):**

**Case 1: 형제 w가 RED**
- w를 BLACK, x.p를 RED로 색칠, x.p에 좌회전
- 새 형제가 BLACK -> Case 2, 3, 또는 4로 변환

**Case 2: 형제 w가 BLACK, w의 두 자식 모두 BLACK**
- w를 RED로 색칠, 추가 흑색을 x.p로 올림
- x = x.p로 루프 반복 (유일하게 루프를 반복시키는 경우)

**Case 3: 형제 w가 BLACK, w.left가 RED, w.right가 BLACK**
- w.left를 BLACK, w를 RED로, w에 우회전
- Case 4로 변환

**Case 4: 형제 w가 BLACK, w.right가 RED**
- w를 x.p의 색으로, x.p를 BLACK, w.right를 BLACK으로
- x.p에 좌회전, x = T.root (루프 종료)
- 추가 흑색 제거 완료

**분석:**
- 총 수행 시간: O(lg n)
- Case 2만 루프를 반복하며, x가 한 레벨씩 올라감 -> 최대 O(lg n)번
- 최대 3회 회전
- 마지막에 x를 BLACK으로 색칠

## 예시

```
RB-DELETE(T, z)
  y = z
  y-original-color = y.color
  if z.left == T.nil
    x = z.right
    RB-TRANSPLANT(T, z, z.right)
  elseif z.right == T.nil
    x = z.left
    RB-TRANSPLANT(T, z, z.left)
  else
    y = TREE-MINIMUM(z.right)    // 후속자
    y-original-color = y.color
    x = y.right
    if y != z.right
      RB-TRANSPLANT(T, y, y.right)
      y.right = z.right
      y.right.p = y
    else x.p = y
    RB-TRANSPLANT(T, z, y)
    y.left = z.left
    y.left.p = y
    y.color = z.color
  if y-original-color == BLACK
    RB-DELETE-FIXUP(T, x)

RB-DELETE-FIXUP(T, x)
  while x != T.root and x.color == BLACK
    if x == x.p.left
      w = x.p.right              // 형제
      // Case 1: w가 RED
      // Case 2: w가 BLACK, w의 두 자식 BLACK
      // Case 3: w가 BLACK, w.left RED, w.right BLACK
      // Case 4: w가 BLACK, w.right RED
    else // 대칭
  x.color = BLACK
```

## 관련 개념

- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
- [Rotation](/knowledge/algorithms/rotation/)
- [RB Insertion](/knowledge/algorithms/rb-insertion/)
- [BST Insertion Deletion](/knowledge/algorithms/bst-insertion-deletion/)
- [Balanced Tree](/knowledge/algorithms/balanced-tree/)
