---
title: "Throughput"
description: "처리량(Throughput) 또는 대역폭(Bandwidth)은 주어진 시간 내에 완료된 작업의 총량을 나타내는 성능 측정 지표이다"
tags: ['Performance', 'Bandwidth', 'Server', 'Parallel Processing', 'Measurement']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/throughput
sidebar:
  order: 15
---

## 핵심 개념

처리량은 주로 서버 및 데이터센터 환경에서 중요한 성능 지표로, 단위 시간당 처리되는 작업 수로 측정된다. 개인 사용자는 주로 응답 시간(단일 작업의 완료 시간)에 관심이 있는 반면, 데이터센터 관리자는 하루에 완료되는 작업의 수, 즉 처리량에 더 관심이 있다. 응답 시간을 줄이면 거의 항상 처리량도 향상되지만, 프로세서를 추가하면 처리량은 증가하지만 개별 작업의 응답 시간은 변하지 않을 수 있다. 실제 시스템에서는 응답 시간과 처리량이 서로 영향을 미치는 경우가 많다.

## 예시

```
프로세서 추가의 효과:

시나리오 1: 기존 프로세서를 더 빠른 것으로 교체
→ 응답 시간 감소 + 처리량 증가

시나리오 2: 웹 검색 시스템에 프로세서 추가
→ 개별 작업 응답 시간 변화 없음
→ 전체 처리량 증가
→ (단, 대기열이 있다면 응답 시간도 개선될 수 있음)
```

## 관련 개념

- [Response Time](/knowledge/computer-architecture/response-time/)
- [Multicore Processor](/knowledge/computer-architecture/multicore-processor/)
- [SPEC Benchmark](/knowledge/computer-architecture/spec-benchmark/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
