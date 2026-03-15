---
title: "멱집합 (Power Set)"
description: "집합 S의 멱집합(Power Set) P(S)은 S의 모든 부분집합들의 집합이다"
tags: ['Power Set', 'Subset', 'Combinatorics', 'Set Theory', 'Cardinality']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/power-set
sidebar:
  order: 3
---

## 핵심 개념

멱집합은 주어진 집합의 원소들로 가능한 모든 조합을 체계적으로 탐색해야 하는 문제에서 핵심적인 역할을 한다. 어떤 성질을 만족하는 부분집합을 찾기 위해 모든 부분집합을 검사해야 할 때, 실질적으로 멱집합을 탐색하는 것이다.

**핵심 성질:**
- P(S)는 항상 ∅를 원소로 포함한다 (∅ ⊆ S이므로)
- P(S)는 항상 S 자체를 원소로 포함한다 (S ⊆ S이므로)
- |P(S)| = 2ⁿ (S의 원소가 n개일 때)
- P(A) ⊆ P(B) ⟺ A ⊆ B

멱집합의 원소 수가 2ⁿ인 이유는, 각 원소에 대해 "포함" 또는 "미포함"의 2가지 선택이 있고, n개의 원소에 대해 독립적으로 선택하기 때문이다. 이는 길이 n의 비트열과 일대일 대응이 된다.

컴퓨터과학에서 멱집합의 크기가 지수적(2ⁿ)이라는 사실은 중요하다. 예를 들어 n개 원소의 모든 부분집합을 탐색하는 알고리즘은 지수 시간 복잡도를 가지며, n이 커지면 실용적이지 않을 수 있다. 이것이 NP-hard 문제들이 어려운 근본적 이유 중 하나이다.

Cantor의 정리에 의하면, 임의의 집합 S에 대해 |S| < |P(S)|이다. 이는 유한 집합뿐 아니라 무한 집합에도 적용되어, 무한의 크기가 여러 단계로 존재함을 보여준다.

## 예시

```
S = {0, 1, 2}
P(S) = {∅, {0}, {1}, {2}, {0,1}, {0,2}, {1,2}, {0,1,2}}
|P(S)| = 2³ = 8

P(∅) = {∅}           → |P(∅)| = 2⁰ = 1
P({∅}) = {∅, {∅}}    → |P({∅})| = 2¹ = 2

비트열과의 대응 (S = {a, b, c}):
000 → ∅
001 → {c}
010 → {b}
011 → {b,c}
100 → {a}
101 → {a,c}
110 → {a,b}
111 → {a,b,c}
```

Python에서 멱집합 생성:
```python
from itertools import combinations

def power_set(s):
    s = list(s)
    result = []
    for r in range(len(s) + 1):
        result.extend(combinations(s, r))
    return result

S = {0, 1, 2}
print(power_set(S))
# [(), (0,), (1,), (2,), (0,1), (0,2), (1,2), (0,1,2)]
```

## 관련 개념

- [Set](/knowledge/mathematics/set/) - 부분집합의 정의와 기본 집합 이론
- [Set Operations](/knowledge/mathematics/set-operations/) - 멱집합 원소 간의 연산
- [Cardinality](/knowledge/mathematics/cardinality/) - Cantor의 정리: |S| < |P(S)|
- [Cartesian Product](/knowledge/mathematics/cartesian-product/) - 집합의 조합 구성과의 관계
