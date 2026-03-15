---
title: "절단 성질 (Cut Property)"
description: "절단 성질(Cut Property)은 연결된 무방향 가중치 그래프에서 어떤 절단(cut)을 횡단하는 경량 간선(light edge)이 최소 신장 트리에 안전하게 추가될 수 있음을 보장하는 정리(Theorem 21"
tags: ['Cut Property', 'Minimum Spanning Tree', 'Graph Theory', 'Light Edge', 'Greedy Algorithm']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/cut-property
sidebar:
  order: 20
---

## 핵심 개념

절단 성질은 Kruskal과 Prim 알고리즘의 정확성을 보장하는 근본적인 정리이다.

**주요 정의**:
- **절단(Cut)**: (S, V-S) 형태로 정점 집합 V를 두 개의 비어있지 않은 부분 집합으로 분할
- **횡단(Cross)**: 간선 (u, v)의 한 끝점이 S에, 다른 끝점이 V-S에 속함
- **존중(Respect)**: 절단이 간선 집합 A를 존중한다 = A의 어떤 간선도 절단을 횡단하지 않음
- **경량 간선(Light edge)**: 절단을 횡단하는 간선 중 가중치가 최소인 간선

**Theorem 21.1 (절단 성질)**:
G = (V, E)가 연결된 무방향 가중치 그래프이고, A가 MST의 부분 집합이고, (S, V-S)가 A를 존중하는 절단이고, (u, v)가 이 절단의 경량 간선이면, (u, v)는 A에 대해 안전한 간선이다.

**증명 핵심 아이디어**:
A를 포함하는 MST T에서 (u, v)가 없으면, T의 u-v 경로 위에서 절단을 횡단하는 간선 (x, y)를 찾아 교체한다. w(u, v) <= w(x, y)이므로 교체 후에도 MST가 유지된다.

**Corollary 21.2**: 포리스트 G_A의 연결 요소 C를 다른 요소와 연결하는 경량 간선은 A에 대해 안전하다.

## 예시

```
절단 예시:
    S = {a, b, d}     V-S = {c, e, f}

    a ---4--- b ---8--- c
    |       / |         |
   1|     2/  |7       2|
    |    /    |         |
    d ---9--- e ---6--- f

절단을 횡단하는 간선: (b,c) 가중치 8, (b,e) 가중치 7, (d,e) 가중치 9
경량 간선: (b,e) 가중치 7 (세 횡단 간선 중 최소)

만약 A가 이 절단을 존중하면,
경량 간선을 안전하게 A에 추가할 수 있다.
```

## 관련 개념

- [최소 신장 트리 (Minimum Spanning Tree)](/knowledge/algorithms/minimum-spanning-tree/)
- [안전 간선 (Safe Edge)](/knowledge/algorithms/safe-edge/)
- [크루스칼 알고리즘 (Kruskal Algorithm)](/knowledge/algorithms/kruskal-algorithm/)
- [프림 알고리즘 (Prim Algorithm)](/knowledge/algorithms/prim-algorithm/)
- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/)
