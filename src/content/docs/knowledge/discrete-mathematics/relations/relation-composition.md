---
title: "Relation Composition"
description: "집합 A에서 B로의 관계 R과 B에서 C로의 관계 S의 합성(composite) S ∘ R은, (a, b) in R이고 (b, c) in S인 원소 b in B가 존재하는 모든 순서쌍 (a, c)의 집합이다"
tags: ['Relation', 'Composition', 'Combining Relations', 'Power Of Relation', 'Inverse Relation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/relation-composition
sidebar:
  order: 5
---

## 핵심 개념

**관계의 합성(Composition)**: 함수의 합성과 유사하지만 일대다 관계를 허용한다. S ∘ R에서 중간 집합 B의 원소를 "경유지"로 사용하여 A의 원소를 C의 원소에 연결한다. 행렬로는 불리언 곱 M_{S∘R} = M_R ⊙ M_S로 계산한다.

**관계의 거듭제곱(Powers)**: R이 집합 A 위의 관계일 때:
- R^1 = R
- R^2 = R ∘ R: a에서 b로, b에서 c로 이어지는 길이 2의 경로에 대응
- R^n: 길이 n의 경로에 대응

**관계의 결합**: 관계는 집합이므로 모든 집합 연산을 적용할 수 있다:
- R1 ∪ R2: 두 관계 중 적어도 하나에 속하는 쌍
- R1 ∩ R2: 두 관계 모두에 속하는 쌍
- R1 - R2: R1에는 속하지만 R2에는 속하지 않는 쌍
- R1 ⊕ R2: 정확히 하나의 관계에만 속하는 쌍

**핵심 정리**: 관계 R이 추이적이면 그리고 오직 그 때에만 모든 양의 정수 n에 대해 R^n ⊆ R이다. 이 정리는 추이적 폐포를 구하는 데 핵심적으로 사용된다.

## 예시

관계 합성 예시:
```python
def compose(S, R):
    """S ∘ R: R 먼저 적용, 그 다음 S"""
    return {(a, c) for (a, b1) in R
                    for (b2, c) in S if b1 == b2}

R = {(1, 1), (1, 4), (2, 3), (3, 1), (3, 4)}
S = {(1, 0), (2, 0), (3, 1), (3, 2), (4, 1)}

result = compose(S, R)
print(result)
# {(1, 0), (1, 1), (2, 1), (2, 2), (3, 0), (3, 1)}
# 예: (2,3) in R, (3,1) in S -> (2,1) in S∘R
```

거듭제곱 예시 - "부모" 관계:
```python
# parent 관계: (a, b) = "a는 b의 부모"
parent = {("할아버지", "아버지"), ("아버지", "나"), ("할머니", "아버지")}

# R^2 = "조부모" 관계
grandparent = compose(parent, parent)
print(grandparent)
# {("할아버지", "나"), ("할머니", "나")}

# 거듭제곱 계산
def power(R, n):
    result = R
    for _ in range(n - 1):
        result = compose(result, R)
    return result

R = {(1, 1), (2, 1), (3, 2), (4, 3)}
print(power(R, 2))  # {(1,1), (2,1), (3,1), (4,2)}
print(power(R, 3))  # {(1,1), (2,1), (3,1), (4,1)}
# R^4 = R^3 (안정화됨)
```

## 관련 개념

- [Binary Relation](/knowledge/mathematics/binary-relation/) - 합성의 대상이 되는 관계
- [Function](/knowledge/mathematics/function/) - 함수의 합성은 관계 합성의 특수 경우
- [Set Operation](/knowledge/mathematics/set-operation/) - 관계들 간의 집합 연산
- [Relation Representation](/knowledge/mathematics/relation-representation/) - 불리언 행렬 곱으로 합성 계산
- [Closure of Relations](/knowledge/mathematics/closure-of-relations/) - 거듭제곱의 합집합으로 추이적 폐포 정의
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - R^n ⊆ R과 추이성의 동치 증명에 수학적 귀납법 사용
