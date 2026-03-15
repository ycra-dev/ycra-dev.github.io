---
title: "파드 네트워킹 (Pod Networking)"
description: "Pod Networking은 Pod 내부 컨테이너 간 및 Pod 간의 네트워크 통신 구조를 말하며, 같은 Pod의 컨테이너들은 Network namespace를 공유하여 동일한 IP 주소와 포트 공간을 사용한다"
tags: ['Kubernetes', 'Pod', 'Networking', 'Namespace', 'Network Model']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/pod-networking
sidebar:
  order: 4
---

## 핵심 개념

Kubernetes의 네트워크 모델은 다음과 같은 핵심 원칙을 따른다:

1. **Pod 내부 통신**: 같은 Pod의 모든 컨테이너는 동일한 Network namespace를 공유하므로 같은 네트워크 인터페이스, IP 주소, 포트 공간을 사용한다. 따라서 localhost를 통해 서로 통신할 수 있다. 단, 같은 포트 번호에 여러 프로세스가 바인딩할 수 없다.

2. **Pod 간 통신**: 각 Pod는 고유한 IP 주소를 할당받으며, 클러스터 내의 모든 Pod에서 다른 모든 Pod로 직접 접근할 수 있다. 또한 모든 노드에서 클러스터 내 모든 Pod에 도달할 수 있다.

3. **외부에서 Pod 접근**: Pod의 IP 주소는 일반적으로 클러스터 내부 전용이며, 외부에서 접근하려면 Service, kubectl port-forward 등의 메커니즘을 사용해야 한다.

Pod에서 프로세스 간 통신에 사용되는 공유 namespace:
- **Network namespace**: IP 주소, 포트 공간, 네트워크 인터페이스 공유
- **UTS namespace**: 시스템 호스트명 공유
- **IPC namespace**: Inter-Process Communication 메커니즘 공유
- **PID namespace**: 선택적으로 프로세스 트리 공유 가능 (명시적 활성화 필요)

## 예시

Pod의 IP 주소 확인:

```bash
kubectl get pod kiada -o wide
# NAME    READY   STATUS    RESTARTS   AGE   IP           NODE     ...
# kiada   1/1     Running   0          35m   10.244.2.4   worker2  ...
```

Pod에 접근하는 세 가지 방법:

```bash
# 1. 워커 노드에서 직접 접근
curl 10.244.2.4:8080

# 2. 일회성 클라이언트 Pod에서 접근
kubectl run --image=curlimages/curl -it --restart=Never --rm client-pod \
  curl 10.244.2.4:8080

# 3. kubectl port-forward를 통한 접근
kubectl port-forward kiada 8080
curl localhost:8080
```

사이드카 컨테이너가 localhost를 통해 주 컨테이너와 통신하는 예시 (Envoy -> Node.js):

```
Envoy (port 8443, HTTPS) --> localhost:8080 --> Node.js (HTTP)
```

## 관련 개념

- [파드 (Pod)](/knowledge/kubernetes/pod/) - 네트워크 namespace를 공유하는 컨테이너 그룹
- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/kubernetes/linux-namespaces/) - Pod의 네트워크 격리를 구현하는 커널 기능
- [서비스 (Service)](/knowledge/kubernetes/service/) - Pod에 안정적인 네트워크 엔드포인트를 제공
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - 서비스에서 Pod로의 트래픽 라우팅을 담당
- [kubectl port-forward](/knowledge/kubernetes/kubectl-port-forward/) - 개발 중 Pod에 직접 접근하기 위한 도구
