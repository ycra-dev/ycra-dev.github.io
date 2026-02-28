---
title: "Zero-One Principle"
description: "영-일 원리(Zero-One Principle, Theorem Z)는 소팅 네트워크가 2ⁿ개의 모든 0-1 수열을 정렬하면 임의의 수열도 정렬함을 보장하는 강력한 정리이다"
tags: ["Zero-One Principle", "Sorting Networks", "Correctness Proof", "TAOCP", "Oblivious Sort", "Theorem"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/zero-one-principle
sidebar:
  order: 41
---

## 핵심 개념

영-일 원리(Zero-One Principle, Theorem Z)는 소팅 네트워크의 정확성을 증명하는 강력한 정리다: **n개 입력 라인을 가진 네트워크가 2ⁿ개의 모든 0-1 수열을 비감소 순서로 정렬한다면, 임의의 n개 숫자 수열도 비감소 순서로 정렬한다.**

## 동작 원리

**Theorem Z** (Bouricius 정리의 특수 경우):
"n개 입력 라인의 네트워크가 2ⁿ개의 모든 0-1 수열을 비감소 순서로 정렬하면, 임의의 n개 숫자로 이루어진 수열도 비감소 순서로 정렬한다."

**증명의 핵심 아이디어**:
단조 함수 f(x): x < y이면 f(x) ≤ f(y)를 이용.

1. 네트워크가 x₁,...,xₙ을 y₁,...,yₙ으로 변환하면, f(x₁),...,f(xₙ)을 f(y₁),...,f(yₙ)으로 변환
2. 만약 yᵢ > yᵢ₊₁인 인덱스 i가 있다면:
   - f(x) = 0 (x < yᵢ일 때), f(x) = 1 (x ≥ yᵢ일 때)로 정의
   - 이 0-1 수열이 정렬되지 않아 가정에 모순
3. 따라서 yᵢ ≤ yᵢ₊₁ for all i

**실용적 의미**:
- n!개의 모든 순열 대신 **2ⁿ개의 0-1 수열만 테스트**하면 충분
- n=10이면 10! ≈ 3.6×10⁶ 대신 2¹⁰ = 1024개만 테스트
- 소팅 네트워크 설계에서 증명 부담을 대폭 줄임

**Batcher의 홀짝 병합 증명에서의 적용**:
- m과 n개 0-1 수열 병합 시, k개 0과 (m-k)개 1, l개 0과 (n-l)개 1의 형태로 단순화
- 병합 후 불일치가 있으면 최대 1개의 비교자가 해결 가능함을 증명

## 예시

```
4원소 네트워크 검증:
2⁴ = 16가지 0-1 수열만 테스트:
0000 → 0000 ✓
0001 → 0001 ✓
0010 → 0001 ✓
...
1111 → 1111 ✓
모든 16가지 통과 → 임의 4원소 정렬 가능 증명 완료

Batcher 홀짝 병합 검증 예 (m=2, n=3):
x = (k개 0, 2-k개 1), y = (l개 0, 3-l개 1)
k=0,1,2, l=0,1,2,3의 12가지 경우만 검사
```

## 관련 개념

- [Sorting Networks](/knowledge/algorithms/sorting-selection/sorting-networks/)
- [Batcher Odd-Even Merge Sort](/knowledge/algorithms/sorting-selection/batcher-odd-even-merge-sort/)
- [Minimum-Comparison Sorting](/knowledge/algorithms/sorting-selection/minimum-comparison-sorting/)
