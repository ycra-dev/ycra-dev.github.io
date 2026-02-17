---
title: "Residual Network"
description: "잔여 네트워크(Residual Network) G_f는 유량 f가 주어진 유량 네트워크 G에서, 각 간선의 추가 유량 여유(잔여 용량)를 나타내는 그래프로, 증가 경로를 탐색하는 데 사용된다"
tags: ['Residual Network', 'Residual Capacity', 'Augmenting Path', 'Maximum Flow', 'Ford Fulkerson']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/residual-network
sidebar:
  order: 26
---

## 핵심 개념

잔여 네트워크는 현재 유량 상태에서 추가로 유량을 보내거나 기존 유량을 취소할 수 있는 가능성을 표현한다.

**잔여 용량(Residual Capacity)**:
- 순방향: c_f(u, v) = c(u, v) - f(u, v) (추가 유량 여유)
- 역방향: c_f(v, u) = f(u, v) (유량 취소 가능량)
- c_f(u, v) > 0인 간선만 잔여 네트워크에 포함

**잔여 네트워크의 구성**:
- E_f = {(u, v) in V x V : c_f(u, v) > 0}
- |E_f| <= 2|E| (각 원래 간선이 최대 2개의 잔여 간선 생성)
- 원래 간선 (u, v)에서: 순방향 (u, v)와 역방향 (v, u) 가능

**증가 경로(Augmenting Path)**:
- 잔여 네트워크 G_f에서 s에서 t까지의 단순 경로
- 경로의 잔여 용량: c_f(p) = min{c_f(u, v) : (u, v) in p}
- 이 값만큼 유량을 증가시킬 수 있음

**역방향 간선의 의미**:
- 이미 보낸 유량을 "취소"하는 효과
- 이를 통해 지역적으로 최적이 아닌 유량 배분을 수정 가능
- 포드-풀커슨 방법의 정확성을 보장하는 핵심 메커니즘

**Lemma**: G_f에서의 유량 f'과 G에서의 유량 f에 대해, f + f'도 G에서의 유효한 유량이며 |f + f'| = |f| + |f'|이다.

## 예시

```
원래 네트워크와 유량:
  s --(c=10, f=7)--> a --(c=5, f=5)--> t
  s --(c=8, f=3)---> b --(c=9, f=3)--> t
  a --(c=6, f=2)---> b

잔여 네트워크 G_f:
  s --(3)--> a       (c-f = 10-7 = 3)
  a --(7)--> s       (역방향: f = 7)
  a --(0)--> t       (불포함: c-f = 5-5 = 0)
  t --(5)--> a       (역방향: f = 5)
  s --(5)--> b       (c-f = 8-3 = 5)
  b --(3)--> s       (역방향: f = 3)
  b --(6)--> t       (c-f = 9-3 = 6)
  t --(3)--> b       (역방향: f = 3)
  a --(4)--> b       (c-f = 6-2 = 4)
  b --(2)--> a       (역방향: f = 2)

증가 경로: s -> a -> b -> t
잔여 용량: min(3, 4, 6) = 3
```

## 관련 개념

- [Maximum Flow](/knowledge/algorithms/maximum-flow/)
- [Flow Network](/knowledge/algorithms/flow-network/)
- [Ford-Fulkerson Method](/knowledge/algorithms/ford-fulkerson-method/)
- [Max-Flow Min-Cut Theorem](/knowledge/algorithms/max-flow-min-cut-theorem/)
