---
title: "ReplicaSet Scaling"
description: "ReplicaSet 스케일링은 ReplicaSet의 `replicas` 필드 값을 변경하여 Pod 복제본 수를 늘리거나(scale up) 줄이는(scale down) 작업으로, kubectl scale 명령, kubectl edit, 또는 매니페스트 재적용으로 수..."
tags: ['Scaling', 'Replicaset', 'Horizontal Scaling', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/replicaset-scaling
sidebar:
  order: 5
---

## 핵심 개념

스케일링은 ReplicaSet의 replicas 값을 변경하면 즉시 반영된다. 스케일 다운 시 Kubernetes는 체계적인 규칙에 따라 삭제할 Pod를 결정한다:

1. 아직 노드에 할당되지 않은 Pod
2. 상태가 Unknown인 Pod
3. Ready 상태가 아닌 Pod
4. 삭제 비용(deletion cost)이 낮은 Pod
5. 관련 복제본이 더 많이 모여 있는 노드의 Pod
6. Ready 상태로 있던 시간이 짧은 Pod
7. 컨테이너 재시작 횟수가 많은 Pod
8. 더 나중에 생성된 Pod

`controller.kubernetes.io/pod-deletion-cost` 어노테이션을 통해 삭제 우선순위를 직접 조정할 수도 있다. 또한 Kubernetes는 클러스터 노드 간에 Pod를 균등하게 분배하려고 시도한다.

replicas를 0으로 설정하면 모든 Pod가 삭제되지만 ReplicaSet 오브젝트 자체는 유지되어 나중에 다시 스케일 업할 수 있다.

## 예시

```bash
# 스케일 업
kubectl scale rs kiada --replicas 6

# 스케일 다운
kubectl scale rs kiada --replicas 3

# 0으로 스케일 다운 (일시 중지 효과)
kubectl scale rs kiada --replicas 0

# 다시 스케일 업
kubectl scale rs kiada --replicas 2
```

삭제 비용 설정:
```bash
kubectl annotate pod kiada-001 controller.kubernetes.io/pod-deletion-cost="100"
```

## 관련 개념

- [ReplicaSet](/knowledge/kubernetes/replicaset/) - 스케일링의 대상 오브젝트
- [Horizontal Scaling](/knowledge/kubernetes/horizontal-scaling/) - ReplicaSet 스케일링은 수평 확장의 구현
- [Reconciliation Control Loop](/knowledge/kubernetes/reconciliation-control-loop/) - 스케일링 변경을 감지하고 조정하는 메커니즘
- [Deployment](/knowledge/kubernetes/deployment/) - Deployment를 통한 스케일링도 동일한 원리
