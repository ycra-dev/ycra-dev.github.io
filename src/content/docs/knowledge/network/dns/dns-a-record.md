---
title: "DNS A and AAAA Records"
description: "A 레코드는 호스트 이름을 IPv4 주소로 매핑하는 DNS 레코드(RFC1035)이고, AAAA 레코드는 호스트 이름을 IPv6 주소로 매핑하는 레코드(RFC3596)로, 두 레코드 모두 DNS 데이터베이스의 핵심이다"
tags: ['DNS A Record', 'Aaaa Record', 'Address Record', 'Ipv4', 'Ipv6', 'DNS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-a-record
sidebar:
  order: 9
---

## 핵심 개념

**A 레코드**: DNS 데이터베이스의 심장부. 호스트는 일반적으로 각 네트워크 인터페이스마다 하나의 A 레코드를 가진다. 동일한 호스트 이름에 여러 A 레코드를 할당하면 라운드 로빈 DNS 로드 밸런싱이 가능하다.

**AAAA 레코드**: A 레코드의 IPv6 등가물. IPv6 레코드를 DNS 존에 발행하는 것이 반드시 IPv6를 통한 DNS 쿼리 응답을 의미하지는 않는다. 레코드는 전달에 사용된 전송 프로토콜과 독립적이다.

**존 정점(Apex)의 제약**: RFC1034에 따르면 존의 정점(예: example.com)은 반드시 A 또는 AAAA 레코드로 해석되어야 하며, CNAME 레코드는 사용할 수 없다. 클라우드 환경에서 서버 IP가 변경될 수 있는 경우 문제가 되므로, AWS Route 53이나 CloudFlare 같은 관리형 DNS 제공자가 CNAME처럼 설정하되 실제로는 A 레코드를 서비스하는 우회 방법을 제공한다.

A 레코드와 PTR 레코드는 반드시 일치해야 한다. 불일치하거나 누락된 PTR 레코드는 인증 실패를 유발하여 시스템 속도 저하와 서비스 거부 공격을 촉진할 수 있다.

## 예시

```bash
# A 레코드 (존 파일)
# ns1        IN  A    63.173.189.1
# www        IN  A    63.173.189.10

# AAAA 레코드 (존 파일)
# ns1        IN  AAAA 2001:db8:a13::1
# 각 콜론 구분 청크는 4자리 16진수 (선행 0 생략 가능)
# :: 는 나머지를 0으로 채움

# 라운드 로빈 DNS (같은 이름에 여러 A 레코드)
# www        IN  A    10.0.0.1
# www        IN  A    10.0.0.2
# www        IN  A    10.0.0.3

# A 레코드 조회
dig example.com A
dig example.com AAAA
```

## 관련 개념

- [dns-resource-record](/knowledge/network/dns-resource-record/) - A/AAAA를 포함하는 레코드 체계
- [dns-ptr-record](/knowledge/network/dns-ptr-record/) - A 레코드의 역방향 매핑 대응물
- [dns-cname-record](/knowledge/network/dns-cname-record/) - A 레코드의 별칭 레코드
- [ipv4](/knowledge/linux/ipv4/) - A 레코드가 매핑하는 주소 체계
- [ipv6](/knowledge/linux/ipv6/) - AAAA 레코드가 매핑하는 주소 체계
- [dns-caching](/knowledge/network/dns-caching/) - A/AAAA 레코드의 TTL 기반 캐싱
