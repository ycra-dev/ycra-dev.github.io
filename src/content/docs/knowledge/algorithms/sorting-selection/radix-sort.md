---
title: "Radix Sort"
description: "기수 정렬(Radix Sort)은 다중 자릿수를 가진 정수나 문자열을 최하위 자릿수(LSD)부터 최상위 자릿수(MSD) 순으로 안정적인 정렬 알고리즘을 반복 적용하여 정렬하는 비비교 기반 정렬 알고리즘이다"
tags: ['Radix Sort', 'Linear Time Sorting', 'Stable Sort', 'Non Comparison Sort', 'Digit Sort']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/radix-sort
sidebar:
  order: 13
---

## 핵심 개념

기수 정렬은 직관에 반하는 접근법을 사용한다. 최상위 자릿수부터 정렬하면 중간 결과를 별도로 관리해야 하지만, 최하위 자릿수부터 정렬하면 전체를 하나의 덱으로 유지할 수 있다.

```
RADIX-SORT(A, n, d)
1  for i = 1 to d
2      use a stable sort to sort array A[1:n] on digit i
```

**정확성**: 귀납법으로 증명. i번째 반복 후 하위 i개 자릿수에 대해 정렬됨이 보장된다. 안정적 정렬(stable sort)의 사용이 정확성의 핵심이다 -- 같은 자릿수 값을 가진 원소들의 이전 자릿수 기준 순서가 보존되어야 한다.

**시간 복잡도 (Lemma 8.3)**:
- 각 자릿수가 0~k-1 범위이고, 계수 정렬을 서브루틴으로 사용하면
- d번 반복 x 각 Theta(n + k) = **Theta(d(n + k))**
- d가 상수이고 k = O(n)이면 **Theta(n)** 선형 시간

**b비트 정수에 대한 최적화 (Lemma 8.4)**:
- b비트 키를 r비트 자릿수로 나누면: d = ceil(b/r), k = 2^r - 1
- 수행 시간: Theta((b/r)(n + 2^r))
- b < floor(lg n)이면: r = b 선택 -> Theta(n)
- b >= floor(lg n)이면: r = floor(lg n) 선택 -> Theta(bn/lg n) 최적

**퀵정렬과의 비교**:
- b = O(lg n)이면 기수 정렬은 Theta(n)으로 퀵정렬의 Theta(n lg n)보다 빠름
- 그러나 기수 정렬의 각 패스가 더 오래 걸릴 수 있고, 캐시 효율이 낮을 수 있음
- 기수 정렬은 제자리 정렬이 아님 (계수 정렬의 추가 배열 필요)

## 예시

3자리 정수 7개를 기수 정렬:

```
입력:   자릿수1(일의 자리)  자릿수2(십의 자리)  자릿수3(백의 자리)
329     72[0]                3[2]9               [1]70
457     35[5]                4[3]6               [3]29
657     43[6]                8[3]9               [3]55
839     45[7]                3[5]5               [4]36
436     65[7]                4[5]7               [4]57
720     32[9]                6[5]7               [6]57
355     83[9]                7[2]0               [7]20
                                                  [8]39
```

최하위 자릿수부터 정렬 -> 중간 자릿수 정렬 -> 최상위 자릿수 정렬 = 최종 정렬 완료

## 관련 개념

- [Counting Sort](/knowledge/algorithms/counting-sort/)
- [Comparison Sort Lower Bound](/knowledge/algorithms/comparison-sort-lower-bound/)
- [Bucket Sort](/knowledge/algorithms/bucket-sort/)
- [Quicksort](/knowledge/algorithms/quicksort/)
- [Asymptotic Notation](/knowledge/algorithms/asymptotic-notation/)
