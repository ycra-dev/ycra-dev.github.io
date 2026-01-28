---
title: "Linux 보안 모델"
description: "Linux의 UID/GID 기반 접근 제어, PAM 인증, setuid 권한 상승 메커니즘"
tags: ["OS", "Security", "Linux"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/linux-security-model
sidebar:
  order: 10
---

## 핵심 개념

Linux는 **UID/GID 기반 접근 제어**, **PAM을 통한 유연한 인증**, 그리고 **setuid 메커니즘**으로 권한 상승을 관리한다. UNIX 시스템은 처음부터 다중 사용자를 고려하여 설계되었으며, Linux는 이를 계승하면서 현대적 요구사항을 추가했다.

## 동작 원리

### 1. 인증 (Authentication)

**전통적 패스워드 인증:**

```
입력: 패스워드 + salt
       ↓
    단방향 해시 함수
       ↓
    해시 값 ←→ /etc/shadow 비교
```

**PAM (Pluggable Authentication Modules):**

```
┌─────────────────────────────────────────┐
│          애플리케이션 (login, ssh, su)    │
├─────────────────────────────────────────┤
│               PAM 라이브러리              │
├─────────────────────────────────────────┤
│  ┌─────────┬─────────┬─────────────┐    │
│  │  암호    │  지문    │   OTP       │    │
│  │ 모듈    │ 모듈    │  모듈       │    │
│  └─────────┴─────────┴─────────────┘    │
└─────────────────────────────────────────┘
```

PAM 설정 파일(`/etc/pam.d/`)에서 인증 모듈을 동적으로 구성할 수 있다.

비유하면, 건물 출입 시스템과 같다. 카드키, 지문, PIN 등 다양한 인증 모듈을 교체할 수 있다.

### 2. 접근 제어 (Access Control)

**UID/GID 기반 권한:**

```
파일/객체: UID(소유자) + GID(그룹) + 권한 비트

권한 비트: rwx rwx rwx
          │   │   └── World (기타 사용자)
          │   └────── Group (그룹)
          └────────── Owner (소유자)
```

**접근 결정 흐름:**

```
프로세스 UID == 객체 UID ? → Owner 권한 적용
    ↓ (아니면)
프로세스 GID ∈ 객체 GID ? → Group 권한 적용
    ↓ (아니면)
World 권한 적용
```

**특수 UID: root (UID 0)** — 모든 접근 검사 우회, 특권 연산 수행 가능.

비유하면, 회사 사원증과 같다. 부서와 직책에 따른 출입 권한이 결정된다.

### 3. setuid 메커니즘

| UID 종류 | 의미 |
|----------|------|
| **Real UID** | 프로그램을 실행한 실제 사용자 |
| **Effective UID** | 권한 검사에 사용되는 UID |
| **Saved UID** | 이전 Effective UID 저장 (권한 전환용) |

```
일반 실행:     Real=1000, Effective=1000
setuid 실행:   Real=1000, Effective=0 (root)
               (예: passwd 명령어)
```

비유하면, 임시 관리자 키와 같다. 특정 작업 수행 시에만 관리자 권한을 획득한다.

**Linux 확장: fsuid/fsgid** — 파일 접근에만 사용되는 별도 UID/GID. 서버 프로세스가 클라이언트 대신 파일 접근 시, Effective UID를 바꾸지 않아 다른 권한은 유지된다.

### 4. 파일 디스크립터 전달

```
프로세스 A                    프로세스 B
    │                            │
    │── UNIX 도메인 소켓 ────────│
    │     (fd 전달)              │
    ↓                            ↓
열린 파일 ←─────────────── 동일 파일에 접근 가능
```

전체 권한을 주지 않고 **특정 파일만 선택적으로 공유** 가능하다.

## 예시

1. 사용자가 `passwd` 실행 (setuid root)
2. `passwd`는 root 권한으로 `/etc/shadow` 수정
3. 작업 완료 후 권한 반환

## 관련 개념

- [인증 (Authentication)](/knowledge/os/authentication/) - 인증의 일반 개념
- [강제적 접근 제어 (MAC)](/knowledge/os/mac/) - UID/GID 한계를 보완하는 모델
- [역할 기반 접근 제어 (RBAC)](/knowledge/os/rbac/) - 역할 기반 권한 관리
- [보호의 목표와 원칙](/knowledge/os/protection-goals/) - 최소 권한 원칙
- [접근 행렬 (Access Matrix)](/knowledge/os/access-matrix/) - 접근 제어의 이론적 모델
