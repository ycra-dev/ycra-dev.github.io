---
title: "Mail Aliases"
description: "메일 별칭(Mail Aliases)은 이메일을 다른 수신자, 파일, 프로그램으로 재라우팅하는 메커니즘으로, /etc/mail/aliases 파일과 사용자별 ~/"
tags: ['Mail Aliases', 'Email', 'Forwarding', 'Mailing List', 'Postmaster']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/mail-aliases
sidebar:
  order: 6
---

## 핵심 개념

별칭은 메일링 리스트 정의, 머신 간 메일 전달, 사용자의 다중 이름 참조 등에 사용된다. 별칭 처리는 재귀적이며, 별칭이 다른 별칭을 가리킬 수 있다.

필수 별칭: **postmaster**(메일 시스템 관리자에게 전달), **abuse**(외부에서 스팸/의심스러운 행위 보고용), **Mailer-Daemon**(MTA 자동 메시지, 보통 postmaster로 별칭).

별칭 대상 유형: (1) 사용자 주소 목록, (2) **:include:** 지시어로 파일에서 주소 읽기(사용자가 자체 메일링 리스트 관리 가능), (3) 절대 경로명으로 파일에 메시지 추가, (4) 파이프(|)를 사용한 프로그램 입력. 파일과 프로그램으로의 별칭은 보안 위험이 있어 제한된다.

메일 루프 감지: MTA는 Received 헤더 수를 세어 한계(보통 25홉)에 도달하면 메시지를 반송(bounce)한다. Delivered-To 헤더로도 루프를 감지한다.

sendmail과 Postfix는 별칭 변경 후 **newaliases** 명령으로 해시 데이터베이스를 재구축해야 하며, Exim은 변경을 자동 감지한다.

## 예시

```bash
# /etc/mail/aliases 기본 별칭
postmaster: admin@example.com
abuse:      postmaster
Mailer-Daemon: postmaster
root:       sysadmin

# 메일링 리스트 (파일에서 주소 읽기)
ulsah-authors: :include:/etc/mail/ulsah.authors
owner-ulsah-authors: trent

# 파일로 메시지 저장
log-archive: /var/log/mail-archive

# 프로그램으로 파이프
ticket-system: |/usr/local/bin/create-ticket

# 사용자 .forward 파일 (~/.forward)
newuser@newsite.com

# 해시 데이터베이스 재구축
sudo newaliases

# Postfix 별칭 테이블 구축
sudo postalias hash:/etc/aliases
```

## 관련 개념

- [Mail Transfer Agent](/knowledge/network/mail-transfer-agent/)
- [Postfix](/knowledge/network/postfix/)
- [Email Architecture](/knowledge/network/email-architecture/)
- [SMTP](/knowledge/network/smtp/)
