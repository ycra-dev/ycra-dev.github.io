---
title: "거리 벡터 라우팅 (Distance-Vector Routing)"
description: "거리 벡터 라우팅(Distance-Vector Routing)은 각 라우터가 알고 있는 네트워크까지의 거리(홉 수 등)를 인접 라우터에게 주기적으로 광고하고, 이웃이 더 나은 경로를 모르면 해당 라우터를 게이트웨이로 지정하는 \"소문(gossipy)\" 방식의 라우팅..."
tags: ['Distance Vector', 'Routing Protocol', 'Rip', 'Eigrp', 'Hop Count']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/distance-vector-routing
sidebar:
  order: 12
---

## 핵심 개념

거리 벡터 프로토콜의 기본 알고리즘은 우아하지만 토폴로지 변화에 취약하다:

**핵심 문제점:**
- 토폴로지 변화로 최적 경로가 길어질 때 적응이 느림
- 무한 루프 발생 가능: 라우터 X가 Y에서 받은 정보를 Z에게 보내고, Z가 다시 Y에게 보내는 순환
- 수렴(convergence)에 많은 업데이트 주기가 소요될 수 있음
- 짧은 주기 시간이 필요하여 프로토콜이 "수다스러움(chatty)"

**대표적 거리 벡터 프로토콜:**
- **RIP**: 30초마다 모든 라우팅 정보를 브로드캐스트. 15홉 이상은 도달 불가능으로 간주
- **EIGRP**: 90초마다 업데이트. 루핑과 수렴 문제를 해결하도록 설계된 가장 진화된 거리 벡터 프로토콜
- **BGP**: 전체 테이블을 한 번 전송한 후 변경 사항만 전송하여 불필요한 트래픽을 줄임

EIGRP는 여러 가능 경로의 정보를 유지하여 항상 대체 경로를 확보하고 있다. 대부분의 목적에서 EIGRP와 OSPF는 동등한 기능을 제공하지만, EIGRP는 Cisco 독점이라는 단점이 있다.

## 예시

```bash
# 거리 벡터 프로토콜 동작 원리
#
# 라우터 A: "나는 네트워크 N에서 0홉 거리"
# 라우터 B: "A를 통해 N까지 1홉"
# 라우터 C: "B를 통해 N까지 2홉"
# -> 링크 장애 시 수렴까지 여러 주기 필요

# RIP 업데이트 주기: 30초
# EIGRP 업데이트 주기: 90초
# BGP: 변경 시에만 전송

# 거리 벡터 프로토콜 비교
# RIP:   홉 수 기반, 최대 15홉, 단순하지만 느린 수렴
# EIGRP: 복합 메트릭, Cisco 전용, 빠른 수렴
# BGP:   AS 간 경로 정보, 인터넷 규모 확장성
```

## 관련 개념

- [라우팅 프로토콜 (Routing Protocol)](/knowledge/linux/routing-protocol/) - 거리 벡터가 속하는 라우팅 프로토콜 분류
- [링크 상태 라우팅 (Link-State Routing)](/knowledge/linux/link-state-routing/) - 대안적 라우팅 프로토콜 유형
- [RIP (라우팅 정보 프로토콜)](/knowledge/linux/rip/) - 대표적 거리 벡터 프로토콜
- [BGP (경계 게이트웨이 프로토콜)](/knowledge/linux/bgp/) - 외부 거리 벡터 프로토콜
- [라우팅 테이블 (Routing Table)](/knowledge/linux/routing-table/) - 거리 벡터 프로토콜이 관리하는 대상
