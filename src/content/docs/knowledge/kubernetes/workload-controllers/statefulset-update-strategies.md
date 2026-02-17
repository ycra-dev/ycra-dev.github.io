---
title: "StatefulSet Update Strategies"
description: "StatefulSet은 RollingUpdate와 OnDelete 두 가지 업데이트 전략을 지원하며, RollingUpdate에서는 Partition 기능을 통해 특정 ordinal 이상의 Pod만 선택적으로 업데이트할 수 있는 독특한 기능을 제공한다"
tags: ['Statefulset', 'Update Strategy', 'Rolling Update', 'On Delete', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/statefulset-update-strategies
sidebar:
  order: 21
---

## 핵심 개념

**RollingUpdate 전략** (기본값):
- 가장 높은 ordinal부터 역순으로 업데이트
- 한 번에 하나의 Pod만 업데이트 (이전 Pod가 ready될 때까지 대기)
- `partition` 파라미터로 업데이트 범위를 제한할 수 있음
  - partition=2로 설정하면 ordinal 2 이상의 Pod만 업데이트
  - Canary 배포와 유사한 효과를 제공

**OnDelete 전략**:
- Pod 템플릿을 변경해도 자동 업데이트하지 않음
- 관리자가 수동으로 Pod를 삭제하면 새 템플릿으로 재생성
- 업데이트 순서와 속도를 완전히 제어 가능
- 클러스터 중요 서비스에 적합

StatefulSet은 Deployment와 달리 새 ReplicaSet을 생성하지 않는다. 대신 기존 Pod를 직접 삭제하고 새 템플릿으로 재생성한다. `controller-revision-hash` 레이블로 Pod가 어떤 리비전에 속하는지 구분한다.

주의: StatefulSet은 at-most-one 보장 때문에 Deployment의 maxSurge처럼 추가 Pod를 생성하지 않고, 항상 기존 Pod를 삭제한 후 새 Pod를 생성한다.

## 예시

Partition을 이용한 선택적 업데이트:
```yaml
spec:
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      partition: 2    # ordinal 2 이상만 업데이트
```

```bash
# partition=2: quiz-2만 업데이트됨
kubectl get pods -l app=quiz -L ver
# quiz-0   0.1   (기존 버전)
# quiz-1   0.1   (기존 버전)
# quiz-2   0.2   (새 버전)

# partition을 0으로 변경하면 나머지도 업데이트
kubectl patch sts quiz -p '{"spec":{"updateStrategy":{"rollingUpdate":{"partition":0}}}}'
```

OnDelete 전략:
```yaml
spec:
  updateStrategy:
    type: OnDelete
```

```bash
# 수동으로 Pod 삭제하여 업데이트 트리거
kubectl delete pod quiz-0
# → 새 템플릿으로 quiz-0 재생성
```

## 관련 개념

- [StatefulSet](/knowledge/kubernetes/statefulset/) - 업데이트 전략이 적용되는 대상
- [RollingUpdate Strategy](/knowledge/kubernetes/rollingupdate-strategy/) - Deployment의 롤링 업데이트와 비교
- [Canary Deployment](/knowledge/kubernetes/canary-deployment/) - Partition을 이용한 Canary 효과
- [StatefulSet At-Most-One Semantics](/knowledge/kubernetes/statefulset-at-most-one-semantics/) - maxSurge를 지원하지 않는 이유
