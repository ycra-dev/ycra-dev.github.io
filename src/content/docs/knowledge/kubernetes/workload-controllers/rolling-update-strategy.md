---
title: "롤링 업데이트 전략 (RollingUpdate Strategy)"
description: "RollingUpdate 전략은 Deployment의 기본 업데이트 전략으로, 기존 Pod를 점진적으로 제거하면서 동시에 새 Pod를 생성하여 서비스 중단 없이 업데이트를 수행하는 방식이다"
tags: ['Deployment', 'Update Strategy', 'Rolling Update', 'Zero Downtime', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/rolling-update-strategy
sidebar:
  order: 11
---

## 핵심 개념

RollingUpdate 전략은 두 개의 핵심 파라미터로 제어된다:

- **maxSurge**: 원하는 replicas 수 이상으로 존재할 수 있는 최대 Pod 수 (기본값 25%)
- **maxUnavailable**: 원하는 replicas 수 대비 사용 불가능한 최대 Pod 수 (기본값 25%)

이 두 값은 절대 숫자 또는 replicas의 백분율로 지정할 수 있다. 둘 다 0으로 설정할 수는 없다.

대표적인 조합:
- `maxSurge=0, maxUnavailable=1`: 총 Pod 수를 초과하지 않으면서 하나씩 교체. 가장 보수적.
- `maxSurge=1, maxUnavailable=0`: 항상 원하는 수의 Pod가 사용 가능하면서 하나의 추가 Pod만 허용. 가용성 최우선.
- `maxSurge=1, maxUnavailable=1`: 더 빠른 업데이트. 총 Pod가 +1까지, 사용 불가 1개까지 허용.

`minReadySeconds` 필드는 새 Pod가 "사용 가능(available)"으로 간주되기까지의 최소 대기 시간을 설정한다. 이 시간 동안 Pod가 ready 상태를 유지해야 다음 단계로 진행한다. 결함이 있는 버전의 배포를 방지하는 "에어백" 역할을 한다.

## 예시

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 0
      maxUnavailable: 1
  minReadySeconds: 10
  replicas: 3
```

롤아웃 진행 상황 추적:
```bash
kubectl rollout status deploy kiada

# ReplicaSet 변화 관찰
kubectl get rs -w -L ver
```

백분율 사용 예 (replicas=10):
```yaml
rollingUpdate:
  maxSurge: 25%      # 올림 → 3, 최대 13개 Pod
  maxUnavailable: 25% # 내림 → 2, 최소 8개 Pod 사용 가능
```

## 관련 개념

- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - RollingUpdate가 적용되는 오브젝트
- [Recreate 전략 (Recreate Strategy)](/knowledge/kubernetes/recreate-strategy/) - 전체 교체 방식의 대안 전략
- [레디니스 프로브 (Readiness Probe)](/knowledge/kubernetes/readiness-probe/) - Pod가 ready인지 판단하는 기준
- [서비스 (Service)](/knowledge/kubernetes/service/) - 업데이트 중 트래픽 분배를 담당
