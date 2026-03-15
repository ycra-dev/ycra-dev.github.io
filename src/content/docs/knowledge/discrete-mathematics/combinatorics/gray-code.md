---
title: "그레이 코드 (Gray Code)"
description: "연속한 두 코드워드가 정확히 하나의 비트만 다른 이진 수열 — 최소 변화 원칙으로 조합론적 객체를 열거하는 기반이며 b↔g 변환이 XOR 연산으로 O(1)"
tags: ["Combinatorics", "Enumeration", "Hamiltonian", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/gray-code
sidebar:
  order: 19
---

## 핵심 개념

그레이 코드(Gray Code)는 연속한 두 코드워드가 정확히 하나의 비트(또는 자릿수)만 다른 이진 수열이다. 조합론적 객체를 생성할 때 한 번에 최소 변화(minimal change)로 이동하는 열거 방법의 기반이다.

n비트 이진 하이퍼큐브에서 모든 정점을 정확히 한 번 방문하는 해밀턴 경로에 대응한다.

## 동작 원리

**이진 반사 그레이 코드(Binary Reflected Gray Code, BRGC):**
n비트 그레이 코드의 재귀적 구성:
- n=1: 0, 1
- n>1: 0+(n-1 코드), 1+(n-1 코드의 역순)

예: n=3 → 000, 001, 011, 010, 110, 111, 101, 100

**이진 코드 b와 그레이 코드 g의 변환:**
- b → g: g = b ⊕ (b >> 1)  (O(1) 비트 연산)
- g → b: b_k = g_k ⊕ g_{k+1} ⊕ ...  (O(n) 순차 XOR)

**일반화:**
- **m진 그레이 코드**: 각 자릿수가 {0,...,m-1}인 수열
- **집합 분할의 그레이 코드**: 각 단계에서 원소 하나가 한 블록에서 다른 블록으로 이동
- **순열의 그레이 코드**: 각 단계에서 인접 교환(transposition)

## 예시

```python
def gray_code(n):
    """n비트 이진 반사 그레이 코드 생성"""
    if n == 0:
        return ['']
    prev = gray_code(n - 1)
    return ['0' + x for x in prev] + ['1' + x for x in reversed(prev)]

def int_to_gray(n):
    """정수 n을 그레이 코드로 변환 (O(1))"""
    return n ^ (n >> 1)

def gray_to_int(g):
    """그레이 코드 g를 정수로 변환"""
    mask = g >> 1
    while mask:
        g ^= mask
        mask >>= 1
    return g

# 변화된 비트 인덱스 (오직 1비트만 변함):
def changed_bit(step):
    """step번째 전환에서 변화되는 비트 인덱스"""
    return (step & -step).bit_length() - 1

# n=3 그레이 코드 생성:
for i in range(8):
    g = int_to_gray(i)
    print(f"{i}: {g:03b}")
# 0: 000
# 1: 001
# 2: 011
# 3: 010
# 4: 110
# 5: 111
# 6: 101
# 7: 100
```

## 관련 개념

- [순열 생성 (Permutation Generation)](/knowledge/discrete-mathematics/combinatorics/permutation-generation/)
- [드 브루인 수열 (De Bruijn Sequence)](/knowledge/discrete-mathematics/combinatorics/de-bruijn-sequence/)
- [조합 생성 (Combination Generation)](/knowledge/discrete-mathematics/combinatorics/combination-generation/)
- [루프 없는 알고리즘 (Loopless Algorithm)](/knowledge/algorithms/foundations/loopless-algorithm/)
