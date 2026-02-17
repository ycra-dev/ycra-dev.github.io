---
title: "All-Pairs Shortest Paths"
description: "모든 쌍 최단 경로(All-Pairs Shortest Paths) 문제는 가중치 방향 그래프 G = (V, E)에서 모든 정점 쌍 (u, v)에 대해 최단 경로 가중치 delta(u, v)를 계산하는 문제이다"
tags: ['All Pairs Shortest Paths', 'Matrix Multiplication', 'Dynamic Programming', 'Graph Algorithm']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/all-pairs-shortest-paths
sidebar:
  order: 14
---

## 핵심 개념

모든 쌍 최단 경로 문제의 대표적 응용은 도로 지도책의 도시 간 거리표 계산과 네트워크의 지름(diameter) 계산이다.

**해결 방법들**:
1. **단일 소스 반복 실행**: 각 정점에서 Dijkstra 또는 Bellman-Ford 실행
   - Dijkstra x |V|: O(V^3) (선형 배열) 또는 O(V^2 lg V + VE) (피보나치 힙)
   - Bellman-Ford x |V|: O(V^2 E) -> 밀집 그래프에서 O(V^4)

2. **행렬 곱셈 기반 (Section 23.1)**:
   - SLOW-APSP: Theta(V^4) - 점진적 확장
   - FASTER-APSP: Theta(V^3 lg V) - 반복 제곱법(repeated squaring)
   - min과 +를 사용하는 "열대 준환(tropical semiring)" 행렬 곱셈

3. **Floyd-Warshall (Section 23.2)**: Theta(V^3) - 동적 프로그래밍
4. **Johnson (Section 23.3)**: O(V^2 lg V + VE) - 희소 그래프에 최적

**입출력 형식**:
- 입력: n x n 가중치 행렬 W (인접 행렬 기반)
- 출력: n x n 최단 경로 가중치 행렬 D와 선행자 행렬 Pi

**행렬 곱셈과의 관계**:
- EXTEND-SHORTEST-PATHS는 행렬 곱셈과 구조적으로 동일
- 치환: a -> l, b -> w, c -> l', + -> min, * -> +
- 반복 제곱법으로 O(n^3 lg n) 달성

## 예시

```
입력 가중치 행렬 W:
     1    2    3    4    5
1 [  0,   3,   8,  inf, -4]
2 [inf,   0,  inf,  1,   7]
3 [inf,   4,   0,  inf, inf]
4 [  2,  inf, -5,   0,  inf]
5 [inf,  inf, inf,  6,   0]

출력 최단 경로 행렬 D = L^(n-1):
     1    2    3    4    5
1 [  0,   1,  -3,   2,  -4]
2 [  3,   0,  -4,   1,  -1]
3 [  7,   4,   0,   5,   3]
4 [  2,  -1,  -5,   0,  -2]
5 [  8,   5,   1,   6,   0]
```

## 관련 개념

- [Floyd-Warshall Algorithm](/knowledge/algorithms/floyd-warshall-algorithm/)
- [Johnson Algorithm](/knowledge/algorithms/johnson-algorithm/)
- [Matrix Multiplication Shortest Paths](/knowledge/algorithms/matrix-multiplication-shortest-paths/)
- [Shortest Path](/knowledge/algorithms/shortest-path/)
- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/)
