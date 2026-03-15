---
title: "카탈란 수 (Catalan Number)"
description: "n개의 노드를 가진 이진 트리의 수이자 n쌍의 올바른 괄호 배열의 수 Cₙ = C(2n,n)/(n+1) — 42가지 이상의 동치 조합론적 구조를 셈"
tags: ["Combinatorics", "Counting", "Trees", "Parentheses", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/catalan-number
sidebar:
  order: 28
---

## 핵심 개념

카탈란 수(Catalan Number) Cₙ는 n개의 노드를 가진 이진 트리의 수, n쌍의 올바른 괄호 배열의 수, 또는 수많은 다른 등가 조합론적 구조의 수다.

**공식:** Cₙ = C(2n, n) / (n+1) = C(2n, n) - C(2n, n-1)

초기값: C₀=1, C₁=1, C₂=2, C₃=5, C₄=14, C₅=42, C₆=132, C₇=429

## 동작 원리

**점화식:**
Cₙ₊₁ = Σₖ₌₀ⁿ Cₖ · Cₙ₋ₖ (카탈란 수의 자기 합성곱)

**생성 함수:**
Σₙ≥₀ Cₙxⁿ = (1 - √(1-4x)) / 2x

**Cₙ과 동치인 구조들 (42+ 가지):**
1. n노드 이진 트리 (이진 포레스트도 Cₙ)
2. n쌍 올바른 괄호 문자열
3. n+1개 리프를 가진 완전 이진 트리
4. {1,...,2n}을 n쌍으로 중첩 없이 짝짓기
5. n×n 격자에서 대각선 넘지 않는 단조 경로
6. (n+2)각형의 삼각분할 수

**점근 거동:**
Cₙ ~ 4ⁿ / (n^(3/2) · √π)

## 예시

```python
from math import comb

def catalan(n):
    """n번째 카탈란 수"""
    return comb(2*n, n) // (n + 1)

def catalan_dp(n):
    """점화식으로 카탈란 수 계산"""
    C = [0] * (n + 1)
    C[0] = 1
    for i in range(1, n + 1):
        for j in range(i):
            C[i] += C[j] * C[i-1-j]
    return C[n]

def valid_parentheses(n):
    """n쌍의 올바른 괄호 문자열 생성 (Cₙ개)"""
    def gen(left, right, current):
        if left == 0 and right == 0:
            yield current
            return
        if left > 0:
            yield from gen(left-1, right+1, current+'(')
        if right > 0:
            yield from gen(left, right-1, current+')')
    yield from gen(n, 0, '')

# n=3: ((())), (()()), (())(), ()(()), ()()()
# → C₃ = 5가지

# 이진 트리 구조 생성:
def all_binary_trees(n):
    """n 노드 이진 트리의 가능한 구조 생성 (Cₙ개)"""
    if n == 0:
        yield None
        return
    for left in range(n):
        right = n - 1 - left
        for l_tree in all_binary_trees(left):
            for r_tree in all_binary_trees(right):
                yield (l_tree, r_tree)

# 카탈란 수의 비율:
for n in range(1, 8):
    ratio = catalan(n+1) / catalan(n)
    print(f"C({n+1})/C({n}) = {ratio:.4f}")
# → (4n+2)/(n+2) → 4로 수렴
```

## 관련 개념

- [트리 생성 (Tree Generation)](/knowledge/discrete-mathematics/combinatorics/tree-generation/)
- [벨 수 (Bell Number)](/knowledge/discrete-mathematics/combinatorics/bell-number/)
- [조합 생성 (Combination Generation)](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
- [생성 함수 (Generating Functions)](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
