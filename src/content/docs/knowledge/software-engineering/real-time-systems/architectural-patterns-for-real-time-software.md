---
title: "실시간 소프트웨어 아키텍처 패턴 (Architectural Patterns for Real-Time Software)"
description: "실시간 소프트웨어 아키텍처 패턴은 임베디드 실시간 시스템 설계에서 사용되는 프로세스 지향의 추상적인 설계 실천 방식으로, 시스템 아키텍처 조직에 대한 지식을 캡처한다"
tags: ['Architectural Patterns', 'Observe And React', 'Environmental Control', 'Process Pipeline', 'Real Time', 'Embedded']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/architectural-patterns-for-real-time-software
sidebar:
  order: 5
---

## 핵심 개념

세 가지 주요 패턴이 있다: (1) 관찰 및 반응(Observe and React) - 센서 값을 관찰하고 이벤트 발생 시 처리를 시작하는 모니터링 시스템에 사용. (2) 환경 제어(Environmental Control) - 센서에서 환경 정보를 수집하고 액추에이터에 제어 신호를 보내는 제어 시스템에 사용. (3) 프로세스 파이프라인(Process Pipeline) - 데이터를 연속적인 처리 단계를 통해 변환하는 시스템에 사용, 멀티프로세서/멀티코어에서 병렬 처리 가능. 이 패턴들은 결합하여 사용할 수 있으며, 예를 들어 환경 제어 패턴에서 액추에이터를 관찰 및 반응 패턴으로 모니터링할 수 있다. 이 패턴들은 설계의 출발점이며, 비효율적인 프로세스 아키텍처를 피하기 위해 최적화가 필요하다.

## 예시

자동차 미끄럼 방지 브레이크 시스템(ABS)은 환경 제어 패턴을 사용한다. 바퀴 모니터 프로세스가 각 바퀴의 회전 상태를 감시하고, 브레이크 페달 압력 모니터 프로세스가 운전자의 제동력을 감시한다. 바퀴가 잠기면(스키드) 분석 프로세스가 해당 바퀴의 브레이크 제어 프로세스에 신호를 보내 빠른 on/off 제동을 실행한다.

## 관련 개념

- [임베디드 실시간 시스템 (Embedded Real-Time System)](/knowledge/software-engineering/embedded-real-time-system/)
- [자극-응답 모델 (Stimulus-Response Model)](/knowledge/software-engineering/stimulus-response-model/)
- [시간 분석 (Timing Analysis)](/knowledge/software-engineering/timing-analysis/)
- [실시간 운영체제 (Real-Time Operating System)](/knowledge/software-engineering/real-time-operating-system/)
