---
title: "데몬셋 (DaemonSet)"
description: "DaemonSet은 클러스터의 각 노드(또는 선택된 노드 집합)에 정확히 하나의 Pod 복제본을 실행하도록 보장하는 Kubernetes API 오브젝트로, 로그 수집, 모니터링, 네트워크 관리 등 노드 수준 시스템 서비스를 배포하는 데 사용된다"
tags: ['Daemonset', 'Node Agent', 'Daemon', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/daemonset
sidebar:
  order: 24
---

## 핵심 개념

DaemonSet은 replicas 필드가 없다. 대신 DaemonSet 컨트롤러가 노드 수에 맞춰 자동으로 Pod를 생성한다. 각 Pod는 `nodeAffinity` 설정을 통해 특정 노드에 스케줄링된다.

DaemonSet 컨트롤러의 조정 루프:
1. 레이블 셀렉터와 일치하는 Pod를 찾음
2. 각 노드에 정확히 하나의 매칭 Pod가 있는지 확인
3. 누락된 노드에 Pod 생성, 초과 Pod 삭제

대표적인 DaemonSet 워크로드:
- **kube-proxy**: Service 라우팅 규칙 관리
- **CNI 플러그인** (kindnet, Calico 등): Pod 네트워크 제공
- **로그 수집** (fluentd, filebeat): 노드 로그 중앙화
- **모니터링** (node-exporter): 노드 메트릭 수집

기본적으로 DaemonSet은 control plane 노드에는 Pod를 배포하지 않는다. Taints와 Tolerations 메커니즘 때문이다. control plane 노드에도 배포하려면 Pod 템플릿에 toleration을 추가해야 한다.

DaemonSet의 status 필드는 노드 수 기준으로 보고한다 (Pod 수가 아님). `numberMisscheduled`가 0이 아니면 잘못 배치된 Pod가 있다는 의미이다.

## 예시

DaemonSet 매니페스트:
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
      containers:
      - name: demo
        image: busybox
        command:
        - sleep
        - infinity
```

모든 노드(control plane 포함)에 배포:
```yaml
spec:
  template:
    spec:
      tolerations:
      - operator: Exists    # 모든 taint 허용
```

```bash
kubectl get ds                    # DaemonSet 목록
kubectl get ds -o wide            # 컨테이너, 이미지 정보 포함
kubectl get pods -l app=demo -o wide  # Pod와 노드 매핑 확인
```

## 관련 개념

- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 복제본 수를 지정하는 다른 방식
- [레플리카셋 (ReplicaSet)](/knowledge/kubernetes/replicaset/) - Pod 배포 방식의 차이 (scatter vs per-node)
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - DaemonSet으로 배포되는 대표 시스템 서비스
- [Kubelet](/knowledge/kubernetes/kubelet/) - 노드에서 DaemonSet Pod를 실행하는 에이전트
- [데몬셋 노드 셀렉터 (DaemonSet Node Selector)](/knowledge/kubernetes/daemonset-node-selector/) - 노드 선택 기능
