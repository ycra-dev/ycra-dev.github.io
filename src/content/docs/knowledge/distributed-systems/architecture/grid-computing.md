---
title: "그리드 컴퓨팅 (Grid Computing)"
description: "그리드 컴퓨팅(Grid Computing)은 서로 다른 관리 도메인에 속하며 하드웨어, 소프트웨어, 네트워크 기술이 매우 이질적인 컴퓨터 시스템들의 연합(federation)으로 구성되는 분산 컴퓨팅 방식이다"
tags: ['Grid Computing', 'High Performance Computing', 'Virtual Organization', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/grid-computing
sidebar:
  order: 6
---

## 핵심 개념

그리드 컴퓨팅의 핵심 특성은 이질성(heterogeneity)으로, 클러스터 컴퓨팅의 동질성과 대비된다. 서로 다른 조직의 자원을 **가상 조직(Virtual Organization)**이라는 개념으로 통합하여 협업을 실현한다.

그리드 컴퓨팅의 4계층 아키텍처 (Foster et al., 2001):

1. **패브릭 계층(Fabric Layer)**: 특정 사이트의 로컬 자원에 대한 인터페이스 제공. 자원 상태 조회 및 관리 기능.
2. **연결 계층(Connectivity Layer)**: 여러 자원 사용에 걸친 통신 프로토콜과 보안 프로토콜(사용자/자원 인증). 위임(delegation) 지원.
3. **자원 계층(Resource Layer)**: 단일 자원 관리. 연결 계층의 기능을 활용하여 접근 제어를 담당.
4. **집합 계층(Collective Layer)**: 다수 자원에 대한 접근 처리. 자원 발견, 작업 할당/스케줄링, 데이터 복제 등.

연결, 자원, 집합 계층이 결합되어 그리드 미들웨어를 형성한다. 이 미들웨어는 서비스 지향 아키텍처(SOA)로 발전하여 Open Grid Services Architecture(OGSA)라는 표준이 정의되었다.

## 예시

```
# 그리드 컴퓨팅의 가상 조직 예
# 서로 다른 기관의 자원을 하나의 가상 조직으로 통합

가상 조직 "천문학 연구팀":
  ├── 기관 A: 슈퍼컴퓨터 (계산 자원)
  ├── 기관 B: 대규모 데이터베이스 (저장 자원)
  ├── 기관 C: 망원경 데이터 수집 장치 (특수 장비)
  └── 기관 D: 시각화 서버 (출력 자원)

# 각 기관은 서로 다른 OS, 네트워크, 보안 정책을 사용하지만
# 그리드 미들웨어를 통해 단일 시스템처럼 접근 가능
```

## 관련 개념

- [클러스터 컴퓨팅 (Cluster Computing)](/knowledge/distributed-systems/cluster-computing/)
- [클라우드 컴퓨팅 (Cloud Computing)](/knowledge/distributed-systems/cloud-computing/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
- [미들웨어 (Middleware)](/knowledge/distributed-systems/middleware/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
