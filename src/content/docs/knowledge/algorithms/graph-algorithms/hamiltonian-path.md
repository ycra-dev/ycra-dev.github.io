---
title: "해밀턴 경로 (Hamiltonian Path)"
description: "그래프의 모든 정점을 정확히 한 번씩 방문하는 경로 — NP-완전이며 Gray code, TSP, 나이트 투어와 깊이 연결된 핵심 개념"
tags: ["Graph Theory", "NP-Complete", "Traveling Salesman", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/graph-algorithms/hamiltonian-path
sidebar:
  order: 32
---

## 핵심 개념

해밀턴 경로(Hamiltonian Path)는 그래프의 모든 정점을 정확히 한 번씩 방문하는 경로다. 해밀턴 사이클은 시작점으로 돌아오는 해밀턴 경로다.

W. R. Hamilton(1856)이 정12면체 위에서의 경로/사이클 찾기 퍼즐을 발명했다. 체스의 나이트 투어(knight's tour)로서의 역사는 9세기 인도로 거슬러 올라간다.

## 동작 원리

**NP-완전성:**
해밀턴 경로/사이클의 존재 여부를 결정하는 문제는 NP-완전이다. 일반 그래프에서 효율적 알고리즘이 없다.

**비해밀턴 그래프 예시:**
- Petersen 그래프: 3-정규, 비평면, 가장 작은 비해밀턴 3-정규 그래프
- 이분 그래프: |V₁| ≠ |V₂|이면 해밀턴 경로 없음

**충분 조건:**
- **Dirac's Theorem**: n ≥ 3이고 모든 정점의 차수 ≥ n/2이면 해밀턴 사이클 존재
- **Ore's Theorem**: d(u) + d(v) ≥ n (비인접한 u,v)이면 해밀턴

**관련 개념들:**
- **k-cube 그래프**: Hamming 거리 1인 정점들 연결 → 해밀턴 사이클 존재 (Gray code!)
- **Traveling Salesman Problem (TSP)**: 가중 그래프에서 최소 비용 해밀턴 사이클

## 예시

```python
def hamiltonian_path_backtrack(graph, n):
    """역추적으로 해밀턴 경로 탐색"""
    path = [0]
    visited = {0}

    def backtrack():
        if len(path) == n:
            return True
        u = path[-1]
        for v in graph.adj[u]:
            if v not in visited:
                path.append(v)
                visited.add(v)
                if backtrack():
                    return True
                path.pop()
                visited.remove(v)
        return False

    if backtrack():
        return path
    return None

# Held-Karp 알고리즘 (TSP, 동적 프로그래밍 O(2^n * n^2)):
def held_karp(dist, n):
    """모든 정점을 방문하는 최소 비용 해밀턴 사이클"""
    INF = float('inf')
    # dp[S][v] = 정점 집합 S를 방문하고 v에서 끝나는 최소 비용
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0  # 정점 0에서 시작

    for S in range(1, 1 << n):
        for v in range(n):
            if not (S >> v & 1):
                continue
            if dp[S][v] == INF:
                continue
            for u in range(n):
                if S >> u & 1:
                    continue
                new_S = S | (1 << u)
                dp[new_S][u] = min(dp[new_S][u], dp[S][v] + dist[v][u])

    return min(dp[(1 << n) - 1][v] + dist[v][0] for v in range(1, n))
```

## 관련 개념

- [그래프 이론 기초 (Graph Theory Basics)](/knowledge/algorithms/graph-algorithms/graph-theory-basics/)
- [그래프 색칠 (Graph Coloring)](/knowledge/algorithms/graph-algorithms/graph-coloring/)
- [그레이 코드 (Gray Code)](/knowledge/discrete-mathematics/combinatorics/gray-code/)
- [조합 탐색 (Combinatorial Searching)](/knowledge/algorithms/foundations/combinatorial-searching/)
