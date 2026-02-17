---
title: "Link-State Routing"
description: "링크 상태 라우팅(Link-State Routing)은 각 라우터가 인접 라우터와의 연결 상태(\"라우터 X는 라우터 Y에 인접, 링크 활성\")를 교환하여 전체 네트워크의 연결 맵을 구축하고, 이로부터 각자의 최적 라우팅 테이블을 독립적으로 계산하는 라우팅 프로토콜..."
tags: ['Link State', 'Routing Protocol', 'Ospf', 'Convergence', 'Shortest Path']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/link-state-routing
sidebar:
  order: 13
---

## 핵심 개념

**거리 벡터 대비 장점:**
- 장애 발생 후 운영 가능한 라우팅 솔루션으로 신속하게 수렴(convergence)
- 라우터 간 통신이 경로 계산 알고리즘의 일부가 아니므로 전송 루프가 발생하지 않음
- 네트워크 대역폭과 CPU 시간 면에서 토폴로지 데이터베이스 업데이트가 효율적
- 서비스 유형(type-of-service) 라우팅, 동일 목적지에 대한 다중 경로 등 고급 기능 구현이 용이

**트레이드오프:**
- 각 노드에서 완전한 네트워크 맵을 유지해야 하므로 메모리와 CPU 파워가 필요
- 거리 벡터 프로토콜보다 복잡

**일반적으로 사용되는 유일한 진정한 링크 상태 프로토콜은 OSPF이다.** OSPF는 네트워크를 "영역(area)"으로 분할하여 고수준 라우팅 정보만 공유하는 계층적 구조를 지원한다.

링크 상태 프로토콜은 SPF(Shortest Path First) 알고리즘(Dijkstra 알고리즘)을 사용하여 연결 맵으로부터 최적 경로를 계산한다. 이 알고리즘은 각 라우터에서 독립적으로 실행되므로, 모든 라우터가 동일한 토폴로지 정보를 가지면 동일한 라우팅 결정을 내린다.

## 예시

```bash
# 링크 상태 프로토콜 동작 원리
#
# 1. 각 라우터가 인접 라우터와의 링크 상태 광고(LSA) 생성
# 2. LSA를 전체 네트워크에 플러딩(flooding)
# 3. 각 라우터가 완전한 네트워크 토폴로지 맵 구축
# 4. SPF 알고리즘으로 최단 경로 트리 계산
# 5. 계산 결과로 라우팅 테이블 업데이트

# 링크 상태 vs 거리 벡터 비교
# 링크 상태: 빠른 수렴, 루프 없음, 메모리 많이 사용
# 거리 벡터: 느린 수렴, 루프 가능, 메모리 적게 사용

# OSPF (유일한 범용 링크 상태 프로토콜)
# 멀티캐스트 주소: 224.0.0.5 (모든 OSPF 라우터)
#                224.0.0.6 (지정 라우터)
```

## 관련 개념

- [routing-protocol](/knowledge/linux/routing-protocol/) - 링크 상태가 속하는 라우팅 프로토콜 분류
- [distance-vector-routing](/knowledge/linux/distance-vector-routing/) - 대안적 라우팅 프로토콜 유형
- [ospf](/knowledge/linux/ospf/) - 대표적 링크 상태 프로토콜
- [routing-table](/knowledge/linux/routing-table/) - 링크 상태 알고리즘이 생성하는 대상
