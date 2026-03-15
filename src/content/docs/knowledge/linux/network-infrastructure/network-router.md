---
title: "네트워크 라우터 (Network Router)"
description: "네트워크 라우터(Network Router)는 OSI 모델의 네트워크 계층(Layer 3)에서 TCP/IP 프로토콜 헤더 정보에 따라 패킷을 최종 목적지로 전달하며, 패킷 필터링, QoS, 네트워크 토폴로지 발견 등의 기능도 수행하는 장비이다"
tags: ['Router', 'Layer3', 'IP Routing', 'Packet Forwarding', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/network-router
sidebar:
  order: 6
---

## 핵심 개념

라우터는 서로 다른 네트워크 세그먼트를 연결하고 브로드캐스트 도메인을 분리하는 핵심 장비이다. 스위치가 MAC 주소(Layer 2)로 패킷을 전달하는 반면, 라우터는 IP 주소(Layer 3)를 기반으로 라우팅 테이블을 참조하여 패킷의 최적 경로를 결정한다.

**라우터 유형:**
- **고정 구성(Fixed Configuration)**: 공장에서 네트워크 인터페이스가 영구 설치된 소규모 전용 라우터
- **모듈형(Modular)**: 슬롯/버스 아키텍처에 인터페이스를 추가할 수 있어 확장 가능. 비용이 높지만 유연성이 뛰어남

**전용 라우터 vs UNIX/Linux 라우터**: UNIX/Linux 시스템을 라우터로 구성할 수 있지만, 전용 라우터가 성능과 안정성 면에서 우수하다. 프로덕션 네트워크에는 전용 라우터를 권장하며, 테스트 서브넷에는 Linux 시스템이 적합할 수 있다.

**Cisco 라우터**: 라우터 시장의 56% 이상을 점유하며 IOS 운영체제를 사용한다. user 모드와 privileged 모드의 두 가지 접근 레벨을 제공하고, `show running`, `config term` 등의 명령으로 관리한다.

## 예시

```bash
# Linux를 라우터로 설정 (IP 포워딩 활성화)
sudo sysctl -w net.ipv4.ip_forward=1
echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf

# Cisco IOS 기본 명령어
# Router> enable                    # 특권 모드 진입
# Router# show running              # 현재 설정 확인
# Router# show interfaces           # 인터페이스 상태 확인
# Router# config term               # 설정 모드 진입
# Router(config)# interface Ethernet0
# Router(config-if)# ip address 199.165.145.24 255.255.255.0
# Router(config-if)# no shutdown
# Router(config-if)# ^Z             # 설정 모드 종료
# Router# write mem                 # 설정 저장

# RANCID로 라우터 설정 백업 자동화
# rancid-run  # 모든 라우터 설정을 수집하고 diff 생성
```

## 관련 개념

- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - 라우터가 참조하는 경로 정보
- [라우팅 프로토콜 (Routing Protocol)](/knowledge/linux/routing-protocol/) - 라우터 간 경로 정보 교환 프로토콜
- [네트워크 스위치 (Network Switch)](/knowledge/linux/network-switch/) - Layer 2에서 패킷을 전달하는 장비
- [VLAN (가상 랜)](/knowledge/linux/vlan/) - 라우터가 VLAN 간 트래픽을 처리
- [IP 포워딩 (IP Forwarding)](/knowledge/linux/ip-forwarding/) - 라우터의 핵심 기능
- [방화벽 (Firewall)](/knowledge/linux/firewall/) - 라우터에서의 패킷 필터링 기능
- [OSPF (최단 경로 우선 프로토콜)](/knowledge/linux/ospf/) - 라우터가 사용하는 내부 라우팅 프로토콜
- [BGP (경계 게이트웨이 프로토콜)](/knowledge/linux/bgp/) - 라우터가 사용하는 외부 라우팅 프로토콜
