---
title: "멀티프로세서 (Multiprocessor)"
description: "멀티프로세서는 최소 두 개 이상의 프로세서를 갖춘 컴퓨터 시스템이다"
tags: ['Parallel Computing', 'Multicore', 'Shared Memory', 'Cluster', 'Task Level Parallelism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multiprocessor
sidebar:
  order: 9
---

## 핵심 개념

에너지 문제가 마이크로프로세서와 데이터센터 모두에서 핵심 이슈가 되면서, 크고 비효율적인 프로세서 하나를 여러 개의 작고 효율적인 프로세서로 대체하는 것이 와트당 성능을 향상시킬 수 있다.

멀티프로세서의 성능 활용 방식:
1. **태스크 수준 병렬성(task-level parallelism):** 독립적인 단일 스레드 애플리케이션들을 동시에 실행하여 높은 처리량을 달성한다.
2. **병렬 처리 프로그램(parallel processing program):** 단일 프로그램을 여러 프로세서에서 동시에 실행하여 속도를 높인다.

현대 프로세서들은 멀티코어 마이크로프로세서 형태로, 단일 칩에 여러 코어를 포함한다. 거의 모든 멀티코어는 단일 물리 주소 공간을 공유하는 SMP(Shared Memory Processor)이다. 코어 수는 하드웨어 기술 발전에 따라 증가할 것으로 예상된다.

병렬 컴퓨팅의 핵심 과제는 올바르고 효율적인 병렬 프로그램을 작성하는 것이며, 코어 수가 증가함에 따라 이 과제는 더욱 어려워진다.

## 예시

```
# 하드웨어/소프트웨어 관점의 분류 (Figure 6.1)
              소프트웨어
              순차적 | 동시적
하드 직렬  | Pentium 4에서  | Pentium 4에서
웨어       | 컴파일러 실행  | OS 실행
     병렬  | Core i7에서    | Core i7에서
           | MATLAB 행렬곱  | OS 실행

# 멀티코어 발전
2005: 듀얼 코어 (2 cores)
2010: 쿼드 코어 (4 cores)
2015: 8-16 코어
2020: 수십~수백 코어 (서버용)
```

## 관련 개념

- [공유 메모리 멀티프로세서 (SMP)](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [강한 확장성 (Strong Scaling)](/knowledge/computer-architecture/strong-scaling/)
- [약한 확장성 (Weak Scaling)](/knowledge/computer-architecture/weak-scaling/)
- [하드웨어 멀티스레딩 (Hardware Multithreading)](/knowledge/computer-architecture/hardware-multithreading/)
