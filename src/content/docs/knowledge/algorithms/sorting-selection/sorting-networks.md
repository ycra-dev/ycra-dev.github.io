---
title: "Sorting Networks"
description: "소팅 네트워크(Sorting Network)는 비교 순서가 입력 값에 무관하게 미리 결정된(oblivious) 정렬 회로로, 각 비교자는 두 입력을 받아 작은 값은 왼쪽, 큰 값은 오른쪽으로 출력한다"
tags: ["Sorting Networks", "Parallel Sorting", "Comparator", "Oblivious Sort", "TAOCP", "Network"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/sorting-networks
sidebar:
  order: 40
---

## 핵심 개념

소팅 네트워크(Sorting Network)는 비교자 모듈(comparator module)의 고정된 연결망으로, 비교 순서가 입력 값에 무관하게 미리 결정(oblivious)된 정렬 회로다. 각 비교자는 두 입력을 받아 작은 값은 왼쪽, 큰 값은 오른쪽으로 출력한다.

## 동작 원리

**소팅 네트워크의 기본 특성**:

- **망각적 비교(Oblivious Comparison)**: 비교 결과를 기억할 필요 없음. Ki와 Kj를 비교할 때, 이후 비교는 Ki < Kj인 경우와 Ki > Kj인 경우에서 i와 j만 바꿔서 동일.

- **비교자 모듈**: 두 입력 라인을 연결하는 수직 선분으로 표현. 위쪽 라인이 더 큰 값을 받으면 교환 발생.

- **Ŝ(n)**: n원소 소팅 네트워크에 필요한 최소 비교자 수
  - n ≤ 10에서 알려진 정확한 값
  - n = 16: Ŝ(16) ≤ 60 (Green's network, 1969)
  - 점근적: Ŝ(n) = O(n log n) (Ajtai-Komlós-Szemerédi, 1983)

- **최솟값 지연 시간 네트워크**: 병렬 비교가 가능한 환경에서 지연 시간 최소화. Batcher의 홀짝 병합은 ½ lg n × (lg n + 1) 지연 단계 사용.

- **AKS 네트워크**: 이론적으로 O(n log n) 비교자이나 상수가 너무 커서 실용적이지 않음.

## 예시

```
4원소 소팅 네트워크:
라인: 1, 2, 3, 4
비교자들: [1:3], [2:4], [1:2], [3:4], [2:3]
(5개 비교자로 4원소 정렬 가능, S(4) = Ŝ(4) = 5)

입력: 4, 1, 3, 2
[1:3]: 3, 1, 4, 2  (라인 1과 3 비교, 큰 것이 라인 3로)
[2:4]: 3, 1, 4, 2  (라인 2와 4는 이미 순서 맞음)
[1:2]: 1, 3, 4, 2
[3:4]: 1, 3, 2, 4
[2:3]: 1, 2, 3, 4  ← 정렬 완료

N=1024: 단 55 병렬 단계로 정렬 (Batcher)
```

## 관련 개념

- [Zero-One Principle](/knowledge/algorithms/sorting-selection/zero-one-principle/)
- [Batcher Odd-Even Merge Sort](/knowledge/algorithms/sorting-selection/batcher-odd-even-merge-sort/)
- [Minimum-Comparison Sorting](/knowledge/algorithms/sorting-selection/minimum-comparison-sorting/)
