---
title: "etcd"
description: "etcd는 Kubernetes 클러스터의 모든 API 객체를 영구적으로 저장하는 분산 키-값 데이터스토어이다"
tags: ['Kubernetes', 'Etcd', 'Distributed Datastore', 'Control Plane', 'Persistence']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/etcd
sidebar:
  order: 6
---

## 핵심 개념

etcd는 Kubernetes Control Plane의 핵심 컴포넌트 중 하나로, 클러스터의 전체 상태(state)를 보관한다. Kubernetes에서 생성되는 모든 객체(Deployment, Pod, Service 등)의 데이터가 etcd에 저장된다.

주요 특징:
- **분산 저장소**: 고가용성을 위해 여러 마스터 노드에 복제될 수 있음
- **독점적 접근**: Kubernetes 컴포넌트 중 오직 API Server만이 etcd와 직접 통신함. 다른 컴포넌트는 반드시 API Server를 경유해야 함
- **이벤트 삭제 정책**: Event 객체는 etcd의 부담을 줄이기 위해 생성 후 1시간 뒤에 삭제됨 (설정 가능)
- **일관성 보장**: 분산 합의 알고리즘(Raft)을 사용하여 데이터 일관성을 유지

etcd의 데이터 저장 흐름:
1. 사용자가 kubectl을 통해 객체 생성 요청
2. API Server가 요청을 검증
3. 검증된 객체 데이터가 etcd에 저장
4. API Server가 관련 컴포넌트에 변경 사항을 알림

etcd의 안정성은 클러스터 전체의 안정성에 직결되므로, 프로덕션 환경에서는 최소 3개의 etcd 인스턴스를 운영하는 것이 권장된다.

## 예시

```
데이터 저장 흐름:

kubectl create deployment kiada --image=luksa/kiada:0.1
    |
    v
API Server (검증)
    |
    v
etcd (객체 데이터 영구 저장)
    |
    v
API Server --> 컨트롤러, 스케줄러 등에 알림
```

etcd에 저장되는 데이터의 예:
- Node 객체: 클러스터 노드의 구성 및 상태
- Pod 객체: 애플리케이션 인스턴스 정보
- Deployment 객체: 배포 설정
- Service 객체: 서비스 네트워킹 설정
- Event 객체: 클러스터 이벤트 (1시간 후 자동 삭제)

## 관련 개념

- [Control Plane](/knowledge/kubernetes/control-plane/) - etcd가 속한 제어 영역
- [Event Object](/knowledge/kubernetes/event-object/) - etcd 부담을 줄이기 위해 일정 시간 후 삭제되는 객체
- [Object Manifest](/knowledge/kubernetes/object-manifest/) - etcd에 저장되는 객체의 형식
