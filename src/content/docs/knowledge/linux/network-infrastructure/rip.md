---
title: "RIP (라우팅 정보 프로토콜)"
description: "RIP(Routing Information Protocol)는 홉 수를 비용 메트릭으로 사용하는 간단한 거리 벡터 라우팅 프로토콜로, RFC1058(1988)에 정의되었으며 RIPv1, RIPv2, RIPng(IPv6)의 세 가지 버전이 존재한다"
tags: ['Rip', 'Routing Protocol', 'Distance Vector', 'Hop Count', 'Ripv2']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/rip
sidebar:
  order: 14
---

## 핵심 개념

RIP는 네트워크가 작고 컴퓨터가 비쌌던 시대에 설계되었다. 핵심 제약은 **15홉 이상의 호스트를 도달 불가능으로 간주**하는 것이며, 이 제한은 복잡한 사이트가 더 정교한 프로토콜로 마이그레이션하도록 유도하기 위해 의도적으로 유지되고 있다.

**RIP 버전 비교:**
- **RIPv1**: 기본 버전. 넷마스크를 배포하지 않아 서브넷 네트워크와 CIDR 지원이 부족
- **RIPv2**: 넷마스크와 다음 홉 주소를 함께 배포. 기본적 보안 기능 추가. RIPv1과 호환 모드 지원
- **RIPng**: IPv6 전용. RIPv2의 IPv6 버전으로, IPv4용 RIP과 별도로 실행해야 함

**RIP의 장단점:**
- 장점: 단순하고 구성이 쉬움, 비UNIX 플랫폼에서도 광범위하게 구현, 최저공통분모 프로토콜
- 단점: 30초마다 모든 라우팅 정보를 브로드캐스트(수다스러움), 링크 장애 시 안정화가 느림, 15홉 제한

**적용 영역**: RIP은 OSPF 같은 정교한 프로토콜이 출현하면서 좁은 적용 범위를 가진다. 한쪽은 라우팅 프로토콜이 불필요할 만큼 단순한 네트워크, 다른 쪽은 RIP으로 감당할 수 없을 만큼 복잡한 네트워크에 의해 제한된다.

**수동 모드**: 일부 사이트는 수동(passive) RIP 데몬을 실행하여 라우팅 업데이트를 수신하되 자체 정보는 브로드캐스트하지 않으며, 실제 경로 계산은 OSPF 같은 더 효율적인 프로토콜로 수행한다.

## 예시

```bash
# routed를 수동 모드로 실행 (RIP 수신만)
sudo routed -q

# Quagga의 ripd 데몬 설정 예시
# /etc/quagga/ripd.conf
# router rip
#   network 192.168.1.0/24
#   neighbor 192.168.1.1
#   version 2
#   passive-interface eth1

# RIP 멀티캐스트 주소: 224.0.0.9

# RIP 패킷 모니터링
sudo tcpdump -i eth0 port 520
```

## 관련 개념

- [거리 벡터 라우팅 (Distance-Vector Routing)](/knowledge/linux/distance-vector-routing/) - RIP이 속하는 라우팅 프로토콜 유형
- [라우팅 프로토콜 (Routing Protocol)](/knowledge/linux/routing-protocol/) - RIP을 포함하는 상위 개념
- [OSPF (최단 경로 우선 프로토콜)](/knowledge/linux/ospf/) - RIP의 대안인 링크 상태 프로토콜
- [라우팅 데몬 (Routing Daemon)](/knowledge/linux/routing-daemon/) - RIP을 구현하는 소프트웨어
- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - RIP이 관리하는 경로 정보
