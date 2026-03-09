---
title: "DNS CNAME Record"
description: "CNAME(Canonical Name) 레코드는 호스트에 추가적인 이름(별칭)을 부여하는 DNS 레코드(RFC1035)로, 기능을 호스트와 연결하거나 긴 호스트 이름을 줄이는 데 사용되며, 최대 8단계까지 중첩이 가능하다"
tags: ['DNS Cname Record', 'Alias', 'Canonical Name', 'DNS', 'Indirection']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-cname-record
sidebar:
  order: 11
---

## 핵심 개념

DNS 소프트웨어는 CNAME 레코드를 만나면 별칭에 대한 쿼리를 중단하고 실제 이름(canonical name)에 대해 다시 쿼리한다.

**CNAME 규칙:**
- CNAME을 가진 호스트의 다른 레코드(A, MX, NS 등)는 반드시 실제 이름을 참조해야 함
- CNAME은 8단계까지 중첩 가능 (CNAME -> CNAME -> ... -> 실제 호스트)
- PTR 레코드는 별칭이 아닌 실제 이름을 가리켜야 함
- DNSSEC의 RRSIG 레코드는 별칭을 참조할 수 있음 (규칙의 예외)

**존 정점(Apex)에서의 CNAME 금지**: RFC1034에 따라 존의 정점(예: example.com)에는 CNAME을 사용할 수 없고 반드시 A/AAAA 레코드를 사용해야 한다. 클라우드 환경에서 IP가 변경되는 경우, AWS Route 53이나 CloudFlare 같은 관리형 DNS가 CNAME처럼 설정하되 실제로는 A 레코드를 서비스하는 우회 기능을 제공한다.

**CNAME 대안**: 실제 이름과 별칭 모두에 A 레코드를 발행하면 CNAME의 간접 참조 계층이 불필요해져 조회가 약간 더 빠르다. 현대 DNS 서버는 CNAME의 대상에 대한 A 레코드를 자동으로 응답에 포함하여 이 차이를 줄였다.

## 예시

```bash
# CNAME 레코드 예시 (존 파일)
# ftp        IN  CNAME  nubark.atrust.com.
# www        IN  CNAME  nubark.atrust.com.
# mail       IN  CNAME  mailserver.atrust.com.

# CNAME 대신 A 레코드로 별칭 구현
# ftp        IN  A    63.173.189.1
# www        IN  A    63.173.189.1
# nubark     IN  A    63.173.189.1

# 존 정점 - 올바른 사용
# atrust.com.  IN  A  63.173.189.1  (올바름)

# 존 정점 - 잘못된 사용
# atrust.com.  IN  CNAME  other.example.com.  (금지!)

# CNAME 조회
dig www.example.com CNAME
```

## 관련 개념

- [dns-resource-record](/knowledge/network/dns-resource-record/) - CNAME을 포함하는 레코드 체계
- [dns-a-record](/knowledge/network/dns-a-record/) - CNAME이 궁극적으로 가리키는 레코드
- [dns-zone](/knowledge/network/dns-zone/) - CNAME이 속하는 존
- [dns-ptr-record](/knowledge/network/dns-ptr-record/) - CNAME이 아닌 실제 이름을 참조해야 하는 레코드
