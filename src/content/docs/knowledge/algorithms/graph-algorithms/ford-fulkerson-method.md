---
title: "포드-풀커슨 방법 (Ford-Fulkerson Method)"
description: "포드-풀커슨 방법(Ford-Fulkerson Method)은 잔여 네트워크에서 증가 경로(augmenting path)를 반복적으로 찾아 유량을 증가시키는 최대 유량 계산 방법으로, 증가 경로 탐색 전략에 따라 다양한 구현이 가능하다"
tags: ['Ford Fulkerson Method', 'Augmenting Path', 'Edmonds Karp', 'Maximum Flow', 'Residual Network']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/ford-fulkerson-method
sidebar:
  order: 25
---

## 핵심 개념

포드-풀커슨은 특정 알고리즘이 아니라 "방법(method)"으로, 증가 경로를 어떻게 찾느냐에 따라 여러 알고리즘이 파생된다.

**기본 동작**:
1. 모든 간선의 유량을 0으로 초기화
2. 잔여 네트워크 G_f에서 s에서 t로의 경로 p를 탐색
3. 경로 p의 잔여 용량 c_f(p) = min{c_f(u, v) : (u, v) in p}만큼 유량 증가
4. 증가 경로가 없을 때까지 반복

**잔여 용량과 유량 갱신**:
- 순방향 간선 (u, v) in E: c_f(u, v) = c(u, v) - f(u, v)
- 역방향 간선: c_f(v, u) = f(u, v)
- 증가 시: 순방향은 유량 증가, 역방향은 유량 감소 (취소)

**Edmonds-Karp 알고리즘**:
- BFS로 증가 경로를 찾는 포드-풀커슨 구현
- **시간 복잡도**: O(VE^2)
- BFS를 사용하므로 항상 최단 증가 경로(간선 수 기준)를 선택
- 핵심 보조정리: 잔여 그래프에서 각 정점까지의 BFS 거리는 증가 경로를 찾을 때마다 단조 증가
- 최대 O(VE)번의 증가 반복, 각 BFS는 O(E) -> 총 O(VE^2)

**일반 포드-풀커슨의 문제점**:
- 정수 용량: 최대 |f*|번 증가 -> O(E|f*|) (최대 유량 값에 비례)
- 비합리수 용량: 수렴하지 않거나 최적이 아닌 값에 수렴할 수 있음
- Edmonds-Karp는 이 문제를 O(VE^2)로 해결

## 예시

```
FORD-FULKERSON(G, s, t)
1  for each edge (u, v) in G.E
2      f[u, v] = 0
3  while there exists a path p from s to t in G_f
4      c_f(p) = min{c_f(u, v) : (u, v) in p}
5      for each edge (u, v) in p
6          if (u, v) in E
7              f[u, v] = f[u, v] + c_f(p)
8          else
9              f[v, u] = f[v, u] - c_f(p)

증가 경로 예시:
  잔여 그래프에서 s -> a -> b -> t 경로 발견
  잔여 용량: c_f(s,a)=10, c_f(a,b)=5, c_f(b,t)=8
  병목: c_f(p) = min(10, 5, 8) = 5
  갱신: f(s,a)+=5, f(a,b)+=5, f(b,t)+=5
  새 잔여: c_f(s,a)=5, c_f(a,b)=0, c_f(b,t)=3
           c_f(a,s)=5, c_f(b,a)=5, c_f(t,b)=5 (역방향)
```

## 관련 개념

- [최대 유량 (Maximum Flow)](/knowledge/algorithms/maximum-flow/)
- [유량 네트워크 (Flow Network)](/knowledge/algorithms/flow-network/)
- [잔여 네트워크 (Residual Network)](/knowledge/algorithms/residual-network/)
- [최대 유량 최소 절단 정리 (Max-Flow Min-Cut Theorem)](/knowledge/algorithms/max-flow-min-cut-theorem/)
- [Breadth First Search](/knowledge/algorithms/breadth-first-search/)
