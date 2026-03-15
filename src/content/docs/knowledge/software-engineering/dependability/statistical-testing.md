---
title: "통계적 테스팅 (Statistical Testing)"
description: "실제 운영 환경의 사용 패턴을 반영하는 운영 프로파일에 기반한 테스트 데이터를 사용하여 시스템의 신뢰성을 정량적으로 측정하는 테스트 프로세스이다"
tags: ['Statistical Testing', 'Reliability', 'Operational Profile', 'Testing', 'Measurement', 'Quantitative']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/statistical-testing
sidebar:
  order: 13
---

## 핵심 개념

통계적 테스팅은 결함 발견이 아닌 신뢰성 측정에 초점을 맞춘 프로세스이다. 네 단계로 구성된다: (1) 기존 동종 시스템의 사용 방식을 연구하여 운영 프로파일을 정의하고, (2) 운영 프로파일을 반영하는 테스트 데이터를 구성하며, (3) 이 데이터로 시스템을 테스트하여 장애의 수와 유형을 기록하고, (4) 통계적으로 유의미한 수의 장애를 관측한 후 신뢰성 메트릭 값을 계산한다. 그러나 운영 프로파일의 불확실성, 테스트 데이터 생성의 높은 비용, 높은 신뢰성 요구 시 통계적 불확실성, 장애 인식의 어려움 등의 실질적 어려움이 있다. 결함 주입(fault injection)과 함께 사용하여 결함 테스팅 프로세스의 효과를 평가할 수도 있다.

## 예시

전화 교환 시스템의 운영 프로파일은 수년간의 사용 데이터를 기반으로 비교적 쉽게 개발할 수 있다. 약 15인년의 개발 노력이 필요한 시스템의 운영 프로파일은 약 1인월 만에 개발되었다. 테스트 데이터 생성기를 사용하여 운영 프로파일에 맞는 입력을 자동으로 생성할 수 있다.

## 관련 개념

- [신뢰성 지표 (Reliability Metrics)](/knowledge/software-engineering/reliability-metrics/)
- [신뢰성 (Reliability)](/knowledge/software-engineering/reliability/)
- [장애-오류-실패 모델 (Fault-Error-Failure Model)](/knowledge/software-engineering/fault-error-failure-model/)
- [신뢰 가능한 프로세스 (Dependable Processes)](/knowledge/software-engineering/dependable-processes/)
