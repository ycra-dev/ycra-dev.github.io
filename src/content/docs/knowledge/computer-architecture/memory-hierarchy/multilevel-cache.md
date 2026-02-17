---
title: "Multilevel Cache"
description: "다단계 캐시(Multilevel Cache)는 단일 캐시와 메인 메모리 대신 여러 수준의 캐시를 사용하는 메모리 계층구조이다"
tags: ['Cache', 'Memory Hierarchy', 'Performance', 'Miss Penalty', 'L2 Cache']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multilevel-cache
sidebar:
  order: 20
---

## 핵심 개념

다단계 캐시는 1차 캐시의 미스 패널티를 줄이기 위해 추가적인 캐시 수준을 도입한다. 1차 캐시에서 미스가 발생하면 2차 캐시를 먼저 확인하여, 2차 캐시에 데이터가 있으면 미스 패널티가 메인 메모리 접근 시간이 아닌 2차 캐시 접근 시간(보통 10 프로세서 사이클 미만)으로 줄어든다. 1차 캐시와 2차 캐시의 설계 목표는 다르다: 1차 캐시는 히트 시간 최소화(짧은 클록 사이클, 적은 파이프라인 단계)에 집중하여 더 작고 단순하며, 2차 캐시는 미스율 감소에 집중하여 훨씬 크고 높은 연관도와 큰 블록 크기를 사용한다. 글로벌 미스율(전체 메모리 접근 중 모든 캐시에서 미스한 비율)이 메인 메모리 접근 빈도를 결정한다. 로컬 미스율(특정 캐시 수준의 미스/접근)은 1차 캐시 필터링 때문에 글로벌 미스율보다 훨씬 높을 수 있다.

## 예시

```
2단계 캐시 성능 비교:

단일 캐시:
- CPI = 1.0 + 2% × 400 = 9.0

2단계 캐시:
- L1 미스율: 2%, L2 접근 시간: 20 사이클
- 글로벌 미스율: 0.5%, 메모리 접근: 400 사이클
- CPI = 1.0 + 2%×20 + 0.5%×400 = 3.4

성능 향상: 9.0 / 3.4 = 2.6배

로컬 vs 글로벌 미스율:
- L2 로컬 미스율: 0.5% / 2% = 25%
- L2 글로벌 미스율: 0.5%
```

## 관련 개념

- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [AMAT](/knowledge/computer-architecture/amat/)
- [Cache Miss](/knowledge/computer-architecture/cache-miss/)
- [Miss Penalty](/knowledge/computer-architecture/miss-penalty/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
