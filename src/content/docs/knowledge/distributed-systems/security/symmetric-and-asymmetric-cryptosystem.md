---
title: "Symmetric and Asymmetric Cryptosystem"
description: "대칭 암호 시스템(Symmetric Cryptosystem)은 암호화와 복호화에 동일한 키를 사용하는 시스템이며, 비대칭 암호 시스템(Asymmetric Cryptosystem)은 암호화와 복호화에 서로 다른 키 쌍(공개키/개인키)을 사용하는 시스템이다"
tags: ['Cryptography', 'Encryption', 'Public Key', 'Secret Key', 'Security']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem
sidebar:
  order: 3
---

## 핵심 개념

**대칭 암호 시스템**: 비밀키(secret-key) 또는 공유키(shared-key) 시스템이라고도 한다. 송신자와 수신자가 동일한 키를 공유하며, 이 키는 반드시 비밀로 유지되어야 한다. 표기법: `K_{A,B}`는 A와 B가 공유하는 키.

```
P = D_K(E_K(P)) 이면 D_K = E_K
```

**비대칭 암호 시스템**: 공개키(public-key) 시스템이라 불린다. 키 쌍이 존재하며 하나는 공개, 하나는 비밀로 유지된다. 표기법: `PK_A`는 A의 공개키, `SK_A`는 A의 개인키.

```
P = D_K(E_K(P)) 이면 D_K != E_K
```

용도에 따른 키 선택:
- **기밀성**: Alice가 Bob에게 비밀 메시지를 보낼 때 Bob의 공개키로 암호화: `C = PK_B(m)`
- **인증(서명)**: Alice가 메시지의 출처를 증명할 때 자신의 개인키로 암호화: `C = SK_A(m)`

**동형 암호(Homomorphic Encryption)**: 암호문 상태에서 수학적 연산이 가능한 비대칭 암호 기법. `E_K(x) * E_K(y) = E_K(x * y)`. 완전 동형 암호(FHE)는 성능이 느리지만, 부분 동형 암호(PHE)는 효율적인 구현이 존재한다.

## 예시

```python
# 대칭 암호: Alice와 Bob이 공유키 사용
shared_key = "K_AB"
ciphertext = encrypt(shared_key, plaintext)   # Alice 암호화
plaintext = decrypt(shared_key, ciphertext)   # Bob 복호화

# 비대칭 암호: 기밀성
ciphertext = encrypt(bob_public_key, message)  # Alice가 Bob의 공개키로 암호화
plaintext = decrypt(bob_private_key, ciphertext)  # Bob만 복호화 가능

# 비대칭 암호: 인증 (디지털 서명)
signature = encrypt(alice_private_key, message)  # Alice가 개인키로 서명
verified = decrypt(alice_public_key, signature)  # 누구나 Alice의 공개키로 검증
```

## 관련 개념

- [Diffie-Hellman Key Exchange](/knowledge/distributed-systems/diffie-hellman-key-exchange/)
- [Digital Signature and Hash Function](/knowledge/distributed-systems/digital-signature-and-hash-function/)
- [Public Key Certificate](/knowledge/distributed-systems/public-key-certificate/)
- [Session Key](/knowledge/distributed-systems/session-key/)
- [Homomorphic Encryption](/knowledge/distributed-systems/homomorphic-encryption/)
