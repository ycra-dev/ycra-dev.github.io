---
title: "Tree Traversal"
description: "트리 순회(tree traversal)는 순서 루트 트리(ordered rooted tree)의 모든 정점을 체계적으로 방문하는 절차이다"
tags: ['Tree Traversal', 'Preorder', 'Inorder', 'Postorder', 'Prefix Notation', 'Postfix Notation', 'Expression Tree']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/tree-traversal
sidebar:
  order: 7
---

## 핵심 개념

**세 가지 순회 방법** (재귀적 정의, 루트 r과 서브트리 T1, T2, ..., Tn):

1. **전위 순회(Preorder)**: 루트 방문 → T1 전위 → T2 전위 → ... → Tn 전위
2. **중위 순회(Inorder)**: T1 중위 → 루트 방문 → T2 중위 → ... → Tn 중위
3. **후위 순회(Postorder)**: T1 후위 → T2 후위 → ... → Tn 후위 → 루트 방문

**시각적 단축법**: 트리 주위로 곡선을 그리며:
- 전위: 정점을 처음 지날 때 나열
- 중위: 잎은 처음 지날 때, 내부 정점은 두 번째 지날 때 나열
- 후위: 정점을 마지막으로 지날 때 나열

**수식 표현과의 관계**:
- 이진 트리로 산술 식을 표현할 수 있음 (내부 정점 = 연산자, 잎 = 피연산자)
- **중위 표기(Infix notation)**: 중위 순회 → 일반적인 수식 (괄호 필요)
- **전위 표기(Polish notation)**: 전위 순회 → 연산자가 피연산자 앞에 (괄호 불필요)
- **후위 표기(Reverse Polish notation)**: 후위 순회 → 연산자가 피연산자 뒤에 (괄호 불필요)

**실용적 가이드라인**:
- 전위 순회: 내부 정점을 잎보다 먼저 탐색해야 할 때 적합 (트리 복사, 직렬화)
- 후위 순회: 잎을 내부 정점보다 먼저 처리해야 할 때 적합 (트리 삭제, 위상 정렬)
- 중위 순회: BST에서 키의 오름차순 정렬 리스트 생성

## 예시

```
수식: ((x + y) ^ 2) + ((x - 4) / 3)

수식 트리:
          +
         / \
        ^    /
       / \  / \
      +  2  -  3
     / \   / \
    x   y x   4

전위 순회 (Polish notation):
+ ^ + x y 2 / - x 4 3

중위 순회 (Infix notation):
((x + y) ^ 2) + ((x - 4) / 3)

후위 순회 (Reverse Polish notation):
x y + 2 ^ x 4 - 3 / +

전위 식 평가 (오른쪽에서 왼쪽):
+ - * 2 3 5 / ^ 2 3 4
→ 2^3=8 → 8/4=2 → 2*3=6 → 6-5=1 → 1+2=3

후위 식 평가 (왼쪽에서 오른쪽):
7 2 3 * - 4 ^ 9 3 / +
→ 2*3=6 → 7-6=1 → 1^4=1 → 9/3=3 → 1+3=4
```

## 관련 개념

- [Rooted Tree](/knowledge/mathematics/rooted-tree/) - 순회 대상이 되는 순서 루트 트리
- [Binary Search Tree](/knowledge/mathematics/binary-search-tree/) - 중위 순회가 정렬 순서를 생성하는 트리
- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - 순회 알고리즘의 재귀적 구조
- [Algorithm](/knowledge/algorithms/algorithm/) - 순회의 알고리즘적 구현
