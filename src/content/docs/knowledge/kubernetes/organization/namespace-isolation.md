---
title: "Namespace Isolation"
description: "Kubernetes에서 Namespace는 이름 범위 격리만 제공하며, 기본적으로 런타임 격리나 네트워크 격리를 제공하지 않는다"
tags: ['Kubernetes', 'Namespace', 'Isolation', 'Security', 'Network Policy']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/namespace-isolation
sidebar:
  order: 2
---

## 핵심 개념

Namespace가 제공하는 것과 제공하지 않는 것을 명확히 이해하는 것이 중요하다.

**Namespace가 제공하는 것**:
- 오브젝트 이름의 범위 분리 (같은 이름의 파드가 다른 네임스페이스에 존재 가능)
- RBAC을 통한 사용자 권한 범위 (특정 네임스페이스에만 접근 권한 부여)
- Resource Quota를 통한 리소스 사용량 제한 범위

**Namespace가 제공하지 않는 것**:
- 런타임 격리: 다른 네임스페이스의 파드가 같은 물리 노드에서 실행될 수 있으며, 동일한 OS 커널을 공유한다. 컨테이너 탈출이나 과도한 리소스 소비가 다른 파드에 영향을 줄 수 있다.
- 네트워크 격리: 기본적으로 한 네임스페이스의 파드가 다른 네임스페이스의 파드와 자유롭게 통신할 수 있다. NetworkPolicy 오브젝트를 사용하여 명시적으로 네트워크 격리를 설정해야 한다.

이러한 이유로, 프로덕션/스테이징/개발 환경을 네임스페이스로만 분리하는 것은 위험하며, 각 환경을 별도의 물리적 클러스터에서 운영하는 것이 권장된다.

## 예시

네임스페이스 간 파드 통신은 기본적으로 가능:

```bash
# kiada 네임스페이스의 파드에서 다른 네임스페이스의 서비스 접근
curl http://quiz.other-namespace
```

네트워크 격리를 위해서는 NetworkPolicy가 필요:

```yaml
# NetworkPolicy 예시 (Chapter 25에서 상세 설명)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-from-other-namespaces
spec:
  podSelector: {}
  ingress:
  - from:
    - podSelector: {}
```

서로 다른 네임스페이스의 파드가 같은 노드에서 실행되는 것 확인:

```bash
kubectl get pods -A -o wide
```

## 관련 개념

- [Namespace](/knowledge/kubernetes/namespace/) - 격리의 기본 단위
- [Linux Namespaces](/knowledge/kubernetes/linux-namespaces/) - OS 수준의 프로세스 격리 (Kubernetes Namespace와 다름)
- [Cgroups](/knowledge/kubernetes/cgroups/) - 컨테이너의 리소스 제한 메커니즘
- [Pod](/knowledge/kubernetes/pod/) - 네임스페이스에 속하는 워크로드 단위
