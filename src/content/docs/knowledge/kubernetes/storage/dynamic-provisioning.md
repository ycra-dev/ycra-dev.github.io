---
title: "Dynamic Provisioning"
description: "Dynamic Provisioning은 PersistentVolumeClaim이 생성되면 StorageClass에 정의된 프로비저너가 자동으로 기반 스토리지와 PersistentVolume 오브젝트를 생성하는 메커니즘으로, 관리자가 PV를 수동으로 사전 프로비저닝..."
tags: ['Kubernetes', 'Storage', 'Dynamic Provisioning', 'Automation', 'Pv']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/dynamic-provisioning
sidebar:
  order: 12
---

## 핵심 개념

**정적 프로비저닝 vs 동적 프로비저닝:**

정적 프로비저닝에서는 관리자가 물리적 스토리지를 준비하고, PV 오브젝트를 수동으로 생성한 후, 사용자가 PVC를 생성하여 기존 PV에 바인딩한다. 동적 프로비저닝에서는 이 순서가 역전된다:

1. 사용자가 PVC를 생성 (StorageClass 참조)
2. 프로비저너가 기반 스토리지를 자동 프로비저닝 (클라우드 API 등 호출)
3. 프로비저너가 PV 오브젝트를 자동 생성
4. PV가 PVC에 자동 바인딩

**동적 프로비저닝의 이점:**
- 관리자가 수십~수백 개의 PV를 사전 프로비저닝할 필요 없음
- PV가 부족해지는 상황 방지
- PV의 용량과 접근 모드가 PVC 요청에 정확히 일치
- 각 PVC에 대해 새로운 PV가 생성되므로 PV 재활용이 불필요
- 클러스터의 자동화 관리 철학에 부합

**릴리즈 시 동작:**
동적으로 프로비저닝된 PV의 기본 회수 정책(reclaimPolicy)은 `Delete`이다. 따라서 PVC를 삭제하면 PV 오브젝트와 기반 스토리지가 모두 자동 삭제된다. 데이터를 보존하려면 PVC를 삭제하기 전에 PV의 회수 정책을 `Retain`으로 변경해야 한다.

**볼륨 확장:**
동적 프로비저닝 환경에서는 PVC의 `spec.resources.requests.storage` 필드를 수정하여 볼륨 크기를 늘릴 수 있다. 단, StorageClass의 `allowVolumeExpansion`이 true여야 하며, Pod 재시작이 필요할 수 있다.

## 예시

동적 프로비저닝을 사용하는 최소 PVC:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: quiz-data-default
spec:
  resources:
    requests:
      storage: 1Gi
  accessModes:
  - ReadWriteOnce
  # storageClassName 생략 = 기본 스토리지 클래스 사용
```

자동 생성된 PV 확인:

```bash
kubectl get pv
# NAME              CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   ...
# pvc-c71fb2c2...   1Gi        RWO            Delete           Bound    ...
```

볼륨 확장 (1Gi -> 10Gi):

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: quiz-data-default
spec:
  resources:
    requests:
      storage: 10Gi           # 용량 증가
  accessModes:
  - ReadWriteOnce
```

확장 진행 상태 확인:

```bash
kubectl describe pvc quiz-data-default
# Conditions:
#   Type                      Status  Message
#   FileSystemResizePending   True    Waiting for user to (re-)start a
#                                     pod to finish file system resize
```

## 관련 개념

- [Reclaim Policy](/knowledge/kubernetes/reclaim-policy/) - 동적 프로비저닝된 PV의 기본 Delete 정책
- [Volume Binding Mode](/knowledge/kubernetes/volume-binding-mode/) - 프로비저닝 시점을 제어하는 설정
