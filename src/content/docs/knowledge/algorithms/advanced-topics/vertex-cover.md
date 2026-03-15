---
title: "정점 덮개 (Vertex Cover)"
description: "정점 커버(Vertex Cover)는 그래프의 모든 간선에 대해 적어도 한 끝점을 포함하는 정점 부분집합이며, 최소 정점 커버 문제는 NP-완전이지만 최적의 2배 이내인 다항 시간 2-근사 알고리즘이 존재한다"
tags: ['Vertex Cover', 'Approximation Algorithm', 'Maximal Matching', '2 Approximation', 'Np Complete']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/vertex-cover
sidebar:
  order: 7
---

## 핵심 개념

**문제 정의**:
- 무방향 그래프 G = (V, E)
- 정점 커버 V' ⊆ V: 모든 간선 (u,v) ∈ E에 대해 u ∈ V' 또는 v ∈ V'
- 목표: 최소 크기의 정점 커버 찾기

**APPROX-VERTEX-COVER 알고리즘**:
```
APPROX-VERTEX-COVER(G)
1  C = ∅
2  E' = G.E
3  while E' ≠ ∅
4      (u, v) = E'에서 임의의 간선 선택
5      C = C ∪ {u, v}
6      u 또는 v에 인접한 모든 간선을 E'에서 제거
7  return C
```
- 시간 복잡도: O(V + E)

**정확성 증명 (Theorem 35.1)**:
핵심 아이디어 — 선택된 간선 집합 A는 **극대 매칭(maximal matching)**:

1. **하한**: A의 어떤 두 간선도 끝점을 공유하지 않음
   → 최적 커버 C*는 A의 각 간선에서 최소 1개 정점 포함
   → |C*| ≥ |A|

2. **상한**: 알고리즘은 A의 각 간선에서 양쪽 끝점을 모두 선택
   → |C| = 2|A|

3. **결합**: |C| = 2|A| ≤ 2|C*|

**핵심 통찰**: 최적해의 크기를 모르면서도 **하한**과 비교하여 근사 비율 증명

**가중 정점 커버** (APPROX-MIN-WEIGHT-VC):
- 각 정점에 양의 가중치 w(v) 존재
- LP 이완 + 반올림:
  1. 0-1 정수 계획을 LP로 이완 (x(v) ∈ {0,1} → 0 ≤ x(v) ≤ 1)
  2. LP 최적해 계산
  3. x(v) ≥ 1/2인 정점을 커버에 포함
- 역시 2-근사 (Theorem 35.6)

## 예시

```
그래프: 7정점, 8간선
정점: a, b, c, d, e, f, g
간선: (a,b), (b,c), (c,e), (c,d), (e,f), (d,g), ...

APPROX-VERTEX-COVER 실행:
1. 간선 (b,c) 선택 → C = {b, c}
   (a,b), (b,c), (c,e), (c,d) 제거
2. 간선 (e,f) 선택 → C = {b, c, e, f}
   (e,f) 제거
3. 간선 (d,g) 선택 → C = {b, c, d, e, f, g}
   (d,g) 제거
4. E' = ∅ → 종료

결과: |C| = 6
최적해: {b, d, e}, |C*| = 3
근사 비율: 6/3 = 2 (상한 정확히 달성)
```

가중 버전 LP 이완 예:
```
간선 (u,v): 제약 x(u) + x(v) ≥ 1

LP 최적해: x(u) = 0.5, x(v) = 0.5 (분수)
반올림: x ≥ 0.5 → C에 포함

w(C) ≤ 2 · z* ≤ 2 · w(C*)
(z*: LP 최적값, w(C*): 정수 최적값)
```

## 관련 개념

- [근사 알고리즘 (Approximation Algorithm)](/knowledge/algorithms/approximation-algorithm/) - 정점 커버 근사의 상위 개념
- [근사 비율 (Approximation Ratio)](/knowledge/algorithms/approximation-ratio/) - 2-근사의 의미
- [NP-완전성 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - 정점 커버 결정 문제는 NPC
- [선형 계획법 (Linear Programming)](/knowledge/algorithms/linear-programming/) - 가중 정점 커버의 LP 이완
- [집합 덮개 (Set Cover)](/knowledge/algorithms/set-cover/) - 정점 커버의 일반화
