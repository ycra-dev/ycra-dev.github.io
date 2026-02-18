---
title: "Warshall's Algorithm"
description: "워셜 알고리즘(Warshall's Algorithm)은 관계의 추이적 폐포를 효율적으로 계산하는 알고리즘이다"
tags: ['Warshall', 'Transitive Closure', 'Algorithm', 'Dynamic Programming', 'Graph', 'Boolean Matrix']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/warshall-algorithm
sidebar:
  order: 7
---

## 핵심 개념

**기본 아이디어**: 꼭짓점 v_1, v_2, ..., v_n을 하나씩 "경유 가능한 꼭짓점" 목록에 추가하면서, 새로운 경로가 만들어지는지 확인한다.

**행렬 수열**:
- W_0 = M_R (원래 관계의 행렬)
- W_k[i][j] = 1이면, 내부 꼭짓점이 {v_1, ..., v_k}에만 속하는 v_i에서 v_j로의 경로가 존재
- W_n = M_{R*} (추이적 폐포의 행렬)

**핵심 보조정리(Lemma 2)**: W_k의 (i,j) 항목은 다음으로 계산된다:
```
w_k[i][j] = w_{k-1}[i][j] ∨ (w_{k-1}[i][k] ∧ w_{k-1}[k][j])
```

해석: v_i에서 v_j까지 내부 꼭짓점이 {v_1,...,v_k}에 속하는 경로가 존재하려면:
1. 이미 {v_1,...,v_{k-1}}만 사용하는 경로가 있거나 (w_{k-1}[i][j] = 1)
2. v_k를 경유하는 경로가 있다 (w_{k-1}[i][k] = 1이고 w_{k-1}[k][j] = 1)

**복잡도 비교**:
- 단순 알고리즘(Algorithm 1): 불리언 거듭제곱의 합 -> O(n^4) 비트 연산
- 워셜 알고리즘: 2n^3 비트 연산 -> n배 더 효율적

이 알고리즘은 본질적으로 동적 프로그래밍(dynamic programming) 접근법이며, Floyd-Warshall 최단 경로 알고리즘의 기초가 된다.

## 예시

```python
def warshall(M):
    """워셜 알고리즘으로 추이적 폐포 계산"""
    n = len(M)
    # W를 M의 복사본으로 초기화
    W = [row[:] for row in M]

    for k in range(n):        # 경유 꼭짓점 v_k 추가
        for i in range(n):    # 시작 꼭짓점
            for j in range(n):  # 끝 꼭짓점
                # 기존 경로가 있거나, v_k를 경유하는 경로가 있으면 1
                W[i][j] = W[i][j] or (W[i][k] and W[k][j])

    return W

# 예시: 유향 그래프의 추이적 폐포
# a(0) -> d(3), b(1) -> a(0), b(1) -> c(2),
# c(2) -> a(0), c(2) -> d(3), d(3) -> c(2)
M_R = [
    [0, 0, 0, 1],  # a: a->d
    [1, 0, 1, 0],  # b: b->a, b->c
    [1, 0, 0, 1],  # c: c->a, c->d
    [0, 0, 1, 0],  # d: d->c
]

result = warshall(M_R)
for row in result:
    print(row)
# W_4 (최종 결과):
# [1, 0, 1, 1]  a에서 a,c,d로 경로 존재
# [1, 0, 1, 1]  b에서 a,c,d로 경로 존재
# [1, 0, 1, 1]  c에서 a,c,d로 경로 존재
# [1, 0, 1, 1]  d에서 a,c,d로 경로 존재
```

단계별 추적 (4x4 행렬):
```
W_0 = M_R (초기)
W_1: v_1=a를 경유 가능 -> b->a->d 경로 추가 (b,d)=1
W_2: v_2=b를 경유 가능 -> 새 경로 없음 (b로 들어오는 변 없음)
W_3: v_3=c를 경유 가능 -> d->c->a 경로 추가 (d,a)=1 등
W_4: v_4=d를 경유 가능 -> a->d->c 경로 추가 (a,c)=1 등
```

## 관련 개념

- [Closure of Relations](/knowledge/mathematics/closure-of-relations/) - 추이적 폐포의 정의와 필요성
- [Algorithm](/knowledge/algorithms/algorithm/) - 알고리즘의 정확성 증명과 복잡도 분석
- [Relation Representation](/knowledge/mathematics/relation-representation/) - 영-일 행렬을 사용한 관계 표현
- [Matrix](/knowledge/mathematics/matrix/) - 불리언 행렬 연산의 활용
- [Relation Composition](/knowledge/mathematics/relation-composition/) - R^n 계산 대신 더 효율적인 방법 제공
