---
title: "ReplicaSet"
description: "ReplicaSet은 동일한 Pod 복제본(replica) 그룹을 나타내는 Kubernetes API 오브젝트로, Pod 템플릿과 원하는 복제본 수, 레이블 셀렉터를 지정하여 Pod를 자동으로 생성하고 관리한다"
tags: ['Replicaset', 'Kubernetes', 'Workload', 'Pod Management']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/replicaset
sidebar:
  order: 1
---

## 핵심 개념

ReplicaSet은 Pod를 직접 생성하는 대신 사용하는 상위 추상화 계층이다. ReplicaSet의 spec에는 세 가지 핵심 필드가 있다: `replicas` (원하는 복제본 수), `selector` (소속 Pod를 결정하는 레이블 셀렉터), `template` (새 Pod 생성에 사용되는 템플릿). 셀렉터는 불변(immutable)이지만, replicas와 template은 변경 가능하다.

단일 Pod만 필요한 경우에도 ReplicaSet을 통해 배포하는 것이 권장된다. 노드 장애 시 ReplicaSet이 자동으로 Pod를 재생성하기 때문이다. 직접 생성한 Pod는 노드 장애 시 수동으로 재생성해야 한다.

ReplicaSet에 의해 생성된 Pod는 `generateName` 필드를 사용하여 무작위 접미사를 포함하는 이름을 갖는다. 이는 Pod가 서로 동일하고 대체 가능(fungible)하기 때문에 순서 번호가 의미 없기 때문이다.

## 예시

ReplicaSet 매니페스트 기본 구조:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: kiada
spec:
  replicas: 5
  selector:
    matchLabels:
      app: kiada
      rel: stable
  template:
    metadata:
      labels:
        app: kiada
        rel: stable
    spec:
      containers:
      - name: kiada
        image: luksa/kiada:0.5
```

ReplicaSet 조회:
```bash
kubectl get rs kiada
kubectl get rs -o wide  # 컨테이너, 이미지, 셀렉터 정보 표시
```

## 관련 개념

- [Pod](/knowledge/kubernetes/pod/) - ReplicaSet이 관리하는 기본 단위
- [Deployment](/knowledge/kubernetes/deployment/) - ReplicaSet 위에 업데이트 기능을 추가한 상위 오브젝트
- [Label](/knowledge/kubernetes/label/) - ReplicaSet의 셀렉터가 사용하는 메커니즘
- [Selector](/knowledge/kubernetes/selector/) - Pod를 ReplicaSet에 연결하는 방법
- [Controller](/knowledge/kubernetes/controller/) - ReplicaSet 컨트롤러가 조정 루프를 실행
