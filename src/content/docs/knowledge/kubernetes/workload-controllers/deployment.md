---
title: "디플로이먼트 (Deployment)"
description: "Deployment는 Kubernetes에서 애플리케이션 배포를 나타내는 API 객체이다"
tags: ['Kubernetes', 'Deployment', 'Application Management', 'Replica', 'Declarative', 'Workload', 'Stateless']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/deployment
sidebar:
  order: 9
---

## 핵심 개념

Deployment는 Kubernetes에서 애플리케이션을 배포하는 기본적인 방법이다. Pod를 직접 생성하는 대신 Deployment를 사용하면 여러 가지 이점을 얻을 수 있다.

Deployment의 역할:
1. **Pod 생성 및 관리**: 지정된 수의 Pod를 자동으로 생성
2. **복제본 유지**: Pod가 사라지거나 상태가 불명확해지면 자동으로 교체하여 원하는 수 유지
3. **수평 확장/축소**: replicas 수를 변경하면 자동으로 Pod 추가/제거
4. **선언적 업데이트**: 이미지 버전을 변경하면 롤링 업데이트 수행

Deployment 동작 원리:
- Deployment 객체 생성 시 컨트롤러가 이를 감지
- 컨트롤러가 지정된 수의 Pod 객체를 생성
- 각 Pod 객체가 Scheduler에 의해 노드에 할당
- Kubelet이 컨테이너를 실행

Pod를 직접 생성하는 것 대비 이점:
- 각 Pod에 수동으로 고유 이름을 부여할 필요 없음
- Pod 장애 시 자동 교체 (수동 모니터링 불필요)
- 노드 장애 시 자동으로 다른 노드에 Pod 재생성

Deployment는 ReplicaSet의 모든 기능을 포함하면서 추가로 Pod 업데이트를 자동화한다. Deployment의 spec에는 ReplicaSet과 동일한 `replicas`, `selector`, `template` 필드에 더해 `strategy` 필드가 있다. Deployment를 생성하면 Deployment 컨트롤러가 자동으로 ReplicaSet을 생성하고, 이 ReplicaSet이 다시 Pod를 생성한다. 이때 Pod와 ReplicaSet에는 `pod-template-hash` 라는 추가 레이블이 자동으로 부여된다.

Pod 템플릿을 변경하면 새로운 해시 값이 생성되어 새 ReplicaSet이 만들어지고, 구성된 전략에 따라 Pod가 교체된다. 이전 ReplicaSet은 revisionHistoryLimit(기본값 10)에 따라 보존되어 롤백에 사용된다. Deployment를 삭제하면 ReplicaSet과 Pod가 연쇄 삭제되며, `--cascade=orphan` 옵션을 사용하면 보존할 수 있다.

## 예시

```bash
# 명령적 방식으로 Deployment 생성
$ kubectl create deployment kiada --image=luksa/kiada:0.1
deployment.apps/kiada created

# Deployment 목록 확인
$ kubectl get deployments
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
kiada   1/1     1            1           6s

# 수평 확장 (3개 복제본)
$ kubectl scale deployment kiada --replicas=3
deployment.apps/kiada scaled

# 확장 결과 확인
$ kubectl get deploy
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
kiada   3/3     3            3           18m

# 생성된 Pod 확인
$ kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
kiada-9d785b578-58vhc   1/1     Running   0          17s
kiada-9d785b578-jmnj8   1/1     Running   0          17s
kiada-9d785b578-p449x   1/1     Running   0          18m
```

```yaml
# 선언적 방식 (YAML 매니페스트)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kiada
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kiada
  template:
    metadata:
      labels:
        app: kiada
    spec:
      containers:
      - name: kiada
        image: luksa/kiada:0.1
        ports:
        - containerPort: 8080
```

롤아웃 상태 확인:
```bash
kubectl rollout status deployment kiada
kubectl create deployment my-app --image=my-image --dry-run=client -o yaml > deploy.yaml
```

## 관련 개념

- [파드 (Pod)](/knowledge/kubernetes/pod/) - Deployment가 생성하고 관리하는 기본 단위
- [레플리카 (Replica)](/knowledge/kubernetes/replica/) - Deployment에서 관리하는 Pod 복제본
- [서비스 (Service)](/knowledge/kubernetes/service/) - Deployment의 Pod를 외부에 노출하는 객체
- [수평 확장 (Horizontal Scaling)](/knowledge/kubernetes/horizontal-scaling/) - Deployment를 통한 수평 확장
- [선언적 모델 (Declarative Model)](/knowledge/kubernetes/declarative-model/) - Deployment가 따르는 선언적 패턴
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - Deployment 객체를 관리하는 Deployment Controller
- [레플리카셋 (ReplicaSet)](/knowledge/kubernetes/replicaset/) - Deployment가 내부적으로 생성하고 관리하는 오브젝트
- [조정 제어 루프 (Reconciliation Control Loop)](/knowledge/kubernetes/reconciliation-control-loop/) - Deployment 컨트롤러의 작동 원리
- [스테이트풀셋 (StatefulSet)](/knowledge/kubernetes/statefulset/) - 상태 유지가 필요한 워크로드를 위한 대안
