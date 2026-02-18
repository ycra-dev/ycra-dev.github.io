---
title: "DNS Resolver"
description: "DNS 리졸버(Resolver)는 호스트의 DNS 클라이언트 구성으로, /etc/resolv"
tags: ['DNS Resolver', 'Resolv.conf', 'Nsswitch.conf', 'Name Resolution', 'DNS Client']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-resolver
sidebar:
  order: 3
---

## 핵심 개념

**resolv.conf 설정**: 최대 3개의 네임 서버를 나열할 수 있으며, 순서대로 접근한다. 첫 번째 서버가 응답하는 한 나머지는 무시된다. 각 서버는 최대 4번까지 순차 시도하며, 기본 타임아웃은 5초이다.

주요 설정 항목:
- **nameserver**: 쿼리할 DNS 서버의 IP 주소
- **search**: 호스트 이름이 완전 수식이 아닐 때 추가할 도메인 목록. 예를 들어 search atrust.com booklab.atrust.com을 설정하면, ssh coraline 명령 시 coraline.atrust.com을 먼저 시도

DHCP를 사용하면 resolv.conf가 자동으로 설정되지만, 그렇지 않으면 수동 편집이 필요하다.

**nsswitch.conf 설정**: 호스트 이름-IP 주소 매핑을 수행하는 방법과 우선순위를 지정한다:
- `hosts: files dns` - /etc/hosts를 먼저 확인, DNS는 그 후
- 부팅 시 DNS 서버가 사용 불가능한 경우에도 /etc/hosts를 통해 기본적인 이름 해석이 가능

**중요**: resolv.conf에 나열된 네임 서버는 반드시 재귀적(recursive)이어야 한다. 리졸버 라이브러리는 참조(referral)를 이해하지 못하므로, 비재귀적 서버는 사용할 수 없다.

## 예시

```bash
# /etc/resolv.conf 예시
# search atrust.com booklab.atrust.com
# nameserver 63.173.189.1
# nameserver 63.173.189.2
# nameserver 198.11.16.25

# /etc/nsswitch.conf 예시
# hosts: files dns
# -> /etc/hosts를 먼저 확인, 없으면 DNS 조회

# /etc/hosts 파일 (정적 매핑)
# 127.0.0.1   localhost
# 192.168.1.10 webserver.example.com webserver

# resolv.conf 동작 테스트
getent hosts google.com

# DNS 조회 우선순위 확인
python3 -c "import socket; print(socket.getaddrinfo('google.com', None))"
```

## 관련 개념

- [dns](/knowledge/network/dns/) - 리졸버가 접근하는 도메인 이름 시스템
- [dhcp](/knowledge/linux/dhcp/) - resolv.conf를 자동 설정하는 프로토콜
- [dns-caching](/knowledge/network/dns-caching/) - 네임 서버의 캐싱 동작
- [bind](/knowledge/network/bind/) - 리졸버가 쿼리하는 DNS 서버 소프트웨어
- [nsswitch](/knowledge/linux/nsswitch/) - 이름 서비스 전환 설정
