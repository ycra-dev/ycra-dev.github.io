---
title: "버블 정렬 (Bubble Sort)"
description: "버블 정렬(Bubble Sort)은 인접한 두 원소를 반복적으로 비교·교환하는 정렬로, Knuth는 '실용적 측면에서 거의 장점이 없는 알고리즘'이라고 평가한다"
tags: ["Bubble Sort", "Exchange Sort", "Sorting", "TAOCP", "Algorithm Analysis"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/bubble-sort
sidebar:
  order: 36
---

## 핵심 개념

버블 정렬(Bubble Sort)은 인접한 두 원소를 반복적으로 비교하여 순서가 맞지 않으면 교환하는 교환 기반 정렬 알고리즘이다. 큰 원소가 배열의 오른쪽 끝으로 "거품처럼 떠오르는" 방식으로 동작한다.

TAOCP에서 Knuth는 버블 정렬이 **실용적 측면에서 거의 장점이 없는 알고리즘**이라고 비판한다: "버블 정렬에는 추천할 만한 것이 없다."

## 동작 원리

Algorithm B로 정의된 버블 정렬의 핵심 특성:

- **알고리즘 동작**: `BOUND` 변수를 유지하며 마지막으로 교환이 발생한 위치를 추적. 그 이후의 원소들은 이미 최종 위치에 있으므로 다음 패스에서 제외한다.

- **역위 테이블 분석 (Theorem I)**: 각 패스 후 역위 테이블(inversion table)의 모든 비-0 항목이 1씩 감소한다.
  - 따라서 **필요한 패스 수 = max(역위 테이블 항목의 최대값)**

- **성능 분석**:
  - 패스 수 A 평균: ≈ √(πN/2)
  - 교환 횟수 B 평균: N(N-1)/4
  - 비교 횟수 C 평균: ≈ (N² - N·ln N)/2
  - MIX 실행 시간: 평균 5.75N² + O(N log N)

- **직선 삽입과 비교**: 버블 정렬은 더 복잡한 프로그램을 요구하면서 같은 결과를 내는데 **두 배 이상의 시간**이 소요된다.

- **칵테일 셰이커 정렬(Cocktail-shaker sort)**: 양방향 교대 패스로 약간 개선되나 본질적 한계를 극복하지 못한다.

## 예시

```
초기: 5 3 8 1 4
패스 1: 3 5 1 4 8   (8이 맨 끝으로 이동)
패스 2: 3 1 4 5 8   (5가 4번째 위치로)
패스 3: 1 3 4 5 8   (3이 2번째 위치로)
패스 4: 1 3 4 5 8   (교환 없음 → 종료)

역위 테이블 관점:
입력 역위 테이블의 모든 비-0 항목이 매 패스마다 1씩 감소하므로,
최대 필요 패스 수 = max(역위 테이블 항목의 최대값)
```

## 관련 개념

- [배처 홀짝 병합 정렬 (Batcher Odd-Even Merge Sort)](/knowledge/algorithms/sorting-selection/batcher-odd-even-merge-sort/)
- [역순 테이블 (Inversion Table)](/knowledge/algorithms/sorting-selection/inversion-table/)
- [역순쌍 (Inversions)](/knowledge/algorithms/sorting-selection/inversions/)
- [정렬 알고리즘 (Sorting Algorithm)](/knowledge/algorithms/sorting-algorithm/)
