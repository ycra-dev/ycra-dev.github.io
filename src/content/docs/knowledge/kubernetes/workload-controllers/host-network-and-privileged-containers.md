---
title: "Host Network and Privileged Containers"
description: "DaemonSet Pod는 노드의 리소스에 대한 특별한 접근이 필요할 수 있으며, `hostNetwork`, `hostPort`, `privileged` 설정, 그리고 capabilities를 통해 노드의 네트워크, 파일시스템, 커널에 대한 접근 수준을 제어할 수 있다"
tags: ['Daemonset', 'Host Network', 'Privileged', 'Security Context', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/host-network-and-privileged-containers
sidebar:
  order: 27
---

## 핵심 개념

**호스트 네트워크 (`hostNetwork: true`)**:
- Pod가 자체 네트워크 인터페이스 대신 노드의 네트워크 환경을 사용
- Pod IP가 노드 IP와 동일해짐
- 노드의 네트워크 포트에 직접 바인딩 가능
- kube-proxy가 이 방식을 사용함

**호스트 포트 (`hostPort`)**:
- Pod는 자체 네트워크를 유지하면서 특정 포트만 노드에 포워딩
- NodePort Service와 다름: 해당 노드의 로컬 Pod에만 트래픽 전달
- 외부에서 노드 IP:포트로 접근 가능

**Privileged 컨테이너 (`privileged: true`)**:
- 커널의 모든 시스템 콜에 대한 전체 접근 권한
- kube-proxy가 iptables/nftables 규칙 수정을 위해 사용
- 보안 관점에서 최소한으로 사용해야 함

**Capabilities**:
- 특정 커널 기능만 선택적으로 부여 (privileged보다 안전)
- 예: NET_RAW (특수 소켓), NET_ADMIN (네트워크 설정 변경)
- kindnet CNI 플러그인이 이 방식을 사용

**hostIPC, hostPID**:
- 노드의 IPC 또는 PID 네임스페이스를 공유하여 노드의 프로세스와 통신 가능

## 예시

호스트 네트워크 사용:
```yaml
spec:
  template:
    spec:
      hostNetwork: true
      containers:
      - name: node-agent
        image: luksa/node-agent:0.1
        args:
        - --listen-address
        - :11559
```

호스트 포트 포워딩:
```yaml
spec:
  template:
    spec:
      containers:
      - name: node-agent
        ports:
        - name: http
          containerPort: 80
          hostPort: 11559    # 노드의 11559 → 컨테이너의 80
```

Privileged 컨테이너:
```yaml
containers:
- name: kube-proxy
  securityContext:
    privileged: true
```

Capabilities 사용:
```yaml
containers:
- name: kindnet-cni
  securityContext:
    capabilities:
      add:
      - NET_RAW
      - NET_ADMIN
    privileged: false
```

## 관련 개념

- [DaemonSet](/knowledge/kubernetes/daemonset/) - 호스트 리소스 접근이 필요한 워크로드를 배포
- [Linux Namespaces](/knowledge/kubernetes/linux-namespaces/) - Pod 격리의 기반이 되는 기술
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - privileged와 hostNetwork를 사용하는 대표 데몬
- [Pod Manifest](/knowledge/kubernetes/pod-manifest/) - securityContext가 정의되는 위치
