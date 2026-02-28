---
title: "Blue-Green Deployment"
description: "두 개의 동일한 환경을 운영하여 트래픽을 원자적으로 전환하는 배포 전략"
tags: ["Software Engineering", "Deployment", "Zero-Downtime"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/blue-green-deployment
sidebar:
  order: 31
---

## 핵심 개념

블루-그린 배포(Blue-Green Deployment)는 두 개의 동일한 환경(blue/green)을 운영하여 트래픽을 원자적으로 전환하는 배포 전략이다. 카나리 배포와 달리 트래픽이 원자적으로 전환된다 — 중간 상태 없이 즉시 전환. 제로 다운타임 배포를 가능하게 한다.

## 동작 원리

절차:
1. 수동(예: Blue) 환경에서 현재 프로덕션 버전이 서비스 중
2. 새 버전을 Green 환경에 배포 (트래픽 없음)
3. Green 환경에서 스모크 테스트 실행
4. 로드 밸런서의 트래픽을 Blue에서 Green으로 즉시 전환
5. 문제 발생 시 Blue로 즉시 복귀
6. 안정화 후 Blue 환경 업데이트하거나 제거

각 환경이 100% 트래픽을 처리할 수 있어야 한다. 클라우드에서는 안정화 후 수동 환경을 제거하여 비용을 절약할 수 있다.

카나리 vs 블루-그린:
- **카나리**: 점진적 롤아웃, 두 버전이 동시에 트래픽 처리, 리스크 분산
- **블루-그린**: 원자적 전환, 한 번에 완전히 전환, 즉각적 롤백

## 예시

```
[배포 전]
로드밸런서 → Blue (v1.0) ← 100% 트래픽
             Green (v1.0) ← 유휴 상태

[배포 중]
로드밸런서 → Blue (v1.0) ← 100% 트래픽
             Green (v1.1) ← 스모크 테스트 중

[전환 후]
로드밸런서 → Blue (v1.0) ← 유휴 (롤백 준비)
             Green (v1.1) ← 100% 트래픽

[문제 발생 시 즉시 복귀]
로드밸런서 → Blue (v1.0) ← 100% 트래픽
             Green (v1.1) ← 유휴 (디버깅)
```

AWS에서 블루-그린 배포:
```bash
# Route53 가중치 기반 라우팅
# Blue (v1.0): 가중치 100
# Green (v1.1): 가중치 0

# 테스트 완료 후 전환
aws route53 change-resource-record-sets --change-batch '{
  "Changes": [
    {"Action": "UPSERT", "ResourceRecordSet": {"Name": "api.example.com", "Weight": 0}},  // Blue
    {"Action": "UPSERT", "ResourceRecordSet": {"Name": "api.example.com", "Weight": 100}} // Green
  ]
}'
```

## 관련 개념

- [Canary Deployment](/knowledge/software-engineering/quality-and-configuration/canary-deployment/)
- [Feature Flag](/knowledge/software-engineering/quality-and-configuration/feature-flag/)
- [Dark Launch](/knowledge/software-engineering/quality-and-configuration/dark-launch/)
- [Continuous Delivery](/knowledge/software-engineering/quality-and-configuration/continuous-delivery/)
