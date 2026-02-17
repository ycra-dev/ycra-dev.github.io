---
title: "VLAN (Virtual Local Area Network)"
description: "VLAN(Virtual Local Area Network)은 네트워크 스위치의 포트를 소프트웨어 설정으로 논리적 그룹으로 분할하여, 각 그룹이 독립된 물리적 스위치에 연결된 것처럼 동작하게 하는 기술이다"
tags: ['Vlan', 'Network Switch', 'Layer2', '802.1q', 'Network Segmentation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/vlan
sidebar:
  order: 5
---

## 핵심 개념

VLAN은 하나의 물리적 스위치 내에서 여러 개의 독립된 브로드캐스트 도메인을 생성한다. 각 VLAN 내의 트래픽은 해당 VLAN에 속한 포트로만 전달되므로, 보안과 성능 모두에 유리하다.

**VLAN 트렁킹(IEEE 802.1Q)**: 물리적으로 분리된 여러 스위치가 동일한 논리적 VLAN을 서비스할 수 있게 하는 프로토콜이다. 스위치 간 연결(트렁크 포트)에서 패킷에 VLAN 태그를 추가하여 어떤 VLAN에 속하는지 식별한다.

**VLAN 간 라우팅**: VLAN 사이의 트래픽은 라우터 또는 Layer 3 라우팅 모듈을 통해 처리된다. 일부 고급 스위치는 내부에 라우팅 소프트웨어 레이어를 포함하여 VLAN 간 라우팅을 수행한다.

**보안 고려사항**: VLAN 자체만으로는 추가적인 보안을 제공하지 않는다. VLAN 간 트래픽을 필터링해야만 실질적인 보안 이점을 얻을 수 있다. 공공장소에 접근 가능한 네트워크 포트는 "게스트" VLAN에 배치하고 내부 네트워크 리소스에 대한 접근을 차단해야 한다.

**무선 네트워크와의 통합**: 여러 SSID를 별도의 VLAN에 매핑하여 사용자 그룹(직원 vs 게스트)을 분리하고, 유선 네트워크처럼 라우팅 및 필터링을 적용할 수 있다.

## 예시

```bash
# Linux에서 VLAN 인터페이스 생성
sudo ip link add link eth0 name eth0.100 type vlan id 100
sudo ip addr add 192.168.100.1/24 dev eth0.100
sudo ip link set eth0.100 up

# VLAN 확인
cat /proc/net/vlan/config

# 8021q 커널 모듈 로드
sudo modprobe 8021q

# VLAN 인터페이스 삭제
sudo ip link delete eth0.100

# 일반적인 VLAN 설계 예시:
# VLAN 10  - 관리자 네트워크      (192.168.10.0/24)
# VLAN 20  - 직원 네트워크        (192.168.20.0/24)
# VLAN 30  - 서버 네트워크        (192.168.30.0/24)
# VLAN 99  - 게스트 네트워크      (192.168.99.0/24)
```

## 관련 개념

- [network-switch](/knowledge/linux/network-switch/) - VLAN이 구현되는 장비
- [network-router](/knowledge/linux/network-router/) - VLAN 간 트래픽을 라우팅하는 장비
- [firewall](/knowledge/linux/firewall/) - VLAN 간 트래픽을 필터링하는 보안 도구
- [wireless-networking](/knowledge/linux/wireless-networking/) - SSID와 VLAN 매핑을 통한 무선 보안
- [ethernet](/knowledge/linux/ethernet/) - VLAN이 기반으로 하는 네트워크 기술
