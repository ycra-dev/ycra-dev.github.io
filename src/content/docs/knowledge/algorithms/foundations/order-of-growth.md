---
title: "증가 차수 (Order of Growth)"
description: "증가 차수(Order of Growth)는 입력 크기가 증가할 때 알고리즘 수행 시간의 증가율을 나타내며, 최고 차항만을 고려하고 상수 계수와 하위 차항을 무시한다"
tags: ['Order Of Growth', 'Asymptotic Efficiency', 'Complexity Hierarchy']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/order-of-growth
sidebar:
  order: 7
---

## 핵심 개념

수행 시간 분석 시 중요한 함수 증가율 계층:

**다항식 < 지수**: 모든 실수 상수 a > 1, b에 대해 n^b = o(a^n)
**다대수 < 다항식**: 모든 실수 상수 a > 0에 대해 lg^k(n) = o(n^a)

일반적 증가율 계층 (느린 → 빠른):
1 < lg lg n < lg n < lg² n < √n < n < n lg n < n² < n³ < 2^n < n! < n^n

**표준 수학 함수:**
- **바닥/천장 함수**: ⌊x⌋, ⌈x⌉
- **모듈러 산술**: a mod n = a - n⌊a/n⌋
- **팩토리얼**: 스털링 근사 n! ≈ √(2πn)(n/e)^n
- **반복 로그**: lg* n — 매우 느리게 증가 (실용적으로 5를 넘지 않음)
- **피보나치 수**: F_i = ⌊ϕ^i/√5 + 1/2⌋ (지수적 증가)
  - 황금비 ϕ = (1+√5)/2 ≈ 1.618

로그 밑의 변환은 상수 인수만 변경하므로 점근적 표기법에서는 중요하지 않다. 따라서 lg n은 밑을 명시하지 않고 사용한다.

## 예시

```
일반적 알고리즘 복잡도 비교:

  O(1)        상수 시간     해시 테이블 조회
  O(lg n)     로그 시간     이진 탐색
  O(n)        선형 시간     선형 탐색
  O(n lg n)   선형 로그     병합 정렬
  O(n²)       이차 시간     삽입 정렬 (최악)
  O(n³)       삼차 시간     행렬 곱셈 (나이브)
  O(2^n)      지수 시간     부분집합 열거
  O(n!)       팩토리얼      순열 열거

n = 1,000,000 일 때:
  lg n ≈ 20
  n lg n ≈ 20,000,000
  n² = 1,000,000,000,000
  → n lg n과 n²의 차이는 50,000배
```

## 관련 개념

- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/)
- [최악의 경우 분석 (Worst-Case Analysis)](/knowledge/algorithms/worst-case-analysis/)
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/)
