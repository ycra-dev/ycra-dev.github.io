---
title: "Multiparty Computation"
description: "안전한 다자간 계산(Secure Multiparty Computation, MPC)은 여러 당사자가 각자의 비밀 입력을 공개하지 않으면서 공동으로 함수를 계산할 수 있게 해주는 암호학적 프로토콜 체계이다"
tags: ['Mpc', 'Cryptography', 'Oblivious Transfer', 'Privacy', 'Secure Computation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/multiparty-computation
sidebar:
  order: 18
---

## 핵심 개념

MPC의 핵심 문제: 여러 사람이 각자의 비밀 데이터를 사용하여 통계를 계산해야 하지만, 개별 데이터는 공개하지 않아야 하는 상황. 예: 누가 최고 급여를 받는지 알아내되, 각자의 급여는 비공개.

**핵심 구성 요소: 망각 전송(Oblivious Transfer)**
Alice가 n개의 비밀 메시지 m_1, ..., m_n을 보유하고 있을 때, Bob은 하나만 알 수 있으며 어떤 메시지를 선택했는지 Alice는 알 수 없다.

1-out-of-2 망각 전송 (Diffie-Hellman 기반):
- Alice가 개인키 x로 `g^x` 전송
- Bob이 c=0이면 Q = g^y, c=1이면 Q = g^(x+y) 선택
- c=0: BK = g^xy = AK1, Alice의 m1만 복호화 가능
- c=1: BK = g^xy = AK2, Alice의 m2만 복호화 가능

**MPC 프로토콜** (두 당사자 P1, P2가 F(a,b) 계산):
1. P1이 |X|*|Y| 크기의 테이블 F를 구성하고 고유 키 쌍으로 각 항목 암호화
2. 암호화된 테이블 F*과 키 K_i를 P2에게 전달 (테이블 원소 치환 후)
3. 1-out-of-|Y| 망각 전송으로 P2가 K_j만 획득
4. P2는 F*[i,j] = F(a,b)만 복호화 가능, 다른 항목은 비밀 유지

성능 문제: 오랫동안 실용적 적용이 어려웠으나 최근 10년간 인상적인 성능 개선으로 실용적 도구가 되고 있다. 당사자가 너무 많으면 응용 특화 솔루션이 필요할 수 있다.

## 예시

```python
# 1-out-of-2 망각 전송 개념
# Alice: 두 메시지 m0, m1 보유
# Bob: c번째 메시지를 원함 (c = 0 또는 1)

# Alice
x = random_secret()
alice_sends(g_x := pow(g, x, p))

# Bob (c=0인 경우)
y = random_secret()
Q = pow(g, y, p)  # g^y
bob_sends(Q)

# Alice: 두 키 생성
AK1 = pow(Q, x, p)        # g^xy (c=0이면 Bob과 공유)
AK2 = pow(Q / g_x, x, p)  # g^(xy-x^2) (Bob은 계산 불가)
alice_sends(encrypt(AK1, m0), encrypt(AK2, m1))

# Bob: BK = pow(g_x, y, p) = g^xy = AK1
# m0 = decrypt(BK, encrypted_m0)  # 성공
# m1 = decrypt(BK, encrypted_m1)  # 실패 (BK != AK2)
```

## 관련 개념

- [Diffie-Hellman Key Exchange](/knowledge/distributed-systems/diffie-hellman-key-exchange/)
- [Homomorphic Encryption](/knowledge/distributed-systems/homomorphic-encryption/)
- [Symmetric and Asymmetric Cryptosystem](/knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem/)
- [Sybil Attack](/knowledge/distributed-systems/sybil-attack/)
- [Security Policy and Mechanism](/knowledge/distributed-systems/security-policy-and-mechanism/)
