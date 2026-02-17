---
title: "Delegation in Distributed Systems"
description: "위임(Delegation)은 하나의 프로세스가 자신의 접근 권한의 일부 또는 전부를 다른 프로세스에게 전달하는 기법으로, 자원 보호를 훼손하지 않으면서 분산 시스템에서 작업을 분배할 수 있게 해주는 보안 메커니즘이다"
tags: ['Delegation', 'Proxy', 'Oauth', 'Access Rights', 'Authorization', 'Security']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/delegation-in-distributed-systems
sidebar:
  order: 14
---

## 핵심 개념

**프록시(Proxy) 기반 위임** (Neuman의 방식):
프록시는 두 부분으로 구성된다:
1. **인증서 부분**: 위임된 접근 권한 R과 공개 비밀(PK_proxy), 위임자 A의 서명
   - `C = {R, PK_proxy}`, 서명 `sig(A, C)`
2. **비밀 부분**: `SK_proxy` (비밀키) - 프록시 보유자의 정당성을 증명

위임 프로토콜:
1. Alice -> Bob: `[R, PK_proxy]_A, K_{A,B}(SK_proxy)` (권한목록 + 서명 + 암호화된 비밀)
2. Bob이 서버에 접근: `[R, PK_proxy]_A` 제출
3. 서버 -> Bob: `PK_proxy(N)` (논스 챌린지)
4. Bob -> 서버: `N` (비밀키로 복호화하여 정당성 증명)

핵심: Alice가 모든 위임 대상을 알 필요 없이 Bob이 다시 Dave에게 권한을 전달 가능.

**OAuth 2.1**: 실제로 널리 사용되는 위임 프로토콜. Amazon, Google, Microsoft 등이 사용.
- 리소스 소유자, 클라이언트, 리소스 서버, 인가 서버의 4가지 역할
- 클라이언트가 `[cid, R, H(S)]` 전송 -> 사용자 동의 -> 인가 코드 수신 -> `[cid, AC, S]`로 액세스 토큰 요청
- 액세스 토큰 유형: 식별자 기반 (매번 인가 서버 확인) 또는 인증서 기반 (만료 시간까지 유효)

## 예시

```python
# OAuth 2.1 위임 흐름 예시
# Alice가 메일 클라이언트에 Gmail 접근 권한 위임

# 1. 클라이언트 등록 (사전)
client_id = "mail_app_123"

# 2. 위임 요청
auth_request = {
    "client_id": client_id,
    "scope": ["read_mail", "send_mail"],  # 위임 권한
    "code_challenge": sha256(secret_S)     # H(S)
}
# -> 사용자(Alice) 동의 -> authorization_code 수신

# 3. 액세스 토큰 요청
token_request = {
    "client_id": client_id,
    "code": authorization_code,
    "code_verifier": secret_S              # S 공개하여 동일 클라이언트 증명
}
# -> access_token 수신

# 4. 리소스 접근
response = api_call("GET /mail", headers={"Authorization": f"Bearer {access_token}"})
```

## 관련 개념

- [Authorization and Access Control](/knowledge/distributed-systems/authorization-and-access-control/)
- [Kerberos Authentication Service](/knowledge/distributed-systems/kerberos-authentication-service/)
- [Public Key Certificate](/knowledge/distributed-systems/public-key-certificate/)
- [Authentication Protocol](/knowledge/distributed-systems/authentication-protocol/)
- [Session Key](/knowledge/distributed-systems/session-key/)
