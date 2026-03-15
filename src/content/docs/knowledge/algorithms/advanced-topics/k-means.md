---
title: "K-평균 (K-Means)"
description: "K-Means(K-평균)는 데이터 포인트 집합을 k개 클러스터로 분할하여 각 포인트에서 클러스터 중심까지의 거리 제곱 합을 최소화하는 클러스터링 알고리즘으로, Lloyd's 절차로 구현된다"
tags: ['K Means', 'Clustering', 'Lloyd Algorithm', 'Centroid', 'Local Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/k-means
sidebar:
  order: 17
---

## 핵심 개념

**목적함수**:
```
f(S, C) = Σ_{ℓ=1}^{k} Σ_{x∈S^(ℓ)} Δ(x, c^(ℓ))
```

**두 가지 최적성 조건** (필요 조건):

1. **최적 중심 (Theorem 33.1)**: 각 클러스터의 중심은 구성원의 centroid(산술 평균)
   ```
   c^(ℓ) = (1/|S^(ℓ)|) Σ_{x∈S^(ℓ)} x
   ```
   유일한 최적해이며, 이차 볼록 함수의 미분을 0으로 놓아 유도

2. **최적 할당 (Theorem 33.2)**: 각 포인트는 가장 가까운 중심의 클러스터에 속해야 함
   ```
   x ∈ S^(ℓ) ⟺ Δ(x, c^(ℓ)) = min_j Δ(x, c^(j))
   ```

**Lloyd's 알고리즘이 지역 최적인 이유**:
- 두 조건을 교대로 만족시키며 f를 감소
- 각 반복에서 f가 감소하지 않으면 종료
- 전역 최적은 보장하지 않음 → 여러 번 무작위 초기화 후 최선 결과 선택

**기계 학습 프레임워크와의 연결**:
1. 가설 공간: θ = (c^(1), ..., c^(k)) — dk차원 매개변수
2. 손실 함수: f(S, θ) — 가설이 데이터를 얼마나 잘 설명하는가
3. 최적화: Lloyd's 절차 — 지역 최적 θ* 탐색
4. 정규화(regularization): 과적합 방지를 위한 복잡도 페널티 추가 가능

## 예시

```
1차원 포인트 6개: {1, 2, 3, 7, 8, 9}, k = 2

초기 중심: c₁ = 1, c₂ = 9

반복 1:
  할당: S₁ = {1, 2, 3}, S₂ = {7, 8, 9}
  중심 갱신: c₁ = (1+2+3)/3 = 2, c₂ = (7+8+9)/3 = 8
  f = (1+0+1) + (1+0+1) = 4

반복 2:
  할당: 변화 없음 → 종료
  최적 클러스터: {1,2,3}, {7,8,9}, f = 4
```

지역 최적 vs 전역 최적의 예:
```
포인트: {1, 2, 10, 11}, k=2
초기 중심: c₁=1, c₂=2
  → S₁={1}, S₂={2,10,11}
  → c₁=1, c₂=7.67 → f 큼 (지역 최적)

초기 중심: c₁=1, c₂=11
  → S₁={1,2}, S₂={10,11}
  → c₁=1.5, c₂=10.5 → f 작음 (전역 최적)
```

## 관련 개념

- [클러스터링 (Clustering)](/knowledge/algorithms/clustering/) - K-means가 풀어야 하는 문제
- [경사 하강법 (Gradient Descent)](/knowledge/algorithms/gradient-descent/) - 유사한 반복적 최적화 기법
- [NP-완전성 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - K-means 문제 자체는 NP-hard
