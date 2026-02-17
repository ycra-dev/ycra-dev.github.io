---
title: "Algorithm"
description: "알고리즘(Algorithm)은 계산을 수행하거나 문제를 해결하기 위한 정확한 명령들의 유한 순서열이다"
tags: ['Algorithm', 'Computation', 'Pseudocode', 'Procedure', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/algorithm
sidebar:
  order: 1
---

## 핵심 개념

알고리즘이라는 용어는 9세기 수학자 al-Khowarizmi의 이름에서 유래했다. 알고리즘이 갖추어야 할 핵심 속성은 다음과 같다:

1. **입력(Input)**: 지정된 집합에서 입력값을 받는다.
2. **출력(Output)**: 각 입력에 대해 결과값을 생성한다.
3. **명확성(Definiteness)**: 각 단계가 정확하게 정의되어야 한다.
4. **정확성(Correctness)**: 올바른 출력을 생성해야 한다.
5. **유한성(Finiteness)**: 유한한 단계 내에 종료되어야 한다.
6. **효과성(Effectiveness)**: 각 단계를 유한한 시간 내에 정확히 수행할 수 있어야 한다.
7. **일반성(Generality)**: 특정 입력이 아닌, 원하는 형태의 모든 문제에 적용 가능해야 한다.

알고리즘은 자연어, 의사코드(pseudocode), 프로그래밍 언어 등 다양한 방식으로 기술할 수 있다. 의사코드는 자연어와 프로그래밍 언어 사이의 중간 단계로서, 특정 프로그래밍 언어에 종속되지 않으면서도 정확하게 알고리즘을 표현할 수 있다.

## 예시

유한 수열에서 최대 원소를 찾는 알고리즘 (의사코드):

```
procedure max(a1, a2, ..., an: integers)
  max := a1
  for i := 2 to n
    if max < ai then max := ai
  return max
```

예를 들어, 수열 8, 4, 11, 3, 10에 대해:
- max = 8 (초기값)
- 4 <= 8 이므로 변경 없음
- 8 < 11 이므로 max = 11
- 3 <= 11 이므로 변경 없음
- 10 <= 11 이므로 변경 없음
- 결과: max = 11

이 알고리즘은 정확히 n-1번의 비교를 수행하며, 모든 7가지 속성을 만족한다.

## 관련 개념

- [Linear Search](/knowledge/mathematics/linear-search/) - 탐색 알고리즘의 기본 형태
- [Binary Search](/knowledge/mathematics/binary-search/) - 효율적인 탐색 알고리즘
- [Sorting Algorithm](/knowledge/mathematics/sorting-algorithm/) - 정렬 알고리즘
- [Greedy Algorithm](/knowledge/mathematics/greedy-algorithm/) - 알고리즘 패러다임의 한 종류
- [Time Complexity](/knowledge/mathematics/time-complexity/) - 알고리즘의 효율성 분석
- [Halting Problem](/knowledge/mathematics/halting-problem/) - 알고리즘으로 풀 수 없는 문제
