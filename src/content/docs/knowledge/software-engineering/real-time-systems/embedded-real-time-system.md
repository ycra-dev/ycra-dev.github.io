---
title: "Embedded Real-Time System"
description: "임베디드 실시간 시스템은 하드웨어에 내장되어 환경의 이벤트에 실시간으로 반응하는 소프트웨어 시스템으로, 정확한 결과와 함께 결과가 생성되는 시간도 시스템의 올바른 동작에 영향을 미친다"
tags: ['Embedded System', 'Real Time', 'Stimulus Response', 'Hard Real Time', 'Soft Real Time', 'Sensor', 'Actuator']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/embedded-real-time-system
sidebar:
  order: 1
---

## 핵심 개념

임베디드 시스템은 연속적으로 실행되며, 환경과의 상호작용이 예측 불가능하고, 물리적 제약(전력, 공간)이 설계에 영향을 주며, 하드웨어와 직접 상호작용해야 할 수 있고, 안전성과 신뢰성이 설계를 지배할 수 있다. 자극-응답(stimulus-response) 모델이 가장 일반적인 설계 접근 방식이다. 자극에는 주기적 자극(예측 가능한 시간 간격)과 비주기적 자극(불규칙적, 인터럽트)이 있다. 소프트 실시간 시스템은 마감 시한 초과 시 서비스가 저하되고, 하드 실시간 시스템은 마감 시한 초과 시 시스템 장애로 간주된다. 설계 프로세스에는 플랫폼 선택, 자극/응답 식별, 타이밍 분석, 프로세스 설계, 알고리즘 설계, 데이터 설계, 프로세스 스케줄링이 포함된다.

## 예시

자동차 제동 시스템의 임베디드 소프트웨어가 너무 느리게 반응하면 차량 정지가 불가능하여 사고가 발생할 수 있다. 인슐린 펌프, 기상 관측소, 전화기, 게임 컨트롤러 등이 모두 임베디드 실시간 시스템의 예이다.

## 관련 개념

- [Real-Time Operating System](/knowledge/software-engineering/real-time-operating-system/)
- [Timing Analysis](/knowledge/software-engineering/timing-analysis/)
- [Stimulus-Response Model](/knowledge/software-engineering/stimulus-response-model/)
- [Architectural Patterns for Real-Time Software](/knowledge/software-engineering/architectural-patterns-for-real-time-software/)
