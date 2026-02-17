---
title: "Reconciliation Control Loop"
description: "Reconciliation Control Loop(조정 제어 루프)는 Kubernetes 컨트롤러가 소유 오브젝트의 원하는 상태(desired state)와 종속 오브젝트의 실제 상태(actual state)를 지속적으로 비교하고, 차이가 있으면 실제 상태를 원하..."
tags: ['Reconciliation', 'Control Loop', 'Controller', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/reconciliation-control-loop
sidebar:
  order: 2
---

## 핵심 개념

Kubernetes의 거의 모든 오브젝트 타입에는 연관된 컨트롤러가 있다. 각 컨트롤러는 조정 제어 루프를 실행하며, 이 루프는 다음 세 단계로 구성된다:

1. **관찰(Observe)**: 소유 오브젝트와 종속 오브젝트의 상태를 관찰
2. **비교(Compare)**: 종속 오브젝트의 실제 상태를 소유 오브젝트에 지정된 원하는 상태와 비교
3. **조정(Reconcile)**: 두 상태가 다르면 종속 오브젝트를 변경하여 조정

ReplicaSet 컨트롤러의 경우, ReplicaSet과 Pod를 관찰하고, 실제 Pod 수가 원하는 수와 다르면 Pod를 생성하거나 삭제한다. 이 루프는 replicas 필드 변경뿐 아니라 Pod가 삭제되거나 노드가 장애일 때도 작동한다.

컨트롤러가 작업을 수행할 때마다 Event 오브젝트를 생성하여 수행한 작업을 기록한다.

## 예시

ReplicaSet 컨트롤러의 조정 과정:

```
[원하는 상태: replicas=3] vs [실제 상태: Pod 2개 실행 중]
  → 차이 감지 → Pod 1개 추가 생성

[원하는 상태: replicas=3] vs [실제 상태: Pod 4개 실행 중]
  → 차이 감지 → Pod 1개 삭제
```

이벤트 확인:
```bash
kubectl describe rs kiada
# Events:
#   Normal  SuccessfulCreate  replicaset-controller  Created pod: kiada-dl7vz
#   Normal  SuccessfulDelete  replicaset-controller  Deleted pod: kiada-k9hn2
```

## 관련 개념

- [ReplicaSet](/knowledge/kubernetes/replicaset/) - 조정 루프의 대표적인 구현 사례
- [Controller](/knowledge/kubernetes/controller/) - 조정 루프를 실행하는 Kubernetes 컴포넌트
- [Declarative Model](/knowledge/kubernetes/declarative-model/) - 원하는 상태를 선언하면 컨트롤러가 조정하는 패턴
- [Event Object](/knowledge/kubernetes/event-object/) - 컨트롤러가 작업 기록을 남기는 방식
- [API Server](/knowledge/kubernetes/api-server/) - 컨트롤러가 상태 변경을 감지하는 통로
