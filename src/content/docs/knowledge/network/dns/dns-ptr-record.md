---
title: "DNS PTR Record"
description: "PTR(Pointer) 레코드는 IP 주소를 호스트 이름으로 역방향 매핑하는 DNS 레코드(RFC1035)로, IPv4에서는 in-addr"
tags: ['DNS Ptr Record', 'Reverse DNS', 'In Addr Arpa', 'Ip6 Arpa', 'DNS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-ptr-record
sidebar:
  order: 10
---

## 핵심 개념

DNS는 이름(오른쪽이 중요)과 IP 주소(왼쪽이 중요)를 동일 시스템으로 관리하기 위해, 역방향 매핑에서 IP 주소의 옥텟을 역순으로 나열한다.

**IPv4 역방향 매핑**: 예를 들어 호스트 ns1.atrust.com(63.173.189.1)의 PTR 레코드는 189.173.63.in-addr.arpa 존에서 "1 IN PTR ns1.atrust.com."로 정의된다.

**IPv6 역방향 매핑**: "니블(nibble)" 형식으로, AAAA 주소의 각 16진수 자릿수를 역순으로 나열하고 ip6.arpa를 추가한다. 매우 길어서 관리가 어렵다.

**A 레코드와 PTR 레코드의 일치**: 반드시 일치해야 한다. 불일치하거나 누락된 PTR 레코드는:
- 인증 실패로 시스템 속도 저하
- 서비스 거부 공격 촉진
- 많은 서비스(SSH, SMTP 등)가 역방향 조회를 수행

**서브넷 경계 문제**: 바이트 경계로 정의된 서브넷에서는 정상 동작하지만, /26 같은 비바이트 경계 서브넷에서는 RFC2317의 CNAME 트릭이 필요하다.

정방향과 역방향은 다른 DNS 네임스페이스 영역이므로 별도의 존으로 구성하며, 각각 별도의 SOA 레코드와 리소스 레코드를 가진다.

## 예시

```bash
# IPv4 PTR 레코드 (189.173.63.in-addr.arpa 존 파일)
# $ORIGIN 189.173.63.in-addr.arpa.
# 1    IN  PTR  ns1.atrust.com.

# 역방향 조회
dig -x 63.173.189.1

# IPv6 PTR 레코드 (매우 긴 형태)
# 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.3.1.a.0.b.6.8.8.1.0.0.2.ip6.arpa.
#   IN PTR ns1.atrust.com.

# named.conf의 역방향 존 설정
# zone "189.173.63.in-addr.arpa" {
#     type master;
#     file "63.173.189.rev";
# };
```

## 관련 개념

- [dns-resource-record](/knowledge/network/dns-resource-record/) - PTR을 포함하는 레코드 체계
- [dns-a-record](/knowledge/network/dns-a-record/) - PTR의 정방향 매핑 대응물
- [dns-zone](/knowledge/network/dns-zone/) - 역방향 존의 관리
- [fqdn](/knowledge/network/fqdn/) - PTR이 반환하는 완전 수식 이름
- [ip-address](/knowledge/linux/ip-address/) - PTR이 매핑하는 주소
