---
title: "SMTP"
description: "SMTP(Simple Mail Transfer Protocol)는 인터넷에서 이메일 메시지를 전송하기 위한 표준 프로토콜로, MUA에서 MTA, MTA 간, MTA에서 DA까지 메일 시스템의 각 구성 요소 간 메시지 전달에 사용된다"
tags: ['Smtp', 'Email', 'Protocol', 'Esmtp', 'Mail Transfer']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/smtp
sidebar:
  order: 7
---

## 핵심 개념

SMTP는 RFC5321(RFC7504로 업데이트)에 정의되어 있으며, 확장 버전인 ESMTP도 포함된다. 텍스트 기반 프로토콜이므로 telnet으로 직접 상호작용하여 디버깅할 수 있다.

주요 SMTP 명령: **HELO/EHLO**(연결 시작, ESMTP는 EHLO 사용), **MAIL FROM:**(발신자 지정), **RCPT TO:**(수신자 지정), **DATA**(메시지 본문 시작), **QUIT**(연결 종료). ESMTP 스피커는 EHLO로 시작하여 지원 확장을 협상한다.

SMTP 오류 코드: 첫 자리 2xx(성공), 4xx(임시 오류), 5xx(영구 오류). RFC3463에서 확장된 DSN(Delivery Status Notification) 형식 X.X.X가 도입되었다.

**SMTP AUTH**(RFC4954)는 SMTP 클라이언트가 서버에 자신을 인증할 수 있는 확장으로, 서버가 메일 릴레이를 허용할지 결정한다. 인증 메커니즘으로 LOGIN, PLAIN 등을 지원한다. MSA는 포트 587에서, MTA는 포트 25에서 수신한다.

SMTP 프로토콜의 엄격한 준수는 스팸과 악성 코드를 차단하는 기법으로도 활용된다.

## 예시

```bash
# telnet으로 SMTP 대화 테스트
telnet mail-relay.example.com 25

# 일반적인 SMTP 대화 순서:
# EHLO myhost.example.com
# MAIL FROM:<sender@example.com>
# RCPT TO:<recipient@dest.com>
# DATA
# Subject: Test
#
# Hello!
# .
# QUIT

# 서버 인증 메커니즘 확인
telnet mail-relay.example.com 25
EHLO test.example.com
# 응답에서 AUTH LOGIN PLAIN 등 확인

# curl로 SMTP 테스트
curl --url 'smtp://mail.example.com:587' \
  --mail-from 'sender@example.com' \
  --mail-rcpt 'recipient@example.com' \
  --upload-file message.txt --user 'user:pass'
```

## 관련 개념

- [Mail Transfer Agent](/knowledge/linux/mail-transfer-agent/)
- [Email Architecture](/knowledge/linux/email-architecture/)
- [SPF](/knowledge/linux/spf/)
- [DKIM](/knowledge/linux/dkim/)
- [TLS](/knowledge/linux/tls/)
