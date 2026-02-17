---
title: "Session Key"
description: "세션 키(Session Key)는 단일 통신 세션 동안에만 사용되는 임시 공유 비밀키로, 세션이 종료되면 폐기되어 재사용되지 않는다"
tags: ['Cryptography', 'Session Key', 'Secure Channel', 'Key Management', 'Forward Secrecy']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/session-key
sidebar:
  order: 9
---

## 핵심 개념

세션 키를 사용하는 이유는 여러 가지이다:

1. **키의 마모(wear and tear)**: 하나의 키로 많은 데이터를 암호화/복호화할수록 공격자가 키의 특성을 발견하기 쉬워진다. 인증 키를 최소한으로 사용하고, 실제 데이터 전송에는 세션 키를 사용하는 것이 안전하다.

2. **재생 공격 방지**: 매 세션마다 고유한 키를 사용하므로 전체 세션 재생이 불가능하다. 개별 메시지 재생 방지를 위해서는 추가로 타임스탬프나 시퀀스 번호가 필요하다.

3. **전방 비밀성(Forward Secrecy)**: 세션 키가 유출되어도 해당 세션만 영향을 받는다. 장기 키가 유출되어도 과거 세션의 데이터는 보호된다 (이미 폐기된 세션 키로 암호화되었으므로).

4. **신뢰 수준 차별화**: Alice가 Bob을 완전히 신뢰하지 않는 경우, 고가의 장기 키 대신 저렴한 세션 키를 사용하여 통신 가능.

세션 키 수립 방법:
- **대칭 방식**: `Alice: send m = K_{A,B}(sk)` (기존 공유키로 세션키 전달)
- **비대칭 방식**: `Alice: send m = PK_B(sk)` (Bob의 공개키로 세션키 암호화)
- **Diffie-Hellman**: 사전 키 없이 새로운 공유 비밀 수립

## 예시

```python
# 인증 후 세션 키를 이용한 보안 채널 운영
# 1단계: 인증 (장기 키 사용)
authenticate(alice, bob, long_term_key)

# 2단계: 세션 키 수립
session_key = generate_session_key()
encrypted_sk = encrypt(bob_public_key, session_key)
send(encrypted_sk)

# 3단계: 세션 중 데이터 교환 (세션 키 사용)
for message in messages:
    ciphertext = encrypt(session_key, message)
    send(ciphertext)

# 4단계: 세션 종료 시 키 폐기
del session_key  # 세션 키 파기 -> 전방 비밀성 보장
```

## 관련 개념

- [Diffie-Hellman Key Exchange](/knowledge/distributed-systems/diffie-hellman-key-exchange/)
- [Authentication Protocol](/knowledge/distributed-systems/authentication-protocol/)
- [Transport Layer Security](/knowledge/distributed-systems/transport-layer-security/)
- [Kerberos Authentication Service](/knowledge/distributed-systems/kerberos-authentication-service/)
- [Symmetric and Asymmetric Cryptosystem](/knowledge/distributed-systems/symmetric-and-asymmetric-cryptosystem/)
