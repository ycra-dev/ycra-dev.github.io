---
title: "OSPF (최단 경로 우선 프로토콜)"
description: "OSPF(Open Shortest Path First)는 가장 널리 사용되는 링크 상태 라우팅 프로토콜로, \"최단 경로 우선\" 수학 알고리즘을 사용하여 경로를 계산하며, \"Open\"은 비독점(nonproprietary)을 의미한다"
tags: ['Ospf', 'Routing Protocol', 'Link State', 'Spf Algorithm', 'Area']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ospf
sidebar:
  order: 15
---

## 핵심 개념

OSPF는 산업 수준의 프로토콜로 대규모의 복잡한 네트워크 토폴로지에서 효과적으로 동작한다.

**OSPF의 RIP 대비 장점:**
- 단일 목적지에 대한 여러 경로 관리 가능
- 네트워크를 "영역(area)"으로 분할하여 고수준 라우팅 정보만 공유
- 장애 발생 시 빠른 수렴(convergence)
- 서비스 유형(type-of-service) 라우팅 지원

**영역(Area) 개념**: OSPF는 네트워크를 영역으로 분할하여 각 영역 내에서만 상세한 토폴로지 정보를 공유하고, 영역 간에는 요약된 라우팅 정보만 교환한다. 이를 통해 대규모 네트워크에서도 효율적으로 동작한다.

**비용 메트릭**: OSPF 사양은 특정 비용 메트릭을 강제하지 않는다. Cisco의 구현은 기본적으로 대역폭 관련 값을 사용한다. OSPF를 효과적으로 사용하려면 사이트의 IP 주소 체계가 합리적으로 계층적이어야 한다.

**IPv6 지원**: OSPFv3는 IPv6를 지원하지만, IPv4와 IPv6는 별도의 라우팅 도메인으로 구성되고 독립적으로 동작한다.

OSPF는 프로토콜 자체가 복잡하지만, 이 복잡성은 고급 기능을 더 쉽게 구현할 수 있게 하는 부분적 설명이 된다. 라우팅 프로토콜의 동작이 실제로 차이를 만드는 상당한 규모의 사이트에서만 의미가 있다.

## 예시

```bash
# Quagga OSPF 설정 예시
# /etc/quagga/ospfd.conf
# router ospf
#   ospf router-id 1.1.1.1
#   network 192.168.1.0/24 area 0
#   network 10.0.0.0/8 area 1

# OSPF 멀티캐스트 주소
# 224.0.0.5 - 모든 OSPF 라우터
# 224.0.0.6 - 지정 라우터(DR)

# Cisco IOS에서 OSPF 설정
# Router(config)# router ospf 1
# Router(config-router)# network 192.168.1.0 0.0.0.255 area 0

# OSPF 상태 확인 (Quagga vtysh)
# show ip ospf neighbor
# show ip ospf database
# show ip ospf route
```

## 관련 개념

- [링크 상태 라우팅 (Link-State Routing)](/knowledge/linux/link-state-routing/) - OSPF가 속하는 프로토콜 유형
- [라우팅 프로토콜 (Routing Protocol)](/knowledge/linux/routing-protocol/) - OSPF를 포함하는 상위 개념
- [RIP (라우팅 정보 프로토콜)](/knowledge/linux/rip/) - OSPF의 대안인 거리 벡터 프로토콜
- [BGP (경계 게이트웨이 프로토콜)](/knowledge/linux/bgp/) - 외부 라우팅을 담당하는 프로토콜
- [라우팅 데몬 (Routing Daemon)](/knowledge/linux/routing-daemon/) - OSPF를 구현하는 소프트웨어
- [자율 시스템 (Autonomous System, AS)](/knowledge/linux/autonomous-system/) - OSPF가 동작하는 라우팅 범위
- [네트워크 라우터 (Network Router)](/knowledge/linux/network-router/) - OSPF를 실행하는 장비
