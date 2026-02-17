---
title: "Time Complexity"
description: "시간 복잡도(Time Complexity)는 알고리즘이 특정 크기의 입력에 대해 문제를 해결하는 데 필요한 연산 횟수를 나타낸 것이다"
tags: ['Time Complexity', 'Computational Complexity', 'Worst Case', 'Average Case', 'Algorithm Analysis']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/time-complexity
sidebar:
  order: 9
---

## 핵심 개념

시간 복잡도는 알고리즘의 효율성을 평가하는 핵심 척도이다. 실제 컴퓨터 실행 시간은 하드웨어, 소프트웨어, 구현 방법에 따라 다르지만 상수배 정도의 차이이므로, Big-O나 Big-Theta 표기법을 사용하면 이러한 차이를 무시하고 알고리즘의 본질적 효율성을 비교할 수 있다.

### 분석 유형

**최악의 경우 분석 (Worst-case analysis):**
- 주어진 크기의 입력 중 가장 많은 연산이 필요한 경우를 분석
- 알고리즘이 해를 "보장"하기 위해 필요한 연산의 상한
- 가장 일반적으로 사용되는 분석 방법

**평균적인 경우 분석 (Average-case analysis):**
- 모든 가능한 입력에 대한 평균 연산 횟수
- 보통 최악의 경우 분석보다 복잡한 수학적 분석이 필요
- 실용적 성능을 더 잘 반영할 수 있음

**최선의 경우 분석 (Best-case analysis):**
- 가장 적은 연산이 필요한 경우

### 주요 알고리즘의 시간 복잡도

| 알고리즘 | 최악의 경우 |
|----------|-------------|
| 최대값 찾기 | Θ(n) |
| 선형 탐색 | Θ(n) |
| 이진 탐색 | Θ(log n) |
| 버블 정렬 | Θ(n²) |
| 삽입 정렬 | Θ(n²) |
| 행렬 곱셈(표준) | Θ(n³) |

### 행렬 곱셈 복잡도
두 n×n 행렬의 곱을 구할 때:
- 표준 알고리즘: n³번의 곱셈 + n²(n-1)번의 덧셈 → O(n³)
- 최적화 알고리즘(Strassen 등): O(n^2.807...) 가능

### 실용적 의미
입력 크기 n에 대한 복잡도의 실제 컴퓨터 실행 시간 비교 (10^-11초/비트 연산 기준):
- n=100일 때: log n ≈ 7×10⁻¹¹초, n² = 10⁻⁷초, 2^n ≈ 4×10¹¹년
- 지수 시간 알고리즘은 입력이 조금만 커져도 비현실적으로 오래 걸린다.

## 예시

**선형 탐색의 평균 복잡도 분석:**

x가 리스트에 있고 각 위치에 동일 확률로 있다고 가정하면:
- x = a_i일 때 비교 횟수: 2i + 1

평균 비교 횟수 = (3 + 5 + 7 + ... + (2n+1)) / n
             = (2(1+2+...+n) + n) / n
             = (2·n(n+1)/2 + n) / n
             = n + 2

따라서 평균 복잡도는 Θ(n)이다.

**이진 탐색의 최악 복잡도:**

n = 2^k일 때, 각 단계마다 2번의 비교를 수행하고 리스트 크기가 절반으로 줄어든다:
- 총 비교 횟수: 2k + 2 = 2log(n) + 2
- 따라서 최악의 경우 Θ(log n)

## 관련 개념

- [Big-O Notation](/knowledge/mathematics/big-o-notation/) - 시간 복잡도를 표현하는 표기법
- [Big-Omega and Big-Theta Notation](/knowledge/mathematics/big-omega-and-big-theta-notation/) - 정확한 차수를 표현하는 표기법
- [Algorithm](/knowledge/mathematics/algorithm/) - 분석 대상인 알고리즘
- [Linear Search](/knowledge/mathematics/linear-search/) - Θ(n) 복잡도 사례
- [Binary Search](/knowledge/mathematics/binary-search/) - Θ(log n) 복잡도 사례
- [Sorting Algorithm](/knowledge/mathematics/sorting-algorithm/) - Θ(n²) 복잡도 사례
- [Tractability](/knowledge/mathematics/tractability/) - 시간 복잡도에 기반한 문제 분류
