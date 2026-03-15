---
title: "자율 시스템 (Autonomous System, AS)"
description: "자율 시스템(Autonomous System, AS)은 단일 관리 주체의 통제 하에 있는 네트워크 그룹으로, 내부 라우팅과 외부 라우팅의 경계를 정의하며 BGP 등 외부 라우팅 프로토콜에서 라우팅 단위로 사용된다"
tags: ['Autonomous System', 'As Number', 'Bgp', 'Internet Routing', 'Arin']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/autonomous-system
sidebar:
  order: 17
---

## 핵심 개념

AS의 정의는 다소 모호하다. 실제 자율 시스템은 전 세계적 기업 네트워크만큼 크거나 한 건물 또는 한 학과만큼 작을 수 있다. 일반적 경향은 AS를 가능한 크게 만드는 것이며, 이는 관리를 단순화하고 라우팅 효율성을 극대화한다.

**내부 vs 외부 라우팅:**
- **내부(Interior) 라우팅**: AS 내부에서 RIP, OSPF 등의 프로토콜 사용
- **외부(Exterior) 라우팅**: AS 간에 BGP 등의 프로토콜 사용. AS 내부 토폴로지를 노출하지 않으므로 네트워크 집합을 다루는 2차 계층 라우팅으로 볼 수 있음

**AS의 역할:**
- 인접 라우터가 다른 관리 주체의 통제 하에 있는 상황을 다룸
- 많은 네트워크(예: 전체 인터넷)에 대한 경로를 처리
- 내부 토폴로지를 외부에 숨김

실제로 소규모 사이트는 둘 이상의 ISP에 연결되지 않는 한 외부 프로토콜을 실행할 필요가 거의 없다.

## 예시

```bash
# AS 번호 예시
# AS번호는 ARIN, RIPE 등 지역 인터넷 레지스트리에서 할당
# 16비트 AS 번호: 1 ~ 65534
# 32비트 AS 번호: 65536 ~ 4294967295

# 특정 도메인의 AS 번호 확인
whois -h whois.radb.net 8.8.8.8

# BGP에서 AS 경로 확인 (Cisco IOS)
# show ip bgp
# Network          Next Hop     Metric  LocPrf  Path
# 8.8.8.0/24       10.0.0.1                     65001 15169 i

# AS 내부: OSPF/RIP 등 내부 프로토콜
# AS 간: BGP 외부 프로토콜
```

## 관련 개념

- [BGP (경계 게이트웨이 프로토콜)](/knowledge/linux/bgp/) - AS 간 라우팅을 담당하는 프로토콜
- [OSPF (최단 경로 우선 프로토콜)](/knowledge/linux/ospf/) - AS 내부 라우팅 프로토콜
- [라우팅 프로토콜 (Routing Protocol)](/knowledge/linux/routing-protocol/) - AS 구분에 따른 프로토콜 분류
- [네트워크 라우터 (Network Router)](/knowledge/linux/network-router/) - AS 경계에서 동작하는 장비
