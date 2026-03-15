---
title: "카나리 디플로이먼트 (Canary Deployment)"
description: "Canary Deployment는 새 버전의 애플리케이션을 안정 버전과 함께 배포하되, 트래픽의 일부만 새 버전으로 전달하여 전체 사용자에게 영향을 주기 전에 문제를 발견하는 배포 패턴이다"
tags: ['Kubernetes', 'Deployment', 'Canary', 'Release Strategy', 'Deployment Strategy', 'Blue Green']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/canary-deployment
sidebar:
  order: 16
---

## 핵심 개념

Canary Deployment의 이름은 광산에서 유독가스를 감지하기 위해 카나리아 새를 사용한 것에서 유래한다. Kubernetes에서는 레이블을 활용하여 이 패턴을 자연스럽게 구현할 수 있다.

예를 들어, 안정 버전의 파드에는 `rel: stable` 레이블을, 카나리 버전에는 `rel: canary` 레이블을 부착한다. Service의 레이블 셀렉터를 `app: kiada`로 설정하면 두 버전 모두 동일한 서비스에 포함되어 트래픽을 받는다. 안정 버전 3개, 카나리 버전 1개를 배포하면 약 25%의 트래픽이 카나리로 전달된다.

카나리 버전에서 문제가 발견되면 해당 파드만 삭제하거나, 레이블 셀렉터를 사용하여 `kubectl delete pods -l rel=canary` 명령으로 모든 카나리 파드를 한 번에 제거할 수 있다. 이렇게 레이블과 셀렉터를 조합하면 버전 관리, 트래픽 분배, 롤백이 유연하게 가능해진다.

Kubernetes에서 Canary 배포를 구현하는 세 가지 방법:

1. **minReadySeconds 활용**: 높은 값을 설정하면 첫 번째 Pod가 검증될 때까지 롤아웃이 자동 대기. 단, 모든 단계에 동일하게 적용되는 한계가 있음.
2. **kubectl rollout pause 활용**: 롤아웃 시작 직후 pause하여 첫 번째 Pod만 배포 후 수동 검증. 문제가 없으면 resume으로 나머지 진행.
3. **별도 Deployment 사용**: Stable Deployment와 Canary Deployment를 분리 생성. Canary Deployment의 replicas를 적게 설정하고, 동일한 Service의 label selector가 양쪽 Pod를 모두 포함하도록 구성.

Canary 외에 다른 고급 전략도 Kubernetes에서 구현 가능하다:
- **A/B Testing**: 두 개의 Deployment, Service, Ingress 조건 기반 라우팅
- **Blue/Green**: 두 Deployment를 병렬 배포 후 Service의 selector를 전환
- **Traffic Shadowing (Dark Launch)**: 새 버전에 트래픽을 미러링하되 응답은 버림

Flagger와 Argo Rollouts 같은 프로젝트가 이러한 전략을 자동화해준다.

## 예시

안정 버전과 카나리 버전 파드의 레이블 구조:

```yaml
# 안정 버전 파드
metadata:
  name: kiada-001
  labels:
    app: kiada
    rel: stable

# 카나리 버전 파드
metadata:
  name: kiada-canary
  labels:
    app: kiada
    rel: canary
```

Service는 `app` 레이블만으로 셀렉팅 (두 버전 모두 포함):

```yaml
spec:
  selector:
    app: kiada
```

카나리 파드만 선택적으로 삭제:

```bash
kubectl delete pods -l rel=canary
```

별도 Deployment를 이용한 Canary 구현:
```yaml
# Stable Deployment (9 replicas)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kiada-stable
spec:
  replicas: 9
  selector:
    matchLabels:
      app: kiada
  template:
    metadata:
      labels:
        app: kiada
        ver: "0.6"
    spec:
      containers:
      - name: kiada
        image: luksa/kiada:0.6
---
# Canary Deployment (1 replica)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kiada-canary
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kiada
  template:
    metadata:
      labels:
        app: kiada
        ver: "0.7"
    spec:
      containers:
      - name: kiada
        image: luksa/kiada:0.7
```

롤아웃 일시정지를 이용한 Canary:
```bash
kubectl apply -f deploy.kiada.0.7.yaml
kubectl rollout pause deployment kiada  # 첫 번째 Pod 교체 후 대기
# 검증 후...
kubectl rollout resume deployment kiada
```

## 관련 개념

- [레이블 (Label)](/knowledge/kubernetes/label/) - 카나리와 안정 버전을 구분하는 핵심 메커니즘
- [레이블 셀렉터 (Label Selector)](/knowledge/kubernetes/label-selector/) - 서비스에서 파드를 선택하는 방법
- [서비스 (Service)](/knowledge/kubernetes/service/) - 카나리와 안정 버전 파드로 트래픽을 분배
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - Canary 배포의 기반 오브젝트
- [롤링 업데이트 전략 (RollingUpdate Strategy)](/knowledge/kubernetes/rolling-update-strategy/) - Canary의 기본 매커니즘
- [인그레스 (Ingress)](/knowledge/kubernetes/ingress/) - A/B 테스트에서 조건 기반 라우팅 담당
- [minReadySeconds](/knowledge/kubernetes/minreadyseconds/) - 자동 Canary 효과를 제공
