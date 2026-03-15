---
title: "보호 시스템 (Protection System)"
description: "다른 시스템(주로 제어 시스템)과 연관된 특수 시스템으로, 센서가 문제를 감지하면 제어 대상 시스템이 처리하지 못하는 경우 시스템을 종료하거나 보호 메커니즘을 발동하는 시스템이다"
tags: ['Protection System', 'Safety', 'Fault Tolerance', 'Monitoring', 'Shutdown', 'Redundancy']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/protection-system
sidebar:
  order: 8
---

## 핵심 개념

보호 시스템은 환경을 독립적으로 모니터링하고, 제어 시스템이 처리하지 못하는 문제가 감지되면 프로세스나 장비를 종료한다. 보호 시스템은 잠재적으로 위험한 상태에서 안전한 상태로 전환하는 데 필요한 핵심 기능만 포함하므로, 제어 소프트웨어보다 훨씬 간단하다. 이 간단함 덕분에 결함 회피와 결함 탐지에 더 많은 노력을 투자할 수 있다. 보호 시스템은 주 시스템과 별도의 센서 세트를 사용하여 센서 장애에 대한 백업을 제공한다. 보호 시스템에 대한 요구는 드물어야 하므로, POFOD 0.001(1000번 요구 중 1번 실패)이라 하더라도 수명 동안 2~3번의 요구만 있다면 실제 장애는 매우 드물다.

## 예시

열차가 적색 신호를 통과했는지 감지하는 열차 보호 시스템은, 열차 제어 시스템이 감속하고 있지 않다고 판단되면 자동으로 브레이크를 작동시켜 열차를 정지시킨다. 미국 우주왕복선의 백업 시스템은 주 제어 시스템이 실패하면 차량을 착륙시킬 수 있는 "귀환(get you home)" 기능만을 포함했다.

## 관련 개념

- [장애 허용 (Fault Tolerance)](/knowledge/software-engineering/fault-tolerance/)
- [중복성과 다양성 (Redundancy and Diversity)](/knowledge/software-engineering/redundancy-and-diversity/)
- [안전 필수 시스템 (Safety-Critical Systems)](/knowledge/software-engineering/safety-critical-systems/)
- [자가 모니터링 아키텍처 (Self-Monitoring Architecture)](/knowledge/software-engineering/self-monitoring-architecture/)
- [신뢰성 지표 (Reliability Metrics)](/knowledge/software-engineering/reliability-metrics/)
