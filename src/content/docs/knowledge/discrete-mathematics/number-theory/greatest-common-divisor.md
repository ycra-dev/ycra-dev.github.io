---
title: "최대공약수 (Greatest Common Divisor)"
description: "최대공약수(Greatest Common Divisor, GCD)는 두 정수 a, b(둘 다 0이 아닌)를 동시에 나누는 가장 큰 양의 정수 d이다"
tags: ['Gcd', 'Lcm', 'Number Theory', 'Divisibility', 'Bezout Identity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/greatest-common-divisor
sidebar:
  order: 6
---

## 핵심 개념

**GCD의 기본 정의와 성질**:
- gcd(a, b)는 a와 b의 공통 양의 약수 중 최대값
- a = b일 때, gcd(a, a) = a
- gcd(a, 0) = a (0이 아닌 a에 대해)

**서로소(Relatively Prime)**:
- gcd(a, b) = 1이면 a와 b는 서로소
- 예: gcd(17, 22) = 1 → 17과 22는 서로소
- **쌍별 서로소(Pairwise Relatively Prime)**: 정수 집합에서 임의의 두 정수가 모두 서로소

**소인수분해를 이용한 GCD 계산**:
a = p1^a1 * p2^a2 * ... * pn^an, b = p1^b1 * p2^b2 * ... * pn^bn 일 때,
gcd(a, b) = p1^min(a1,b1) * p2^min(a2,b2) * ... * pn^min(an,bn)

**최소공배수(Least Common Multiple, LCM)**:
lcm(a, b) = p1^max(a1,b1) * p2^max(a2,b2) * ... * pn^max(an,bn)

**GCD와 LCM의 관계** (Theorem 5):
ab = gcd(a, b) * lcm(a, b)

**베주의 정리(Bezout's Theorem)**:
a, b가 양의 정수이면, gcd(a, b) = sa + tb를 만족하는 정수 s, t가 존재한다. 이때 s, t를 베주 계수(Bezout coefficients)라 한다.

**핵심 보조정리(Lemma 2)**:
gcd(a, b) = 1이고 a | bc이면, a | c이다. 이 결과는 소인수분해의 유일성 증명과 합동식의 나눗셈에 핵심적으로 사용된다.

## 예시

**소인수분해를 이용한 GCD/LCM 계산**:
```
120 = 2^3 * 3 * 5
500 = 2^2 * 5^3

gcd(120, 500) = 2^min(3,2) * 3^min(1,0) * 5^min(1,3)
              = 2^2 * 3^0 * 5^1 = 4 * 1 * 5 = 20

lcm(120, 500) = 2^max(3,2) * 3^max(1,0) * 5^max(1,3)
              = 2^3 * 3^1 * 5^3 = 8 * 3 * 125 = 3000

검증: 120 * 500 = 60000 = 20 * 3000 = gcd * lcm ✓
```

**베주의 항등식 예시**:
```
gcd(6, 14) = 2
2 = (-2) * 6 + 1 * 14
→ s = -2, t = 1이 베주 계수
```

**Python 구현**:
```python
import math

# GCD (Python 내장)
print(math.gcd(120, 500))  # 20

# LCM
def lcm(a, b):
    return abs(a * b) // math.gcd(a, b)

print(lcm(120, 500))  # 3000

# 서로소 판별
def is_coprime(a, b):
    return math.gcd(a, b) == 1

print(is_coprime(17, 22))  # True
print(is_coprime(12, 18))  # False
```

## 관련 개념

- [Euclidean Algorithm](/knowledge/mathematics/euclidean-algorithm/) - GCD를 효율적으로 계산하는 알고리즘
- [Prime Number](/knowledge/mathematics/prime-number/) - 소인수분해를 통한 GCD 계산
- [Chinese Remainder Theorem](/knowledge/mathematics/chinese-remainder-theorem/) - 쌍별 서로소 조건 활용
- [Congruence](/knowledge/mathematics/congruence/) - 합동식에서의 나눗셈 조건
- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - gcd(e, (p-1)(q-1)) = 1 조건
