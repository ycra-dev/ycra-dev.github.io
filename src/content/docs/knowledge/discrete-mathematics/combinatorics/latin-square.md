---
title: "라틴 방진 (Latin Square)"
description: "n×n 격자에 n가지 기호를 배치하되 각 행과 열에 모든 기호가 정확히 한 번씩 나타나는 배열 — 실험 설계와 오류 정정 코드의 수학적 기반"
tags: ["Combinatorics", "Latin Square", "Design of Experiments", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/latin-square
sidebar:
  order: 17
---

## 핵심 개념

라틴 방진(Latin Square)은 n×n 격자에 n가지 기호를 배치하되, 각 행과 각 열에 모든 기호가 정확히 한 번씩만 나타나는 배열이다.

역사적 배경: 1779년 Euler가 "36명의 장교 문제"를 연구하면서 깊이 탐구했다. n×n 라틴 방진 전체의 수를 세는 것은 여전히 어려운 미해결 문제다.

## 동작 원리

**라틴 방진의 속성:**
- 행/열에서 각 기호가 정확히 한 번 등장
- 두 라틴 방진 L₁, L₂가 **직교(orthogonal)**하다: 겹쳤을 때 모든 (기호₁, 기호₂) 쌍이 정확히 한 번씩 나타남

**응용:**
- 실험 설계(Design of Experiments): 여러 변수를 동시에 변화시킬 때 교란 효과 제거
- 오류 정정 코드
- 완전 균형 블록 설계

**알고리즘적 흥미:**
- n≤5: 빠르게 열거 가능
- n=6: 직교 라틴 방진 쌍이 존재하지 않음 (Tarry, 1901년 완전 탐색으로 증명, 오일러의 36명 장교 문제)
- n≥7: 직교 라틴 방진 쌍 항상 존재 (Bose, Shrikhande, Parker, 1959-1960)

**Transversal:**
라틴 방진에서 각 행, 각 열, 각 값이 정확히 한 번씩 나타나는 n개 원소의 선택. 직교 짝은 서로 겹치지 않는 n개의 transversal로 구성된다.

## 예시

```
4×4 라틴 방진 (Ozanam의 카드 게임 문제):
A♣  K♠  Q◇  J♥
Q♥  J◇  A♠  K♣
J◇  A♥  K♣  Q♠
K♦  Q♣  J♥  A◇

각 행과 열에 A, K, Q, J가 정확히 한 번
각 행과 열에 ♣,♠,◇,♥도 정확히 한 번 등장
→ 이는 실제로 4×4 직교 라틴 방진 쌍
```

```python
def is_latin_square(grid):
    """n×n 배열이 라틴 방진인지 확인"""
    n = len(grid)
    symbols = set(range(n))
    # 각 행 확인
    for row in grid:
        if set(row) != symbols:
            return False
    # 각 열 확인
    for col in range(n):
        if {grid[row][col] for row in range(n)} != symbols:
            return False
    return True

def generate_latin_square(n):
    """간단한 n×n 라틴 방진 생성 (순환 방식)"""
    return [[(i + j) % n for j in range(n)] for i in range(n)]

def are_orthogonal(L1, L2):
    """두 라틴 방진이 직교하는지 확인"""
    n = len(L1)
    pairs = set()
    for i in range(n):
        for j in range(n):
            pair = (L1[i][j], L2[i][j])
            if pair in pairs:
                return False
            pairs.add(pair)
    return True

# n=3 순환 라틴 방진과 직교 쌍 생성
L1 = generate_latin_square(3)
L2 = [[(2*i + j) % 3 for j in range(3)] for i in range(3)]
print(are_orthogonal(L1, L2))  # True이면 직교
```

## 관련 개념

- [직교 라틴 방진 (Orthogonal Latin Square)](/knowledge/discrete-mathematics/combinatorics/orthogonal-latin-square/)
- [정확 덮개 문제 (Exact Cover Problem)](/knowledge/discrete-mathematics/combinatorics/exact-cover-problem/)
- [조합 탐색 (Combinatorial Searching)](/knowledge/algorithms/foundations/combinatorial-searching/)
- [그래프 동형 (Graph Isomorphism)](/knowledge/algorithms/graph-algorithms/graph-isomorphism/)
