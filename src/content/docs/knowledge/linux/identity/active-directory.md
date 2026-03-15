---
title: "Active Directory (액티브 디렉토리)"
description: "Active Directory(AD)는 Microsoft의 디렉토리 서비스로, 사용자/컴퓨터/리소스의 중앙집중식 인증 및 인가를 제공하며, UNIX/Linux 시스템은 sssd와 Samba를 통해 AD 도메인에 통합될 수 있다"
tags: ['Active Directory', 'Ad', 'Sssd', 'Kerberos', 'Windows Domain', 'Authentication']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/active-directory
sidebar:
  order: 4
---

## 핵심 개념

**UNIX/Linux 통합:** sssd(System Security Services Daemon)를 통해 UNIX/Linux 시스템을 AD 도메인 클라이언트로 추가할 수 있다. 이전에는 winbind가 사용되었지만 현재는 sssd가 선호된다. AD 통합을 통해 사이트 전체에서 신원과 인증 정보를 공유할 수 있다.

**Samba에서의 AD 인증:** smb.conf에서 `security = ads`, `realm = DOMAIN.COM`을 설정하고, sssd가 생성하는 전용 keytab 파일을 사용. 사용자가 도메인 로그인 자격 증명으로 Samba 공유에 접근 가능.

**Samba AD 컨트롤러:** Samba 4는 기본적인 Windows AD 컨트롤러 기능도 구현할 수 있지만, 프로덕션 환경에서는 Windows 서버에 맡기는 것이 권장된다.

**장점:** 별도의 smbpasswd 관리 불필요, 사용자 경험 통일, 기존 AD 인프라 활용, PAM/nsswitch 연동.

## 예시

```bash
# Samba smb.conf - AD 인증 설정
# [global]
#   workgroup = MYCOMPANY
#   security = ads
#   realm = MYCOMPANY.COM
#   dedicated keytab file = /etc/krb5.keytab
#   kerberos method = secrets and keytab

# sssd 기반 AD 도메인 참가
sudo realm join MYCOMPANY.COM

# AD 사용자로 Samba 공유 접근
smbclient //server/share -U user@MYCOMPANY.COM

# AD 연동 상태 확인
sudo sssctl domain-status MYCOMPANY.COM
```

## 관련 개념

- [Samba (삼바)](/knowledge/linux/samba/)
- [SMB 프로토콜 (SMB Protocol)](/knowledge/linux/smb-protocol/)
- [Kerberos 인증 (Kerberos Authentication)](/knowledge/linux/kerberos-authentication/)
- [LDAP (경량 디렉토리 접근 프로토콜)](/knowledge/linux/ldap/)
- [ID 관리 (Identity Management)](/knowledge/linux/identity-management/)
- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/)
