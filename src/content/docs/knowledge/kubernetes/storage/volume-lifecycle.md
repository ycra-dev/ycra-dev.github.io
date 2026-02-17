---
title: "Volume Lifecycle"
description: "Volume Lifecycle은 Kubernetes에서 볼륨이 생성, 마운트, 언마운트, 삭제되는 전체 수명 주기를 말하며, 볼륨 유형에 따라 Pod 수준에서 관리되거나 Pod의 수명을 넘어 독립적으로 존재할 수 있다"
tags: ['Kubernetes', 'Storage', 'Volume', 'Lifecycle', 'Persistence']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/volume-lifecycle
sidebar:
  order: 7
---

## 핵심 개념

볼륨의 수명 주기는 유형에 따라 크게 두 가지로 나뉜다:

**1. Pod 수명에 종속되는 볼륨 (emptyDir 등):**
- Pod 설정 시 생성 (컨테이너 시작 전)
- 컨테이너가 (재)시작될 때마다 마운트
- 컨테이너 종료 시에도 볼륨과 데이터는 유지
- Pod 종료 시 볼륨과 데이터 모두 삭제

**2. Pod 수명과 독립적인 볼륨 (네트워크 스토리지, PV 등):**
- 외부 스토리지에 대한 참조로 동작
- Pod 삭제 시에도 외부 스토리지의 데이터는 유지
- 새로운 Pod에서 동일한 외부 스토리지를 다시 참조하여 데이터에 접근 가능
- 다른 노드에 스케줄링되더라도 네트워크 스토리지에 접근 가능

**볼륨 수명과 컨테이너 수명의 관계:**
볼륨의 수명은 Pod의 수명에 종속되며, 컨테이너의 수명과는 독립적이다. 이것이 중요한 이유는:
- 컨테이너가 종료되고 새로 생성되어도 볼륨은 유지됨
- 새 컨테이너가 시작되면 볼륨이 자동으로 다시 마운트됨
- 이를 통해 컨테이너 재시작 간 데이터 보존이 가능

**네트워크 볼륨의 마운트 수명 주기:**
1. Pod가 노드에 스케줄링
2. 네트워크 볼륨이 노드에 연결(attach)
3. 볼륨이 Pod의 컨테이너에 마운트
4. Pod가 삭제되면 볼륨이 노드에서 분리(detach)
5. 외부 스토리지는 그대로 존재

## 예시

emptyDir 볼륨의 수명 주기 확인:

```bash
# emptyDir 볼륨이 있는 Pod에 데이터 저장
kubectl exec -it quiz -c mongo -- mongo kiada --quiet --eval "db.questions.count()"
# 1

# 컨테이너 재시작 (볼륨은 유지됨)
kubectl exec -it quiz -c mongo -- mongo admin --eval "db.shutdownServer()"

# 재시작 후에도 데이터 존재 (emptyDir이므로)
kubectl exec -it quiz -c mongo -- mongo kiada --quiet --eval "db.questions.count()"
# 1

# Pod 삭제 시 emptyDir 데이터 손실
kubectl delete pod quiz
```

GCE PD를 사용한 Pod 재생성 시 데이터 보존:

```bash
# Pod 삭제
kubectl delete pod quiz

# 같은 GCE PD를 참조하는 새 Pod 생성
kubectl apply -f pod.quiz.gcepd.yaml

# 데이터가 여전히 존재 (외부 스토리지이므로)
kubectl exec -it quiz -c mongo -- mongo kiada --quiet --eval "db.questions.count()"
# 1
```

## 관련 개념

- [Volume](/knowledge/kubernetes/volume/) - 수명 주기가 관리되는 스토리지 단위
- [emptyDir Volume](/knowledge/kubernetes/emptydir-volume/) - Pod 수명에 종속되는 대표적 볼륨
- [Network Storage Volume](/knowledge/kubernetes/network-storage-volume/) - Pod 수명과 독립적인 외부 스토리지
- [PersistentVolume](/knowledge/kubernetes/persistentvolume/) - 볼륨 수명을 Pod에서 완전히 분리한 추상화
- [Container Filesystem](/knowledge/kubernetes/container-filesystem/) - 볼륨과 대비되는 컨테이너의 임시 파일 시스템
- [Pod](/knowledge/kubernetes/pod/) - 볼륨의 직접적인 소유자
