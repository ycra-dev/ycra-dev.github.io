---
title: "Nim Game"
description: "k개 돌 더미에서 번갈아 돌을 제거하는 게임 — XOR 합이 0이 아닌 쪽이 필승이며 Sprague-Grundy 정리로 모든 조합 게임을 분석하는 기반"
tags: ["Combinatorics", "Game Theory", "XOR", "Sprague-Grundy", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/nim-game
sidebar:
  order: 27
---

## 핵심 개념

님(Nim)은 k개의 돌 더미에서 두 플레이어가 번갈아 가며 한 더미에서 원하는 만큼 돌을 제거하는 게임이다. 모든 더미가 비었을 때 마지막 수를 둔 플레이어가 이긴다.

**XOR 전략:** 더미 크기 a₁, a₂, ..., aₖ에서 현재 플레이어의 **필승 조건**:
```
a₁ ⊕ a₂ ⊕ ... ⊕ aₖ ≠ 0  (님 합이 0이 아님)
```

## 동작 원리

**증명의 핵심:**
- XOR 합이 0인 상태: 어떤 수를 두어도 XOR 합 ≠ 0인 상태로 이동
- XOR 합 ≠ 0인 상태: XOR 합 = 0인 상태로 이동하는 수가 항상 존재
- 마지막 상태 (모두 0): XOR 합 = 0 → 이전 수를 둔 플레이어가 이김

**MEX와 Grundy 값:**
- mex(S) = min{k ≥ 0 | k ∉ S} (최소 배제값)
- Grundy 값 G(상태) = mex{G(이동 가능한 상태들)}
- **복합 게임 (Sprague-Grundy 정리)**: G(A+B) = G(A) ⊕ G(B)

**Nimber(Conway's Field):**
XOR(⊕)과 nim 곱셈(⊗)으로 구성되는 대수 체계. 비음 정수 전체 집합 위에서 체(field)를 형성.

## 예시

```python
def can_win_nim(piles):
    """현재 차례인 플레이어가 필승인가?"""
    xor_sum = 0
    for pile in piles:
        xor_sum ^= pile
    return xor_sum != 0  # True면 필승

def winning_move(piles):
    """필승 수 찾기"""
    xor_sum = 0
    for pile in piles:
        xor_sum ^= pile

    if xor_sum == 0:
        return None  # 지는 위치

    for i, pile in enumerate(piles):
        target = pile ^ xor_sum  # 이 더미를 target으로 줄임
        if target < pile:  # 줄이는 수만 가능
            return f"더미 {i}: {pile} → {target}"
    return None

# 예시:
# piles = [3, 5, 6]
# xor_sum = 3⊕5⊕6 = 011⊕101⊕110 = 000 = 0 → 지는 위치

# piles = [1, 4, 7]
# xor_sum = 001⊕100⊕111 = 010 = 2 → 이기는 위치
# 더미 2 (크기 7): 7⊕2=5, 7→5로 줄이면 됨
# 검증: 1⊕4⊕5 = 001⊕100⊕101 = 000 ✓

# Grundy 값 계산 (메모이제이션)
from functools import lru_cache

def grundy(n):
    """Nim에서 크기 n인 더미의 Grundy 값 = n"""
    return n  # Nim은 특수: G({0,1,...,n-1}) = n

def grundy_general(state, moves_fn, memo={}):
    """일반 조합 게임의 Grundy 값"""
    if state in memo:
        return memo[state]
    reachable = {grundy_general(s, moves_fn, memo) for s in moves_fn(state)}
    g = 0
    while g in reachable:
        g += 1
    memo[state] = g
    return g
```

## 관련 개념

- [Bitwise Operations](/knowledge/algorithms/foundations/bitwise-operations/)
- [Combinatorial Searching](/knowledge/algorithms/foundations/combinatorial-searching/)
- [Combination Generation](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
