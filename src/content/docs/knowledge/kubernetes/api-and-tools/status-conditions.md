---
title: "Status Conditions"
description: "Status Conditions는 Kubernetes 객체의 상태(status) 섹션에 포함된 조건 목록으로, 객체가 현재 처해 있는 여러 상태를 독립적으로(직교적으로, orthogonally) 표현한다"
tags: ['Kubernetes', 'Status', 'Conditions', 'Monitoring', 'Troubleshooting']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/status-conditions
sidebar:
  order: 6
---

## 핵심 개념

많은 Kubernetes 객체 유형이 status 섹션 내에 conditions 필드를 포함하고 있으며, 이는 객체의 상태를 다면적으로 표현하는 데 사용된다.

**Condition의 구조:**

| 필드 | 설명 |
|------|------|
| type | 조건의 유형 (예: Ready, MemoryPressure) |
| status | True, False, 또는 Unknown |
| reason | 마지막 상태 전환의 이유 (머신용) |
| message | 상태 전환에 대한 상세 설명 (사람용) |
| lastTransitionTime | 상태가 전환된 마지막 시간 |
| lastHeartbeatTime | 마지막으로 업데이트를 받은 시간 |

**Node 객체의 주요 Conditions:**
- **Ready**: 노드가 새 워크로드(Pod)를 수락할 준비가 되었는지 (가장 중요)
- **MemoryPressure**: 노드의 메모리가 부족한지
- **DiskPressure**: 노드의 디스크 공간이 부족한지
- **PIDPressure**: 노드에서 사용 가능한 PID가 부족한지

**단일 상태 필드 대비 Conditions의 장점:**
- 객체의 상태를 단일 필드로 표현하면, 새로운 상태 값을 추가할 때 모든 클라이언트를 업데이트해야 함
- Conditions는 직교적(orthogonal)이므로 서로 독립적인 상태를 별도로 추적 가능
- 새로운 Condition 유형을 추가해도 기존 클라이언트에 영향을 주지 않음
- 대부분의 현대 Kubernetes 객체는 단일 상태 필드 대신 Conditions 목록을 사용

**트러블슈팅에서의 활용:**
- 노드가 비정상적으로 동작할 때 Conditions를 확인하면 원인을 빠르게 파악 가능
- MemoryPressure, DiskPressure, PIDPressure 조건이 True이면 리소스 부족 상황

## 예시

```yaml
# Node 객체의 status conditions
status:
  conditions:
  - lastHeartbeatTime: "2020-05-17T13:03:42Z"
    lastTransitionTime: "2020-05-03T15:09:17Z"
    message: kubelet has sufficient memory available
    reason: KubeletHasSufficientMemory
    status: "False"                          # 메모리 압박 없음
    type: MemoryPressure
  - lastHeartbeatTime: "2020-05-17T13:03:42Z"
    lastTransitionTime: "2020-05-03T15:09:17Z"
    message: kubelet has no disk pressure
    reason: KubeletHasNoDiskPressure
    status: "False"                          # 디스크 압박 없음
    type: DiskPressure
  - lastHeartbeatTime: "2020-05-17T13:03:42Z"
    lastTransitionTime: "2020-05-03T15:09:17Z"
    message: kubelet has sufficient PID available
    reason: KubeletHasSufficientPID
    status: "False"                          # PID 압박 없음
    type: PIDPressure
  - lastHeartbeatTime: "2020-05-17T13:03:42Z"
    lastTransitionTime: "2020-05-03T15:10:15Z"
    message: kubelet is posting ready status
    reason: KubeletReady
    status: "True"                           # 노드 준비 완료
    type: Ready
```

```bash
# jq를 사용하여 conditions만 추출
$ kubectl get node kind-control-plane -o json | jq .status.conditions

# kubectl describe로 conditions 확인
$ kubectl describe node kind-worker2
Conditions:
  Type             Status  Reason                       Message
  MemoryPressure   False   KubeletHasSufficientMemory   ...
  DiskPressure     False   KubeletHasNoDiskPressure     ...
  PIDPressure      False   KubeletHasSufficientPID      ...
  Ready            True    KubeletReady                 ...
```

## 관련 개념

- [Spec and Status](/knowledge/kubernetes/spec-and-status/) - Conditions가 속한 Status 섹션
- [Object Manifest](/knowledge/kubernetes/object-manifest/) - Conditions를 포함하는 전체 매니페스트
- [Controller](/knowledge/kubernetes/controller/) - Conditions를 업데이트하는 컨트롤러
- [Event Object](/knowledge/kubernetes/event-object/) - Conditions와 함께 상태를 파악하는 수단
- [Kubelet](/knowledge/kubernetes/kubelet/) - Node의 Conditions를 보고하는 에이전트
