---
title: "Controller"
description: "Controller(컨트롤러)는 Kubernetes Control Plane에서 실행되며 API 객체를 관찰하고, 객체의 Spec에 기술된 원하는 상태를 실현하기 위한 작업을 수행하고, 실제 상태를 Status에 보고하는 컴포넌트이다"
tags: ['Kubernetes', 'Controller', 'Reconciliation', 'Control Loop', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/controller
sidebar:
  order: 4
---

## 핵심 개념

Controller는 Kubernetes의 자동화를 실현하는 핵심 메커니즘이다. "선언적 모델"이 작동하는 이유는 컨트롤러가 지속적으로 원하는 상태와 실제 상태를 비교하고 조정하기 때문이다.

**컨트롤러의 동작 패턴 (Reconciliation Loop):**
1. API Server를 통해 새로운 객체 생성 또는 변경 알림을 수신
2. 객체의 Spec (원하는 상태)을 읽음
3. 현재 실제 상태를 확인
4. 원하는 상태를 달성하기 위한 작업 수행
5. 실제 상태를 객체의 Status에 기록
6. 이 과정을 지속적으로 반복

**주요 컨트롤러 유형:**
- **Deployment Controller**: Deployment 객체를 관리. Pod 객체를 생성/삭제하여 원하는 복제본 수 유지
- **Scheduler**: 특수한 컨트롤러. 미할당 Pod를 워커 노드에 할당
- **Kubelet**: 워커 노드에서 실행되는 컨트롤러. 노드에 할당된 Pod의 실행을 담당
- **Kube Proxy**: 워커 노드에서 실행. Service에 대한 네트워크 규칙 설정

**컨트롤러의 작업 방식:**
- 대부분의 컨트롤러는 같은 Kubernetes API를 통해 다른 객체를 생성
- 일부 컨트롤러는 외부 시스템(클라우드 프로바이더 API)과 통신
- 컨트롤러가 작업을 수행할 때 Event 객체를 생성하여 수행한 작업을 기록

**이벤트 생성:**
- 컨트롤러가 조정 작업을 수행할 때 Normal 또는 Warning 타입의 이벤트를 생성
- Normal: 정상적인 작업 수행 시
- Warning: 객체 조정에 실패하거나 문제가 발생했을 때

## 예시

```
Deployment Controller의 조정 루프:

1. 사용자: Deployment 생성 (replicas: 3)
2. Deployment Controller:
   - Deployment Spec 읽기: replicas=3
   - 현재 Pod 수 확인: 0개
   - 3개의 Pod 객체 생성 (API를 통해)
   - Deployment Status 업데이트: availableReplicas=3
3. Pod 1개 장애 발생:
   - 현재 Pod 수 확인: 2개
   - 1개의 새 Pod 객체 생성
   - Deployment Status 업데이트: availableReplicas=3
```

```bash
# 컨트롤러가 생성한 이벤트 확인
$ kubectl get events
LAST SEEN  TYPE    REASON     OBJECT           MESSAGE
48s        Normal  Starting   node/kind-worker Starting kubelet.
48s        Normal  Scheduled  pod/kiada-xxx    Successfully assigned...
47s        Normal  Pulling    pod/kiada-xxx    Pulling image "luksa/kiada:0.1"
47s        Normal  Pulled     pod/kiada-xxx    Successfully pulled image
47s        Normal  Created    pod/kiada-xxx    Created container kiada
47s        Normal  Started    pod/kiada-xxx    Started container kiada
```

## 관련 개념

- [Spec and Status](/knowledge/kubernetes/spec-and-status/) - 컨트롤러가 읽고 쓰는 객체의 핵심 섹션
- [Declarative Model](/knowledge/kubernetes/declarative-model/) - 컨트롤러가 실현하는 선언적 패턴
- [Control Plane](/knowledge/kubernetes/control-plane/) - 컨트롤러가 실행되는 영역
- [Event Object](/knowledge/kubernetes/event-object/) - 컨트롤러가 작업 수행 시 생성하는 이벤트
- [Deployment](/knowledge/kubernetes/deployment/) - Deployment Controller가 관리하는 객체
- [Kubernetes Scheduler](/knowledge/kubernetes/kubernetes-scheduler/) - 특수한 유형의 컨트롤러
- [Kubelet](/knowledge/kubernetes/kubelet/) - 워커 노드에서 실행되는 컨트롤러
