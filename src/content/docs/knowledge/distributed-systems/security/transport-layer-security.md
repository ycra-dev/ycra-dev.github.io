---
title: "Transport Layer Security"
description: "전송 계층 보안(TLS, Transport Layer Security)은 TCP 연결 위에서 보안 채널을 설정하기 위한 프로토콜 스위트로, SSL(Secure Socket Layer)에서 발전하여 HTTPS의 기반이 되는 가장 널리 사용되는 보안 통신 프로토콜이다"
tags: ['Tls', 'HTTPS', 'Secure Channel', 'Cipher Suite', 'Key Derivation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/transport-layer-security
sidebar:
  order: 11
---

## 핵심 개념

TLS 1.3의 핵심 동작 과정 (임시 Diffie-Hellman 기반):

**1단계: 키 교환**
- 클라이언트가 개인키 x 선택, 공개키 `PK^DH_C = g^x mod p` 계산
- Client-Hello 전송: `[PK^DH_C, R_C, G]` (공개키, 논스, DH 그룹)
- 서버가 개인키 y 선택, 공개키 `PK^DH_S = g^y mod p` 계산
- Server-Hello 반환: `[PK^DH_S, R_S]`

**2단계: 공유 비밀 및 세션키 도출**
- 양측이 `SK^DH_{C,S} = g^xy mod p` 계산
- MAC 계산: `MAC = H([PK^DH_C, R_C, G, PK^DH_S, R_S])` (SHA256)
- 최종 세션키: `SK*_{C,S} = f(MAC, SK^DH_{C,S})` (키 도출 함수 f 적용)

**3단계: 서버 인증**
- 서버가 CA 서명 인증서를 세션키로 암호화하여 전송:
  `SK*_{C,S}([PK_S, sig_CA])` where `sig_CA = SK_CA(PK_S)`

**4단계: 애플리케이션 키 도출**
- AMAC = H([모든 교환된 메시지]) 계산
- 애플리케이션 레벨 공유키: `SK**_{C,S} = f(AMAC, SK*_{C,S})`

TLS 1.3의 개선점: 이전 버전 대비 옵션 제한으로 단순화, 하위 호환성 유지.

## 예시

```
# TLS 1.3 핸드셰이크 요약
Client ---client-hello---> Server
       [PK^DH_C, R_C, G]

Client <--server-hello---- Server
       [PK^DH_S, R_S]

# 양측 계산: shared_secret = g^xy mod p
# 양측 계산: session_key = KDF(SHA256(hello_messages), shared_secret)

# 이후 모든 통신은 session_key로 암호화
Client <--[certificate]---- Server  (세션키로 암호화됨)
Client ---[finished]------> Server
```

DH 그룹 예시: ffdhe2048에서 g=2, p = 2^2048 - 2^1984 + ...

## 관련 개념

- [Diffie-Hellman Key Exchange](/knowledge/distributed-systems/diffie-hellman-key-exchange/)
- [Session Key](/knowledge/distributed-systems/session-key/)
- [Public Key Certificate](/knowledge/distributed-systems/public-key-certificate/)
- [Authentication Protocol](/knowledge/distributed-systems/authentication-protocol/)
- [Security Design Principles](/knowledge/distributed-systems/security-design-principles/)
