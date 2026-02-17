---
title: "Strongly Connected Component"
description: "강연결 요소(SCC)는 방향 그래프 G = (V, E)에서 모든 정점 쌍 u, v 사이에 u에서 v로의 경로와 v에서 u로의 경로가 모두 존재하는 극대(maximal) 정점 집합 C이다"
tags: ['Strongly Connected Component', 'Scc', 'Directed Graph', 'Depth First Search', 'Transpose Graph']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/strongly-connected-component
sidebar:
  order: 7
---

## 핵심 개념

강연결 요소 분해는 방향 그래프를 분석하는 고전적인 DFS 응용이다. 분해 후 각 SCC를 하나의 정점으로 축약하면 비순환 그래프(DAG)인 요소 그래프(component graph) G^SCC를 얻는다.

**Kosaraju-Sharir 알고리즘**:
1. G에 DFS를 실행하여 각 정점의 종료 시간 u.f를 계산
2. G의 전치 그래프 G^T를 생성 (모든 간선 방향 반전)
3. G^T에 DFS를 실행하되, 1단계에서 계산한 u.f의 내림차순으로 정점 탐색
4. 3단계에서 생성된 각 DFS 트리가 하나의 강연결 요소

**시간 복잡도**: Theta(V + E) - 두 번의 DFS와 전치 그래프 생성

**핵심 성질**:
- G와 G^T는 동일한 강연결 요소를 가진다 (Lemma 20.13)
- 요소 그래프 G^SCC는 항상 DAG이다
- SCC C와 C'에 대해, C에서 C'로 가는 간선이 있으면 f(C) > f(C') (Lemma 20.14)
- 두 번째 DFS에서 각 트리는 정확히 하나의 SCC에 대응 (Theorem 20.16)

**요소 그래프(Component Graph)**:
- 각 SCC를 하나의 슈퍼 정점으로 축약
- SCC 간에 간선이 있으면 슈퍼 정점 간에도 간선 존재
- 결과 그래프는 항상 DAG

## 예시

```
STRONGLY-CONNECTED-COMPONENTS(G)
1  call DFS(G) to compute finish times u.f for each vertex u
2  compute G^T
3  call DFS(G^T), considering vertices in order of decreasing u.f
4  output each tree in the depth-first forest of step 3
   as a separate strongly connected component

예시:
  a --> b --> c --> d
  ^         |     |
  |         v     v
  h <-- g <-- f <-- e

SCC들: {a, b, e, h}, {c, d}, {f, g}

요소 그래프:
  {a,b,e,h} --> {c,d}
              \     |
               v    v
              {f,g}
```

## 관련 개념

- [Depth-First Search](/knowledge/algorithms/depth-first-search/)
- [Graph](/knowledge/algorithms/graph/)
- [Topological Sort](/knowledge/algorithms/topological-sort/)
