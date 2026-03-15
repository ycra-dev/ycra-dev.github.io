---
title: "거듭제곱 계산 (Evaluation of Powers)"
description: "a^n을 최소한의 곱셈으로 계산하는 알고리즘 — 이진 방법(반복 제곱)이 표준이지만 가법 연쇄로 더 줄일 수 있음"
tags: ["Algorithms", "Arithmetic", "Exponentiation", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/evaluation-of-powers
sidebar:
  order: 36
---

## 핵심 개념

거듭제곱 계산(Evaluation of Powers)은 a^n을 최소한의 곱셈으로 계산하는 문제다. 직접 n-1번 곱하는 것보다 훨씬 적은 연산으로 가능하다.

## 동작 원리

**이진 방법 (Binary Method, 반복 제곱)**:
n을 이진수로 표현하여 계산. Knuth는 이를 "이진법 알고리즘"이라 부른다:

```
Algorithm A (이진 방법):
1. n을 이진수로 표현: n = (n_t n_{t-1} ... n_1 n_0)₂
2. result = a
3. for i = t-1 downto 0:
       result = result²
       if n_i = 1: result = result × a
```

**비용**: ⌊lg n⌋ 번의 제곱 + ν(n) - 1 번의 곱셈
- ν(n) = n의 이진 표현에서 1의 개수

**예시 a^{23}**:
23 = 10111₂
```
result = a
i=4: result = a² (0 → 제곱만)... 잠깐, 23 = 10111
i=3: result = a²  → n_3=0, 제곱: a²
i=2: result = a⁴  → n_2=1, 곱: a⁵
i=1: result = a¹⁰ → n_1=1, 곱: a¹¹
i=0: result = a²² → n_0=1, 곱: a²³
총 4번 제곱 + 3번 곱 = 7번
```

**가법 연쇄 (Addition Chain)**: 이진 방법보다 더 적은 곱셈으로 가능한 최적 방법. {1, 2, 3, 5, 10, 20, 23}이 a^23에 대한 가법 연쇄 (6번의 곱셈: 1→2, 2→3, 3→5, 5→10, 10→20, 20+3→23).

**이진 방법의 변형**:
- **M-ary 방법**: n을 m진수로 표현하여 처리, 더 큰 블록 단위
- **슬라이딩 윈도우 방법**: 연속된 1비트들을 한 번에 처리
- **모듈러 거듭제곱**: (a^n) mod m — RSA의 핵심

## 예시

```python
def power_binary(a, n):
    """이진 방법: O(log n)번의 곱셈"""
    if n == 0:
        return 1
    result = a
    # n의 이진 표현에서 최고 비트 다음부터
    bits = bin(n)[3:]  # '0b1...'에서 첫 '1' 이후
    for bit in bits:
        result = result * result  # 제곱
        if bit == '1':
            result = result * a   # 추가 곱
    return result

# 일반 거듭제곱과 비교
print(power_binary(2, 10))    # 1024
print(power_binary(3, 20))    # 3486784401

# 모듈러 거듭제곱 (RSA의 핵심)
def modular_pow(base, exp, mod):
    """(base^exp) mod m — O(log exp) 곱셈"""
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1:
            result = (result * base) % mod
        base = (base * base) % mod
        exp >>= 1
    return result

# RSA 복호화 예시 (소규모)
p, q = 61, 53
n = p * q        # 3233
e = 17           # 공개 지수
# d × e ≡ 1 (mod λ(n)) 로 d 계산
d = 2753         # 비밀 지수

message = 123
encrypted = modular_pow(message, e, n)  # 암호화
decrypted = modular_pow(encrypted, d, n)  # 복호화
print(f"원문: {message}, 암호화: {encrypted}, 복호화: {decrypted}")

# 가법 연쇄 vs 이진 방법 비교
def binary_chain_length(n):
    """이진 방법의 곱셈 횟수"""
    return bin(n).count('1') - 1 + len(bin(n)) - 3  # ν(n) - 1 + ⌊lg n⌋

for n in [15, 23, 64, 127]:
    print(f"a^{n}: 이진 방법 {binary_chain_length(n)}번 곱")
```

## 관련 개념

- [모듈러 연산 (Modular Arithmetic)](/knowledge/algorithms/mathematical-algorithms/modular-arithmetic/)
- [RSA 암호 체계 (RSA Cryptosystem)](/knowledge/algorithms/mathematical-algorithms/rsa-cryptosystem/)
- [모듈러 거듭제곱 (Modular Exponentiation)](/knowledge/discrete-mathematics/number-theory/modular-exponentiation/)
