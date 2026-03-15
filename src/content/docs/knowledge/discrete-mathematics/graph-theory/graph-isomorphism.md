---
title: "그래프 동형 (Graph Isomorphism)"
description: "두 단순 그래프 G1 = (V1, E1)과 G2 = (V2, E2)가 동형(isomorphic)이라 함은, V1에서 V2로의 일대일 대응 함수 f가 존재하여, V1의 모든 정점 a, b에 대해 a와 b가 G1에서 인접할 때에만 f(a)와 f(b)가 G2에서 인접하..."
tags: ['Graph Isomorphism', 'Invariant', 'Bijection', 'Np Problem', 'Graph Theory']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/graph-isomorphism
sidebar:
  order: 4
---

## 핵심 개념

그래프 동형(graph isomorphism)은 두 그래프가 본질적으로 같은 구조를 가지는지를 판별하는 문제이다. 동형 관계는 동치 관계(equivalence relation)이다.

**동형 불변량(Graph Invariants)**: 동형인 그래프는 반드시 다음 성질들이 같아야 한다:
1. 정점의 수
2. 간선의 수
3. 각 차수를 가진 정점의 수 (차수 수열)
4. 특정 길이의 단순 순환 존재 여부

이러한 불변량이 모두 같아도 두 그래프가 동형이라는 보장은 없다. 동형을 증명하려면 실제 동형 사상 f를 구성해야 한다.

**인접 행렬을 이용한 검증**: 그래프 G의 인접 행렬 A_G와 그래프 H의 인접 행렬 A_H에서, 적절한 정점 순서 재배열 후 두 행렬이 같으면 동형이다.

**계산 복잡도**: n개의 정점을 가진 그래프의 경우 n!개의 가능한 일대일 대응을 검사해야 하므로, 모든 경우를 탐색하는 것은 비실용적이다. Laszlo Babai는 2017년에 준다항식 시간(quasi-polynomial time) 2^{O((log n)^3)} 알고리즘을 발표했다. 그래프 동형 문제는 NP에 속하지만 NP-완전인지 P에 속하는지 알려지지 않은 몇 안 되는 문제 중 하나이다.

**응용**: 화학에서 분자 그래프의 동형 검사(구조 이성질체 판별), 전자 회로 설계에서 회로 검증 등에 활용된다.

## 예시

```
# 두 그래프의 동형 검증 예시
# G: 정점 {u1, u2, u3, u4}, 간선 {u1-u2, u1-u3, u2-u4, u3-u4}
# H: 정점 {v1, v2, v3, v4}, 간선 {v1-v3, v1-v4, v3-v2, v4-v2}

# 불변량 확인:
# 두 그래프 모두 4개 정점, 4개 간선
# 차수 수열: 둘 다 [2, 2, 2, 2]

# 동형 사상: f(u1)=v1, f(u2)=v4, f(u3)=v3, f(u4)=v2
# 검증: u1-u2 -> v1-v4 ✓, u1-u3 -> v1-v3 ✓,
#        u2-u4 -> v4-v2 ✓, u3-u4 -> v3-v2 ✓

# 비동형 판별 예시:
# G: 8정점, 10간선, 차수 2인 정점 4개, 차수 3인 정점 4개
# H: 8정점, 10간선, 차수 2인 정점 4개, 차수 3인 정점 4개
# -> 불변량이 같지만, G의 정점 a(차수 2)는 차수 2인 정점에 인접하지 않고,
#    H의 모든 차수 2 정점은 다른 차수 2 정점에 인접
# -> 비동형!
```

인접 행렬을 이용한 검증:
```python
import numpy as np

# G의 인접 행렬 (정점 순서: u1, u2, u3, u4)
# 간선: {u1-u2, u1-u3, u2-u4, u3-u4}
A_G = np.array([
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
])

# H의 인접 행렬 (f에 따른 순서: v1, v4, v3, v2)
# f: u1->v1, u2->v4, u3->v3, u4->v2 이므로 v1,v4,v3,v2 순서로 배열
# 간선: {v1-v3, v1-v4, v3-v2, v4-v2}
A_H = np.array([
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
])

# A_G == A_H이면 f는 동형 사상
print(np.array_equal(A_G, A_H))  # True
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 동형의 대상이 되는 기본 구조
- [Adjacency Matrix](/knowledge/mathematics/adjacency-matrix/) - 동형 검증에 행렬 활용
- [Function](/knowledge/mathematics/function/) - 동형 사상은 전단사 함수
- [Equivalence Relation](/knowledge/mathematics/equivalence-relation/) - 그래프 동형은 동치 관계
- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/big-o-notation/) - 알고리즘의 계산 복잡도
