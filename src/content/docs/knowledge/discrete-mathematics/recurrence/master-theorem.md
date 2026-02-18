---
title: "Master Theorem"
description: "마스터 정리(Master Theorem)는 분할 정복 점화식 f(n) = a * f(n/b) + c * n^d 형태의 해의 점근적 크기를 a, b^d의 관계에 따라 세 가지 경우로 분류하여 즉시 판별할 수 있게 하는 정리이다"
tags: ['Master Theorem', 'Divide And Conquer', 'Complexity Analysis', 'Big O', 'Recurrence Relation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/master-theorem
sidebar:
  order: 4
---

## 핵심 개념

f가 증가 함수이고, n = b^k(양의 정수 k)일 때 f(n) = a * f(n/b) + c * n^d를 만족한다고 하자 (a >= 1, b > 1, c > 0, d >= 0). 그러면:

| 조건 | 결과 |
|------|------|
| a < b^d | f(n) = O(n^d) |
| a = b^d | f(n) = O(n^d * log n) |
| a > b^d | f(n) = O(n^{log_b(a)}) |

직관적 이해:
- **a < b^d**: 결합 비용이 지배적이다. 분할이 진행될수록 부분 문제의 총 비용이 줄어들므로, 최상위 레벨의 결합 비용 O(n^d)가 전체를 지배한다.
- **a = b^d**: 각 레벨의 비용이 동일하여, 레벨 수(log_b(n))만큼 곱해진다.
- **a > b^d**: 부분 문제 해결 비용이 지배적이다. 말단 노드의 수인 a^{log_b(n)} = n^{log_b(a)}가 전체를 지배한다.

**특수한 경우 (Theorem 1)**: g(n) = c (상수)일 때 (d=0):
- a = 1이면 f(n) = O(log n)
- a > 1이면 f(n) = O(n^{log_b(a)})
- n = b^k일 때 정확한 공식: f(n) = C_1 * n^{log_b(a)} + C_2

## 예시

**이진 탐색**: f(n) = f(n/2) + 2
```
a=1, b=2, d=0, c=2
a = 1 = b^0 = 1 (a = b^d)
=> f(n) = O(n^0 * log n) = O(log n)
```

**합병 정렬**: M(n) = 2M(n/2) + n
```
a=2, b=2, d=1
a = 2 = 2^1 = b^d (a = b^d)
=> M(n) = O(n^1 * log n) = O(n log n)
```

**고속 정수 곱셈**: f(n) = 3f(n/2) + Cn
```
a=3, b=2, d=1
a = 3 > 2^1 = 2 = b^d (a > b^d)
=> f(n) = O(n^{log_2(3)}) ≈ O(n^{1.585})
```

**스트라센 행렬 곱셈**: f(n) = 7f(n/2) + (15/4)n^2
```
a=7, b=2, d=2
a = 7 > 2^2 = 4 = b^d (a > b^d)
=> f(n) = O(n^{log_2(7)}) ≈ O(n^{2.807})
```

**최대/최소 동시 탐색**: f(n) = 2f(n/2) + 2
```
a=2, b=2, d=0, c=2
a = 2 > 2^0 = 1 = b^d (a > b^d)
=> f(n) = O(n^{log_2(2)}) = O(n)
```

## 관련 개념

- [Divide-and-Conquer Algorithm](/knowledge/mathematics/divide-and-conquer-algorithm/) - 마스터 정리가 분석하는 알고리즘 유형
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - 마스터 정리의 결과가 Big-O로 표현됨
- [Recurrence Relation](/knowledge/mathematics/recurrence-relation/) - 마스터 정리가 해결하는 점화식의 유형
- [Algorithm](/knowledge/algorithms/algorithm/) - 알고리즘 복잡도 분석의 핵심 도구
