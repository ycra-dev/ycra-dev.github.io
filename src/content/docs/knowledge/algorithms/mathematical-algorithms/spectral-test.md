---
title: "스펙트럼 검정 (Spectral Test)"
description: "선형 합동 PRNG의 품질을 검증하는 가장 강력한 테스트로, 연속된 t개의 난수가 t차원에서 격자(lattice)를 형성하는 특성을 측정한다"
tags: ["Algorithms", "PRNG", "MathematicalAlgorithms", "Statistics", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/spectral-test
sidebar:
  order: 40
---

## 핵심 개념

스펙트럼 테스트(Spectral Test)는 선형 합동 PRNG의 품질을 검증하는 가장 강력한 테스트다. 연속된 t개의 난수로 구성된 t차원 점들이 격자(lattice)를 형성한다는 선형 합동법의 구조적 특성을 분석하여, 그 품질을 측정한다.

## 동작 원리

**핵심 아이디어 (Marsaglia 현상):**
선형 합동 수열에서 연속된 t개의 점을 t차원 공간에 나타내면 (U_n, U_{n+1}, ..., U_{n+t-1}) — 이 점들은 반드시 평행 초평면(hyperplane) 위에 놓인다. 3차원의 경우 점들이 "평면 위에 머물러 있다(mainly in the planes)"는 현상이 나타난다.

**t차원 정확도 ν_t:**
- ν_t = 평행 초평면들의 간격의 역수
- 값이 클수록 좋음 (점들이 균일하게 분포)
- 이론적 상한: ν_t ≤ m^(1/t) (m = 주기 길이)

**검정 절차:**
1. t = 2부터 6까지의 ν_t 계산
2. 상한 m^(1/t)에 가까울수록 우수한 생성기
3. t = 2, 3, 4에서의 정확도가 가장 중요

**왜 가장 강력한 테스트인가:**
- 경험적 테스트(chi-square 등)와 이론적 테스트의 중간 성격
- 전체 주기의 특성을 분석 (경험적 테스트는 샘플만 검사)
- 지금까지 알려진 불량 생성기는 모두 이 테스트에 실패
- 좋은 생성기는 모두 통과

**선형 합동법의 본질적 한계:** 주기 m인 수열은 t차원에서 최대 m^(1/t)의 정확도를 달성할 수 없다. t가 커질수록 정확도가 낮아지는 것은 선형 합동법의 구조적 한계다.

## 예시

```python
import numpy as np

def spectral_test_2d(a, c, m, n_points=None):
    """
    2차원 스펙트럼 테스트 시각화
    (X_n, X_{n+1}) 쌍의 격자 구조 확인
    """
    if n_points is None:
        n_points = m  # 전체 주기

    points = []
    x = 1
    for _ in range(n_points):
        x_next = (a * x + c) % m
        points.append((x / m, x_next / m))
        x = x_next

    # 좋은 생성기: 2D에서 균일하게 분포
    # 나쁜 생성기: 명확한 직선 패턴
    return np.array(points)

# TAOCP 예시: a=137, c=187, m=256 (나쁜 예)
bad_points = spectral_test_2d(137, 187, 256)
# 결과: 점들이 20개 정도의 평행선 위에 놓임
```

## 관련 개념

- [선형 합동법 (Linear Congruential Method)](/knowledge/algorithms/mathematical-algorithms/linear-congruential-method/)
- [카이제곱 검정 (Chi-Square Test)](/knowledge/algorithms/mathematical-algorithms/chi-square-test/)
- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [Period Length](/knowledge/algorithms/mathematical-algorithms/period-length/)
