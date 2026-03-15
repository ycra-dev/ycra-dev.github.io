---
title: "집합 (Set)"
description: "집합(Set)은 서로 구별 가능한 객체(원소, element)들의 순서 없는 모음이다"
tags: ['Set', 'Discrete Mathematics', 'Data Structure', 'Collection', 'Membership']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/set
sidebar:
  order: 1
---

## 핵심 개념

집합은 이산수학의 모든 이산 구조의 기반이 되는 가장 근본적인 구조이다. 집합을 기술하는 방법에는 원소를 직접 나열하는 **원소 나열법(roster method)**과 원소가 만족하는 성질을 서술하는 **조건 제시법(set builder notation)** 이 있다.

중요한 수 집합들이 존재한다:
- **N** = {0, 1, 2, 3, ...} (자연수)
- **Z** = {..., -2, -1, 0, 1, 2, ...} (정수)
- **Q** (유리수), **R** (실수), **C** (복소수)

**부분집합(subset)**: A ⊆ B는 A의 모든 원소가 B에도 속함을 뜻하며, 이는 ∀x(x ∈ A → x ∈ B)와 동치이다. 두 집합이 같음을 보이려면 A ⊆ B이고 B ⊆ A임을 증명하면 된다.

**공집합(empty set)** ∅는 원소가 없는 집합으로, 모든 집합의 부분집합이다(공허한 증명에 의해). 컴퓨터과학에서 집합의 개념은 **데이터 타입(datatype)**의 기초가 된다. 예를 들어 boolean은 집합 {0, 1}과 그 위의 연산(AND, OR, NOT)으로 정의된다.

**집합의 크기(cardinality)**: 유한 집합 S의 원소 수를 |S|로 나타낸다. 무한 집합의 cardinality는 별도의 이론이 필요하다.

## 예시

```
원소 나열법:
V = {a, e, i, o, u}   (영어 모음 집합)
O = {1, 3, 5, 7, 9}   (10 미만 홀수 양의 정수)

조건 제시법:
O = {x ∈ Z⁺ | x는 홀수이고 x < 10}

부분집합 관계:
{1, 3, 5} ⊆ {1, 2, 3, 4, 5}  → 참
Z ⊆ Q ⊆ R ⊆ C              → 참

집합의 상등:
{1, 3, 5} = {3, 5, 1} = {1, 3, 3, 5, 5}  (순서와 중복 무관)
```

Python에서의 집합:
```python
A = {1, 2, 3, 4, 5}
B = {3, 4, 5, 6, 7}
print(3 in A)       # True (멤버십 테스트)
print(A.issubset(B)) # False
print(len(A))        # 5 (cardinality)
```

## 관련 개념

- [Set Operations](/knowledge/mathematics/set-operations/) - 집합의 합집합, 교집합, 차집합, 여집합 연산
- [Power Set](/knowledge/mathematics/power-set/) - 집합의 모든 부분집합으로 이루어진 집합
- [Cartesian Product](/knowledge/mathematics/cartesian-product/) - 집합들의 순서쌍 구성
- [Cardinality](/knowledge/mathematics/cardinality/) - 무한 집합의 크기 비교
- [Quantifier](/knowledge/mathematics/quantifier/) - ∀x(x ∈ A → x ∈ B) 형태의 부분집합 정의
