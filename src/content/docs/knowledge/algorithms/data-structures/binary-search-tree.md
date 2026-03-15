---
title: "이진 탐색 트리 (Binary Search Tree)"
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

## TAOCP 분석 (Knuth, Vol.3)

TAOCP의 이진 탐색 트리(Section 6.2, Algorithm T)의 주요 특성:

**대칭 순서(Symmetric Order) 성질:**
모든 노드 x에 대해 LLINK(x) 서브트리의 모든 키 < KEY(x) < RLINK(x) 서브트리의 모든 키. 각 노드는 KEY, LLINK, RLINK 필드를 가진다.

**삭제 알고리즘 (Algorithm D):**
삭제는 세 경우로 분류:
- 리프 노드: 직접 삭제
- 자식 1개: 자식으로 대체
- 자식 2개: 좌측 서브트리의 최대값(또는 우측 최소값)으로 대체

**성능 분석 (Knuth 정밀 분석):**
- 랜덤 N개 삽입 후 평균 탐색 비교 횟수: 약 **2 ln N ≈ 1.386 lg N**
- 내부 경로 길이(Internal Path Length): 퀵정렬 분석과 동일한 구조
- 최악의 경우 (정렬된 입력): O(N) - 편향 트리(degenerate tree) 형성

**편향 트리 문제:**
정렬된 순서로 삽입하면 선형 리스트와 동일한 구조가 되어 O(N) 탐색이 발생한다. AQUARIUS → CAPRICORN → ARIES → GEMINI 순으로 삽입하면 한쪽으로 치우친 트리가 생성된다. 이를 해결하기 위해 AVL 트리, B-트리 등의 균형 트리가 개발되었다.

**BST vs 이진 탐색 비교:**
- BST: O(log N) 평균, 동적 삽입/삭제 가능
- 이진 탐색: O(log N) 확정적, 정적 배열만 가능

## 관련 개념

- [중위 순회 (Inorder Traversal)](/knowledge/algorithms/inorder-traversal/)
- [트리 탐색 (Tree Search)](/knowledge/algorithms/tree-search/)
- [BST Insertion Deletion](/knowledge/algorithms/bst-insertion-deletion/)
- [레드-블랙 트리 (Red-Black Tree)](/knowledge/algorithms/red-black-tree/)
- [루트 트리 (Rooted Tree)](/knowledge/algorithms/rooted-tree/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
