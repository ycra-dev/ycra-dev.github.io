---
title: "기수 정렬 LSD (Radix Sorting LSD)"
description: "기수 정렬(Radix Sorting, LSD)은 키를 자릿수별로 최하위 자릿수(LSD)부터 안정적으로 분류하는 비비교(non-comparison) 정렬로, O(mN) 시간에 정렬하여 N log N 하한을 피한다"
tags: ["Radix Sorting", "LSD", "Distribution Sort", "Non-comparison", "TAOCP", "Hollerith", "Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/radix-sorting-lsd
sidebar:
  order: 55
---

## 핵심 개념

기수 정렬(Radix Sorting, LSD - Least Significant Digit first)은 키를 자릿수(digit)별로 분류하는 비비교(non-comparison) 정렬 방법이다. 1의 자리부터 가장 높은 자리 순으로 반복하여 안정적(stable)으로 정렬한다. Hollerith 천공 카드 기계에서 유래했다.

**왜 LSD가 MSD보다 효율적인가**: MSD부터 정렬하면 각 자리마다 재귀적 분할 필요 (복잡). LSD는 안정적 정렬을 반복하기만 하면 됨. 비자명한 발견: 익명의 카드 기계 조작원이 처음 발견, 1936년 IBM 매뉴얼에 첫 등장.

## 동작 원리

**Algorithm R** (기수 정렬, b진법 m자리 키):
```
for i = 1 to m:
    배열을 i번째 자릿수의 분포에 따라 분배
    (분배 계수를 이용한 안정적 분배)
```

**분배 계수(Distribution Counting)**:
- 각 자릿수 값의 빈도를 세어 목표 위치 결정
- O(N + b) 시간, O(N + b) 공간 (b = 기수)
- 안정적이지만 2N 레코드 공간 필요

**성능**:
- 시간: **O(m·(N + b)) = O(mN)** (b가 상수일 때)
- 공간: O(N + b)
- 비교 없음 → **N log N 하한을 피함!**

**적용 조건**:
- 키가 짧거나 고정 길이 (m이 작을 때)
- 정수 키 또는 기수로 분해 가능한 키
- **소규모 N에는 부적합** (오버헤드가 큼)

## 예시

```
3자리 10진수 키 정렬: 170, 045, 075, 090, 002, 024, 802, 066

1의 자리로 분배:
  0: 170, 090
  2: 002, 802
  4: 024
  5: 045, 075
  6: 066
순서: 170 090 002 802 024 045 075 066

10의 자리로 분배 (안정적 유지):
  0: 002, 802
  2: 024
  4: 045
  6: 066
  7: 170, 075
  9: 090
순서: 002 802 024 045 066 170 075 090

100의 자리로 분배:
  0: 002, 024, 045, 066, 075, 090
  1: 170
  8: 802
최종: 002 024 045 066 075 090 170 802 ✓
```

## 관련 개념

- [기수 교환 정렬 (Radix Exchange Sort)](/knowledge/algorithms/sorting-selection/radix-exchange-sort/)
- [정렬 알고리즘의 역사 (Sorting Algorithm History)](/knowledge/algorithms/sorting-selection/sorting-algorithm-history/)
- [기수 정렬 (Radix Sort)](/knowledge/algorithms/radix-sort/)
- [안정 정렬 (Stable Sorting)](/knowledge/algorithms/sorting-selection/stable-sorting/)
