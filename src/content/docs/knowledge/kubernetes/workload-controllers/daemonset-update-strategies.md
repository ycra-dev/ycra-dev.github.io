---
title: "DaemonSet Update Strategies"
description: "DaemonSet은 RollingUpdate와 OnDelete 두 가지 업데이트 전략을 지원하며, RollingUpdate의 기본 설정은 maxSurge=0, maxUnavailable=1로 한 번에 한 노드씩 기존 Pod를 삭제 후 새 Pod를 생성하는 방식이다"
tags: ['Daemonset', 'Update Strategy', 'Rolling Update', 'On Delete', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/daemonset-update-strategies
sidebar:
  order: 26
---

## 핵심 개념

**RollingUpdate 전략** (기본값):
- `maxSurge` 기본값이 0인 이유: 대부분의 데몬은 노드당 하나만 실행되어야 하며, 락(lock)을 사용해 중복 실행을 방지하는 경우가 많음
- `maxUnavailable` 기본값 1: 한 번에 하나의 노드만 업데이트하여 위험 최소화
- `minReadySeconds`: 새 Pod가 available이 될 때까지 대기 시간
- maxSurge > 0이면 업데이트 중 동일 노드에 두 개의 데몬 Pod가 일시적으로 실행됨

**OnDelete 전략**:
- Pod 템플릿 변경 시 자동 업데이트하지 않음
- 관리자가 수동으로 Pod를 삭제해야 새 템플릿으로 재생성
- 중요한 클러스터 서비스에 적합: 업데이트 후 다른 Pod에 미치는 영향을 확인한 후 다음 노드 진행 가능

Recreate 전략 구현 방법:
- DaemonSet에는 Recreate 전략이 없지만, `maxSurge=0, maxUnavailable=10000`으로 설정하면 모든 노드의 Pod가 동시에 교체됨

주의사항:
- readiness probe가 실패한 기존 Pod는 롤링 업데이트 중 즉시 삭제되고 새 템플릿으로 교체됨 (maxSurge/maxUnavailable 무시)
- 롤링 업데이트 중 수동으로 Pod를 삭제하면 새 템플릿으로 재생성됨

## 예시

RollingUpdate 설정:
```yaml
spec:
  minReadySeconds: 30
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 0
      maxUnavailable: 1
```

OnDelete 설정:
```yaml
spec:
  updateStrategy:
    type: OnDelete
```

OnDelete 사용 시 수동 업데이트:
```bash
# Pod 템플릿 변경 후 상태 확인
kubectl get ds
# UP-TO-DATE: 0 (업데이트된 Pod 없음)

# 수동으로 Pod 삭제 → 새 템플릿으로 재생성
kubectl delete po demo-k2d6k --wait=false
```

## 관련 개념

- [DaemonSet](/knowledge/kubernetes/daemonset/) - 업데이트 전략이 적용되는 오브젝트
- [StatefulSet Update Strategies](/knowledge/kubernetes/statefulset-update-strategies/) - StatefulSet의 OnDelete 전략과 동일
- [minReadySeconds](/knowledge/kubernetes/minreadyseconds/) - 업데이트 속도를 제어하는 공통 필드
