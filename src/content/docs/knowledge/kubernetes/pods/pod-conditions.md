---
title: "Pod Conditions"
description: "Pod Conditions는 Pod가 특정 상태에 도달했는지 여부와 그 이유를 나타내는 조건 목록으로, Pod phase보다 더 세밀한 상태 정보를 제공한다"
tags: ['Kubernetes', 'Pod', 'Status', 'Conditions', 'Lifecycle']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/pod-conditions
sidebar:
  order: 9
---

## 핵심 개념

Pod phase가 하나의 단순한 상태값이라면, Pod Conditions는 여러 조건을 동시에 추적하여 Pod의 상태를 다각도로 파악할 수 있게 한다. 현재 네 가지 조건 유형이 존재한다:

| 조건 | 설명 |
|------|------|
| **PodScheduled** | Pod가 노드에 스케줄링되었는지 여부 |
| **Initialized** | Pod의 모든 init 컨테이너가 성공적으로 완료되었는지 여부 |
| **ContainersReady** | Pod의 모든 컨테이너가 준비(ready) 상태인지 여부 |
| **Ready** | Pod가 클라이언트에게 서비스를 제공할 준비가 되었는지 여부. ContainersReady + readiness gates 모두 충족해야 함 |

각 조건은 True, False, Unknown 중 하나의 상태값을 가지며, 추가적으로 다음 필드를 포함할 수 있다:
- **reason**: 마지막 상태 변경의 기계 판독 가능한 이유
- **message**: 변경에 대한 상세 설명
- **lastTransitionTime**: 상태 변경이 발생한 시간
- **lastProbeTime**: 조건이 마지막으로 확인된 시간

PodScheduled와 Initialized는 한 번 충족되면 Pod 생명 주기 동안 유지되지만, Ready와 ContainersReady는 Pod 수명 동안 여러 번 변경될 수 있다. 이는 컨테이너 장애, 재시작, 프로브 실패 등에 의해 변동될 수 있기 때문이다.

## 예시

`kubectl describe`로 조건 확인:

```bash
kubectl describe po kiada
# Conditions:
#   Type              Status
#   Initialized       True
#   Ready             True
#   ContainersReady   True
#   PodScheduled      True
```

JSON으로 상세 조건 정보 확인:

```bash
kubectl get po kiada -o json | jq .status.conditions
# [
#   {
#     "lastProbeTime": null,
#     "lastTransitionTime": "2020-02-02T11:42:59Z",
#     "status": "True",
#     "type": "Initialized"
#   },
#   ...
# ]
```

## 관련 개념

- [Pod Phase](/knowledge/kubernetes/pod-phase/) - 조건보다 상위 수준의 Pod 상태 정보
- [Status Conditions](/knowledge/kubernetes/status-conditions/) - 다양한 Kubernetes 오브젝트에 공통으로 존재하는 조건 메커니즘
- [Liveness Probe](/knowledge/kubernetes/liveness-probe/) - ContainersReady 조건에 영향을 미치는 헬스 체크
- [Spec and Status](/knowledge/kubernetes/spec-and-status/) - 조건이 포함된 오브젝트의 상태 섹션
- [Pod](/knowledge/kubernetes/pod/) - 조건이 속하는 기본 리소스
