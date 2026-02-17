---
title: "COCOMO Cost Modeling"
description: "COCOMO II는 대규모 소프트웨어 프로젝트 데이터를 기반으로 도출된 경험적 비용 추정 모델로, 시스템 크기와 제품/프로젝트/팀 요인을 개발 노력과 연관짓는 공식을 제공한다"
tags: ['Cocomo', 'Cost Estimation', 'Effort Estimation', 'Software Economics', 'Parametric Model']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/cocomo-cost-modeling
sidebar:
  order: 11
---

## 핵심 개념

COCOMO II는 네 가지 하위 모델을 포함한다: (1) 애플리케이션 구성 모델(application composition model) - 재사용 컴포넌트 기반 프로젝트에 사용, (2) 초기 설계 모델(early design model) - 요구사항 확립 후 초기 설계 단계에서 7개 승수 사용, (3) 재사용 모델(reuse model) - 재사용 코드 통합 노력 산정, (4) 사후 아키텍처 모델(post-architecture model) - 아키텍처 설계 후 17개 승수를 사용한 가장 상세한 추정. 지수 B는 선례성(precedentedness), 개발 유연성(flexibility), 아키텍처/리스크 해결, 팀 응집력(cohesion), 프로세스 성숙도(maturity) 등 5가지 규모 인자로 결정되며, 1.01~1.24 범위이다. TDEV = 3 x (PM)^(0.33+0.2*(B-1.01)) 공식으로 프로젝트 기간도 추정할 수 있다.

## 예시

```
PM = 2.94 x Size^(1.1~1.24) x M
```
애플리케이션 구성 모델 공식: PM = (NAP x (1 - %reuse/100)) / PROD. 재사용 모델의 등가 소스 코드 라인 수: ESLOC = ASLOC x (1 - AT/100) x AAM. B = 1.17, PM = 60일 때 TDEV = 3 x (60)^0.36 = 13개월.

## 관련 개념

- [Algorithmic Cost Modeling](/knowledge/software-engineering/algorithmic-cost-modeling/)
- [Software Pricing](/knowledge/software-engineering/software-pricing/)
- [Project Planning](/knowledge/software-engineering/project-planning/)
