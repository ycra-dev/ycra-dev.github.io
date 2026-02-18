---
title: "DNS TXT Record"
description: "TXT 레코드는 호스트의 DNS 레코드에 임의의 텍스트를 추가하는 레코드 유형(RFC1035)으로, 특정 형식이 없기 때문에 SPF, DKIM, DMARC 등 다양한 용도로 DNS 시스템 변경 없이 정보를 배포하는 데 활용된다"
tags: ['DNS Txt Record', 'Spf', 'Dkim', 'Dmarc', 'DNS', 'Verification']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-txt-record
sidebar:
  order: 13
---

## 핵심 개념

TXT 레코드는 원래 사이트 식별 등 단순한 텍스트 정보를 제공하기 위해 설계되었으나, 형식 제약이 없다는 특성 덕분에 다양한 목적으로 활용되고 있다.

**주요 활용:**
- **SPF(Sender Policy Framework)**: 도메인의 메일 발신 서버를 인증
- **DKIM(DomainKeys Identified Mail)**: 이메일에 디지털 서명을 추가하여 발신자 인증
- **DMARC(Domain-based Message Authentication, Reporting, and Conformance)**: SPF와 DKIM의 결과를 기반으로 메일 처리 정책 정의
- 도메인 소유권 확인 (Google Workspace, Let's Encrypt 등)

**TXT 레코드 규칙:**
- 모든 정보 항목은 반드시 따옴표로 감싸야 함
- 따옴표가 균형을 이루지 않으면 이후 레코드가 사라지는 심각한 오류 발생
- 서버는 TXT 레코드를 임의 순서로 반환하므로, 긴 항목은 여러 TXT 레코드가 아닌 긴 텍스트 줄로 인코딩해야 함

SPF, DKIM, DMARC는 인터넷의 스팸 문제에 대응하기 위해 개발된 표준으로, 모두 TXT 레코드를 통해 DNS에 정보를 배포한다.

## 예시

```bash
# 사이트 식별 TXT 레코드
# atrust.com.  IN  TXT  "Applied Trust Engineering, a security company"

# SPF TXT 레코드
# atrust.com.  IN  TXT  "v=spf1 mx ip4:63.173.189.0/24 -all"

# DKIM TXT 레코드
# selector._domainkey.atrust.com. IN TXT "v=DKIM1; k=rsa; p=MIGf..."

# DMARC TXT 레코드
# _dmarc.atrust.com. IN TXT "v=DMARC1; p=reject; rua=mailto:admin@atrust.com"

# 도메인 소유권 확인
# atrust.com.  IN  TXT  "google-site-verification=abc123..."

# TXT 레코드 조회
dig example.com TXT
dig _dmarc.example.com TXT
```

## 관련 개념

- [dns-resource-record](/knowledge/network/dns-resource-record/) - TXT를 포함하는 레코드 체계
- [spf](/knowledge/network/spf/) - TXT를 통해 배포되는 메일 인증
- [dkim](/knowledge/network/dkim/) - TXT를 통해 배포되는 메일 서명
- [dns](/knowledge/network/dns/) - TXT가 동작하는 도메인 이름 시스템
