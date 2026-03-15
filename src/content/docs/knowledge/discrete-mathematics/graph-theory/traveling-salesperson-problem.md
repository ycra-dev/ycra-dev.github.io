---
title: "외판원 문제 (Traveling Salesperson Problem)"
description: "순회 판매원 문제(Traveling Salesperson Problem, TSP)는 가중 완전 비방향 그래프에서 모든 정점을 정확히 한 번씩 방문하고 출발점으로 돌아오는 최소 총 가중치의 해밀턴 회로를 찾는 문제이다"
tags: ['Tsp', 'Np Complete', 'Hamilton Circuit', 'Optimization', 'Approximation Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/traveling-salesperson-problem
sidebar:
  order: 9
---

## 핵심 개념

TSP는 이론적으로나 실용적으로 가장 중요한 조합 최적화 문제 중 하나이다.

**완전 탐색 접근법**: n개의 정점이 있을 때, 시작점을 고정하면 (n-1)!개의 해밀턴 회로가 가능하다. 회로는 역방향으로도 같으므로 (n-1)!/2개의 회로를 검사해야 한다. n = 25이면 약 3.1 x 10^23개의 회로를 검사해야 하며, 나노초당 하나의 회로를 검사해도 약 천만 년이 걸린다.

**NP-완전 문제**: TSP는 NP-완전(NP-complete)이므로, 다항 시간 알고리즘이 존재하면 많은 다른 난해한 문제도 다항 시간에 풀 수 있다. 현재까지 다항 시간 알고리즘은 알려져 있지 않다.

**근사 알고리즘(Approximation Algorithm)**: 정확한 해를 구하는 대신 근사 해를 구하는 알고리즘이 실용적으로 사용된다:
- 가중 그래프가 삼각 부등식을 만족하면, 최적 해의 3/2배 이내의 해를 다항 시간에 찾는 알고리즘이 존재
- 일반 가중 그래프에서는 임의의 양수 k에 대해 최적 해의 k배 이내의 해를 보장하는 다항 시간 알고리즘은 알려져 있지 않음 (그러한 알고리즘이 존재하면 P = NP)
- 실전에서는 1000개의 정점에 대해 최적 해의 2% 이내의 해를 몇 분 만에 구할 수 있는 알고리즘이 개발되어 있음

**응용 분야**: 물류 배송 경로 최적화, 회로 기판의 드릴 경로 최적화, DNA 시퀀싱, 공장 자동화에서의 로봇 팔 이동 경로 최적화 등.

## 예시

```python
from itertools import permutations

def tsp_brute_force(distances, n):
    """
    distances: n x n 거리 행렬
    모든 해밀턴 회로를 탐색하여 최소 거리 회로를 찾음
    """
    vertices = list(range(1, n))  # 0번 정점 고정 (시작점)
    min_cost = float('inf')
    best_path = None

    for perm in permutations(vertices):
        cost = distances[0][perm[0]]
        for i in range(len(perm) - 1):
            cost += distances[perm[i]][perm[i + 1]]
        cost += distances[perm[-1]][0]  # 출발점으로 복귀

        if cost < min_cost:
            min_cost = cost
            best_path = (0,) + perm + (0,)

    return min_cost, best_path

# 5개 도시 (Detroit, Toledo, Saginaw, Grand Rapids, Kalamazoo)
# 0: Detroit, 1: Toledo, 2: Saginaw, 3: Grand Rapids, 4: Kalamazoo
distances = [
    [0,   113, 98,  137, 133],   # Detroit
    [113, 0,   142, 167, 135],   # Toledo
    [98,  142, 0,   56,  147],   # Saginaw
    [137, 167, 56,  0,   58],    # Grand Rapids
    [133, 135, 147, 58,  0]      # Kalamazoo
]

min_dist, best_route = tsp_brute_force(distances, 5)
print(f"최소 거리: {min_dist}")  # 460
# 최적 경로: Detroit -> Toledo -> Kalamazoo -> Grand Rapids -> Saginaw -> Detroit

# 검사한 회로 수: (5-1)!/2 = 12
```

가능한 회로와 총 거리 비교:
```
Detroit-Toledo-Grand Rapids-Saginaw-Kalamazoo-Detroit: 616
Detroit-Toledo-Kalamazoo-Grand Rapids-Saginaw-Detroit: 460  <-- 최소
Detroit-Toledo-Saginaw-Grand Rapids-Kalamazoo-Detroit: 502
...
```

## 관련 개념

- [Hamilton Path and Circuit](/knowledge/mathematics/hamilton-path-and-circuit/) - TSP는 최소 가중치 해밀턴 회로 문제
- [Graph](/knowledge/mathematics/graph/) - 가중 완전 그래프에서 정의
- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/big-o-notation/) - NP-완전 문제의 복잡도
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 탐욕 알고리즘 및 근사 알고리즘
