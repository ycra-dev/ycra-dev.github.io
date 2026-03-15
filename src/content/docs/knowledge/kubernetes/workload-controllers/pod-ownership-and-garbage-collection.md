---
title: "파드 소유권과 가비지 컬렉션 (Pod Ownership and Garbage Collection)"
description: "Kubernetes에서 소유권(ownership)은 오브젝트 간의 종속 관계를 나타내며, 소유자(owner) 오브젝트가 삭제되면 가비지 컬렉터(garbage collector)가 종속(dependent) 오브젝트를 자동으로 삭제하는 메커니즘이다"
tags: ['Ownership', 'Garbage Collection', 'Owner References', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/pod-ownership-and-garbage-collection
sidebar:
  order: 4
---

## 핵심 개념

모든 Kubernetes 오브젝트의 metadata 섹션에는 `ownerReferences` 필드가 있을 수 있으며, 이 필드에는 해당 오브젝트를 소유하는 다른 오브젝트에 대한 참조가 포함된다. 하나의 오브젝트에 여러 소유자가 있을 수 있으며, 모든 소유자가 삭제되어야 종속 오브젝트도 삭제된다.

ownerReferences에서 `controller: true`로 표시된 소유자는 해당 오브젝트의 컨트롤러이다. 예를 들어, ReplicaSet의 Pod는 ReplicaSet이 컨트롤러로 표시되어 있다. 이는 사용자가 Pod를 직접 제어하지 말고 ReplicaSet을 통해 제어해야 함을 의미한다.

ReplicaSet을 삭제할 때 Pod를 유지하려면 `--cascade=orphan` 옵션을 사용하면 된다. 이 경우 Pod는 고아(orphan) 상태가 되며, 같은 레이블 셀렉터를 가진 새 ReplicaSet을 생성하면 다시 소유권을 가져간다.

## 예시

Pod의 ownerReferences 확인:
```bash
kubectl get po kiada-001 -o yaml
```

```yaml
metadata:
  ownerReferences:
  - apiVersion: apps/v1
    blockOwnerDeletion: true
    controller: true
    kind: ReplicaSet
    name: kiada
    uid: 8e19d9b3-bbf1-4830-b0b4-da81dd0e6e22
```

Pod를 유지하며 ReplicaSet 삭제:
```bash
kubectl delete rs kiada --cascade=orphan
```

## 관련 개념

- [레플리카셋 (ReplicaSet)](/knowledge/kubernetes/replicaset/) - Pod의 소유자 역할을 하는 대표적 오브젝트
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - ReplicaSet의 소유자이며, 삭제 시 연쇄 삭제 발생
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - ownerReferences에서 controller 필드로 지정
- [스펙과 상태 (Spec and Status)](/knowledge/kubernetes/spec-and-status/) - 소유권은 metadata에 기록됨
