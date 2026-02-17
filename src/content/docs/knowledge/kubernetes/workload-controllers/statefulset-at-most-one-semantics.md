---
title: "StatefulSet At-Most-One Semantics"
description: "StatefulSet의 at-most-one 보장은 동일한 정체성(이름, 스토리지)을 가진 두 개의 Pod가 동시에 실행되지 않도록 보장하는 메커니즘으로, 노드 장애 시 ReplicaSet과 다른 보수적인 대응 방식을 채택한다"
tags: ['Statefulset', 'Node Failure', 'Consistency', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/statefulset-at-most-one-semantics
sidebar:
  order: 19
---

## 핵심 개념

ReplicaSet은 노드 장애 시 몇 분 후 다른 노드에 대체 Pod를 자동 생성한다. 그러나 StatefulSet은 이렇게 하지 않는다. 그 이유는:

- 동일한 이름의 두 Pod가 같은 네임스페이스에 동시에 존재할 수 없으므로, ordinal 기반 명명 방식이 중복 실행을 방지
- 장애 노드의 Pod가 실제로 종료되었는지 확인할 수 없으므로, 섣불리 대체 Pod를 만들면 동일 정체성의 Pod가 두 개 실행될 수 있음
- 동일 PersistentVolume에 두 Pod가 동시 쓰기하면 데이터 손상 발생 가능

노드 장애 시 StatefulSet의 동작:
1. 노드가 NotReady로 표시됨
2. 일정 시간 후 Pod가 Terminating으로 표시됨
3. Pod는 계속 Terminating 상태를 유지 (기존 노드에서 실제로 종료되지 않을 수 있음)
4. StatefulSet 컨트롤러는 대체 Pod를 생성하지 않음
5. 관리자가 Pod를 강제 삭제하거나 노드가 복구되어야 함

강제 삭제 시에는 `kubectl delete pod quiz-1 --force --grace-period=0` 명령을 사용하지만, 이는 실제 컨테이너가 여전히 실행 중일 수 있으므로 데이터 손상 위험이 있다.

## 예시

노드 장애 시 StatefulSet Pod 상태:
```bash
# 노드 장애 시뮬레이션
docker exec kind-worker2 ip link set eth0 down

# 몇 분 후 Pod 상태
kubectl get pods -l app=quiz
# quiz-0   2/2  Running      0  12m
# quiz-1   2/2  Terminating  0  7m   ← 대체 Pod가 생성되지 않음
# quiz-2   2/2  Running      0  12m

# 강제 삭제 (주의 필요)
kubectl delete pod quiz-1 --force --grace-period=0

# 노드 복구
docker exec kind-worker2 ip link set eth0 up
```

## 관련 개념

- [StatefulSet](/knowledge/kubernetes/statefulset/) - at-most-one 보장을 제공하는 오브젝트
- [ReplicaSet Node Failure Handling](/knowledge/kubernetes/replicaset-node-failure-handling/) - ReplicaSet의 다른 노드 장애 처리 방식
- [PersistentVolumeClaim](/knowledge/kubernetes/persistentvolumeclaim/) - 동시 접근 방지가 필요한 스토리지
- [Kubelet](/knowledge/kubernetes/kubelet/) - 노드 상태를 보고하는 에이전트
