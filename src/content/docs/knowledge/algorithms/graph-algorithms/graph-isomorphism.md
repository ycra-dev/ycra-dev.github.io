---
title: "Graph Isomorphism"
description: "두 그래프 사이의 정점 1:1 대응 φ가 존재하여 구조가 동일한지 판별하는 문제 — P와 NP-complete 사이의 위치이며 Babai의 준다항식 시간 알고리즘이 알려짐"
tags: ["Graph Theory", "Automorphism", "Symmetry", "Canonical Form", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/graph-algorithms/graph-isomorphism
sidebar:
  order: 34
---

## 핵심 개념

두 그래프 G=(V,E)와 G'=(V',E')이 동형(isomorphic)이라 함은, V→V'의 전단사 함수 φ가 존재하여 u~v ⟺ φ(u)~φ(v)를 만족할 때를 말한다. 자기 자신으로의 동형사상을 자기동형사상(automorphism)이라 한다.

## 동작 원리

**동형 관계의 의미:**
- 정점 이름만 다르고 구조는 동일한 그래프들
- 동일한 인접 행렬 A의 순열 치환 PAP⁻¹ ↔ 같은 그래프의 다른 이름

**자기동형사상(Automorphism):**
- 그래프의 대칭을 나타냄
- k개의 자기동형사상이 있으면 알고리즘이 k배 빨라질 수 있음
- Petersen 그래프: 120개의 자기동형사상
- 3-cube: 48개의 자기동형사상

**그래프 동형 문제의 복잡도:**
- P와 NP-complete 사이의 알려지지 않은 위치
- 실용적으로는 준다항식 시간(quasipolynomial)으로 해결 (Babai, 2016)
- 대부분의 실용 그래프에서 효율적으로 처리 가능

**정규형(Canonical Form):**
그래프의 "표준 이름"을 생성하는 알고리즘으로, 두 그래프가 동형인지 여부를 확인한다. Brendan McKay의 nauty/Traces 알고리즘이 실용적으로 사용된다.

**차수 수열(Degree Sequence):**
그래프의 동형 불변량 중 하나 (필요조건):
G ≅ G' ⟹ 같은 차수 수열 (역은 성립 안 함)

## 예시

```python
def degree_sequence(adj, n):
    """그래프의 차수 수열 (내림차순)"""
    return sorted([len(adj[v]) for v in range(n)], reverse=True)

# 동형 불변량 확인 (필요조건):
def could_be_isomorphic(adj1, adj2, n):
    """차수 수열 일치 여부 (필요조건 확인)"""
    return degree_sequence(adj1, n) == degree_sequence(adj2, n)

# 간단한 동형 판별 (완전하지 않음, O(n! * n²)):
from itertools import permutations

def is_isomorphic_brute_force(adj1, adj2, n):
    """브루트 포스 동형 판별"""
    edges1 = {(min(u, v), max(u, v))
              for u in range(n) for v in adj1[u]}
    edges2 = {(min(u, v), max(u, v))
              for u in range(n) for v in adj2[u]}

    for perm in permutations(range(n)):
        mapped = {(min(perm[u], perm[v]), max(perm[u], perm[v]))
                  for u, v in edges1}
        if mapped == edges2:
            return True, perm
    return False, None

# 자기동형사상 그룹 크기 계산:
# Petersen 그래프의 경우 |Aut(Petersen)| = 120
# 이를 이용한 탐색 속도 향상: 동치인 상태들을 하나로 통합
```

## 관련 개념

- [Graph Theory Basics](/knowledge/algorithms/graph-algorithms/graph-theory-basics/)
- [Graph Coloring](/knowledge/algorithms/graph-algorithms/graph-coloring/)
- [Latin Square](/knowledge/discrete-mathematics/combinatorics/latin-square/)
- [Combinatorial Searching](/knowledge/algorithms/foundations/combinatorial-searching/)
