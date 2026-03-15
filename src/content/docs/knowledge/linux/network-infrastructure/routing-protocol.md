---
title: "라우팅 프로토콜 (Routing Protocol)"
description: "라우팅 프로토콜(Routing Protocol)은 라우터들이 상호 협력하여 최적의 네트워크 경로를 자동으로 발견, 계산, 배포하는 프로토콜로, 정적 라우팅의 관리 부담을 줄이고 네트워크 장애 시 대체 경로를 신속하게 찾을 수 있게 한다"
tags: ['Routing Protocol', 'Dynamic Routing', 'Distance Vector', 'Link State', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/routing-protocol
sidebar:
  order: 11
---

## 핵심 개념

라우팅 프로토콜은 네트워크 조건의 변화에 적응할 수 있다는 점에서 정적 라우팅보다 우수하다. 링크 장애 시 대체 경로를 발견하고 전파할 수 있다.

**라우팅 데몬의 정보원:**
1. 설정 파일
2. 기존 라우팅 테이블
3. 다른 시스템의 라우팅 데몬

**라우팅 프로토콜의 두 가지 유형:**
- **거리 벡터 프로토콜(Distance-Vector)**: "라우터 X가 네트워크 Y에서 5홉 거리이고, 나는 X에 인접하므로 나는 Y에서 6홉"이라는 개념. RIP, EIGRP, BGP 등
- **링크 상태 프로토콜(Link-State)**: "라우터 X는 라우터 Y에 인접하며 링크가 활성"이라는 형태의 비가공 정보를 교환하여 각 라우터가 완전한 네트워크 연결 맵을 생성. OSPF가 대표적

**비용 메트릭(Cost Metric)**: 라우팅 프로토콜이 "최단 경로"를 결정하기 위해 사용하는 수치. 단순 시스템에서는 홉 수를 사용하지만, 대역폭, 지연시간, 비용 등 다양한 요소를 반영할 수 있다.

**내부 vs 외부 프로토콜:**
- **내부(Interior) 프로토콜**: 자율 시스템(AS) 내부 라우팅. RIP, OSPF, EIGRP
- **외부(Exterior) 프로토콜**: 자율 시스템 간 라우팅. BGP

## 예시

```bash
# 라우팅 전략 선택 기준:
# - 독립 네트워크: 라우팅 불필요
# - 출구가 하나인 네트워크: 정적 기본 라우트
# - 소규모 복잡 네트워크: RIP
# - 대규모 복잡 네트워크: OSPF
# - 다중 ISP 연결: BGP

# 라우팅 프로토콜 멀티캐스트 주소
# RIP:   224.0.0.9
# OSPF:  224.0.0.5, 224.0.0.6
# EIGRP: 224.0.0.10
```

## 관련 개념

- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - 라우팅 프로토콜이 관리하는 대상
- [거리 벡터 라우팅 (Distance-Vector Routing)](/knowledge/linux/distance-vector-routing/) - 거리 벡터 방식의 라우팅
- [링크 상태 라우팅 (Link-State Routing)](/knowledge/linux/link-state-routing/) - 링크 상태 방식의 라우팅
- [OSPF (최단 경로 우선 프로토콜)](/knowledge/linux/ospf/) - 대표적 링크 상태 프로토콜
- [BGP (경계 게이트웨이 프로토콜)](/knowledge/linux/bgp/) - 인터넷 백본 라우팅 프로토콜
- [RIP (라우팅 정보 프로토콜)](/knowledge/linux/rip/) - 단순 거리 벡터 프로토콜
- [자율 시스템 (Autonomous System, AS)](/knowledge/linux/autonomous-system/) - 라우팅 프로토콜의 관리 범위
- [네트워크 라우터 (Network Router)](/knowledge/linux/network-router/) - 라우팅 프로토콜을 실행하는 장비
