---
title: "Timing Analysis"
description: "타이밍 분석은 임베디드 실시간 소프트웨어 개발에서 각 프로세스의 실행 빈도를 계산하여 모든 입력이 처리되고 시스템 응답이 적시에 생성되도록 보장하는 분석 활동이다"
tags: ['Timing Analysis', 'Deadline', 'Frequency', 'Execution Time', 'Worst Case', 'Real Time', 'Scheduling']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/timing-analysis
sidebar:
  order: 4
---

## 핵심 개념

타이밍 분석에서 고려해야 할 세 가지 핵심 요소는 마감 시한(deadline, 자극 처리 및 응답 생성 기한), 빈도(frequency, 마감 시한을 항상 충족하기 위한 초당 프로세스 실행 횟수), 실행 시간(execution time, 자극 처리 및 응답 생성에 필요한 시간)이다. 하드 실시간 시스템에서는 최악의 경우 실행 시간(worst-case execution time)을 기준으로 계산해야 하고, 소프트 실시간 시스템에서는 평균 실행 시간을 사용할 수 있다. 빈도와 실행 시간 사이에는 트레이드오프가 있으며, 한 번의 실행에서 더 많은 센서를 검사하면 빈도를 줄일 수 있지만 실행 시간은 늘어난다. 분석 결과를 프로세스 모델에 실행 빈도와 예상 실행 시간으로 주석을 달아 문서화한다.

## 예시

전원 장애 감지 시스템에서 전원 장애 후 50ms 내에 장비 손상이 발생하므로, 안전 마진을 고려하여 40ms를 마감 시한으로 설정한다. 배터리 백업 활성화에 16ms가 소요되므로, 전원 장애 감지 및 백업 시작에 사용할 수 있는 시간은 24ms이다. 4ms마다 실행되는 주기적 프로세스가 3회 연속 전압 강하를 확인하면 전원 장애로 판단하여 16ms가 소요되고, 백업 전환 프로세스의 최악의 경우 실행 시간은 8ms여야 한다.

## 관련 개념

- [Embedded Real-Time System](/knowledge/software-engineering/embedded-real-time-system/)
- [Real-Time Operating System](/knowledge/software-engineering/real-time-operating-system/)
- [Stimulus-Response Model](/knowledge/software-engineering/stimulus-response-model/)
- [Architectural Patterns for Real-Time Software](/knowledge/software-engineering/architectural-patterns-for-real-time-software/)
