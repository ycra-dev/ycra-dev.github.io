---
title: "Authentication Protocol"
description: "인증 프로토콜(Authentication Protocol)은 클라이언트(사용자, 서비스, 장치 등)의 주장된 신원을 검증하기 위한 메시지 교환 절차로, 챌린지-응답(challenge-response) 방식이 대표적이다"
tags: ['Authentication', 'Challenge Response', 'Nonce', 'Security Protocol', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/authentication-protocol
sidebar:
  order: 8
---

## 핵심 개념

인증 수단은 네 가지로 구분된다:
1. **지식 기반**: 비밀번호, PIN
2. **소유 기반**: ID 카드, 소프트웨어 토큰
3. **존재 기반**: 지문, 얼굴 인식 (정적 생체)
4. **행동 기반**: 음성 패턴, 타이핑 패턴 (동적 생체)

단일 팩터 또는 다중 팩터(MFA) 인증으로 조합 가능. 지속적 인증(continuous authentication)도 세션 중 지속적으로 신원을 확인하는 접근법으로 주목받고 있다.

**공유 비밀키 기반 인증** (5-메시지 프로토콜):
1. Alice -> Bob: "나는 Alice야" (평문)
2. Bob -> Alice: 챌린지 R_B (랜덤 수)
3. Alice -> Bob: K_{A,B}(R_B) (공유키로 암호화)
4. Alice -> Bob: 챌린지 R_A
5. Bob -> Alice: K_{A,B}(R_A)

이 프로토콜에서 양방향 인증이 완료된다. 5-메시지를 3-메시지로 줄이려는 시도는 반사 공격(reflection attack)에 취약할 수 있어 주의가 필요하다.

**공개키 기반 인증**:
1. Alice -> Bob: PK_B(R_A) (Bob의 공개키로 챌린지 암호화)
2. Bob -> Alice: PK_A(R_A, R_B, K_{A,B}) (세션키 포함)
3. Alice -> Bob: K_{A,B}(R_B)

핵심 원칙: 인증과 메시지 무결성은 반드시 함께 보장되어야 한다.

## 예시

```python
# 공유키 기반 챌린지-응답 인증 (5-메시지)
# 메시지 1: Alice가 신원 주장
alice_sends("I am Alice")

# 메시지 2: Bob이 챌린지 생성
R_B = generate_random_nonce()
bob_sends(R_B)

# 메시지 3: Alice가 챌린지에 응답
response = encrypt(K_AB, R_B)
alice_sends(response)

# Bob이 검증: decrypt(K_AB, response) == R_B ?
# 성공하면 Alice의 신원 확인됨

# 메시지 4-5: 역방향 (Alice가 Bob 인증)
R_A = generate_random_nonce()
alice_sends(R_A)
bob_sends(encrypt(K_AB, R_A))
# Alice 검증 후 양방향 인증 완료
```

## 관련 개념

- [Kerberos Authentication Service](/knowledge/distributed-systems/kerberos-authentication-service/)
- [Session Key](/knowledge/distributed-systems/session-key/)
- [Transport Layer Security](/knowledge/distributed-systems/transport-layer-security/)
- [Security Policy and Mechanism](/knowledge/distributed-systems/security-policy-and-mechanism/)
- [Sybil Attack](/knowledge/distributed-systems/sybil-attack/)
