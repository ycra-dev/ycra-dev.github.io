---
title: "Hit Rate"
description: "히트율(Hit Rate)은 메모리 계층구조의 한 수준에서 요청한 데이터를 찾은 메모리 접근의 비율이다"
tags: ['Cache', 'Memory Hierarchy', 'Performance', 'Miss Rate', 'Metric']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/hit-rate
sidebar:
  order: 10
---

## 핵심 개념

히트율은 메모리 계층구조의 성능을 측정하는 핵심 지표이다. 히트율이 높을수록 상위(빠른) 계층에서 더 많은 접근을 처리할 수 있어 전체 메모리 접근 시간이 줄어든다. 미스율은 1 - 히트율로 정의된다. 현대 캐시의 히트율은 보통 95% 이상이다. 히트율은 캐시 크기, 블록 크기, 연관도, 교체 정책, 프로그램의 지역성 특성에 영향을 받는다. 다단계 캐시에서는 글로벌 미스율(모든 캐시에서 미스)과 로컬 미스율(특정 캐시 수준의 미스/접근)을 구분해야 한다. 히트율만으로는 성능을 완전히 평가할 수 없으며, AMAT(평균 메모리 접근 시간)이 히트 시간, 미스율, 미스 패널티를 모두 고려하는 더 포괄적인 지표이다.

## 예시

```
히트율과 성능:

Intrinsity FastMATH 캐시 (SPEC CPU2000):
  명령어 캐시 미스율: 0.4% → 히트율 99.6%
  데이터 캐시 미스율: 11.4% → 히트율 88.6%
  통합 미스율: 3.24% → 히트율 96.76%

연관도에 따른 미스율 변화 (64KiB):
  직접 사상: 미스율 X%
  2-way: 미스율 ~0.85X% (약 15% 감소)
  4-way: 미스율 ~0.83X%
  8-way: 미스율 ~0.82X% (감소 폭 줄어듦)
```

## 관련 개념

- [Cache Miss](/knowledge/computer-architecture/cache-miss/)
- [AMAT](/knowledge/computer-architecture/amat/)
- [Miss Penalty](/knowledge/computer-architecture/miss-penalty/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
