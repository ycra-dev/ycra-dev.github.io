---
title: "RB Insertion"
description: "레드-블랙 트리 삽입(RB Insertion)은 새 노드를 RED로 삽입한 후, RB-INSERT-FIXUP 절차를 통해 색상 변경과 회전을 수행하여 레드-블랙 성질을 O(lg n) 시간에 복구하는 연산이다"
tags: ['Rb Insertion', 'Red Black Tree', 'Insertion', 'Fixup', 'Rotation', 'Recoloring']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/rb-insertion
sidebar:
  order: 19
---

## 핵심 개념

**RB-INSERT(T, z):** BST 삽입과 동일하되, NIL을 T.nil로 대체하고, z의 양쪽 자식을 T.nil로 설정하며, z를 RED로 색칠한 후 RB-INSERT-FIXUP을 호출한다.

**삽입 후 가능한 위반:**
- 성질 2 위반: z가 루트이고 RED인 경우
- 성질 4 위반: z와 z.p 모두 RED인 경우
- 성질 1, 3, 5는 위반되지 않음

**RB-INSERT-FIXUP(T, z)의 루프 불변식:**
(a) z는 RED, (b) z.p가 루트이면 z.p는 BLACK, (c) 최대 한 가지 성질만 위반

**세 가지 경우 (z.p가 z.p.p의 왼쪽 자식일 때):**

**Case 1: 삼촌 y가 RED**
- z.p와 y를 BLACK으로, z.p.p를 RED로 색칠
- z를 z.p.p로 올려 다시 검사 (루프 반복)
- 회전 없음

**Case 2: 삼촌 y가 BLACK이고 z가 오른쪽 자식**
- z.p에 대해 좌회전하여 Case 3으로 변환
- z = z.p 후 좌회전

**Case 3: 삼촌 y가 BLACK이고 z가 왼쪽 자식**
- z.p를 BLACK, z.p.p를 RED로 색칠
- z.p.p에 대해 우회전
- 루프 종료

z.p가 z.p.p의 오른쪽 자식일 때는 좌우 대칭적으로 처리한다.

**분석:**
- 총 수행 시간: O(lg n)
- Case 1만 루프를 반복하며, z가 두 레벨씩 올라감
- 최대 2회 회전 (Case 2->3 또는 Case 3 단독)
- 마지막에 루트를 BLACK으로 색칠하여 성질 2 보장

## 예시

```
RB-INSERT(T, z)
  // ... BST 삽입과 동일 (NIL -> T.nil) ...
  z.left = T.nil
  z.right = T.nil
  z.color = RED
  RB-INSERT-FIXUP(T, z)

RB-INSERT-FIXUP(T, z)
  while z.p.color == RED
    if z.p == z.p.p.left       // z의 부모가 왼쪽 자식
      y = z.p.p.right          // y는 삼촌
      if y.color == RED        // Case 1: 삼촌이 RED
        z.p.color = BLACK
        y.color = BLACK
        z.p.p.color = RED
        z = z.p.p
      else
        if z == z.p.right      // Case 2: z가 오른쪽 자식
          z = z.p
          LEFT-ROTATE(T, z)
        z.p.color = BLACK      // Case 3: z가 왼쪽 자식
        z.p.p.color = RED
        RIGHT-ROTATE(T, z.p.p)
    else // 대칭: z.p == z.p.p.right
      // ... "left"와 "right" 교환 ...
  T.root.color = BLACK

// 예시: 41, 38, 31, 12, 19, 8 순서로 삽입
// 41(B) -> 38 삽입(R) -> 31 삽입 시 Case 3 발생 -> 회전
```

## 관련 개념

- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
- [Rotation](/knowledge/algorithms/rotation/)
- [RB Deletion](/knowledge/algorithms/rb-deletion/)
- [BST Insertion Deletion](/knowledge/algorithms/bst-insertion-deletion/)
- [Balanced Tree](/knowledge/algorithms/balanced-tree/)
