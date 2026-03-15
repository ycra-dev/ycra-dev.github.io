---
title: "이산 로그 (Discrete Logarithm)"
description: "이산 로그(Discrete Logarithm)는 소수 p의 원시근(primitive root) r에 대해, r^e mod p = a를 만족하는 지수 e (0 <= e <= p-1)를 말한다"
tags: ['Discrete Logarithm', 'Primitive Root', 'Diffie Hellman', 'Key Exchange', 'Cryptography']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/discrete-logarithm
sidebar:
  order: 10
---

## 핵심 개념

**원시근(Primitive Root)**:
소수 p에 대해 정수 r이 Z_p의 원시근이라 함은, Z_p의 모든 0이 아닌 원소가 r의 거듭제곱으로 표현될 수 있다는 것이다. 즉 r^1, r^2, ..., r^{p-1} (mod p)이 Z_p의 모든 비영 원소를 생성한다.

모든 소수 p에 대해 원시근이 존재한다는 것은 수론의 중요한 결과이다.

**이산 로그의 성질**:
일반 로그와 유사한 성질을 가진다:
- log_r(ab) ≡ log_r(a) + log_r(b) (mod p-1)

**이산 로그 문제의 난이도**:
- 주어진 p, r, a로부터 r^e ≡ a (mod p)인 e를 구하는 것
- 이 문제에 대한 다항 시간 알고리즘은 현재까지 알려지지 않음
- 이 문제의 계산적 어려움이 여러 암호 시스템의 보안 기반

**Diffie-Hellman 키 교환 프로토콜**:
두 당사자(Alice, Bob)가 비밀 키를 안전하게 공유하는 프로토콜:
1. 소수 p와 원시근 a를 공개적으로 합의
2. Alice: 비밀 정수 k1 선택, a^{k1} mod p를 Bob에게 전송
3. Bob: 비밀 정수 k2 선택, a^{k2} mod p를 Alice에게 전송
4. Alice: (a^{k2})^{k1} mod p 계산
5. Bob: (a^{k1})^{k2} mod p 계산
6. 공유 키: (a^{k2})^{k1} = (a^{k1})^{k2} mod p

도청자는 p, a, a^{k1} mod p, a^{k2} mod p를 알지만, k1과 k2를 구하려면 이산 로그 문제를 풀어야 하므로 (현재로서는) 실질적으로 불가능하다. p가 300자리 이상이고 k1, k2가 100자리 이상이면 안전하다고 여겨진다.

**디지털 서명**:
RSA를 이용한 디지털 서명은 발신자 인증을 가능하게 한다. 발신자가 자신의 복호화 함수를 적용하여 서명하면, 수신자가 공개된 암호화 함수를 적용하여 원문을 복원함으로써 발신자를 확인할 수 있다.

## 예시

**원시근 확인 (p = 11)**:
```
2가 11의 원시근인지 확인:
2^1  mod 11 = 2
2^2  mod 11 = 4
2^3  mod 11 = 8
2^4  mod 11 = 5
2^5  mod 11 = 10
2^6  mod 11 = 9
2^7  mod 11 = 7
2^8  mod 11 = 3
2^9  mod 11 = 6
2^10 mod 11 = 1

→ {1,2,3,4,5,6,7,8,9,10} 모두 생성 → 2는 11의 원시근 ✓

3이 11의 원시근인지 확인:
3^1 mod 11 = 3
3^2 mod 11 = 9
3^3 mod 11 = 5
3^4 mod 11 = 4
3^5 mod 11 = 1  → 주기가 5로 반복

→ 모든 비영 원소를 생성하지 못함 → 3은 11의 원시근이 아님 ✗
```

**이산 로그 계산 (base 2, mod 11)**:
```
위의 거듭제곱 표에서:
log_2(3) = 8  (∵ 2^8 ≡ 3 mod 11)
log_2(5) = 4  (∵ 2^4 ≡ 5 mod 11)
log_2(7) = 7  (∵ 2^7 ≡ 7 mod 11)
```

**Diffie-Hellman 키 교환 예시**:
```
p = 23, 원시근 a = 5

Alice: k1 = 8, 전송값 = 5^8 mod 23 = 16
Bob:   k2 = 5, 전송값 = 5^5 mod 23 = 20

Alice의 공유키: 20^8 mod 23 = (5^5)^8 mod 23 = 5^40 mod 23
Bob의 공유키:   16^5 mod 23 = (5^8)^5 mod 23 = 5^40 mod 23
→ 동일한 공유 키!
```

**Python 구현**:
```python
def find_primitive_root(p):
    """소수 p의 원시근을 찾음"""
    for r in range(2, p):
        seen = set()
        power = 1
        for _ in range(1, p):
            power = (power * r) % p
            seen.add(power)
        if len(seen) == p - 1:
            return r
    return None

def discrete_log(a, r, p):
    """r^e ≡ a (mod p)인 e를 무차별 탐색"""
    power = 1
    for e in range(p):
        if power == a:
            return e
        power = (power * r) % p
    return None

print(find_primitive_root(11))       # 2
print(discrete_log(3, 2, 11))       # 8
print(discrete_log(5, 2, 11))       # 4

# Diffie-Hellman 키 교환
p, a = 23, 5
k1, k2 = 8, 5
alice_sends = pow(a, k1, p)  # 16
bob_sends = pow(a, k2, p)    # 20
shared_key_alice = pow(bob_sends, k1, p)
shared_key_bob = pow(alice_sends, k2, p)
print(f"공유 키: {shared_key_alice} = {shared_key_bob}")
```

## 관련 개념

- [RSA Cryptosystem](/knowledge/mathematics/rsa-cryptosystem/) - 공개키 암호의 또 다른 접근
- [Fermat's Little Theorem](/knowledge/mathematics/fermats-little-theorem/) - 원시근과 거듭제곱 주기의 관계
- [Prime Number](/knowledge/mathematics/prime-number/) - 원시근이 존재하는 소수의 성질
- [Modular Exponentiation](/knowledge/mathematics/modular-exponentiation/) - 거듭제곱 계산의 효율적 방법
- [Congruence](/knowledge/mathematics/congruence/) - 이산 로그의 합동 관계
