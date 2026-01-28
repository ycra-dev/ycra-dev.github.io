---
title: "TLS 프로토콜 (TLS Protocol)"
description: "비대칭 암호로 세션 키를 교환하고 대칭 암호로 통신을 암호화하는 보안 프로토콜"
tags: ["OS", "Security"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/tls-protocol
sidebar:
  order: 5
---

## 핵심 개념

TLS(Transport Layer Security)는 두 컴퓨터 간 안전한 통신을 위한 암호화 프로토콜로, **비대칭 암호로 세션 키를 교환**하고 **대칭 암호로 통신을 암호화**한다. 인터넷 프로토콜은 기본적으로 암호화/인증을 지원하지 않으므로, 웹 브라우저-서버 간 보안 통신의 사실상 표준(HTTPS)이다.

비유하면, 처음엔 공개된 방식으로 비밀 암호를 교환하고, 이후 그 암호로 속삭이는 것이다.

## 동작 원리

### TLS 계층 위치

```
┌─────────────────┐
│   Application   │  ← HTTP, SMTP 등
├─────────────────┤
│      TLS        │  ← 암호화/인증
├─────────────────┤
│      TCP        │
├─────────────────┤
│      IP         │
└─────────────────┘
```

### TLS Handshake 과정

```
Client                                Server
   │                                     │
   │ ─────── ClientHello (nc) ─────────> │
   │        (28-byte random)             │
   │                                     │
   │ <──── ServerHello (ns) + cert ───── │
   │       (random + 인증서)             │
   │                                     │
   │ [인증서 검증]                        │
   │ V_kCA(attrs, ke, interval, a)?      │
   │                                     │
   │ [premaster secret 생성]             │
   │ pms = random 46 bytes               │
   │                                     │
   │ ────── E_ke(pms) ─────────────────> │
   │                                     │
   │                        [pms 복호화] │
   │                                     │
   │ [세션 키 계산]           [세션 키 계산]│
   │ ms = H(nc, ns, pms)     ms = H(...) │
```

### 세션 키 파생 (ms로부터)

| 키 | 용도 |
|----|------|
| k_cs^crypt | 클라이언트 → 서버 암호화 |
| k_sc^crypt | 서버 → 클라이언트 암호화 |
| k_cs^mac | 클라이언트 → 서버 MAC |
| k_sc^mac | 서버 → 클라이언트 MAC |

### 보안 특성

- **nc, ns 사용**: master secret이 매 세션 fresh → **Replay 방어**
- **인증서 검증**: 서버 신원 확인 → **MITM 방어**
- **세션 종료 후 키 폐기**: **Forward Secrecy**

### TLS 활용 사례

- HTTPS (웹 통신)
- TLS VPN (IPSec VPN 대안)
- 이메일 암호화 (SMTPS, IMAPS)

## 예시

은행 사이트 접속 시:
1. 브라우저가 ClientHello 전송 (랜덤값 포함)
2. 서버가 인증서와 ServerHello 응답
3. 브라우저가 CA의 공개 키로 인증서 검증
4. premaster secret 생성 후 서버 공개 키로 암호화 전송
5. 양쪽이 동일한 세션 키 계산
6. 이후 모든 통신이 대칭 암호로 암호화

## 관련 개념

- [대칭 암호화 (Symmetric Encryption)](/knowledge/os/symmetric-encryption/) - 세션 데이터 암호화에 사용
- [비대칭 암호화 (Asymmetric Encryption)](/knowledge/os/asymmetric-encryption/) - 키 교환에 사용
- [인증 (Authentication)](/knowledge/os/authentication/) - 인증서 기반 서버 신원 확인
- [공격 유형 (Attack Types)](/knowledge/os/attack-types/) - TLS가 방어하는 공격들
