---
title: "ICMP (Internet Control Message Protocol)"
description: "ICMP(Internet Control Message Protocol, RFC792)는 IP의 저수준 지원 프로토콜로, 오류 메시지(network/host unreachable), 라우팅 지원(redirect), 디버깅(echo request/reply) 등 네트..."
tags: ['Icmp', 'Networking', 'IP', 'Error Handling', 'Diagnostics']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/icmp
sidebar:
  order: 15
---

## 핵심 개념

ICMP는 TCP/IP 스택에서 IP 계층의 보조 프로토콜로 동작하며, ping과 traceroute의 기반이 된다. 주요 메시지 유형:

- **Echo Request/Reply (Type 8/0)**: ping의 기반. IP 스택 내에서 처리되므로 서버 프로세스 불필요
- **Destination Unreachable (Type 3)**: 네트워크(!N), 호스트(!H), 프로토콜(!P) 도달 불가
- **Time Exceeded (Type 11)**: TTL이 0이 되어 패킷 폐기. traceroute의 기반
- **Redirect (Type 5)**: 더 나은 경로를 알려줌. 보안 위험이 있어 비활성화 권장
- **Path MTU Discovery**: 단편화 불가(Type 3, Code 4) 메시지로 경로 MTU 발견

보안 관련 ICMP 설정:
- **브로드캐스트 ping 무시**: Smurf 공격 방지를 위해 icmp_echo_ignore_broadcasts = 1 설정
- **ICMP 리디렉트 거부**: 라우팅 테이블 변조 방지를 위해 accept_redirects = 0 설정
- **소스 라우팅 거부**: 방화벽 우회 방지를 위해 accept_source_route = 0 설정

방화벽에서 ICMP를 완전히 차단하면 Path MTU Discovery가 작동하지 않아 네트워크 성능이 저하될 수 있으므로, 최소한의 ICMP 유형은 허용해야 한다.

## 예시

```bash
# 브로드캐스트 ping 무시 설정
sudo sysctl -w net.ipv4.icmp_echo_ignore_broadcasts=1

# ICMP 리디렉트 거부
sudo sysctl -w net.ipv4.conf.all.accept_redirects=0

# 소스 라우팅 거부
sudo sysctl -w net.ipv4.conf.all.accept_source_route=0

# /etc/sysctl.conf에 영구 설정
# net.ipv4.icmp_echo_ignore_broadcasts = 1
# net.ipv4.conf.all.accept_redirects = 0
# net.ipv4.conf.all.accept_source_route = 0

# 방화벽에서 필수 ICMP 허용 (iptables)
sudo iptables -A INPUT -p icmp --icmp-type destination-unreachable -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type time-exceeded -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type echo-reply -j ACCEPT
```

## 관련 개념

- [ping](/knowledge/linux/ping/) - ICMP Echo를 사용하는 진단 도구
- [traceroute](/knowledge/linux/traceroute/) - ICMP Time Exceeded를 사용하는 경로 추적 도구
- [mtu](/knowledge/linux/mtu/) - ICMP로 경로 MTU 발견
- [routing-table](/knowledge/linux/routing-table/) - ICMP 리디렉트가 영향을 주는 라우팅
- [iptables](/knowledge/linux/iptables/) - ICMP 필터링 설정
- [sysctl](/knowledge/linux/sysctl/) - ICMP 관련 커널 매개변수 설정
