---
title: "StatefulSet"
description: "StatefulSet은 상태를 유지해야 하는(stateful) 워크로드를 위한 Kubernetes API 오브젝트로, 각 Pod에 고유한 정체성(이름, 네트워크 ID, 스토리지)을 부여하고, Pod가 재생성되어도 동일한 정체성과 영구 스토리지를 유지한다"
tags: ['Statefulset', 'Stateful Workload', 'Kubernetes', 'Pets Vs Cattle']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/statefulset
sidebar:
  order: 17
---

## 핵심 개념

StatefulSet은 "Pets vs. Cattle" 비유에서 "Pets"에 해당한다. Deployment의 Pod는 대체 가능한 소(cattle)처럼 취급되지만, StatefulSet의 Pod는 고유한 이름과 상태를 가진 반려동물(pet)처럼 취급된다.

StatefulSet과 Deployment의 주요 차이점:
- **Pod 이름**: 무작위가 아닌 순서 번호 사용 (quiz-0, quiz-1, quiz-2)
- **스토리지**: `volumeClaimTemplates`로 각 Pod마다 고유한 PersistentVolumeClaim 생성
- **생성 순서**: 기본적으로 한 번에 하나씩 순차적으로 생성 (podManagementPolicy로 변경 가능)
- **네트워크 정체성**: Headless Service와 결합하여 개별 DNS 레코드 제공
- **소유 구조**: Pod가 ReplicaSet 없이 StatefulSet에 직접 소유됨

Pod가 삭제되고 재생성되면 동일한 이름과 동일한 PVC가 할당된다. PVC 이름은 `{claimName}-{podName}` 형식이다 (예: `db-data-quiz-0`).

스케일 업 시 새 Pod와 PVC가 생성되고, 스케일 다운 시 Pod는 삭제되지만 PVC는 기본적으로 보존된다 (정책으로 변경 가능).

## 예시

StatefulSet 매니페스트:
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: quiz
spec:
  serviceName: quiz-pods      # 연관 headless Service
  podManagementPolicy: Parallel  # 병렬 생성 (기본: OrderedReady)
  replicas: 3
  selector:
    matchLabels:
      app: quiz
  template:
    metadata:
      labels:
        app: quiz
    spec:
      containers:
      - name: mongo
        image: mongo:5
        volumeMounts:
        - name: db-data
          mountPath: /data/db
  volumeClaimTemplates:      # PVC 템플릿
  - metadata:
      name: db-data
    spec:
      resources:
        requests:
          storage: 1Gi
      accessModes:
      - ReadWriteOnce
```

```bash
kubectl get sts       # StatefulSet 조회
kubectl rollout status sts quiz
kubectl get pvc -l app=quiz  # 개별 PVC 확인
```

## 관련 개념

- [Deployment](/knowledge/kubernetes/deployment/) - 무상태 워크로드를 위한 대안
- [Headless Service for StatefulSet](/knowledge/kubernetes/headless-service-for-statefulset/) - StatefulSet에 네트워크 정체성을 부여
- [PersistentVolumeClaim](/knowledge/kubernetes/persistentvolumeclaim/) - 각 Pod마다 개별 PVC가 생성됨
- [PersistentVolume](/knowledge/kubernetes/persistentvolume/) - PVC에 바인딩되는 실제 스토리지
- [Pod](/knowledge/kubernetes/pod/) - StatefulSet이 직접 소유하는 오브젝트
