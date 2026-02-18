---
title: "PersistentVolumeClaim"
description: "PersistentVolumeClaim(PVC)은 사용자가 영구 스토리지를 요청하는 오브젝트로, 필요한 용량, 접근 모드, 스토리지 클래스 등의 요구사항을 명시하여 PersistentVolume에 바인딩된다"
tags: ['Kubernetes', 'Storage', 'Pvc', 'Claim', 'Persistence']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/persistent-volume-claim
sidebar:
  order: 10
---

## 핵심 개념

PVC는 PV와 Pod 사이의 중개 역할을 하며, 다음과 같은 이점을 제공한다:

1. **소유권 관리**: PVC의 수명은 Pod에 종속되지 않으므로, Pod를 삭제해도 스토리지에 대한 소유권이 유지된다
2. **독점적 접근**: PVC가 PV에 바인딩되면, 다른 PVC가 같은 PV를 클레임할 수 없다
3. **이식성**: Pod 매니페스트에는 PVC 이름만 참조하므로 인프라 독립적

**PVC 매니페스트의 주요 필드:**
- `resources.requests.storage`: 필요한 최소 저장 용량
- `accessModes`: 필요한 접근 모드
- `storageClassName`: 사용할 스토리지 클래스 (빈 문자열이면 정적 프로비저닝, 생략 시 기본 클래스)
- `volumeName`: 특정 PV에 바인딩하려는 경우 해당 PV 이름 지정
- `volumeMode`: Filesystem 또는 Block

**바인딩 프로세스:**
- PVC 생성 시 Kubernetes가 요구사항에 맞는 PV를 자동으로 찾아 바인딩
- 용량, 접근 모드, 볼륨 모드가 모두 일치해야 바인딩 가능
- PV의 용량이 PVC 요청보다 크면 바인딩 가능 (초과 용량 사용 가능)
- 동적 프로비저닝에서는 PVC 요청에 맞는 PV가 자동 생성됨

**삭제 시 동작:**
- PVC를 삭제하면 바인딩된 PV가 릴리즈됨
- Pod가 PVC를 사용 중인 상태에서 PVC를 삭제하면, 실제 삭제는 Pod가 종료될 때까지 지연됨
- 이를 통해 실행 중인 애플리케이션이 갑자기 스토리지를 잃는 것을 방지

## 예시

정적 프로비저닝 PVC (특정 PV 요청):

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: quiz-data
spec:
  resources:
    requests:
      storage: 1Gi
  accessModes:
  - ReadWriteOnce
  storageClassName: ""        # 동적 프로비저닝 비활성화
  volumeName: quiz-data       # 특정 PV 지정
```

동적 프로비저닝 PVC (기본 스토리지 클래스 사용):

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

Pod에서 PVC 사용:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: quiz
spec:
  volumes:
  - name: quiz-data
    persistentVolumeClaim:
      claimName: quiz-data    # PVC 이름 참조
  containers:
  - name: mongo
    image: mongo
    volumeMounts:
    - name: quiz-data
      mountPath: /data/db
```

PVC 상태 확인:

```bash
kubectl get pvc
# NAME        STATUS   VOLUME      CAPACITY   ACCESS MODES   STORAGECLASS   AGE
# quiz-data   Bound    quiz-data   10Gi       RWO,ROX                       2m
```

## 관련 개념

- [Dynamic Provisioning](/knowledge/kubernetes/dynamic-provisioning/) - PVC 생성 시 자동으로 PV를 생성하는 메커니즘
- [Access Modes](/knowledge/kubernetes/access-modes/) - PVC에서 요청하는 접근 모드
- [Volume](/knowledge/kubernetes/volume/) - PVC가 Pod에서 볼륨으로 사용되는 방식
- [Namespace](/knowledge/kubernetes/namespace/) - PVC가 속하는 네임스페이스
