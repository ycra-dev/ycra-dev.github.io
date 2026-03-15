---
title: "페르마 소정리 (Fermat's Little Theorem)"
description: "페르마의 소정리(Fermat's Little Theorem)는 p가 소수이고 a가 p로 나누어지지 않는 정수일 때, a^{p-1} ≡ 1 (mod p)가 성립한다는 정리이다"
tags: ['Fermats Little Theorem', 'Prime', 'Congruence', 'Number Theory', 'Pseudoprime', 'Carmichael Number']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/fermats-little-theorem
sidebar:
  order: 8
---

## 핵심 개념

Pierre de Fermat가 17세기에 발견하고 Euler가 최초로 증명을 발표한 이 정리는 수론과 암호학에서 가장 핵심적인 도구 중 하나이다.

**정리의 의미**:
- Z_p에서 0이 아닌 원소 a에 대해 a^{p-1} = 1 (Z_p에서의 등식)
- 큰 거듭제곱의 나머지를 효율적으로 계산하는 강력한 도구

**활용 방법**: a^n mod p를 계산할 때:
1. n을 p-1로 나누어 n = q(p-1) + r 형태로 표현
2. a^n = (a^{p-1})^q * a^r ≡ 1^q * a^r ≡ a^r (mod p)
3. 따라서 a^n mod p = a^r mod p만 계산하면 됨

**의사소수(Pseudoprime)**:
합성수 n이 b^{n-1} ≡ 1 (mod n)을 만족하면, n을 밑 b에 대한 의사소수라 한다.
- 예: 341 = 11 * 31은 밑 2에 대한 의사소수 (2^340 ≡ 1 (mod 341))
- 10^10 이하의 정수 중 소수는 약 4.5억 개이지만, 밑 2에 대한 의사소수는 14,884개에 불과

**카마이클 수(Carmichael Number)**:
gcd(b, n) = 1인 모든 양의 정수 b에 대해 b^{n-1} ≡ 1 (mod n)을 만족하는 합성수.
- 561 = 3 * 11 * 17이 최소의 카마이클 수
- 카마이클 수는 무한히 많이 존재
- 페르마 소정리 기반의 소수 판별법으로는 카마이클 수를 걸러낼 수 없음

**소수 판별 응용**: 2^{n-1} ≡ 1 (mod n)을 만족하지 않으면 n은 확실히 합성수. 만족하면 소수이거나 의사소수. 여러 밑에 대해 테스트하면 신뢰도가 높아지지만, 카마이클 수 때문에 확정적이지 않다. Miller-Rabin 등의 더 정교한 확률적 소수 판별법이 사용된다.

## 예시

**페르마 소정리를 이용한 계산**:
```
7^222 mod 11 = ?

11은 소수, gcd(7, 11) = 1이므로 7^10 ≡ 1 (mod 11)

222 = 22 * 10 + 2
7^222 = (7^10)^22 * 7^2 ≡ 1^22 * 49 ≡ 49 mod 11 = 5

∴ 7^222 mod 11 = 5
```

**역원 계산에의 활용**: p가 소수이고 p ∤ a이면:
```
a^{p-2}는 법 p에 대한 a의 역원
∵ a * a^{p-2} = a^{p-1} ≡ 1 (mod p)
```

**카마이클 수 561의 확인**:
```
561 = 3 * 11 * 17

gcd(b, 561) = 1인 b에 대해:
  b^2 ≡ 1 (mod 3)     [페르마 소정리, p=3]
  b^10 ≡ 1 (mod 11)   [페르마 소정리, p=11]
  b^16 ≡ 1 (mod 17)   [페르마 소정리, p=17]

  b^560 = (b^2)^280 ≡ 1 (mod 3)
  b^560 = (b^10)^56 ≡ 1 (mod 11)
  b^560 = (b^16)^35 ≡ 1 (mod 17)

→ CRT에 의해 b^560 ≡ 1 (mod 561)
→ 561은 카마이클 수
```

**Python으로 의사소수 확인**:
```python
def is_pseudoprime(n, b=2):
    """밑 b에 대한 의사소수 판별"""
    if pow(b, n-1, n) != 1:
        return False
    # 합성수인지 확인
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return True  # 합성수이면서 페르마 테스트 통과 → 의사소수
    return False  # 실제 소수

print(is_pseudoprime(341))  # True (밑 2에 대한 의사소수)
print(is_pseudoprime(561))  # True (카마이클 수)
```

## 관련 개념

- [Prime Number](/knowledge/mathematics/prime-number/) - 소수에 대한 핵심 성질
- [Congruence](/knowledge/mathematics/congruence/) - 합동 관계에서의 거듭제곱 성질
- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - RSA 복호화의 수학적 근거
- [Modular Exponentiation](/knowledge/mathematics/modular-exponentiation/) - 효율적 거듭제곱 계산
- [Chinese Remainder Theorem](/knowledge/mathematics/chinese-remainder-theorem/) - 카마이클 수 증명에 활용
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 소수 무한성 증명
