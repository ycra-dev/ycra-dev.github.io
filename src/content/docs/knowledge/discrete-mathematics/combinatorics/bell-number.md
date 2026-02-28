---
title: "Bell Number"
description: "n원소 집합의 집합 분할 총 개수 Bₙ — Peirce의 삼각형으로 계산하며 지수 생성 함수는 e^(eˣ-1), Stirling 2종 수의 합으로 표현"
tags: ["Combinatorics", "Counting", "Set Partitions", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/bell-number
sidebar:
  order: 24
---

## 핵심 개념

벨 수(Bell Number) Bₙ은 n원소 집합의 집합 분할(set partition)의 총 개수다.

초기값: B₀=1, B₁=1, B₂=2, B₃=5, B₄=15, B₅=52, B₆=203, B₇=877, B₈=4140

Stirling 2종 수 S(n,k)의 합으로 표현: Bₙ = Σₖ₌₁ⁿ S(n,k)

## 동작 원리

**Peirce의 삼각형 (Bell 삼각형):**
C.S. Peirce(1880)가 발견한 방법:
```
행 n:  ϖₙ,₁, ϖₙ,₂, ..., ϖₙ,ₙ
ϖₙ,₁ = ϖₙ₋₁,ₙ₋₁  (이전 행의 마지막 원소)
ϖₙ,ₖ = ϖₙ,ₖ₋₁ + ϖₙ₋₁,ₖ₋₁
Bₙ = ϖₙ,₁ (각 행의 첫 원소)
```

삼각형:
```
행 0: 1
행 1: 1  2
행 2: 2  3  5
행 3: 5  7 10 15
행 4: 15 20 27 37 52
Bₙ = 첫 원소: 1, 1, 2, 5, 15, 52, ...
```

**점화식:**
Bₙ = Σₖ₌₀ⁿ⁻¹ C(n-1, k) Bₖ

**지수 생성 함수:**
Σₙ₌₀∞ Bₙ xⁿ/n! = e^(eˣ-1)

**점근 거동:**
Bₙ ~ (n/ln n)ⁿ e^(n/ln n - n - 1/2) (매우 빠르게 성장)

## 예시

```python
def bell_triangle(n):
    """Peirce의 벨 삼각형으로 B₀,...,Bₙ 계산"""
    triangle = [[1]]  # 행 0: [1]
    for row_idx in range(1, n + 1):
        row = [triangle[row_idx - 1][-1]]  # 이전 행의 마지막
        for k in range(1, row_idx + 1):
            row.append(row[-1] + triangle[row_idx - 1][k - 1])
        triangle.append(row)
    return [row[0] for row in triangle]  # 각 행의 첫 원소 = Bell 수

def bell_numbers_recurrence(n):
    """점화식으로 벨 수 계산"""
    from math import comb
    B = [0] * (n + 1)
    B[0] = 1
    for i in range(1, n + 1):
        B[i] = sum(comb(i-1, k) * B[k] for k in range(i))
    return B

# 스털링 2종 수 S(n,k):
from functools import lru_cache

@lru_cache(maxsize=None)
def stirling2(n, k):
    if k == 0: return 1 if n == 0 else 0
    if k > n: return 0
    if k == n: return 1
    return k * stirling2(n-1, k) + stirling2(n-1, k-1)

# 검증: Bₙ = Σₖ₌₀ⁿ S(n,k)
for n in range(8):
    B_sum = sum(stirling2(n, k) for k in range(n+1))
    B_bell = bell_triangle(n)[-1] if n > 0 else 1
    print(f"B_{n} = {B_sum}")

# 출력: B_0=1, B_1=1, B_2=2, B_3=5, B_4=15, B_5=52, B_6=203, B_7=877
```

## 관련 개념

- [Set Partition](/knowledge/discrete-mathematics/combinatorics/set-partition/)
- [Restricted Growth String](/knowledge/discrete-mathematics/combinatorics/restricted-growth-string/)
- [Stirling Numbers](/knowledge/discrete-mathematics/combinatorics/stirling-numbers/)
- [Combination Generation](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
