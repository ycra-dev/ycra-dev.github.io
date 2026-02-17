---
title: "Pod Template Hash"
description: "`pod-template-hash`는 Deployment가 생성하는 ReplicaSet과 Pod에 자동으로 추가되는 레이블로, Pod 템플릿의 내용에서 계산된 해시 값이며, 서로 다른 리비전의 ReplicaSet과 Pod를 구분하는 데 사용된다"
tags: ['Deployment', 'Replicaset', 'Pod Template Hash', 'Label', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/pod-template-hash
sidebar:
  order: 14
---

## 핵심 개념

Deployment를 생성하면 Deployment 컨트롤러가 ReplicaSet을 만들 때 pod-template-hash 레이블을 자동으로 추가한다. 이 해시 값은 다음 용도로 사용된다:

1. **ReplicaSet 이름**: `{deployment-name}-{hash}` 형식 (예: `kiada-7bffb9bf96`)
2. **Pod 이름**: `{deployment-name}-{hash}-{random}` 형식 (예: `kiada-7bffb9bf96-4knb6`)
3. **레이블 셀렉터**: ReplicaSet의 selector에 포함되어 다른 리비전의 Pod와 구분

이 메커니즘 덕분에 Deployment는 기존의 독립적인 Pod를 의도치 않게 인수하지 않는다. 기존 Pod에 pod-template-hash 레이블이 없으면 새 ReplicaSet의 selector와 일치하지 않기 때문이다.

Pod 템플릿이 변경될 때마다 새로운 해시 값이 생성되므로, 새 ReplicaSet이 만들어진다. 이것이 Deployment 업데이트의 핵심 메커니즘이다.

## 예시

```bash
# ReplicaSet 확인 - 해시가 이름에 포함됨
kubectl get rs
# NAME               DESIRED   CURRENT   READY   AGE   VER
# kiada-5d5c5f9d76   3         3         3       13m   0.6
# kiada-7bffb9bf96   0         0         0       16m   0.5

# Pod 레이블에서 pod-template-hash 확인
kubectl get pods --show-labels
# kiada-7bffb9bf96-4knb6  app=kiada,pod-template-hash=7bffb9bf96,rel=stable,ver=0.5

# pod-template-hash가 없는 Pod는 ReplicaSet에 인수되지 않음
kubectl delete po -l 'app=kiada,rel=stable,!pod-template-hash'
```

## 관련 개념

- [Deployment](/knowledge/kubernetes/deployment/) - pod-template-hash를 생성하는 오브젝트
- [ReplicaSet](/knowledge/kubernetes/replicaset/) - 해시 값이 이름과 selector에 포함됨
- [Label](/knowledge/kubernetes/label/) - pod-template-hash가 레이블로 저장됨
- [Deployment Rollback](/knowledge/kubernetes/deployment-rollback/) - 이전 ReplicaSet의 해시로 리비전을 식별
