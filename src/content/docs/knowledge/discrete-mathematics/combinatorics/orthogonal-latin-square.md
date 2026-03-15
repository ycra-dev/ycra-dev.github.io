---
title: "직교 라틴 방진 (Orthogonal Latin Square)"
description: "두 라틴 방진을 겹쳤을 때 n² 가지 쌍이 모두 서로 다른 그레코-라틴 방진 — Euler의 추측을 Bose-Shrikhande-Parker가 반박하며 수학사를 바꾼 사례"
tags: ["Combinatorics", "Latin Square", "Graeco-Latin", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/orthogonal-latin-square
sidebar:
  order: 18
---

## 핵심 개념

두 n×n 라틴 방진 L₁, L₂가 서로 직교(orthogonal)하다는 것은, 이 둘을 겹쳤을 때 생성되는 n² 개의 쌍 (L₁[i][j], L₂[i][j])이 모두 서로 다른 n² 가지 조합을 이룰 때를 말한다. 이러한 쌍을 그레코-라틴 방진(Graeco-Latin Square)이라 부른다.

## 동작 원리

**Euler의 추측과 반박:**
1779년 Euler는 6×6 그레코-라틴 방진이 존재하지 않으며, n mod 4 = 2인 경우(n=6, 10, 14, ...) 모두 불가능하다고 추측했다.
- Tarry(1901): n=6 경우 실제로 불가능함을 컴퓨터 없이 증명
- Bose, Shrikhande, Parker(1959-1960): **n>6인 모든 n에 대해** 직교 라틴 방진 쌍이 존재함을 증명 → Euler의 추측 거의 전부 반박

**계산적 관점:**
- n=6 직교 짝 탐색 (Paige-Tompkins, 1957, SWAC): 4.8×10¹¹ 시간 추정
- Parker(1960, UNIVAC): transversal 분해 후 Exact Cover로 → 1시간 이내 해결
- 핵심 통찰: "T₁·T₂(곱)의 탐색을 T₁+T₂(합)의 탐색으로 인수분해"

## 예시

```
4×4 예시 (숫자 L₁과 그리스 문자 L₂):

L₁:  0 1 2 3    L₂: a b c d    겹침:
     1 0 3 2         d c b a    0a 1b 2c 3d
     2 3 0 1         b a d c    1d 0c 3b 2a
     3 2 1 0         c d a b    2b 3a 0d 1c
                                3c 2d 1a 0b

모든 16가지 쌍 (0a, 0b, ..., 3d)이 정확히 한 번 → 직교 라틴 방진
```

```python
def build_ols(n):
    """
    n이 소수인 경우 직교 라틴 방진 쌍 구성
    L1[i][j] = (i + j) % n
    L2[i][j] = (i + 2j) % n (n이 소수이면 직교)
    """
    L1 = [[(i + j) % n for j in range(n)] for i in range(n)]
    L2 = [[(i + 2*j) % n for j in range(n)] for i in range(n)]
    return L1, L2

def verify_orthogonality(L1, L2):
    """두 라틴 방진의 직교성 검증"""
    n = len(L1)
    pairs = set()
    for i in range(n):
        for j in range(n):
            pair = (L1[i][j], L2[i][j])
            if pair in pairs:
                return False
            pairs.add(pair)
    return len(pairs) == n * n  # n² 가지 쌍 모두 등장

# n=5 (소수): 직교 라틴 방진 쌍 생성
L1, L2 = build_ols(5)
print(verify_orthogonality(L1, L2))  # True
```

## 관련 개념

- [라틴 방진 (Latin Square)](/knowledge/discrete-mathematics/combinatorics/latin-square/)
- [정확 덮개 문제 (Exact Cover Problem)](/knowledge/discrete-mathematics/combinatorics/exact-cover-problem/)
- [조합 탐색 (Combinatorial Searching)](/knowledge/algorithms/foundations/combinatorial-searching/)
- [그래프 동형 (Graph Isomorphism)](/knowledge/algorithms/graph-algorithms/graph-isomorphism/)
