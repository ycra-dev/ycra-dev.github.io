---
title: "엣지 컴퓨팅 (Edge Computing)"
description: "에지 컴퓨팅(Edge Computing)은 네트워크의 가장자리(edge)에 서비스를 배치하여, IoT 장치와 클라우드 인프라 사이의 중간 계층으로 작동하는 분산 시스템 아키텍처이다"
tags: ['Edge', 'Fog Computing', 'Iot', 'Latency', 'Orchestration', 'Hybrid Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/edge-computing
sidebar:
  order: 8
---

## 핵심 개념

에지 컴퓨팅은 IoT(Internet-of-Things)의 확산과 함께 클라우드 컴퓨팅만으로는 부족한 상황에 대응하기 위해 등장했다. 에지(edge)는 기업 네트워크와 실제 인터넷 사이의 경계에 형성된다.

**에지 컴퓨팅의 주요 동기**:

1. **지연 시간(Latency)**: 클라우드까지 100ms의 지연이 발생할 수 있어 실시간 애플리케이션(예: 자율주행)에 부적합. 에지 인프라를 통해 지연 극복 가능. 가장 설득력 있는 동기.
2. **대역폭(Bandwidth)**: 비디오 서비스 등에서 소스에 가까울수록 QoS 보장이 용이. 다만 대역폭은 지속적으로 증가하므로 논쟁의 여지가 있음.
3. **신뢰성(Reliability)**: 클라우드 연결이 병원, 공장 등 중요 환경에서 불충분할 수 있음. 그러나 전통적으로 이미 대비책이 있는 경우가 많음.
4. **보안 및 프라이버시**: 규제상 데이터를 클라우드에 배치할 수 없는 경우(예: 의료 기록)에 에지 인프라 필수.

**포그 컴퓨팅(Fog Computing)**: 에지와 클라우드 사이의 중간 인프라로, 여러 조직이 지역 데이터 센터를 통해 서비스를 공유하는 구조.

**오케스트레이션 과제**: 에지 컴퓨팅은 클라우드에 비해 관리가 훨씬 복잡하다:
- **리소스 할당**: 서비스에 필요한 CPU, 스토리지, 메모리, 네트워크 자원 보장
- **서비스 배치**: 모바일 애플리케이션에서 가장 가까운 에지 인프라에 서비스 설치 결정
- **에지 선택**: 어떤 에지 인프라를 사용할지 결정 (단순히 가장 가까운 곳이 최선이 아닐 수 있음)

에지 인프라는 클라우드에 비해 하드웨어 자원이 제한적이고, 하드웨어 이질성이 높으며, 워크로드가 훨씬 동적이다.

## 예시

```
# 에지-클라우드 연속체 구조

[IoT 장치들]
    │
    ├──→ [에지 인프라 (On-premise)]     ← 캠퍼스 네트워크, 로컬 서버
    │        │
    │        ├──→ [포그 인프라]           ← 지역 데이터 센터, ISP 시설
    │        │        │
    │        │        └──→ [클라우드]     ← AWS, Google Cloud 등
    │        │
    │        └──→ [다른 에지 인프라]      ← P2P 방식 연결 가능
    │
    └──→ [클라우드 직접 연결]            ← 단순하지만 지연 발생

# 자율주행 사례
# - 차량 센서 데이터 → 로컬 에지 인프라에서 실시간 처리
# - 교차로 접근 시 에지 인프라를 통해 차량 간 위치 공유
# - 클라우드로 전송하면 지연이 100ms+ → 실시간 의사결정 불가
```

## 관련 개념

- [클라우드 컴퓨팅 (Cloud Computing)](/knowledge/distributed-systems/cloud-computing/)
- [CDN (콘텐츠 전송 네트워크)](/knowledge/distributed-systems/content-delivery-network/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
- [퍼베이시브 시스템 (Pervasive System)](/knowledge/distributed-systems/pervasive-system/)
