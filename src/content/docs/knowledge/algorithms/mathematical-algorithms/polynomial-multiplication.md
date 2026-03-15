---
title: "다항식 곱셈 (Polynomial Multiplication)"
description: "다항식 곱셈은 두 다항식 A(x)와 B(x)의 곱 C(x) = A(x)·B(x)를 계산하는 문제로, FFT를 사용하면 Θ(n lg n) 시간에 수행할 수 있다 (기존 Θ(n²) 대비 획기적 개선)"
tags: ['Polynomial Multiplication', 'Convolution', 'Fft', 'Coefficient Representation', 'Point Value Representation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/polynomial-multiplication
sidebar:
  order: 14
---

## 핵심 개념

**두 가지 다항식 표현**:

1. **계수 표현(Coefficient representation)**: a = (a_0, a_1, ..., a_{n-1})
   - 덧셈: Θ(n)
   - 곱셈: Θ(n²) (직접 계산)
   - 평가(Horner's rule): Θ(n)

2. **점-값 표현(Point-value representation)**: {(x_0, y_0), ..., (x_{n-1}, y_{n-1})}
   - 덧셈: Θ(n)
   - 곱셈: Θ(n) (점별 곱셈!)
   - 유일성 정리: n개의 서로 다른 점이 차수 한계 n인 다항식을 유일하게 결정

**FFT 기반 곱셈 절차** (Theorem 30.2):
```
1. 차수 한계 확장: n → 2n (제로 패딩)         [Θ(n)]
2. 평가: FFT로 계수 → 점-값 변환              [Θ(n lg n)]
3. 점별 곱셈: C(ω_k) = A(ω_k) · B(ω_k)      [Θ(n)]
4. 보간: 역 FFT로 점-값 → 계수 변환           [Θ(n lg n)]
총 시간: Θ(n lg n)
```

**컨볼루션(Convolution)**: 다항식 곱셈의 계수 벡터 c = a ⊗ b
```
c_j = Σ_{k=0}^{j} a_k · b_{j-k}
```

**보간(Interpolation)**:
- 라그랑주 공식: Θ(n²)
- 역 DFT: Θ(n lg n) (단위근을 평가점으로 사용 시)

## 예시

직접 곱셈 vs FFT:
```
A(x) = 6x³ + 7x² - 10x + 9  (차수 한계 4)
B(x) = -2x³ + 4x - 5         (차수 한계 4)

직접 곱셈: Θ(16) 연산
  C(x) = -12x⁶ - 14x⁵ + ... (계수 하나하나 계산)

FFT 기반:
1. 차수 한계 8로 확장
2. FFT로 8개 단위근에서 A, B 평가     [O(8·3)]
3. 점별 곱셈                           [O(8)]
4. 역 FFT로 계수 복원                  [O(8·3)]
총: O(8·3) = O(n lg n)
```

Cartesian sum 응용:
```
집합 A, B의 각 원소를 다항식 계수로 인코딩:
  P_A(x) = Σ_{a∈A} x^a,  P_B(x) = Σ_{b∈B} x^b
  P_A(x) · P_B(x)의 계수 → A + B의 원소별 출현 횟수
시간: O(n lg n)
```

## 관련 개념

- [고속 푸리에 변환 (Fast Fourier Transform)](/knowledge/algorithms/fast-fourier-transform/) - 다항식 곱셈의 핵심 도구
- [이산 푸리에 변환 (Discrete Fourier Transform)](/knowledge/algorithms/discrete-fourier-transform/) - 계수 ↔ 점-값 변환
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/) - FFT의 분할 정복 구조
