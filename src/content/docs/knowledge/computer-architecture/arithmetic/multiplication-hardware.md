---
title: "Multiplication Hardware"
description: "곱셈 하드웨어는 시프트와 덧셈 연산을 통해 이진수 곱셈을 수행하는 하드웨어로, 순차적 방식에서 병렬 방식까지 다양한 구현이 있다"
tags: ['Multiplier', 'Alu', 'Shift Add', 'Sequential Multiplication', 'Parallel Multiplication']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multiplication-hardware
sidebar:
  order: 5
---

## 핵심 개념

기본 곱셈 알고리즘은 종이와 연필 방식을 모방한다. 곱수(multiplier)의 각 비트를 확인하여 1이면 피곱수(multiplicand)를 적절한 위치에 더하고, 0이면 건너뛴다. n비트 피곱수와 m비트 곱수의 곱은 n+m 비트가 필요하다. 첫 번째 설계는 64비트 곱수 레지스터, ALU, 곱 레지스터를 사용하여 32단계를 수행하며, 최적화된 버전은 32비트 가산기와 레지스터를 사용하여 곱수를 곱 레지스터의 오른쪽 절반에 배치한다. 더 빠른 곱셈은 곱수의 각 비트에 대해 하나의 32비트 가산기를 제공하여 병렬 트리 구조를 형성하며, log2(32) = 5번의 32비트 덧셈 시간만 소요된다. 캐리 세이브 가산기(carry save adder)와 파이프라인을 사용하면 더 빠른 곱셈이 가능하다.

## 예시

```
# 4비트 곱셈 예시: 2 × 3 (0010 × 0011)
# 반복 | 곱수    | 피곱수          | 곱
# 0    | 0011   | 0000 0010      | 0000 0000
# 1    | 0001   | 0000 0100      | 0000 0010  (곱수[0]=1, 더하기)
# 2    | 0000   | 0000 1000      | 0000 0110  (곱수[0]=1, 더하기)
# 3    | 0000   | 0001 0000      | 0000 0110  (곱수[0]=0, 건너뛰기)
# 4    | 0000   | 0010 0000      | 0000 0110  (곱수[0]=0, 건너뛰기)
# 결과: 0000 0110 = 6
```

## 관련 개념

- [Division Hardware](/knowledge/computer-architecture/division-hardware/)
- [Arithmetic Logic Unit](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [Carry Lookahead](/knowledge/computer-architecture/carry-lookahead/)
