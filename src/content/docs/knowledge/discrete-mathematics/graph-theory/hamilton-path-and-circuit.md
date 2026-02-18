---
title: "Hamilton Path and Circuit"
description: "그래프 G에서 해밀턴 경로(Hamilton path)는 G의 모든 정점을 정확히 한 번씩 지나는 단순 경로이다"
tags: ['Hamilton Path', 'Hamilton Circuit', 'Np Complete', 'Traveling Salesperson', 'Gray Code']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/hamilton-path-and-circuit
sidebar:
  order: 7
---

## 핵심 개념

해밀턴 경로/회로 문제는 1857년 William Rowan Hamilton이 발명한 "이코시안 퍼즐"에서 유래했다. 정이십면체(dodecahedron)의 정점을 모두 한 번씩 방문하고 돌아오는 문제이다.

오일러 경로/회로와 달리, 해밀턴 경로/회로의 존재에 대한 단순한 필요충분조건은 알려져 있지 않다. 그러나 몇 가지 충분조건은 존재한다:

**디락의 정리(Dirac's Theorem)**: n >= 3인 단순 그래프에서 모든 정점의 차수가 n/2 이상이면 해밀턴 회로가 존재한다.

**오어의 정리(Ore's Theorem)**: n >= 3인 단순 그래프에서 인접하지 않은 모든 정점 쌍 u, v에 대해 deg(u) + deg(v) >= n이면 해밀턴 회로가 존재한다.

이 두 정리는 충분조건일 뿐 필요조건은 아니다. 예를 들어 C_5는 해밀턴 회로를 가지지만 두 정리의 조건을 만족하지 않는다.

**해밀턴 회로가 없는 경우의 판별**:
- 차수 1인 정점이 있으면 해밀턴 회로 불가
- 차수 2인 정점이 있으면 그 정점에 연결된 두 간선 모두 회로에 포함되어야 함
- 회로 내부에 더 작은 순환이 포함될 수 없음

**계산 복잡도**: 해밀턴 회로 존재 판별 문제는 NP-완전이다. 알려진 최선 알고리즘의 최악 시간 복잡도는 지수적이다.

**그레이 코드(Gray Code) 응용**: n-큐브 Q_n에서의 해밀턴 회로는 그레이 코드를 생성한다. 그레이 코드는 인접한 코드워드가 정확히 한 비트만 다른 비트 문자열의 순서로, 디지털 위치 인코딩에서 오류를 최소화하는 데 사용된다.

## 예시

```python
# 해밀턴 회로 탐색 (백트래킹)
def hamilton_circuit(graph, n):
    path = [0]  # 첫 번째 정점에서 시작

    def backtrack(pos):
        if pos == n:
            # 마지막 정점에서 시작 정점으로 돌아갈 수 있는지 확인
            return path[0] in graph[path[-1]]

        for v in range(n):
            if v not in path and v in graph[path[-1]]:
                path.append(v)
                if backtrack(pos + 1):
                    return True
                path.pop()
        return False

    if backtrack(1):
        return path + [path[0]]
    return None

# K_n (n >= 3)은 항상 해밀턴 회로를 가짐
# 예: K_5에서 0 -> 1 -> 2 -> 3 -> 4 -> 0

# 디락의 정리 검증
# K_5: 각 정점 차수 = 4, n/2 = 2.5, 4 >= 2.5 ✓ -> 해밀턴 회로 존재
```

그레이 코드 (Q_3의 해밀턴 회로):
```
# 3비트 그레이 코드: 000 -> 001 -> 011 -> 010 -> 110 -> 111 -> 101 -> 100
# 인접한 코드워드는 정확히 한 비트만 다름
# 이는 Q_3에서의 해밀턴 회로에 해당

gray_code_3 = ['000', '001', '011', '010', '110', '111', '101', '100']

# 검증: 인접 코드워드가 한 비트만 다른지 확인
for i in range(len(gray_code_3)):
    a = gray_code_3[i]
    b = gray_code_3[(i + 1) % len(gray_code_3)]
    diff = sum(1 for x, y in zip(a, b) if x != y)
    assert diff == 1, f"{a} vs {b}: {diff}비트 다름"
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 해밀턴 경로/회로가 정의되는 구조
- [Euler Path and Circuit](/knowledge/mathematics/euler-path-and-circuit/) - 간선 순회(오일러) vs 정점 순회(해밀턴)
- [Traveling Salesperson Problem](/knowledge/mathematics/traveling-salesperson-problem/) - 최소 가중치 해밀턴 회로
- [Big-O Notation](/knowledge/algorithms/big-o-notation/) - NP-완전 문제의 복잡도
- [Algorithm](/knowledge/algorithms/algorithm/) - 백트래킹 알고리즘
