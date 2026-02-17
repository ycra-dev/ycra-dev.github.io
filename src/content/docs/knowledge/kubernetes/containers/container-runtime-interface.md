---
title: "Container Runtime Interface"
description: "Container Runtime Interface(CRI)는 Kubernetes가 다양한 컨테이너 런타임을 지원할 수 있도록 정의된 표준 인터페이스이다"
tags: ['Kubernetes', 'Cri', 'Container Runtime', 'Oci', 'Docker']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container-runtime-interface
sidebar:
  order: 9
---

## 핵심 개념

Kubernetes는 초기에 Docker만을 컨테이너 런타임으로 지원했으나, CRI를 도입하여 다양한 런타임을 플러그인 방식으로 지원하게 되었다.

**관련 표준과 프로젝트:**

1. **OCI (Open Container Initiative)**: Docker 성공 이후 컨테이너 포맷과 런타임에 대한 개방형 산업 표준을 만들기 위해 설립
   - OCI Image Format Specification: 컨테이너 이미지의 표준 형식
   - OCI Runtime Specification: 컨테이너 런타임의 표준 인터페이스

2. **CRI 구현체들:**
   - **Docker**: 가장 널리 사용되는 런타임 (초기 유일한 지원)
   - **CRI-O**: Docker의 경량 대안으로, OCI 호환 런타임을 Kubernetes와 연결
   - **containerd**: Docker에서 분리된 핵심 컨테이너 런타임

3. **OCI 호환 런타임 예시:**
   - rkt (Rocket)
   - runC
   - Kata Containers

CRI의 의미:
- Kubernetes 사용자가 특정 런타임에 종속되지 않음
- 보안, 성능, 경량화 등 요구사항에 따라 적절한 런타임 선택 가능
- kind 도구는 Docker 대신 CRI-O를 사용하며, `crictl` CLI 도구로 상호작용

## 예시

```bash
# Docker를 사용하는 환경에서 컨테이너 목록 확인
$ docker ps
CONTAINER ID    IMAGE           NAMES
44d76963e8e1    kiada:latest    kiada-container

# CRI-O를 사용하는 kind 노드에서 컨테이너 목록 확인
root@kind-control-plane:/# crictl ps
CONTAINER ID    IMAGE           STATE     NAME
c7f44d171fb72   eb516548c180f   Running   coredns
e6522aae66fcc   d428039608992   Running   kube-proxy
c3e66dfe44deb   be321f2ded3f3   Running   kube-apiserver

# CRI를 통한 컨테이너 실행 흐름:
# 1. Kubelet이 Pod 실행 요청을 받음
# 2. CRI를 통해 컨테이너 런타임에 지시
# 3. 런타임(Docker/CRI-O/containerd)이 컨테이너 생성 및 실행
```

```
CRI 아키텍처:

Kubelet --> CRI --> Docker
                --> CRI-O --> runC
                         --> Kata Containers
                --> containerd --> runC
```

## 관련 개념

- [Container](/knowledge/kubernetes/container/) - CRI를 통해 관리되는 실행 인스턴스
- [Kubelet](/knowledge/kubernetes/kubelet/) - CRI를 통해 컨테이너 런타임과 통신하는 에이전트
- [Container Image](/knowledge/kubernetes/container-image/) - OCI 표준 형식의 이미지
- [Workload Plane](/knowledge/kubernetes/workload-plane/) - 컨테이너 런타임이 실행되는 영역
