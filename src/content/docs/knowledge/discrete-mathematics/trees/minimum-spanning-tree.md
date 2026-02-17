---
title: "Minimum Spanning Tree"
description: "최소 신장 트리(Minimum Spanning Tree, MST)는 연결 가중 그래프의 신장 트리 중에서 간선 가중치의 합이 가장 작은 신장 트리이다"
tags: ['Minimum Spanning Tree', 'Mst', 'Weighted Graph', 'Optimization', 'Network Design']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/minimum-spanning-tree
sidebar:
  order: 12
---

## 핵심 개념

**문제 정의**: 연결 가중 그래프 G = (V, E)에서 모든 정점을 포함하면서 간선 가중치 합이 최소인 트리를 찾는 것이다.

**대표 알고리즘**:

**1. 프림 알고리즘(Prim's Algorithm)**:
- 최소 가중치 간선 하나로 시작
- 이미 트리에 있는 정점에 인접한 간선 중 최소 가중치이면서 순환을 만들지 않는 간선을 추가
- n-1개의 간선이 추가될 때까지 반복
- 복잡도: O(m log n), m은 간선 수, n은 정점 수

**2. 크루스칼 알고리즘(Kruskal's Algorithm)**:
- 전체 간선을 가중치 순으로 정렬
- 가중치가 가장 작은 간선부터 순서대로, 순환을 만들지 않는 경우에만 추가
- n-1개의 간선이 추가될 때까지 반복
- 복잡도: O(m log m)

**두 알고리즘의 차이**:
- Prim: 항상 현재 트리에 인접한 간선 선택 (트리가 연결 상태로 성장)
- Kruskal: 전체 그래프에서 최소 가중치 간선 선택 (포레스트에서 시작하여 트리로 합쳐짐)
- 희소 그래프: Kruskal이 유리 (m이 n^2에 비해 매우 작을 때)
- 그 외: 두 알고리즘의 복잡도 차이 미미

**정확성 증명 (프림 알고리즘)**:
- 프림 알고리즘이 선택한 간선 e1, ..., en-1에 대해, 최대 k개까지의 간선을 포함하는 MST T가 존재한다고 가정
- k < n-1이면, T에 e_{k+1}을 추가하면 순환이 생기고, 이 순환에서 현재 트리에 없는 간선 e를 찾음
- e를 제거하고 e_{k+1}을 추가하면 여전히 MST (e_{k+1}의 가중치 <= e의 가중치)
- k의 최대성에 모순 → k = n-1, 즉 전체 트리가 MST

**기타 알고리즘**: Sollin(Boruvka) 알고리즘 -- 각 단계에서 각 트리에 인접한 최소 가중치 간선을 동시에 추가. O(log n) 반복으로 수행.

## 예시

```
통신 네트워크 설계:
  뉴욕 ──$800── 시카고 ──$1200── 샌프란시스코
    |              |                  |
  $900          $700               $900
    |              |                  |
  애틀란타        덴버 ──────────────+

Prim 알고리즘:
Step 1: {시카고, 애틀란타} $700 (최소 간선)
Step 2: {애틀란타, 뉴욕} $800
Step 3: {시카고, 샌프란시스코} $1200
Step 4: {샌프란시스코, 덴버} $900
총 비용: $3600

Kruskal 알고리즘:
Step 1: {시카고, 애틀란타} $700
Step 2: {애틀란타, 뉴욕} $800
Step 3: {샌프란시스코, 덴버} $900
Step 4: {시카고, 샌프란시스코} $1200
총 비용: $3600 (동일한 MST)
```

## 관련 개념

- [Spanning Tree](/knowledge/mathematics/spanning-tree/) - MST의 기반 개념
- [Greedy Algorithm](/knowledge/mathematics/greedy-algorithm/) - Prim, Kruskal 모두 탐욕 알고리즘
- [Dijkstra's Algorithm](/knowledge/mathematics/dijkstras-algorithm/) - 유사한 탐욕적 접근법을 사용하는 최단 경로 알고리즘
- [Graph](/knowledge/mathematics/graph/) - MST가 구축되는 가중 그래프
- [Big-O Notation](/knowledge/mathematics/big-o-notation/) - MST 알고리즘의 복잡도 분석
