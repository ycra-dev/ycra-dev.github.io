---
title: "클러스터링 (Clustering)"
description: "클러스터링(Clustering)은 n개의 데이터 포인트를 k개의 그룹(클러스터)으로 분할하여 같은 클러스터 내의 포인트들이 서로 유사하도록 하는 비지도 학습(unsupervised learning) 문제이다"
tags: ['Clustering', 'Unsupervised Learning', 'Machine Learning', 'Data Analysis', 'Grouping']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/clustering
sidebar:
  order: 16
---

## 핵심 개념

**문제 설정**:
- 입력: n개의 d차원 특성 벡터(feature vector) x = (x_1, ..., x_d)와 정수 k
- 비유사도(dissimilarity): 유클리드 거리의 제곱
  ```
  Δ(x, y) = Σ_{a=1}^{d} (x_a - y_a)²
  ```
- 목적함수: 각 포인트에서 가장 가까운 중심까지의 거리 제곱의 합 f(S, C) 최소화

**k-평균 문제(k-means problem)**: NP-hard이므로 지역 최적해를 찾는다.

**Lloyd's 절차** (k-means 알고리즘):
1. **초기화**: k개의 중심을 무작위로 선택
2. **할당**: 각 포인트를 가장 가까운 중심의 클러스터에 배정 (nearest-center rule)
3. **중지 검사**: 할당이 변하지 않으면 종료
4. **중심 갱신**: 각 클러스터의 중심을 구성원의 중심(centroid, 평균)으로 갱신
5. 2단계로 돌아감

**수렴 보장**:
- 각 반복에서 f(S, C)가 엄격히 감소 (마지막 반복 제외)
- 가능한 k-클러스터링 수가 유한(최대 k^n)이므로 반드시 종료
- 지역 최적만 보장, 전역 최적은 미보장

**시간 복잡도**: O(T · d · k · n), T = 반복 횟수

**데이터 전처리**:
- 속성 스케일링/정규화 (최소-최대, 평균 0/단위 분산)
- 결측치 처리

**응용**: 벡터 양자화(사진 압축), 별 분류, 음성 인식, 시장 세분화

## 예시

```
미국 48개 주도 + DC를 k=4 클러스터로 분류:
d = 2 (위도, 경도)

Lloyd's 절차:
1. 초기 중심: 아칸소, 캔자스, 루이지애나, 테네시
2. 각 주도를 가장 가까운 중심에 할당
3. 중심을 클러스터 평균으로 갱신
4. 11번 반복 후 수렴 → 동부/서부/남부/북부 클러스터

벡터 양자화 (사진 압축):
- 24비트 RGB → k색으로 압축
- 각 픽셀 = 3차원 포인트 (R, G, B)
- k=256: 8비트로 압축 (3배 압축)
```

Theorem 33.1: 클러스터의 중심은 반드시 **centroid**(평균)여야 최적:
```
c^(ℓ)_a = (1/|S^(ℓ)|) Σ_{x∈S^(ℓ)} x_a
```

## 관련 개념

- [K-평균 (K-Means)](/knowledge/algorithms/k-means/) - 구체적인 k-means 알고리즘
- [경사 하강법 (Gradient Descent)](/knowledge/algorithms/gradient-descent/) - 기계 학습의 다른 최적화 기법
- [승법 가중치 (Multiplicative Weights)](/knowledge/algorithms/multiplicative-weights/) - 전문가 예측 문제
- [NP-완전성 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - k-means 문제가 NP-hard
