---
title: "Multifactor Authentication"
description: "다중 인증(MFA)은 사용자의 신원을 두 가지 이상의 독립적인 인증 요소(알고 있는 것, 가지고 있는 것, 존재 자체)를 통해 검증하는 보안 메커니즘이다"
tags: ['Security', 'Authentication', 'Mfa', '2fa', 'Password', 'Identity']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/multifactor-authentication
sidebar:
  order: 12
---

## 핵심 개념

MFA는 "알고 있는 것"(비밀번호/패스프레이즈)과 "가지고 있는 것"(물리적 장치, 주로 휴대폰)을 결합하여 신원을 검증한다. 추측 가능한 비밀번호는 가장 흔한 보안 침해 원인 중 하나이며, MFA는 이에 대한 강력한 방어 수단이다.

**MFA 필수 적용 대상:**
- VPN 접근
- SSH 접근
- 웹 애플리케이션 관리 인터페이스
- 모든 인터넷 대면 특권 접근 포털

**비밀번호 보안 원칙:**
- 모든 계정에는 비밀번호가 있어야 하며, 추측이 어려워야 한다
- 길이가 보안의 핵심: 매우 긴 패스프레이즈가 짧은 복잡한 비밀번호보다 안전하다
- 하나의 패스프레이즈를 여러 목적에 사용하면 절대 안 된다
- 비밀번호 보관소(Password Vault) 사용을 권장: 1Password, KeePass, Secret Server 등
- sudo 권한이 있는 관리자의 개인 비밀번호는 root 비밀번호만큼 중요하다

**비밀번호 보관소의 "Break the Glass" 기능:**
긴급 상황에서 정상적으로 접근 권한이 없는 비밀번호를 얻을 수 있되, 다른 관리자에게 경보가 전달되는 기능이다.

## 예시

```bash
# Google Authenticator PAM 모듈 설치 및 설정 (Linux)
sudo apt-get install libpam-google-authenticator

# 사용자별 MFA 설정
google-authenticator
# QR 코드가 출력되면 휴대폰 앱으로 스캔

# PAM 설정에 추가 (/etc/pam.d/sshd)
# auth required pam_google_authenticator.so

# SSH에서 MFA 활성화 (/etc/ssh/sshd_config)
# ChallengeResponseAuthentication yes
# AuthenticationMethods publickey,keyboard-interactive

# 비밀번호 강도 확인 (chage 명령)
sudo chage -l username
# 최소/최대 비밀번호 사용 기간, 만료일 등 확인
```

## 관련 개념

- [pam](/knowledge/linux/pam/) - MFA를 구현하는 PAM 모듈
- [ssh](/knowledge/linux/ssh/) - MFA로 보호해야 할 핵심 서비스
- [sudo](/knowledge/linux/sudo/) - 관리 권한 접근 시 MFA 적용
- [social-engineering](/knowledge/linux/social-engineering/) - MFA가 방어하는 공격 유형
