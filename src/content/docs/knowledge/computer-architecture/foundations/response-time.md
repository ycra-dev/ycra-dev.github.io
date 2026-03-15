---
title: "응답 시간 (Response Time)"
description: "응답 시간(Response Time) 또는 실행 시간(Execution Time)은 컴퓨터가 하나의 작업을 완료하는 데 걸리는 총 시간으로, 디스크 접근, 메모리 접근, I/O 활동, 운영체제 오버헤드, CPU 실행 시간 등을 모두 포함한다"
tags: ['Performance', 'Execution Time', 'Benchmark', 'CPU Time', 'Measurement']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/response-time
sidebar:
  order: 14
---

## 핵심 개념

응답 시간은 컴퓨터 성능의 유일하고 확실한 측정 지표이다. 성능(Performance)은 실행 시간의 역수(1/실행 시간)로 정의되므로, 성능을 높이려면 실행 시간을 줄여야 한다. "X가 Y보다 n배 빠르다"는 것은 Y의 실행 시간이 X의 n배라는 의미이다. CPU 시간은 사용자 CPU 시간(프로그램 자체에 소요)과 시스템 CPU 시간(운영체제가 프로그램을 위해 소요)으로 나뉜다. 벽시계 시간(wall clock time)은 경과 시간(elapsed time)이라고도 하며, I/O 대기 시간 등 모든 시간을 포함한다.

## 예시

```
성능 비교 예시:
- 컴퓨터 A: 프로그램 실행 시간 = 10초
- 컴퓨터 B: 프로그램 실행 시간 = 15초

A가 B보다 몇 배 빠른가?
n = 실행시간_B / 실행시간_A = 15/10 = 1.5
→ A는 B보다 1.5배 빠르다
```

## 관련 개념

- [처리율 (Throughput)](/knowledge/computer-architecture/throughput/)
- [CPU 성능 방정식 (CPU Performance Equation)](/knowledge/computer-architecture/cpu-performance-equation/)
- [클록 주기 (Clock Cycle)](/knowledge/computer-architecture/clock-cycle/)
- [SPEC 벤치마크 (SPEC Benchmark)](/knowledge/computer-architecture/spec-benchmark/)
