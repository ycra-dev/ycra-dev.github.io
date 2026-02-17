---
title: "Modular Arithmetic"
description: "모듈러 산술(Modular Arithmetic)은 정수를 고정된 양의 정수 m(모듈러스)으로 나눈 나머지를 기반으로 수행하는 산술 체계이다"
tags: ['Modular Arithmetic', 'Number Theory', 'Congruence', 'Remainder', 'Cryptography']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/modular-arithmetic
sidebar:
  order: 1
---

## 핵심 개념

모듈러 산술은 "시계 산술"이라고도 불리며, 나머지(remainder)만을 다루는 산술 체계이다. 나눗셈 알고리즘(Division Algorithm)에 의해, 임의의 정수 a와 양의 정수 d에 대해 a = dq + r (0 <= r < d)를 만족하는 유일한 정수 q(몫)와 r(나머지)가 존재한다.

Z_m 위의 두 가지 기본 연산은 다음과 같이 정의된다:
- **모듈러 덧셈**: a +_m b = (a + b) mod m
- **모듈러 곱셈**: a ._m b = (a . b) mod m

이 연산들은 다음과 같은 대수적 성질을 만족한다:
- **닫힘(Closure)**: 연산 결과가 Z_m에 속함
- **결합법칙(Associativity)**: 덧셈과 곱셈 모두 성립
- **교환법칙(Commutativity)**: 덧셈과 곱셈 모두 성립
- **항등원(Identity)**: 덧셈의 항등원은 0, 곱셈의 항등원은 1
- **덧셈 역원(Additive Inverse)**: a != 0이면 m - a가 덧셈 역원
- **분배법칙(Distributivity)**: 곱셈이 덧셈에 대해 분배

단, 곱셈 역원은 항상 존재하지 않는다. 예를 들어 Z_6에서 2의 곱셈 역원은 존재하지 않는다. 곱셈 역원이 존재하려면 gcd(a, m) = 1이어야 한다.

모듈러 산술의 핵심 성질(Corollary 2):
- (a + b) mod m = ((a mod m) + (b mod m)) mod m
- ab mod m = ((a mod m)(b mod m)) mod m

이 성질은 큰 수의 연산에서 중간 결과를 줄이는 데 매우 유용하며, 특히 암호학에서 핵심적으로 활용된다.

## 예시

**기본 연산 예시 (Z_11)**:
```
7 +_11 9 = (7 + 9) mod 11 = 16 mod 11 = 5
7 ._11 9 = (7 * 9) mod 11 = 63 mod 11 = 8
```

**나눗셈 알고리즘 예시**:
```
101을 11로 나눌 때:
101 = 11 * 9 + 2
→ 몫 q = 9, 나머지 r = 2
→ 101 div 11 = 9, 101 mod 11 = 2

-11을 3으로 나눌 때:
-11 = 3 * (-4) + 1
→ 몫 q = -4, 나머지 r = 1  (나머지는 항상 0 이상)
```

**프로그래밍에서의 mod 연산**:
```python
# Python에서 mod 연산
print(101 % 11)   # 2
print(-11 % 3)    # 1 (Python은 수학적 정의를 따름)
print(16 % 11)    # 5

# 시계 문제: 현재 시각이 20시이고 50시간 후의 시각은?
hour = (20 + 50) % 24  # = 70 % 24 = 22시
```

## 관련 개념

- [Congruence](/knowledge/mathematics/congruence/) - 모듈러 산술의 기반이 되는 합동 관계
- [Modular Exponentiation](/knowledge/mathematics/modular-exponentiation/) - 모듈러 거듭제곱 알고리즘
- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - 모듈러 산술의 핵심 응용
- [Algorithm](/knowledge/mathematics/algorithm/) - 나눗셈 알고리즘
- [Set](/knowledge/mathematics/set/) - Z_m 집합의 정의
