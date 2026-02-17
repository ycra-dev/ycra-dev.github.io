---
title: "ReplicaSet Pod Removal for Debugging"
description: "ReplicaSet에서 문제가 있는 Pod의 레이블을 변경하여 ReplicaSet의 관리 범위에서 분리하는 기법으로, 컨트롤러가 새 Pod를 자동 생성하면서 기존 문제 Pod를 디버깅용으로 보존할 수 있다"
tags: ['Replicaset', 'Debugging', 'Label', 'Pod Management', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/replicaset-pod-removal-for-debugging
sidebar:
  order: 7
---

## 핵심 개념

ReplicaSet 컨트롤러는 레이블 셀렉터를 기반으로 Pod를 관리한다. 따라서 Pod의 레이블을 변경하면 셀렉터와 더 이상 일치하지 않게 되어 ReplicaSet의 관리 범위에서 벗어난다. 컨트롤러는 Pod 수가 부족해졌다고 판단하고 새 Pod를 생성한다.

이 기법이 유용한 이유:
- **서비스 연속성**: 새 Pod가 즉시 생성되어 트래픽을 처리
- **디버깅 가능**: 문제 Pod를 삭제하지 않고 격리하여 원인 분석 가능
- **스케일 유지**: 수동 스케일 업/다운 불필요

주의할 점: ReplicaSet은 readiness probe 실패나 컨테이너 크래시가 반복되는 Pod를 자동으로 교체하지 않는다. 이는 문제가 일시적이라고 가정하기 때문이다. 따라서 이 기법은 특히 이런 상황에서 유용하다.

레이블이 변경된 Pod는 ownerReferences에서 ReplicaSet 참조가 제거되므로, 디버깅이 끝나면 수동으로 삭제해야 한다.

## 예시

```bash
# 문제 Pod의 레이블 변경하여 ReplicaSet에서 분리
kubectl label po kiada-78j7m rel=debug --overwrite

# 결과 확인: 3개의 정상 Pod + 1개의 분리된 디버그 Pod
kubectl get pods -l app=kiada -L app,rel
# kiada-78j7m   1/2  Running  kiada  debug    (분리됨)
# kiada-98lmx   2/2  Running  kiada  stable   (기존)
# kiada-wk99p   2/2  Running  kiada  stable   (기존)
# kiada-xtxcl   2/2  Running  kiada  stable   (새로 생성)

# 디버깅 후 수동 삭제
kubectl delete po kiada-78j7m
```

## 관련 개념

- [ReplicaSet](/knowledge/kubernetes/replicaset/) - Pod 분리의 대상이 되는 컨트롤러
- [Label](/knowledge/kubernetes/label/) - Pod 분리에 사용되는 메커니즘
- [Selector](/knowledge/kubernetes/selector/) - ReplicaSet의 Pod 소속을 결정하는 기준
- [Readiness Probe](/knowledge/kubernetes/readiness-probe/) - 실패해도 Pod가 자동 교체되지 않는 관련 개념
