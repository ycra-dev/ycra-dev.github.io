---
title: "Open Relay"
description: "오픈 릴레이(Open Relay)는 외부 사용자가 인증 없이 메일을 제3자에게 전달하도록 허용하는 잘못 설정된 메일 서버로, 스패머가 진짜 발신 출처를 숨기는 데 악용한다"
tags: ['Open Relay', 'Email Security', 'Spam', 'Smtp', 'Relay Control']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/open-relay
sidebar:
  order: 14
---

## 핵심 개념

릴레이는 들어온 메시지에 로컬 수신자가 없을 때 MTA가 다른 목적지로 전달하는 것이다. 오픈 릴레이는 스패머가 자신의 리소스를 절약하면서 실제 출처를 숨기기 위해 악용하며, 다른 사이트에 블랙리스트에 등재될 위험이 있다.

릴레이가 정당하게 필요한 3가지 경우만 존재한다: (1) 항상 켜져 있지 않은 호스트(노트북, Windows PC)의 게이트웨이 역할, (2) 다른 호스트의 발신 메일 서버 역할, (3) 다른 사이트의 백업 MX 목적지.

**sendmail**: 기본적으로 릴레이가 비활성화. access_db의 RELAY 태그와 /etc/mail/relay-domains로 제한적 릴레이 허용. **Postfix**: 기본값이 매우 제한적. smtpd_recipient_restrictions에서 reject_unauth_destination으로 제어. **Exim**: ACL(Access Control List)을 통한 세밀한 릴레이 제어.

릴레이 설정 후 spamhelp.org 같은 사이트에서 오픈 릴레이 여부를 반드시 검증해야 한다.

## 예시

```bash
# sendmail: access_db에서 릴레이 허용
# /etc/mail/access
192.168.1      RELAY       # 로컬 네트워크 릴레이 허용
spammer.com    REJECT      # 특정 도메인 거부

# sendmail: 도메인 릴레이 허용
# FEATURE(`relay_entire_domain')

# Postfix: 기본 릴레이 제어
# main.cf
smtpd_recipient_restrictions =
    permit_mynetworks,
    reject_unauth_destination

# Exim ACL: 릴레이 제어
# deny  !authenticated = *
#       !hosts = +relay_from_hosts
#       message = relay not permitted

# 오픈 릴레이 테스트
telnet mailserver.example.com 25
EHLO test.com
MAIL FROM:<test@external.com>
RCPT TO:<victim@other.com>
# 거부되어야 정상
```

## 관련 개념

- [SMTP](/knowledge/linux/smtp/)
- [Mail Transfer Agent](/knowledge/linux/mail-transfer-agent/)
- [Postfix](/knowledge/linux/postfix/)
- [SPF](/knowledge/linux/spf/)
- [Email Architecture](/knowledge/linux/email-architecture/)
