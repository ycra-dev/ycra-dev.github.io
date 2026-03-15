---
title: "로컬 퍼시스턴트볼륨 (Local Persistent Volume)"
description: "Local Persistent Volume은 워커 노드에 직접 연결된 디스크(SSD 등)를 PersistentVolume으로 노출하는 방식으로, hostPath 볼륨보다 안전하며 스케줄러가 Pod를 해당 볼륨이 있는 노드에 자동으로 배치한다"
tags: ['Kubernetes', 'Storage', 'Local Volume', 'Persistent Volume', 'Node Affinity']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/local-persistent-volume
sidebar:
  order: 15
---

## 핵심 개념

**hostPath 볼륨 대비 장점:**
1. **스케줄링 보장**: Kubernetes 스케줄러가 Pod를 Local PV가 있는 노드에 자동 배치. Pod가 삭제되고 재생성되어도 항상 같은 노드에 스케줄링
2. **보안**: 관리자가 관리하는 PV를 통해 접근하므로, 사용자가 임의의 호스트 경로에 접근할 수 없음
3. **성능**: 네트워크 스토리지보다 낮은 지연 시간과 높은 IOPS 제공 (프로덕션 데이터베이스에 적합)

**구성 요소:**

1. **StorageClass**: `kubernetes.io/no-provisioner` 프로비저너 사용, `WaitForFirstConsumer` 바인딩 모드 필수
2. **PersistentVolume**: `local` 볼륨 유형과 노드 어피니티(node affinity) 설정
3. **PersistentVolumeClaim**: 로컬 스토리지 클래스를 참조
4. **Pod**: PVC를 사용하는 일반적인 방식

**노드 어피니티:**
Local PV는 반드시 노드 어피니티를 설정하여 어느 노드에서 해당 볼륨에 접근할 수 있는지 명시해야 한다. 이 정보를 기반으로 스케줄러가 Pod를 올바른 노드에 배치한다.

**WaitForFirstConsumer가 필요한 이유:**
로컬 볼륨은 특정 노드에서만 접근 가능하므로, PVC가 생성되자마자 바인딩하면 Pod가 아직 없는 상태에서 노드가 결정된다. 이를 방지하기 위해 Pod가 생성될 때까지 바인딩을 지연시키면, 스케줄러가 다른 제약 조건도 고려하여 최적의 노드를 선택할 수 있다.

## 예시

로컬 스토리지 클래스 정의:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local
provisioner: kubernetes.io/no-provisioner    # 수동 프로비저닝
volumeBindingMode: WaitForFirstConsumer      # Pod 생성 시까지 바인딩 지연
```

로컬 PersistentVolume 정의:

```yaml
kind: PersistentVolume
apiVersion: v1
metadata:
  name: local-ssd-on-kind-worker
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: local
  capacity:
    storage: 10Gi
  local:
    path: /mnt/ssd1                          # 노드의 로컬 디스크 경로
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - kind-worker                      # 이 노드에서만 접근 가능
```

PVC 정의:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: quiz-data-local
spec:
  storageClassName: local
  resources:
    requests:
      storage: 1Gi
  accessModes:
  - ReadWriteOnce
```

Pod 정의:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongodb-local
spec:
  volumes:
  - name: mongodb-data
    persistentVolumeClaim:
      claimName: quiz-data-local
  containers:
  - image: mongo
    name: mongodb
    volumeMounts:
    - name: mongodb-data
      mountPath: /data/db
```

## 관련 개념

- [볼륨 바인딩 모드 (Volume Binding Mode)](/knowledge/kubernetes/volume-binding-mode/) - WaitForFirstConsumer 모드가 필수인 이유
- [hostPath 볼륨 (hostPath Volume)](/knowledge/kubernetes/hostpath-volume/) - Local PV와 비교되는 덜 안전한 대안
- [스테이트풀셋 (StatefulSet)](/knowledge/kubernetes/statefulset/) - 로컬 PV를 주로 사용하는 상태 저장 워크로드
- [쿠버네티스 스케줄러 (Kubernetes Scheduler)](/knowledge/kubernetes/scheduler/) - 노드 어피니티를 기반으로 Pod를 배치
