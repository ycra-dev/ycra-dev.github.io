---
title: "Union by Rank"
description: "랭크 기준 합병(Union by Rank)은 분리 집합 포리스트에서 두 트리를 합병할 때, 랭크(rank)가 낮은 루트를 랭크가 높은 루트의 자식으로 만드는 휴리스틱이다"
tags: ['Union By Rank', 'Union Find', 'Disjoint Set', 'Heuristic', 'Tree Height']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/union-by-rank
sidebar:
  order: 14
---

## 핵심 개념

**랭크의 정의**: 각 노드 x에 대해 x.rank는 x의 높이(최장 하강 경로의 간선 수)의 상한(upper bound)이다. MAKE-SET에서 0으로 초기화되며, LINK에서만 변경된다.

**LINK(x, y) 동작**:
- x.rank > y.rank이면: y.p = x (y를 x의 자식으로)
- x.rank < y.rank이면: x.p = y
- x.rank == y.rank이면: 임의로 x.p = y로 설정하고, y.rank를 1 증가

**랭크의 성질** (보조정리 19.4):
- 비루트 노드 x는 x.rank < x.p.rank (부모보다 랭크가 작다)
- 루트에서 리프로의 경로에서 랭크는 순감소한다
- x.rank는 x가 비루트가 되면 이후 변경되지 않는다
- x.p.rank는 단조 증가한다
- 모든 노드의 랭크는 최대 n-1이며, 실제로는 floor(lg n) 이하이다

**가중 합병 휴리스틱(연결 리스트 표현)과의 유사성**: 연결 리스트에서는 짧은 리스트를 긴 리스트에 연결한다. 랭크 기준 합병은 이를 트리에 적용한 것으로, 서브트리 크기 대신 높이 상한(랭크)을 기준으로 한다.

**단독 사용 시 성능**: 랭크 기준 합병만 사용하면 O(m lg n) 시간. 경로 압축과 결합하면 O(m * alpha(n)).

## 예시

```
MAKE-SET(x)
  x.p = x
  x.rank = 0

LINK(x, y)                    // x, y는 모두 루트
  if x.rank > y.rank
    y.p = x                   // 랭크 높은 x 아래로 y를 붙임
  else x.p = y                // 랭크 높은 y 아래로 x를 붙임
    if x.rank == y.rank
      y.rank = y.rank + 1     // 같은 랭크면 새 루트의 랭크 증가

// 예: 랭크에 따른 합병
// 트리1: a(rank=2) -> {b(rank=1), c(rank=0)}
// 트리2: d(rank=1) -> {e(rank=0)}
// LINK(a, d): d.rank(1) < a.rank(2) -> d.p = a
// 결과: a(rank=2)가 루트, d는 a의 자식

// 같은 랭크 예:
// 트리1: a(rank=1)
// 트리2: b(rank=1)
// LINK(a, b): 같은 랭크 -> a.p = b, b.rank = 2

// 경로 압축은 rank를 변경하지 않으므로,
// rank는 실제 높이의 상한으로만 기능한다.
```

## 관련 개념

- [Union Find](/knowledge/algorithms/union-find/)
- [Path Compression](/knowledge/algorithms/path-compression/)
- [Disjoint Set](/knowledge/algorithms/disjoint-set/)
- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
