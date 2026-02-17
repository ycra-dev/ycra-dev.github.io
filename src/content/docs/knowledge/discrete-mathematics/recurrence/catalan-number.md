---
title: "Catalan Number"
description: "카탈란 수(Catalan number) C_n은 n+1개의 수의 곱에서 곱셈 순서를 지정하기 위해 괄호를 넣는 방법의 수로, 점화식 C_n = sum_{k=0}^{n-1} C_k * C_{n-k-1}을 만족하며, 닫힌 공식은 C_n = C(2n, n) / (n+1)이다"
tags: ['Catalan Number', 'Recurrence Relation', 'Generating Function', 'Counting', 'Combinatorics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/catalan-number
sidebar:
  order: 7
---

## 핵심 개념

카탈란 수는 조합론에서 가장 빈번하게 등장하는 수열 중 하나로, 놀라울 정도로 다양한 계수 문제의 답이 된다.

**점화식의 유도**: x_0 * x_1 * ... * x_n의 곱에서 마지막으로 수행되는 곱셈이 x_k와 x_{k+1} 사이에 있다면, 왼쪽 부분(x_0...x_k)에 괄호를 넣는 방법은 C_k가지, 오른쪽 부분(x_{k+1}...x_n)에 괄호를 넣는 방법은 C_{n-k-1}가지이다. k를 0부터 n-1까지 합하면:
C_n = sum_{k=0}^{n-1} C_k * C_{n-k-1}, C_0 = 1, C_1 = 1

**닫힌 공식의 유도** (생성함수 이용):
1. G(x) = sum C_n * x^n으로 놓으면
2. 점화식에서 x*G(x)^2 - G(x) + 1 = 0이 됨
3. 이를 풀면 G(x) = (1 - sqrt(1-4x)) / (2x)
4. 확장 이항정리를 적용하면 C_n = C(2n, n) / (n+1)

**점근 공식**: C_n ~ 4^n / (n^{3/2} * sqrt(pi))

**카탈란 수의 다양한 해석**:
- n+1개 수의 곱에 괄호 넣는 방법의 수
- n개의 노드를 가진 이진 트리의 수
- 볼록 n+2각형을 대각선으로 삼각형 분할하는 방법의 수
- 길이 2n의 올바른 괄호 문자열의 수
- n x n 격자에서 대각선 아래를 지나지 않는 경로의 수

## 예시

**작은 값들**:
```
C_0 = 1
C_1 = 1
C_2 = 2
C_3 = 5
C_4 = 14
C_5 = 42
```

**C_3 = 5의 확인**: x_0 * x_1 * x_2 * x_3에 괄호 넣기
```
((x_0 * x_1) * x_2) * x_3
(x_0 * (x_1 * x_2)) * x_3
(x_0 * x_1) * (x_2 * x_3)
x_0 * ((x_1 * x_2) * x_3)
x_0 * (x_1 * (x_2 * x_3))
```

**닫힌 공식 검증**: C_4 = C(8,4) / 5 = 70 / 5 = 14
```
점화식으로도 확인:
C_4 = C_0*C_3 + C_1*C_2 + C_2*C_1 + C_3*C_0
    = 1*5 + 1*2 + 2*1 + 5*1
    = 5 + 2 + 2 + 5 = 14
```

## 관련 개념

- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 카탈란 수는 비선형 점화식으로 정의
- [Generating Function](/knowledge/mathematics/generating-function/) - 닫힌 공식 유도에 생성함수 사용
- [Combination](/knowledge/mathematics/combination/) - 닫힌 공식이 이항 계수로 표현됨
- [Sequence](/knowledge/mathematics/sequence/) - 카탈란 수는 중요한 정수 수열
