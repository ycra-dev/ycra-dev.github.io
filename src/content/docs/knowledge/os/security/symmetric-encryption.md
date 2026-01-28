---
title: "대칭 암호화 (Symmetric Encryption)"
description: "암호화와 복호화에 동일한 비밀 키를 사용하는 암호화 방식"
tags: ["OS", "Security"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/symmetric-encryption
sidebar:
  order: 1
---

## 핵심 개념

대칭 암호화(Symmetric Encryption)는 암호화와 복호화에 **동일한 비밀 키**를 사용하는 암호화 방식이다. 네트워크에서 송신자/수신자 주소를 신뢰할 수 없으므로, 암호화로 메시지 수신자를 제한한다(키 보유자만 복호화 가능).

비유하면, 똑같은 자물쇠 열쇠를 두 사람이 가지고 있는 것이다. 하나로 잠그면 다른 하나로 열린다.

## 동작 원리

### 암호화 흐름

```
Alice                              Bob
  │                                  │
  │  ──────── 키 교환 ────────────>  │
  │         (안전한 채널)            │
  │                                  │
  │  평문 m                          │
  │    ↓                             │
  │  c = E_k(m)                      │
  │    ↓                             │
  │  ═══════ 암호문 c ═══════════>   │
  │        (공개 채널)               │
  │                             m = D_k(c)
```

### Block Cipher vs Stream Cipher

| 구분 | Block Cipher | Stream Cipher |
|------|--------------|---------------|
| 처리 단위 | 고정 크기 블록 | 바이트/비트 스트림 |
| 특징 | 치환/순열 연산 | 키스트림과 XOR |
| 용도 | 짧은 메시지, 블록 단위 | 긴 메시지, 실시간 |
| 예시 | DES, AES | AES-CTR mode |

### 주요 알고리즘

| 알고리즘 | 키 길이 | 블록 크기 | 상태 |
|----------|---------|-----------|------|
| **DES** | 56-bit | 64-bit | 취약 (brute-force 가능) |
| **3DES** | 168-bit | 64-bit | 레거시 |
| **AES** | 128/192/256-bit | 128-bit | **현재 표준** |

AES(Advanced Encryption Standard)는 2001년 NIST가 채택한 Rijndael 알고리즘 기반이며, FIPS-197로 표준화되었다.

### 키 교환 문제

대칭 암호의 핵심 과제: 두 당사자가 비밀 키를 **어떻게 안전하게 공유**?

- Out-of-band 교환 (직접 전달)
- 신뢰할 수 있는 제3자 (Certificate Authority)
- 비대칭 암호화로 대칭 키 전송

N명이 통신할 경우 **N(N-1)/2개** 키가 필요하다.

## 예시

Alice와 Bob이 AES-256으로 통신:
1. 사전에 안전한 채널로 256비트 키 공유
2. Alice가 평문을 AES로 암호화하여 전송
3. Bob이 동일한 키로 복호화

## 관련 개념

- [비대칭 암호화 (Asymmetric Encryption)](/knowledge/os/asymmetric-encryption/) - 공개 키/개인 키 쌍을 사용하는 암호화
- [TLS 프로토콜 (TLS Protocol)](/knowledge/os/tls-protocol/) - 대칭+비대칭을 결합한 통신 보안
- [인증 (Authentication)](/knowledge/os/authentication/) - 메시지 송신자 검증
- [보안 vs 보호 (Security vs Protection)](/knowledge/os/security-vs-protection/) - 보안의 전체 맥락
