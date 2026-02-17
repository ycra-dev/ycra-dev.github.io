---
title: "Multiplicative Weights"
description: "가중 다수결 알고리즘(Multiplicative Weights / Weighted-Majority)은 여러 전문가의 예측을 가중 결합하여 순차적 의사결정을 수행하며, 실수한 전문가의 가중치를 곱셈적으로 감소시켜 최선의 전문가에 근접한 성능을 달성하는 온라인 학습 ..."
tags: ['Multiplicative Weights', 'Weighted Majority', 'Online Learning', 'Expert Prediction', 'Regret']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/multiplicative-weights
sidebar:
  order: 19
---

## 핵심 개념

**문제 설정 (전문가로부터 학습)**:
- n명의 전문가 E₁, ..., Eₙ이 T개의 사건에 대해 0 또는 1로 예측
- 학습자는 전문가들의 예측을 참고하여 자신의 예측 p(t)를 결정
- 사건의 결과 o(t)가 공개된 후 피드백을 받음
- 목표: 최선의 전문가와 비교한 **후회(regret)** m - m*를 최소화

**WEIGHTED-MAJORITY 알고리즘**:
```
WEIGHTED-MAJORITY(E, T, n, γ)
1  for i = 1 to n
2      w_i(1) = 1                    // 모든 전문가 동일 신뢰
3  for t = 1 to T
4      각 전문가 E_i가 예측 수행
5-8    upweight(t), downweight(t) 계산  // 1/0 예측 가중합
9-11   p(t) = (upweight ≥ downweight ? 1 : 0)
12     결과 o(t) 공개
14-17  틀린 전문가: w_i(t+1) = w_i(t) · (1-γ)
       맞은 전문가: w_i(t+1) = w_i(t)     // 가중치 유지
```

**핵심 분석 (Theorem 33.4)**:
모든 전문가 E_i와 모든 시점 T' ≤ T에 대해:
```
m(T') ≤ (1 + 2γ) · m_i(T') + (2 ln n) / γ
```
- m(T'): 알고리즘의 실수 횟수
- m_i(T'): 전문가 E_i의 실수 횟수
- γ: 가중치 감소 매개변수 (0 < γ ≤ 1/2)

**Corollary 33.5**: 최선의 전문가 m*에 대해:
```
m ≤ (1 + 2γ) · m* + (2 ln n) / γ
```

**완전한 전문가가 있는 특수 경우** (Lemma 33.3):
- n명 중 한 명이 항상 맞으면, 다수결만으로 최대 ⌈lg n⌉번 실수
- 집합 S를 유지하며 실수한 전문가를 제거 → S가 절반씩 줄어듦

**무작위화 개선**: 가중치를 확률 분포로 해석하여 전문가를 무작위 선택하면:
- 기대 실수: (1+ε)m* + (ln n)/ε로 개선 (상수 계수 절반)

**응용 범위**: 게임 이론, 선형 계획법 근사, 다중 상품 흐름, 온라인 기계 학습

## 예시

```
전문가 3명, γ = 1/2

초기 가중치: w = [1, 1, 1]

사건 1: 전문가 예측 [1, 0, 1], 결과 = 1
  upweight = 1+1 = 2, downweight = 1
  예측: 1 (맞음)
  E₂ 틀림 → w = [1, 0.5, 1]

사건 2: 전문가 예측 [0, 1, 0], 결과 = 0
  upweight = 0.5, downweight = 1+1 = 2
  예측: 0 (맞음)
  E₂ 틀림 → w = [1, 0.25, 1]

사건 3: 전문가 예측 [1, 1, 0], 결과 = 0
  upweight = 1+0.25 = 1.25, downweight = 1
  예측: 1 (틀림!)
  E₁, E₂ 틀림 → w = [0.5, 0.125, 1]

→ E₃의 가중치가 가장 높아짐 (가장 정확한 전문가)
```

수치 예시 (Corollary 33.5):
```
T=1000 예측, n=20 전문가, 최선 전문가 50번 실수 (95% 정확)
γ = 1/4 선택:

m ≤ (1 + 0.5) · 50 + (2 ln 20) / 0.25
  = 75 + 8 · ln 20
  ≈ 75 + 24
  = 99 (실수 상한, 약 90% 정확)

γ = 1/2 선택:
m ≤ 2 · 50 + (2 ln 20) / 0.5
  = 100 + 12
  = 112
```

## 관련 개념

- [Online Algorithm](/knowledge/algorithms/online-algorithm/) - 온라인 의사결정 프레임워크
- [Competitive Analysis](/knowledge/algorithms/competitive-analysis/) - 온라인 알고리즘의 성능 분석
- [Gradient Descent](/knowledge/algorithms/gradient-descent/) - 같은 장의 다른 최적화 기법
- [Clustering](/knowledge/algorithms/clustering/) - 같은 장의 비지도 학습 기법
