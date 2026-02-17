---
title: "Node Selector"
description: "Node Selector는 파드의 `spec"
tags: ['Kubernetes', 'Scheduling', 'Node Selector', 'Label']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/node-selector
sidebar:
  order: 6
---

## 핵심 개념

기본적으로 파드는 클러스터의 모든 노드에 무작위로 스케줄링된다. 그러나 하드웨어 구성이 다를 때(SSD vs HDD), 프론트엔드와 백엔드를 분리하고 싶을 때, 또는 특정 고객의 워크로드를 특정 노드 그룹에 배치하고 싶을 때 Node Selector를 사용하여 파드의 스케줄링 대상 노드를 제한할 수 있다.

작동 방식은 간단하다. 먼저 노드에 적절한 레이블을 부착한 후, 파드 매니페스트의 `nodeSelector`에 해당 레이블을 지정한다. `nodeSelector`는 동등성 기반 셀렉터만 지원하며, 집합 기반 셀렉터나 not-equal 셀렉터는 사용할 수 없다. 더 복잡한 스케줄링 조건이 필요하면 Node Affinity/Anti-Affinity를 사용해야 한다(Chapter 21).

하나의 노드에만 파드를 고정하는 것보다, 여러 조건 충족 노드가 있도록 설정하는 것이 좋다. 이렇게 하면 한 노드가 실패해도 파드가 다른 적격 노드로 이동할 수 있다.

## 예시

노드에 레이블 부착:

```bash
kubectl label node kind-worker node-role=front-end
```

레이블 확인:

```bash
kubectl get node -l node-role=front-end
```

Node Selector를 사용하는 파드 매니페스트:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-front-end
spec:
  nodeSelector:
    node-role: front-end
  volumes:
  ...
```

스케줄링 결과 확인:

```bash
kubectl get pod kiada-front-end -o wide
```

## 관련 개념

- [Label](/knowledge/kubernetes/label/) - 노드에 부착하여 셀렉터의 기준이 되는 레이블
- [Label Selector](/knowledge/kubernetes/label-selector/) - Node Selector는 레이블 셀렉터의 특수한 사용 사례
- [Scheduler](/knowledge/kubernetes/scheduler/) - Node Selector 조건을 평가하여 파드를 배치하는 컴포넌트
- [Pod](/knowledge/kubernetes/pod/) - nodeSelector가 정의되는 오브젝트
