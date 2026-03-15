---
title: "카이제곱 검정 (Chi-Square Test)"
description: "PRNG의 출력이 기대 확률 분포를 따르는지 검증하는 통계적 테스트로, 카이제곱 통계량 V를 계산하여 유의성을 판단한다"
tags: ["Algorithms", "Statistics", "PRNG", "MathematicalAlgorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/chi-square-test
sidebar:
  order: 39
---

## 핵심 개념

카이제곱 테스트(Chi-Square Test)는 의사난수 생성기(PRNG)의 출력이 기대되는 확률 분포를 따르는지 검증하는 통계적 테스트다. n번의 독립 관찰에서 k개 범주에 대한 카이제곱 통계량 V를 계산하여 유의성을 판단한다.

## 동작 원리

**카이제곱 통계량:**
```
V = Σ(Y_s - np_s)² / (np_s)   for s = 1 to k
```
- Y_s: 범주 s에 실제로 관찰된 횟수
- np_s: 범주 s에 기대되는 횟수 (n × 확률)
- k: 범주 수
- ν = k - 1: 자유도(degrees of freedom)

**검정 절차:**
1. n번 관찰하여 Y_s 계산
2. V 통계량 계산
3. 카이제곱 분포표에서 ν = k-1 행의 값과 비교
4. V가 1% 이하거나 99% 이상이면 기각

**중요 주의사항:**
- np_s ≥ 5이어야 카이제곱 근사가 유효하다 (가능하면 훨씬 크게)
- 독립성 가정이 필수이다 (의존적 관찰에는 부적합)
- 너무 낮은 V도 의심스럽다 — 결과가 기대값과 너무 일치하면 조작 의심
- n이 클수록 더 정교한 테스트 (n = 10,000 이상 권장)

**실용적 기준 (Knuth):**
- 3번 이상의 독립 테스트 수행
- 2번 이상 "suspect" 이면 불량으로 판단
- V가 5%~95% 범위면 정상, 1%~5% 또는 95%~99%면 수상

## 예시

```python
import scipy.stats as stats

def chi_square_test(observed, expected):
    """카이제곱 적합도 검정"""
    k = len(observed)

    # V 통계량 계산
    V = sum((obs - exp)**2 / exp
            for obs, exp in zip(observed, expected))

    # 자유도 = k - 1
    df = k - 1

    # p-value 계산 (V 이상이 나올 확률)
    p_value = 1 - stats.chi2.cdf(V, df)

    return V, p_value

# 주사위 테스트 (144번 던지기)
observed = [18, 19, 17, 21, 23, 16]  # 실제 관찰값 (합=114 예시)
expected = [24] * 6  # 144/6 = 24씩 기대
V, p = chi_square_test(observed, expected)
# p < 0.01 또는 p > 0.99이면 기각
```

## 관련 개념

- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [선형 합동법 (Linear Congruential Method)](/knowledge/algorithms/mathematical-algorithms/linear-congruential-method/)
- [스펙트럼 검정 (Spectral Test)](/knowledge/algorithms/mathematical-algorithms/spectral-test/)
- [몬테카를로 방법 (Monte Carlo Method)](/knowledge/algorithms/mathematical-algorithms/monte-carlo-method/)
