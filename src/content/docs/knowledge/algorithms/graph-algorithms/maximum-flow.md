---
title: "최대 유량 (Maximum Flow)"
description: "최대 유량(Maximum Flow)은 유량 네트워크에서 소스(source) s에서 싱크(sink) t로 보낼 수 있는 최대 유량 값을 구하는 문제이다"
tags: ['Maximum Flow', 'Flow Network', 'Ford Fulkerson', 'Graph Algorithm', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/maximum-flow
sidebar:
  order: 24
---

## 핵심 개념

최대 유량 문제는 네트워크 최적화의 핵심 문제로, 수많은 실세계 문제를 모델링할 수 있다.

**유량의 정의**:
- 유량 f: V x V -> R은 다음 두 조건을 만족:
  1. **용량 제약**: 0 <= f(u, v) <= c(u, v) for all (u, v)
  2. **유량 보존**: sum_v f(v, u) = sum_v f(u, v) for all u != s, t

- **유량 값**: |f| = sum_v f(s, v) - sum_v f(v, s) (소스에서 나가는 순유량)

**주요 알고리즘**:
1. **Ford-Fulkerson 방법**: 증가 경로(augmenting path)를 반복적으로 찾아 유량 증가
2. **Edmonds-Karp 알고리즘**: BFS로 증가 경로를 찾는 Ford-Fulkerson 구현, O(VE^2)
3. **Push-Relabel**: 전위유량(preflow) 기반, O(V^2 E) 또는 O(V^3)

**응용 분야**:
- 네트워크 대역폭 최적화
- 이분 매칭 (최대 유량으로 환원)
- 최소 컷 문제 (Max-Flow Min-Cut 정리)
- 프로젝트 선택, 야구 팀 탈락 판별 등

**핵심 정리**: Max-Flow Min-Cut 정리에 의해, 최대 유량 = 최소 컷의 용량이다.

## 예시

```
유량 네트워크 예시 (CLRS Fig 24.1):
  s ---16---> v1 ---12---> t
  |            | \          ^
  |            |  \         |
  13          10   9       20
  |            |    \       |
  v            v     v      |
  v2 ---14--> v4    v3 ---7-+
   ^                 ^
   |                 |
   +--------9--------+
  (v3->v2: 9)

간선: s->v1(16), s->v2(13), v1->v2(10), v1->v3(12),
      v2->v4(14), v3->v2(9), v3->t(20), v4->v3(7), v4->t(4)

최대 유량: |f| = 23
  경로 1: s->v1->v3->t: 12 흐름
  경로 2: s->v2->v4->v3->t (일부), s->v2->v4->t (일부): 11 흐름
  -> s에서 나가는 유량: 12 + 11 = 23

Ford-Fulkerson의 기본 흐름:
1. 잔여 그래프에서 s->t 경로 찾기
2. 경로의 병목(bottleneck) 용량만큼 유량 증가
3. 잔여 그래프 갱신
4. 더 이상 경로가 없으면 종료
```

## 관련 개념

- [유량 네트워크 (Flow Network)](/knowledge/algorithms/flow-network/)
- [포드-풀커슨 방법 (Ford-Fulkerson Method)](/knowledge/algorithms/ford-fulkerson-method/)
- [잔여 네트워크 (Residual Network)](/knowledge/algorithms/residual-network/)
- [최대 유량 최소 절단 정리 (Max-Flow Min-Cut Theorem)](/knowledge/algorithms/max-flow-min-cut-theorem/)
- [이분 매칭 (Bipartite Matching)](/knowledge/algorithms/bipartite-matching/)
- [그래프 (Graph)](/knowledge/algorithms/graph/)
