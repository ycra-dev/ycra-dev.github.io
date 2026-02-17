---
title: "Flow Network"
description: "유량 네트워크(Flow Network)는 방향 그래프 G = (V, E)에 용량 함수 c: V x V -> R_>=0, 소스(source) 정점 s, 싱크(sink) 정점 t가 주어진 구조로, 간선에 유량을 흘려보내는 네트워크 모델이다"
tags: ['Flow Network', 'Capacity', 'Source', 'Sink', 'Maximum Flow']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/flow-network
sidebar:
  order: 23
---

## 핵심 개념

유량 네트워크는 최대 유량 문제의 기본 구조이다.

**구성 요소**:
- **방향 그래프** G = (V, E): 각 간선 (u, v)에 비음수 용량 c(u, v) >= 0
- **소스 s**: 유량이 생성되는 정점
- **싱크 t**: 유량이 도착하는 정점
- (u, v) not in E이면 c(u, v) = 0으로 가정

**반병렬(antiparallel) 간선 처리**:
- (u, v)와 (v, u)가 동시에 존재하면 안 됨 (교재의 정의)
- 해결: 새 정점 v'을 추가하여 (u, v')과 (v', v)로 분리
- 이를 통해 항상 반병렬 간선 없는 네트워크로 변환 가능

**다중 소스/싱크 처리**:
- 다중 소스 {s1, ..., sm}: 슈퍼소스 s를 추가하고 s -> si에 무한 용량 간선
- 다중 싱크 {t1, ..., tn}: 슈퍼싱크 t를 추가하고 ti -> t에 무한 용량 간선
- 이를 통해 단일 소스/싱크 문제로 환원

**유량의 속성**:
- 유량 f(u, v)는 간선 (u, v)의 용량 c(u, v)를 초과할 수 없음
- 소스와 싱크를 제외한 모든 정점에서 유량 보존 성립

## 예시

```
기본 유량 네트워크:
  s ---(c=16)---> v1 ---(c=12)---> t
  |                                ^
  (c=13)                          (c=20)
  |                                |
  v                                |
  v2 ---------(c=14)----------> v3

반병렬 간선 처리:
  원래: u <--(c=10)-- v, u --(c=5)--> v (반병렬)
  변환: u --(c=5)--> v, v --(c=10)--> v', v' --(c=10)--> u

다중 소스/싱크 변환:
  슈퍼소스 s 추가:
    s --(inf)--> s1, s --(inf)--> s2, s --(inf)--> s3
  슈퍼싱크 t 추가:
    t1 --(inf)--> t, t2 --(inf)--> t
```

## 관련 개념

- [Maximum Flow](/knowledge/algorithms/maximum-flow/)
- [Residual Network](/knowledge/algorithms/residual-network/)
- [Ford-Fulkerson Method](/knowledge/algorithms/ford-fulkerson-method/)
- [Graph](/knowledge/algorithms/graph/)
- [Adjacency List](/knowledge/algorithms/adjacency-list/)
