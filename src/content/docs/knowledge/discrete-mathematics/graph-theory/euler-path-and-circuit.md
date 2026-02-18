---
title: "Euler Path and Circuit"
description: "그래프 G에서 오일러 회로(Euler circuit)는 G의 모든 간선을 정확히 한 번씩 포함하는 단순 순환이다"
tags: ['Euler Path', 'Euler Circuit', 'Graph Traversal', 'Konigsberg Bridges', 'Multigraph']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/euler-path-and-circuit
sidebar:
  order: 6
---

## 핵심 개념

오일러 경로와 회로 문제는 1736년 레온하르트 오일러가 쾨니히스베르크 다리 문제를 해결하면서 시작된, 그래프 이론의 시초가 된 문제이다.

**쾨니히스베르크 다리 문제**: 프레겔 강의 7개 다리를 각각 정확히 한 번씩 건너서 출발점으로 돌아올 수 있는가? 이 문제를 다중그래프로 모델링하면 4개의 정점 모두 홀수 차수이므로, 오일러 회로가 존재하지 않는다.

**정리 1 (오일러 회로의 필요충분조건)**: 두 개 이상의 정점을 가진 연결 다중그래프에 오일러 회로가 존재할 필요충분조건은 모든 정점의 차수가 짝수인 것이다.

**정리 2 (오일러 경로의 필요충분조건)**: 연결 다중그래프에 오일러 경로가 존재하지만 오일러 회로는 존재하지 않을 필요충분조건은 정확히 두 개의 정점이 홀수 차수인 것이다. 이때 오일러 경로는 이 두 홀수 차수 정점에서 시작하고 끝난다.

**방향 그래프에서의 조건**:
- 오일러 회로 존재: 약연결이고 모든 정점의 진입 차수 = 진출 차수
- 오일러 경로 존재(회로 아님): 약연결이고 하나의 정점은 진출 차수가 진입 차수보다 1 크고, 다른 하나는 진입 차수가 진출 차수보다 1 크며, 나머지 정점은 진입 차수 = 진출 차수

**오일러 회로 구성 알고리즘**: 임의의 정점에서 시작하여 순환을 만들고, 사용하지 않은 간선이 있으면 현재 순환의 정점에서 새로운 부분 순환을 만들어 결합하는 과정을 반복. 시간 복잡도: O(m) (m = 간선 수).

## 예시

```python
# 오일러 회로 존재 여부 판별 (비방향 그래프)
def has_euler_circuit(graph):
    """모든 정점의 차수가 짝수이고 연결 그래프이면 오일러 회로 존재"""
    for vertex in graph:
        if len(graph[vertex]) % 2 != 0:
            return False
    return is_connected(graph)

def has_euler_path(graph):
    """정확히 두 정점이 홀수 차수이면 오일러 경로 존재"""
    odd_degree_count = sum(1 for v in graph if len(graph[v]) % 2 != 0)
    return odd_degree_count == 2 and is_connected(graph)

# 예시 1: K_n에서 오일러 회로
# K_n의 각 정점 차수 = n-1
# n이 홀수이면 모든 차수 짝수 -> 오일러 회로 존재
# n이 짝수이면 모든 차수 홀수 -> 오일러 회로 없음

# 예시 2: C_n (순환 그래프)
# 모든 정점 차수 = 2 (짝수) -> 항상 오일러 회로 존재

# 예시 3: Q_n (n-큐브)
# 각 정점 차수 = n
# n이 짝수이면 오일러 회로 존재
```

오일러 회로 구성 (Algorithm 1):
```
# 그래프: a-b, a-f, b-c, b-d, c-d, c-e, d-e, f-c
# 1단계: 시작 정점 a에서 순환 구성: a, f, c, b, a
# 2단계: 사용하지 않은 간선에서 부분 순환: c, d, e, c
# 3단계: 결합: a, f, c, d, e, c, b, a
# 모든 간선을 정확히 한 번 사용 -> 오일러 회로
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 오일러 경로/회로가 정의되는 구조
- [Connectivity](/knowledge/mathematics/connectivity/) - 연결 그래프에서만 존재
- [Hamilton Path and Circuit](/knowledge/mathematics/hamilton-path-and-circuit/) - 정점 순회 vs 간선 순회
- [Algorithm](/knowledge/algorithms/algorithm/) - O(m) 시간에 구성 가능
