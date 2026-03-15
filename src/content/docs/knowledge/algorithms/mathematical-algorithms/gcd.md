---
title: "최대 공약수 (GCD)"
description: "최대공약수(Greatest Common Divisor, GCD)는 두 정수 a, b의 공통 약수 중 가장 큰 값으로, gcd(a, b)로 표기한다"
tags: ['Gcd', 'Euclidean Algorithm', 'Number Theory', 'Divisibility', 'Extended Euclid']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/gcd
sidebar:
  order: 1
---

## 핵심 개념

**GCD 재귀 정리 (Theorem 31.9)**:
```
gcd(a, b) = gcd(b, a mod b)
```

**유클리드 알고리즘**:
```
EUCLID(a, b)
1  if b == 0
2      return a
3  else return EUCLID(b, a mod b)
```

**실행 시간 (Lamé's theorem, Theorem 31.11)**:
- a > b >= 1이고 b < F_{k+1}이면, EUCLID(a, b)는 k번 미만의 재귀 호출
- 재귀 호출 횟수: O(lg b) = O(β), β는 b의 비트 수
- 비트 연산: O(β³) (β-비트 나눗셈이 O(β²))

**확장 유클리드 알고리즘**:
```
EXTENDED-EUCLID(a, b)
1  if b == 0
2      return (a, 1, 0)
3  else (d', x', y') = EXTENDED-EUCLID(b, a mod b)
4      (d, x, y) = (d', y', x' - ⌊a/b⌋ · y')
5      return (d, x, y)
```
d = gcd(a, b) = ax + by를 만족하는 (d, x, y)를 반환한다.

**핵심 성질들**:
- gcd(a, b) = gcd(|a|, |b|) = gcd(b, a)
- gcd(a, 0) = a
- gcd(a, b)는 ax + by 형태의 최소 양의 선형 결합 (Theorem 31.2)
- d | a이고 d | b이면 d | gcd(a, b) (Corollary 31.3)

**피보나치 수열과의 관계**: EUCLID의 최악 입력은 연속 피보나치 수이다. EUCLID(F_{k+1}, F_k)는 정확히 k-1번 재귀 호출한다.

## 예시

```
EUCLID(30, 21)
= EUCLID(21, 9)    // 30 mod 21 = 9
= EUCLID(9, 3)     // 21 mod 9 = 3
= EUCLID(3, 0)     // 9 mod 3 = 0
= 3

EXTENDED-EUCLID(99, 78):
gcd(99, 78) = 3 = 99·(-11) + 78·14
```

## 관련 개념

- [모듈러 연산 (Modular Arithmetic)](/knowledge/algorithms/modular-arithmetic/) - GCD를 활용한 모듈러 연산
- [RSA 암호 체계 (RSA Cryptosystem)](/knowledge/algorithms/rsa-cryptosystem/) - 공개키 암호에서 GCD 활용
- [중국인의 나머지 정리 (Chinese Remainder Theorem)](/knowledge/algorithms/chinese-remainder-theorem/) - 서로소 조건에 GCD 사용
- [소수 판정 (Primality Testing)](/knowledge/algorithms/primality-testing/) - 소수 판별과의 관련
