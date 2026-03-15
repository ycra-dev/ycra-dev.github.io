---
title: "정확 덮개 문제 (Exact Cover Problem)"
description: "주어진 전체 집합 U와 부분집합 컬렉션에서 모든 원소를 정확히 한 번씩 포함하는 부분집합들을 선택하는 문제 — Sudoku·N-Queens를 포괄하는 일반화 모델"
tags: ["Combinatorics", "NP-Complete", "Dancing Links", "Backtracking", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/exact-cover-problem
sidebar:
  order: 16
---

## 핵심 개념

정확 커버 문제(Exact Cover Problem)란 주어진 전체 집합 U와 부분집합의 컬렉션 S가 있을 때, S의 부분집합을 선택하여 U의 모든 원소를 **정확히 한 번씩만** 포함하도록 커버하는 문제다.

많은 조합론적 문제의 일반화된 형태다:
- **Sudoku**: 각 행/열/박스의 숫자를 정확히 커버
- **N-Queens**: 각 행, 열, 대각선을 정확히 커버
- **Latin Square 구성**: 각 행, 열, 값의 조합을 정확히 한 번 커버
- **Langford 쌍 문제**: 각 위치에 숫자를 배치하여 조건을 정확히 커버

## 동작 원리

**Dancing Links 알고리즘 (Algorithm X):**
Knuth가 제안한 효율적 Exact Cover 알고리즘. 원형 이중 연결 리스트를 이용하여 "링크를 춤추게" 함으로써 노드를 O(1)로 효율적으로 추가/삭제한다.

핵심 아이디어:
1. 열을 선택하고 해당 열을 커버하는 행을 골라 선택
2. 선택한 행의 모든 원소와 충돌하는 행들을 제거
3. 재귀적으로 나머지를 해결
4. 역추적 시 O(1)로 링크 복원

**Latin Square transversal 방법으로의 문제 변환 예시:**
- 808개의 transversal을 찾은 후, 이들로 10×10 사각형을 커버하는 문제로 변환
- 직접 탐색 2×10²⁰ mems → transversal 방법 1.7×10⁸ mems (10¹²배 향상)

## 예시

```
전체집합 U = {1, 2, 3, 4, 5, 6, 7}
부분집합: S = {A={1,4,7}, B={1,4}, C={4,5,7}, D={3,5,6}, E={2,3,6,7}, F={2,7}}

해: {B, D, F}
  = {1,4} ∪ {3,5,6} ∪ {2,7}
  = {1,2,3,4,5,6,7} = U (각 원소 정확히 1번)
```

```python
def exact_cover_backtrack(X, Y):
    """
    Exact Cover 역추적 풀이 (Algorithm X)
    X: {원소: [원소를 포함하는 부분집합 인덱스]}
    Y: {부분집합 인덱스: {원소들}}
    """
    if not X:
        yield []
        return

    # 가장 작은 열 선택 (휴리스틱)
    col = min(X, key=lambda c: len(X[c]))

    for row in list(X[col]):
        # 선택한 행의 커버되는 열들 제거
        cols = select(X, Y, row)
        for solution in exact_cover_backtrack(X, Y):
            yield [row] + solution
        # 역추적: 제거된 열들 복원
        deselect(X, Y, row, cols)

def select(X, Y, row):
    """행 row 선택: 관련 열 제거"""
    cols = []
    for j in Y[row]:
        for i in X[j]:
            for k in Y[i]:
                if k != j:
                    X[k].remove(i)
        cols.append(X.pop(j))
    return cols
```

## 관련 개념

- [조합 탐색 (Combinatorial Searching)](/knowledge/algorithms/foundations/combinatorial-searching/)
- [라틴 방진 (Latin Square)](/knowledge/discrete-mathematics/combinatorics/latin-square/)
- [부울 충족 가능성 (Boolean Satisfiability)](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [이중 연결 리스트 (Doubly Linked List)](/knowledge/algorithms/data-structures/doubly-linked-list/)
