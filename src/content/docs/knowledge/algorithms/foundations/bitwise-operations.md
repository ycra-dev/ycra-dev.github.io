---
title: "Bitwise Operations"
description: "이진수의 각 비트 위치에 독립적으로 부울 연산을 적용하는 정수 연산으로, AND/OR/XOR/시프트 등 핵심 연산과 실용적 비트 트릭을 포함한다"
tags: ["Algorithms", "BitManipulation", "Programming", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/bitwise-operations
sidebar:
  order: 102
---

## 핵심 개념

비트 연산(Bitwise Operations)은 이진수의 각 비트 위치에 독립적으로 부울 연산을 적용하는 정수 연산이다. 주요 연산은 AND(&), OR(|), XOR(⊕), NOT(~), 시프트(≪, ≫)이다. 현대 프로세서에서 비트 연산은 가장 빠른 연산 중 하나이며, 성능 임계 코드에서 널리 활용된다.

## 동작 원리

**기본 연산:**
```
x & y  → 비트별 AND  (z_k = x_k ∧ y_k)
x | y  → 비트별 OR   (z_k = x_k ∨ y_k)
x ⊕ y  → 비트별 XOR  (z_k = x_k ⊕ y_k, "nim 합")
x ≪ k  → 왼쪽 시프트 (×2^k와 동치)
x ≫ k  → 오른쪽 시프트 (÷2^k와 동치)
```

**2의 보수 음수 표현:** 음수를 무한 정밀도 2진 수(2-adic integer)로 취급. -5 = (…1111011)₂

**핵심 항등식:**
```
x & (-x)   → 가장 낮은 1-비트만 추출 (2^ρ(x))
x & (x-1)  → 가장 낮은 1-비트 제거
ν(x)       → x의 1-비트 수 (population count, popcount)
```

**비트 인덱스 표기 (Knuth):**
- ν(n): 1-비트의 수 (popcount)
- λ(n) = ⌊log₂n⌋: 가장 왼쪽 1-비트 위치 (n>0)
- ρ(n): 가장 오른쪽 1-비트 위치 (trailing zeros)

**주요 트릭들:**
```c
t = x ^ y; y = y ^ (t & m); x = x ^ y  // 조건 없는 부분 교환
min(x,y) = y ^ ((x^y) & -(x<y))        // 분기 없는 최솟값
v = x >> 31; (x+v)^v                    // 분기 없는 절댓값
```

## 예시

```c
// 유용한 비트 연산 트릭들

// 1. 가장 낮은 1-비트 추출
int lowest_set_bit(int x) { return x & (-x); }

// 2. 가장 낮은 1-비트 제거
int remove_lowest_set_bit(int x) { return x & (x - 1); }

// 3. 2의 거듭제곱 여부 확인
bool is_power_of_2(int x) { return x > 0 && (x & (x-1)) == 0; }

// 4. 비트 개수 세기 (popcount - 비트 병렬법)
int popcount(int x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    return ((x + (x >> 4)) & 0x0F0F0F0F) * 0x01010101 >> 24;
}

// 5. 오버플로우 없는 중간값
int midpoint(unsigned x, unsigned y) { return (x & y) + ((x ^ y) >> 1); }

// Nim 합과 게임 전략: XOR이 0이면 지는 위치
int nim_sum(int* piles, int n) {
    int xor_sum = 0;
    for (int i = 0; i < n; i++) xor_sum ^= piles[i];
    return xor_sum;
}
```

## 관련 개념

- [Population Count](/knowledge/algorithms/foundations/population-count/)
- [Nim Game](/knowledge/discrete-mathematics/combinatorics/nim-game/)
- [Gray Code](/knowledge/discrete-mathematics/combinatorics/gray-code/)
