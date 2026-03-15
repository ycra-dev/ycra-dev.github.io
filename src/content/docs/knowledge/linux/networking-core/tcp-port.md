---
title: "TCP/UDP 포트 (TCP/UDP Port)"
description: "포트(Port)는 IP 주소를 보완하는 16비트 숫자(1-65535)로, TCP와 UDP가 네트워크를 동시에 사용하는 여러 프로세스나 서비스를 구분하기 위해 사용하는 통신 채널 식별자이다"
tags: ['TCP Port', 'UDP Port', 'Networking', 'Socket', 'Transport Layer']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/tcp-port
sidebar:
  order: 7
---

## 핵심 개념

IP 주소는 네트워크 인터페이스를 식별하지만, 하나의 기계에서 여러 네트워크 서비스가 동시에 실행될 수 있으므로 포트 번호가 추가로 필요하다. TCP와 UDP는 각각 독립적인 포트 공간을 가지며, 방화벽에서도 별도로 구성해야 한다.

포트 번호는 세 범위로 나뉜다:
- **Well-known ports (1-1023)**: SSH(22), HTTP(80), HTTPS(443), DNS(53) 등 표준 서비스용. UNIX에서는 root 권한 또는 적절한 Linux capability 없이는 바인딩 불가
- **Registered ports (1024-49151)**: IANA에 등록된 서비스용
- **Dynamic/Private ports (49152-65535)**: 임시(ephemeral) 클라이언트 포트용

표준 서비스의 포트 매핑은 /etc/services 파일에 정의되어 있다. 현대적 관행에서는 표준 서비스를 비특권 포트에서 비root 사용자로 실행하고, 로드 밸런서를 통해 트래픽을 전달하는 방식이 보안상 더 안전하다. 이 방식은 불필요한 root 권한의 확산을 방지하고 인프라에 추가적인 추상화 계층을 제공한다.

## 예시

```bash
# /etc/services 파일 예시
# ssh     22/tcp
# smtp    25/tcp
# domain  53/tcp
# domain  53/udp
# http    80/tcp
# https   443/tcp

# 열려 있는 포트 확인 (Linux)
ss -tuln

# 특정 포트를 사용하는 프로세스 확인
sudo ss -tulnp | grep :80

# IANA 포트 목록 참조
# iana.org/assignments/port-numbers

# 방화벽에서 TCP와 UDP를 별도로 구성
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 53 -j ACCEPT

# 로드 밸런서를 통한 포트 포워딩 예시
# 외부 80 -> 내부 8080 (비특권 포트에서 실행)
```

## 관련 개념

- [TCP/IP 프로토콜 스위트 (TCP/IP Protocol Suite)](/knowledge/linux/tcp-ip/) - 포트를 정의하는 전송 계층 프로토콜
- [IP 주소 (IP Address)](/knowledge/linux/ip-address/) - 포트와 결합하여 소켓 주소 구성
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - 포트 기반 방화벽 규칙
- [리눅스 캐퍼빌리티 (Linux Capabilities)](/knowledge/linux/linux-capabilities/) - 특권 포트 바인딩 제어
