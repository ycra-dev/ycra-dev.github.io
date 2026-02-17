---
title: "Depth-First Search"
description: "깊이 우선 탐색(Depth-First Search, DFS)은 그래프의 정점을 탐색하는 알고리즘으로, 시작 정점에서 가능한 한 깊이 경로를 확장한 후, 더 이상 새로운 정점으로 갈 수 없을 때 이전 정점으로 되돌아가(backtracking) 다른 경로를 탐색하는 ..."
tags: ['Depth First Search', 'Dfs', 'Backtracking', 'Spanning Tree', 'Graph Traversal', 'Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/depth-first-search
sidebar:
  order: 8
---

## 핵심 개념

**알고리즘 절차**:
1. 임의의 정점을 루트로 선택하고 트리 T에 추가
2. 현재 정점에서 아직 방문하지 않은 인접 정점으로 이동, 간선을 T에 추가
3. 가능한 한 깊이 경로를 확장
4. 새로운 정점으로 갈 수 없으면 이전 정점으로 되돌아감 (backtracking)
5. 되돌아간 정점에서 다른 미방문 정점으로 경로 탐색
6. 모든 정점이 방문될 때까지 반복

**간선의 분류**:
- **트리 간선(Tree edge)**: DFS에서 선택된 간선 (신장 트리의 간선)
- **후방 간선(Back edge)**: 트리에 포함되지 않은 간선으로, 정점을 그 조상 또는 후손에 연결

**복잡도**: O(e) 또는 O(n^2), 여기서 e는 간선 수, n은 정점 수

**방향 그래프에서의 DFS**:
- 방향 간선이 현재 정점에서 미방문 정점으로 향할 때만 간선 추가 가능
- 결과가 신장 트리가 아닌 신장 포레스트(spanning forest)가 될 수 있음
- 간선 분류: 전방 간선(forward edge), 후방 간선(back edge), 교차 간선(cross edge)

**재귀적 구조**:
```
procedure DFS(G: connected graph with vertices v1, ..., vn)
    T := tree consisting only of vertex v1
    visit(v1)

procedure visit(v: vertex of G)
    for each vertex w adjacent to v and not yet in T
        add vertex w and edge {v, w} to T
        visit(w)
```

## 예시

```
그래프 G:
  a --- b --- e
  |     |     |
  c --- d --- f
        |
  g --- h --- i
        |
        j --- k

DFS (시작 정점: f):
1. f → g → h → k → j (경로 확장, j에서 막힘)
2. k로 백트래킹 (새 경로 없음)
3. h로 백트래킹 → h → i (새 경로)
4. f로 백트래킹 → f → d → e → c → a (경로 확장)
5. c로 백트래킹 → c → b (새 경로)

결과 신장 트리:
  f - g - h - k - j
          |
          i
  f - d - e - c - a
                  |
                  b

백트래킹 응용:
- 그래프 색칠: n가지 색으로 그래프 색칠 가능한지 판별
- n-퀸 문제: n×n 체스판에 n개의 퀸 배치
- 부분집합 합: 주어진 합을 만드는 부분집합 찾기
```

## 관련 개념

- [Spanning Tree](/knowledge/mathematics/spanning-tree/) - DFS의 결과물인 신장 트리
- [Breadth-First Search](/knowledge/mathematics/breadth-first-search/) - DFS와 대비되는 그래프 탐색 알고리즘
- [Graph](/knowledge/mathematics/graph/) - DFS의 입력 그래프
- [Graph Coloring](/knowledge/mathematics/graph-coloring/) - 백트래킹으로 해결하는 문제
- [Hamilton Path](/knowledge/mathematics/hamilton-path/) - 백트래킹으로 탐색하는 경로 문제
- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - DFS의 재귀적 구조
