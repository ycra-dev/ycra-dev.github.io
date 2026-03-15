---
title: "모듈러 거듭제곱 (Modular Exponentiation)"
description: "모듈러 거듭제곱(Modular Exponentiation)은 b^n mod m을 효율적으로 계산하는 알고리즘이다"
tags: ['Modular Exponentiation', 'Fast Exponentiation', 'Binary Expansion', 'Cryptography', 'Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/modular-exponentiation
sidebar:
  order: 4
---

## 핵심 개념

암호학에서 b, n, m이 매우 큰 정수(수백 자리)일 때 b^n mod m을 계산해야 하는 경우가 빈번하다. b^n을 직접 계산하면 천문학적인 크기의 수가 되어 메모리와 시간이 부족하다.

**기본 아이디어**:
지수 n의 이진 전개 n = (a_{k-1} ... a_1 a_0)_2를 이용하여:

b^n = b^(a_{k-1}*2^{k-1} + ... + a_1*2 + a_0)
    = b^(a_{k-1}*2^{k-1}) * ... * b^(a_1*2) * b^(a_0)

이를 계산하기 위해:
1. b mod m, b^2 mod m, b^4 mod m, ..., b^{2^{k-1}} mod m을 반복 제곱으로 순차 계산
2. 이진 전개에서 a_j = 1인 항목들의 b^{2^j} mod m만 곱함
3. 매 곱셈 후 mod m 연산을 수행하여 중간값을 작게 유지

**알고리즘 (Algorithm 5 - Fast Modular Exponentiation)**:
```
procedure modular_exponentiation(b, n = (a_{k-1}...a_1 a_0)_2, m):
    x := 1
    power := b mod m
    for i := 0 to k-1:
        if a_i = 1 then x := (x * power) mod m
        power := (power * power) mod m
    return x
```

**복잡도**: O((log m)^2 * log n) 비트 연산. 이는 n-1번의 곱셈이 필요한 순차적 방법 대비 극적으로 효율적이다.

**핵심 원리**: 각 단계에서 mod m 연산을 수행하므로 중간값이 m^2을 넘지 않아 메모리 사용이 제한된다. 이것이 핵심적인 효율성의 원천이다.

## 예시

**3^11 계산 (기본 아이디어 설명)**:
```
11 = (1011)_2이므로:
3^11 = 3^8 * 3^2 * 3^1

반복 제곱으로 계산:
3^1 = 3
3^2 = 9
3^4 = 81
3^8 = 6561

3^11 = 6561 * 9 * 3 = 177,147
```

**3^644 mod 645 (Algorithm 5 실행)**:
```
644 = (1010000100)_2

i=0: a_0=0, x=1,   power = 3^2 mod 645 = 9
i=1: a_1=0, x=1,   power = 81
i=2: a_2=1, x=81,  power = 111    (81^2 mod 645)
i=3: a_3=0, x=81,  power = 66
i=4: a_4=0, x=81,  power = 486
i=5: a_5=0, x=81,  power = 126
i=6: a_6=0, x=81,  power = 396
i=7: a_7=1, x=471, power = 81     (81*396 mod 645 = 471)
i=8: a_8=0, x=471, power = 111
i=9: a_9=1, x=36   (471*111 mod 645 = 36)

∴ 3^644 mod 645 = 36
```

**Python 구현**:
```python
def mod_exp(b, n, m):
    """빠른 모듈러 거듭제곱"""
    result = 1
    power = b % m
    while n > 0:
        if n % 2 == 1:  # 현재 비트가 1이면
            result = (result * power) % m
        power = (power * power) % m
        n //= 2
    return result

# Python 내장 함수도 있음
print(pow(3, 644, 645))      # 36
print(mod_exp(3, 644, 645))  # 36

# RSA에서 사용되는 규모의 계산
print(pow(1819, 13, 2537))   # RSA 암호화 예시
```

## 관련 개념

- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - RSA 암호화/복호화의 핵심 연산
- [Integer Representation](/knowledge/mathematics/integer-representation/) - 이진 전개를 활용한 효율적 계산
- [Modular Arithmetic](/knowledge/mathematics/modular-arithmetic/) - mod 연산의 성질 활용
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 효율적 알고리즘 설계의 전형적 예
- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/big-o-notation/) - O((log m)^2 * log n) 비트 연산 복잡도
