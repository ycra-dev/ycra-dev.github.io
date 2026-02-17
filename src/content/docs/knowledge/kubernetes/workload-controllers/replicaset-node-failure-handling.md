---
title: "ReplicaSet Node Failure Handling"
description: "ReplicaSet의 노드 장애 처리는 클러스터 노드가 응답하지 않을 때 해당 노드의 Pod를 다른 정상 노드에 자동으로 재생성하여 서비스 가용성을 유지하는 메커니즘이다"
tags: ['Replicaset', 'Node Failure', 'High Availability', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/replicaset-node-failure-handling
sidebar:
  order: 8
---

## 핵심 개념

노드 장애 시 처리 흐름은 다음과 같다:

1. Kubelet이 API 서버와 통신 불가 상태가 됨
2. 노드 상태가 `NotReady`로 변경됨
3. 즉시 Pod에 영향을 주지는 않음 (일시적 네트워크 문제일 수 있으므로)
4. 일정 시간이 지나면 Kubernetes가 해당 노드의 Pod를 삭제 대상으로 표시
5. ReplicaSet 컨트롤러가 부족한 Pod를 감지하고 정상 노드에 새 Pod 생성

Pod가 삭제 대상으로 표시되기까지의 시간은 Taints와 Tolerations 메커니즘으로 구성할 수 있다. 삭제 표시된 Pod는 `Terminating` 상태로 표시되지만, 실제로는 원래 노드에서 여전히 실행 중일 수 있다. 노드가 복구되면 Kubelet이 해당 컨테이너를 종료하고 Pod 오브젝트가 삭제된다.

이것이 Pod를 직접 생성하지 않고 ReplicaSet을 통해 생성하는 가장 중요한 이유이다. 직접 생성한 Pod는 노드 장애 시 자동 복구되지 않는다.

## 예시

노드 장애 시뮬레이션 (kind 클러스터):
```bash
# 네트워크 인터페이스 비활성화
docker exec kind-worker2 ip link set eth0 down

# 노드 상태 확인
kubectl get node
# kind-worker2  NotReady

# Pod 상태 확인 (몇 분 후)
kubectl get pods -l app=kiada -o wide
# kiada-ffstj   Running      kind-worker    (새로 생성)
# kiada-l2r85   Terminating  kind-worker2   (삭제 대기)
# kiada-wkpsn   Running      kind-worker    (새로 생성)

# 노드 복구
docker exec kind-worker2 ip link set eth0 up
```

## 관련 개념

- [ReplicaSet](/knowledge/kubernetes/replicaset/) - 노드 장애 복구를 수행하는 컨트롤러
- [Kubelet](/knowledge/kubernetes/kubelet/) - 노드 상태를 API 서버에 보고하는 에이전트
- [Reconciliation Control Loop](/knowledge/kubernetes/reconciliation-control-loop/) - 장애 감지 및 복구의 기반 메커니즘
- [Scheduler](/knowledge/kubernetes/scheduler/) - 새 Pod를 정상 노드에 배치하는 역할
