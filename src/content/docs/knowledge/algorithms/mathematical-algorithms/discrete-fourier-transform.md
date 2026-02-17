---
title: "Discrete Fourier Transform"
description: "이산 푸리에 변환(Discrete Fourier Transform, DFT)은 계수 벡터 a = (a_0, a_1, "
tags: ['Discrete Fourier Transform', 'Dft', 'Signal Processing', 'Complex Numbers', 'Frequency Domain']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/discrete-fourier-transform
sidebar:
  order: 12
---

## 핵심 개념

**정의**:
```
y_k = A(ω_n^k) = Σ_{j=0}^{n-1} a_j · ω_n^{jk}   (k = 0, 1, ..., n-1)
```
여기서 ω_n = e^{2πi/n}은 주요 n차 단위근이다.

**행렬 형태**:
```
y = V_n · a
```
V_n은 반데르몬드 행렬(Vandermonde matrix):
```
V_n[j,k] = ω_n^{jk}
```

**역 DFT**:
```
a_j = (1/n) Σ_{k=0}^{n-1} y_k · ω_n^{-jk}   (j = 0, 1, ..., n-1)
```
역 DFT는 ω_n을 ω_n^{-1}로 대체하고 결과를 1/n으로 나누면 된다.

**복소수 n차 단위근의 성질**:
- ω_n = e^{2πi/n} = cos(2π/n) + i·sin(2π/n)
- n개의 단위근: ω_n^0 = 1, ω_n^1, ..., ω_n^{n-1}
- 단위원 위에 등간격으로 배치
- 곱셈군(ℤ_n, +)과 동형

**DFT의 의미**:
- 시간 영역(time domain) → 주파수 영역(frequency domain) 변환
- 신호를 위상 이동된 다양한 주파수의 사인파 가중합으로 표현
- 나눗셈 정리에 의해 n개의 점-값 쌍은 차수 한계 n인 다항식을 유일하게 결정

**직접 계산**: Θ(n²) — FFT를 사용하면 Θ(n lg n)으로 가속

## 예시

n = 4인 DFT 계산:
```
ω_4 = e^{2πi/4} = i

a = (a_0, a_1, a_2, a_3)에 대해:
y_0 = a_0 + a_1 + a_2 + a_3
y_1 = a_0 + a_1·i + a_2·i² + a_3·i³
    = a_0 + a_1·i - a_2 - a_3·i
y_2 = a_0 + a_1·i² + a_2·i⁴ + a_3·i⁶
    = a_0 - a_1 + a_2 - a_3
y_3 = a_0 - a_1·i - a_2 + a_3·i
```

컨볼루션(convolution)과의 관계:
```
c = a ⊗ b   (다항식 곱셈 = 계수 벡터의 컨볼루션)
DFT(c) = DFT(a) · DFT(b)   (점별 곱셈)
c = DFT^{-1}(DFT(a) · DFT(b))
```

## 관련 개념

- [Fast Fourier Transform](/knowledge/algorithms/fast-fourier-transform/) - DFT를 효율적으로 계산하는 알고리즘
- [Polynomial Multiplication](/knowledge/algorithms/polynomial-multiplication/) - DFT/역 DFT를 통한 다항식 곱셈
