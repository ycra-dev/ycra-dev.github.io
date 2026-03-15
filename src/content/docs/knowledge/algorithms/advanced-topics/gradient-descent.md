---
title: "경사 하강법 (Gradient Descent)"
description: "경사 하강법(Gradient Descent)은 함수 f: R^n → R의 지역 최솟값을 찾기 위해 현재 위치에서 기울기(gradient)의 반대 방향으로 반복적으로 이동하는 최적화 알고리즘이다"
tags: ['Gradient Descent', 'Optimization', 'Convex Function', 'Machine Learning', 'Step Size']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/gradient-descent
sidebar:
  order: 18
---

## 핵심 개념

**기본 원리**: "언덕에서 가장 가파르게 내려가는 방향으로 조금씩 이동"하는 직관적 방법.

**알고리즘**:
```
GRADIENT-DESCENT(f, x(0), γ, T)
1  sum = 0                          // n차원 벡터
2  for t = 0 to T-1
3      sum = sum + x(t)
4      x(t+1) = x(t) - γ · (∇f)(x(t))  // 기울기 반대 방향으로 이동
5  x-avg = sum / T
6  return x-avg
```

**핵심 요소**:
1. **기울기(Gradient)**: ∇f = (∂f/∂x₁, ..., ∂f/∂xₙ) — 함수값이 가장 빠르게 증가하는 방향
2. **스텝 크기(Step size) γ**: 이동 거리 조절. 너무 크면 발산, 너무 작으면 수렴 느림
3. **초기점 x(0)**: 시작 위치에 따라 다른 지역 최솟값에 수렴 가능

**볼록 함수(Convex function)에서의 수렴 보장** (Theorem 33.8):
- 볼록 함수: f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y) — 모든 지역 최솟값이 전역 최솟값
- γ = R/(L√T)로 설정하면: f(x-avg) - f(x*) ≤ RL/√T
  - R = ∥x(0) - x*∥ (초기점에서 최적해까지 거리)
  - L = max ∥(∇f)(x)∥ (기울기 크기 상한)
- 오차를 절반으로 줄이려면 반복 횟수를 4배로 늘려야 함 (T = R²L²/ε²)

**제약 조건이 있는 경사 하강법(Constrained Gradient Descent)**:
- x가 볼록 집합 K 내에 있어야 하는 경우
- 각 반복에서 기울기 방향으로 이동 후 K로 **투영(projection)**: ΠK(x) = argmin_{z∈K} ∥x - z∥
- 놀랍게도 반복 횟수는 비제약 경우와 크게 다르지 않음

**스텝 크기 결정 — 라인 서치(Line Search)**:
- R과 L을 모르는 경우 이진 탐색으로 적절한 스텝 크기 탐색
- 스텝 크기 s를 두 배씩 늘리며 최적 구간을 찾은 뒤 이진 탐색

**기계 학습에서의 역할**:
- 손실 함수를 최소화하는 모델 파라미터 탐색
- 가설 공간의 매개변수 θ를 반복적으로 갱신

## 예시

```
1차원 볼록 함수: f(x) = x²

∇f(x) = 2x, γ = 0.1, x(0) = 10

반복 0: x(1) = 10 - 0.1 · 20 = 8
반복 1: x(2) = 8 - 0.1 · 16 = 6.4
반복 2: x(3) = 6.4 - 0.1 · 12.8 = 5.12
...
반복 t: x(t) = 10 · 0.8^t → 0 (최솟값 x*=0에 수렴)

2차원 예시: f(x,y) = x² + 4y²
∇f = (2x, 8y)
x(0) = (4, 2), γ = 0.1

반복 0: x(1) = (4 - 0.1·8, 2 - 0.1·16) = (3.2, 0.4)
반복 1: x(2) = (3.2 - 0.1·6.4, 0.4 - 0.1·3.2) = (2.56, 0.08)
→ (0, 0)에 수렴 (전역 최솟값)
```

스텝 크기가 너무 큰 경우:
```
f(x) = x², x(0) = 10, γ = 1.1
x(1) = 10 - 1.1 · 20 = -12  (발산 시작!)
x(2) = -12 - 1.1 · (-24) = 14.4
→ 진동하며 발산
```

## 관련 개념

- [K-평균 (K-Means)](/knowledge/algorithms/k-means/) - Lloyd's 절차도 반복적 최적화
- [선형 계획법 (Linear Programming)](/knowledge/algorithms/linear-programming/) - 선형 목적함수의 최적화
- [Simplex](/knowledge/algorithms/simplex/) - LP에 특화된 최적화 기법
- [승법 가중치 (Multiplicative Weights)](/knowledge/algorithms/multiplicative-weights/) - 같은 장의 다른 최적화 기법
