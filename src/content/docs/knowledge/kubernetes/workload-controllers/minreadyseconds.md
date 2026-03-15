---
title: "minReadySeconds"
description: "`minReadySeconds`는 Deployment, StatefulSet, DaemonSet에서 새로 생성된 Pod가 \"사용 가능(available)\"으로 간주되기 위해 ready 상태를 유지해야 하는 최소 시간(초)을 지정하는 필드로, 결함 있는 버전의 전파..."
tags: ['Deployment', 'Availability', 'Rolling Update', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/minreadyseconds
sidebar:
  order: 13
---

## 핵심 개념

Pod가 ready 상태가 되더라도 바로 available로 간주되지 않는다. minReadySeconds로 지정된 시간이 경과해야 available이 된다. 이 시간 동안 컨테이너가 크래시하거나 readiness probe가 실패하면 타이머가 리셋된다.

이 기능은 롤링 업데이트의 진행 속도를 제어한다. Pod가 available이 될 때까지 Deployment 컨트롤러는 다음 Pod 교체를 진행하지 않는다. 따라서 높은 값을 설정하면 첫 번째 새 Pod가 충분히 검증된 후에야 나머지 Pod가 교체된다.

실제 활용 시나리오:
- `minReadySeconds: 3600` → 새 Pod가 1시간 동안 문제 없이 작동해야 다음 단계 진행
- readiness probe와 결합하면, probe가 실패할 때 Pod가 available이 되지 않아 롤아웃이 자동으로 멈춤
- minReadySeconds를 설정하지 않으면 결함 있는 버전이 모든 Pod에 빠르게 전파될 수 있음

주의: `progressDeadlineSeconds` (기본 600초)보다 minReadySeconds가 크면, progressDeadlineSeconds를 그에 맞게 증가시켜야 한다.

## 예시

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 0
      maxUnavailable: 1
  minReadySeconds: 60
  template:
    spec:
      containers:
      - name: kiada
        image: luksa/kiada:0.8
        readinessProbe:
          periodSeconds: 10
          failureThreshold: 1
          httpGet:
            port: 8080
            path: /healthz/ready
```

available vs ready Pod 수 확인:
```bash
kubectl get deploy kiada
# NAME   READY   UP-TO-DATE   AVAILABLE   AGE
# kiada  3/3     1            2           50m
# → 3개 ready, 2개만 available (새 Pod가 아직 minReadySeconds 미충족)
```

## 관련 개념

- [레디니스 프로브 (Readiness Probe)](/knowledge/kubernetes/readiness-probe/) - available 판단의 전제 조건
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - minReadySeconds 필드가 정의되는 오브젝트
- [디플로이먼트 롤백 (Deployment Rollback)](/knowledge/kubernetes/deployment-rollback/) - 결함 감지 시 롤백과 연계
