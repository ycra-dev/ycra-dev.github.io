---
title: "Inversion Table"
description: "역위표(Inversion Table)는 순열을 유일하게 결정하는 표현 방법으로, bj = j보다 큰 원소 중 j의 왼쪽에 있는 원소의 개수로 정의된다"
tags: ["Inversion Table", "Permutations", "Combinatorics", "TAOCP", "Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/inversion-table
sidebar:
  order: 21
---

## 핵심 개념

순열 a1 a2 ... an의 **역위표(Inversion Table)** b1 b2 ... bn은 각 j에 대해 bj = j보다 큰 원소들 중 순열에서 j의 왼쪽에 위치한 원소의 개수로 정의된다. 역위표는 조건 **0 ≤ bj ≤ n-j**를 만족한다.

역위표는 순열을 유일하게 결정하는 매우 중요한 표현 방법이다. 순열에 대한 복잡한 문제를 역위표에 대한 더 쉬운 문제로 변환할 수 있다.

## 동작 원리

**역위표 → 순열 복원 알고리즘**:
n, n-1, ..., 1 순서로 원소를 삽입한다. 원소 k는 이미 배치된 원소들 사이에서 오른쪽으로부터 bk번째 위치에 삽입된다.

**중요성**:
- b1, b2, ..., bn은 서로 독립적으로 선택 가능 (각각 n, n-1, ..., 1가지 선택)
- 따라서 n! = n × (n-1) × ... × 1개의 서로 다른 역위표가 존재 → n! 순열 존재를 자동으로 증명
- 무작위 순열의 역위 개수를 분석할 때 bj들이 독립적이라는 점을 활용

**Lehmer 코드**: 역위표의 개념은 Lehmer 코드 또는 팩토리지얼 수 시스템과 깊이 관련된다. 역위표 b1 b2 ... bn에서 bj는 팩토리지얼 표현의 j번째 자리값(0 ≤ bj < j)이 된다.

**버블 정렬과의 관계 (Theorem I)**:
한 번의 버블 정렬 패스는 역위표의 모든 비-0 항목을 정확히 1씩 감소시킨다.
따라서 **필요한 패스 수 = max(bj)**, **총 교환 수 = Σbj**.

## 예시

```
순열: 5 9 1 8 2 6 4 7 3
역위표:
  b1 = 2  (5, 9가 1의 왼쪽에서 1보다 크다)
  b2 = 3  (5, 9, 8이 2의 왼쪽에서 2보다 크다)
  b3 = 6  (5, 9, 8, 6, 4, 7이 3의 왼쪽에서 3보다 크다)
  b4 = 4  (5, 9, 8, 6이 4의 왼쪽에서 4보다 크다)
  b5 = 0  (5의 왼쪽에 5보다 큰 원소 없음)
  ...

버블 정렬 패스 수 = max(bj) = 6
총 교환 수 = 2+3+6+4+0+... = 20
```

## 관련 개념

- [Inversions](/knowledge/algorithms/sorting-selection/inversions/)
- [Permutation Cycles](/knowledge/algorithms/sorting-selection/permutation-cycles/)
- [Bubble Sort](/knowledge/algorithms/sorting-selection/bubble-sort/)
- [Eulerian Numbers](/knowledge/algorithms/sorting-selection/eulerian-numbers/)
