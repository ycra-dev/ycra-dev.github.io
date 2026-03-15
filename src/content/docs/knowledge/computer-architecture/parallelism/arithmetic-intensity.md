---
title: "산술 강도 (Arithmetic Intensity)"
description: "산술 강도(Arithmetic Intensity)는 프로그램이 메인 메모리에서 접근하는 데이터 바이트 수 대비 수행하는 부동소수점 연산 수의 비율이다"
tags: ['Roofline Model', 'Memory Bandwidth', 'Floating Point', 'Performance Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/arithmetic-intensity
sidebar:
  order: 36
---

## 핵심 개념

산술 강도는 프로그램의 연산 특성을 정량적으로 표현하는 지표로, 루프라인 모델에서 핵심적인 역할을 한다. 이 값이 높으면 프로그램이 메모리에서 가져온 데이터에 대해 많은 연산을 수행한다는 의미이며, 이는 연산 제한(compute-bound) 프로그램임을 나타낸다. 반대로 값이 낮으면 메모리 대역폭에 의해 성능이 제한되는 메모리 제한(memory-bound) 프로그램이다. Dense Matrix와 같은 커널은 문제 크기에 따라 산술 강도가 증가하지만, Sparse Matrix와 같은 커널은 문제 크기와 무관하게 산술 강도가 일정하다. 캐시 최적화를 통해 메모리 접근을 줄이면 산술 강도를 높일 수 있다.

## 예시

```
산술 강도 = 총 부동소수점 연산 수 / 총 메모리 접근 바이트 수

예: DAXPY (Y = aX + Y)
- 각 요소당 2개의 부동소수점 연산 (곱셈 + 덧셈)
- 각 요소당 3개의 메모리 접근 (X 읽기, Y 읽기, Y 쓰기) = 24바이트 (8바이트 double * 3)
- 산술 강도 = 2/24 ≈ 0.083 FLOPs/byte (매우 낮음 → 메모리 제한)
```

## 관련 개념

- [루프라인 모델 (Roofline Model)](/knowledge/computer-architecture/roofline-model/)
- [소프트웨어 프리페칭 (Software Prefetching)](/knowledge/computer-architecture/software-prefetching/)
- [캐시 블로킹 (Cache Blocking)](/knowledge/computer-architecture/cache-blocking/)
