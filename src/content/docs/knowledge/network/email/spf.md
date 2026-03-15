---
title: "SPF (발신자 정책 프레임워크)"
description: "SPF(Sender Policy Framework)는 조직이 DNS 레코드를 통해 공식 발신 메일 서버를 식별하는 이메일 인증 메커니즘으로, MTA가 해당 도메인에서 발송되었다고 주장하는 이메일이 공식 소스에서 왔는지 검증할 수 있게 한다(RFC7208)"
tags: ['Spf', 'Email Security', 'DNS', 'Anti Spam', 'Sender Verification']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/spf
sidebar:
  order: 10
---

## 핵심 개념

스팸의 가장 큰 문제 중 하나는 이메일 발신자 위조(forgery)가 매우 쉽다는 것이다. SPF는 DNS 레코드를 통해 도메인의 공식 메일 서버 IP 주소를 공개하여, 수신 MTA가 해당 도메인에서 왔다고 주장하는 메일이 실제로 공식 서버에서 발송되었는지 확인할 수 있게 한다.

SPF의 근본적 한계: **릴레이된 메일에서 작동하지 않는다.** 수신자가 원래 발신자의 SPF 레코드를 조회할 때, 릴레이 서버의 IP 주소는 원래 발신자의 공식 서버 목록에 없으므로 검증이 실패한다. SPF 실패에 대한 결정은 신중해야 한다.

**DKIM(DomainKeys Identified Mail)**은 SPF를 보완하는 암호화 서명 시스템으로, 발신자 ID뿐만 아니라 메시지가 전송 중 변조되지 않았음을 검증한다. DNS 레코드로 도메인의 암호화 키와 메시지 서명 정책을 공개한다.

실제 스팸 차단에는 클라우드 기반 스팸 차단 서비스(Google G Suite, McAfee SaaS Email Protection 등)를 사용하는 것이 효과적이다. 전체 이메일의 95-98%가 스팸이라는 통계가 있다.

## 예시

```bash
# SPF DNS 레코드 예시 (TXT 레코드)
# example.com. IN TXT "v=spf1 mx ip4:203.0.113.0/24 -all"
# v=spf1: SPF 버전 1
# mx: 도메인의 MX 레코드에 나열된 서버 허용
# ip4: 특정 IP 대역 허용
# -all: 나머지 모두 거부

# SPF 레코드 조회
dig example.com TXT

# sendmail에서 dnsbl (DNS 기반 블랙리스트) 설정
# FEATURE(`dnsbl', `sbl-xbl.spamhaus.org')

# 메일 헤더에서 SPF 검증 결과 확인
# Received-SPF: pass (google.com: ...)
# Received-SPF: fail (domain of sender does not match)
# Received-SPF: neutral (no SPF record)
```

## 관련 개념

- [SMTP (간이 우편 전송 프로토콜)](/knowledge/network/smtp/)
- [DKIM (도메인키 인증 메일)](/knowledge/network/dkim/)
- [이메일 아키텍처 (Email Architecture)](/knowledge/network/email-architecture/)
- [메일 전송 에이전트 (Mail Transfer Agent)](/knowledge/network/mail-transfer-agent/)
- [DNS MX 레코드 (DNS MX Record)](/knowledge/network/dns-mx-record/)
