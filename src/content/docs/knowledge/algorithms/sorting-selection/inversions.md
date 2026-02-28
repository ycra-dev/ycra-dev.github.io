---
title: "Inversions"
description: "순열에서 역위(Inversion)는 i < j이면서 ai > aj인 쌍으로, 정렬 알고리즘 분석에서 '정렬까지의 거리'를 측정하는 핵심 척도이다"
tags: ["Inversions", "Permutations", "Combinatorics", "TAOCP", "Sorting Analysis"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/inversions
sidebar:
  order: 20
---

## 핵심 개념

순열 a1 a2 ... an에서 i < j이면서 ai > aj인 쌍 (ai, aj)를 **역위(inversion)**라고 한다. 역위의 개수는 "정렬에서 얼마나 멀리 떨어져 있는가"를 측정하는 척도이다. 많은 정렬 알고리즘의 실행 시간이 역위의 개수에 정확히 비례한다.

예: 순열 3 1 4 2는 세 개의 역위 (3,1), (3,2), (4,2)를 가진다.

## 동작 원리

**핵심 성질**:
- 인접한 두 원소를 교환하면 역위 수가 정확히 1 증가하거나 감소한다
- n개 원소의 무작위 순열에서 역위의 **평균 개수는 n(n-1)/4**이다
- 역위의 표준 편차는 n^(3/2) 수준이다
- 순열의 역원(inverse permutation)은 원래 순열과 정확히 같은 수의 역위를 가진다 (Rothe의 정리)

**역위표(Inversion Table)**: 순열 a1 a2 ... an의 역위표 b1 b2 ... bn은 bj = j보다 큰 값 중 j의 왼쪽에 있는 원소의 개수로 정의된다. 0 ≤ bj ≤ n-j 조건을 만족하며, 역위표는 순열을 유일하게 결정한다.

**생성 함수**: Gn(z) = (1)(1+z)(1+z+z²)···(1+z+···+z^(n-1))

역위는 행렬식의 정의에도 등장한다:
```
det(A) = Σ (-1)^inv(a1...an) · a1,1 · a2,a2 · ... · an,an
```

**정렬 알고리즘 복잡도와의 관계**:
- 직접 삽입 정렬: 실행 시간 ∝ B (역위 수)
- 버블 정렬: 교환 횟수 = B (총 역위 수), 패스 수 = max(bj)
- 비교 기반 정렬의 하한: Ω(N log N) (역위 수의 기대값에서 유도)

## 예시

```
순열: 5 9 1 8 2 6 4 7 3
역위표: b1=2, b2=3, b3=6, b4=4, b5=0, b6=2, b7=2, b8=1, b9=0
총 역위 수: 2+3+6+4+0+2+2+1+0 = 20

인접 교환으로 정렬 예:
[3, 1, 2] -> [1, 3, 2] (역위: (3,1),(3,2) -> (3,2) : 역위 1 감소)
```

## 관련 개념

- [Sorting Overview](/knowledge/algorithms/sorting-selection/sorting-overview/)
- [Inversion Table](/knowledge/algorithms/sorting-selection/inversion-table/)
- [Straight Insertion Sort](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [Eulerian Numbers](/knowledge/algorithms/sorting-selection/eulerian-numbers/)
- [Permutation Cycles](/knowledge/algorithms/sorting-selection/permutation-cycles/)
