---
title: "Fault-Error-Failure Model"
description: "Brian Randell이 정의한 모델로, 인간의 실수(mistake)가 결함(fault)을 발생시키고, 결함이 오류(error)를 유발하며, 오류가 시스템 장애(failure)로 이어지는 인과 관계를 나타낸다"
tags: ['Fault', 'Error', 'Failure', 'Reliability', 'Causal Model', 'Terminology']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/fault-error-failure-model
sidebar:
  order: 2
---

## 핵심 개념

이 모델은 시스템 신뢰성 논의에서 용어 혼동을 피하기 위해 결함, 오류, 장애를 명확히 구분한다. 시스템 결함(fault)은 시스템 오류를 유발할 수 있는 소프트웨어 시스템의 특성이며, 시스템 오류(error)는 사용자가 예상하지 못한 동작을 유발할 수 있는 실행 중의 잘못된 시스템 상태이다. 시스템 장애(failure)는 시스템이 사용자가 기대하는 서비스를 제공하지 못하는 시점에 발생하는 이벤트이다. 중요한 것은 결함이 반드시 오류로, 오류가 반드시 장애로 이어지지는 않는다는 점이다. 결함이 있는 코드가 실행되지 않을 수 있고, 오류 상태가 다른 입력에 의해 유효한 값으로 재설정될 수 있으며, 결함 감지 및 보호 메커니즘이 장애를 방지할 수 있다. 이 구분은 결함 회피, 결함 탐지 및 수정, 결함 허용이라는 세 가지 보완적 접근법의 기초가 된다.

## 예시

야생 날씨 시스템에서 프로그래머가 다음 전송 시간을 현재 시간에 1시간을 더하는 코드를 작성한 경우: 결함(fault)은 23시 이상일 때의 검사 누락, 오류(error)는 전송 시간 변수가 00.XX 대신 24.XX로 설정되는 것, 장애(failure)는 유효하지 않은 시간으로 인해 날씨 데이터가 전송되지 않는 것이다.

## 관련 개념

- [Reliability](/knowledge/software-engineering/reliability/)
- [Fault Tolerance](/knowledge/software-engineering/fault-tolerance/)
- [Dependability](/knowledge/software-engineering/dependability/)
- [Reliability Metrics](/knowledge/software-engineering/reliability-metrics/)
