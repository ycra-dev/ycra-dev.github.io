---
title: "Binary Relation"
description: "집합 A에서 집합 B로의 이항 관계(binary relation)는 카르테시안 곱 A x B의 부분집합이다"
tags: ['Binary Relation', 'Relation', 'Set', 'Cartesian Product', 'Ordered Pair']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/binary-relation
sidebar:
  order: 1
---

## 핵심 개념

이항 관계는 두 집합의 원소 간의 관계를 수학적으로 표현하는 가장 기본적인 구조이다. 집합 A에서 자기 자신으로의 관계, 즉 A x A의 부분집합을 "집합 A 위의 관계(relation on a set A)"라 한다.

함수(function)는 관계의 특수한 경우로, A의 모든 원소가 정확히 하나의 B 원소와 대응되는 관계이다. 반면 일반적인 관계는 일대다(one-to-many) 관계를 허용하므로 함수보다 더 넓은 범위의 관계를 표현할 수 있다.

n개의 원소를 가진 집합 A 위의 관계의 총 개수는 2^(n^2)개이다. 이는 A x A가 n^2개의 원소를 가지고, 각 원소가 관계에 포함될지 여부를 선택할 수 있기 때문이다.

## 예시

집합 A = {1, 2, 3, 4} 위의 "나누기" 관계:
```
R = {(a, b) | a divides b}
R = {(1,1), (1,2), (1,3), (1,4), (2,2), (2,4), (3,3), (4,4)}
```

파이썬으로 관계를 표현하면:
```python
A = {1, 2, 3, 4}
R = {(a, b) for a in A for b in A if b % a == 0}
# R = {(1,1), (1,2), (1,3), (1,4), (2,2), (2,4), (3,3), (4,4)}

# a R b 여부 확인
def is_related(R, a, b):
    return (a, b) in R

print(is_related(R, 2, 4))  # True (2는 4를 나눈다)
print(is_related(R, 3, 2))  # False (3은 2를 나누지 않는다)
```

집합 {a, b, c} 위의 관계의 총 개수: 2^(3^2) = 2^9 = 512개

## 관련 개념

- [Set](/knowledge/mathematics/set/) - 관계는 카르테시안 곱의 부분집합으로 정의
- [Function](/knowledge/mathematics/function/) - 함수는 관계의 특수한 경우
- [Relation Properties](/knowledge/mathematics/relation-properties/) - 관계가 가질 수 있는 성질들
- [Relation Representation](/knowledge/mathematics/relation-representation/) - 행렬과 유향 그래프로 관계 표현
