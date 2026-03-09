---
title: "Red-Black Tree"
description: "레드-블랙 트리(Red-Black Tree)는 각 노드에 색상(RED 또는 BLACK) 속성을 추가하고 다섯 가지 성질을 만족시켜 높이가 O(lg n)으로 보장되는 균형 이진 탐색 트리이다"
tags: ['Red Black Tree', 'Balanced Tree', 'Binary Search Tree', 'Self Balancing', 'Data Structure']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/red-black-tree
sidebar:
  order: 17
---

## 핵심 개념

레드-블랙 트리는 일반 BST에 한 비트의 색상 정보를 추가하고, 경로 상의 노드 색상을 제한하여 어떤 경로도 다른 경로의 두 배를 넘지 않도록 보장한다.

**레드-블랙 성질:**
1. 모든 노드는 RED 또는 BLACK이다
2. 루트는 BLACK이다
3. 모든 리프(NIL)는 BLACK이다
4. RED 노드의 두 자식은 모두 BLACK이다 (RED 노드 연속 불가)
5. 각 노드에서 자손 리프까지의 모든 단순 경로에 같은 수의 BLACK 노드가 있다

**센티넬 T.nil:** 모든 NIL을 하나의 센티넬 객체 T.nil로 대체. color는 BLACK이며, 루트의 부모도 T.nil이다.

**흑색 높이(Black-Height):** 노드 x에서 리프까지의 경로에 있는 BLACK 노드 수 (x 제외). 성질 5에 의해 잘 정의된다. bh(x)로 표기.

**보조정리 13.1:** n개의 내부 노드를 가진 레드-블랙 트리의 높이는 최대 2 lg(n+1)이다.
- 증명: 노드 x를 루트로 하는 부분 트리는 최소 2^bh(x) - 1개의 내부 노드 포함
- 성질 4에 의해 루트에서 리프까지 경로의 최소 절반이 BLACK
- 따라서 bh(root) >= h/2이고, n >= 2^(h/2) - 1

**결과:** SEARCH, MINIMUM, MAXIMUM, SUCCESSOR, PREDECESSOR 모두 O(lg n) 시간. INSERT와 DELETE도 추가 작업(회전과 재색칠)을 통해 O(lg n) 시간에 레드-블랙 성질을 유지하며 수행 가능하다.

레드-블랙 트리는 1972년 Bayer가 "대칭 이진 B-트리"라는 이름으로 발명했으며, Guibas와 Sedgewick이 레드/블랙 색상 규약을 도입했다.

## 예시

```
// 레드-블랙 트리 성질 예시 (CLRS Figure 13.1)
//         11(B)
//        /     \
//      2(R)    14(B)
//      /  \       \
//    1(B) 7(B)   15(R)
//         /  \
//       5(R) 8(R)

// 각 노드의 속성: color, key, left, right, p
// T.nil: 모든 NIL을 대체하는 BLACK 센티넬

// 흑색 높이 계산 예시:
// 루트 11의 bh = 2 (어느 경로든 11을 제외하고 BLACK 노드 수 = 2)
//   경로 11->2->1->NIL: 2(R) + 1(B) + NIL(B) = 2
//   경로 11->2->7->5->NIL: 2(R) + 7(B) + 5(R) + NIL(B) = 2
//   경로 11->14->15->NIL: 14(B) + 15(R) + NIL(B) = 2
// 모든 경로의 bh가 동일 → 성질 5 만족

// 높이 h인 레드-블랙 트리의 최대 노드 수
// h <= 2 lg(n+1)
// n >= 2^(h/2) - 1
```

## 관련 개념

- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [Rotation](/knowledge/algorithms/rotation/)
- [RB Insertion](/knowledge/algorithms/rb-insertion/)
- [RB Deletion](/knowledge/algorithms/rb-deletion/)
- [Balanced Tree](/knowledge/algorithms/balanced-tree/)
