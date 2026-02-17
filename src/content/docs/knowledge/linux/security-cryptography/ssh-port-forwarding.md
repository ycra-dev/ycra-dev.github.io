---
title: "SSH Port Forwarding"
description: "SSH 포트 포워딩은 SSH의 암호화된 채널을 통해 TCP 연결을 안전하게 터널링하여, 방화벽 뒤에 있거나 보안이 취약한 원격 서비스에 접근할 수 있게 하는 기능이다"
tags: ['Security', 'Ssh', 'Tunneling', 'Network', 'Port Forwarding']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ssh-port-forwarding
sidebar:
  order: 19
---

## 핵심 개념

SSH 포트 포워딩은 방화벽으로 차단된 서비스에 대한 연결을 SSH 서버를 경유하여 라우팅할 수 있게 한다.

**동작 방식:**
1. 사용자가 SSH 서버에 접속하면서 로컬 포트와 원격 목적지를 지정
2. 로컬 포트로 들어오는 트래픽이 SSH 터널을 통해 원격 SSH 서버로 전달
3. SSH 서버가 트래픽을 지정된 목적지 호스트/포트로 포워딩

**로컬 포트 포워딩(-L):**
로컬 머신의 특정 포트를 원격 서비스에 연결. 방화벽 뒤의 웹 서버 접근 등에 사용

**보안 고려사항:**
- 터널은 의도적이거나 비의도적인 백도어가 될 수 있다
- sshd에서 `AllowTCPForwarding no`로 포트 포워딩을 비활성화 가능
- 사용자의 무단 터널 사용을 감시해야 한다

## 예시

```bash
# 로컬 포트 포워딩: 로컬 8000 -> 원격 웹서버:80
ssh -L 8000:webserver.internal:80 user@ssh-gateway.com
# 이후 http://localhost:8000 으로 접속하면 webserver.internal:80에 연결

# 원격 포트 포워딩: 원격 8080 -> 로컬 3000
ssh -R 8080:localhost:3000 user@remote-server.com

# 동적 포트 포워딩 (SOCKS 프록시)
ssh -D 1080 user@ssh-gateway.com
# 브라우저에서 SOCKS 프록시 localhost:1080 설정

# 백그라운드에서 터널만 유지 (-f: 백그라운드, -N: 명령 없음)
ssh -f -N -L 3306:db.internal:3306 user@ssh-gateway.com

# sshd에서 포트 포워딩 비활성화
# /etc/ssh/sshd_config:
# AllowTcpForwarding no
```

## 관련 개념

- [ssh](/knowledge/linux/ssh/) - SSH 포트 포워딩의 기반 프로토콜
- [firewall](/knowledge/linux/firewall/) - 포트 포워딩으로 방화벽 우회 가능성
- [vpn](/knowledge/linux/vpn/) - 포트 포워딩의 확장된 형태
- [iptables](/knowledge/linux/iptables/) - 네트워크 수준 포트 제어
