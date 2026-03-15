---
title: "접근 모드 (Access Modes)"
description: "Access Modes는 PersistentVolume이 워커 노드에 연결(attach)될 수 있는 방식을 정의하며, 동시에 몇 개의 노드에서 읽기/쓰기가 가능한지를 제어한다"
tags: ['Kubernetes', 'Storage', 'Access Modes', 'Persistent Volume', 'Multi Node']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/access-modes
sidebar:
  order: 13
---

## 핵심 개념

Kubernetes에서 제공하는 세 가지 접근 모드:

| 모드 | 약어 | 설명 |
|------|------|------|
| **ReadWriteOnce** | RWO | 단일 노드에서 읽기/쓰기 모드로 마운트 가능 |
| **ReadOnlyMany** | ROX | 여러 노드에서 읽기 전용 모드로 마운트 가능 |
| **ReadWriteMany** | RWX | 여러 노드에서 읽기/쓰기 모드로 마운트 가능 |

**핵심 오해 방지:**
- RWO는 "하나의 Pod만 사용 가능"이 아니라 "하나의 노드만 연결 가능"을 의미
- 같은 노드의 여러 Pod는 RWO 볼륨을 동시에 읽기/쓰기 가능
- ReadOnlyOnce 모드는 존재하지 않음 (RWO 볼륨을 읽기 전용으로 마운트하면 됨)

**동시 사용 시의 동작:**
1. **RWO 볼륨**: 첫 번째 노드가 읽기/쓰기로 연결하면 다른 노드는 연결 불가 (읽기 전용도 불가)
2. **ROX 모드로 마운트된 볼륨**: 여러 노드에서 읽기 전용으로 동시 접근 가능. 하지만 이미 쓰기 모드로 연결된 상태에서는 다른 노드가 읽기 전용으로도 접근 불가
3. **RWX 볼륨**: NFS 같은 기술에서 지원하며, 제한 없이 여러 노드에서 동시 읽기/쓰기 가능

**PVC에서의 사용:**
PVC에 지정된 접근 모드는 PV 바인딩 시 호환성 검사에 사용된다. PV는 PVC가 요청하는 모든 접근 모드를 지원해야 바인딩 가능하다. PV가 추가적인 접근 모드를 지원하는 것은 허용된다.

## 예시

PV에 접근 모드 정의:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: quiz-data
spec:
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce              # RWO
  - ReadOnlyMany               # ROX
  gcePersistentDisk:
    pdName: quiz-data
    fsType: ext4
```

PVC에서 접근 모드 요청:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: other-data
spec:
  resources:
    requests:
      storage: 1Gi
  accessModes:
  - ReadWriteOnce
  - ReadOnlyMany
```

Pod에서 읽기 전용으로 마운트:

```yaml
spec:
  volumes:
  - name: other-data
    persistentVolumeClaim:
      claimName: other-data
      readOnly: true              # 읽기 전용 마운트
```

접근 모드 확인:

```bash
kubectl get pv
# NAME         CAPACITY   ACCESS MODES   STATUS
# quiz-data    10Gi       RWO,ROX        Available

kubectl get pvc
# NAME         STATUS   VOLUME       CAPACITY   ACCESS MODES
# other-data   Bound    other-data   10Gi       RWO,ROX
```

## 관련 개념

- [네트워크 스토리지 볼륨 (Network Storage Volume)](/knowledge/kubernetes/network-storage-volume/) - 접근 모드가 스토리지 기술에 따라 제한됨
- [스테이트풀셋 (StatefulSet)](/knowledge/kubernetes/statefulset/) - 각 Pod가 고유한 PV를 갖는 워크로드
- [볼륨 마운트 (Volume Mount)](/knowledge/kubernetes/volume-mount/) - 실제 읽기/쓰기 모드를 설정하는 마운트 옵션
