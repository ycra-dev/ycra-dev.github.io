---
title: "Divide-and-Conquer Algorithm"
description: "분할 정복 알고리즘(divide-and-conquer algorithm)은 문제를 동일한 유형의 더 작은 겹치지 않는(non-overlapping) 부분 문제들로 재귀적으로 분할하고, 각 부분 문제의 해를 결합하여 원래 문제의 해를 구하는 알고리즘 패러다임이다"
tags: ['Divide And Conquer', 'Algorithm', 'Recurrence Relation', 'Complexity Analysis', 'Recursive Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/divide-and-conquer-algorithm
sidebar:
  order: 3
---

## 핵심 개념

분할 정복 알고리즘의 세 단계:
1. **분할(Divide)**: 크기 n인 문제를 a개의 크기 n/b인 부분 문제로 나눈다.
2. **정복(Conquer)**: 각 부분 문제를 재귀적으로 해결한다 (기저 사례에 도달하면 직접 해결).
3. **결합(Combine)**: 부분 문제들의 해를 합쳐 원래 문제의 해를 구한다. 이 과정에서 g(n)번의 추가 연산이 필요하다.

이 과정에서 복잡도 f(n)은 다음 분할 정복 점화식을 만족한다:
**f(n) = a * f(n/b) + g(n)**

여기서 a >= 1은 부분 문제의 수, b > 1은 분할 비율, g(n)은 결합 단계의 비용이다.

분할 정복은 동적 프로그래밍과 달리 부분 문제가 서로 겹치지 않는다는 것이 핵심 차이점이다. 이 패러다임은 이진 탐색, 합병 정렬, 고속 정수 곱셈, 스트라센 행렬 곱셈, 최근접 점 쌍 문제 등 많은 효율적 알고리즘의 기반이 된다.

## 예시

**이진 탐색 (Binary Search)**:
```
f(n) = f(n/2) + 2
- a=1, b=2 (한 개의 부분 문제, 크기 절반)
- 비교 2회로 탐색 범위를 절반으로 줄임
- 복잡도: O(log n)
```

**합병 정렬 (Merge Sort)**:
```
M(n) = 2M(n/2) + n
- a=2, b=2 (두 개의 부분 문제, 크기 절반)
- n번의 비교로 두 정렬된 리스트를 합병
- 복잡도: O(n log n)
```

**고속 정수 곱셈 (Fast Integer Multiplication)**:
```
f(2n) = 3f(n) + Cn
- 2n비트 정수 곱셈을 n비트 곱셈 3개로 축소
- ab = (2^{2n} + 2^n)A1B1 + 2^n(A1-A0)(B0-B1) + (2^n+1)A0B0
- 복잡도: O(n^{log 3}) ≈ O(n^{1.6}), 기존 O(n^2)보다 효율적
```

**스트라센 행렬 곱셈 (Strassen Matrix Multiplication)**:
```
f(n) = 7f(n/2) + 15n^2/4
- n*n 행렬 곱셈을 (n/2)*(n/2) 행렬 곱셈 7개로 축소
- 복잡도: O(n^{log 7}) ≈ O(n^{2.8}), 기존 O(n^3)보다 효율적
```

## 관련 개념

- [Algorithm](/knowledge/algorithms/algorithm/) - 상위 개념
- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - 분할 정복은 재귀적 알고리즘의 한 유형
- [Master Theorem](/knowledge/mathematics/master-theorem/) - 분할 정복 점화식의 복잡도 분석 도구
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - 분할 정복 알고리즘의 복잡도 표현
- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 분할 정복 알고리즘의 복잡도가 점화식으로 표현됨
- [Dynamic Programming](/knowledge/mathematics/dynamic-programming/) - 부분 문제가 겹치는 경우의 대안적 패러다임
