---
title: "DNS SRV Record"
description: "SRV(Service) 레코드는 도메인 내에서 특정 서비스의 위치를 지정하는 DNS 레코드(RFC2782)로, MX 레코드를 일반화한 형태이며 우선순위, 가중치, 포트 필드를 통해 서비스의 조향과 로드 밸런싱을 가능하게 한다"
tags: ['DNS Srv Record', 'Service Location', 'Load Balancing', 'DNS', 'Rfc2782']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dns-srv-record
sidebar:
  order: 12
---

## 핵심 개념

SRV 레코드는 원격 도메인의 특정 서비스(FTP, SSH, HTTP 등) 서버를 쿼리할 수 있게 한다. CNAME보다 이 용도에 더 적합하지만, 클라이언트가 명시적으로 SRV 레코드를 조회하고 파싱해야 하므로 모든 곳에서 사용되지는 않는다. Windows 환경에서 광범위하게 사용된다.

**SRV 레코드 형식:**
```
_service._proto.name  ttl  IN  SRV  priority weight port target
```
- **service**: IANA 할당 번호 데이터베이스에 정의된 서비스
- **proto**: tcp 또는 udp
- **priority**: MX 스타일 우선순위 (낮을수록 우선)
- **weight**: 동일 우선순위 서버 간 로드 밸런싱 (0 = 특별한 로드 밸런싱 없음)
- **port**: 서비스가 실행되는 포트
- **target**: 서비스를 제공하는 호스트 이름 ("." = 해당 서비스 미제공)

DNS 서버는 보통 SRV 응답에 대상 호스트의 A 레코드도 함께 반환하여 추가 조회를 방지한다.

## 예시

```bash
# SRV 레코드 예시 (존 파일)
# SSH 서비스 - 두 서버에 가중치 분배
# _ssh._tcp.atrust.com.  IN SRV 0 2 22 ssh1.atrust.com.
# _ssh._tcp.atrust.com.  IN SRV 0 1 22 ssh2.atrust.com.

# HTTP 서비스 - 기본 + 백업 서버
# _http._tcp.atrust.com. IN SRV 0 0 80 www1.atrust.com.
# _http._tcp.atrust.com. IN SRV 1 0 80 www2.atrust.com.

# 다른 모든 TCP/UDP 서비스 차단
# *._tcp.atrust.com.     IN SRV 0 0 0 .
# *._udp.atrust.com.     IN SRV 0 0 0 .

# SRV 레코드 조회
dig _ssh._tcp.example.com SRV
dig _ldap._tcp.dc._msdcs.example.com SRV  # Active Directory
```

## 관련 개념

- [dns-resource-record](/knowledge/linux/dns-resource-record/) - SRV를 포함하는 레코드 체계
- [dns-mx-record](/knowledge/linux/dns-mx-record/) - SRV의 메일 전용 선구자
- [dns](/knowledge/linux/dns/) - SRV가 동작하는 도메인 이름 시스템
- [service-discovery](/knowledge/linux/service-discovery/) - SRV를 활용한 서비스 발견
- [active-directory](/knowledge/linux/active-directory/) - SRV를 광범위하게 사용하는 시스템
