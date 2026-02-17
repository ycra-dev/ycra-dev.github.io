---
title: "Linear Search"
description: "선형 탐색(Linear Search, Sequential Search)은 리스트의 첫 번째 원소부터 마지막 원소까지 순서대로 하나씩 비교하면서 목표 원소를 찾는 가장 기본적인 탐색 알고리즘이다"
tags: ['Linear Search', 'Sequential Search', 'Searching Algorithm', 'Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/linear-search
sidebar:
  order: 2
---

## 핵심 개념

선형 탐색은 정렬되지 않은 리스트에서도 사용할 수 있는 가장 단순한 탐색 방법이다. 리스트의 각 원소를 차례대로 검사하여 찾고자 하는 값과 일치하는지 확인한다.

**동작 원리:**
1. 리스트의 첫 번째 원소와 목표값 x를 비교한다.
2. 일치하면 해당 위치를 반환한다.
3. 일치하지 않으면 다음 원소로 이동하여 비교를 반복한다.
4. 리스트 끝까지 탐색했는데 찾지 못하면 0(또는 실패)을 반환한다.

**시간 복잡도 분석:**
- **최악의 경우(Worst-case)**: 원소가 리스트에 없거나 마지막에 있을 때, 2n + 2번의 비교가 필요하므로 Θ(n)이다.
- **평균적인 경우(Average-case)**: 원소가 리스트에 있고 각 위치에 균등하게 분포한다고 가정하면, 평균 비교 횟수는 (n + 2)로 역시 Θ(n)이다.
- **최선의 경우(Best-case)**: 첫 번째 원소가 목표값일 때, O(1)이다.

선형 탐색은 구현이 매우 간단하지만, 대규모 데이터에서는 비효율적이다. 정렬된 데이터에 대해서는 [[Binary Search]]가 훨씬 효율적이다.

## 예시

의사코드:

```
procedure linear_search(x: integer, a1, a2, ..., an: distinct integers)
  i := 1
  while (i <= n and x != ai)
    i := i + 1
  if i <= n then location := i
  else location := 0
  return location
```

리스트 [1, 3, 4, 5, 6, 8, 9, 11]에서 9를 탐색:
- a1=1 ≠ 9, a2=3 ≠ 9, a3=4 ≠ 9, a4=5 ≠ 9
- a5=6 ≠ 9, a6=8 ≠ 9, a7=9 = 9
- location = 7 반환 (7번의 비교)

리스트에서 7을 탐색:
- a1부터 a8까지 모두 비교해도 일치하는 원소 없음
- location = 0 반환 (8번의 비교)

## 관련 개념

- [Algorithm](/knowledge/mathematics/algorithm/) - 알고리즘의 기본 개념
- [Binary Search](/knowledge/mathematics/binary-search/) - 정렬된 리스트에 대한 더 효율적인 탐색 알고리즘
- [Time Complexity](/knowledge/mathematics/time-complexity/) - 선형 탐색의 시간 복잡도 분석
- [Big-O Notation](/knowledge/mathematics/big-o-notation/) - 복잡도 표현을 위한 표기법
