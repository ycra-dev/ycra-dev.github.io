---
title: "VPN (Virtual Private Network)"
description: "VPN은 인증과 암호화를 사용하여 물리적으로 떨어진 네트워크를 인터넷과 같은 비신뢰 네트워크를 통해 안전하게 연결하는 가상 사설망 기술이다"
tags: ['Security', 'Network', 'Tunneling', 'Encryption', 'Ipsec', 'Remote Access']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/vpn
sidebar:
  order: 19
---

## 핵심 개념

VPN은 원격 네트워크가 직접 연결된 것처럼 보이게 하는 "보안 터널"을 생성한다. 연결은 공유 비밀(패스프레이즈)로 인증되고, 양 끝 간 트래픽이 암호화된다.

**주요 활용 사례:**
- 여러 지사(예: 시카고, 볼더, 마이애미)를 인터넷을 통해 투명하게 연결
- 재택근무자가 기업 네트워크에 안전하게 접속
- 전용 회선 대비 훨씬 저렴한 비용

**IPsec (Internet Protocol Security):**
- IETF 표준 기반의 종단 간 인증 및 암호화 시스템
- 원래 IPv6용으로 개발되었으나 IPv4에도 광범위하게 구현
- Linux와 FreeBSD에 커널 수준 지원 포함
- 터널 모드: 전송 계층 헤더 포함 암호화 (방화벽과 충돌 가능)
- 전송 모드: 패킷 페이로드만 암호화 (일반적 기본값)
- MTU 크기 주의: IPsec 암호화 후 단편화 방지를 위해 MTU를 낮춰야 함 (보통 1,400바이트)

**VPN의 한계:**
VPN은 두 엔드포인트 간 터널만 보호하며, 엔드포인트 자체의 보안은 다루지 않는다. VPN 터널을 통한 연결을 외부 연결로 취급하고 필요한 만큼만 권한을 부여해야 한다.

## 예시

```bash
# IPsec VPN 상태 확인 (strongSwan 사용)
sudo ipsec status
sudo ipsec statusall

# OpenVPN 클라이언트 연결
sudo openvpn --config /etc/openvpn/client.conf

# SSH를 VPN 대용으로 사용 (간단한 터널링)
ssh -w 0:0 user@vpn-server.com
# -w: TUN 장치 사용

# WireGuard VPN 설정 확인
sudo wg show
```

## 관련 개념

- [ssh-port-forwarding](/knowledge/linux/ssh-port-forwarding/) - 간이 VPN으로 사용 가능한 SSH 터널링
- [firewall](/knowledge/linux/firewall/) - VPN과 방화벽의 상호작용
- [ipsec](/knowledge/linux/ipsec/) - VPN의 핵심 프로토콜
- [tls-ssl](/knowledge/linux/tls-ssl/) - VPN과 유사한 암호화 기술
