---
title: "인증 (Authentication)"
description: "메시지의 송신자를 검증하고 메시지가 변조되지 않았음을 증명하는 암호학적 기법"
tags: ["OS", "Security", "Cryptography"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/authentication
sidebar:
  order: 3
---

## 핵심 개념

인증(Authentication)은 메시지의 **송신자를 검증**하고, 메시지가 **변조되지 않았음을 증명**하는 암호학적 기법이다. 암호화(Encryption)가 **수신자를 제한**(기밀성)하는 것이라면, 인증은 **송신자를 검증**(무결성)하는 것이다.

| 기능 | Encryption | Authentication |
|------|------------|----------------|
| 목적 | 수신자 제한 | 송신자 검증 |
| 보장 | 기밀성 (Confidentiality) | 무결성 (Integrity) |

## 동작 원리

### Hash Function

메시지 m을 **고정 크기 해시값** H(m)으로 변환하는 함수이다. Message Digest라고도 한다.

**핵심 특성:**
- **충돌 저항성**: H(m) = H(m')인 m' =/= m을 찾기가 사실상 불가능
- **단방향성**: H(m)에서 원본 m을 역산 불가능

**주요 알고리즘:**

| 알고리즘 | 비트 수 | 상태 |
|----------|---------|------|
| MD5 | 128-bit | 취약, 사용 금지 |
| SHA-1 | 160-bit | 취약 |
| **SHA-256 / SHA-3** | 256-bit+ | **현재 권장** |

### Hash만으로 부족한 이유

```
[Hash만 사용할 경우]
송신자: m + H(m) 전송
   → 공격자가 m을 m'로 수정
   → H(m')를 재계산하여 함께 전송
   → 수신자는 변조를 탐지할 수 없음!
```

H(m) 자체를 **인증**해야 한다. 이를 위해 **MAC** 또는 **Digital Signature**를 사용한다.

### MAC (Message Authentication Code)

**대칭 키 기반** 인증 방식이다. 송신자와 수신자가 동일한 비밀 키 k를 공유한다.

```
[MAC 흐름]
송신자: a = S_k(H(m))     ← 키 k로 인증자 생성
송신자: m + a 전송
수신자: V_k(m, a)          ← 키 k로 검증 (true/false)
```

- S: K → (M → A) -- 인증자 생성 함수
- V: K → (M x A → {true, false}) -- 검증 함수
- 키 k를 가진 사람만 생성/검증 가능

### Digital Signature

**비대칭 키 기반** 인증 방식이다. 서명은 개인 키로, 검증은 공개 키로 수행한다.

```
[RSA Digital Signature]
서명: a = H(m)^ks mod N     ← 개인 키(ks)로 서명
검증: a^kv mod N == H(m)?   ← 공개 키(kv)로 검증
```

- ks (Private/Signing key): 서명 생성
- kv (Public/Verification key): 서명 검증
- 핵심: **누구나 검증 가능** (MAC과의 가장 큰 차이)

### MAC vs Digital Signature

| 특성 | MAC | Digital Signature |
|------|-----|-------------------|
| 키 | 대칭 (공유) | 비대칭 (개인/공개) |
| 검증자 | 키 보유자만 | **누구나** |
| 부인 방지 | 불가 | **가능** |
| 용도 | 세션 무결성 | 코드 서명, 계약서 |

비유하면, MAC은 **공유 도장**(두 사람만 확인 가능)이고, Digital Signature는 **개인 도장**(누구나 진위 확인 가능)이다.

### Nonrepudiation (부인 방지)

Digital Signature의 핵심 응용이다. 서명자가 나중에 "나는 서명하지 않았다"고 주장할 수 없다. 전자 계약, 코드 서명 등에 활용된다.

## 예시

소프트웨어 배포 시 코드 서명 시나리오:
1. 개발사가 소프트웨어의 **해시값**을 계산
2. 해시값을 **개인 키**로 서명하여 Digital Signature 생성
3. 소프트웨어 + 서명을 함께 배포
4. 사용자가 **공개 키**로 서명을 검증
5. 서명이 유효하면 → 변조되지 않았고, 실제 개발사가 배포한 것임을 확신

## 관련 개념

- [비대칭 암호화 (Asymmetric Encryption)](/knowledge/os/asymmetric-encryption/)
- [공격 유형 (Attack Types)](/knowledge/os/attack-types/)
- [코드 인젝션 (Code Injection)](/knowledge/os/code-injection/)
