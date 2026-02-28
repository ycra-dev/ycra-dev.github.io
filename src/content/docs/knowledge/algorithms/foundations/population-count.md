---
title: "Population Count"
description: "이진수 n의 1-비트 수를 계산하는 연산으로, Knuth 표기로 ν(n)이라 하며 Hamming 가중치(Hamming weight)라고도 한다"
tags: ["Algorithms", "BitManipulation", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/population-count
sidebar:
  order: 103
---

## 핵심 개념

인구 계산(Population Count, popcount)은 이진수 n의 1-비트 수를 계산하는 연산이다. Knuth 표기로 ν(n)이라 하며, Hamming 가중치(Hamming weight)라고도 한다. 오류 수정, 암호학, 게임 이론 등 다양한 분야에서 핵심적으로 사용된다.

## 동작 원리

**비트 인덱스 표기 (Knuth):**
- ν(n): 1-비트의 수 (popcount)
- λ(n) = ⌊log₂n⌋: 가장 왼쪽 1-비트 위치 (n > 0)
- ρ(n): 가장 오른쪽 1-비트 위치 (trailing zeros)
  - n & (-n) = 2^ρ(n)

**효율적 계산 방법:**

| 방법 | 시간 복잡도 | 설명 |
|------|------------|------|
| 루프 | O(ν(n)) | 1-비트 하나씩 제거 |
| 룩업 테이블 | O(w/k) | k비트씩 룩업 |
| 비트 병렬법 | O(log w) | w비트 워드에서 최적 |

**비트 병렬 popcount 원리:**
이진수 XY (X=상위 절반, Y=하위 절반)에 대해:
```
popcount(XY) = popcount(X) + popcount(Y)
```
이를 재귀적으로 적용하여, 2비트 단위 → 4비트 단위 → ... 로 합산한다.

**관련 함수:**
- `popcount(n & (n-1))`: n의 가장 낮은 1-비트 제거 후 popcount
- `popcount(n ^ m)`: n과 m의 Hamming 거리
- `ctz(n) = ρ(n)`: trailing zeros count
- `clz(n)`: leading zeros count

**하드웨어 지원:** Knuth의 MMIX 컴퓨터는 SADD(sideways addition) 명령어로 popcount를 O(1)에 계산한다. 이는 1952년 Manchester Mark II 컴퓨터에서 "sideways addition"으로 처음 등장했다.

## 예시

```c
// 방법 1: 가장 낮은 1-비트 제거 방법 O(ν(n))
int popcount_v1(unsigned int n) {
    int count = 0;
    while (n) {
        n &= n - 1;  // 가장 낮은 1-비트 제거
        count++;
    }
    return count;
}

// 방법 2: 비트 병렬법 (32비트) O(log 32) = O(5)
int popcount_v2(unsigned int n) {
    n = n - ((n >> 1) & 0x55555555);          // 2비트씩 합산
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);  // 4비트씩 합산
    n = (n + (n >> 4)) & 0x0F0F0F0F;          // 8비트씩 합산
    return (n * 0x01010101) >> 24;             // 모든 바이트의 합
}

// 방법 3: 내장 함수 (gcc/clang)
int popcount_v3(unsigned int n) {
    return __builtin_popcount(n);  // 하드웨어 명령어 활용
}

// 응용: Hamming 거리
int hamming_distance(int m, int n) {
    return __builtin_popcount(m ^ n);  // XOR 후 popcount
}
```

## 관련 개념

- [Bitwise Operations](/knowledge/algorithms/foundations/bitwise-operations/)
- [Nim Game](/knowledge/discrete-mathematics/combinatorics/nim-game/)
