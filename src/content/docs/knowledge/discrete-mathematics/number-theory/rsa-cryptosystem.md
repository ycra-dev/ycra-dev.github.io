---
title: "RSA Cryptosystem"
description: "RSA 암호 시스템은 1977년 Rivest, Shamir, Adleman이 발표한(1973년 Clifford Cocks가 비밀리에 발견) 공개키 암호 시스템이다"
tags: ['Rsa', 'Public Key Cryptography', 'Encryption', 'Decryption', 'Number Theory', 'Cryptosystem']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/rsa-cryptosystem
sidebar:
  order: 11
---

## 핵심 개념

**공개키 vs 개인키 암호 시스템**:
- **개인키(Private Key)**: 암호화 키를 알면 복호화 키도 쉽게 알 수 있음 (예: 시프트 암호). 양 당사자가 비밀 키를 공유해야 함
- **공개키(Public Key)**: 암호화 키가 공개되어도 복호화 키를 알 수 없음. RSA가 대표적 예

**RSA 키 생성**:
1. 두 큰 소수 p, q를 선택 (각 300자리 이상 권장)
2. n = pq 계산
3. gcd(e, (p-1)(q-1)) = 1인 정수 e 선택 → **공개키**: (n, e)
4. d = e^{-1} mod (p-1)(q-1) 계산 → **개인키**: d

**RSA 암호화**:
1. 평문 M을 숫자로 변환 (A=00, B=01, ..., Z=25)
2. 2N자리 블록으로 분할 (2525...25_{2N자리} < n 인 최대 2N)
3. 각 블록 m에 대해: c = m^e mod n

**RSA 복호화**:
각 암호문 블록 c에 대해: m = c^d mod n

**정당성 증명** (페르마 소정리 + CRT):
```
de ≡ 1 (mod (p-1)(q-1))이므로 de = 1 + k(p-1)(q-1)

c^d ≡ (m^e)^d = m^{de} = m^{1+k(p-1)(q-1)} (mod n)

페르마 소정리에 의해:
  m^{de} ≡ m * (m^{p-1})^{k(q-1)} ≡ m * 1 = m (mod p)
  m^{de} ≡ m * (m^{q-1})^{k(p-1)} ≡ m * 1 = m (mod q)

CRT에 의해: c^d ≡ m (mod pq)
```

**보안 근거**:
- 큰 소수를 찾는 것은 빠르지만 (확률적 소수 판별), 큰 수를 인수분해하는 것은 극도로 어려움
- 600자리 정수의 인수분해에 수십억 년이 소요 (2017년 기준 최선의 알고리즘)
- 단, 양자 컴퓨팅이 실현되면 Shor의 알고리즘으로 인수분해가 가능해져 RSA가 깨질 수 있음

**부분적 준동형 성질**: RSA는 곱셈에 대해 준동형(multiplicatively homomorphic):
E(M1) * E(M2) mod n = E(M1 * M2)
하지만 덧셈에 대해서는 준동형이 아님 (additively non-homomorphic).

## 예시

**RSA 암호화 예시** (n = 43*59 = 2537, e = 13):
```
평문: "STOP"
→ 숫자 변환: S=18, T=19, O=14, P=15
→ 4자리 블록: 1819, 1415  (∵ 2525 < 2537 < 252525)

암호화: c = m^13 mod 2537
  1819^13 mod 2537 = 2081
  1415^13 mod 2537 = 2182

암호문: 2081 2182
```

**RSA 복호화 예시** (d = 937, e의 역원 mod 2436):
```
암호문: 0981 0461

복호화: m = c^937 mod 2537
  0981^937 mod 2537 = 0704
  0461^937 mod 2537 = 1115

→ 0704 1115 → H(07) E(04) L(11) P(15) → "HELP"
```

**디지털 서명**:
```
Alice의 공개키: (2537, 13), 개인키: d = 937

서명: 평문 블록 m에 대해 D(m) = m^937 mod 2537 계산하여 전송
검증: 수신자가 E(D(m)) = (m^937)^13 mod 2537 = m 계산
     → 원문 복원 성공 = Alice가 보낸 것이 확인됨
```

**Python 구현**:
```python
def rsa_keygen(p, q, e):
    n = p * q
    phi = (p - 1) * (q - 1)
    d = pow(e, -1, phi)  # Python 3.8+
    return (n, e), d  # 공개키, 개인키

def rsa_encrypt(m, n, e):
    return pow(m, e, n)

def rsa_decrypt(c, n, d):
    return pow(c, d, n)

# 예시
pub_key, priv_key = rsa_keygen(43, 59, 13)
print(f"공개키: {pub_key}, 개인키: {priv_key}")
# 공개키: (2537, 13), 개인키: 937

c = rsa_encrypt(1819, 2537, 13)
print(f"암호화: {c}")  # 2081

m = rsa_decrypt(c, 2537, 937)
print(f"복호화: {m}")  # 1819
```

## 관련 개념

- [Modular Exponentiation](/knowledge/mathematics/modular-exponentiation/) - RSA 암호화/복호화의 핵심 연산
- [Fermat's Little Theorem](/knowledge/mathematics/fermats-little-theorem/) - RSA 정당성 증명의 수학적 근거
- [Prime Number](/knowledge/mathematics/prime-number/) - 큰 소수 생성이 RSA 키 생성의 기반
- [Euclidean Algorithm](/knowledge/mathematics/euclidean-algorithm/) - 역원 d 계산에 확장 유클리드 알고리즘 사용
- [Chinese Remainder Theorem](/knowledge/mathematics/chinese-remainder-theorem/) - RSA 복호화 정당성 증명에 활용
- [Discrete Logarithm](/knowledge/mathematics/discrete-logarithm/) - Diffie-Hellman 키 교환 프로토콜의 기반
