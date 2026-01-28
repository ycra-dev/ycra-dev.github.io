---
title: "동시성 vs 병렬성 (Concurrency vs Parallelism)"
description: "여러 작업이 논리적으로 동시에 진행되는 동시성과 물리적으로 동시에 실행되는 병렬성의 차이"
tags: ["OS", "Concurrency", "Parallelism"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/concurrency-vs-parallelism
sidebar:
  order: 17
---

## 핵심 개념

동시성(Concurrency)은 여러 작업이 논리적으로 동시에 진행되는 것이고, 병렬성(Parallelism)은 물리적으로 동시에 실행되는 것입니다. 싱글코어 시대에는 동시성만 가능했으나, 멀티코어 시대에는 진정한 병렬성이 가능해졌습니다.

> "Concurrency is about dealing with lots of things at once.
> Parallelism is about doing lots of things at once." — Rob Pike

## 동작 원리

```
싱글코어 (Concurrency only):
│ T1 │ T2 │ T3 │ T1 │ T2 │ T3 │ T1 │ ...  ← 시분할
                  time →

멀티코어 (Parallelism possible):
Core 0: │ T1 │ T3 │ T1 │ T3 │ ...
Core 1: │ T2 │ T4 │ T2 │ T4 │ ...  ← 실제 동시 실행
                  time →
```

| 구분 | 동시성(Concurrency) | 병렬성(Parallelism) |
|------|---------------------|---------------------|
| 정의 | 여러 작업이 진행 중 | 여러 작업이 동시 실행 |
| 필요 조건 | CPU 1개 이상 | CPU(코어) 2개 이상 |
| 관점 | 논리적/구조적 | 물리적/실행적 |
| 관계 | 병렬성 없이 동시성 가능 | 병렬성이면 동시성도 성립 |

## 예시

- **동시성**: 한 명의 바리스타가 여러 음료를 번갈아가며 만드는 것 (커피 내리는 동안 우유 스팀)
- **병렬성**: 여러 명의 바리스타가 각자 음료를 동시에 만드는 것

- 동시성 장점: 싱글코어에서도 응답성 향상, 자원 효율적 사용
- 병렬성 장점: 실제 처리량(throughput) 증가
- 동시성 단점: 컨텍스트 스위칭 오버헤드
- 병렬성 단점: 멀티코어 하드웨어 필요, 동기화 복잡성

## 관련 개념

- [데이터 병렬성 vs 태스크 병렬성](/knowledge/os/data-vs-task-parallelism/)
- [멀티프로그래밍 (Multiprogramming)](/knowledge/os/multiprogramming/)
- [멀티태스킹 (Multitasking)](/knowledge/os/multitasking/)
- [멀티프로세서 스케줄링](/knowledge/os/multiprocessor-scheduling/)
