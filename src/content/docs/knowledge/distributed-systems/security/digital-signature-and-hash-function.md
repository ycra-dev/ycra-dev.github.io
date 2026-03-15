---
title: "디지털 서명과 해시 함수 (Digital Signature and Hash Function)"
description: "디지털 서명(Digital Signature)은 메시지의 내용에 고유하게 연결된 암호화된 서명으로, 메시지 무결성과 부인 방지를 보장한다"
tags: ['Cryptography', 'Digital Signature', 'Hash Function', 'Message Digest', 'Integrity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/digital-signature-and-hash-function
sidebar:
  order: 4
---

## 핵심 개념

**해시 함수의 핵심 성질**:
1. **단방향성(one-way)**: 출력 h로부터 입력 m을 역산하는 것이 계산적으로 불가능
2. **약한 충돌 저항성(weak collision resistance)**: 주어진 입력 m에 대해 H(m) = H(m')인 다른 입력 m'을 찾는 것이 불가능
3. **강한 충돌 저항성(strong collision resistance)**: H(m) = H(m')인 임의의 두 입력 m, m'을 찾는 것이 불가능

대표 응용: 비밀번호 저장 시 `H(pw)`만 저장하여 원문 노출 방지

**디지털 서명 방식**:
1. **전체 메시지 서명**: Alice가 개인키로 메시지 전체를 암호화
   - `Alice: send C = PK_B([m, sig]) with sig = SK_A(m)`
   - Bob 검증: `[m, sig] = SK_B(C)` 후 `m = PK_A(sig)` 확인

2. **메시지 다이제스트 사용** (더 효율적):
   - `Alice: send [m, sig] with sig = SK_A(H(m))`
   - Bob 검증: `h' = H(m)` 계산 후 `h' = PK_A(sig)` 확인
   - 메시지 자체는 평문으로 전송하고, 해시만 서명

메시지 다이제스트 방식이 더 효율적인 이유는 고정 길이의 짧은 해시만 암호화하면 되기 때문이다.

## 예시

```python
# 메시지 다이제스트를 이용한 디지털 서명
import hashlib

# Alice가 서명
message = b"I will buy the record for $500"
digest = hashlib.sha256(message).hexdigest()         # H(m)
signature = encrypt_with_private_key(alice_sk, digest)  # SK_A(H(m))
send_to_bob(message, signature)  # [m, sig]

# Bob이 검증
received_msg, received_sig = receive()
computed_digest = hashlib.sha256(received_msg).hexdigest()  # H(m)
decrypted_digest = decrypt_with_public_key(alice_pk, received_sig)  # PK_A(sig)
assert computed_digest == decrypted_digest  # 서명 검증 성공
```

## 관련 개념

- [대칭 및 비대칭 암호 시스템 (Symmetric and Asymmetric Cryptosystem)](/knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem/)
- [공개키 인증서 (Public Key Certificate)](/knowledge/distributed-systems/public-key-certificate/)
- [블록체인 (Blockchain)](/knowledge/distributed-systems/blockchain/)
- [인증 프로토콜 (Authentication Protocol)](/knowledge/distributed-systems/authentication-protocol/)
