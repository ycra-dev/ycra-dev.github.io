---
title: "메일 전송 에이전트 (Mail Transfer Agent)"
description: "MTA(Mail Transfer Agent)는 이메일 메시지를 수신하고, 수신자 주소를 이해하며, 적절한 목적지로 메시지를 라우팅하는 소프트웨어로, 이메일 시스템의 핵심 구성 요소이다"
tags: ['Mta', 'Sendmail', 'Postfix', 'Exim', 'Email', 'Smtp']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/mail-transfer-agent
sidebar:
  order: 2
---

## 핵심 개념

MTA의 주요 작업: (1) 원격 서버에서 이메일 수신, (2) 수신자 주소 이해, (3) 배달 에이전트가 이해하는 형식으로 주소 재작성, (4) 다음 책임 서버로 전달 또는 로컬 배달 에이전트에 전달.

세 가지 주요 오픈소스 MTA:

**sendmail**: 원조 UNIX MTA. m4 매크로 전처리기로 설정. 시장 점유율 감소 추세. /etc/mail/sendmail.cf 설정 파일. 복잡하지만 기능이 풍부하다.

**Exim**: Philip Hazel(케임브리지 대학)이 작성. 라우터와 트랜스포트라는 드라이버 구조. 강력한 설정 언어. Debian 기본 MTA. 설정은 복잡하지만 문서화가 잘 되어 있다.

**Postfix**: Wietse Venema(IBM 연구소)가 개발. 보안을 최우선으로 설계. 여러 작은 프로그램이 협력하는 아키텍처. macOS 기본 MTA(10.3 이후). main.cf와 master.cf로 설정. 가장 빠르고 간단하다.

2017년 시장 점유율: Exim(56%), Postfix(33%), sendmail(4%). sendmail에서 Exim/Postfix로의 이동 추세가 뚜렷하다.

## 예시

```bash
# sendmail 버전 확인
sendmail -bt -d0.1 </dev/null

# Exim 설정 검증
exim -bV

# Postfix 기본 설정 확인
postconf -n  # 기본값과 다른 설정만 출력
postconf -d  # 기본값 출력

# 메일 큐 확인 (모든 MTA 공통)
mailq

# Postfix 시작/중지
sudo postfix start
sudo postfix stop

# sendmail 데몬 모드 시작
sudo sendmail -bd -q30m
```

## 관련 개념

- [SMTP (간이 우편 전송 프로토콜)](/knowledge/network/smtp/)
- [이메일 아키텍처 (Email Architecture)](/knowledge/network/email-architecture/)
- [Postfix (메일 전송 에이전트)](/knowledge/network/postfix/)
- [메일 별칭 (Mail Aliases)](/knowledge/network/mail-aliases/)
- [DNS MX 레코드 (DNS MX Record)](/knowledge/network/dns-mx-record/)
