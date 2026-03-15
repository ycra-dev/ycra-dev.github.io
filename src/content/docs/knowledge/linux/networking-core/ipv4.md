---
title: "IPv4 (인터넷 프로토콜 버전 4)"
description: "IPv4(Internet Protocol version 4)는 4바이트(32비트) 주소 체계를 사용하는 인터넷 프로토콜의 네 번째 개정판으로, 거의 50년간 사용되어 온 TCP/IP 네트워킹의 주류 버전이다"
tags: ['Ipv4', 'IP Address', 'Networking', 'Subnetting', 'TCP IP']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ipv4
sidebar:
  order: 2
---

## 핵심 개념

IPv4 주소는 점으로 구분된 십진수 표기법(dotted decimal notation)으로 각 바이트를 10진수로 표현한다 (예: 209.85.171.147). 주소는 네트워크 부분과 호스트 부분으로 구성되며, 그 경계는 서브넷 마스크에 의해 관리적으로 설정된다.

역사적으로 IP 주소에는 A, B, C, D, E 다섯 가지 클래스가 있었다:
- **Class A**: 첫 바이트가 네트워크, 나머지 3바이트가 호스트 (최대 16,777,214 호스트)
- **Class B**: 첫 2바이트가 네트워크, 나머지 2바이트가 호스트 (최대 65,534 호스트)
- **Class C**: 첫 3바이트가 네트워크, 마지막 1바이트가 호스트 (최대 254 호스트)

현재는 CIDR로 이 고정 분류를 대체하여 더 유연한 주소 관리가 가능하다. 특수 주소로는 127.0.0.1(루프백/localhost)이 있으며, RFC1918에서 정의한 사설 주소 공간(10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)이 내부 네트워크에서 사용된다.

IPv4 주소 고갈은 현실이 되었지만(아시아 태평양 지역이 2011년 최초로 소진), NAT와 CIDR 등의 기술로 효율적 재사용이 이루어지고 있다.

## 예시

```bash
# IPv4 주소 설정 (Linux)
sudo ip address add 192.168.1.10/24 broadcast 192.168.1.255 dev enp0s5

# IPv4 주소 확인
ip address show

# 서브넷 계산 도구
ipcalc 128.138.243.100/26

# 주소 클래스별 기본 넷마스크
# Class A: 255.0.0.0 (/8)
# Class B: 255.255.0.0 (/16)
# Class C: 255.255.255.0 (/24)

# /etc/hosts 파일 예시
# 127.0.0.1       localhost
# 192.168.1.10    myserver.example.com myserver
# 192.168.1.1     gateway.example.com gateway
```

## 관련 개념

- [IPv6 (인터넷 프로토콜 버전 6)](/knowledge/linux/ipv6/) - IPv4의 후속 프로토콜
- [서브넷 마스크 (Subnet Mask)](/knowledge/linux/subnet-mask/) - 네트워크/호스트 경계 정의
- [CIDR (클래스리스 라우팅)](/knowledge/linux/cidr/) - 클래스 없는 유연한 주소 할당
- [NAT (네트워크 주소 변환)](/knowledge/linux/nat/) - 주소 고갈 대응 기술
- [IP 주소 (IP Address)](/knowledge/linux/ip-address/) - IP 주소 체계 일반
- [DHCP (동적 호스트 구성 프로토콜)](/knowledge/linux/dhcp/) - 동적 IP 주소 할당
