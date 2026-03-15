---
title: "방화벽 (Firewall)"
description: "방화벽은 미리 정의된 규칙에 따라 네트워크 트래픽을 필터링하여 원치 않는 패킷이 네트워크와 시스템에 접근하는 것을 차단하는 장치 또는 소프트웨어이다"
tags: ['Security', 'Network', 'Packet Filtering', 'Dmz', 'Defense In Depth']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/firewall
sidebar:
  order: 6
---

## 핵심 개념

방화벽은 네트워크 보안의 기본 도구로, 데스크톱 시스템부터 엔터프라이즈급 네트워크 어플라이언스까지 다양한 형태로 존재한다.

**방화벽 유형:**
- **패킷 필터링 방화벽**: 패킷 헤더의 목적지 주소, 포트 번호, 프로토콜 유형에 따라 트래픽을 허용/차단. Linux에서는 iptables(또는 ufw), FreeBSD에서는 ipfw를 사용
- **상태 기반 검사 방화벽(Stateful Inspection)**: 네트워크 트래픽의 흐름을 모니터링하고 실제 활동을 예상 활동과 비교하여 이상을 탐지
- **클라우드 보안 그룹**: 클라우드 환경에서 물리적 방화벽 대신 사용. 아웃바운드 규칙도 추가하여 공격자의 외부 연결을 제한할 수 있음

**DMZ(비무장지대):**
인터넷 게이트웨이와 내부 네트워크 사이에 두 단계 필터를 두고, 그 사이에 인터넷 접속 가능한 서비스를 배치하는 구조이다. 이렇게 하면 인터넷에 노출되는 시스템이 내부 네트워크와 분리되어 보안이 강화된다.

**중요 원칙:**
- 방화벽만으로는 충분하지 않으며, 다계층 보안 전략의 하나로 사용해야 한다
- 방화벽이 잘못된 안전감을 주어 다른 보안 조치를 소홀히 하면 오히려 역효과가 발생한다
- 가장 안전한 설정은 모든 인바운드 연결을 차단한 후 필요한 서비스만 점진적으로 허용하는 것이다

## 예시

```bash
# UFW (Uncomplicated Firewall) 기본 설정 - Linux
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose

# iptables 기본 규칙 예시
sudo iptables -P INPUT DROP              # 기본 정책: 차단
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT
sudo iptables -A INPUT -i lo -j ACCEPT   # 루프백 허용
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # SSH 허용
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT  # HTTP 허용
```

## 관련 개념

- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - Linux 패킷 필터링 상세
- [DDoS 공격 (DDoS Attack)](/knowledge/linux/ddos-attack/) - 방화벽으로 방어해야 할 네트워크 공격
- [SSH (보안 셸)](/knowledge/linux/ssh/) - 방화벽을 통해 허용해야 할 필수 서비스
- [VPN (가상 사설 네트워크)](/knowledge/linux/vpn/) - 방화벽과 함께 사용하는 보안 터널링
