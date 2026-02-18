---
title: "Equivalence Class and Partition"
description: "동치관계 R에 대해, 원소 a의 동치류(equivalence class) [a]_R은 a와 동치인 모든 원소의 집합, 즉 [a]_R = {s | (a,s) in R}이다"
tags: ['Equivalence Class', 'Partition', 'Congruence Class', 'Quotient Set', 'Equivalence Relation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/equivalence-class-and-partition
sidebar:
  order: 9
---

## 핵심 개념

**동치류의 성질 (정리 1)**: 동치관계 R의 원소 a, b에 대해 다음 세 명제는 동치이다:
1. a R b (a와 b는 관련됨)
2. [a] = [b] (동치류가 같음)
3. [a] ∩ [b] != 공집합 (동치류가 겹침)

이 정리의 의미: 두 동치류는 완전히 같거나 완전히 서로소(disjoint)이다. "부분적으로 겹치는" 동치류는 존재하지 않는다.

**대표원(Representative)**: 동치류의 임의의 원소를 그 류의 대표원으로 사용할 수 있다. [a]_R에서 b in [a]_R이면 [a] = [b]이므로, 같은 류를 어떤 원소로 대표해도 무방하다.

**동치관계와 분할의 대응 (정리 2)**:
- 방향 1: 동치관계 R의 동치류들은 집합 S의 분할을 형성한다
- 방향 2: 집합 S의 임의의 분할 {A_i | i in I}에 대해, 같은 부분집합에 속하는 원소 쌍으로 구성된 관계 R이 동치관계이며, 해당 분할의 부분집합들이 그 동치류가 된다

이 양방향 대응은 동치관계와 분할이 본질적으로 같은 개념의 두 가지 표현임을 보여준다.

**합동류(Congruence Classes)**: 합동 관계 modulo m의 동치류들. m개의 합동류 [0]_m, [1]_m, ..., [m-1]_m이 정수 전체를 분할한다.

## 예시

합동류 modulo 4의 분할:
```
[0]_4 = {..., -8, -4, 0, 4, 8, ...}    (나머지 0)
[1]_4 = {..., -7, -3, 1, 5, 9, ...}    (나머지 1)
[2]_4 = {..., -6, -2, 2, 6, 10, ...}   (나머지 2)
[3]_4 = {..., -5, -1, 3, 7, 11, ...}   (나머지 3)
```
모든 정수는 정확히 하나의 합동류에 속한다.

```python
def equivalence_classes(R, A):
    """동치관계 R의 동치류들을 구한다"""
    classes = []
    remaining = set(A)
    for a in A:
        if a in remaining:
            eq_class = {b for b in A if (a, b) in R}
            classes.append(eq_class)
            remaining -= eq_class
    return classes

def partition_to_relation(partition, S):
    """분할로부터 동치관계를 생성한다"""
    R = set()
    for subset in partition:
        for a in subset:
            for b in subset:
                R.add((a, b))
    return R

# 예시: S = {1,2,3,4,5,6}의 분할
partition = [{1, 2, 3}, {4, 5}, {6}]
R = partition_to_relation(partition, {1,2,3,4,5,6})
print(sorted(R))
# [(1,1),(1,2),(1,3),(2,1),(2,2),(2,3),(3,1),(3,2),(3,3),
#  (4,4),(4,5),(5,4),(5,5),(6,6)]

# 역방향: 동치관계에서 동치류 추출
classes = equivalence_classes(R, {1,2,3,4,5,6})
print(classes)  # [{1,2,3}, {4,5}, {6}]

# 합동류 계산
def congruence_class(a, m, limit=20):
    """[a]_m의 원소들 (범위 제한)"""
    return {n for n in range(-limit, limit+1) if (n - a) % m == 0}

print(congruence_class(0, 4))  # {..., -8, -4, 0, 4, 8, ...}
print(congruence_class(1, 4))  # {..., -7, -3, 1, 5, 9, ...}
```

C 언어 식별자 예시:
- R_31 관계에서 "Number_of_named_tropical_storms"와 "Number_of_named_tropical_storms_in_the_Atlantic_in_2017"은 같은 동치류
- 처음 31자가 동일하므로 컴파일러가 같은 변수로 인식

## 관련 개념

- [Equivalence Relation](/knowledge/mathematics/equivalence-relation/) - 동치류를 정의하는 동치관계
- [Set](/knowledge/mathematics/set/) - 동치류는 집합이며 분할은 집합의 모음
- [Partial Ordering](/knowledge/mathematics/partial-ordering/) - 분할의 세분화(refinement)는 반순서를 이룸
