---
title: "배처 홀짝 병합 정렬 (Batcher Odd-Even Merge Sort)"
description: "Batcher의 홀짝 병합 정렬은 비교 쌍의 순서가 미리 결정된 교환 기반 정렬로, 병렬 연산에 특히 적합하며 O(log² N) 병렬 단계로 정렬한다"
tags: ["Batcher Odd-Even Merge Sort", "Sorting Networks", "Parallel Sorting", "TAOCP", "Exchange Sort"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/batcher-odd-even-merge-sort
sidebar:
  order: 37
---

## 핵심 개념

Batcher의 홀짝 병합 정렬(Odd-Even Merge Sort)은 1964년 K. E. Batcher가 발견한 교환 기반 정렬 알고리즘으로, 미리 정해진 비교 쌍의 순서에 따라 정렬하며 병렬 연산에 특히 적합하다.

## 동작 원리

Algorithm M(Merge Exchange)으로 정의된 이 방법의 핵심:

- **기본 원리**: 홀수 인덱스 원소들과 짝수 인덱스 원소들을 각각 독립적으로 정렬한 후, 두 정렬된 부분을 병합한다. 비교 쌍이 미리 결정되어 있어 각 비교 결과가 이후 비교에 영향을 주지 않는다.

- **알고리즘 구조 (Algorithm M)**:
  1. `p ← 2^(t-1)` 로 초기화 (2^t ≥ N인 최소 t 사용)
  2. 비트 AND 연산(`i & p = r` 조건)으로 비교할 쌍을 선택
  3. `K[i+1] > K[i+d+1]` 이면 교환
  4. p를 절반으로 줄이며 반복

- **병렬 효율성**: 한 번의 반복(step M3)에서 지정된 모든 비교/교환을 **동시에** 수행 가능. N=1024 원소를 단 **55 병렬 단계**로 정렬.

- **시간 복잡도**: 병렬 실행 시 **O(log² N) 단계**

- **정확성 증명**: 격자 경로(lattice path) 방법으로 증명 가능.

- **비교자 수**: C(n,n) = n lg n + O(n)

## 예시

```
N=16의 경우 (Table 1 패턴):
단계 1: (1,9)(2,10)(3,11)(4,12)(5,13)(6,14)(7,15)(8,16) 동시 비교
단계 2: (1,5)(2,6)(3,7)(4,8)(9,13)(10,14)(11,15)(12,16) 동시 비교
...
최종 단계: 인접 원소들 비교/교환

1024개 원소를 55 병렬 단계로 정렬 가능
```

## 관련 개념

- [정렬 네트워크 (Sorting Networks)](/knowledge/algorithms/sorting-selection/sorting-networks/)
- [Bubble Sort](/knowledge/algorithms/sorting-selection/bubble-sort/)
- [0-1 원리 (Zero-One Principle)](/knowledge/algorithms/sorting-selection/zero-one-principle/)
- [Internal Sorting Summary](/knowledge/algorithms/sorting-selection/internal-sorting-summary/)
