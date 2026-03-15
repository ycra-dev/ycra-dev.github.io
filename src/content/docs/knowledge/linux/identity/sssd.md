---
title: "SSSD (시스템 보안 서비스 데몬)"
description: "SSSD(System Security Services Daemon)는 Linux와 FreeBSD에서 사용자 ID 관리, 인증, 계정 매핑을 통합 제공하는 데몬으로, LDAP, Kerberos, Active Directory 등 다양한 ID 제공자에 대한 단일 접근..."
tags: ['Sssd', 'Authentication', 'Identity', 'Sso', 'Daemon']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/sssd
sidebar:
  order: 2
---

## 핵심 개념

과거 UNIX/Linux 환경에서는 각 서비스나 애플리케이션마다 독립적인 인증을 설정하는 것이 일반적이었으며, 이는 관리 불가능한 설정과 문서화되지 않은 의존성의 혼란을 초래했다. SSSD는 이러한 문제의 종합적 해결책으로 등장했다.

SSSD의 주요 기능: (1) LDAP과 Kerberos를 통한 네이티브 인증 지원, (2) 오프라인 자격 증명 캐싱(모바일 장치에 유용), (3) Active Directory와의 원활한 통합, (4) NSSwitch와 PAM의 백엔드로 동작.

보안상 SSSD는 암호화되지 않은 채널을 통한 인증을 허용하지 않으므로 LDAPS/TLS 사용이 필수이다. tls_reqcert를 demand로 설정하면 서버 인증서 검증을 강제한다.

SSSD 구성 후 nsswitch.conf에서 sss 소스를 추가하고, PAM에서 pam_sss 모듈을 구성하여 시스템이 SSSD를 ID 및 인증 정보 소스로 사용하도록 해야 한다.

## 예시

```bash
# SSSD 설치
sudo apt install sssd sssd-tools

# Active Directory 환경 sssd.conf
[sssd]
services = nss, pam
domains = ULSAH.COM

[domain/ULSAH.COM]
id_provider = ad
auth_provider = ad
access_provider = ad

# 비-AD LDAP 서버 환경 sssd.conf
[sssd]
services = nss, pam
domains = LDAP

[domain/LDAP]
id_provider = ldap
auth_provider = ldap
ldap_uri = ldaps://ldap.example.com
ldap_search_base = dc=example,dc=com
tls_reqcert = demand

# SSSD 시작 및 활성화
sudo systemctl enable --now sssd

# 구성 확인
getent passwd domain_user
id domain_user
```

## 관련 개념

- [싱글 사인온 (Single Sign-On)](/knowledge/linux/single-sign-on/)
- [LDAP (경량 디렉토리 접근 프로토콜)](/knowledge/linux/ldap/)
- [Kerberos (커버로스)](/knowledge/linux/kerberos/)
- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/)
- [NSSwitch (네임 서비스 스위치)](/knowledge/linux/nsswitch/)
- [Active Directory (액티브 디렉토리)](/knowledge/linux/active-directory/)
