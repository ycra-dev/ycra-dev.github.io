---
title: "DNS (Domain Name System)"
description: "DNS(Domain Name System)는 호스트 이름(예: google"
tags: ['DNS', 'Domain Name', 'Name Resolution', 'Distributed Database', 'Internet']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dns
sidebar:
  order: 1
---

## 핵심 개념

DNS는 분산 데이터베이스 모델을 사용한다. 각 사이트가 자신이 알고 있는 컴퓨터의 데이터를 저장하고, 다른 사이트의 데이터를 조회할 때 상호 협력한다.

**DNS의 주요 기능:**
- 호스트 이름에서 IP 주소로의 정방향 매핑(Forward Mapping)
- IP 주소에서 호스트 이름으로의 역방향 매핑(Reverse Mapping)
- 메일 라우팅(MX 레코드)
- 서비스 위치 확인(SRV 레코드)
- 도메인 보안(DNSSEC)

**DNS 쿼리 과정:**
1. 사용자가 브라우저에 도메인 이름 입력
2. 브라우저가 DNS 리졸버 라이브러리 호출
3. 리졸버가 네임 서버에 쿼리 전송
4. 네임 서버가 계층적 위임(delegation)을 따라 답변 반환
5. 브라우저가 반환된 IP 주소로 TCP 연결

**DNS 관리 옵션:**
- 자체 DNS 서버 운영 (BIND 등)
- 관리형 DNS 서비스 사용 (Route 53, CloudFlare, GoDaddy 등)
- 내부 DNS: Microsoft Active Directory (외부용으로 부적합)

DNS 없이는 인터넷이 오래 전에 실패했을 것이다. 수백 호스트에서 30억+ 사용자로 성장한 정보 시스템 중 이렇게 적은 문제로 이 규모까지 성장한 것은 다른 곳에서 찾기 어렵다.

## 예시

```bash
# DNS 쿼리 도구
dig google.com                  # A 레코드 조회
dig google.com MX               # MX 레코드 조회
dig +trace google.com           # 루트부터 위임 추적
dig @8.8.8.8 google.com         # 특정 네임서버에 쿼리
dig -x 8.8.8.8                  # 역방향 조회 (PTR)

# host 명령 (간단한 출력)
host google.com
host -t MX google.com

# nslookup (전통적 도구)
nslookup google.com

# DNS 클라이언트 설정
cat /etc/resolv.conf
# nameserver 8.8.8.8
# nameserver 8.8.4.4
# search example.com
```

## 관련 개념

- [dns-zone](/knowledge/linux/dns-zone/) - DNS 데이터의 관리 단위
- [dns-resource-record](/knowledge/linux/dns-resource-record/) - DNS 데이터베이스의 레코드 유형
- [dns-resolver](/knowledge/linux/dns-resolver/) - DNS 클라이언트 설정
- [bind](/knowledge/linux/bind/) - 가장 널리 사용되는 DNS 서버 소프트웨어
- [dns-delegation](/knowledge/linux/dns-delegation/) - DNS 계층 구조의 위임 메커니즘
- [dns-caching](/knowledge/linux/dns-caching/) - DNS 효율성을 높이는 캐싱 메커니즘
- [dnssec](/knowledge/linux/dnssec/) - DNS의 암호화 보안 확장
- [fqdn](/knowledge/linux/fqdn/) - 정규화된 도메인 이름
