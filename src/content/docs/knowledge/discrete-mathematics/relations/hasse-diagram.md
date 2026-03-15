---
title: "하세 다이어그램 (Hasse Diagram)"
description: "하세 다이어그램(Hasse Diagram)은 유한 반순서집합(poset)을 시각적으로 표현하는 방법이다"
tags: ['Hasse Diagram', 'Poset', 'Partial Order', 'Maximal', 'Minimal', 'Lattice', 'Upper Bound', 'Lower Bound']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/hasse-diagram
sidebar:
  order: 11
---

## 핵심 개념

**커버 관계(Covering Relation)**: 하세 다이어그램의 변은 커버 관계에 대응된다. 원소 y가 x를 커버한다(y covers x)는 것은, x < y이고 x < z < y인 z가 존재하지 않음을 의미한다. 원래의 반순서는 커버 관계의 반사적 추이적 폐포이다.

**극대/극소 원소(Maximal/Minimal Elements)**:
- 극대 원소: 자신보다 큰 원소가 없는 원소. 하세 다이어그램에서 맨 위에 위치.
- 극소 원소: 자신보다 작은 원소가 없는 원소. 하세 다이어그램에서 맨 아래에 위치.
- 포셋에는 여러 극대/극소 원소가 있을 수 있다.

**최대/최소 원소(Greatest/Least Element)**:
- 최대 원소: 모든 원소보다 크거나 같은 원소. 존재하면 유일.
- 최소 원소: 모든 원소보다 작거나 같은 원소. 존재하면 유일.
- 극대와 최대의 차이: 극대는 "자신보다 큰 원소 없음", 최대는 "다른 모든 원소 이상"

**상계/하계(Upper/Lower Bound)**: 부분집합 A의 상계 u는 A의 모든 원소 a에 대해 a <= u인 원소. 하계 l은 l <= a인 원소.

**최소상계/최대하계(LUB/GLB)**:
- 최소상계 lub(A): 상계 중 가장 작은 것
- 최대하계 glb(A): 하계 중 가장 큰 것
- (Z+, |)에서: lub = 최소공배수(lcm), glb = 최대공약수(gcd)

**격자(Lattice)**: 모든 원소 쌍이 최소상계와 최대하계를 모두 가지는 포셋.
- (Z+, |)는 격자 (lub = lcm, glb = gcd)
- (P(S), ⊆)는 격자 (lub = 합집합, glb = 교집합)
- 모든 전순서집합은 격자

## 예시

({1, 2, 3, 4, 6, 8, 12}, |)의 하세 다이어그램:
```
     12     8
    / \     |
   6   4    |
  / \ / \   |
 3   2-----+
      \
       1
```
- 극소 원소: 1
- 극대 원소: 8, 12
- 최소 원소: 1 (모든 양의 정수를 나눔)
- 최대 원소: 없음 (8과 12는 비교 불가능)

```python
def find_maximal(R, S):
    """극대 원소들을 찾는다"""
    maximal = set()
    for a in S:
        # a < b인 b가 없으면 극대
        if not any((a, b) in R and a != b for b in S):
            maximal.add(a)
    return maximal

def find_minimal(R, S):
    """극소 원소들을 찾는다"""
    minimal = set()
    for a in S:
        # b < a인 b가 없으면 극소
        if not any((b, a) in R and b != a for b in S):
            minimal.add(a)
    return minimal

def upper_bounds(R, S, A):
    """부분집합 A의 상계를 찾는다"""
    return {u for u in S if all((a, u) in R for a in A)}

def lower_bounds(R, S, A):
    """부분집합 A의 하계를 찾는다"""
    return {l for l in S if all((l, a) in R for a in A)}

def lub(R, S, A):
    """최소상계 (존재하면)"""
    ub = upper_bounds(R, S, A)
    for u in ub:
        if all((u, v) in R for v in ub):
            return u
    return None

S = {1, 2, 3, 4, 6, 8, 12}
R = {(a, b) for a in S for b in S if b % a == 0}

print("극대:", find_maximal(R, S))  # {8, 12}
print("극소:", find_minimal(R, S))  # {1}
print("{3,4}의 상계:", upper_bounds(R, S, {3, 4}))  # {12}
print("{3,4}의 하계:", lower_bounds(R, S, {3, 4}))  # {1}
print("lub({3,4}):", lub(R, S, {3, 4}))  # 12

# 격자 판별
def is_lattice(R, S):
    """모든 두 원소 쌍이 lub와 glb를 가지는지 확인"""
    for a in S:
        for b in S:
            if lub(R, S, {a, b}) is None:
                return False
            if lub(R, S, {a, b}) is None:  # glb는 역관계로
                return False
    return True
```

## 관련 개념

- [Partial Ordering](/knowledge/mathematics/partial-ordering/) - 하세 다이어그램으로 표현되는 반순서
- [Relation Representation](/knowledge/mathematics/relation-representation/) - 유향 그래프의 간소화된 표현
