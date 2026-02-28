---
title: "Service Level Objective"
description: "서비스 건강 지표의 목표값을 정의하는 것"
tags: ["Software Engineering", "SRE", "Operations", "Reliability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/service-level-objective
sidebar:
  order: 36
---

## 핵심 개념

서비스 수준 목표(Service Level Objective, SLO)는 서비스 건강 지표(SLI)의 목표값을 정의하는 것이다. SLI → SLO → SLA의 계층 구조로 이루어진다. 온콜 우선순위 결정, 롤아웃 모니터링, 용량 계획에 활용된다.

## 동작 원리

계층 구조:
- **SLI (Service Level Indicator)**: 서비스 건강 지표. 에러율, 요청 지연, 가용성 등
- **SLO (Service Level Objective)**: SLI의 목표값. 예: "P99 응답 시간 < 200ms"
- **SLA (Service Level Agreement)**: SLO 미달 시 결과에 대한 고객과의 합의 (환불, 크레딧 등)

Error Budget:
- SLO가 99.9%면 한 달에 43.8분의 다운타임 허용
- 이 "예산"을 어떻게 사용할지 결정 (새 기능 배포 vs 안정성)
- Error Budget 소진 시 새 기능 배포 중단, 안정성 개선에 집중

## 예시

실제 SLO 설정:
```
결제 서비스:
  SLI: 결제 성공률 (성공한 결제 / 전체 결제 요청)
  SLO: 99.95% 이상 (한 달에 21분 다운타임 허용)
  SLA: 99.9% 미달 시 월 청구액의 10% 크레딧

검색 서비스:
  SLI: P99 응답 시간
  SLO: P99 < 200ms
  SLA: 없음 (내부 서비스)
```

SLO 기반 온콜 우선순위:
```
온콜이 P99 응답 시간이 500ms로 급증 확인
  → SLO(200ms) 위반
  → P1 인시던트로 분류
  → 즉시 대응 필요

캐시 히트율이 70%로 하락 (목표: 80%)
  → SLO 위반 중
  → P2로 분류, 당일 내 조사
```

Error Budget 관리:
```
월간 Error Budget: 43.8분 (99.9% SLO 기준)

사용 현황:
  - 2월 1주: 배포 이슈로 5분 소비
  - 2월 2주: DB 장애로 15분 소비
  - 2월 3주: 남은 예산 23.8분

결정:
  - 예산의 54% 소비 → 대규모 배포 진행 검토
  - 남은 예산이 20% 미만이면 배포 동결
```

## 관련 개념

- [Incident Response](/knowledge/software-engineering/quality-and-configuration/incident-response/)
- [Observability](/knowledge/software-engineering/quality-and-configuration/observability/)
- [Postmortem](/knowledge/software-engineering/quality-and-configuration/postmortem/)
