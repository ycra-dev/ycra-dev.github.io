---
title: "Clock Cycle"
description: "클럭 사이클(Clock Cycle)은 하드웨어에서 이벤트가 발생하는 이산적인 시간 간격으로, 프로세서 클럭의 한 주기에 해당한다"
tags: ['Performance', 'Timing', 'Processor', 'Hardware', 'Frequency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/clock-cycle
sidebar:
  order: 9
---

## 핵심 개념

거의 모든 컴퓨터는 하드웨어의 이벤트 타이밍을 결정하는 클럭을 사용하여 구성된다. 클럭 주기는 피코초(ps) 단위로, 클럭 속도는 기가헤르츠(GHz) 단위로 표현된다. 예를 들어 4GHz 클럭은 250ps의 클럭 주기를 가진다. CPU 실행 시간은 프로그램의 CPU 클럭 사이클 수에 클럭 주기를 곱한 것이다. 하드웨어 설계자는 클럭 사이클 수를 줄이거나 클럭 주기를 짧게 하여 성능을 향상시킬 수 있지만, 이 두 요소 사이에는 종종 트레이드오프가 존재한다. 현대 프로세서는 에너지 절약이나 성능 부스트를 위해 클럭 속도를 동적으로 변경할 수 있다(예: Intel Turbo 모드).

## 예시

```
CPU 실행 시간 = CPU 클럭 사이클 수 × 클럭 주기
            = CPU 클럭 사이클 수 / 클럭 속도

예시:
프로그램 A: 2 GHz 클럭, 20 × 10^9 클럭 사이클
CPU 시간 = 20 × 10^9 / (2 × 10^9) = 10초

4 GHz 클럭으로 업그레이드하면:
CPU 시간 = 20 × 10^9 / (4 × 10^9) = 5초
(같은 클럭 사이클 수 가정 시)
```

## 관련 개념

- [CPU Performance Equation](/knowledge/computer-architecture/cpu-performance-equation/)
- [CPI](/knowledge/computer-architecture/cpi/)
- [Response Time](/knowledge/computer-architecture/response-time/)
- [Central Processing Unit](/knowledge/computer-architecture/central-processing-unit/)
