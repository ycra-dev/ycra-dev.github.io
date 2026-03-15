---
title: "워크로드 플레인 (Workload Plane)"
description: "Workload Plane(워크로드 플레인)은 사용자의 애플리케이션(워크로드)이 실제로 실행되는 워커 노드들의 집합이다"
tags: ['Kubernetes', 'Workload Plane', 'Worker Node', 'Architecture']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/workload-plane
sidebar:
  order: 8
---

## 핵심 개념

Workload Plane은 클러스터 내에서 사용자가 배포한 애플리케이션을 실행하는 영역이다. 워커 노드의 수는 배포할 애플리케이션의 수에 따라 결정된다. Kubernetes가 설치된 후에는 개별 워커 노드를 인식할 필요 없이, 모든 워커 노드가 하나의 단일 배포 공간으로 취급된다.

각 워커 노드에는 다음과 같은 Kubernetes 컴포넌트가 실행된다:

1. **Kubelet**: API Server와 통신하며, 해당 노드에서 실행 중인 애플리케이션을 관리하고 상태를 보고하는 에이전트
2. **Container Runtime**: Docker 또는 Kubernetes와 호환되는 다른 런타임으로, Kubelet의 지시에 따라 컨테이너에서 애플리케이션을 실행
3. **Kube Proxy**: 애플리케이션 간의 네트워크 트래픽을 로드 밸런싱하는 컴포넌트

중요한 점은 각 애플리케이션이 하나의 워커 노드에 맞을 정도로 작아야 한다는 것이다. Kubernetes는 하나의 애플리케이션을 여러 작은 머신에 걸쳐 분산시키는 마법을 부리지 않는다. 다만 어떤 워커 노드에 배치되든 상관없이 동일하게 동작할 수 있도록 보장한다.

## 예시

```
클러스터 구조:
+--------------------------------------------------+
|                   Kubernetes Cluster              |
|                                                    |
|  [Master Node(s)]     [Worker Node 1] [Worker Node 2] [Worker Node N]
|   Control Plane        Workload Plane (애플리케이션 실행)
|                        - Kubelet        - Kubelet
|                        - Container RT   - Container RT
|                        - Kube Proxy     - Kube Proxy
|                        - App Pods       - App Pods
+--------------------------------------------------+
```

노드 장애 발생 시 Kubernetes는 자동으로 해당 노드의 애플리케이션을 다른 건강한 노드로 이동시킨다.

## 관련 개념

- [컨트롤 플레인 (Control Plane)](/knowledge/kubernetes/control-plane/) - 클러스터를 제어하는 마스터 영역
- [Kubelet](/knowledge/kubernetes/kubelet/) - 워커 노드의 에이전트
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - 네트워크 트래픽 로드 밸런싱
- [파드 (Pod)](/knowledge/kubernetes/pod/) - 워커 노드에서 실행되는 기본 배포 단위
- [컨테이너 런타임 인터페이스 (Container Runtime Interface)](/knowledge/kubernetes/container-runtime-interface/) - 컨테이너 런타임과의 인터페이스
