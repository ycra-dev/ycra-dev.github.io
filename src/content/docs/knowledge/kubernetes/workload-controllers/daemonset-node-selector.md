---
title: "데몬셋 노드 셀렉터 (DaemonSet Node Selector)"
description: "DaemonSet의 Node Selector는 Pod 템플릿의 `nodeSelector` 필드를 사용하여 특정 레이블을 가진 노드에만 daemon Pod를 배포하도록 제한하는 기능으로, 특수 하드웨어를 가진 노드나 특정 역할의 노드에만 에이전트를 배포할 때 사용한다"
tags: ['Daemonset', 'Node Selector', 'Label', 'Scheduling', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/daemonset-node-selector
sidebar:
  order: 25
---

## 핵심 개념

DaemonSet에서 두 종류의 셀렉터를 구분해야 한다:
- **Pod label selector**: DaemonSet에 속하는 Pod를 식별 (불변)
- **Node selector**: Pod를 배포할 노드를 필터링 (변경 가능)

Node Selector를 사용하면 DaemonSet 컨트롤러는 셀렉터와 일치하는 레이블을 가진 노드에만 Pod를 생성한다. 노드의 레이블이 변경되면 컨트롤러가 이를 감지하고 자동으로 Pod를 생성하거나 삭제한다.

활용 시나리오:
- GPU 노드에만 CUDA 드라이버 설치 에이전트 배포
- SSD 노드에만 특정 스토리지 관리 데몬 배포
- 다중 아키텍처 클러스터에서 아키텍처별 에이전트 배포

Kubernetes 표준 레이블을 활용할 수 있다:
- `kubernetes.io/arch`: 노드 아키텍처 (amd64, arm)
- `kubernetes.io/os`: 운영체제 (linux, windows)
- `kubernetes.io/hostname`: 노드 호스트명

Node Selector는 Pod label selector와 달리 변경 가능하다. `kubectl patch`의 JSON patch 형식으로 nodeSelector를 추가/삭제할 수 있다.

## 예시

GPU 노드에만 배포하는 DaemonSet:
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: demo
spec:
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:
        app: demo
    spec:
      nodeSelector:
        gpu: cuda              # cuda GPU가 있는 노드에만 배포
      containers:
      - name: demo
        image: busybox
```

노드 레이블 변경에 따른 자동 반응:
```bash
# 노드에 레이블 추가 → Pod 자동 생성
kubectl label node kind-worker2 gpu=cuda

# 노드에서 레이블 제거 → Pod 자동 삭제
kubectl label node kind-worker2 gpu-
```

Node Selector 제거:
```bash
kubectl patch ds demo --type='json' \
  -p='[{"op": "remove", "path": "/spec/template/spec/nodeSelector"}]'
```

## 관련 개념

- [데몬셋 (DaemonSet)](/knowledge/kubernetes/daemonset/) - Node Selector가 적용되는 오브젝트
- [레이블 (Label)](/knowledge/kubernetes/label/) - 노드 필터링에 사용되는 메커니즘
- [쿠버네티스 스케줄러 (Kubernetes Scheduler)](/knowledge/kubernetes/scheduler/) - DaemonSet Pod의 실제 스케줄링을 수행
