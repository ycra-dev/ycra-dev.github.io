---
title: "소수 (Prime Number)"
description: "소수(Prime Number)는 1보다 큰 정수 중 양의 인수(factor)가 1과 자기 자신뿐인 수이다"
tags: ['Prime Number', 'Fundamental Theorem Of Arithmetic', 'Factorization', 'Number Theory', 'Sieve Of Eratosthenes']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/prime-number
sidebar:
  order: 5
---

## 핵심 개념

소수는 양의 정수의 "구성 요소(building block)"이다. 이를 수학적으로 정확히 표현한 것이 **산술의 기본 정리(Fundamental Theorem of Arithmetic)**이다:

> 1보다 큰 모든 정수는 소수이거나, 크기가 비감소하는 순서로 배열된 소수들의 곱으로 유일하게 표현된다.

예: 100 = 2^2 * 5^2, 999 = 3^3 * 37, 1024 = 2^10

**소수의 무한성** (Euclid의 증명):
소수가 유한하다고 가정하면 p1, p2, ..., pn이 모든 소수일 때, Q = p1*p2*...*pn + 1은 어떤 pi로도 나누어지지 않는다 (나머지가 항상 1). 따라서 Q 자체가 소수이거나, 목록에 없는 소수 인수를 가진다. 이는 모순이므로 소수는 무한히 많다.

**시행 나눗셈(Trial Division)**: n이 합성수이면 sqrt(n) 이하의 소수 인수를 반드시 가진다 (Theorem 2). 따라서 n이 소수인지 판별하려면 sqrt(n) 이하의 모든 소수로 나누어 보면 된다.

**에라토스테네스의 체(Sieve of Eratosthenes)**: n 이하의 모든 소수를 찾는 고전 알고리즘. 2부터 시작하여 각 소수의 배수를 제거해 나간다.

**소수 정리(Prime Number Theorem)**: x까지의 소수 개수 pi(x)는 x/ln(x)에 근사한다. 즉, 정수 n이 소수일 확률은 대략 1/ln(n)이다.

**메르센 소수**: 2^p - 1 형태의 소수 (p도 소수). 현재까지 알려진 가장 큰 소수는 대부분 메르센 소수이다.

소수는 현대 암호학에서 필수적이다. RSA 암호 시스템에서 큰 소수를 찾는 것은 쉽지만, 두 큰 소수의 곱을 인수분해하는 것은 극도로 어렵다는 비대칭성이 보안의 핵심이다.

## 예시

**시행 나눗셈으로 소수 판별**:
```
101이 소수인지 확인:
√101 ≈ 10.05
10 이하의 소수: 2, 3, 5, 7
101 ÷ 2 = 50.5 (정수 아님)
101 ÷ 3 = 33.67 (정수 아님)
101 ÷ 5 = 20.2 (정수 아님)
101 ÷ 7 = 14.43 (정수 아님)
→ 101은 소수
```

**소인수분해 예시**:
```
7007의 소인수분해:
7007 ÷ 7 = 1001
1001 ÷ 7 = 143
143 ÷ 11 = 13 (13은 소수)
→ 7007 = 7^2 * 11 * 13
```

**Python으로 에라토스테네스의 체 구현**:
```python
def sieve_of_eratosthenes(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(2, n + 1) if is_prime[i]]

print(sieve_of_eratosthenes(100))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
```

## 관련 개념

- [Greatest Common Divisor](/knowledge/mathematics/greatest-common-divisor/) - 소인수분해를 이용한 GCD 계산
- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - 큰 소수를 활용한 공개키 암호
- [Fermat's Little Theorem](/knowledge/mathematics/fermats-little-theorem/) - 소수 모듈러 연산의 핵심 정리
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 소수 무한성의 증명 방법
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 소수 판별 및 체 알고리즘
- [시간 복잡도 (Time Complexity)](/knowledge/algorithms/time-complexity/) - 소수 판별의 다항 시간 알고리즘 (AKS)
