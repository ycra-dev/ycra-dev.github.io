---
title: "Dijkstra's Algorithm"
description: "다익스트라 알고리즘(Dijkstra's algorithm)은 가중 연결 단순 그래프에서 두 정점 사이의 최단 경로(shortest path)를 찾는 탐욕 알고리즘이다"
tags: ['Dijkstra', 'Shortest Path', 'Greedy Algorithm', 'Weighted Graph', 'Graph Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/dijkstra-algorithm
sidebar:
  order: 8
---

## 핵심 개념

**가중 그래프(Weighted Graph)**: 각 간선에 수(가중치)가 배정된 그래프. 경로의 길이는 경로에 포함된 간선 가중치들의 합이다. 최단 경로 문제는 두 정점 사이의 최소 길이 경로를 찾는 것이다.

**알고리즘 동작 원리**:
1. 시작 정점 a에 레이블 0, 나머지 정점에 무한대(infinity) 레이블 부여
2. 구분 집합 S = 공집합으로 초기화
3. S에 포함되지 않은 정점 중 레이블이 최소인 정점 u를 S에 추가
4. S에 포함되지 않은 모든 정점 v에 대해 레이블 갱신:
   L(v) = min{L(v), L(u) + w(u, v)}
5. 목표 정점 z가 S에 추가될 때까지 3-4단계 반복
6. z의 레이블이 a에서 z까지의 최단 경로 길이

**탐욕적 선택**: 매 단계에서 레이블이 가장 작은 정점을 선택하는 것이 최적의 선택임이 귀납법으로 증명된다. 이 과정에서 S에 추가된 정점의 레이블은 해당 정점까지의 실제 최단 거리이다.

**정확성 증명**: k번째 반복에서:
- (i) S 안의 모든 정점의 레이블은 a에서 해당 정점까지의 최단 경로 길이
- (ii) S 밖의 모든 정점의 레이블은 S의 정점만 통과하는 최단 경로 길이

**Floyd 알고리즘**: 모든 정점 쌍 사이의 최단 거리를 동시에 구하는 알고리즘. 시간 복잡도 O(n^3). 다익스트라가 단일 출발점 문제를 해결하는 반면, Floyd는 전체 쌍 문제를 해결한다.

**주의**: 다익스트라 알고리즘은 음의 가중치가 있는 간선에서는 정확하게 동작하지 않을 수 있다.

## 예시

```python
import heapq

def dijkstra(graph, start, end):
    """
    graph: {node: [(neighbor, weight), ...], ...}
    반환: (최단 거리, 경로)
    """
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    previous = {node: None for node in graph}
    pq = [(0, start)]  # (거리, 정점) 우선순위 큐

    while pq:
        current_dist, u = heapq.heappop(pq)
        if u == end:
            break
        if current_dist > distances[u]:
            continue
        for v, weight in graph[u]:
            new_dist = distances[u] + weight
            if new_dist < distances[v]:
                distances[v] = new_dist
                previous[v] = u
                heapq.heappush(pq, (new_dist, v))

    # 경로 복원
    path = []
    node = end
    while node is not None:
        path.append(node)
        node = previous[node]
    path.reverse()

    return distances[end], path

# 예시 그래프 (교과서 Figure 4)
graph = {
    'a': [('b', 4), ('c', 2)],
    'b': [('a', 4), ('c', 1), ('d', 5)],
    'c': [('a', 2), ('b', 1), ('d', 8), ('e', 10)],
    'd': [('b', 5), ('c', 8), ('e', 2), ('z', 6)],
    'e': [('c', 10), ('d', 2), ('z', 3)],
    'z': [('d', 6), ('e', 3)]
}

dist, path = dijkstra(graph, 'a', 'z')
print(f"최단 거리: {dist}")  # 13
print(f"최단 경로: {' -> '.join(path)}")  # a -> c -> b -> d -> e -> z
```

단계별 진행:
```
반복 0: S = {}, L(a)=0, L(b)=inf, L(c)=inf, L(d)=inf, L(e)=inf, L(z)=inf
반복 1: S = {a}, L(b)=4, L(c)=2
반복 2: S = {a,c}, L(b)=3, L(d)=10, L(e)=12 (c를 통해 갱신)
반복 3: S = {a,c,b}, L(d)=8 (b를 통해 갱신)
반복 4: S = {a,c,b,d}, L(e)=10, L(z)=14 (d를 통해 갱신)
반복 5: S = {a,c,b,d,e}, L(z)=13 (e를 통해 갱신)
반복 6: z가 S에 추가 -> 최단 거리 = 13
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 알고리즘이 적용되는 가중 그래프
- [Algorithm](/knowledge/algorithms/algorithm/) - 탐욕 알고리즘의 대표적 예
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - O(n^2) 시간 복잡도
- [Traveling Salesperson Problem](/knowledge/mathematics/traveling-salesperson-problem/) - 최단 경로의 확장 문제
- [Hamilton Path and Circuit](/knowledge/mathematics/hamilton-path-and-circuit/) - 정점 방문 경로와의 관계
