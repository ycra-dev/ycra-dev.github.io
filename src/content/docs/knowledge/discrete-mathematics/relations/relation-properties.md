---
title: "Relation Properties"
description: "집합 A 위의 관계 R이 가질 수 있는 네 가지 핵심 성질: (1) 반사적(reflexive): 모든 a in A에 대해 (a,a) in R, (2) 대칭적(symmetric): (a,b) in R이면 (b,a) in R, (3) 반대칭적(antisymmetric..."
tags: ['Relation', 'Reflexive', 'Symmetric', 'Antisymmetric', 'Transitive', 'Properties']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/relation-properties
sidebar:
  order: 2
---

## 핵심 개념

**반사성(Reflexivity)**: 모든 원소가 자기 자신과 관련되어야 한다. 양화자로 표현하면 forall a((a,a) in R). "같다(=)", "나눈다(|)", "이하(<=)" 관계 등이 반사적이다.

**대칭성(Symmetry)**: a가 b와 관련되면 b도 반드시 a와 관련되어야 한다. forall a forall b((a,b) in R -> (b,a) in R). "같은 학교를 다닌다" 같은 관계가 대칭적이다.

**반대칭성(Antisymmetry)**: 두 다른 원소가 서로 관련될 수 없다. forall a forall b(((a,b) in R and (b,a) in R) -> a = b). "이하(<=)", "나눈다(|)" 관계가 반대칭적이다.

**추이성(Transitivity)**: a가 b와, b가 c와 관련되면 a가 c와도 관련되어야 한다. forall a forall b forall c(((a,b) in R and (b,c) in R) -> (a,c) in R). "미만(<)", "이하(<=)", "나눈다(|)" 관계가 추이적이다.

중요한 점: 대칭과 반대칭은 반대(opposite)가 아니다. 한 관계가 둘 다 만족하거나, 둘 다 만족하지 않을 수 있다. 예를 들어 항등 관계 {(a,a) | a in A}는 대칭이면서 동시에 반대칭이다.

n개 원소를 가진 집합 위의 반사적 관계의 수: 2^(n(n-1)), 대각선 원소가 모두 포함되어야 하므로 나머지 n(n-1)개 쌍에 대해서만 선택하면 된다.

## 예시

집합 {1, 2, 3, 4} 위의 관계들:
```python
A = {1, 2, 3, 4}

def is_reflexive(R, A):
    return all((a, a) in R for a in A)

def is_symmetric(R):
    return all((b, a) in R for (a, b) in R)

def is_antisymmetric(R):
    return all(a == b for (a, b) in R if (b, a) in R)

def is_transitive(R):
    return all((a, c) in R
               for (a, b) in R
               for (b2, c) in R if b == b2)

# R1: 이하 관계 - 반사, 반대칭, 추이 (대칭은 아님)
R_leq = {(a, b) for a in A for b in A if a <= b}

# R2: 같다 관계 - 반사, 대칭, 반대칭, 추이 (모두 만족)
R_eq = {(a, a) for a in A}

# R3: {(1,2), (2,1)} - 대칭이지만 반사적이지 않음
R3 = {(1, 2), (2, 1)}

print(is_reflexive(R_leq, A))     # True
print(is_symmetric(R_leq))        # False
print(is_antisymmetric(R_leq))    # True
print(is_transitive(R_leq))       # True
```

정수 집합 위의 관계 분석:
- R1 = {(a,b) | a <= b}: 반사, 반대칭, 추이 (O, X, O, O)
- R2 = {(a,b) | a > b}: 비반사, 반대칭, 추이 (X, X, O, O)
- R3 = {(a,b) | a = b 또는 a = -b}: 반사, 대칭, 추이 (O, O, X, O)

## 관련 개념

- [Binary Relation](/knowledge/mathematics/binary-relation/) - 성질의 대상이 되는 관계의 정의
- [Predicate Logic](/knowledge/mathematics/predicate-logic/) - 양화자를 사용한 성질의 형식적 표현
- [Quantifier](/knowledge/mathematics/quantifier/) - 관계 성질 정의에 전칭 양화자 사용
- [Equivalence Relation](/knowledge/mathematics/equivalence-relation/) - 반사 + 대칭 + 추이 = 동치관계
- [Partial Ordering](/knowledge/mathematics/partial-ordering/) - 반사 + 반대칭 + 추이 = 반순서
- [Relation Representation](/knowledge/mathematics/relation-representation/) - 행렬과 그래프로 성질을 시각적으로 판별
