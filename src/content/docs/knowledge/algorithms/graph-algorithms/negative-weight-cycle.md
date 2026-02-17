---
title: "Negative Weight Cycle"
description: "음수 가중치 사이클(Negative Weight Cycle)은 사이클을 구성하는 간선들의 가중치 합이 음수인 사이클로, 이 사이클에서 도달 가능한 모든 정점의 최단 경로 가중치를 -infinity로 만든다"
tags: ['Negative Weight Cycle', 'Shortest Path', 'Bellman Ford', 'Graph Theory', 'Infeasibility']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/negative-weight-cycle
sidebar:
  order: 13
---

## 핵심 개념

음수 가중치 사이클은 최단 경로 문제의 핵심적인 장애물이다. 사이클을 반복적으로 순회하면 경로 가중치를 무한히 줄일 수 있어 최단 경로가 정의되지 않는다.

**음수 가중치 사이클의 영향**:
- 소스 s에서 도달 가능한 음수 사이클이 있으면, 그 사이클 위의 정점과 사이클에서 도달 가능한 정점의 delta(s, v) = -infinity
- 소스에서 도달할 수 없는 음수 사이클은 최단 경로에 영향을 주지 않음

**사이클과 최단 경로의 관계**:
- **양수 가중치 사이클**: 제거하면 더 짧은 경로 -> 최단 경로에 포함 안 됨
- **0 가중치 사이클**: 제거해도 동일 -> 최단 경로는 단순 경로로 가정 가능
- **음수 가중치 사이클**: 반복 순회로 무한히 감소 -> 최단 경로 미정의

**감지 방법**:
1. **Bellman-Ford**: |V|-1번 반복 후 추가 검사에서 v.d > u.d + w(u,v)인 간선이 존재하면 음수 사이클
2. **Floyd-Warshall**: 대각선 원소 d_ii < 0이면 음수 사이클
3. **차분 제약 시스템**: 제약 그래프에 음수 사이클이 있으면 해가 존재하지 않음 (Theorem 22.9)

**응용 - 차분 제약 시스템(Systems of Difference Constraints)**:
- x_j - x_i <= b_k 형태의 부등식 시스템
- 제약 그래프의 음수 사이클 = 모순된 제약 = 해 없음
- Bellman-Ford로 해의 존재 여부를 판별하고, 존재 시 해를 구함

## 예시

```
음수 사이클 예시:
  s --5--> e --3--> f
           ^        |
           |   (-6) |
           +--------+

사이클 <e, f, e>의 가중치: 3 + (-6) = -3 < 0
-> delta(s, e) = -infinity
-> delta(s, f) = -infinity

Bellman-Ford 감지:
  |V|-1번 반복 후, e.d > f.d + w(f,e) 또는
  f.d > e.d + w(e,f)가 성립
  -> FALSE 반환 (음수 사이클 존재)

차분 제약 예시:
  x1 - x2 <= -1
  x2 - x3 <= -2
  x3 - x1 <= -1
  합: 0 <= -4 (모순!) -> 음수 사이클 -> 해 없음
```

## 관련 개념

- [Shortest Path](/knowledge/algorithms/shortest-path/)
- [Bellman-Ford Algorithm](/knowledge/algorithms/bellman-ford-algorithm/)
- [Relaxation](/knowledge/algorithms/relaxation/)
- [Floyd-Warshall Algorithm](/knowledge/algorithms/floyd-warshall-algorithm/)
