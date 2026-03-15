---
title: "서로소 집합 (Disjoint Set)"
description: "분리 집합(Disjoint-Set) 자료 구조는 n개의 원소를 겹치지 않는 동적 집합들의 모음으로 관리하는 자료 구조이다"
tags: ['Disjoint Set', 'Union Find', 'Dynamic Set', 'Connected Components', 'Partition']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/disjoint-set
sidebar:
  order: 12
---

## 핵심 개념

**핵심 연산**:
- **MAKE-SET(x)**: x만 포함하는 새 집합을 생성. x가 대표원이 됨.
- **UNION(x, y)**: x를 포함하는 집합 S_x와 y를 포함하는 집합 S_y를 합병. 합병 후 S_x, S_y는 소멸하고 새 집합 S_x ∪ S_y가 됨. 최대 n-1번의 UNION 수행 가능.
- **FIND-SET(x)**: x를 포함하는 유일한 집합의 대표원을 반환.

**구현 방법**:

1. **연결 리스트 표현**: 각 집합을 연결 리스트로 표현. 첫 원소가 대표원.
   - MAKE-SET, FIND-SET: O(1)
   - UNION: 짧은 리스트를 긴 리스트에 연결 (가중 합병 휴리스틱)
   - 가중 합병 시: m번 MAKE-SET, UNION, FIND-SET 연산에 O(m + n lg n) 시간

2. **분리 집합 포리스트(Disjoint-Set Forest)**: 각 집합을 루트 트리로 표현. 루트가 대표원.
   - 두 가지 휴리스틱으로 거의 선형 시간 달성:
     - **랭크 기준 합병(Union by Rank)**: 작은 트리를 큰 트리에 붙임
     - **경로 압축(Path Compression)**: FIND-SET 시 경로상 모든 노드를 루트에 직접 연결
   - 결합 시: m번 연산에 O(m * alpha(n)) 시간 (alpha는 매우 느리게 증가하는 역 아커만 함수)

**대표적 응용**: 무방향 그래프의 연결 요소(connected components) 계산. 간선을 순서대로 처리하며 UNION으로 요소를 합병하고, FIND-SET으로 같은 요소에 속하는지 확인.

## 예시

```
// 연결 요소 계산
CONNECTED-COMPONENTS(G)
  for each vertex v in G.V
    MAKE-SET(v)
  for each edge (u, v) in G.E
    if FIND-SET(u) != FIND-SET(v)
      UNION(u, v)

SAME-COMPONENT(u, v)
  if FIND-SET(u) == FIND-SET(v)
    return TRUE
  else return FALSE

// 예: 그래프 {a,b,c,d}, 간선 {(a,b), (c,d), (b,c)}
// MAKE-SET: {a}, {b}, {c}, {d}
// UNION(a,b): {a,b}, {c}, {d}
// UNION(c,d): {a,b}, {c,d}
// UNION(b,c): {a,b,c,d}
// SAME-COMPONENT(a,d) = TRUE
```

## 관련 개념

- [Union Find](/knowledge/algorithms/union-find/)
- [경로 압축 (Path Compression)](/knowledge/algorithms/path-compression/)
- [랭크 기반 합치기 (Union by Rank)](/knowledge/algorithms/union-by-rank/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
