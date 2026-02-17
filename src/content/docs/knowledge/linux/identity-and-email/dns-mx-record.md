---
title: "DNS MX Record"
description: "DNS MX(Mail Exchanger) 레코드는 특정 도메인에 대한 이메일을 수신할 책임이 있는 메일 서버를 지정하는 DNS 리소스 레코드(RFC1035)로, 우선순위(preference) 값을 통해 메일 서버의 선호도를 결정하며 사이트의 메일 흐름을 로컬 관리..."
tags: ['DNS', 'Mx Record', 'Email', 'Mail Routing', 'Domain', 'Resource Record']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dns-mx-record
sidebar:
  order: 13
---

## 핵심 개념

MX 레코드는 이메일 라우팅의 핵심이다. 발신 MTA가 수신 도메인에 메일을 보낼 때, 먼저 해당 도메인의 MX 레코드를 조회하여 메일을 전달할 서버를 결정한다. MX 레코드가 없으면 A 레코드를 시도한다.

**우선순위 체계**: 낮은 preference 값이 높은 우선순위를 의미한다(0이 최우선, 65535가 최저). 높은 우선순위 서버가 응답하지 않으면 다음 서버로 시도한다. MX 레코드에 명시된 어떤 서버도 응답하지 않으면 원래 주소로 직접 전달을 시도한다.

**MX 레코드의 활용:**
- 중앙 메일 허브나 서비스 제공자로 메일을 집중
- 스팸/바이러스 필터링을 위한 중간 서버 경유
- 목적지 호스트가 다운되었거나 인터넷에서 직접 접근 불가능한 경우 대체 경로 제공
- 로컬 관리자가 외부 발신자보다 메일 경로를 더 잘 제어

**와일드카드 MX 레코드**: *.domain.com 형태의 와일드카드 MX는 기존 리소스 레코드에 명시되지 않은 이름만 매칭하므로, 모든 호스트의 기본값 설정 용도로 사용할 수 없다. 사용을 피하는 것이 권장된다.

## 예시

```bash
# MX 레코드 조회
dig example.com MX

# DNS 존 파일의 MX 레코드 예시
# somehost   IN  MX  10  mailserver.atrust.com.
#            IN  MX  20  mail-relay3.atrust.com.
# preference 10이 기본 서버, 20이 백업 서버

# MX 레코드의 일반적 구성
# domain.com.  IN  MX  0   primary-mail.domain.com.
# domain.com.  IN  MX  10  backup-mail.domain.com.
# domain.com.  IN  MX  50  offsite-backup.provider.com.
```

## 관련 개념

- [dns-resource-record](/knowledge/linux/dns-resource-record/) - MX를 포함하는 DNS 레코드 체계
- [dns](/knowledge/linux/dns/) - MX 레코드가 속하는 도메인 이름 시스템
- [smtp](/knowledge/linux/smtp/) - MX 레코드를 조회하여 메일을 라우팅하는 프로토콜
- [postfix](/knowledge/linux/postfix/) - MX 레코드 기반 메일 전달 MTA
- [spf](/knowledge/linux/spf/) - 도메인의 메일 발신 서버를 인증하는 DNS 메커니즘
- [dns-a-record](/knowledge/linux/dns-a-record/) - MX 대상 호스트의 IP 주소를 제공하는 레코드
