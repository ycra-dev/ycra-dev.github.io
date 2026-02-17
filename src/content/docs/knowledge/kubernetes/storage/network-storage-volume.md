---
title: "Network Storage Volume"
description: "Network Storage Volume은 네트워크를 통해 연결된 외부 스토리지를 Pod에 마운트하는 볼륨 유형으로, Pod가 삭제되거나 다른 노드로 재스케줄링되어도 데이터가 유지된다"
tags: ['Kubernetes', 'Storage', 'Volume', 'Network', 'Cloud', 'Persistence']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/network-storage-volume
sidebar:
  order: 5
---

## 핵심 개념

emptyDir과 달리 네트워크 스토리지 볼륨은 Pod가 삭제된 후에도 데이터가 보존되며, 새로운 Pod 인스턴스가 동일한 데이터에 접근할 수 있다. Pod 매니페스트에서 직접 특정 스토리지 기술을 참조하여 사용한다.

**주요 네트워크 스토리지 유형:**
- **gcePersistentDisk**: Google Compute Engine Persistent Disk
- **awsElasticBlockStore**: Amazon Web Services Elastic Block Store
- **azureDisk / azureFile**: Microsoft Azure 스토리지
- **nfs**: Network File System
- **iscsi, cephfs, glusterfs, rbd** 등: 기타 네트워크 스토리지

**네트워크 볼륨 마운트 방식:**
네트워크 볼륨은 호스트 노드에 먼저 연결(attach)된 후, Pod에 마운트 포인트로 노출된다. 이 구조로 인해:
- 동일한 GCE PD를 여러 노드에서 동시에 읽기/쓰기 모드로 사용할 수 없음
- 같은 노드의 여러 Pod는 동일한 볼륨을 읽기/쓰기 모드로 공유 가능
- NFS 같은 기술은 여러 노드에서 동시에 읽기/쓰기 모드 마운트 가능
- 읽기 전용 모드로는 대부분의 스토리지 유형에서 다중 노드 마운트 가능

**문제점:**
Pod 매니페스트에 인프라별 스토리지 정보(IP 주소, 디스크 이름 등)를 직접 포함하면 매니페스트가 특정 클러스터에 종속되어 이식성이 떨어진다. 이 문제는 PersistentVolume과 PersistentVolumeClaim으로 해결한다.

## 예시

GCE Persistent Disk 사용:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: quiz
spec:
  volumes:
  - name: quiz-data
    gcePersistentDisk:
      pdName: quiz-data       # GCE PD 리소스 이름
      fsType: ext4
  containers:
  - name: mongo
    image: mongo
    volumeMounts:
    - name: quiz-data
      mountPath: /data/db
```

AWS EBS 사용:

```yaml
volumes:
- name: quiz-data
  awsElasticBlockStore:
    volumeID: quiz-data
    fsType: ext4
```

NFS 사용:

```yaml
volumes:
- name: quiz-data
  nfs:
    server: 1.2.3.4
    path: /some/path
```

노드에 연결된 네트워크 볼륨 확인:

```bash
kubectl get node <node-name> -o json | jq .status.volumesAttached
```

## 관련 개념

- [Volume](/knowledge/kubernetes/volume/) - 네트워크 스토리지 볼륨이 속하는 상위 개념
- [PersistentVolume](/knowledge/kubernetes/persistentvolume/) - 인프라 세부사항을 추상화한 스토리지 리소스
- [PersistentVolumeClaim](/knowledge/kubernetes/persistentvolumeclaim/) - 네트워크 스토리지를 간접적으로 참조하는 방법
- [Access Modes](/knowledge/kubernetes/access-modes/) - 네트워크 볼륨의 동시 접근 모드를 정의
- [emptyDir Volume](/knowledge/kubernetes/emptydir-volume/) - Pod 수명에 종속되는 임시 볼륨과의 대비
- [hostPath Volume](/knowledge/kubernetes/hostpath-volume/) - 노드 로컬 스토리지와의 대비
