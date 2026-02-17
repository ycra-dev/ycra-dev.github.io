---
title: "Amdahl's Law"
description: "암달의 법칙(Amdahl's Law)은 특정 개선이 가능한 성능 향상이, 그 개선된 기능이 사용되는 비율에 의해 제한된다는 규칙이다"
tags: ['Performance', 'Speedup', 'Optimization', 'Parallel Processing', 'Diminishing Returns']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/amdahls-law
sidebar:
  order: 19
---

## 핵심 개념

암달의 법칙은 컴퓨터 시스템의 한 부분만 개선할 때 전체 성능 향상의 한계를 정량적으로 보여준다. 공식은 다음과 같다: 개선 후 실행 시간 = (개선 영향 부분의 실행 시간 / 개선량) + 영향받지 않는 부분의 실행 시간. 예를 들어, 곱셈이 전체 실행 시간의 80%를 차지하는 프로그램에서 아무리 곱셈을 빠르게 해도 5배 이상의 전체 성능 향상은 불가능하다(나머지 20%가 한계). 이 법칙은 병렬 프로세서의 실용적 한계를 주장하는 데에도 사용되며, 병렬화할 수 없는 순차적 부분이 전체 성능의 병목이 된다.

## 예시

```
프로그램 실행 시간: 100초
곱셈 연산 시간: 80초 (전체의 80%)

Q: 프로그램을 5배 빠르게 하려면 곱셈을 몇 배 빠르게 해야 하는가?

개선 후 실행 시간 = 80/n + (100-80) = 80/n + 20

목표: 100/5 = 20초
20 = 80/n + 20
0 = 80/n

→ n이 무한대여도 불가능!
   곱셈이 80%만 차지하므로 최대 5배 향상은 달성 불가
   나머지 20%가 하한선(floor)을 형성
```

## 관련 개념

- [CPU Performance Equation](/knowledge/computer-architecture/cpu-performance-equation/)
- [Multicore Processor](/knowledge/computer-architecture/multicore-processor/)
- [Response Time](/knowledge/computer-architecture/response-time/)
- [Throughput](/knowledge/computer-architecture/throughput/)
