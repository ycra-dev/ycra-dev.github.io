---
title: "DKIM"
description: "DKIM(DomainKeys Identified Mail)은 이메일 메시지에 대한 암호화 서명 시스템으로, 수신자가 발신자의 신원뿐만 아니라 메시지가 전송 중 변조되지 않았음을 검증할 수 있게 한다"
tags: ['Dkim', 'Email Security', 'Cryptographic Signature', 'DNS', 'Anti Spam']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dkim
sidebar:
  order: 9
---

## 핵심 개념

DKIM은 DNS 레코드를 사용하여 도메인의 암호화 공개 키와 메시지 서명 정책을 공개한다. 발신 서버는 개인 키로 메시지 헤더와 본문에 서명하고, 수신 서버는 DNS에 공개된 공개 키로 서명을 검증한다.

SPF가 발신 서버의 IP 주소만 검증하는 것과 달리, DKIM은 메시지 내용의 무결성까지 보장한다. 이는 릴레이된 메일에서도 서명이 유효하다는 장점이 있다(메시지 내용이 변경되지 않는 한).

sendmail, Exim, Postfix 등 주요 MTA가 DKIM을 지원하지만, 실제 배포는 아직 드문 편이다. DKIM은 SPF와 함께 사용하여 이메일 인증의 다층 방어를 구성하는 것이 권장된다.

## 예시

```bash
# DKIM DNS 레코드 예시 (TXT 레코드)
# selector._domainkey.example.com. IN TXT
#   "v=DKIM1; k=rsa; p=MIGfMA0GCS..."

# DKIM 서명이 포함된 메일 헤더 예시
# DKIM-Signature: v=1; a=rsa-sha256;
#   d=example.com; s=selector;
#   h=from:to:subject:date;
#   bh=base64hash; b=base64signature

# OpenDKIM 설치 (Postfix와 연동)
sudo apt install opendkim opendkim-tools

# DKIM 키 생성
opendkim-genkey -s selector -d example.com

# Postfix milter 설정 (main.cf)
milter_default_action = accept
smtpd_milters = inet:localhost:8891
non_smtpd_milters = inet:localhost:8891
```

## 관련 개념

- [SPF](/knowledge/network/spf/)
- [SMTP](/knowledge/network/smtp/)
- [Email Architecture](/knowledge/network/email-architecture/)
- [Mail Transfer Agent](/knowledge/network/mail-transfer-agent/)
- [TLS](/knowledge/linux/tls/)
