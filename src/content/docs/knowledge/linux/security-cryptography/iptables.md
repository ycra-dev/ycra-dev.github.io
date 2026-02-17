---
title: "iptables"
description: "iptables는 Linux 커널의 netfilter 프레임워크를 사용하여 네트워크 패킷의 필터링, NAT, 포트 포워딩 등을 수행하는 호스트 기반 패킷 필터링 도구이다"
tags: ['Security', 'Linux', 'Packet Filtering', 'Firewall', 'Netfilter']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/iptables
sidebar:
  order: 7
---

## 핵심 개념

iptables는 Linux 시스템에서 호스트 수준의 방화벽 역할을 하며, 인터넷 게이트웨이의 방화벽과 함께 이중 방어(defense in depth)를 구성한다. ufw(Uncomplicated Firewall)는 iptables의 사용 편의성을 높인 프론트엔드이다.

**패킷 필터링 원칙:**
- 호스트에서 실행 중인 서비스를 확인하고, 해당 서비스 포트만 열어둔다
- 경우에 따라 소스 주소를 제한하여 특정 포트에 접근할 수 있는 대상을 제한한다
- 대부분의 시스템은 1~2개의 포트만 접근 가능하면 된다
- 가장 안전한 방법은 모든 인바운드 연결을 차단한 후 필요한 서비스만 허용하는 것이다

**서비스 포트 분류:**
- 특권 포트(1-1023): root(또는 적절한 Linux capability) 권한이 필요
- 비특권 포트(1024 이상): 일반 사용자도 사용 가능

Linux에서는 ss 명령으로 네트워크 포트 사용 현황을 확인할 수 있으며(netstat에서 전환 중), lsof로 특정 포트를 사용하는 프로세스를 파악할 수 있다.

## 예시

```bash
# 현재 실행 중인 서비스와 포트 확인
sudo ss -tlnp         # TCP 리스닝 소켓
sudo lsof -i -P -n    # 네트워크 연결 프로세스

# iptables 규칙 확인
sudo iptables -L -n -v

# 특정 서비스만 허용하는 규칙 설정
sudo iptables -F                                    # 기존 규칙 초기화
sudo iptables -P INPUT DROP                         # 기본 정책: 차단
sudo iptables -A INPUT -i lo -j ACCEPT              # 루프백 허용
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # SSH
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT # HTTPS

# 소스 IP 제한
sudo iptables -A INPUT -p tcp -s 10.0.0.0/8 --dport 3306 -j ACCEPT

# ufw 사용 예시 (간편한 프론트엔드)
sudo ufw allow from 192.168.1.0/24 to any port 22
```

## 관련 개념

- [firewall](/knowledge/linux/firewall/) - 방화벽의 개념과 유형
- [ssh](/knowledge/linux/ssh/) - iptables로 보호해야 할 핵심 서비스
- [linux-capabilities](/knowledge/linux/linux-capabilities/) - 특권 포트 바인딩에 필요한 권한
- [network-monitoring](/knowledge/linux/network-monitoring/) - 네트워크 상태 모니터링
