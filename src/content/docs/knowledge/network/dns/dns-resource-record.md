---
title: "DNS Resource Record"
description: "DNS 리소스 레코드(Resource Record, RR)는 DNS 데이터베이스의 기본 단위로, 이름(보통 호스트명), 레코드 유형, 데이터 값으로 구성된 텍스트 레코드이며, DNS 시스템 전체에서 흐르고 캐시되는 정보의 공통 언어이다"
tags: ['DNS Resource Record', 'Rr', 'Zone File', 'DNS', 'Record Type']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-resource-record
sidebar:
  order: 5
---

## 핵심 개념

**리소스 레코드의 기본 형식:**
```
[name] [ttl] [class] type data
```
- **name**: 레코드가 설명하는 엔티티. 절대 이름은 마침표로 끝나고, 상대 이름에는 현재 오리진이 추가됨
- **ttl**: 레코드가 캐시될 수 있는 시간(초). $TTL 지시어로 기본값 설정
- **class**: 네트워크 유형. 실무에서는 항상 IN(Internet)
- **type**: 레코드 유형 (A, AAAA, NS, MX, CNAME, PTR, SOA, SRV, TXT 등)

**리소스 레코드의 네 가지 그룹:**
1. **존 인프라 레코드**: SOA, NS - 도메인과 네임 서버를 식별
2. **기본 레코드**: A, AAAA, PTR, MX, CNAME - 이름-주소 매핑과 메일 라우팅
3. **보안 레코드**: DS, DNSKEY, RRSIG, NSEC, NSEC3 - DNSSEC 인증과 서명
4. **선택적 레코드**: SRV, TXT - 서비스 위치와 추가 정보

**TTL 관리**: TTL을 높이면(약 1주) 네트워크 트래픽과 DNS 부하가 감소하지만, 캐시된 레코드를 강제로 폐기할 수 없다. 대규모 재번호 작업 전에는 최소 1주 전에 TTL을 낮추어(약 1시간) 이전 레코드가 만료되도록 해야 한다.

## 예시

```bash
# 주요 레코드 유형 예시
# A 레코드 (이름 -> IPv4 주소)
# ns1        IN  A    63.173.189.1

# AAAA 레코드 (이름 -> IPv6 주소)
# ns1        IN  AAAA 2001:db8::1

# PTR 레코드 (IP -> 이름, 역방향)
# 1          IN  PTR  ns1.atrust.com.

# MX 레코드 (메일 라우팅)
# @          IN  MX 10 mailserver.atrust.com.

# CNAME 레코드 (별칭)
# www        IN  CNAME webserver.atrust.com.

# NS 레코드 (네임 서버)
# @          IN  NS   ns1.atrust.com.

# TXT 레코드 (임의 텍스트)
# @          IN  TXT  "v=spf1 mx -all"
```

## 관련 개념

- [dns-zone](/knowledge/network/dns-zone/) - 리소스 레코드가 저장되는 존
- [soa-record](/knowledge/network/soa-record/) - 존의 시작 레코드
- [dns-a-record](/knowledge/network/dns-a-record/) - 이름-주소 매핑 레코드
- [dns-ptr-record](/knowledge/network/dns-ptr-record/) - 역방향 매핑 레코드
- [dns-cname-record](/knowledge/network/dns-cname-record/) - 별칭 레코드
- [dns-mx-record](/knowledge/network/dns-mx-record/) - 메일 교환 레코드
- [dns-srv-record](/knowledge/network/dns-srv-record/) - 서비스 위치 레코드
- [dns-txt-record](/knowledge/network/dns-txt-record/) - 텍스트 정보 레코드
- [dnssec](/knowledge/network/dnssec/) - 보안 레코드 (RRSIG, DNSKEY 등)
