---
title: "StorageClass"
description: "StorageClass는 클러스터에서 사용 가능한 스토리지의 \"클래스\"를 정의하는 Kubernetes 오브젝트로, 동적 프로비저닝 시 어떤 프로비저너와 파라미터를 사용하여 PersistentVolume을 생성할지 지정한다"
tags: ['Kubernetes', 'Storage', 'Storage Class', 'Dynamic Provisioning', 'Abstraction']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/storage-class
sidebar:
  order: 11
---

## 핵심 개념

StorageClass는 클러스터 관리자가 제공하는 스토리지 유형의 카탈로그와 같다. 각 스토리지 클래스는 특정 프로비저너와 그에 전달할 파라미터를 지정하며, PVC에서 이를 참조하여 원하는 유형의 스토리지를 요청한다.

**StorageClass의 주요 필드:**
| 필드 | 설명 |
|------|------|
| `provisioner` | 볼륨을 생성할 프로비저너 이름 |
| `parameters` | 프로비저너에 전달할 파라미터 |
| `reclaimPolicy` | 생성된 PV의 회수 정책 (기본: Delete) |
| `volumeBindingMode` | 바인딩 시점 (Immediate 또는 WaitForFirstConsumer) |
| `allowVolumeExpansion` | 볼륨 확장 허용 여부 |

**기본 스토리지 클래스:**
- 대부분의 클러스터에 `standard`라는 기본 스토리지 클래스가 존재
- `storageclass.kubernetes.io/is-default-class: "true"` 어노테이션으로 기본 지정
- PVC에서 `storageClassName`을 생략하면 기본 클래스가 사용됨
- `storageClassName: ""`으로 설정하면 동적 프로비저닝이 비활성화됨

**클러스터별 기본 프로비저너:**
- **GKE**: `kubernetes.io/gce-pd` (GCE Persistent Disk)
- **kind**: `rancher.io/local-path` (로컬 경로)
- **Minikube**: `k8s.io/minikube-hostpath` (호스트 경로)

**이식성:**
스토리지 클래스 이름이 적절하게 지정되어 있다면 (예: `standard`, `fast`), PVC 매니페스트를 다른 클러스터에서도 수정 없이 사용할 수 있다. 같은 이름의 스토리지 클래스가 다른 프로비저너를 참조하더라도, PVC는 스토리지 클래스 이름만 알면 된다.

## 예시

GKE의 기본 스토리지 클래스:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-standard
reclaimPolicy: Delete
volumeBindingMode: Immediate
allowVolumeExpansion: true
```

SSD 기반 커스텀 스토리지 클래스:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd                # SSD 유형 지정
```

스토리지 클래스를 참조하는 PVC:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: quiz-data-fast
spec:
  storageClassName: fast      # 커스텀 스토리지 클래스 참조
  resources:
    requests:
      storage: 1Gi
  accessModes:
  - ReadWriteOnce
```

스토리지 클래스 목록 확인:

```bash
kubectl get sc
# NAME                 PROVISIONER            AGE
# standard (default)   kubernetes.io/gce-pd   1d
# fast                 kubernetes.io/gce-pd   5m
```

## 관련 개념

- [Dynamic Provisioning](/knowledge/kubernetes/dynamic-provisioning/) - StorageClass를 기반으로 자동 PV 생성
- [PersistentVolumeClaim](/knowledge/kubernetes/persistentvolumeclaim/) - StorageClass를 참조하여 스토리지를 요청
- [PersistentVolume](/knowledge/kubernetes/persistentvolume/) - StorageClass에 의해 동적으로 생성되는 리소스
- [Volume Binding Mode](/knowledge/kubernetes/volume-binding-mode/) - StorageClass에서 설정하는 바인딩 시점
- [Reclaim Policy](/knowledge/kubernetes/reclaim-policy/) - StorageClass에서 기본 회수 정책을 설정
- [Annotation](/knowledge/kubernetes/annotation/) - 기본 스토리지 클래스를 지정하는 데 사용되는 메타데이터
