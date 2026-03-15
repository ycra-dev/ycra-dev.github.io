---
title: "고속 푸리에 변환 (Fast Fourier Transform)"
description: "고속 푸리에 변환(Fast Fourier Transform, FFT)은 이산 푸리에 변환(DFT)과 그 역변환을 O(n lg n) 시간에 계산하는 분할 정복 알고리즘으로, 복소수 단위근(roots of unity)의 특수한 성질을 활용한다"
tags: ['Fast Fourier Transform', 'Fft', 'Signal Processing', 'Divide And Conquer', 'Roots Of Unity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/fast-fourier-transform
sidebar:
  order: 13
---

## 핵심 개념

**핵심 아이디어**: 다항식을 짝수 인덱스와 홀수 인덱스 계수로 분할:
```
A(x) = A_even(x²) + x · A_odd(x²)
```

**분할 정복 구조** (n은 2의 거듭제곱):
1. 계수 벡터를 짝수/홀수로 분할 → 크기 n/2인 두 부분 문제
2. 재귀적으로 n/2차 DFT 두 번 계산
3. 결과를 O(n) 시간에 합성 (butterfly 연산)

**시간 복잡도**: T(n) = 2T(n/2) + Θ(n) = Θ(n lg n)

**복소수 단위근의 핵심 성질**:
- **소거 보조정리**: ω_{dn}^{dk} = ω_n^k
- **반분 보조정리**: n차 단위근을 제곱하면 n/2차 단위근
- **합산 보조정리**: 1이 아닌 단위근의 합 = 0

**다항식 곱셈에의 응용** (Theorem 30.2):
```
입력: 계수 표현의 두 다항식 A(x), B(x) (차수 한계 n)
1. 차수 한계를 2n으로 확장 (제로 패딩)
2. 평가: FFT로 두 다항식의 점-값 표현 계산     [Θ(n lg n)]
3. 점별 곱셈: C(ω_k) = A(ω_k) · B(ω_k)        [Θ(n)]
4. 보간: 역 FFT로 계수 표현 복원               [Θ(n lg n)]
총 시간: Θ(n lg n)  (기존 Θ(n²) 대비 획기적 개선)
```

**응용 분야**: MP3 오디오 압축, 디지털 비디오 압축, 신호 처리, 대수 정수 곱셈

## 예시

FFT의 재귀적 구현:
```
RECURSIVE-FFT(a)
1  n = a.length
2  if n == 1
3      return a
4  ω_n = e^{2πi/n}   // 주요 n차 단위근
5  ω = 1
6  a_even = (a_0, a_2, ..., a_{n-2})
7  a_odd  = (a_1, a_3, ..., a_{n-1})
8  y_even = RECURSIVE-FFT(a_even)
9  y_odd  = RECURSIVE-FFT(a_odd)
10 for k = 0 to n/2 - 1
11     y_k       = y_even_k + ω · y_odd_k    // butterfly
12     y_{k+n/2} = y_even_k - ω · y_odd_k
13     ω = ω · ω_n
14 return y
```

## 관련 개념

- [이산 푸리에 변환 (Discrete Fourier Transform)](/knowledge/algorithms/discrete-fourier-transform/) - FFT가 계산하는 변환
- [다항식 곱셈 (Polynomial Multiplication)](/knowledge/algorithms/polynomial-multiplication/) - FFT의 핵심 응용
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/) - FFT의 알고리즘 패러다임
