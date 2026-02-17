---
title: "Equivalence Relation"
description: "집합 A 위의 관계 R이 반사적(reflexive), 대칭적(symmetric), 추이적(transitive)인 세 성질을 모두 만족하면 동치관계(equivalence relation)라 한다"
tags: ['Equivalence Relation', 'Reflexive', 'Symmetric', 'Transitive', 'Congruence', 'Modular Arithmetic']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/equivalence-relation
sidebar:
  order: 8
---

## 핵심 개념

동치관계는 수학과 컴퓨터 과학 전반에서 가장 중요한 관계 유형 중 하나이다. 동치관계의 핵심 의미는 "같은 것으로 간주할 수 있는 원소들을 분류"하는 것이다.

**왜 세 성질이 모두 필요한가**:
- 반사성: 모든 원소가 자기 자신과 동치 (자명한 요구)
- 대칭성: "a가 b와 동치"이면 "b가 a와 동치" (관계의 방향 무의미)
- 추이성: "a ~ b이고 b ~ c이면 a ~ c" (동치성의 전파)

**대표적인 동치관계들**:

1. **합동 관계(Congruence modulo m)**: a ≡ b (mod m) ⟺ m | (a-b)
   - 반사: a - a = 0은 m으로 나누어짐
   - 대칭: a - b = km이면 b - a = (-k)m
   - 추이: a - b = km이고 b - c = lm이면 a - c = (k+l)m

2. **문자열 동치(n-prefix equivalence)**: 길이 n 이상의 문자열에서 처음 n글자가 같으면 동치. 예: C 언어에서 처음 31자만 비교하는 식별자 규칙.

3. **절댓값 동치**: a ~ b ⟺ a = b 또는 a = -b

**동치가 아닌 예시**:
- "나누기" 관계(|): 반사적, 추이적이지만 대칭적이지 않음 (2|4이지만 4|2는 아님)
- |x - y| < 1: 반사적, 대칭적이지만 추이적이지 않음

**잘못된 증명 주의**: "대칭이고 추이적이면 반사적이다"는 거짓. 원소 a가 어떤 b와도 관련되지 않을 수 있기 때문이다 (공집합 관계가 반례).

## 예시

합동 관계 modulo 4:
```python
def congruent_mod(a, b, m):
    """a ≡ b (mod m) 여부 확인"""
    return (a - b) % m == 0

# 동치관계 검증
m = 4
print(congruent_mod(7, 3, m))    # True:  7 - 3 = 4, 4 | 4
print(congruent_mod(10, 2, m))   # True:  10 - 2 = 8, 4 | 8
print(congruent_mod(7, 2, m))    # False: 7 - 2 = 5, 4 ∤ 5
```

동치관계 판별 함수:
```python
def is_equivalence_relation(R, A):
    """R이 A 위의 동치관계인지 확인"""
    # 반사성
    for a in A:
        if (a, a) not in R:
            return False, "not reflexive"

    # 대칭성
    for (a, b) in R:
        if (b, a) not in R:
            return False, "not symmetric"

    # 추이성
    for (a, b) in R:
        for (c, d) in R:
            if b == c and (a, d) not in R:
                return False, "not transitive"

    return True, "equivalence relation"

A = {0, 1, 2, 3}
# modulo 2 동치관계
R = {(a, b) for a in A for b in A if (a - b) % 2 == 0}
print(is_equivalence_relation(R, A))
# (True, 'equivalence relation')
# R = {(0,0),(0,2),(2,0),(2,2),(1,1),(1,3),(3,1),(3,3)}
```

## 관련 개념

- [Relation Properties](/knowledge/mathematics/relation-properties/) - 동치관계를 이루는 세 가지 성질
- [Binary Relation](/knowledge/mathematics/binary-relation/) - 동치관계는 특수한 이항 관계
- [Equivalence Class and Partition](/knowledge/mathematics/equivalence-class-and-partition/) - 동치관계가 만드는 동치류와 분할
- [Partial Ordering](/knowledge/mathematics/partial-ordering/) - 대칭 대신 반대칭을 사용하면 반순서
- [Predicate Logic](/knowledge/mathematics/predicate-logic/) - 양화자를 사용한 동치관계의 형식적 정의
