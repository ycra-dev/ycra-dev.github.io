---
title: "파스칼 항등식 (Pascal's Identity)"
description: "파스칼 항등식(Pascal's Identity)이란 n과 k가 n >= k인 양의 정수일 때, C(n+1, k) = C(n, k-1) + C(n, k)가 성립한다는 이항계수의 재귀적 관계식이다"
tags: ['Pascals Identity', 'Pascals Triangle', 'Binomial Coefficient', 'Recurrence Relation', 'Combinatorial Proof']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/pascals-identity
sidebar:
  order: 8
---

## 핵심 개념

파스칼 항등식은 이항계수에 대한 가장 중요한 항등식 중 하나이며, **조합적 증명**으로 간결하게 증명할 수 있다:

n+1개의 원소를 가진 집합 T에서 k개의 부분집합을 선택하는 C(n+1, k)가지 방법은, 특정 원소 a를 기준으로 두 가지 경우로 나눌 수 있다:
1. a를 **포함**하는 k개의 부분집합: S = T - {a}에서 (k-1)개를 선택 → C(n, k-1)가지
2. a를 **포함하지 않는** k개의 부분집합: S에서 k개를 선택 → C(n, k)가지

따라서 C(n+1, k) = C(n, k-1) + C(n, k)이다.

이 항등식은 초기 조건 C(n, 0) = C(n, n) = 1과 함께 이항계수를 **재귀적으로 정의**하는 데 사용된다. 이 재귀적 정의는 곱셈 없이 덧셈만으로 이항계수를 계산할 수 있게 해준다.

파스칼 항등식은 **파스칼의 삼각형(Pascal's Triangle)**이라는 기하학적 배열의 기초이다. 삼각형의 n번째 행은 C(n, 0), C(n, 1), ..., C(n, n)으로 구성되며, 인접한 두 수를 더하면 다음 행의 값이 생성된다.

파스칼의 삼각형은 17세기 프랑스 수학자 Blaise Pascal의 이름을 따지만, 실제로는 기원전 2세기 인도의 수학자 Pingala, 11세기 페르시아의 Al-Karaji와 Omar Khayyam, 11세기 중국의 Jia Xian 등이 이미 알고 있었다.

## 예시

**파스칼 삼각형에서의 검증:**
```
행 6: 1  6  15  20  15  6  1
행 7: 1  7  21  35  35  21  7  1

C(7, 5) = C(6, 4) + C(6, 5) = 15 + 6 = 21  ✓
C(7, 3) = C(6, 2) + C(6, 3) = 15 + 20 = 35  ✓
```

**재귀적 계산의 장점:**
곱셈 대신 덧셈만으로 이항계수 계산:
```
C(5, 2) = C(4, 1) + C(4, 2)
        = [C(3, 0) + C(3, 1)] + [C(3, 1) + C(3, 2)]
        = [1 + 3] + [3 + 3]
        = 4 + 6 = 10
```

**동적 프로그래밍으로 구현:**
```python
def pascal_triangle(n):
    """n번째 행까지의 파스칼 삼각형 생성"""
    triangle = [[1]]
    for i in range(1, n + 1):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)
    return triangle

# C(n, k) = triangle[n][k]
```

## 관련 개념

- [Binomial Coefficient](/knowledge/mathematics/binomial-coefficient/) - 파스칼 항등식이 정의하는 대상
- [Binomial Theorem](/knowledge/mathematics/binomial-theorem/) - 파스칼 삼각형의 각 행이 이항 전개의 계수
- [Recursive Definition](/knowledge/mathematics/recursive-definition/) - 이항계수의 재귀적 정의
- [Combination](/knowledge/mathematics/combination/) - C(n, k)의 조합적 의미
