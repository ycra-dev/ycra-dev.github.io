---
title: "모듈러 연산 (Modular Arithmetic)"
description: "모듈러 산술(Modular Arithmetic)은 정수를 n으로 나눈 나머지에 기반한 산술 체계로, 유한 군(finite group)의 구조를 통해 형식화되며 암호학과 정수론의 핵심 기반이다"
tags: ['Modular Arithmetic', 'Number Theory', 'Group Theory', 'Multiplicative Inverse', 'Euler Phi']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/modular-arithmetic
sidebar:
  order: 2
---

## 핵심 개념

**기본 구조**:
- ℤ_n = {0, 1, ..., n-1}: 모듈 n에 대한 잔류 클래스
- a ≡ b (mod n): a와 b가 n을 법으로 합동

**유한 군**:
1. **덧셈군 (ℤ_n, +_n)**: 크기 n, 항등원 0, a의 역원은 n-a
2. **곱셈군 (ℤ_n*, ·_n)**: gcd(a, n) = 1인 원소들로 구성
   - 크기 ϕ(n) (오일러 파이 함수)
   - 항등원 1
   - 역원: EXTENDED-EUCLID로 계산

**곱셈 역원 계산**:
```
a의 역원 (a^{-1} mod n):
EXTENDED-EUCLID(a, n) → (1, x, y)
a^{-1} ≡ x (mod n)  (gcd(a,n) = 1일 때만 존재)
```

**오일러 파이 함수**: ϕ(n) = |ℤ_n*|
- n = p (소수): ϕ(p) = p - 1
- n = p·q (서로 다른 소수): ϕ(pq) = (p-1)(q-1)

**반복 제곱법(Repeated Squaring)**:
```
MODULAR-EXPONENTIATION(a, b, n)  // a^b mod n 계산
// b를 이진 표현으로 보고 제곱과 곱셈 반복
// O(β) 회의 모듈러 곱셈, β = ⌊lg b⌋ + 1
```

**오일러 정리**: gcd(a, n) = 1이면 a^{ϕ(n)} ≡ 1 (mod n)
**페르마 소정리**: p가 소수이고 p ∤ a이면 a^{p-1} ≡ 1 (mod p)

## 예시

```
ℤ_{15}* = {1, 2, 4, 7, 8, 11, 13, 14}
ϕ(15) = ϕ(3)·ϕ(5) = 2·4 = 8

곱셈 역원 계산:
  7^{-1} mod 15:
  EXTENDED-EUCLID(7, 15) → (1, 13, -6)
  7·13 = 91 ≡ 1 (mod 15) ✓
  따라서 7^{-1} ≡ 13 (mod 15)

반복 제곱법: 7^{560} mod 561
  560 = 1000110000₂
  순차적으로 제곱하며 이진 비트가 1인 위치에서 곱셈
```

## 관련 개념

- [GCD](/knowledge/algorithms/gcd/) - 모듈러 역원 계산에 확장 유클리드 사용
- [RSA 암호 체계 (RSA Cryptosystem)](/knowledge/algorithms/rsa-cryptosystem/) - 모듈러 산술 기반 암호
- [소수 판정 (Primality Testing)](/knowledge/algorithms/primality-testing/) - 페르마 소정리 기반 판별
- [중국인의 나머지 정리 (Chinese Remainder Theorem)](/knowledge/algorithms/chinese-remainder-theorem/) - 모듈러 체계의 분해
