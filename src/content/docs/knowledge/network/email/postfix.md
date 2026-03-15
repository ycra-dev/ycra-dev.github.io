---
title: "Postfix (메일 전송 에이전트)"
description: "Postfix는 Wietse Venema가 개발한 오픈소스 MTA로, 보안, 성능, 견고성을 핵심 설계 목표로 하며, 여러 작은 협력 프로그램으로 구성된 모듈러 아키텍처를 채택한다"
tags: ['Postfix', 'Mta', 'Email', 'Smtp', 'Mail Server']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/postfix
sidebar:
  order: 3
---

## 핵심 개념

Postfix는 sendmail과 달리 하나의 거대한 프로그램이 아닌 여러 작은 독립 프로그램이 로컬 도메인 소켓이나 FIFO를 통해 통신하는 구조이다. 대부분의 서버 프로그램은 chroot 환경에서 실행 가능하며, setuid 프로그램이 없어 보안이 강화된다.

주요 구성 요소: **smtpd**(SMTP로 메일 수신), **pickup**(로컬 전송 메일 수집), **cleanup**(헤더 추가/주소 재작성), **qmgr**(5개 큐 관리: incoming, active, deferred, hold, corrupt), **smtp**(원격 전송), **local**(로컬 배달).

설정 파일: **main.cf**(주요 설정), **master.cf**(서버 프로그램 설정). 가장 간단한 설정은 빈 main.cf 파일로도 동작한다(로컬 배달 + 원격 직접 전송). **null client** 설정은 모든 메일을 중앙 서버로 전달하는 가장 간단한 클라이언트 구성이다.

500개 이상의 매개변수가 있지만, 대부분 기본값이 적절하다. postconf -n으로 기본값과 다른 설정만 확인한다. 가상 도메인(virtual_alias_domains, virtual_mailbox_domains)과 접근 제어(smtpd_recipient_restrictions)를 통해 유연한 메일 호스팅이 가능하다.

## 예시

```bash
# 가장 간단한 null client 설정 (main.cf)
mydomain = example.com
myorigin = $mydomain
mydestination =
relayhost = [mailserver.example.com]

# postconf로 설정 관리
postconf -n           # 변경된 설정만 출력
postconf mydomain     # 특정 매개변수 확인
postconf -d mydomain  # 기본값 확인

# 별칭 테이블 관리
postalias hash:/etc/aliases
postmap hash:/etc/postfix/access

# 메일 큐 관리
mailq                 # 큐 내용 확인
postsuper -d ALL      # 모든 메일 삭제
qshape deferred       # 지연 큐 요약 통계

# 접근 제어 설정
smtpd_recipient_restrictions =
    permit_mynetworks,
    reject_unauth_destination

# SASL 인증 + TLS 설정
smtpd_sasl_auth_enable = yes
smtpd_tls_cert_file = /etc/certs/smtp.pem
smtp_tls_security_level = may
```

## 관련 개념

- [SMTP (간이 우편 전송 프로토콜)](/knowledge/network/smtp/)
- [메일 전송 에이전트 (Mail Transfer Agent)](/knowledge/network/mail-transfer-agent/)
- [이메일 아키텍처 (Email Architecture)](/knowledge/network/email-architecture/)
- [메일 별칭 (Mail Aliases)](/knowledge/network/mail-aliases/)
- [TLS (전송 계층 보안)](/knowledge/linux/tls/)
