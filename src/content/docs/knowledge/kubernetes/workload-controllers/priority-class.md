---
title: "프라이어리티 클래스 (Priority Class)"
description: "PriorityClass는 Pod의 중요도를 나타내는 Kubernetes 오브젝트로, 높은 우선순위의 Pod가 리소스 부족 시 낮은 우선순위의 Pod를 축출(preempt)할 수 있게 하며, 특히 DaemonSet의 시스템 중요 Pod에 사용된다"
tags: ['Priority Class', 'Scheduling', 'Preemption', 'Daemonset', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/priority-class
sidebar:
  order: 28
---

## 핵심 개념

클러스터에는 기본적으로 두 가지 PriorityClass가 존재한다:
- **system-cluster-critical** (값: 2,000,000,000): 클러스터 운영에 중요한 Pod. 필요시 다른 노드로 이동 가능.
- **system-node-critical** (값: 2,000,001,000): 특정 노드 운영에 중요한 Pod. 해당 노드에서 이동 불가.

PriorityClass의 핵심 속성:
- `value`: 정수 값으로 우선순위를 나타냄 (높을수록 높은 우선순위)
- `globalDefault`: true이면 모든 Pod의 기본 PriorityClass
- `preemptionPolicy`: 스케줄링 시 낮은 우선순위 Pod 축출 여부

Pod에 PriorityClass를 할당하려면 `spec.priorityClassName` 필드에 클래스 이름을 지정한다.

DaemonSet에서 PriorityClass가 중요한 이유:
- 노드 에이전트는 일반 워크로드보다 중요한 경우가 많음
- 노드가 리소스 부족일 때 시스템 Pod가 우선 스케줄링되어야 함
- kube-proxy는 `system-node-critical` PriorityClass를 사용

## 예시

```bash
# PriorityClass 목록 확인
kubectl get priorityclasses
# NAME                      VALUE        GLOBAL-DEFAULT   AGE
# system-cluster-critical   2000000000   false            9h
# system-node-critical      2000001000   false            9h
```

DaemonSet Pod에 PriorityClass 할당:
```yaml
spec:
  template:
    spec:
      priorityClassName: system-node-critical
      containers:
      - name: kube-proxy
        image: k8s.gcr.io/kube-proxy:v1.23.4
```

커스텀 PriorityClass 생성:
```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority-daemon
value: 1000000
globalDefault: false
description: "For critical daemon pods"
```

## 관련 개념

- [데몬셋 (DaemonSet)](/knowledge/kubernetes/daemonset/) - PriorityClass를 주로 사용하는 워크로드 유형
- [쿠버네티스 스케줄러 (Kubernetes Scheduler)](/knowledge/kubernetes/scheduler/) - PriorityClass에 따라 Pod 배치와 축출 결정
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - system-node-critical을 사용하는 대표 서비스
