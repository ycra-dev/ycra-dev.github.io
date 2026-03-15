---
title: "컨트롤 플레인 (Control Plane)"
description: "Control Plane은 Kubernetes 클러스터 전체를 제어하는 두뇌 역할을 하는 컴포넌트들의 집합이다"
tags: ['Kubernetes', 'Control Plane', 'Architecture', 'Cluster Management']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/control-plane
sidebar:
  order: 4
---

## 핵심 개념

Control Plane은 단일 마스터 노드에서 실행될 수도 있고, 고가용성(High Availability)을 위해 여러 마스터 노드에 복제될 수도 있다. 프로덕션 환경에서는 최소 3개의 물리적 마스터 노드를 사용하는 것이 권장된다.

Control Plane을 구성하는 주요 컴포넌트는 다음과 같다:

1. **Kubernetes API Server**: RESTful API를 제공하여 사용자와 다른 컴포넌트가 객체를 생성하고 관리할 수 있게 함
2. **etcd**: API를 통해 생성된 객체를 영구적으로 저장하는 분산 데이터스토어. API Server만이 etcd와 직접 통신함
3. **Scheduler**: 각 애플리케이션 인스턴스가 어떤 워커 노드에서 실행될지 결정
4. **Controllers**: API를 통해 생성된 객체를 실제로 동작시키는 역할. 대부분 다른 객체를 생성하며, 일부는 외부 시스템(예: 클라우드 프로바이더 API)과 통신

Control Plane의 컴포넌트들은 클러스터의 상태를 유지하고 제어하지만, 사용자의 애플리케이션을 직접 실행하지는 않는다. 실제 애플리케이션 실행은 워커 노드에서 이루어진다.

## 예시

Control Plane 컴포넌트의 상호작용 흐름:

```
사용자 --> API Server --> etcd (객체 저장)
                |
                +--> Controller (객체 감지 및 처리)
                |         |
                |         +--> 새로운 Pod 객체 생성
                |
                +--> Scheduler (Pod를 노드에 할당)
```

GKE와 같은 관리형 서비스에서는 Control Plane이 클라우드 프로바이더에 의해 관리되며, 사용자는 호스팅하는 머신에 접근할 수 없다.

## 관련 개념

- [etcd](/knowledge/kubernetes/etcd/) - 클러스터 상태를 저장하는 분산 데이터스토어
- [워크로드 플레인 (Workload Plane)](/knowledge/kubernetes/workload-plane/) - 실제 워크로드가 실행되는 영역
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - 객체의 원하는 상태를 실현하는 컴포넌트
