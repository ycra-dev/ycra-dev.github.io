---
title: "PersistentVolume"
description: "PersistentVolume(PV)은 클러스터 관리자가 프로비저닝한 스토리지를 나타내는 Kubernetes 오브젝트로, 인프라별 스토리지 세부사항을 Pod 매니페스트에서 분리하여 이식성을 제공한다"
tags: ['Kubernetes', 'Storage', 'Persistent Volume', 'Pv', 'Abstraction']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/persistent-volume
sidebar:
  order: 9
---

## 핵심 개념

PersistentVolume은 Kubernetes에서 스토리지 관리의 역할 분리를 실현하는 핵심 개념이다. 클러스터 관리자가 인프라 관련 세부사항(스토리지 기술, IP 주소, 디스크 이름 등)을 PV 오브젝트에 캡슐화하면, 애플리케이션 개발자는 PersistentVolumeClaim을 통해 스토리지 요구사항만 명시하면 된다.

**PersistentVolume의 수명 주기 상태:**
| 상태 | 설명 |
|------|------|
| **Available** | 아직 클레임에 바인딩되지 않은 가용 상태 |
| **Bound** | PVC에 바인딩된 상태 |
| **Released** | PVC가 삭제되어 해제되었지만, 아직 재사용 불가능한 상태 |
| **Terminating** | 삭제가 진행 중인 상태 |

**PV 매니페스트의 주요 필드:**
- `capacity.storage`: 볼륨의 저장 용량
- `accessModes`: 지원하는 접근 모드 (RWO, ROX, RWX)
- `volumeMode`: Filesystem 또는 Block
- `persistentVolumeReclaimPolicy`: 릴리즈 시 처리 정책 (Retain, Delete, Recycle)
- 스토리지 기술별 설정 (gcePersistentDisk, nfs, hostPath 등)

**핵심 특성:**
- PV는 네임스페이스에 속하지 않는 클러스터 수준의 리소스이다
- PV를 삭제해도 기반 스토리지의 데이터는 삭제되지 않는다 (PV는 스토리지에 대한 "포인터")
- Released 상태의 PV는 직접 재사용할 수 없고, PV를 삭제 후 재생성하거나 `claimRef`를 제거해야 한다
- PV가 PVC에 바인딩된 상태에서 PV를 삭제하면, 실제 삭제는 PVC가 삭제될 때까지 지연된다

## 예시

GCE Persistent Disk를 사용하는 PV:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: quiz-data
spec:
  capacity:
    storage: 1Gi
  accessModes:
  - ReadWriteOnce
  - ReadOnlyMany
  gcePersistentDisk:
    pdName: quiz-data
    fsType: ext4
```

hostPath를 사용하는 PV (개발 환경):

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: quiz-data
spec:
  capacity:
    storage: 1Gi
  accessModes:
  - ReadWriteOnce
  - ReadOnlyMany
  hostPath:
    path: /var/quiz-data
```

PV 목록 확인:

```bash
kubectl get pv
# NAME         CAPACITY   ACCESS MODES   STATUS      CLAIM   AGE
# other-data   10Gi       RWO,ROX        Available           3m
# quiz-data    10Gi       RWO,ROX        Available           3m
```

Released 상태의 PV를 재사용 가능하게 만들기:

```bash
# 방법 1: PV 삭제 후 재생성
kubectl delete pv quiz-data
kubectl apply -f pv.quiz-data.gcepd.yaml

# 방법 2: claimRef 제거 (kubectl edit)
```

## 관련 개념

- [Access Modes](/knowledge/kubernetes/access-modes/) - PV의 접근 모드 정의
- [Reclaim Policy](/knowledge/kubernetes/reclaim-policy/) - PV 릴리즈 시 처리 정책
- [Volume](/knowledge/kubernetes/volume/) - PV가 추상화하는 기본 볼륨 개념
- [Network Storage Volume](/knowledge/kubernetes/network-storage-volume/) - PV가 참조하는 실제 스토리지
