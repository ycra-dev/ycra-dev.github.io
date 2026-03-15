---
title: "안전 간선 (Safe Edge)"
description: "안전한 간선(Safe Edge)은 MST 알고리즘에서 현재 간선 집합 A에 추가해도 A가 여전히 어떤 최소 신장 트리의 부분 집합으로 유지되는 간선이다"
tags: ['Safe Edge', 'Minimum Spanning Tree', 'Greedy Algorithm', 'Graph Theory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/safe-edge
sidebar:
  order: 19
---

## 핵심 개념

안전한 간선 개념은 일반적인 MST 성장 방법(GENERIC-MST)의 핵심이다. 매 단계에서 안전한 간선을 찾아 추가하면, 알고리즘 종료 시 올바른 MST를 얻는다.

**안전한 간선을 인식하는 규칙 (Theorem 21.1)**:
A를 존중하는 절단을 횡단하는 경량 간선은 항상 안전하다. 이 규칙이 Kruskal과 Prim 알고리즘의 기반이 된다.

**GENERIC-MST에서의 역할**:
- 루프 불변식: "A는 어떤 MST의 부분 집합"
- 초기화: A = 공집합이므로 자명하게 성립
- 유지: 안전한 간선만 추가하므로 불변식 유지
- 종료: A가 신장 트리를 형성하면 종료 -> A는 MST

**안전한 간선의 존재 보장**:
A가 MST의 적절한 부분 집합인 동안, A를 포함하는 MST T에서 A에 속하지 않는 간선이 존재하며, 이러한 간선은 안전하다.

**Kruskal에서의 안전한 간선**: 서로 다른 두 컴포넌트를 연결하는 가장 가벼운 간선
**Prim에서의 안전한 간선**: 현재 트리와 트리 외부 정점을 연결하는 가장 가벼운 간선

## 예시

```
GENERIC-MST(G, w)
1  A = empty set           // 불변식: A는 MST의 부분 집합
2  while A does not form a spanning tree
3      find an edge (u,v) that is safe for A  // 핵심 단계
4      A = A union {(u,v)}
5  return A

안전성 판단 예시:
  현재 A = {(a,b), (b,c)}
  이 시점에서 A를 존중하는 절단: ({a,b,c}, {d,e,f})
  이 절단의 경량 간선: (c,d) 가중치 3
  -> (c,d)는 A에 대해 안전한 간선!

  만약 (d,e) 가중치 2가 절단을 횡단하지 않는다면,
  (c,d)가 경량 간선이 아닐 수 있으므로 다른 절단을 확인해야 함.
```

## 관련 개념

- [최소 신장 트리 (Minimum Spanning Tree)](/knowledge/algorithms/minimum-spanning-tree/)
- [절단 성질 (Cut Property)](/knowledge/algorithms/cut-property/)
- [크루스칼 알고리즘 (Kruskal Algorithm)](/knowledge/algorithms/kruskal-algorithm/)
- [프림 알고리즘 (Prim Algorithm)](/knowledge/algorithms/prim-algorithm/)
- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/)
