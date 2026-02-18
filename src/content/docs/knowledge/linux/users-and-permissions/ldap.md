---
title: "LDAP"
description: "LDAP(Lightweight Directory Access Protocol)는 네트워크를 통해 디렉터리 정보를 조회하고 수정하기 위한 개방형 프로토콜로, 사용자 계정과 인증 정보를 중앙에서 관리하는 계층적 클라이언트/서버 모델을 제공한다"
tags: ['Ldap', 'Directory Service', 'Authentication', 'Centralized Management', 'Identity', 'Sso']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ldap
sidebar:
  order: 10
---

## 핵심 개념

중대형 기업에서는 중앙 집중식 계정 관리가 필수적이다. LDAP를 사이트 전체 로그인 데이터 저장소로 사용하면 시스템 전체에서 고유한 UID/GID를 강제할 수 있다. Microsoft의 Active Directory도 LDAP와 Kerberos를 기반으로 한다.

LDAP는 본질적으로 디렉터리 서비스를 위한 데이터베이스이다. 핵심 가정은 (1) 데이터 객체가 비교적 작고, (2) 데이터베이스가 널리 복제/캐시되며, (3) 정보가 속성 기반이고, (4) 읽기가 빈번하지만 쓰기는 드물며, (5) 검색이 일반적인 작업이라는 것이다. LDAP 데이터는 엔트리(속성/값 쌍의 집합) 형태이며, **DN(Distinguished Name)**으로 계층 구조를 형성한다. **LDIF(LDAP Data Interchange Format)**는 LDAP 데이터를 텍스트 형식으로 교환하기 위한 표준이다. **objectClass** 속성을 통해 스키마를 정의한다.

**오픈소스 구현**: OpenLDAP(slapd 데몬), 389 Directory Server(더 활발한 개발 커뮤니티, 멀티마스터 복제 지원). 클라이언트 측에서는 nsswitch.conf로 사용자 정보 소스를 지정하고, PAM으로 LDAP 인증을 구성한다. **SSSD**(System Security Services Daemon)는 LDAP, Kerberos, Active Directory를 포함한 다양한 ID 제공자에 대한 접근을 제공하는 현대적 서비스다.

LDAP는 로그인 인증 외에도 메일 라우팅 정보(sendmail, Exim, Postfix), 전화번호/주소 등의 디렉터리 정보, 스크립트용 설정 정보 배포 등 다양한 용도로 활용된다. TCP 포트 389가 기본 포트이며, LDAPS(TLS 암호화)는 보안 연결을 제공한다.

## 예시

```bash
# LDAP 클라이언트 도구 설치
sudo apt install ldap-utils

# LDAP 검색 (ldapsearch 도구)
ldapsearch -x -H ldap://ldap.example.com \
  -b "dc=example,dc=com" "(uid=username)"

# -h: 호스트, -p: 포트, -x: 단순 인증
# -D: 바인드 DN, -W: 비밀번호 프롬프트, -b: 검색 시작 DN
ldapsearch -h ldapserver -p 389 -x \
  -D "cn=admin,dc=navy,dc=mil" -W \
  -b "dc=navy,dc=mil" "cn=ned*"

# LDAP 항목 추가
ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f newuser.ldif

# OpenLDAP 서버 설정 (/etc/openldap/slapd.conf)
# suffix    "dc=atrust,dc=com"
# rootdn    "cn=Manager,dc=atrust,dc=com"
# rootpw    {SSHA}hashedpassword

# SSSD 설치 및 구성
sudo apt install sssd sssd-tools
sudo systemctl enable --now sssd

# nsswitch.conf에서 sss 소스 구성
# passwd: files sss
# shadow: files sss
# group:  files sss

# LDAP을 통해 사용자 정보 조회
getent passwd username
```

## 관련 개념

- [PAM](/knowledge/linux/pam/)
- [Sudo](/knowledge/linux/sudo/)
- [Single Sign-On](/knowledge/linux/single-sign-on/)
- [Kerberos](/knowledge/linux/kerberos/)
- [SSSD](/knowledge/linux/sssd/)
- [NSSwitch](/knowledge/linux/nsswitch/)
