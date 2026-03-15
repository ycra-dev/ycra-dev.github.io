---
title: "신뢰성 (Reliability)"
description: "주어진 환경에서 특정 기간 동안 시스템이 사용자가 기대하는 대로 올바르게 서비스를 제공할 확률이다"
tags: ['Reliability', 'Dependability', 'Fault Avoidance', 'Correctness', 'System Property']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/reliability
sidebar:
  order: 4
---

## 핵심 개념

신뢰성은 시스템이 장애 없이 올바르게 동작할 확률로 표현되는 의존성 속성이다. 신뢰성은 "정확성(correctness)", "정밀성(precision)", "적시성(timeliness)"과 같은 하위 속성으로 분해될 수 있다. 시스템 신뢰성은 절대적인 값이 아니라 사용 환경과 사용 패턴에 따라 달라지며, 동일한 시스템이라도 사용자에 따라 다른 신뢰성을 경험할 수 있다. 결함(fault)이 반드시 오류(error)로 이어지는 것은 아니며, 오류가 반드시 장애(failure)로 이어지는 것도 아니다. 신뢰성 향상을 위해 결함 회피, 결함 탐지 및 제거, 결함 허용의 세 가지 보완적 접근법이 사용된다.

## 예시

인슐린 펌프의 신뢰성 요구사항에서 일시적 소프트웨어 장애의 POFOD(요구 시 실패 확률)는 0.002, 영구적 소프트웨어 장애의 POFOD는 0.00002 이하로 지정할 수 있다.

## 관련 개념

- [신뢰성 (Dependability)](/knowledge/software-engineering/dependability/)
- [가용성 (Availability)](/knowledge/software-engineering/availability/)
- [장애 허용 (Fault Tolerance)](/knowledge/software-engineering/fault-tolerance/)
- [장애-오류-실패 모델 (Fault-Error-Failure Model)](/knowledge/software-engineering/fault-error-failure-model/)
- [신뢰성 지표 (Reliability Metrics)](/knowledge/software-engineering/reliability-metrics/)
- [중복성과 다양성 (Redundancy and Diversity)](/knowledge/software-engineering/redundancy-and-diversity/)
