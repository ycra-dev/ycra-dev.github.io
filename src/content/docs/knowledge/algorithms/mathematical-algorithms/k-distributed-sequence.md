---
title: "k-Distributed Sequence"
description: "연속된 k개의 값이 k차원 단위 정육면체에 균일하게 분포되는 수열의 특성으로, PRNG 품질의 이론적 기준을 정의한다"
tags: ["Algorithms", "PRNG", "MathematicalAlgorithms", "Theory", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/k-distributed-sequence
sidebar:
  order: 41
---

## 핵심 개념

k-분포 수열(k-Distributed Sequence)은 연속된 k개의 값 (U_n, U_{n+1}, ..., U_{n+k-1})이 k차원 단위 정육면체에 균일하게 분포됨을 의미한다. 이는 의사난수 생성기의 품질을 이론적으로 정의하는 기준이다.

## 동작 원리

**계층적 정의:**
- **1-분포 (equidistributed)**: 단일 값이 [0,1)에 균일 분포
- **k-분포**: 연속 k개의 값이 k차원에서 균일 분포
- **∞-분포**: 모든 k에 대해 k-분포

**수학적 정의:**
수열이 k-분포이면, 임의의 0 ≤ u_j < v_j ≤ 1에 대해:
```
lim(n→∞) ν(n)/n = (v₁-u₁)(v₂-u₂)···(v_k-u_k)
```
여기서 ν(n)은 조건을 만족하는 인덱스의 수다.

**포함 관계:** k-분포 ⇒ (k-1)-분포 ⇒ ... ⇒ 1-분포

**이산 버전 (b진수 수열):**
수열이 k-분포이면 모든 k자리 b진수가 동일한 빈도로 나타난다:
```
Pr(X_n = x₁, X_{n+1} = x₂, ..., X_{n+k-1} = x_k) = b^{-k}
```

**진정한 무작위성의 역설:**
∞-분포 수열에서는 백만 개의 연속된 0이 나타날 수 있어야 한다. 이는 "진정한 무작위성"의 역설로, **어떤 PRNG도 모든 응용에 완전히 적합할 수 없다**는 결론으로 이어진다.

**충분한 무작위성 (Lehmer의 실용적 정의):** "각 항이 예측 불가능하고, 전통적인 통계 테스트를 통과하는 수열이면 충분"

## 예시

```python
def check_1_distributed(sequence, n_bins=10, tolerance=0.05):
    """1-분포(equidistributed) 검사"""
    from collections import Counter
    n = len(sequence)
    expected = n / n_bins

    bins = Counter(int(x * n_bins) for x in sequence)

    for bin_idx in range(n_bins):
        count = bins.get(bin_idx, 0)
        if abs(count - expected) / expected > tolerance:
            return False
    return True

def check_2_distributed(sequence, n_bins=10, tolerance=0.1):
    """2-분포 검사: (X_n, X_{n+1}) 쌍의 분포"""
    from collections import Counter
    expected = len(sequence) / (n_bins * n_bins)

    pairs = Counter(
        (int(sequence[i] * n_bins), int(sequence[i+1] * n_bins))
        for i in range(len(sequence) - 1)
    )

    for count in pairs.values():
        if abs(count - expected) / expected > tolerance:
            return False
    return True
```

## 관련 개념

- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [Chi-Square Test](/knowledge/algorithms/mathematical-algorithms/chi-square-test/)
- [Spectral Test](/knowledge/algorithms/mathematical-algorithms/spectral-test/)
- [Linear Congruential Method](/knowledge/algorithms/mathematical-algorithms/linear-congruential-method/)
