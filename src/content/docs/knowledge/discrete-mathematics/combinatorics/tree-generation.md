---
title: "트리 생성 (Tree Generation)"
description: "n개의 노드를 가진 모든 비표지 또는 표지 트리를 체계적으로 열거하는 알고리즘 — 중첩 괄호·레벨 수열·Prufer 수열 표현과 Catalan 수를 활용"
tags: ["Combinatorics", "Trees", "Forests", "Catalan", "Enumeration", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/tree-generation
sidebar:
  order: 29
---

## 핵심 개념

트리 생성(Tree Generation)은 n개의 노드를 가진 모든 비표지(unlabeled) 또는 표지(labeled) 트리(또는 포레스트)를 체계적으로 열거하는 알고리즘이다.

n 노드 이진 트리의 수 = 카탈란 수 Cₙ = C(2n,n)/(n+1).
n 정점 표지 트리의 수 = n^(n-2) (Cayley의 공식).

## 동작 원리

**주요 표현 형태:**

| 표현 | 정의 |
|------|------|
| 중첩 괄호(Nested Parentheses) | 포레스트를 재귀적으로 중첩된 괄호 문자열로 |
| 레벨 수열(Level Sequence) | z₁z₂...zₙ, zⱼ = j번 노드의 깊이 |
| 부모 포인터(Parent Pointer) | p₁p₂...pₙ, pⱼ = j번 노드의 부모 |
| Prufer 수열 | n-2개의 정수로 표지 트리를 1:1 인코딩 |

**Algorithm P (사전순 중첩 괄호):**
괄호 문자열 a₁a₂...a₂ₙ을 사전순으로 생성. 각 )를 오른쪽으로 이동하거나, 이전 블록으로 역추적.

**포레스트의 변환:**
- 켤레(Conjugate) Fᴿ: 좌우 대칭
- 전치(Transpose) Fᵀ: 이진 트리의 좌우 링크 교환

## 예시

```python
from math import comb

def catalan(n):
    """카탈란 수 Cₙ = 이진 트리 수"""
    return comb(2*n, n) // (n + 1)

def all_binary_trees(n):
    """n 노드 이진 트리를 재귀적으로 생성 (Cₙ개)"""
    if n == 0:
        yield None
        return
    for left in range(n):
        right = n - 1 - left
        for l_tree in all_binary_trees(left):
            for r_tree in all_binary_trees(right):
                yield (l_tree, r_tree)

def prufer_to_tree(sequence, n):
    """Prufer 수열 → 표지 트리 (에지 목록)"""
    degree = [1] * (n + 1)
    for v in sequence:
        degree[v] += 1

    edges = []
    import heapq
    leaves = sorted([v for v in range(1, n+1) if degree[v] == 1])

    for v in sequence:
        leaf = leaves.pop(0)
        edges.append((leaf, v))
        degree[v] -= 1
        if degree[v] == 1:
            import bisect
            bisect.insort(leaves, v)

    # 마지막 에지: 남은 두 노드
    remaining = [v for v in range(1, n+1) if degree[v] == 1]
    edges.append(tuple(remaining))
    return edges

def tree_to_prufer(edges, n):
    """표지 트리 에지 목록 → Prufer 수열"""
    adj = {i: [] for i in range(1, n+1)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    degree = {v: len(adj[v]) for v in range(1, n+1)}
    prufer = []

    for _ in range(n - 2):
        leaf = min(v for v in range(1, n+1) if degree[v] == 1)
        neighbor = adj[leaf][0]
        prufer.append(neighbor)
        degree[leaf] = 0
        degree[neighbor] -= 1
        adj[leaf].remove(neighbor)
        adj[neighbor].remove(leaf)

    return prufer

# Cayley의 공식: n^(n-2) 개의 표지 트리 존재
# n=4: 4^2 = 16개
print(f"n=4 표지 트리 수: {4**2}")  # 16
print(f"n=5 표지 트리 수: {5**3}")  # 125
```

## 관련 개념

- [카탈란 수 (Catalan Number)](/knowledge/discrete-mathematics/combinatorics/catalan-number/)
- [자유 트리 (Free Tree)](/knowledge/discrete-mathematics/trees/free-tree/)
- [조합 생성 (Combination Generation)](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
- [순열 생성 (Permutation Generation)](/knowledge/discrete-mathematics/combinatorics/permutation-generation/)
