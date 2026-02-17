---
title: "AMAT"
description: "AMAT(Average Memory Access Time)은 히트와 미스를 모두 고려한 평균 메모리 접근 시간으로, 캐시 설계를 평가하는 지표이다"
tags: ['Cache', 'Performance', 'Miss Rate', 'Hit Time', 'Miss Penalty']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/amat
sidebar:
  order: 13
---

## 핵심 개념

AMAT = 히트 시간 + 미스율 x 미스 패널티로 계산된다. 이 공식은 단순한 미스율만으로는 캐시 성능을 정확히 평가할 수 없음을 보여준다. 히트 시간도 중요한 요소이며, 캐시 크기를 키우면 미스율은 줄지만 히트 시간이 증가할 수 있다. CPU 시간은 (CPU 실행 사이클 + 메모리 스톨 사이클) x 클록 사이클 시간으로, 메모리 스톨 사이클 = (명령어당 미스 수) x 미스 패널티이다. 프로세서 속도가 빨라지면 메모리 스톨이 전체 실행 시간에서 차지하는 비율이 증가한다(Amdahl's Law). 비순차 실행 프로세서에서는 미스 패널티 중 일부를 다른 명령어 실행으로 숨길 수 있어, 실제 성능 평가에는 시뮬레이션이 필요하다.

## 예시

```
AMAT 계산 예시:

조건:
- 클록 사이클: 1 ns
- 미스 패널티: 20 클록 사이클
- 미스율: 5%
- 캐시 접근 시간: 1 클록 사이클

AMAT = 1 + 0.05 × 20 = 2 클록 사이클 (= 2 ns)

캐시 성능이 CPU에 미치는 영향:
- 기본 CPI: 2, 미스율 2%(명령어) + 4%(데이터, 36% 빈도)
- 미스 패널티: 100 사이클
- 명령어 미스: 2% × 100 = 2.00
- 데이터 미스: 36% × 4% × 100 = 1.44
- 총 CPI: 2 + 3.44 = 5.44
- 완벽한 캐시 대비 5.44/2 = 2.72배 느림
```

## 관련 개념

- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [Cache Miss](/knowledge/computer-architecture/cache-miss/)
- [Miss Penalty](/knowledge/computer-architecture/miss-penalty/)
- [Multilevel Cache](/knowledge/computer-architecture/multilevel-cache/)
- [Hit Rate](/knowledge/computer-architecture/hit-rate/)
