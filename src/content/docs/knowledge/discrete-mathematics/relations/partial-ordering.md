---
title: "Partial Ordering"
description: "집합 S 위의 관계 R이 반사적(reflexive), 반대칭적(antisymmetric), 추이적(transitive)이면 반순서(partial ordering 또는 partial order)라 한다"
tags: ['Partial Order', 'Poset', 'Comparable', 'Total Order', 'Well Ordered', 'Antisymmetric']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/partial-ordering
sidebar:
  order: 10
---

## 핵심 개념

**동치관계와의 비교**: 동치관계는 "대칭적"이고, 반순서는 "반대칭적"이다. 이 한 가지 차이가 완전히 다른 구조를 만든다:
- 동치관계: "같은 것을 분류"
- 반순서: "원소들을 순서화"

**비교 가능성(Comparability)**: 포셋 (S, <=)에서 원소 a, b가 a <= b 또는 b <= a이면 비교 가능(comparable)하다고 한다. 어느 쪽도 아닌 경우 비교 불가능(incomparable)하다. "부분(partial)"이라는 이름은 모든 쌍이 비교 가능하지 않을 수 있기 때문이다.

**전순서(Total Order)**: 모든 원소 쌍이 비교 가능한 반순서. (Z, <=)는 전순서이지만, (Z+, |)는 아니다 (예: 5와 7은 비교 불가능).

**정렬순서(Well-Ordered)**: 전순서이면서 모든 비공집합 부분집합이 최소원소를 가지는 경우. (Z+, <=)는 정렬순서이지만, (Z, <=)는 아니다 (음의 정수 집합에 최소원소 없음).

**대표적 반순서 예시**:
- (Z, <=): 정수의 이하 관계 -- 전순서
- (Z+, |): 양의 정수의 나누기 관계 -- 부분순서
- (P(S), ⊆): 거듭집합의 포함 관계 -- 부분순서

**정렬순서 귀납법(Well-Ordered Induction)**: 정렬순서 집합에서, x 이전의 모든 원소에 대해 P가 참이면 P(x)도 참임을 보이면, 모든 원소에 대해 P가 참이다. 기저 사례가 별도로 필요 없다 (최소원소에 대해 공허한 참이 성립).

## 예시

```python
# 포셋 예시: 양의 정수의 나누기 관계
def divides(a, b):
    return b % a == 0

# 비교 가능성 확인
S = {1, 2, 3, 4, 5, 6}
print(divides(2, 6))  # True: 2와 6은 비교 가능 (2|6)
print(divides(3, 5) or divides(5, 3))  # False: 3과 5는 비교 불가능

# 전순서 확인
def is_total_order(R, S):
    """모든 쌍이 비교 가능한지 확인"""
    for a in S:
        for b in S:
            if (a, b) not in R and (b, a) not in R:
                return False
    return True

# (Z+, |)에서 {1,2,3,4,5}
divides_R = {(a, b) for a in S for b in S if divides(a, b)}
print(is_total_order(divides_R, S))  # False

# (S, <=)에서 {1,2,3,4,5}
leq_R = {(a, b) for a in S for b in S if a <= b}
print(is_total_order(leq_R, S))  # True

# 사전식 순서 (lexicographic order)
def lex_less(t1, t2):
    """t1 < t2 (사전식)"""
    for a, b in zip(t1, t2):
        if a < b:
            return True
        if a > b:
            return False
    return len(t1) < len(t2)

print(lex_less((1, 2, 3), (1, 2, 4)))  # True
print(lex_less((1, 2), (1, 2, 0)))      # True
print(lex_less("discreet", "discrete"))  # True (e < t)
```

거듭집합의 포함 관계:
```
P({a,b,c}) 위의 포함 관계 (⊆):
           {a,b,c}
         /    |    \
     {a,b}  {a,c}  {b,c}    <- 비교불가능한 원소들 존재
       \     |     /
       {a}  {b}  {c}
         \   |   /
            {}
```

## 관련 개념

- [Relation Properties](/knowledge/mathematics/relation-properties/) - 반사성, 반대칭성, 추이성으로 정의
- [Binary Relation](/knowledge/mathematics/binary-relation/) - 반순서는 특수한 이항 관계
- [Equivalence Relation](/knowledge/mathematics/equivalence-relation/) - 대칭 대신 반대칭을 사용
- [Hasse Diagram](/knowledge/mathematics/hasse-diagram/) - 포셋의 시각적 표현
- [Topological Sorting](/knowledge/mathematics/topological-sorting/) - 반순서에서 전순서를 구성
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 정렬순서 귀납법 증명 기법
