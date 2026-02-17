---
title: "Chinese Remainder Theorem"
description: "중국인의 나머지 정리(Chinese Remainder Theorem, CRT)는 모듈러스 m1, m2, "
tags: ['Chinese Remainder Theorem', 'Congruence', 'Number Theory', 'System Of Congruences', 'Modular Arithmetic']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/chinese-remainder-theorem
sidebar:
  order: 9
---

## 핵심 개념

**정리 (Theorem 2)**:
m1, m2, ..., mn이 쌍별 서로소인 양의 정수(각각 > 1)이고 a1, a2, ..., an이 임의의 정수일 때, 연립 합동식:
```
x ≡ a1 (mod m1)
x ≡ a2 (mod m2)
...
x ≡ an (mod mn)
```
은 m = m1*m2*...*mn을 법으로 유일한 해를 가진다.

**구성적 증명 (해의 구체적 구성)**:
1. M_k = m / m_k (k번째를 제외한 나머지 모듈러스의 곱)
2. gcd(m_k, M_k) = 1이므로, M_k의 법 m_k에 대한 역원 y_k가 존재 (M_k * y_k ≡ 1 (mod m_k))
3. 해: x = a1*M1*y1 + a2*M2*y2 + ... + an*Mn*yn

이것이 동시 해가 되는 이유: j != k일 때 M_j ≡ 0 (mod m_k)이므로, x ≡ a_k*M_k*y_k ≡ a_k (mod m_k)

**역대입법(Back Substitution)**:
CRT의 구성적 방법 대신, 합동식을 하나씩 순차적으로 대입하여 풀 수도 있다. 때로는 이 방법이 더 간단하다.

**응용: 큰 정수의 산술**:
- 쌍별 서로소인 모듈러스 m1, ..., mn을 선택
- 정수 a를 n-튜플 (a mod m1, ..., a mod mn)으로 표현
- 각 성분별로 독립적으로 산술 연산 수행 (병렬 가능)
- CRT로 원래 정수를 복원
- 2^k - 1 형태의 모듈러스가 이진 산술에 특히 유리

## 예시

**고전 문제 (Sun-Tsu, 1세기)**:
```
어떤 수를 3으로 나누면 나머지 2, 5로 나누면 나머지 3, 7로 나누면 나머지 2.

x ≡ 2 (mod 3)
x ≡ 3 (mod 5)
x ≡ 2 (mod 7)

m = 3 * 5 * 7 = 105
M1 = 35, M2 = 21, M3 = 15

역원: 35*y1 ≡ 1 (mod 3) → y1 = 2 (∵ 35*2 = 70 ≡ 1 mod 3)
      21*y2 ≡ 1 (mod 5) → y2 = 1 (∵ 21 ≡ 1 mod 5)
      15*y3 ≡ 1 (mod 7) → y3 = 1 (∵ 15 ≡ 1 mod 7)

x = 2*35*2 + 3*21*1 + 2*15*1 = 140 + 63 + 30 = 233
x ≡ 233 ≡ 23 (mod 105)

검증: 23 mod 3 = 2 ✓, 23 mod 5 = 3 ✓, 23 mod 7 = 2 ✓
```

**역대입법 예시**:
```
x ≡ 1 (mod 5), x ≡ 2 (mod 6), x ≡ 3 (mod 7)

1단계: x = 5t + 1 (첫 번째 합동식으로부터)
2단계: 5t + 1 ≡ 2 (mod 6) → 5t ≡ 1 (mod 6) → t ≡ 5 (mod 6)
       → t = 6u + 5 → x = 5(6u + 5) + 1 = 30u + 26
3단계: 30u + 26 ≡ 3 (mod 7) → 2u + 5 ≡ 3 (mod 7) → 2u ≡ -2 (mod 7)
       → u ≡ 6 (mod 7) → u = 7v + 6
       → x = 30(7v + 6) + 26 = 210v + 206

∴ x ≡ 206 (mod 210)
```

**Python 구현**:
```python
def chinese_remainder(moduli, remainders):
    """중국인의 나머지 정리"""
    M = 1
    for m in moduli:
        M *= m

    x = 0
    for m_k, a_k in zip(moduli, remainders):
        M_k = M // m_k
        # M_k의 법 m_k에 대한 역원
        y_k = pow(M_k, -1, m_k)
        x += a_k * M_k * y_k

    return x % M

print(chinese_remainder([3, 5, 7], [2, 3, 2]))  # 23
```

## 관련 개념

- [Congruence](/knowledge/mathematics/congruence/) - 연립 합동식 체계
- [Greatest Common Divisor](/knowledge/mathematics/greatest-common-divisor/) - 쌍별 서로소 조건
- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - RSA 복호화에서 CRT 활용
- [Fermat's Little Theorem](/knowledge/mathematics/fermats-little-theorem/) - CRT와 결합한 계산
- [Modular Arithmetic](/knowledge/mathematics/modular-arithmetic/) - 모듈러 산술 기반의 큰 정수 연산
