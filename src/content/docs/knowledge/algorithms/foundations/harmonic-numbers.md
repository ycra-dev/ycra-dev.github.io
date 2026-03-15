---
title: "조화수 (Harmonic Numbers)"
description: "n번째 조화수 H_n = 1 + 1/2 + 1/3 + ... + 1/n으로, 알고리즘 분석에서 매우 빈번하게 등장하는 수열"
tags: ["Algorithms", "Analysis", "Mathematics", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/harmonic-numbers
sidebar:
  order: 30
---

## 핵심 개념

조화수(Harmonic Numbers) H_n은 1부터 n까지의 역수의 합이다:

```
H_n = 1 + 1/2 + 1/3 + ... + 1/n = Σ_{k=1}^{n} 1/k
```

알고리즘 분석에서 가장 빈번하게 등장하는 수열 중 하나이며, 특히 평균 경우 분석에서 핵심적 역할을 한다. 조화 급수는 발산하지만 매우 느리게 발산한다 — H_n이 100을 초과하려면 n ≈ 10^43이 필요하다.

## 동작 원리

**오일러의 점근 공식**:

```
H_n = ln n + γ + 1/(2n) - 1/(12n²) + O(n⁻⁴)
```

여기서 γ ≈ 0.5772156649... 는 오일러-마스케로니 상수(Euler-Mascheroni constant)다.

**주요 값**:
| n | H_n |
|---|-----|
| 1 | 1.000 |
| 2 | 1.500 |
| 4 | 2.083 |
| 10 | 2.929 |
| 100 | 5.187 |
| 1000 | 7.485 |

**오일러 합산 공식(Euler's Summation Formula)**: 유한 합을 적분으로 근사하고 베르누이 수로 오차를 수정하는 강력한 기법:

```
Σ_{k=1}^{n} f(k) ≈ ∫₁ⁿ f(x)dx + [f(1)+f(n)]/2
                  + Σ B_{2k}/(2k)! × [f^(2k-1)(n) - f^(2k-1)(1)]
```

**알고리즘과의 관계**:
- **퀵소트**: 평균 비교 횟수 ≈ 2n H_n ≈ 2n ln n
- **해시 테이블**: 충돌 관련 분석에 등장
- **치환(Permutation)**: n개 원소 치환의 사이클 수 평균 = H_n
- **유클리드 알고리즘**: 평균 단계 수 ≈ 0.843 × ln n

## 예시

```python
import math

def harmonic_number(n):
    """정확한 조화수 계산"""
    return sum(1/k for k in range(1, n+1))

def harmonic_approx(n):
    """오일러 점근 근사 (빠름)"""
    euler_gamma = 0.5772156649
    return math.log(n) + euler_gamma + 1/(2*n)

# 퀵소트 평균 비교 횟수 추정
def quicksort_avg_comparisons(n):
    return 2 * n * harmonic_number(n)

n = 1000
exact = harmonic_number(n)
approx = harmonic_approx(n)
print(f"H_{n} = {exact:.6f}")
print(f"근사 = {approx:.6f}")
print(f"오차 = {abs(exact - approx):.2e}")

# 퀵소트: n=1000일 때 평균 비교 횟수
print(f"QuickSort 평균 비교: {quicksort_avg_comparisons(1000):.0f}")
# ≈ 14,971회
```

## 관련 개념

- [알고리즘 분석 (Analysis of Algorithms)](/knowledge/algorithms/foundations/analysis-of-algorithms/)
- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/foundations/big-o-notation/)
- [생성 함수 (Generating Functions)](/knowledge/discrete-mathematics/combinatorics/generating-functions/)
