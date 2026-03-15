---
title: "이진 탐색 트리 (Binary Search Tree)"
description: "이진 탐색 트리(Binary Search Tree, BST)는 각 정점에 키(key)가 부여된 이진 트리로, 모든 정점의 키가 왼쪽 서브트리의 모든 키보다 크고, 오른쪽 서브트리의 모든 키보다 작은 성질을 만족하는 자료 구조이다"
tags: ['Binary Search Tree', 'Bst', 'Tree', 'Searching', 'Data Structure', 'Binary Tree']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/binary-search-tree
sidebar:
  order: 3
---

## 핵심 개념

**구축 과정**: 리스트의 첫 번째 항목을 루트의 키로 설정한다. 새로운 항목을 추가할 때 루트부터 시작하여, 현재 정점의 키보다 작으면 왼쪽으로, 크면 오른쪽으로 이동한다. 자식이 없는 위치에 도달하면 그곳에 새 정점을 삽입한다.

**탐색 및 삽입 알고리즘** (Algorithm 1):
1. 루트에서 시작하여 현재 정점 v의 키와 x를 비교
2. x = label(v)이면 탐색 성공
3. x < label(v)이면 왼쪽 자식으로 이동
4. x > label(v)이면 오른쪽 자식으로 이동
5. 자식이 없으면 x를 새 정점으로 삽입

**복잡도 분석**:
- n개의 항목이 있는 BST를 포화 이진 트리 U로 확장하면, U의 내부 정점 수는 n, 잎 수는 n+1
- 최악의 경우 비교 횟수 = 트리의 높이
- 높이의 하한: h >= ceil(log_2(n+1))
- **균형 BST**: 높이가 ceil(log_2(n+1))이므로, 탐색/삽입에 최대 ceil(log_2(n+1))번 비교
- 불균형 BST: 최악의 경우 O(n) (한쪽으로 치우친 트리)

균형을 유지하는 알고리즘(AVL 트리 등)을 사용하면 최적의 최악 복잡도를 보장할 수 있다.

## 예시

```
단어 삽입 순서: mathematics, physics, geography, zoology,
               meteorology, geology, psychology, chemistry

구축 결과:
              mathematics
             /           \
        geography        physics
       /       \        /       \
  chemistry  geology  meteorology  zoology
                                   /
                              psychology

탐색 예시 - "oceanography" 찾기:
1. mathematics < oceanography → 오른쪽
2. physics > oceanography → 왼쪽
3. meteorology < oceanography → 오른쪽 (없음)
→ meteorology의 오른쪽 자식으로 삽입

복잡도:
- n = 8일 때, 균형 BST 높이 = ceil(log_2(9)) = 4
- 최대 4번의 비교로 탐색/삽입 가능
```

## 관련 개념

- [Rooted Tree](/knowledge/mathematics/rooted-tree/) - BST의 기반이 되는 이진 트리 구조
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - BST 삽입/탐색 알고리즘
- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/big-o-notation/) - BST 연산의 복잡도 분석
- [Tree Traversal](/knowledge/mathematics/tree-traversal/) - BST에서 중위 순회(inorder)는 정렬된 순서 생성
