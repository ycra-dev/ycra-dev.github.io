---
title: "Euclidean Algorithm"
description: "유클리드 알고리즘(Euclidean Algorithm)은 두 양의 정수의 최대공약수(GCD)를 효율적으로 계산하는 알고리즘이다"
tags: ['Euclidean Algorithm', 'Gcd', 'Number Theory', 'Algorithm', 'Bezout Coefficients']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/euclidean-algorithm
sidebar:
  order: 7
---

## 핵심 개념

유클리드 알고리즘은 고대 그리스 수학자 유클리드의 저서 "원론(The Elements)"에 기술된 알고리즘으로, 수천 년 전부터 알려져 있었다. 소인수분해를 이용한 GCD 계산보다 훨씬 효율적이다.

**핵심 보조정리(Lemma 1)**:
a = bq + r이면, gcd(a, b) = gcd(b, r)이다.

증명: a와 b의 공약수 집합과 b와 r의 공약수 집합이 동일함을 보인다.
- d | a이고 d | b이면 → d | (a - bq) = r → d는 b, r의 공약수
- d | b이고 d | r이면 → d | (bq + r) = a → d는 a, b의 공약수

**알고리즘 절차**:
r0 = a, r1 = b로 놓고 반복적으로 나눗셈을 수행:
```
r0 = r1*q1 + r2     (0 <= r2 < r1)
r1 = r2*q2 + r3     (0 <= r3 < r2)
...
r_{n-2} = r_{n-1}*q_{n-1} + r_n  (0 <= r_n < r_{n-1})
r_{n-1} = r_n * q_n              (나머지 = 0)
```
이때 gcd(a, b) = r_n (마지막 0이 아닌 나머지)

**시간 복잡도**: gcd(a, b)를 구하는 데 필요한 나눗셈 횟수는 O(log b)이다 (a >= b).

**확장 유클리드 알고리즘(Extended Euclidean Algorithm)**:
GCD뿐만 아니라 베주 계수 s, t (gcd(a,b) = sa + tb)도 함께 구하는 알고리즘이다.
- s0 = 1, s1 = 0, t0 = 0, t1 = 1로 초기화
- s_j = s_{j-2} - q_{j-1} * s_{j-1}
- t_j = t_{j-2} - q_{j-1} * t_{j-1}

이 알고리즘은 한 번의 순방향 패스만으로 베주 계수를 구할 수 있어, 역방향으로 역추적하는 방법보다 효율적이다.

## 예시

**유클리드 알고리즘으로 gcd(414, 662) 계산**:
```
662 = 414 * 1 + 248    → gcd(662, 414) = gcd(414, 248)
414 = 248 * 1 + 166    → gcd(414, 248) = gcd(248, 166)
248 = 166 * 1 + 82     → gcd(248, 166) = gcd(166, 82)
166 = 82  * 2 + 2      → gcd(166, 82)  = gcd(82, 2)
82  = 2   * 41 + 0     → gcd(82, 2)    = 2

∴ gcd(414, 662) = 2
```

**확장 유클리드로 gcd(252, 198) = 18의 선형결합 표현**:
```
252 = 198 * 1 + 54     (q1 = 1)
198 = 54  * 3 + 36     (q2 = 3)
54  = 36  * 1 + 18     (q3 = 1)
36  = 18  * 2 + 0      (q4 = 2)

역추적:
18 = 54 - 1*36
   = 54 - 1*(198 - 3*54) = 4*54 - 1*198
   = 4*(252 - 1*198) - 1*198 = 4*252 - 5*198

∴ gcd(252, 198) = 4*252 + (-5)*198
```

**Python 구현**:
```python
def gcd_euclidean(a, b):
    """유클리드 알고리즘"""
    while b != 0:
        a, b = b, a % b
    return a

def extended_gcd(a, b):
    """확장 유클리드 알고리즘: gcd, s, t 반환 (sa + tb = gcd)"""
    if b == 0:
        return a, 1, 0
    g, s, t = extended_gcd(b, a % b)
    return g, t, s - (a // b) * t

g, s, t = extended_gcd(252, 198)
print(f"gcd = {g}, s = {s}, t = {t}")  # gcd = 18, s = 4, t = -5
print(f"검증: {s}*252 + {t}*198 = {s*252 + t*198}")  # 18
```

## 관련 개념

- [Greatest Common Divisor](/knowledge/mathematics/greatest-common-divisor/) - 유클리드 알고리즘이 계산하는 대상
- [Algorithm](/knowledge/mathematics/algorithm/) - 알고리즘의 고전적 예시
- [Complexity](/knowledge/mathematics/complexity/) - O(log b) 나눗셈 횟수
- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - 역원 계산에 확장 유클리드 알고리즘 사용
- [Greedy Algorithm](/knowledge/mathematics/greedy-algorithm/) - 반복적 나머지 축소의 그리디 성격
