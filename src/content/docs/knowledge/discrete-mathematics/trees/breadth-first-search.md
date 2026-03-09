---
title: "Breadth-First Search"
description: "너비 우선 탐색(Breadth-First Search, BFS)은 그래프의 정점을 탐색하는 알고리즘으로, 시작 정점에서 레벨 단위로 확장하여 같은 레벨의 모든 정점을 먼저 방문한 후 다음 레벨로 진행하는 방식이다"
tags: ['Breadth First Search', 'Bfs', 'Spanning Tree', 'Graph Traversal', 'Shortest Path', 'Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/breadth-first-search
sidebar:
  order: 9
---

## 핵심 개념

**알고리즘 절차**:
1. 임의의 정점을 루트로 선택하고 리스트 L에 추가
2. L에서 첫 번째 정점 v를 꺼냄
3. v의 인접 정점 중 아직 방문하지 않은 정점 w를 트리 T에 추가하고 L의 끝에 추가
4. L이 빌 때까지 2-3 반복

```
procedure BFS(G: connected graph with vertices v1, ..., vn)
    T := tree consisting only of vertex v1
    L := empty list
    put v1 in L
    while L is not empty
        remove the first vertex, v, from L
        for each neighbor w of v
            if w is not in L and not in T then
                add w to end of L
                add w and edge {v, w} to T
```

**BFS의 핵심 성질**:
- BFS 신장 트리에서 정점의 레벨 = 원래 그래프에서 루트로부터의 최단 경로 길이
- 트리에 포함되지 않은 간선은 같은 레벨 또는 인접한 레벨의 정점들을 연결
- 복잡도: O(e) 또는 O(n^2)

**BFS vs DFS 선택 기준**:
- BFS가 적합한 경우: 최단 경로 탐색, 정점들의 레벨 분할이 필요할 때, 이분 그래프 판별
- DFS가 적합한 경우: 깊은 경로 탐색, 순환 감지, 위상 정렬, 강연결 성분 탐색
- 밀집 그래프(dense graph): DFS가 먼 정점에 빠르게 도달하므로 유리할 수 있음
- 희소 그래프(sparse graph): BFS의 레벨별 탐색이 효율적일 수 있음

**웹 크롤러(Web Crawler)에서의 활용**:
- Google의 Googlebot 등 검색 엔진은 BFS와 DFS를 모두 사용
- BFS: 시드 페이지에서 시작하여 모든 링크를 레벨별로 탐색 → 인기 있는 페이지에 빠르게 도달
- DFS: 시드 페이지에서 BFS가 도달하지 못하는 부분을 탐색

## 예시

```
그래프 G:
  a --- b --- c
  |         / |
  e --- d --- f
  |     |     |
  i --- h --- g --- j
        |           |
        k --- l --- m

BFS (시작 정점: e):

Level 0: e
Level 1: a, d, i         (e의 인접 정점)
Level 2: b, c, f, h      (Level 1의 인접 정점 중 미방문; a→b, d→c, d→f, d→h)
Level 3: g, k            (Level 2의 인접 정점 중 미방문; f→g, h→k)
Level 4: j, l            (Level 3의 인접 정점 중 미방문; g→j, k→l)
Level 5: m               (Level 4의 인접 정점 중 미방문; j→m 또는 l→m)

최단 경로: e에서 m까지 = 5 (레벨 5)
이는 원래 그래프에서의 최단 경로 길이와 동일
```

## 관련 개념

- [Spanning Tree](/knowledge/mathematics/spanning-tree/) - BFS의 결과물인 신장 트리
- [Depth-First Search](/knowledge/mathematics/depth-first-search/) - BFS와 대비되는 그래프 탐색 알고리즘
- [Graph](/knowledge/mathematics/graph/) - BFS의 입력 그래프
- [Algorithm](/knowledge/algorithms/algorithm/) - BFS의 알고리즘 구조
