---
title: "Speedup"
description: "Speedup(속도 향상)은 P개 프로세서에서 병렬 계산의 성능 향상 정도를 나타내는 비율로, T_1/T_P로 정의된다"
tags: ['Speedup', 'Parallel Computing', 'Performance', 'Scalability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/speedup
sidebar:
  order: 18
---

## 핵심 개념

Work law에 의해 T_P >= T_1/P이므로, speedup은 최대 P이다:
- T_1/T_P <= P (어떤 경우에도 프로세서 수보다 큰 speedup은 불가능)

**선형 속도 향상(Linear speedup)**: T_1/T_P = Θ(P)일 때 발생
**완벽한 선형 속도 향상(Perfect linear speedup)**: T_1/T_P = P일 때 발생

프로세서 수가 parallelism(T_1/T_∞)을 초과하면 완벽한 선형 속도 향상은 불가능하다:
- P > T_1/T_∞이면 T_1/T_P <= T_1/T_∞ < P

**Parallel slackness(병렬 여유)**: (T_1/T_∞)/P 비율
- slackness >> 1이면 T_P ≈ T_1/P (거의 완벽한 선형 speedup)
- slackness < 1이면 완벽한 선형 speedup 불가능
- 실무적으로 slackness 10 이상이면 충분한 speedup 달성

## 예시

체스 프로그램 사례 (실화):
```
원래 버전: T_1 = 2048초, T_∞ = 1초
최적화 버전: T'_1 = 1024초, T'_∞ = 8초

32 프로세서:
  원래: T_32 = 2048/32 + 1 = 65초
  최적화: T'_32 = 1024/32 + 8 = 40초  (최적화가 더 빠름)

512 프로세서:
  원래: T_512 = 2048/512 + 1 = 5초
  최적화: T'_512 = 1024/512 + 8 = 10초  (최적화가 더 느림!)
```

교훈: span이 프로세서 수 증가 시 지배적 항이 되므로, work만 줄이고 span을 늘리는 최적화는 확장성이 나쁘다.

## 관련 개념

- [Work](/knowledge/algorithms/work/) - speedup의 분자 T_1
- [Span](/knowledge/algorithms/span/) - speedup의 상한을 결정하는 요소
- [Parallelism](/knowledge/algorithms/parallelism/) - 달성 가능한 최대 speedup
- [Fork-Join Parallelism](/knowledge/algorithms/fork-join-parallelism/) - speedup 분석의 기반 모델
