---
title: "클러스터 컴퓨팅 (Cluster Computing)"
description: "클러스터 컴퓨팅(Cluster Computing)은 유사한 컴퓨트 노드들을 고속 네트워크로 연결하여 병렬 프로그래밍을 수행하는 고성능 분산 컴퓨팅 방식이다"
tags: ['Cluster Computing', 'High Performance Computing', 'Parallel Processing', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/cluster-computing
sidebar:
  order: 5
---

## 핵심 개념

클러스터 컴퓨팅의 핵심 특성은 동질성(homogeneity)이다: 같은 종류의 컴퓨터, 같은 운영체제, 같은 네트워크를 사용한다. 현대 슈퍼컴퓨터는 100,000개 이상의 CPU를 가진 클러스터로 조직되며, 각 CPU는 8~16개의 코어를 갖는다.

클러스터의 구성 요소:
- **컴퓨트 노드**: 실제 계산을 수행하며, 전용 고속 인터커넥트로 연결
- **관리 노드**: 사용자로부터 작업을 수집하고 컴퓨트 노드에 배분
- **관리 네트워크**: 시스템 전체의 조직과 성능을 모니터링
- **고성능 파일 시스템/데이터베이스**: 자체 전용 네트워크 보유

운영체제 측면에서 경량 커널(lightweight kernel)이 오버헤드를 최소화하는 추세이다. 최근에는 전체 기능 OS와 경량 커널을 결합하는 멀티커널(multikernel) 접근법이 등장하여 개방성과 성능을 동시에 달성한다. 현재 고성능 컴퓨터의 95%가 Linux 기반 시스템을 운영한다.

## 예시

```
# 클러스터 컴퓨팅 시스템의 기본 구조
[관리 노드] ─── 관리 네트워크 ───┐
     │                             │
     ├── [컴퓨트 노드 1] ──┐      │
     ├── [컴퓨트 노드 2] ──┤ 고속  │
     ├── [컴퓨트 노드 3] ──┤ 인터  │
     ├── ...               ├ 커넥트│
     └── [컴퓨트 노드 N] ──┘      │
                                   │
     [고성능 파일 시스템] ─────────┘

# 클러스터는 단일 프로그램을 여러 노드에서 병렬 실행
# 각 노드는 독립적 메모리를 가짐 (공유 메모리 아님)
# 노드 간 통신은 메시지 패싱으로 이루어짐
```

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [그리드 컴퓨팅 (Grid Computing)](/knowledge/distributed-systems/grid-computing/)
- [클라우드 컴퓨팅 (Cloud Computing)](/knowledge/distributed-systems/cloud-computing/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
