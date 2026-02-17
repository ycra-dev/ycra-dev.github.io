---
title: "Spec and Status"
description: "Spec과 Status는 대부분의 Kubernetes API 객체가 가진 두 핵심 섹션이다"
tags: ['Kubernetes', 'Spec', 'Status', 'Desired State', 'Actual State', 'Reconciliation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/spec-and-status
sidebar:
  order: 3
---

## 핵심 개념

Spec과 Status의 관계는 Kubernetes의 선언적 모델의 핵심을 이룬다. 이 둘의 상호작용을 통해 Kubernetes가 시스템의 상태를 지속적으로 원하는 상태로 수렴시킨다.

**역할 분담:**
- **사용자**: Spec을 작성 (원하는 상태 선언)
- **컨트롤러**: Spec을 읽고, 필요한 작업을 수행하고, Status를 작성 (실제 상태 보고)

**컨트롤러의 조정(Reconciliation) 루프:**
1. 컨트롤러가 객체의 Spec을 읽음
2. 원하는 상태를 달성하기 위한 작업 수행
3. 실제 상태를 Status에 기록
4. 이 과정을 지속적으로 반복

예시 - Deployment의 경우:
- Spec: `replicas: 3`, 사용할 이미지 등
- 컨트롤러: Spec을 읽고 Pod 3개를 생성
- Status: 현재 사용 가능한 replicas 수, 업데이트 상태 등

예시 - Node의 경우:
- Spec: Pod CIDR 범위, taint 설정 등
- Kubelet: 노드 상태를 모니터링
- Status: IP 주소, 호스트명, CPU/메모리 용량, conditions 등

**Spec/Status가 없는 객체:**
- Event 같은 일부 객체는 Spec과 Status가 없음
- 주로 정적 데이터만 포함하고 대응하는 컨트롤러가 없는 경우
- 이러한 객체는 원하는 상태와 실제 상태를 구분할 필요가 없음

## 예시

```yaml
# Pod 객체의 Spec과 Status

spec:                                  # 사용자가 정의한 원하는 상태
  containers:
  - name: kiada
    image: luksa/kiada:0.1
    ports:
    - containerPort: 8080

status:                                # 컨트롤러/Kubelet이 보고하는 실제 상태
  phase: Running
  conditions:
  - type: Ready
    status: "True"
  containerStatuses:
  - name: kiada
    ready: true
    state:
      running:
        startedAt: "2020-05-17T12:31:00Z"
  podIP: 10.244.1.5
  hostIP: 172.18.0.4
```

```
Spec과 Status의 상호작용:

사용자 --[Spec 작성]--> API 객체 <--[Status 업데이트]-- 컨트롤러
                           |
                    [Spec 읽기]
                           |
                       컨트롤러
                     (조정 작업 수행)
```

```bash
# kubectl explain으로 Spec 필드 탐색
$ kubectl explain node.spec
$ kubectl explain pod.spec.containers

# kubectl explain으로 Status 필드 탐색
$ kubectl explain node.status
$ kubectl explain pod.status.conditions
```

## 관련 개념

- [Object Manifest](/knowledge/kubernetes/object-manifest/) - Spec과 Status를 포함하는 전체 매니페스트
- [Controller](/knowledge/kubernetes/controller/) - Spec을 읽고 Status를 작성하는 주체
- [Declarative Model](/knowledge/kubernetes/declarative-model/) - Spec을 통한 선언적 상태 관리
- [Status Conditions](/knowledge/kubernetes/status-conditions/) - Status 내의 세부 상태 정보
- [Kubernetes API](/knowledge/kubernetes/kubernetes-api/) - Spec과 Status가 전달되는 API
