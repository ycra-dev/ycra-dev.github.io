---
title: "작업량 (Work)"
description: "Work(작업량)는 태스크 병렬 계산의 전체 실행 시간을 단일 프로세서에서 측정한 값으로, 계산의 모든 strand 실행 시간의 합이다"
tags: ['Work', 'Parallel Computing', 'Performance Analysis', 'Work Span Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/work
sidebar:
  order: 16
---

## 핵심 개념

Work는 병렬 알고리즘의 직렬 투영(serial projection)의 실행 시간과 동일하다. 즉, 병렬 키워드(spawn, sync, parallel)를 모두 제거한 코드의 실행 시간이다.

**Work Law (작업량 법칙)**: P개 프로세서에서의 실행 시간 T_P에 대해:
- T_P >= T_1 / P

이는 P개 프로세서가 한 단계에서 최대 P 단위의 작업만 수행할 수 있기 때문이다.

탐욕적(greedy) 스케줄러에서의 상계:
- T_P <= T_1/P + T_∞

여기서 T_∞는 span이다. 이 부등식은 탐욕적 스케줄링이 최적의 2배 이내임을 보장한다.

Work 분석은 기존 직렬 알고리즘 분석과 동일하므로, parallel for의 재귀적 spawning 오버헤드는 점근적으로 work에 영향을 주지 않는다(반복의 작업량에 상수 인자가 상각됨).

## 예시

P-FIB(n)의 work 분석:
```
T_1(n) = T_1(n-1) + T_1(n-2) + Θ(1)
       = Θ(φ^n)   (직렬 FIB와 동일)
```

P-MAT-VEC의 work 분석:
```
T_1(n) = Θ(n^2)   (이중 루프의 직렬 투영)
```

P-MATRIX-MULTIPLY의 work:
```
T_1(n) = Θ(n^3)   (삼중 루프와 동일)
```

## 관련 개념

- [스팬 (Span)](/knowledge/algorithms/span/) - 무한 프로세서에서의 실행 시간
- [병렬성 (Parallelism)](/knowledge/algorithms/parallelism/) - T_1/T_∞ 비율
- [속도 향상 (Speedup)](/knowledge/algorithms/speedup/) - T_1/T_P로 정의되는 속도 향상
- [포크-조인 병렬성 (Fork-Join Parallelism)](/knowledge/algorithms/fork-join-parallelism/) - work/span 분석의 기반 모델
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/) - work 분석에 사용되는 표기법
