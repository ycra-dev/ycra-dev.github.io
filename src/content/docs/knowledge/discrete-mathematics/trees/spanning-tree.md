---
title: "Spanning Tree"
description: "단순 그래프 G의 신장 트리(spanning tree)는 G의 모든 정점을 포함하면서 트리인 G의 부분 그래프이다"
tags: ['Spanning Tree', 'Graph', 'Connected Graph', 'Subgraph', 'Network', 'Tree']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/spanning-tree
sidebar:
  order: 11
---

## 핵심 개념

**존재 정리 (정리 1)**: 단순 그래프가 연결 그래프일 필요충분조건은 신장 트리를 가지는 것이다.

**증명의 핵심 아이디어**:
- (→) 신장 트리가 있으면 모든 정점 쌍 사이에 경로가 존재하므로 연결
- (←) 연결 그래프에서 단순 순환이 있으면 순환의 간선 하나를 제거해도 여전히 연결. 순환이 없어질 때까지 반복하면 신장 트리 생성

**간선 제거 수**: n개 정점, m개 간선의 연결 그래프에서 신장 트리를 만들려면 m - (n-1) = m - n + 1개의 간선을 제거해야 한다.

**주요 응용**:
1. **도로 제설 문제**: 모든 마을을 연결하면서 최소 수의 도로만 제설
2. **IP 멀티캐스팅**: 데이터를 여러 수신 컴퓨터에 전달할 때, 루프 없이 효율적으로 라우팅하기 위해 신장 트리 사용
3. **네트워크 설계**: 모든 노드를 연결하는 최소 링크 수 결정

**신장 포레스트(Spanning Forest)**: 비연결 그래프의 경우, 각 연결 성분에 대해 신장 트리를 구하면 신장 포레스트가 된다. t개의 트리와 n개의 정점을 가진 포레스트는 n - t개의 간선을 가진다.

**신장 트리 구축 알고리즘**:
- 간선 제거 방법: 순환을 찾아 간선을 제거 (비효율적)
- 깊이 우선 탐색(DFS): O(e) 또는 O(n^2)
- 너비 우선 탐색(BFS): O(e) 또는 O(n^2)

## 예시

```
그래프 G:
  a --- b --- c
  |   / |     |
  | /   |     |
  e --- f --- g

신장 트리 구축 (간선 제거):
1. {a,e} 제거 (순환 a,b,e,a 해소)
2. {e,f} 제거 (순환 b,f,e,b 해소)
3. {c,g} 제거 (순환 c,f,g,c 해소)

결과 신장 트리:
  a --- b --- c
       /|
      / |
     e  f --- g

정점 6개, 간선 5개 (= 6-1)

IP 멀티캐스팅 예:
- 소스 컴퓨터 = 루트
- 라우터와 수신 네트워크 = 정점
- 링크 = 간선
→ 신장 트리를 구성하여 루프 없이 데이터 전달
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 신장 트리가 구축되는 원래 그래프
- [Depth-First Search](/knowledge/mathematics/depth-first-search/) - 신장 트리 구축 알고리즘
- [Breadth-First Search](/knowledge/mathematics/breadth-first-search/) - 신장 트리 구축 알고리즘
- [Minimum Spanning Tree](/knowledge/mathematics/minimum-spanning-tree/) - 가중 그래프에서의 최소 비용 신장 트리
