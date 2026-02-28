---
title: "Canary Deployment"
description: "새 버전을 소수의 서버에만 먼저 배포하고 소량의 트래픽을 라우팅하여 문제를 조기 감지하는 배포 전략"
tags: ["Software Engineering", "Deployment", "Risk Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/canary-deployment
sidebar:
  order: 30
---

## 핵심 개념

카나리 배포(Canary Deployment)는 새 버전을 소수의 서버에만 먼저 배포하고 소량의 트래픽을 라우팅하여 문제를 조기 감지하는 배포 전략이다. 광산의 카나리아에서 유래했다 — 카나리가 먼저 위험을 감지한다. 대량 트래픽 서비스에 적합하다.

## 동작 원리

카나리 배포 절차:
1. 새 버전을 전체 서버 중 소수(예: 10%)에 배포
2. 로드 밸런서가 소량(예: 1~5%) 트래픽을 카나리 버전으로 라우팅
3. 에러율, 응답 시간, 비즈니스 메트릭을 모니터링
4. 문제 발생 시 트래픽을 즉시 0%로 줄이고 이전 버전으로 복귀
5. 정상 확인 후 점진적으로 트래픽 비율 확대 (1% → 5% → 25% → 100%)

주의: DB/캐시 상태를 변경하는 서비스는 전방/후방 호환성을 반드시 보장해야 한다.

## 예시

```
서비스 v1.0 (9대, 99% 트래픽)
서비스 v1.1 (1대, 1% 트래픽) ← 카나리

모니터링 지표:
  - 에러율 v1.0 vs v1.1 비교
  - P99 응답 시간 비교
  - 비즈니스 메트릭 (전환율, 결제 성공률)

1% → 문제 없음 → 5% → 문제 없음 → 25% → ... → 100%
```

Kubernetes에서 카나리 배포:
```yaml
# v1.0 Deployment (90% 트래픽)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-stable
spec:
  replicas: 9

---
# v1.1 Deployment (10% 트래픽) - 카나리
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-canary
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: my-app
          image: my-app:v1.1
```

자동화된 카나리 분석:
```
배포 시작
  → 1% 트래픽 카나리 버전으로
  → 15분 동안 에러율 모니터링
  → 에러율 정상 (<0.1%) → 자동으로 5%로 확대
  → 에러율 이상 (>1%) → 자동 롤백 + 알림
```

## 관련 개념

- [Blue-Green Deployment](/knowledge/software-engineering/quality-and-configuration/blue-green-deployment/)
- [Feature Flag](/knowledge/software-engineering/quality-and-configuration/feature-flag/)
- [Dark Launch](/knowledge/software-engineering/quality-and-configuration/dark-launch/)
- [Observability](/knowledge/software-engineering/quality-and-configuration/observability/)
