---
title: "싱글 사인온 (Single Sign-On)"
description: "Single Sign-On(SSO)은 사용자가 하나의 인증 자격 증명으로 여러 시스템과 애플리케이션에 접근할 수 있게 하는 인증 메커니즘으로, 사용자 ID와 인증 정보를 중앙에서 관리하여 모든 환경의 컴퓨터에 동일한 자격 증명으로 로그인할 수 있게 한다"
tags: ['Sso', 'Authentication', 'Identity', 'Centralized Login', 'Directory Service']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/single-sign-on
sidebar:
  order: 5
---

## 핵심 개념

SSO는 두 가지 핵심 보안 개념을 포함한다: **ID(Identity)**와 **인증(Authentication)**. ID는 시스템 접근이 필요한 개인의 추상적 표현(사용자명, 비밀번호, UID, 이메일 등)이고, 인증은 해당 개인이 ID의 정당한 소유자임을 증명하는 행위이다.

SSO 구현에 필요한 4가지 핵심 요소: (1) **중앙 디렉터리 저장소** - LDAP 기반 디렉터리 서비스(Active Directory, OpenLDAP, 389 Directory Server), (2) **디렉터리 관리 도구** - phpLDAPadmin, Apache Directory Studio, (3) **인증 메커니즘** - LDAP 직접 인증 또는 Kerberos 티켓 기반 인증, (4) **이름 서비스 스위치** - nsswitch.conf를 통한 사용자 속성 조회 루틴 설정.

SSO 환경에서 NTP(시간 동기화)와 DNS(호스트명 매핑)는 필수적이다. 특히 Kerberos는 인증 티켓에 타임스탬프를 사용하므로 정확한 시간 동기화가 중요하다.

조직 간 SSO에는 SAML(Security Assertion Markup Language) 같은 표준 기반 솔루션이 사용된다.

## 예시

```bash
# SSO 환경 구성 단계
# 1. Kerberos 구성 및 AD 도메인 가입 (realmd 사용)
sudo realm join ULSAH.COM -U trent
sudo realm list

# 2. SSSD 구성 (/etc/sssd/sssd.conf)
[sssd]
services = nss, pam
domains = ULSAH.COM

[domain/ULSAH.COM]
id_provider = ad
auth_provider = ad
access_provider = ad

# 3. nsswitch.conf 구성
passwd: files sss
shadow: files sss
group:  files sss

# 4. PAM에서 sssd를 통한 인증 구성
# /etc/pam.d/common-auth
auth sufficient pam_sss.so

# 5. 구성 검증
getent passwd domain_user
```

## 관련 개념

- [LDAP (경량 디렉토리 접근 프로토콜)](/knowledge/linux/ldap/)
- [Kerberos (커버로스)](/knowledge/linux/kerberos/)
- [SSSD (시스템 보안 서비스 데몬)](/knowledge/linux/sssd/)
- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/)
- [NSSwitch (네임 서비스 스위치)](/knowledge/linux/nsswitch/)
- [Active Directory (액티브 디렉토리)](/knowledge/linux/active-directory/)
- [ID 관리 (Identity Management)](/knowledge/linux/identity-management/)
