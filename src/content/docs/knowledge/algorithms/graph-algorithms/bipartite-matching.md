---
title: "이분 매칭 (Bipartite Matching)"
description: "이분 매칭(Bipartite Matching)은 이분 그래프 G = (L ∪ R, E)에서 서로 공유하는 정점이 없는 간선들의 최대 집합(최대 매칭)을 찾는 문제이다"
tags: ['Bipartite Matching', 'Bipartite Graph', 'Maximum Matching', 'Hopcroft Karp', 'Network Flow']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/bipartite-matching
sidebar:
  order: 28
---

## 핵심 개념

이분 매칭은 할당 문제, 직원-직무 배정, 학생-학교 배정 등 다양한 실세계 문제를 모델링한다.

**핵심 개념**:
- **매칭(Matching)**: 간선 집합 M ⊆ E에서 어떤 두 간선도 정점을 공유하지 않음
- **최대 매칭(Maximum Matching)**: 간선 수가 최대인 매칭
- **완전 매칭(Perfect Matching)**: 모든 정점이 매칭됨 (|M| = min(|L|, |R|))
- **증가 경로(Augmenting Path)**: 자유 정점에서 시작하여 자유 정점에서 끝나는, 매칭/비매칭 간선이 교대하는 경로

**Berge의 정리**: 매칭 M이 최대 ⟺ M에 대한 증가 경로가 존재하지 않음

**알고리즘들**:
1. **최대 유량 환원**: 슈퍼소스 s -> L, R -> 슈퍼싱크 t, 모든 용량 1
   - Ford-Fulkerson: O(VE), Edmonds-Karp: O(VE^2) 중 유리한 것
   - 정수성 정리에 의해 정수 유량 = 매칭

2. **Hopcroft-Karp 알고리즘**: O(E√V)
   - BFS로 최단 증가 경로 길이를 결정
   - DFS로 해당 길이의 최대 극대 집합(maximal set)의 증가 경로를 한 번에 찾음
   - 최대 O(√V)번의 반복 (phase), 각 반복 O(E)
   - 이분 매칭에 특화된 가장 효율적인 알고리즘 중 하나

3. **헝가리안 알고리즘**: 가중치 이분 매칭(할당 문제)에 사용

**Hopcroft-Karp 핵심 보조정리**:
- 매칭 M에서 최단 증가 경로 길이가 k이면, |M*| - |M| <= |M*|/k (M*은 최대 매칭)
- 따라서 √V번 반복 후 남은 증가 가능 횟수도 O(√V)

## 예시

```
HOPCROFT-KARP(G)
1  M = empty
2  while BFS finds augmenting path layers in G w.r.t. M
3      find a maximal set P of vertex-disjoint shortest augmenting paths
4      M = M ⊕ P  (대칭 차집합: 매칭/비매칭 간선 뒤집기)
5  return M

이분 그래프:
  L = {l1, l2, l3}, R = {r1, r2, r3}
  E = {(l1,r1), (l1,r2), (l2,r1), (l2,r3), (l3,r2)}

Phase 1: M = {}
  BFS: 자유 정점에서 길이 1 증가 경로 탐색
  DFS: l1-r1, l2-r3, l3-r2 찾음 (극대 집합)
  M = {(l1,r1), (l2,r3), (l3,r2)}

최대 매칭 크기: 3 (완전 매칭)

최대 유량 환원:
  s -> l1, l2, l3 (용량 1)
  r1, r2, r3 -> t (용량 1)
  l_i -> r_j (용량 1, 원래 간선)
  최대 유량 = 최대 매칭 크기
```

## 관련 개념

- [최대 유량 (Maximum Flow)](/knowledge/algorithms/maximum-flow/)
- [포드-풀커슨 방법 (Ford-Fulkerson Method)](/knowledge/algorithms/ford-fulkerson-method/)
- [안정 결혼 (Stable Marriage)](/knowledge/algorithms/stable-marriage/)
- [헝가리 알고리즘 (Hungarian Algorithm)](/knowledge/algorithms/hungarian-algorithm/)
- [그래프 (Graph)](/knowledge/algorithms/graph/)
