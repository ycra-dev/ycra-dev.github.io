---
title: "패스워드 보안 (Password Security)"
description: "패스워드의 안전한 저장, 검증, 관리 기법과 다중 인증(MFA)"
tags: ["OS", "Security"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/password-security
sidebar:
  order: 4
---

## 핵심 개념

패스워드 보안은 사용자 인증을 위한 패스워드의 **안전한 저장, 검증, 관리** 기법이다. 가장 보편적인 인증 수단이지만 추측, 도청, 사전 공격 등 많은 보안 위험을 내포한다. Hash + Salt 저장, OTP, 다중 인증(MFA)으로 보안을 강화한다.

## 동작 원리

### 패스워드 취약점

| 공격 유형 | 설명 |
|-----------|------|
| **Brute Force** | 모든 가능한 조합 시도 |
| **Dictionary Attack** | 단어 사전 + 변형 시도 |
| **Shoulder Surfing** | 입력 장면 훔쳐보기 |
| **Sniffing** | 네트워크에서 도청 |

### Hash + Salt 저장

**문제**: 패스워드를 평문 저장 → 파일 유출 시 모든 패스워드 노출

**Hash만 저장**: `H(password)` → 동일 패스워드는 동일 해시 → 사전 공격으로 일괄 크래킹 가능

**Salt 추가**:

```
저장: (salt, H(salt + password))
검증: H(저장된 salt + 입력) == 저장된 해시?
```

- 각 사용자마다 다른 salt
- 동일 패스워드도 다른 해시값
- 사전 공격 무력화 (각 salt마다 사전 재계산 필요)

```
User1: password="secret123", salt="x8f2"
       stored=("x8f2", H("x8f2secret123"))

User2: password="secret123", salt="q9m1"
       stored=("q9m1", H("q9m1secret123"))

→ 해시값은 완전히 다름
```

### One-Time Password (OTP)

세션마다 다른 패스워드를 사용하여 도청/재사용 공격을 무력화한다. 시스템이 challenge를 제시하면 사용자가 비밀 키 + challenge로 응답을 생성한다.

### Multi-Factor Authentication (MFA)

| Factor | 설명 | 예시 |
|--------|------|------|
| **Something you know** | 지식 기반 | 패스워드, PIN |
| **Something you have** | 소유 기반 | OTP 토큰, 스마트폰 |
| **Something you are** | 생체 기반 | 지문, 홍채, 얼굴 |

**Two-Factor (2FA)**: 2개 factor 조합 (예: 패스워드 + OTP)

### 생체 인증 (Biometrics)

지문, 홍채, 얼굴 등을 이용한다. 분실/망각이 불가능하다는 장점이 있지만, 유출 시 변경 불가능하다는 단점이 있다.

## 예시

은행 앱 로그인: 비밀번호 입력 → OTP 앱에서 코드 확인 → 지문 인증 (3FA)

## 관련 개념

- [인증 (Authentication)](/knowledge/os/authentication/) - 메시지 송신자 검증과 변조 방지
- [공격 유형 (Attack Types)](/knowledge/os/attack-types/) - 네트워크 기반 공격 기법
- [침입 방지 시스템 (IPS)](/knowledge/os/intrusion-prevention-system/) - 침입 탐지/차단
- [보호의 목표와 원칙](/knowledge/os/protection-goals/) - 보호 핵심 원칙
