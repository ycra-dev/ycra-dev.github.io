---
title: "BGP (Border Gateway Protocol)"
description: "BGP(Border Gateway Protocol)는 자율 시스템(AS) 간의 트래픽을 관리하는 외부 라우팅 프로토콜로, 인터넷 백본 라우팅의 표준이며 약 66만 개 이상의 프리픽스를 포함하는 인터넷 라우팅 테이블을 처리한다"
tags: ['Bgp', 'Routing Protocol', 'Exterior Protocol', 'Autonomous System', 'Internet Backbone']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/bgp
sidebar:
  order: 16
---

## 핵심 개념

BGP는 개별 네트워크가 아닌 자율 시스템의 집합 간 라우팅을 관리하는 유일한 현역 외부 라우팅 프로토콜이다. 다른 외부 라우팅 프로토콜들은 모두 BGP에 의해 대체되었다.

**BGP의 특징:**
- 거리 벡터 프로토콜의 변형이지만, 전체 테이블을 한 번 전송한 후 변경 사항만 전송하여 "수다스러운" 트래픽을 줄임
- 인터넷 규모의 확장성 요구사항을 충족 (66만+ 프리픽스)
- 로컬 라우팅과는 매우 다른 확장성 요구사항

**BGP가 필요한 경우**: 여러 상위 ISP를 통해 인터넷에 연결된 라우터는 BGP를 사용해야 한다. 그러나 대부분의 라우터는 하나의 상위 경로만 가지므로 단순한 정적 기본 라우트로 충분하다.

**일반 사이트에서의 관련성**: 소규모 및 중규모 사이트는 둘 이상의 ISP에 연결되지 않는 한 외부 프로토콜을 실행할 필요가 거의 없다. 다중 ISP 환경에서는 네트워크를 로컬/인터넷 도메인으로 단순 분할할 수 없어, 라우터가 어떤 인터넷 경로가 특정 주소에 최적인지 결정해야 한다.

## 예시

```bash
# Quagga BGP 설정 예시
# /etc/quagga/bgpd.conf
# router bgp 65001
#   bgp router-id 1.1.1.1
#   neighbor 10.0.0.1 remote-as 65002
#   network 192.168.0.0/16

# BGP 상태 확인 (Quagga vtysh)
# show ip bgp summary
# show ip bgp neighbors
# show ip bgp

# Cisco IOS에서 BGP 설정
# Router(config)# router bgp 65001
# Router(config-router)# neighbor 10.0.0.1 remote-as 65002
# Router(config-router)# network 192.168.0.0 mask 255.255.0.0

# 인터넷 라우팅 테이블 크기 (2017년 기준):
# 약 660,000+ 프리픽스
```

## 관련 개념

- [routing-protocol](/knowledge/linux/routing-protocol/) - BGP를 포함하는 상위 개념
- [autonomous-system](/knowledge/linux/autonomous-system/) - BGP가 관리하는 라우팅 단위
- [distance-vector-routing](/knowledge/linux/distance-vector-routing/) - BGP의 프로토콜 유형
- [ospf](/knowledge/linux/ospf/) - 내부 라우팅을 담당하는 프로토콜
- [network-router](/knowledge/linux/network-router/) - BGP를 실행하는 장비
- [routing-table](/knowledge/linux/routing-table/) - BGP가 관리하는 경로 정보
