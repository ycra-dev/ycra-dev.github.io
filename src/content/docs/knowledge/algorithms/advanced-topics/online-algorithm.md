---
title: "Online Algorithm"
description: "온라인 알고리즘(Online Algorithm)은 입력을 한꺼번에 받지 않고 시간에 따라 점진적으로 받으면서 각 입력에 대해 즉시 결정을 내려야 하는 알고리즘이다"
tags: ['Online Algorithm', 'Competitive Analysis', 'Decision Making', 'Adversarial']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/online-algorithm
sidebar:
  order: 12
---

## 핵심 개념

온라인 알고리즘은 오프라인 알고리즘과 대비된다. 오프라인 알고리즘은 전체 입력을 미리 알고 최적의 결정을 내릴 수 있지만, 온라인 알고리즘은 미래를 모른 채 결정해야 한다.

온라인 알고리즘의 성능 평가 방법:
1. **경쟁 분석(Competitive Analysis)**: 미래를 아는 최적 오프라인 알고리즘과 비교
2. **확률적 모델**: 미래 입력에 대한 확률적 모델 가정
3. **적대적 모델**: 최악의 경우를 고려

실제 적용 분야:
- 주식 거래: 미래 가격을 모른 채 매매 결정
- 작업 스케줄링: 미래 작업을 모른 채 현재 작업 배치
- 캐시 관리: 미래 접근 패턴을 모른 채 블록 교체
- 재고 관리: 미래 수요를 모른 채 주문 결정

엘리베이터 문제가 대표적인 교육용 예시이다: k층을 올라가야 할 때 엘리베이터를 기다릴지 계단을 이용할지 결정해야 한다. "k분 기다린 후 계단"이라는 헤징 전략은 경쟁비 2를 달성한다.

## 예시

엘리베이터 vs 계단 헤징 전략:
```
h(m) = m + 1   (m < k일 때, 엘리베이터 도착 시)
h(m) = 2k      (m >= k일 때, k분 대기 후 계단 이용)

최적 전략 t(m):
t(m) = m + 1   (m < k일 때, 엘리베이터)
t(m) = k       (m >= k일 때, 계단)

경쟁비 = max{h(m)/t(m)} = max{(k+1)/k, 2k/k} = 2
```

스키 대여 문제:
```
대여비 r/일, 구매비 b
전략: ⌈b/r⌉ - 1일 대여 후 구매
경쟁비: 2
```

## 관련 개념

- [Competitive Analysis](/knowledge/algorithms/competitive-analysis/) - 온라인 알고리즘의 주요 분석 기법
- [Move-to-Front](/knowledge/algorithms/move-to-front/) - 검색 리스트 유지의 온라인 알고리즘
- [Online Caching](/knowledge/algorithms/online-caching/) - 캐시 관리의 온라인 알고리즘
- [Greedy Algorithm](/knowledge/algorithms/greedy-algorithm/) - 탐욕적 접근과의 연관성
