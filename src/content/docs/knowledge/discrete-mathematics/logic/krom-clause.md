---
title: "Krom Clause"
description: "정확히 2개의 리터럴로 구성된 논리합 절 — Krom 절만으로 이루어진 2-SAT를 함의 그래프와 강한 연결 성분으로 선형 시간에 해결"
tags: ["Logic", "2-SAT", "Linear Time", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/logic/krom-clause
sidebar:
  order: 16
---

## 핵심 개념

Krom 절(Krom Clause)은 정확히 2개의 리터럴로 구성된 논리합 절이다. Krom 절만으로 이루어진 CNF 공식의 충족가능성 문제를 2-SAT라 한다.

**핵심 통찰:** Krom 절 (p ∨ q)는 두 함의로 해석 가능:
- p̄ ⇒ q  (p가 거짓이면 q는 참)
- q̄ ⇒ p  (q가 거짓이면 p는 참)

## 동작 원리

**2-SAT의 선형 시간 해결:**
이 함의 그래프(implication graph)를 구성하고 **강한 연결 성분(SCC)**을 찾으면 선형 시간으로 충족가능성 판별 가능:
- 변수 x와 x̄가 같은 SCC에 있으면 불충족
- 그렇지 않으면 충족 가능 (SCC 위상 정렬로 해 구성)

**Horn 절과 비교:**

| | Horn 절 | Krom 절 |
|---|---------|---------|
| 크기 | 제한 없음 (양의 리터럴 ≤ 1개) | 정확히 2개 |
| 양의 리터럴 | ≤ 1개 | 제한 없음 |
| 복잡도 | O(N) | O(N) |
| 알고리즘 | 순전파 | SCC |

**특수 경우:**
- (x₁ ∨ x₁): x₁과 동치로 Horn 절이기도 함

**2-SAT의 응용:**
- 유향 그래프에서의 2-채색 문제
- 부울 회로 설계 검증
- 스케줄링 제약 조건

## 예시

```
2-SAT 예시:
(x ∨ y) ∧ (x̄ ∨ z) ∧ (ȳ ∨ z̄)

함의 그래프 구성:
(x ∨ y)   → x̄ ⇒ y, ȳ ⇒ x
(x̄ ∨ z)  → x ⇒ z, z̄ ⇒ x̄
(ȳ ∨ z̄)  → y ⇒ z̄, z ⇒ ȳ

SCC 분석:
- x, x̄가 같은 SCC? NO
- y, ȳ가 같은 SCC? NO
→ 충족 가능

SCC 위상 정렬로 해 구성:
x=0, y=1, z=0 또는 x=1, y=0, z=1 등
```

```python
def solve_2sat(n, clauses):
    """2-SAT 풀이: Kosaraju SCC 알고리즘"""
    # 노드: 0..n-1은 양의 변수, n..2n-1은 부정 변수
    graph = [[] for _ in range(2 * n)]
    rgraph = [[] for _ in range(2 * n)]

    for u, v in clauses:
        # Krom 절 (u ∨ v) → 두 함의 추가
        neg_u = u + n if u < n else u - n
        neg_v = v + n if v < n else v - n
        graph[neg_u].append(v)
        graph[neg_v].append(u)
        rgraph[v].append(neg_u)
        rgraph[u].append(neg_v)

    # Kosaraju SCC 찾기
    visited = [False] * (2 * n)
    order = []

    def dfs(v):
        visited[v] = True
        for u in graph[v]:
            if not visited[u]:
                dfs(u)
        order.append(v)

    for v in range(2 * n):
        if not visited[v]:
            dfs(v)

    # SCC 번호 부여
    comp = [-1] * (2 * n)
    c = 0

    def rdfs(v, c):
        comp[v] = c
        for u in rgraph[v]:
            if comp[u] == -1:
                rdfs(u, c)

    for v in reversed(order):
        if comp[v] == -1:
            rdfs(v, c)
            c += 1

    # 충족가능성 확인
    for i in range(n):
        if comp[i] == comp[i + n]:
            return False, []

    # 해 구성: SCC 번호가 큰 쪽이 참
    assignment = [comp[i] > comp[i + n] for i in range(n)]
    return True, assignment
```

## 관련 개념

- [Horn Clause](/knowledge/discrete-mathematics/logic/horn-clause/)
- [Boolean Satisfiability](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [3SAT](/knowledge/discrete-mathematics/logic/3sat/)
- [Depth First Search](/knowledge/algorithms/graph-algorithms/depth-first-search/)
