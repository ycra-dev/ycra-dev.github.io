---
title: "Multicore Processor"
description: "멀티코어 프로세서(Multicore Processor)는 단일 집적회로 내에 여러 개의 프로세서(코어)를 포함하는 마이크로프로세서이다"
tags: ['Parallelism', 'Processor', 'Thread Level Parallelism', 'Power Wall', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multicore-processor
sidebar:
  order: 10
---

## 핵심 개념

전력 장벽(power wall)으로 인해 단일 프로세서의 클럭 속도를 계속 높이는 것이 한계에 도달하자, 2006년부터 모든 데스크톱 및 서버 회사가 칩당 여러 프로세서를 탑재하기 시작했다. 이는 단일 프로그램의 응답 시간 개선보다는 처리량 향상에 더 유리하다. "쿼드코어"는 4개의 프로세서를 포함하는 칩을 의미한다. 멀티코어의 도입은 프로그래머에게 명시적 병렬 프로그래밍을 요구하며, 이는 스케줄링, 부하 분산, 동기화, 통신 오버헤드 등의 어려운 문제를 수반한다. 프로그래머가 성능 향상을 얻으려면 프로그램을 재작성하여 여러 프로세서를 활용해야 한다.

## 예시

```
단일코어 vs 멀티코어 성능 변화 추이:
- 1986-2002: 단일 프로세서 성능 연 ~52% 향상
- 2002 이후: 단일 프로세서 성능 연 ~3.5% 향상
- 해결책: 여러 코어를 통한 병렬 처리

병렬 프로그래밍의 도전:
1. 스케줄링: 작업을 코어에 적절히 분배
2. 부하 분산: 각 코어에 동일한 양의 작업 할당
3. 동기화: 공유 데이터에 대한 안전한 접근
4. 통신 오버헤드: 코어 간 데이터 교환 비용 최소화
```

## 관련 개념

- [Dynamic Power Consumption](/knowledge/computer-architecture/dynamic-power-consumption/)
- [Instruction-Level Parallelism](/knowledge/computer-architecture/instruction-level-parallelism/)
- [Throughput](/knowledge/computer-architecture/throughput/)
- [Central Processing Unit](/knowledge/computer-architecture/central-processing-unit/)
- [Data Race](/knowledge/computer-architecture/data-race/)
