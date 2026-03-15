---
title: "디피-헬먼 키 교환 (Diffie-Hellman Key Exchange)"
description: "Diffie-Hellman 키 교환은 두 당사자가 안전하지 않은 채널을 통해 공유 비밀키를 수립할 수 있게 해주는 프로토콜로, 양측 모두 자신의 비밀 값을 상대방에게 공개하지 않으면서 동일한 키를 계산할 수 있다"
tags: ['Cryptography', 'Key Exchange', 'Session Key', 'Ephemeral', 'Security Protocol']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/diffie-hellman-key-exchange
sidebar:
  order: 5
---

## 핵심 개념

프로토콜의 동작 원리:

1. Alice와 Bob은 두 큰 수 p와 g에 합의 (공개 가능)
2. Alice는 비밀 랜덤 수 x를 선택, Bob은 비밀 랜덤 수 y를 선택
3. Alice가 `g^x mod p`를 Bob에게 전송 (평문 가능 - x를 역산하는 것은 사실상 불가능)
4. Bob이 `g^y mod p`를 Alice에게 전송
5. Bob 계산: `(g^x mod p)^y = g^xy mod p`
6. Alice 계산: `(g^y mod p)^x = g^xy mod p`
7. 공유 비밀키: `g^xy mod p` (양측만 알게 됨)

핵심은 이산 로그 문제의 계산적 어려움에 기반한다는 것이다. `g^x mod p`가 주어져도 x를 구하는 것은 사실상 불가능하다.

**임시 Diffie-Hellman(Ephemeral DH)**: 매 통신 세션마다 x와 y를 새로 선택하여 전방 비밀성(forward secrecy)을 보장한다. TLS 1.3에서 핵심적으로 사용된다.

실제로는 Diffie-Hellman 그룹(DH group)을 먼저 협상하여 p, g 및 사용할 암호화 알고리즘을 결정한다. 타원 곡선(elliptic curve) 기반의 대안도 존재한다.

## 예시

```python
# Diffie-Hellman 키 교환 시뮬레이션
p = large_prime  # 공개
g = generator    # 공개

# Alice의 비밀
x = random_large_number()
alice_public = pow(g, x, p)  # g^x mod p

# Bob의 비밀
y = random_large_number()
bob_public = pow(g, y, p)    # g^y mod p

# 교환 후 공유 비밀키 계산
alice_shared = pow(bob_public, x, p)   # (g^y)^x mod p = g^xy mod p
bob_shared = pow(alice_public, y, p)   # (g^x)^y mod p = g^xy mod p

assert alice_shared == bob_shared  # 동일한 공유 비밀키
```

## 관련 개념

- [세션 키 (Session Key)](/knowledge/distributed-systems/session-key/)
- [전송 계층 보안 (Transport Layer Security)](/knowledge/distributed-systems/transport-layer-security/)
- [대칭 및 비대칭 암호 시스템 (Symmetric and Asymmetric Cryptosystem)](/knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem/)
- [다자간 연산 (Multiparty Computation)](/knowledge/distributed-systems/multiparty-computation/)
- [공개키 인증서 (Public Key Certificate)](/knowledge/distributed-systems/public-key-certificate/)
