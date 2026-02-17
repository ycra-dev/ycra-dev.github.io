---
title: "Traveling Salesperson"
description: "외판원 문제(Traveling Salesperson Problem, TSP)는 완전 그래프의 모든 정점을 정확히 한 번 방문하는 최소 비용 해밀턴 순환을 찾는 NP-완전 문제로, 삼각 부등식을 만족하는 경우 MST 기반 2-근사 알고리즘이 존재한다"
tags: ['Traveling Salesperson', 'Tsp', 'Approximation Algorithm', 'Minimum Spanning Tree', 'Triangle Inequality']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/traveling-salesperson
sidebar:
  order: 8
---

## 핵심 개념

**문제 정의**:
- 완전 무방향 그래프 G = (V, E), 비용 함수 c(u,v) ≥ 0
- 목표: 최소 비용 해밀턴 순환(투어) 찾기

**삼각 부등식**: c(u,w) ≤ c(u,v) + c(v,w) — 중간 경유가 비용을 줄이지 않음

**APPROX-TSP-TOUR 알고리즘** (삼각 부등식 필요):
```
APPROX-TSP-TOUR(G, c)
1  정점 r을 루트로 선택
2  MST-PRIM(G, c, r)로 최소 신장 트리 T 계산
3  T의 전위 순회(preorder walk) 순서로 정점 나열 → H
4  return 해밀턴 순환 H
```
- 시간 복잡도: Θ(V²)

**2-근사 증명 (Theorem 35.2)**:
1. **하한**: 최적 투어 H*에서 간선 하나 삭제 → 신장 트리
   → c(T) ≤ c(H*) (MST는 최소)

2. **전체 순회(full walk)** W: T의 각 간선을 정확히 2번 통과
   → c(W) = 2·c(T) ≤ 2·c(H*)

3. **전위 순회**: W에서 중복 방문 정점 제거
   → 삼각 부등식에 의해 비용 증가 없음
   → c(H) ≤ c(W) ≤ 2·c(H*)

**일반 TSP의 근사 불가능성 (Theorem 35.3)**:
- 삼각 부등식 없으면, P ≠ NP 가정 하에 임의의 상수 ρ에 대해 ρ-근사 불가
- 증명: HAM-CYCLE를 TSP로 환원
  - G의 간선: 비용 1
  - G에 없는 간선: 비용 ρ|V| + 1
  - 해밀턴 순환 있으면 비용 |V|, 없으면 비용 > ρ|V|
  - ρ-근사 알고리즘이 있으면 HAM-CYCLE을 다항 시간에 해결 → 모순

## 예시

```
정점: a, b, c, d, e, f, g, h (평면 위 격자점)
비용: 유클리드 거리 (삼각 부등식 만족)

APPROX-TSP-TOUR 실행:
1. 루트 r = a
2. MST-PRIM → T (간선: a-b, b-c, b-h, a-d, d-e, e-f, e-g)
3. T의 전체 순회: a, b, c, b, h, b, a, d, e, f, e, g, e, d, a
   전위 순회 (첫 방문만): a, b, c, h, d, e, f, g
4. 투어 H: a → b → c → h → d → e → f → g → a

결과:
  근사 투어 H: 비용 ≈ 19.074
  최적 투어 H*: 비용 ≈ 14.715
  비율: 19.074 / 14.715 ≈ 1.30 (2 이내 ✓)
```

일반 TSP 근사 불가능성 예:
```
G = 3정점 사이클 (a-b-c-a), ρ = 2

TSP 인스턴스 구성:
  c(a,b) = c(b,c) = c(a,c) = 1  (G의 간선)

HAM-CYCLE 있음 → 최적 투어 비용 = 3
2-근사 알고리즘은 비용 ≤ 6인 투어 반환
→ HAM-CYCLE 존재 여부 판별 가능 → 다항 시간에 NPC 해결 → 모순
```

## 관련 개념

- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - TSP 근사의 상위 개념
- [Approximation Ratio](/knowledge/algorithms/approximation-ratio/) - 2-근사의 의미
- [NP-Completeness](/knowledge/algorithms/np-completeness/) - TSP 결정 문제는 NPC
- [Vertex Cover](/knowledge/algorithms/vertex-cover/) - 같은 장의 다른 2-근사 문제
- [Set Cover](/knowledge/algorithms/set-cover/) - 다른 유형의 근사 알고리즘
