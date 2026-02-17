---
title: "Shortest Path"
description: "최단 경로(Shortest Path)는 가중치 방향 그래프 G = (V, E)에서 경로의 구성 간선 가중치 합이 최소인 경로를 말하며, 최단 경로 가중치 delta(u, v)는 u에서 v까지의 최소 경로 가중치로 정의된다"
tags: ['Shortest Path', 'Weighted Graph', 'Optimal Substructure', 'Single Source', 'Relaxation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/shortest-path
sidebar:
  order: 9
---

## 핵심 개념

최단 경로 문제는 네비게이션, 네트워크 라우팅 등 실생활에서 광범위하게 활용된다. 간선 가중치는 거리, 시간, 비용, 벌금 등 경로를 따라 선형적으로 누적되는 양을 나타낼 수 있다.

**문제 변형**:
1. **단일 소스(Single-source)**: 소스 s에서 모든 정점까지의 최단 경로 (Chapter 22)
2. **단일 목적지(Single-destination)**: 모든 정점에서 목적지 t까지 (간선 방향 반전으로 환원)
3. **단일 쌍(Single-pair)**: 특정 u에서 v까지 (단일 소스와 동일한 최악 시간)
4. **모든 쌍(All-pairs)**: 모든 정점 쌍 간의 최단 경로 (Chapter 23)

**최적 부분구조 (Lemma 22.1)**: 최단 경로의 부분 경로도 최단 경로이다. 이 성질이 동적 프로그래밍과 탐욕적 방법의 적용을 가능하게 한다.

**음수 가중치 간선**:
- 음수 가중치 사이클이 없으면 최단 경로가 잘 정의됨
- 소스에서 도달 가능한 음수 가중치 사이클이 있으면 delta(s, v) = -infinity
- Dijkstra: 음수 가중치 불가
- Bellman-Ford: 음수 가중치 허용, 음수 사이클 감지 가능

**사이클과 최단 경로**:
- 양수 가중치 사이클: 제거하면 더 짧은 경로
- 0 가중치 사이클: 제거해도 동일한 가중치
- 음수 가중치 사이클: 최단 경로 미정의
- 따라서 최단 경로는 단순 경로이며 최대 |V|-1개의 간선 포함

## 예시

```
최단 경로 가중치 정의:
delta(u, v) = min{w(p) : u ~> v} (경로가 존재하는 경우)
            = infinity           (경로가 존재하지 않는 경우)

예시:
  s --3--> a --(-4)--> b
  |                    ^
  +--5--> c --6--> d --(-3)--> c  (사이클 가중치 = 3 > 0)

delta(s, a) = 3
delta(s, b) = 3 + (-4) = -1
delta(s, c) = 5
```

## 관련 개념

- [Bellman-Ford Algorithm](/knowledge/algorithms/bellman-ford-algorithm/)
- [Dijkstra Algorithm](/knowledge/algorithms/dijkstra-algorithm/)
- [Relaxation](/knowledge/algorithms/relaxation/)
- [Negative Weight Cycle](/knowledge/algorithms/negative-weight-cycle/)
- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
- [Greedy Algorithm](/knowledge/algorithms/greedy-algorithm/)
