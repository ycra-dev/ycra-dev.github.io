---
title: "DNS Resolution"
description: "DNS 해석(DNS Resolution)은 사람이 읽을 수 있는 호스트명(예: google"
tags: ['DNS', 'Name Resolution', 'Networking', 'Resolv Conf', 'Hostname']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dns-resolution
sidebar:
  order: 26
---

## 핵심 개념

DNS 클라이언트 구성의 핵심 파일은 /etc/resolv.conf이다. 이 파일에는 불완전한 호스트명을 완성하기 위해 검색할 DNS 도메인과 이름 조회를 수행할 네임서버의 IP 주소가 나열된다. 최대 3개의 네임서버를 지정할 수 있으며, 순서대로 접촉한다.

호스트명-IP 매핑의 관리 옵션:
- **/etc/hosts**: 가장 오래된 방식. 부팅 시 필요한 매핑(자기 자신, 기본 게이트웨이, 네임서버)에 적합
- **DNS**: 확장성 있는 글로벌 시스템. 대부분의 이름 해석에 사용
- **LDAP**: 디렉터리 기반 중앙 관리
- **nsswitch.conf**: 이름 해석 소스의 순서를 결정

DNS 문제는 시스템 전체에 영향을 미친다:
- 부팅 시 행이 걸리거나 SSH 연결이 느려지면 DNS 문제를 의심
- nscd(name service caching daemon)가 잘못 구성되거나 충돌하면 이름 조회에 영향
- getent 명령으로 리졸버와 네임서버의 정상 동작 확인 가능

DHCP를 사용하면 DNS 서버 주소가 자동으로 resolv.conf에 설정된다. Microsoft Active Directory DNS 서버도 표준 resolv.conf와 호환된다.

## 예시

```bash
# /etc/resolv.conf 예시
# search cs.colorado.edu colorado.edu
# nameserver 128.138.243.151
# nameserver 128.138.204.4

# /etc/hosts 예시
# 127.0.0.1       localhost
# 192.168.1.10    myhost.example.com myhost
# 192.168.1.1     gateway

# DNS 해석 테스트
getent hosts google.com

# nslookup으로 DNS 조회
nslookup google.com

# dig으로 상세 DNS 조회
dig google.com

# 호스트명 설정
sudo hostnamectl set-hostname myhost.example.com

# /etc/nsswitch.conf에서 이름 해석 순서 확인
# hosts: files dns
# (files = /etc/hosts 먼저, 그 다음 dns)
```

## 관련 개념

- [ip-address](/knowledge/linux/ip-address/) - DNS가 매핑하는 대상 주소
- [dhcp](/knowledge/linux/dhcp/) - DNS 서버 주소를 자동 구성
- [network-interface](/knowledge/linux/network-interface/) - DNS 설정이 필요한 네트워크 구성
- [ldap](/knowledge/linux/ldap/) - DNS의 대안적 이름 해석 시스템
- [ping](/knowledge/linux/ping/) - DNS 문제 진단에 활용
