---
title: "Closure of Relations"
description: "관계 R의 성질 P에 대한 폐포(closure)는, R을 포함하고 성질 P를 만족하며, R을 포함하면서 성질 P를 만족하는 모든 관계의 부분집합인 관계 S이다"
tags: ['Closure', 'Reflexive Closure', 'Symmetric Closure', 'Transitive Closure', 'Connectivity Relation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/closure-of-relations
sidebar:
  order: 6
---

## 핵심 개념

**반사적 폐포(Reflexive Closure)**: R에 모든 (a,a) 쌍을 추가한다.
- R ∪ Delta, 여기서 Delta = {(a,a) | a in A}
- 예: {(a,b) | a < b}의 반사적 폐포는 {(a,b) | a <= b}

**대칭적 폐포(Symmetric Closure)**: R에 모든 역방향 쌍을 추가한다.
- R ∪ R^(-1), 여기서 R^(-1) = {(b,a) | (a,b) in R}
- 예: {(a,b) | a > b}의 대칭적 폐포는 {(a,b) | a != b}

**추이적 폐포(Transitive Closure)**: 가장 복잡하며, 단순히 한 번만 쌍을 추가하면 되는 것이 아니다. 새로 추가된 쌍이 다시 추이성을 위반할 수 있기 때문에 반복적으로 쌍을 추가해야 한다.

**연결 관계(Connectivity Relation)**: R* = R ∪ R^2 ∪ R^3 ∪ ... 로 정의되며, R에서 길이 1 이상의 경로가 존재하는 모든 쌍 (a,b)의 집합이다.

**핵심 정리(Theorem 2)**: R의 추이적 폐포는 연결 관계 R*와 같다.

**유한 집합의 경우**: |A| = n이면, R* = R ∪ R^2 ∪ ... ∪ R^n으로 충분하다 (보조정리 1). 경로가 존재한다면 길이 n 이하의 경로가 반드시 존재하기 때문이다 (비둘기집 원리에 의해).

**행렬 표현**: M_{R*} = M_R ∨ M_R^[2] ∨ M_R^[3] ∨ ... ∨ M_R^[n]

이 방법의 시간 복잡도는 O(n^4) 비트 연산이다.

## 예시

```python
import numpy as np

def reflexive_closure(R, A):
    """반사적 폐포: R ∪ {(a,a) | a in A}"""
    return R | {(a, a) for a in A}

def symmetric_closure(R):
    """대칭적 폐포: R ∪ R^(-1)"""
    return R | {(b, a) for (a, b) in R}

def transitive_closure(R, A):
    """추이적 폐포: R* = R ∪ R^2 ∪ ... ∪ R^n"""
    n = len(A)
    closure = set(R)
    current_power = set(R)
    for _ in range(n - 1):
        new_power = set()
        for (a, b) in current_power:
            for (c, d) in R:
                if b == c:
                    new_power.add((a, d))
        current_power = new_power
        closure |= new_power
    return closure

A = {1, 2, 3, 4}
R = {(1, 3), (1, 4), (2, 1), (3, 2)}

print("반사적 폐포:", reflexive_closure(R, A))
# R ∪ {(1,1),(2,2),(3,3),(4,4)}

print("대칭적 폐포:", symmetric_closure(R))
# R ∪ {(3,1),(4,1),(1,2),(2,3)}

print("추이적 폐포:", transitive_closure(R, A))
# {(1,3),(1,4),(2,1),(3,2),(1,2),(2,3),(2,4),(3,1),(3,3),(3,4),
#  (1,1),(2,2),(3,2),...}
```

네트워크 예시: 데이터 센터 간 직통 전화선이 있을 때
- R = {(보스턴, 시카고), (보스턴, 디트로이트), (시카고, 디트로이트), (디트로이트, 덴버)}
- R*를 구하면 간접 경로를 포함한 모든 연결 가능 쌍을 알 수 있음
- 예: (보스턴, 덴버) in R* (보스턴->디트로이트->덴버 경로 존재)

## 관련 개념

- [Binary Relation](/knowledge/mathematics/binary-relation/) - 폐포의 대상이 되는 관계
- [Relation Properties](/knowledge/mathematics/relation-properties/) - 반사성, 대칭성, 추이성 성질에 대한 폐포
- [Relation Composition](/knowledge/mathematics/relation-composition/) - R^n은 합성으로 정의됨
- [Warshall Algorithm](/knowledge/mathematics/warshall-algorithm/) - 추이적 폐포를 효율적으로 계산하는 알고리즘
- [Relation Representation](/knowledge/mathematics/relation-representation/) - 행렬로 폐포를 계산
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 보조정리 1에서 비둘기집 원리 사용
