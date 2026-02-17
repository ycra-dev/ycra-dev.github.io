---
title: "Recreate Strategy"
description: "Recreate 전략은 Deployment의 업데이트 전략 중 하나로, 모든 기존 Pod를 동시에 삭제한 후 새 버전의 Pod를 동시에 생성하는 방식이며, 업데이트 중 서비스가 일시적으로 중단된다"
tags: ['Deployment', 'Update Strategy', 'Recreate', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/recreate-strategy
sidebar:
  order: 10
---

## 핵심 개념

Recreate 전략의 작동 방식:
1. Deployment 컨트롤러가 기존 ReplicaSet의 replicas를 0으로 설정
2. ReplicaSet 컨트롤러가 모든 기존 Pod를 삭제
3. 모든 컨테이너가 종료된 후, 새 ReplicaSet이 생성됨
4. 새 ReplicaSet에 원하는 수의 replicas가 설정됨
5. ReplicaSet 컨트롤러가 새 Pod를 생성

이 전략은 간단하지만 단점이 있다. 기존 Pod가 종료되고 새 Pod가 준비되는 사이에 서비스가 불가능하다. 이 시간 동안 Ingress는 `503 Service Temporarily Unavailable`을 반환하고, ClusterIP 서비스는 연결을 거부한다.

Recreate 전략을 사용해야 하는 경우:
- 구 버전과 신 버전을 동시에 실행할 수 없는 경우
- 서비스 다운타임이 허용되는 경우
- 데이터 마이그레이션 등으로 인해 한 번에 전환이 필요한 경우

## 예시

Recreate 전략 설정:
```yaml
spec:
  strategy:
    type: Recreate
  replicas: 3
  template:
    spec:
      containers:
      - name: kiada
        image: luksa/kiada:0.6
```

이미지 업데이트:
```bash
kubectl set image deployment kiada kiada=luksa/kiada:0.6
```

## 관련 개념

- [Deployment](/knowledge/kubernetes/deployment/) - Recreate 전략이 적용되는 오브젝트
- [RollingUpdate Strategy](/knowledge/kubernetes/rollingupdate-strategy/) - 서비스 중단 없는 대안 전략
- [ReplicaSet](/knowledge/kubernetes/replicaset/) - Deployment가 내부적으로 ReplicaSet을 조작하여 전략 수행
