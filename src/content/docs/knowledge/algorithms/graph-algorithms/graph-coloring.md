---
title: "Graph Coloring"
description: "인접한 두 정점에 같은 색을 부여하지 않으면서 최소 개수의 색으로 모든 정점을 채색하는 문제 — 4색 정리와 채색수 χ(G)가 핵심"
tags: ["Graph Theory", "NP-Complete", "Chromatic Number", "Four Color", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/graph-algorithms/graph-coloring
sidebar:
  order: 33
---

## 핵심 개념

그래프 채색(Graph Coloring)은 인접한 두 정점에 같은 색을 부여하지 않으면서 최소 개수의 색(=채색수 χ(G))으로 모든 정점에 색을 부여하는 문제다. k-채색가능(k-colorable)은 k가지 이하의 색으로 채색 가능하다는 의미다.

## 동작 원리

**4색 정리(Four Color Theorem):**
모든 평면 그래프는 4-채색가능하다.
- 1852년 Guthrie가 추측
- 1977년 Appel, Haken, Koch가 컴퓨터 도움으로 증명
- O(n²) 시간에 4-채색 가능 (Robertson et al.)

**2-채색 = 이분 그래프:**
그래프가 2-채색가능 ⟺ 홀수 사이클이 없다 (König)
→ BFS로 O(m+n) 시간에 판별

**채색수의 경계:**
- χ(G) ≤ Δ(G) + 1 (최대 차수 + 1)
- 클리크 수 ω(G) ≤ χ(G)

**변(edge) 채색:**
인접한 두 간선에 같은 색 불허. 변 채색수 χ'(G) = Δ(G) 또는 Δ(G)+1 (Vizing's theorem)

**Exact Cover와의 관계:**
그래프 k-채색 문제는 Exact Cover로 변환 가능:
- 각 (정점, 색) 쌍이 행
- 각 정점과 각 간선이 열
- 조건: 각 정점은 정확히 하나의 색, 인접 정점 쌍은 같은 색 불허

## 예시

```python
# 그리디 채색 (최적이 아닐 수 있음)
def greedy_coloring(adj, n):
    color = [-1] * n
    for v in range(n):
        # 이웃에서 사용된 색들
        used_colors = {color[u] for u in adj[v] if color[u] != -1}
        # 가장 작은 미사용 색 부여
        c = 0
        while c in used_colors:
            c += 1
        color[v] = c
    return color, max(color) + 1

# 역추적으로 정확한 k-채색
def k_colorable(adj, n, k):
    color = [-1] * n

    def backtrack(v):
        if v == n:
            return True
        for c in range(k):
            if all(color[u] != c for u in adj[v]):
                color[v] = c
                if backtrack(v + 1):
                    return True
                color[v] = -1
        return False

    return backtrack(0), color

# 이분 그래프 판별 (2-채색)
from collections import deque

def is_bipartite_coloring(adj, n):
    color = [-1] * n
    for start in range(n):
        if color[start] != -1:
            continue
        color[start] = 0
        q = deque([start])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if color[v] == -1:
                    color[v] = 1 - color[u]
                    q.append(v)
                elif color[v] == color[u]:
                    return False, []
    return True, color
```

## 관련 개념

- [Graph Theory Basics](/knowledge/algorithms/graph-algorithms/graph-theory-basics/)
- [Hamiltonian Path](/knowledge/algorithms/graph-algorithms/hamiltonian-path/)
- [Boolean Satisfiability](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [Graph Isomorphism](/knowledge/algorithms/graph-algorithms/graph-isomorphism/)
