---
title: "Kerberos"
description: "Kerberos는 MIT에서 개발된 티켓 기반 인증 시스템으로, 대칭 키 암호화를 사용하여 네트워크 환경에서 사용자와 서비스 간의 상호 인증을 제공한다"
tags: ['Kerberos', 'Authentication', 'Ticket', 'Symmetric Key', 'Active Directory', 'Sso', 'Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/kerberos
sidebar:
  order: 2
---

## 핵심 개념

Kerberos의 핵심 개념은 **TGT(Ticket-Granting Ticket)**이다. 사용자가 인증에 성공하면 TGT를 발급받고, 이후 각 서비스에 접근할 때 TGT를 이용하여 서비스 티켓을 받는다. 이를 통해 비밀번호를 반복 입력할 필요가 없다.

Microsoft가 Active Directory와 Windows 인증의 일부로 Kerberos를 사용하면서 최근 인기가 급상승했다. Linux 시스템을 Active Directory 도메인에 가입시키는 작업은 과거에 매우 복잡했으나, **realmd** 도구의 등장으로 크게 간소화되었다. realmd는 SSSD와 Kerberos를 함께 구성하는 설정 도구 역할을 한다.

핵심 구성 요소: **KDC(Key Distribution Center)** - AD 도메인 컨트롤러가 KDC 역할 수행. **Realm** - Kerberos 인증 도메인(보통 대문자 도메인명). **krb5.conf** - 클라이언트 Kerberos 설정 파일. 티켓에는 유효 기간이 있으며(일반적으로 10시간, 갱신 24시간), 시간 왜곡(clock skew)에 대한 허용치를 설정할 수 있다(보통 5분).

Kerberos 환경에서 NTP를 통한 정확한 시간 동기화와 DNS를 통한 호스트명 매핑이 필수적이다.

**보안 관점 (Ch.27):**
Kerberos는 인증(authentication) 시스템으로, 사용자와 서비스가 자신이 주장하는 존재임을 보장하지만 그 이상의 보안이나 암호화는 제공하지 않는다. 인증 서버는 물리적으로 안전한 머신에서 실행되어야 한다. 기존 비밀번호 보안 대비 핵심 개선점은: (1) 네트워크에서 암호화되지 않은 비밀번호를 절대 전송하지 않음, (2) SSO 효과로 반복적 비밀번호 입력 불필요. 단, Windows AD의 Kerberos는 독점적인 비문서화된 프로토콜 확장을 사용하여 MIT 코드와 호환성 문제가 발생할 수 있으며, sssd 데몬으로 UNIX/Linux 시스템이 AD와 상호작용한다.

## 예시

```bash
# Linux: realmd를 사용한 AD 도메인 가입
sudo realm join ULSAH.COM -U trent
sudo realm list

# FreeBSD: /etc/krb5.conf 수동 설정
[libdefaults]
    default_realm = ULSAH.COM
    clockskew = 300

[realms]
    ULSAH.COM = {
        kdc = ad-controller.ulsah.com
        admin_server = ad-controller.ulsah.com
    }

[logging]
    default = FILE:/var/log/krb5.log

# Kerberos 티켓 요청
kinit administrator@ULSAH.COM

# 현재 티켓 확인
klist

# 티켓 무효화
kdestroy

# AD 도메인 가입 (FreeBSD)
net ads join -U trent
```

## 관련 개념

- [Single Sign-On](/knowledge/linux/single-sign-on/)
- [LDAP](/knowledge/linux/ldap/)
- [Active Directory](/knowledge/linux/active-directory/)
- [SSSD](/knowledge/linux/sssd/)
- [PAM](/knowledge/linux/pam/)
- [SSH](/knowledge/linux/ssh/) - Kerberos GSSAPI 인증 지원
- [Multifactor Authentication](/knowledge/linux/multifactor-authentication/) - 인증 강화 방법
