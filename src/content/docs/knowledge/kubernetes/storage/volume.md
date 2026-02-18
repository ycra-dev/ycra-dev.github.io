---
title: "Volume"
description: "Volume은 Pod에 정의되어 컨테이너의 파일 시스템에 마운트되는 스토리지 단위로, 컨테이너 재시작 시 데이터를 보존하거나 Pod 내 여러 컨테이너 간에 파일을 공유하는 데 사용된다"
tags: ['Kubernetes', 'Storage', 'Volume', 'Pod', 'Persistence']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/volume
sidebar:
  order: 1
---

## 핵심 개념

컨테이너의 파일 시스템은 컨테이너 이미지에서 제공되며, 컨테이너가 종료되고 새로 생성되면 모든 변경 사항이 손실된다. Volume은 이 문제를 해결하기 위해 Pod 수준에서 정의되어 컨테이너의 원하는 위치에 마운트되는 스토리지를 제공한다.

**Volume의 수명 주기:**
- Volume의 수명은 Pod의 수명에 종속되며, 컨테이너의 수명과는 독립적이다
- Pod의 모든 볼륨은 컨테이너가 시작되기 전에 생성된다
- 컨테이너가 재시작되면 볼륨이 새 컨테이너에 다시 마운트된다
- Pod가 삭제되면 볼륨도 함께 삭제된다 (외부 스토리지는 유지 가능)

**Volume의 주요 용도:**
1. **데이터 보존**: 컨테이너 재시작 시에도 데이터 유지
2. **컨테이너 간 파일 공유**: 같은 Pod의 여러 컨테이너가 동일한 파일에 접근
3. **Pod 간 데이터 공유**: 외부 스토리지를 통한 여러 Pod 간 데이터 교환
4. **Pod 인스턴스 간 데이터 유지**: 네트워크 연결 스토리지로 Pod 재생성 후에도 데이터 보존

**볼륨 유형 분류:**
- **일반**: emptyDir, hostPath
- **클라우드**: gcePersistentDisk, awsElasticBlockStore, azureDisk, azureFile
- **네트워크**: nfs, iscsi, glusterfs, cephfs 등
- **설정**: configMap, secret, downwardAPI, projected
- **추상화**: persistentVolumeClaim, csi

## 예시

Pod에 볼륨 정의 및 마운트:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: quiz
spec:
  volumes:                    # Pod 수준에서 볼륨 정의
  - name: quiz-data
    emptyDir: {}
  containers:
  - name: quiz-api
    image: luksa/quiz-api:0.1
    ports:
    - name: http
      containerPort: 8080
  - name: mongo
    image: mongo
    volumeMounts:             # 컨테이너에 볼륨 마운트
    - name: quiz-data
      mountPath: /data/db
```

하나의 컨테이너에 여러 볼륨 마운트도 가능하며, 하나의 볼륨을 여러 컨테이너에 마운트할 수도 있다.

## 관련 개념

- [emptyDir Volume](/knowledge/kubernetes/emptydir-volume/) - 가장 기본적인 볼륨 유형
- [Volume Mount](/knowledge/kubernetes/volume-mount/) - 볼륨을 컨테이너에 마운트하는 설정
- [hostPath Volume](/knowledge/kubernetes/hostpath-volume/) - 워커 노드의 파일 시스템에 접근하는 볼륨
- [Pod](/knowledge/kubernetes/pod/) - 볼륨이 정의되는 리소스
- [ConfigMap](/knowledge/kubernetes/configmap/) - 설정 데이터를 볼륨으로 노출하는 리소스
- [Secret](/knowledge/kubernetes/secret/) - 민감한 데이터를 볼륨으로 노출하는 리소스
