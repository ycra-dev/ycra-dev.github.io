---
title: "디플로이먼트 스케일링 함정 (Deployment Scaling Pitfall)"
description: "Deployment 매니페스트를 재적용할 때 `replicas` 필드가 포함되어 있으면 현재 스케일 설정을 의도치 않게 덮어쓸 수 있는 문제로, 프로덕션 환경에서 서비스 장애를 유발할 수 있다"
tags: ['Deployment', 'Scaling', 'Kubectl Apply', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/deployment-scaling-pitfall
sidebar:
  order: 15
---

## 핵심 개념

일반적인 시나리오: kubectl scale 명령으로 replicas를 5로 변경한 후, 레이블 추가 등 사소한 변경을 위해 매니페스트를 재적용하면, 매니페스트의 replicas 값(예: 3)이 적용되어 예상치 않은 스케일 다운이 발생한다.

replicas 필드를 매니페스트에서 제거해도 문제가 해결되지 않는다. 필드가 없으면 Kubernetes API가 기본값 1로 설정하기 때문에 더 심각한 스케일 다운이 발생한다.

권장 해결 방법:
1. **초기 생성 시 replicas 필드를 생략**: 처음에 1개의 replica로 시작하고, kubectl scale로 원하는 수로 조정
2. **기존 Deployment 수정**: `kubectl apply edit-last-applied deploy kiada` 명령으로 last-applied-configuration 어노테이션에서 replicas 필드를 제거
3. **HPA(Horizontal Pod Autoscaler) 사용**: 자동 스케일링을 사용하면 매니페스트의 replicas 값에 의존하지 않음

핵심 원인은 `kubectl apply`가 `kubectl.kubernetes.io/last-applied-configuration` 어노테이션을 기반으로 변경 사항을 계산하기 때문이다.

## 예시

문제 상황:
```bash
# 현재 5 replicas로 운영 중
kubectl scale deploy kiada --replicas 5

# 레이블만 추가하려고 매니페스트 재적용 (replicas: 3 포함)
kubectl apply -f deploy.kiada.labelled.yaml
# → replicas가 3으로 줄어듦!
```

해결:
```bash
# last-applied-configuration에서 replicas 필드 제거
kubectl apply edit-last-applied deploy kiada
# → replicas 필드를 삭제하고 저장

# 이후 kubectl apply는 replicas를 변경하지 않음
```

## 관련 개념

- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 스케일링 함정이 발생하는 대상
- [수평 확장 (Horizontal Scaling)](/knowledge/kubernetes/horizontal-scaling/) - 자동 스케일링으로 이 문제를 완화할 수 있음
- [선언적 모델 (Declarative Model)](/knowledge/kubernetes/declarative-model/) - kubectl apply의 선언적 모델이 원인
