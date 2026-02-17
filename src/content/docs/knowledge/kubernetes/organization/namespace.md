---
title: "Namespace"
description: "Kubernetes Namespace는 하나의 물리적 클러스터를 여러 가상 클러스터로 분할하여, 서로 다른 팀이나 프로젝트의 오브젝트를 이름 충돌 없이 격리하여 관리할 수 있게 하는 메커니즘이다"
tags: ['Kubernetes', 'Namespace', 'Organization', 'Multi Tenancy']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/namespace
sidebar:
  order: 1
---

## 핵심 개념

Namespace는 Kubernetes API 오브젝트의 이름 범위(scope)를 제공한다. 같은 네임스페이스 내에서는 오브젝트 이름이 고유해야 하지만, 서로 다른 네임스페이스에서는 동일한 이름을 사용할 수 있다. 이를 통해 여러 팀이 동일한 클러스터에서 독립적으로 작업할 수 있다.

대부분의 API 오브젝트(Pod, ConfigMap, Secret, PVC, Event 등)는 네임스페이스에 속하지만, 일부(Node, PersistentVolume, StorageClass, Namespace 자체)는 클러스터 범위 오브젝트로 네임스페이스에 속하지 않는다. `kubectl api-resources` 명령의 `NAMESPACED` 컬럼으로 확인할 수 있다.

모든 클러스터에는 기본 네임스페이스가 존재한다: `default`(기본 작업 공간), `kube-system`(시스템 컴포넌트), `kube-public`(공개 데이터), `kube-node-lease`(노드 하트비트). `kube-` 접두사는 시스템용으로 예약되어 있다.

**중요**: 네임스페이스는 런타임 격리를 제공하지 않는다. 다른 네임스페이스의 파드도 같은 노드에서 실행될 수 있고, 기본적으로 네트워크 격리도 없다(NetworkPolicy로 설정 가능). 따라서 프로덕션/스테이징/개발 환경 분리에는 별도의 물리적 클러스터를 사용하는 것이 안전하다.

## 예시

네임스페이스 생성:

```bash
kubectl create namespace kiada-test1
```

YAML 매니페스트로 생성:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kiada-test2
```

특정 네임스페이스의 파드 조회:

```bash
kubectl get pods --namespace kube-system
kubectl get pods -n kube-system
```

모든 네임스페이스의 오브젝트 조회:

```bash
kubectl get cm --all-namespaces
kubectl get cm -A
```

기본 네임스페이스 변경:

```bash
kubectl config set-context --current --namespace kiada-test1
```

네임스페이스 삭제 (내부 오브젝트 자동 삭제):

```bash
kubectl delete ns kiada-test2
```

## 관련 개념

- [Label](/knowledge/kubernetes/label/) - 네임스페이스 내에서 오브젝트를 더 세밀하게 조직화
- [Label Selector](/knowledge/kubernetes/label-selector/) - 네임스페이스 내에서 오브젝트 필터링
- [kubectl](/knowledge/kubernetes/kubectl/) - 네임스페이스를 지정하는 다양한 명령어
- [Linux Namespaces](/knowledge/kubernetes/linux-namespaces/) - 컨테이너 격리에 사용되는 다른 개념 (혼동 주의)
- [Pod](/knowledge/kubernetes/pod/) - 네임스페이스에 속하는 대표적 오브젝트
