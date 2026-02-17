---
title: "Hungarian Algorithm"
description: "헝가리안 알고리즘(Hungarian Algorithm, Kuhn-Munkres 알고리즘)은 가중치 이분 그래프에서 최소(또는 최대) 비용 완전 매칭을 O(V^3) 시간에 구하는 알고리즘으로, 할당 문제(assignment problem)의 표준 해법이다"
tags: ['Hungarian Algorithm', 'Assignment Problem', 'Weighted Bipartite Matching', 'Minimum Cost', 'Kuhn Munkres']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/hungarian-algorithm
sidebar:
  order: 30
---

## 핵심 개념

헝가리안 알고리즘은 최적성 조건(KKT 조건)을 유지하면서 매칭을 점진적으로 확장한다.

**할당 문제(Assignment Problem)**:
- n명의 작업자와 n개의 작업
- 비용 행렬 C: c_ij = 작업자 i가 작업 j를 수행하는 비용
- 목표: 총 비용을 최소화하는 일대일 배정 (완전 매칭)
- 수학적으로: min sum_i c_{i, sigma(i)}, sigma는 순열

**핵심 아이디어 - 정점 가격(Vertex Prices/Potentials)**:
- 각 정점에 가격(potential) y를 부여: y(l) for l in L, y(r) for r in R
- **실현 가능(feasible)**: y(l) + y(r) <= c(l, r) for all (l, r) in E (최소화 문제)
- **등가 간선(equality edge)**: y(l) + y(r) = c(l, r)인 간선
- **등가 부분그래프**: 등가 간선만으로 구성된 부분그래프

**약한 쌍대성(Weak Duality)**:
- 임의의 실현 가능한 가격 y에 대해: sum y(v) <= 임의의 완전 매칭 비용
- 등가 부분그래프에서 완전 매칭이 존재하면, 그것이 최적 매칭

**알고리즘 단계**:
1. 가격 초기화: y(l) = 0, y(r) = min_l c(l, r) (또는 적절한 초기값)
2. 등가 부분그래프에서 최대 매칭 시도 (Hopcroft-Karp 등 활용)
3. 완전 매칭이면 종료 (최적 해)
4. 아니면 가격 조정:
   - BFS/DFS로 등가 부분그래프에서 도달 가능한 정점 집합 확인
   - slack = min{c(l, r) - y(l) - y(r)} 계산 (도달 가능한 L, 도달 불가능한 R)
   - 도달 가능한 L 정점의 y += slack, 도달 가능한 R 정점의 y -= slack
5. 반복

**시간 복잡도**: O(V^3) - n번의 매칭 확장, 각 확장에 O(n^2) 가격 조정

**최대화 버전**: 부등식 방향을 뒤집거나 비용을 -c로 변환

## 예시

```
할당 문제 (최소 비용):
비용 행렬:
       작업1  작업2  작업3
작업자1 [  9,    2,    7]
작업자2 [  6,    4,    3]
작업자3 [  5,    8,    1]

단계 1 - 행 감소:
       [  7,    0,    5]   (각 행에서 최소값 빼기)
       [  3,    1,    0]
       [  4,    7,    0]

단계 2 - 열 감소:
       [  4,    0,    5]   (각 열에서 최소값 빼기)
       [  0,    1,    0]
       [  1,    7,    0]

등가 간선(0인 위치)에서 매칭 시도:
  작업자1 -> 작업2 (비용 0)
  작업자2 -> 작업1 또는 작업3
  작업자3 -> 작업3

매칭: {(1,작업2), (2,작업1), (3,작업3)}
원래 비용: 2 + 6 + 1 = 9 (최소 비용)
```

## 관련 개념

- [Bipartite Matching](/knowledge/algorithms/bipartite-matching/)
- [Stable Marriage](/knowledge/algorithms/stable-marriage/)
- [Maximum Flow](/knowledge/algorithms/maximum-flow/)
- [Graph](/knowledge/algorithms/graph/)
