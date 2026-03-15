---
title: "신뢰성 지표 (Reliability Metrics)"
description: "시스템 신뢰성과 가용성을 정량적으로 측정하기 위한 지표로, 요구 시 실패 확률(POFOD), 장애 발생률(ROCOF), 가용성(AVAIL) 등이 있다"
tags: ['Reliability Metrics', 'Pofod', 'Rocof', 'Availability', 'Measurement', 'Quantitative']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/reliability-metrics
sidebar:
  order: 5
---

## 핵심 개념

POFOD(Probability of Failure on Demand)는 시스템에 서비스 요청이 있을 때 시스템 장애가 발생할 확률이다. ROCOF(Rate of Occurrence of Failures)는 특정 시간 단위 또는 시스템 실행 횟수 대비 관측될 수 있는 시스템 장애의 수를 나타낸다. ROCOF의 역수는 평균 고장 간격(MTTF)이다. AVAIL은 서비스 요청 시 시스템이 운영 중일 확률이다. POFOD는 요구 시 장애가 심각한 시스템 장애를 유발할 수 있는 보호 시스템에, ROCOF는 정기적으로 요청이 이루어지는 트랜잭션 시스템에, AVAIL은 지속적 서비스가 필요한 시스템에 적합하다. 정량적 신뢰성 사양은 이해관계자가 실제로 필요한 것을 명확히 하고, 테스트 중단 시점을 결정하며, 설계 전략을 평가하는 데 유용하다.

## 예시

가용성 0.9999는 24시간 동안 시스템이 약 8.4초만 사용 불가능함을 의미한다. 인슐린 펌프의 일시적 장애 POFOD 0.002는 500번의 요청 중 1번의 장애(약 3.5일에 1번)를 의미하며, 영구적 장애 POFOD 0.00002는 대략 연 1회의 장애를 의미한다.

## 관련 개념

- [신뢰성 (Reliability)](/knowledge/software-engineering/reliability/)
- [가용성 (Availability)](/knowledge/software-engineering/availability/)
- [통계적 테스팅 (Statistical Testing)](/knowledge/software-engineering/statistical-testing/)
- [장애-오류-실패 모델 (Fault-Error-Failure Model)](/knowledge/software-engineering/fault-error-failure-model/)
- [보호 시스템 (Protection System)](/knowledge/software-engineering/protection-system/)
