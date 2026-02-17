---
title: "Rooted Tree"
description: "루트 트리(rooted tree)는 하나의 정점이 루트(root)로 지정되고, 모든 간선이 루트로부터 멀어지는 방향으로 향하는 트리이다"
tags: ['Rooted Tree', 'Tree', 'Binary Tree', 'M Ary Tree', 'Balanced Tree', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/rooted-tree
sidebar:
  order: 2
---

## 핵심 개념

루트 트리에서 사용되는 주요 용어:
- **부모(parent)**: 정점 v로 향하는 간선의 시작 정점 u
- **자식(child)**: u가 부모인 정점 v
- **형제(sibling)**: 같은 부모를 가진 정점들
- **조상(ancestor)**: 루트에서 해당 정점까지의 경로상의 정점들 (자기 자신 제외)
- **후손(descendant)**: 해당 정점을 조상으로 가지는 정점들
- **잎(leaf)**: 자식이 없는 정점
- **내부 정점(internal vertex)**: 자식이 있는 정점
- **레벨(level)**: 루트에서 해당 정점까지의 경로 길이 (루트의 레벨은 0)
- **높이(height)**: 정점들의 최대 레벨

**m-진 트리의 핵심 정리들**:
- 포화 m-진 트리에서 내부 정점이 i개이면 전체 정점 수 n = mi + 1
- 잎의 수 l = (m-1)i + 1
- 높이 h인 m-진 트리의 잎의 수는 최대 m^h개
- 잎이 l개인 m-진 트리의 높이 h >= ceil(log_m(l))
- 포화 균형 m-진 트리의 높이 h = ceil(log_m(l))

**이진 트리(binary tree)**는 m=2인 m-진 트리로, 각 자식은 왼쪽 자식(left child) 또는 오른쪽 자식(right child)으로 구분된다.

## 예시

```
포화 이진 트리 (full binary tree):
        a
       / \
      b   c
     / \ / \
    d  e f  g

- 내부 정점 (i=3): a, b, c
- 잎 (l=4): d, e, f, g
- 전체 정점: n = 2*3 + 1 = 7
- 높이: h = 2
- 잎 수 상한: 2^2 = 4 (실제로 4개)

균형 트리 판정:
- T1: 모든 잎이 레벨 3, 4에 있음 → 균형 ✓
- T2: 잎이 레벨 2, 3, 4에 있음 → 균형 ✗ (h=4인데 레벨 2에 잎 존재)

체인 레터 문제:
- 4-진 트리, 잎 l = 100 (편지를 보내지 않은 사람)
- 전체 사람 수: n = (4*100 - 1)/(4 - 1) = 133명
- 편지를 보낸 사람: i = 133 - 100 = 33명
```

## 관련 개념

- [Tree (Graph Theory)](/knowledge/mathematics/tree-graph-theory/) - 루트 트리의 기반이 되는 트리 개념
- [Binary Search Tree](/knowledge/mathematics/binary-search-tree/) - 이진 트리의 대표적 응용
- [Tree Traversal](/knowledge/mathematics/tree-traversal/) - 루트 트리의 정점 방문 순서
- [Decision Tree](/knowledge/mathematics/decision-tree/) - 의사결정을 모델링하는 루트 트리
