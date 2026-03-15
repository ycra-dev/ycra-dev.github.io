---
title: "오일러 수 (Eulerian Numbers)"
description: "오일러 수(Eulerian Numbers) <n k>는 {1,...,n}의 순열 중 정확히 k개의 내림(descent)을 가지는 순열의 수로, 정렬 알고리즘의 런 분포 분석에 활용된다"
tags: ["Eulerian Numbers", "Permutations", "Combinatorics", "TAOCP", "Runs", "Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/eulerian-numbers
sidebar:
  order: 23
---

## 핵심 개념

**오일러 수(Eulerian Numbers)** <n k>는 {1, 2, ..., n}의 순열 중 정확히 k개의 내림(descent, aj > aj+1)을 가지는 순열의 수이다. 즉, 정확히 k+1개의 오름 런을 가지는 순열의 수이다. (오일러의 상수 e나 오일러 수 En과는 다른 개념이다.)

Leonhard Euler가 1755년 저서 *Institutiones Calculi Differentialis*에서 논의했다.

## 동작 원리

**점화식**:
```
<n k> = (k+1)<n-1 k> + (n-k)<n-1 k-1>
```
새 원소 n을 기존 순열에 삽입할 때, n을 기존 런 끝에 넣으면 내림 수 유지, 그 외에 넣으면 내림 수 1 증가.

**대칭성**: `<n k> = <n n-1-k>`

**핵심 항등식** (Li Shan-Lan, 1867):
```
m^n = Σ_k <n k> · C(m+k, n)
x^n = Σ_k <n k> · C(x+k, n)
```
이를 통해 거듭제곱을 이항 계수의 선형 결합으로 표현.

**생성 함수**:
```
gn(z) = Σ_k <n k> z^k / n!
```
(k번째 계수: k번의 내림을 가질 확률)

**통계적 성질**:
- n개 원소 무작위 순열의 평균 런 수: **(n+1)/2**
- 런 수의 분산: **(n+1)/12**

**소수 P에 대한 성질**: `<p-1 k> ≡ B_(p-1) (mod p)` (p가 소수일 때)

## 예시

```
n=4의 오일러 수:
  k=0: <4,0> = 1   (1 2 3 4 - 내림 없음)
  k=1: <4,1> = 11  (2 1 3 4, 1 3 2 4, ...)
  k=2: <4,2> = 11
  k=3: <4,3> = 1   (4 3 2 1 - 내림 3개)
  합계: 24 = 4!

항등식 예:
  x^4 = 1·C(x,4) + 11·C(x+1,4) + 11·C(x+2,4) + 1·C(x+3,4)
```

## 관련 개념

- [오름차순 런 (Ascending Runs)](/knowledge/algorithms/sorting-selection/ascending-runs/)
- [역순쌍 (Inversions)](/knowledge/algorithms/sorting-selection/inversions/)
- [순열 순환 (Permutation Cycles)](/knowledge/algorithms/sorting-selection/permutation-cycles/)
- [Sorting Overview](/knowledge/algorithms/sorting-selection/sorting-overview/)
