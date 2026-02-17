---
title: "Max-Flow Min-Cut Theorem"
description: "최대 유량-최소 컷 정리(Max-Flow Min-Cut Theorem)는 유량 네트워크에서 최대 유량의 값이 최소 컷의 용량과 같다는 정리로, 선형 프로그래밍 쌍대성의 특수한 경우이다"
tags: ['Max Flow Min Cut Theorem', 'Maximum Flow', 'Minimum Cut', 'Network Flow', 'Duality']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/max-flow-min-cut-theorem
sidebar:
  order: 27
---

## 핵심 개념

이 정리는 네트워크 유량 이론의 가장 중요한 정리 중 하나로, 최대 유량 알고리즘의 정확성을 보장한다.

**컷(Cut)의 정의**:
- 유량 네트워크 G = (V, E)의 컷 (S, T)는 V를 S와 T = V - S로 분할하되 s in S, t in T인 분할
- **컷의 순유량**: f(S, T) = sum_{u in S, v in T} f(u, v) - sum_{u in T, v in S} f(u, v) (교차 유량)
- **컷의 용량**: c(S, T) = sum_{u in S, v in T} c(u, v) (S에서 T로의 용량 합)
- **최소 컷**: 모든 컷 중 용량이 최소인 컷

**핵심 보조정리들**:
1. f(S, T) = |f| (임의의 컷에 대해 순유량 = 유량 값)
2. |f| <= c(S, T) (유량 값 <= 임의의 컷 용량)

**정리 (Theorem 24.9)**: 다음 세 조건은 동치이다:
1. f는 최대 유량
2. 잔여 네트워크 G_f에 증가 경로가 없음
3. |f| = c(S, T)인 컷 (S, T)가 존재

**증명 핵심**:
- (1) -> (2): 증가 경로가 있으면 유량 증가 가능 (모순)
- (2) -> (3): G_f에서 s로부터 도달 가능한 정점 집합 S, 나머지 T -> 이 컷의 용량 = |f|
- (3) -> (1): |f| <= c(S', T') for all cuts, |f| = c(S, T) -> f는 최대

**의의**:
- 포드-풀커슨 방법의 종료 시 정확성 보장
- 최대 유량 = 최소 컷으로 쌍대 문제 해결
- 정수 용량이면 정수 최대 유량 존재 (정수성 정리)

## 예시

```
유량 네트워크:
  s --10--> a --8--> t
  s --5---> b --7--> t
  a --3---> b

최대 유량: |f| = 15
  s->a: 10, a->t: 8, a->b: 2
  s->b: 5,  b->t: 7

최소 컷: S = {s, a}, T = {b, t}
  용량 = c(a, t) + c(a, b) + c(s, b)
       = 8 + 3 + 5 = 16 (이 컷은 최소가 아님)

최소 컷: S = {s}, T = {a, b, t}
  용량 = c(s, a) + c(s, b) = 10 + 5 = 15

검증: 최대 유량(15) = 최소 컷 용량(15) ✓

포드-풀커슨 종료 시:
  잔여 그래프에서 s->t 경로 없음
  -> s에서 도달 가능: S = {s}
  -> 나머지: T = {a, b, t}
  -> c(S, T) = 15 = |f|
```

## 관련 개념

- [Maximum Flow](/knowledge/algorithms/maximum-flow/)
- [Flow Network](/knowledge/algorithms/flow-network/)
- [Ford-Fulkerson Method](/knowledge/algorithms/ford-fulkerson-method/)
- [Residual Network](/knowledge/algorithms/residual-network/)
- [Bipartite Matching](/knowledge/algorithms/bipartite-matching/)
