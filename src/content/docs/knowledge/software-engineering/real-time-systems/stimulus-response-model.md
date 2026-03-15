---
title: "자극-응답 모델 (Stimulus-Response Model)"
description: "자극-응답 모델은 임베디드 실시간 소프트웨어 설계의 가장 일반적인 접근 방식으로, 시스템 환경에서 발생하는 자극(이벤트)과 이에 대한 시스템의 반응(응답)을 정의한다"
tags: ['Stimulus Response', 'Periodic', 'Aperiodic', 'Sensor', 'Actuator', 'Concurrent Process', 'State Model']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/stimulus-response-model
sidebar:
  order: 3
---

## 핵심 개념

자극은 시스템 환경의 센서에서 발생하며, 응답은 액추에이터로 전달된다. 자극은 두 종류로 나뉜다: 주기적 자극(예측 가능한 시간 간격, 예: 50ms마다 센서 확인)과 비주기적 자극(불규칙적으로 발생, 인터럽트 메커니즘을 통해 신호). 센서 관리 프로세스가 데이터를 수집하고, 데이터 처리 프로세스가 응답을 계산하며, 액추에이터 제어 프로세스가 액추에이터를 관리한다. 시스템은 동시에 다른 시점에 발생하는 자극에 응답해야 하므로 동시 실행 프로세스(concurrent processes)로 설계된다. 상태 모델(state model)은 시스템이 자극에 따라 한 상태에서 다른 상태로 전환되는 것을 표현하는 데 유용하다.

## 예시

방범 경보 시스템에서의 자극과 응답: 단일 센서 양성 -> 알람 시작 + 센서 주변 조명 점등. 두 개 이상 센서 양성 -> 알람 시작 + 센서 주변 조명 점등 + 침입 위치와 함께 경찰 호출. 전원 공급 장애 -> 서비스 기술자 호출.

## 관련 개념

- [임베디드 실시간 시스템 (Embedded Real-Time System)](/knowledge/software-engineering/embedded-real-time-system/)
- [시간 분석 (Timing Analysis)](/knowledge/software-engineering/timing-analysis/)
- [실시간 운영체제 (Real-Time Operating System)](/knowledge/software-engineering/real-time-operating-system/)
- [실시간 소프트웨어 아키텍처 패턴 (Architectural Patterns for Real-Time Software)](/knowledge/software-engineering/architectural-patterns-for-real-time-software/)
