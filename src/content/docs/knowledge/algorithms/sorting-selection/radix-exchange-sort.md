---
title: "기수 교환 정렬 (Radix Exchange Sort)"
description: "기수 교환 정렬(Radix Exchange Sort)은 키를 이진 표현으로 보고 최상위 비트부터 차례로 0과 1로 분할하는 정렬로, 퀵정렬과 유사하지만 비트 테스트로 분할한다"
tags: ["Radix Exchange Sort", "Radix Sort", "Exchange Sort", "TAOCP", "Binary", "Internal Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/radix-exchange-sort
sidebar:
  order: 38
---

## 핵심 개념

기수 교환 정렬(Radix Exchange Sort)은 키의 최상위 비트(MSB)부터 차례로 0과 1로 분할하는 정렬 방법이다. 퀵정렬과 유사하지만 키 값 비교 대신 **비트 테스트**로 분할한다.

## 동작 원리

- **기본 원리**: 키의 최상위 비트(MSB)를 검사하여 0인 원소는 왼쪽, 1인 원소는 오른쪽으로 이동. 각 그룹에 대해 다음 비트로 재귀 적용.

- **퀵정렬과의 비교**:
  - 퀵정렬: 임의의 피벗 원소로 분할 (데이터 종속적)
  - 기수 교환: 비트 위치로 분할 (데이터 독립적, 항상 동일한 분할 지점)
  - 퀵정렬은 평균적으로 더 빠르지만, 기수 교환은 균등한 분할 보장

- **성능**: 각 비트 위치마다 전체 배열을 한 번씩 스캔. 키 길이가 b 비트면 최대 b 레벨의 재귀.

- **외부 정렬 적용**: 2-테이프 정렬에서도 사용 가능. 파일을 여러 번 읽는 아이디어를 활용.

- **장점**: 키의 비교가 단순한 비트 연산이므로 일부 하드웨어에서 매우 빠름
- **단점**: 키가 정수가 아닌 경우 적용이 복잡하며, 불균등한 비트 분포 시 성능 저하

## 예시

```
정렬할 수: 170, 045, 075, 090, 002, 024, 802, 066
이진으로 (8비트 표현 가정):
10101010, 00101101, 01001011, 01011010, ...

최상위 비트 = 1인 것: 170, 802
최상위 비트 = 0인 것: 045, 075, 090, 002, 024, 066

[170, 802] 그룹 → 두 번째 비트로 분할
[045, 075, 090, 002, 024, 066] 그룹 → 두 번째 비트로 분할
...재귀적으로 반복
```

## 관련 개념

- [퀵 정렬 (Quicksort)](/knowledge/algorithms/quicksort/)
- [기수 정렬 LSD (Radix Sorting LSD)](/knowledge/algorithms/sorting-selection/radix-sorting-lsd/)
- [기수 탐색 (Radix Search)](/knowledge/algorithms/data-structures/radix-search/)
