---
title: "볼륨 바인딩 모드 (Volume Binding Mode)"
description: "Volume Binding Mode는 StorageClass에서 설정하는 필드로, PersistentVolumeClaim이 PersistentVolume에 바인딩되는 시점을 결정한다"
tags: ['Kubernetes', 'Storage', 'Binding', 'Storage Class', 'Scheduling']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/volume-binding-mode
sidebar:
  order: 16
---

## 핵심 개념

볼륨 바인딩 모드는 동적 프로비저닝에서 볼륨이 생성되고 클레임에 바인딩되는 타이밍을 제어하는 중요한 설정이다.

| 모드 | 설명 |
|------|------|
| **Immediate** | PVC 생성 즉시 PV가 프로비저닝되고 바인딩됨. 모든 노드에서 접근 가능한 네트워크 스토리지에 적합 |
| **WaitForFirstConsumer** | PVC를 사용하는 첫 번째 Pod가 생성될 때까지 프로비저닝과 바인딩을 지연. 토폴로지 제약이 있는 볼륨에 필수 |

**WaitForFirstConsumer가 필요한 이유:**
- 로컬 볼륨이나 특정 가용 영역(AZ)에 제한된 볼륨의 경우, 볼륨이 생성되는 위치가 중요
- Pod가 아직 없는 상태에서 볼륨을 프로비저닝하면, Pod가 나중에 해당 볼륨이 있는 노드에 스케줄링되어야 하는 제약이 생김
- Pod가 먼저 생성되면 스케줄러가 다른 제약 조건(리소스 요구사항, 노드 어피니티 등)도 함께 고려하여 최적의 노드를 선택한 후 해당 노드에서 볼륨을 프로비저닝

**클러스터별 기본 설정:**
- **GKE**: Immediate (네트워크 스토리지이므로 노드 독립적)
- **Minikube**: Immediate (단일 노드 클러스터이므로 선택의 여지 없음)
- **kind**: WaitForFirstConsumer (로컬 경로 프로비저너 사용)

**정적 프로비저닝에서의 동작:**
정적 프로비저닝(사전에 PV가 존재)에서는 바인딩 모드의 영향이 다소 다르다. Immediate 모드에서는 PVC 생성 시 즉시 기존 PV에 바인딩되고, WaitForFirstConsumer에서는 Pod가 생성될 때까지 바인딩이 지연되어 스케줄러가 가장 적합한 PV를 선택할 수 있다.

## 예시

Immediate 바인딩 모드:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: kubernetes.io/gce-pd
volumeBindingMode: Immediate              # PVC 생성 즉시 바인딩
```

WaitForFirstConsumer 바인딩 모드:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer   # Pod 생성 시까지 대기
```

WaitForFirstConsumer에서의 동작 확인:

```bash
# PVC 생성 후 바로 확인 - Pending 상태
kubectl get pvc quiz-data-default
# NAME                STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
# quiz-data-default   Pending                                      standard       3m

# Pod 생성 후 확인 - Bound 상태로 변경
kubectl apply -f pod.quiz-default.yaml
kubectl get pvc quiz-data-default
# NAME                STATUS   VOLUME             CAPACITY   ACCESS MODES   ...
# quiz-data-default   Bound    pvc-c71fb2c2-...   1Gi        RWO            ...
```

## 관련 개념

- [동적 프로비저닝 (Dynamic Provisioning)](/knowledge/kubernetes/dynamic-provisioning/) - 바인딩 모드가 프로비저닝 타이밍을 결정
- [로컬 퍼시스턴트볼륨 (Local Persistent Volume)](/knowledge/kubernetes/local-persistent-volume/) - WaitForFirstConsumer가 필수인 볼륨 유형
- [쿠버네티스 스케줄러 (Kubernetes Scheduler)](/knowledge/kubernetes/scheduler/) - WaitForFirstConsumer에서 스케줄링과 바인딩이 연계
