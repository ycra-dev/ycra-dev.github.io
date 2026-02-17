---
title: "Floyd-Warshall Algorithm"
description: "플로이드-워셜 알고리즘은 음수 가중치 간선(음수 사이클 제외)을 허용하는 가중치 방향 그래프에서 모든 쌍 최단 경로를 Theta(V^3) 시간에 계산하는 동적 프로그래밍 알고리즘이다"
tags: ['Floyd Warshall Algorithm', 'All Pairs Shortest Paths', 'Dynamic Programming', 'Transitive Closure']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/floyd-warshall-algorithm
sidebar:
  order: 16
---

## 핵심 개념

플로이드-워셜 알고리즘은 중간 정점(intermediate vertex)의 집합을 점진적으로 확장하는 방식으로 최단 경로를 계산한다.

**핵심 아이디어**:
- d_ij^(k): 중간 정점이 {1, 2, ..., k}에 속하는 i에서 j까지의 최단 경로 가중치
- k가 중간 정점이 아닌 경우: d_ij^(k) = d_ij^(k-1)
- k가 중간 정점인 경우: d_ij^(k) = d_ik^(k-1) + d_kj^(k-1)
- 따라서: d_ij^(k) = min(d_ij^(k-1), d_ik^(k-1) + d_kj^(k-1))

**점화식**:
- 기저: d_ij^(0) = w_ij (간선 가중치 행렬)
- 재귀: d_ij^(k) = min(d_ij^(k-1), d_ik^(k-1) + d_kj^(k-1)), k >= 1
- 최종 답: D^(n)

**시간 복잡도**: Theta(n^3) - 세 겹 중첩 for 루프
**공간 복잡도**: Theta(n^2) - 상첨자를 생략해도 정확 (FLOYD-WARSHALL')

**추이적 폐포(Transitive Closure)**:
- 간선 가중치를 모두 1로 설정하고 Floyd-Warshall 실행
- 또는 min -> OR, + -> AND로 치환하여 Theta(n^3) 시간에 계산
- t_ij^(k) = t_ij^(k-1) OR (t_ik^(k-1) AND t_kj^(k-1))
- 비트 연산이 산술 연산보다 빠르고 공간도 절약

**음수 사이클 감지**: d_ii < 0인 원소가 있으면 음수 사이클 존재

## 예시

```
FLOYD-WARSHALL(W, n)
1  D^(0) = W
2  for k = 1 to n
3      let D^(k) be a new n x n matrix
4      for i = 1 to n
5          for j = 1 to n
6              d_ij^(k) = min(d_ij^(k-1), d_ik^(k-1) + d_kj^(k-1))
7  return D^(n)

공간 최적화 버전:
FLOYD-WARSHALL'(W, n)
1  D = W
2  for k = 1 to n
3      for i = 1 to n
4          for j = 1 to n
5              d_ij = min(d_ij, d_ik + d_kj)
6  return D

핵심: k번째 반복에서 d_ik와 d_kj는 k를 중간 정점으로
사용해도 값이 변하지 않으므로 상첨자 생략 가능
```

## 관련 개념

- [All-Pairs Shortest Paths](/knowledge/algorithms/all-pairs-shortest-paths/)
- [Johnson Algorithm](/knowledge/algorithms/johnson-algorithm/)
- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
- [Negative Weight Cycle](/knowledge/algorithms/negative-weight-cycle/)
- [Adjacency Matrix](/knowledge/algorithms/adjacency-matrix/)
