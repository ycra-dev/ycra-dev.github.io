---
title: "NSSwitch"
description: "NSSwitch(Name Service Switch)는 /etc/nsswitch"
tags: ['Nsswitch', 'Name Service', 'Configuration', 'Login', 'Identity Resolution']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nsswitch
sidebar:
  order: 3
---

## 핵심 개념

NSSwitch는 주어진 유형의 조회(사용자, 그룹, 호스트 등)에 대해 참조할 소스를 순서대로 나열한다. 일반적으로 로컬 passwd/group 파일(files)을 먼저 참조하고, 이후 SSSD(sss) 또는 LDAP으로 중앙 디렉터리 서비스에 위임한다.

SSO 환경에서 nsswitch.conf 구성은 필수적이다. 일부 소프트웨어는 전통적인 getpwent 계열의 라이브러리 루틴을 사용하여 사용자 정보를 조회하고, 현대적 서비스는 PAM 인증 루틴을 직접 호출한다. 완전한 기능 환경을 보장하려면 PAM과 nsswitch.conf 양쪽을 모두 구성해야 한다.

getent passwd 명령으로 모든 소스에서 정의된 사용자 계정을 /etc/passwd 형식으로 출력하여 구성을 테스트할 수 있다. 로컬 사용자와 도메인 계정은 UID와 홈 디렉터리 경로로 구분할 수 있다.

## 예시

```bash
# /etc/nsswitch.conf SSO 구성 예시
passwd: files sss
shadow: files sss
group:  files sss
hosts:  files dns

# 구성 테스트 - 모든 소스의 사용자 출력
getent passwd

# 특정 사용자 조회
getent passwd trent@ULSAH.COM

# sendmail은 자체 서비스 스위치 사용
# /etc/mail/service.switch
aliases  files ldap
hosts    dns files
```

## 관련 개념

- [Single Sign-On](/knowledge/linux/single-sign-on/)
- [SSSD](/knowledge/linux/sssd/)
- [LDAP](/knowledge/linux/ldap/)
- [PAM](/knowledge/linux/pam/)
