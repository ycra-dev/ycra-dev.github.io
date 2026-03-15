---
title: "네트워크 스위치 (Network Switch)"
description: "네트워크 스위치(Network Switch)는 링크 계층(Layer 2)에서 이더넷 세그먼트를 연결하여 하나의 논리적 네트워크로 통합하며, 동적 학습 알고리즘을 통해 패킷을 필요한 포트로만 선택적으로 전달하는 네트워크 장비이다"
tags: ['Network Switch', 'Link Layer', 'Ethernet', 'Switching', 'Broadcast Domain']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/network-switch
sidebar:
  order: 4
---

## 핵심 개념

스위치는 현대 이더넷 네트워크의 표준 연결 장비로, 과거의 허브(hub)를 완전히 대체하였다. 허브가 모든 패킷을 모든 포트로 무차별적으로 전달하는 반면, 스위치는 출발지 MAC 주소를 학습하여 포트 매핑 테이블을 구축하고, 유니캐스트 패킷을 해당 포트로만 전달한다.

**동적 학습 알고리즘**: 스위치는 각 포트에서 들어오는 패킷의 소스 MAC 주소를 기록한다. 처음에는 모든 패킷을 모든 포트로 전달하지만, 수초 내에 대부분의 호스트 위치를 학습하여 선택적 전달이 가능해진다.

**브로드캐스트 스톰**: 100개 이상의 호스트가 단일 논리적 세그먼트에 있으면 브로드캐스트 트래픽이 모든 포트로 전달되어 성능 저하가 발생할 수 있다. 이를 해결하려면 라우터로 브로드캐스트 도메인을 분리하거나 VLAN을 사용한다.

**백플레인 속도**: 스위치 선택 시 가장 중요한 지표로, 모든 포트 속도의 합보다 커야 한다. 패킷 스캐닝 속도와 전달 속도도 중요하지만 벤더가 패킷 크기를 명시하지 않는 경우가 많아 주의가 필요하다.

스위치는 네트워크에 루프가 있으면 혼란을 일으킬 수 있으며, 일부 스위치는 스패닝 트리 프로토콜(STP)을 통해 대체 경로를 관리한다.

## 예시

```bash
# Linux에서 브릿지(소프트웨어 스위치) 생성
sudo ip link add br0 type bridge
sudo ip link set eth0 master br0
sudo ip link set eth1 master br0
sudo ip link set br0 up

# 브릿지의 MAC 주소 테이블 확인
brctl showmacs br0

# 스위치 포트별 트래픽 모니터링 (SNMP)
snmpwalk -v2c -c public switch_ip IF-MIB::ifInOctets
```

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - 스위치가 연결하는 네트워크 기술
- [VLAN (가상 랜)](/knowledge/linux/vlan/) - 스위치 포트를 논리적으로 분할하는 기술
- [네트워크 라우터 (Network Router)](/knowledge/linux/network-router/) - Layer 3에서 패킷을 전달하는 장비
- [MAC 주소 (MAC Address)](/knowledge/linux/mac-address/) - 스위치가 학습하고 사용하는 주소 체계
- [네트워크 토폴로지 (Network Topology)](/knowledge/linux/network-topology/) - 스위치 기반 네트워크 설계
