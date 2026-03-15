---
title: "반환 정책 (Reclaim Policy)"
description: "Reclaim Policy는 PersistentVolume이 릴리즈(PVC 삭제)될 때 PV 오브젝트와 기반 스토리지를 어떻게 처리할지 결정하는 정책으로, Retain, Delete, Recycle 세 가지가 있다"
tags: ['Kubernetes', 'Storage', 'Reclaim Policy', 'Persistent Volume', 'Lifecycle']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/reclaim-policy
sidebar:
  order: 14
---

## 핵심 개념

PVC가 삭제되면 바인딩된 PV가 "릴리즈"되며, 이때 회수 정책에 따라 PV의 후속 처리가 달라진다.

| 정책 | 설명 | 기본 적용 대상 |
|------|------|---------------|
| **Retain** | PV 오브젝트와 기반 스토리지를 모두 보존. 관리자가 수동으로 정리해야 함. PV 상태는 Released로 변경되어 직접 재바인딩 불가 | 수동 프로비저닝된 PV |
| **Delete** | PV 오브젝트와 기반 스토리지를 모두 자동 삭제 | 동적 프로비저닝된 PV |
| **Recycle** | (사용 중단) 볼륨의 모든 파일을 삭제하고 PV를 Available 상태로 변경 | - |

**중요 동작:**
- Retain 정책의 Released PV를 다시 사용하려면:
  1. PV를 삭제 후 재생성 (기반 스토리지 데이터는 보존됨), 또는
  2. PV 오브젝트의 `spec.claimRef`를 제거
- Delete 정책으로 설정된 Released PV의 정책을 Retain으로 변경하지 않으면, PV와 기반 스토리지가 즉시 삭제됨
- PV를 수동으로 삭제하면 (kubectl delete pv), 기반 스토리지의 데이터는 유지됨
- 기존 PV의 회수 정책은 언제든 변경 가능

**데이터 보호 팁:**
동적 프로비저닝에서 기본 회수 정책은 Delete이다. 중요한 데이터가 있는 PV는 PVC를 삭제하기 전에 반드시 회수 정책을 Retain으로 변경해야 한다. 그렇지 않으면 PVC 삭제 시 데이터가 영구적으로 손실된다.

## 예시

PV에 회수 정책 설정:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: quiz-data
spec:
  persistentVolumeReclaimPolicy: Retain    # 데이터 보존
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce
  gcePersistentDisk:
    pdName: quiz-data
    fsType: ext4
```

회수 정책 확인:

```bash
kubectl get pv quiz-data
# NAME        CAPACITY   RECLAIM POLICY   STATUS     CLAIM
# quiz-data   10Gi       Retain           Released   default/quiz-data
```

기존 PV의 회수 정책 변경:

```bash
# Delete에서 Retain으로 변경 (데이터 보호)
kubectl patch pv quiz-data -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
```

StorageClass에서 기본 회수 정책 설정:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
reclaimPolicy: Retain          # 이 클래스로 생성되는 모든 PV에 적용
```

## 관련 개념

- [동적 프로비저닝 (Dynamic Provisioning)](/knowledge/kubernetes/dynamic-provisioning/) - 동적 프로비저닝된 PV의 기본 회수 정책은 Delete
- [볼륨 라이프사이클 (Volume Lifecycle)](/knowledge/kubernetes/volume-lifecycle/) - 회수 정책이 볼륨 수명에 미치는 영향
