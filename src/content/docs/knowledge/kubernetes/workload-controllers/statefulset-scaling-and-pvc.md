---
title: "StatefulSet Scaling and PVC Retention"
description: "StatefulSet의 스케일링은 Deployment와 달리 각 Pod에 고유한 PersistentVolumeClaim이 연결되며, 스케일 다운 시 Pod는 삭제되지만 PVC는 기본적으로 보존되어 나중에 스케일 업 시 재사용할 수 있다"
tags: ['Statefulset', 'Scaling', 'Persistent Volume Claim', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/statefulset-scaling-and-pvc
sidebar:
  order: 20
---

## 핵심 개념

스케일 업 시:
- StatefulSet 컨트롤러가 새 Pod와 함께 volumeClaimTemplates에 정의된 PVC를 생성
- PVC 이름은 `{volumeClaimName}-{statefulsetName}-{ordinal}` 형식
- 기본적으로 한 번에 하나씩 순차적으로 생성 (podManagementPolicy: OrderedReady)
- podManagementPolicy: Parallel로 설정하면 동시 생성 가능

스케일 다운 시:
- Pod는 역순(가장 높은 ordinal부터)으로 삭제됨
- PVC는 기본적으로 삭제되지 않고 보존됨
- PVC 보존 정책은 `persistentVolumeClaimRetentionPolicy`로 구성 가능:
  - `whenDeleted`: StatefulSet 삭제 시 PVC 처리 (Retain 또는 Delete)
  - `whenScaled`: 스케일 다운 시 PVC 처리 (Retain 또는 Delete)

PVC를 보존하는 이유:
- 의도치 않은 데이터 손실 방지
- 스케일 업 시 이전 데이터를 그대로 사용 가능
- 수동으로 PVC를 삭제하여 정리 가능

스케일 다운 후 다시 스케일 업하면, 같은 ordinal의 Pod가 이전에 사용하던 PVC에 자동으로 바인딩된다.

## 예시

```bash
# 스케일 업 → 새 PVC 자동 생성
kubectl scale sts quiz --replicas 5
kubectl get pvc -l app=quiz
# db-data-quiz-0  Bound
# db-data-quiz-1  Bound
# db-data-quiz-2  Bound
# db-data-quiz-3  Bound  (새로 생성)
# db-data-quiz-4  Bound  (새로 생성)

# 스케일 다운 → Pod 삭제, PVC 보존
kubectl scale sts quiz --replicas 3
kubectl get pvc -l app=quiz
# db-data-quiz-0  Bound  (보존)
# db-data-quiz-1  Bound  (보존)
# db-data-quiz-2  Bound  (보존)
# db-data-quiz-3  Bound  (보존, Pod는 삭제됨)
# db-data-quiz-4  Bound  (보존, Pod는 삭제됨)
```

PVC 보존 정책 설정:
```yaml
spec:
  persistentVolumeClaimRetentionPolicy:
    whenDeleted: Delete    # StatefulSet 삭제 시 PVC도 삭제
    whenScaled: Retain     # 스케일 다운 시 PVC 보존
```

## 관련 개념

- [StatefulSet](/knowledge/kubernetes/statefulset/) - PVC 템플릿을 포함하는 오브젝트
- [PersistentVolumeClaim](/knowledge/kubernetes/persistentvolumeclaim/) - 각 Pod에 할당되는 개별 스토리지 요청
- [PersistentVolume](/knowledge/kubernetes/persistentvolume/) - PVC에 바인딩되는 실제 스토리지
- [StorageClass](/knowledge/kubernetes/storageclass/) - PVC 동적 프로비저닝을 위한 클래스
- [ReplicaSet Scaling](/knowledge/kubernetes/replicaset-scaling/) - Deployment의 다른 스케일링 방식
