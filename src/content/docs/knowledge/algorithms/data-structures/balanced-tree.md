---
title: "균형 트리 (Balanced Tree)"
description: "균형 트리(Balanced Tree)는 트리의 높이를 O(lg n)으로 제한하여 모든 기본 동적 집합 연산이 O(lg n) 최악의 경우 시간에 수행되도록 보장하는 탐색 트리의 총칭이다"
tags: ['Balanced Tree', 'Self Balancing', 'Red Black Tree', 'Avl Tree', 'Bst', 'Worst Case Guarantee']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/balanced-tree
sidebar:
  order: 16
---

## 핵심 개념

일반 이진 탐색 트리는 최악의 경우 높이가 n이 되어 연산이 O(n) 시간이 소요될 수 있다. 균형 트리는 삽입과 삭제 시 트리 구조를 조정하여 높이를 O(lg n)으로 유지한다.

**균형 트리의 종류:**

1. **레드-블랙 트리(Red-Black Tree):**
   - 노드 색상 제약으로 높이 <= 2 lg(n+1) 보장
   - 삽입 시 최대 2회, 삭제 시 최대 3회 회전
   - 모든 연산 O(lg n) 최악
   - Bayer(1972) 발명, Guibas/Sedgewick 색상 규약

2. **AVL 트리:**
   - Adel'son-Vel'skii와 Landis(1962) 발명, 최초의 균형 트리
   - 각 노드의 좌우 부분 트리 높이 차이가 최대 1
   - 높이 h의 AVL 트리는 최소 F_h (피보나치 수) 개 노드 -> h = O(lg n)
   - 삽입/삭제 후 회전으로 재균형, O(lg n) 시간

3. **B-트리:** 다중 키/자식을 가진 균형 탐색 트리, 디스크 최적화
4. **스플레이 트리:** 접근할 때마다 회전으로 자기 조정, 분할 상환 O(lg n)
5. **스킵 리스트:** 균형 이진 트리의 대안, 기대 O(lg n)

**균형 유지 메커니즘:**
- **회전(Rotation):** BST 성질을 유지하면서 포인터를 재배치하는 O(1) 연산
- **재색칠(Recoloring):** 레드-블랙 트리에서 노드의 색을 변경
- **분할/병합:** B-트리에서 노드를 분할하거나 병합

**성능 비교:**
| 연산 | 일반 BST (최악) | 균형 트리 (최악) |
|------|----------------|-----------------|
| SEARCH | O(n) | O(lg n) |
| INSERT | O(n) | O(lg n) |
| DELETE | O(n) | O(lg n) |
| MIN/MAX | O(n) | O(lg n) |

균형 트리는 데이터베이스 인덱스, 파일 시스템, 메모리 관리 등 실무에서 핵심적인 자료구조이다.

## 예시

```
// 일반 BST: 1, 2, 3, 4, 5 순서로 삽입하면 선형 체인
// 1
//  \
//   2
//    \
//     3
//      \
//       4
//        \
//         5
// 높이 = 5, 검색 시간 = O(n)

// 레드-블랙 트리: 같은 원소지만 높이 보장
//       2(B)
//      / \
//     1(B) 4(R)
//          / \
//        3(B) 5(B)
// 높이 = 3 <= 2*lg(5+1) ≈ 5.17
// 검색 시간 = O(lg n)

// 회전 횟수 제한:
// RB-INSERT: 최대 2회 회전
// RB-DELETE: 최대 3회 회전
// -> 상수 시간의 구조적 변경
```

## 관련 개념

- [레드-블랙 트리 (Red-Black Tree)](/knowledge/algorithms/red-black-tree/)
- [회전 (Rotation)](/knowledge/algorithms/rotation/)
- [레드-블랙 트리 삽입 (RB Insertion)](/knowledge/algorithms/rb-insertion/)
- [레드-블랙 트리 삭제 (RB Deletion)](/knowledge/algorithms/rb-deletion/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
