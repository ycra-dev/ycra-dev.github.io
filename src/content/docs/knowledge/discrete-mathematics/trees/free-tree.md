---
title: "Free Tree"
description: "방향이나 루트 없이 모든 정점이 연결되고 사이클이 없는 그래프로서의 트리 — 무방향 연결 비순환 그래프"
tags: ["Discrete Mathematics", "Trees", "Graph Theory", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/trees/free-tree
sidebar:
  order: 13
---

## 핵심 개념

자유 트리(Free Tree)는 방향(direction)이나 루트(root)가 지정되지 않은 트리다. 수학적으로는 **연결된(connected) 비순환(acyclic) 무방향 그래프**로 정의된다.

"자유(free)"라는 이름은 루트가 고정되지 않았음을 강조한다. 자유 트리의 임의 정점을 루트로 지정하면 루트 트리(Rooted Tree)가 된다.

## 동작 원리

**자유 트리의 동치 정의** (n개 정점 무방향 그래프 G에 대해 다음은 모두 동치):
1. G는 연결되고 사이클이 없다 (정의)
2. G는 연결되고 정점 수 = 간선 수 + 1 (n개 정점, n-1개 간선)
3. G는 비순환이고 정점 수 = 간선 수 + 1
4. G의 임의 두 정점 사이에 유일한 경로가 존재한다
5. G는 사이클이 없고, 임의 간선을 추가하면 정확히 하나의 사이클이 생긴다
6. G는 연결되어 있고, 임의 간선을 제거하면 두 연결 성분으로 분리된다

**주요 성질**:
- n개 정점, n-1개 간선
- 잎(leaf): 차수(degree)가 1인 정점
- n ≥ 2이면 잎이 최소 2개 존재
- 임의 정점을 루트로 선택하면 유일한 루트 트리가 결정됨

**n개 정점 레이블 트리의 수**: Cayley의 공식 n^{n-2}
- n=1: 1, n=2: 1, n=3: 3, n=4: 16, n=5: 125

**Prüfer 수열**: n개 정점 레이블 트리를 n-2개 숫자의 수열로 유일하게 인코딩하는 방법 (Cayley 공식의 증명에 사용).

**자유 트리 vs 루트 트리**:
| 특성 | 자유 트리 | 루트 트리 |
|------|-----------|-----------|
| 루트 | 없음 | 지정됨 |
| 부모/자식 관계 | 없음 | 정의됨 |
| 계층 구조 | 없음 | 있음 |
| 응용 | 최소 신장 트리, 네트워크 위상 | 알고리즘 분석, 파싱 |

## 예시

5개 정점의 레이블 트리 열거:

```python
def count_labeled_trees(n):
    """Cayley 공식: n개 정점 레이블 트리 수 = n^(n-2)"""
    return n ** (n - 2) if n >= 2 else 1

for n in range(1, 8):
    print(f"n={n}: {count_labeled_trees(n)} 트리")
# n=1: 1, n=2: 1, n=3: 3, n=4: 16, n=5: 125

def prufer_to_tree(sequence):
    """Prüfer 수열을 인접 리스트로 변환 (0-indexed)"""
    n = len(sequence) + 2
    degree = [1] * n
    for v in sequence:
        degree[v] += 1

    edges = []
    for v in sequence:
        for u in range(n):
            if degree[u] == 1:  # 잎 노드 찾기
                edges.append((u, v))
                degree[u] -= 1
                degree[v] -= 1
                break

    # 마지막 간선 추가
    last = [u for u in range(n) if degree[u] == 1]
    edges.append((last[0], last[1]))
    return edges

# 예시: Prüfer 수열 [3, 3, 3, 4] → n=6 트리
edges = prufer_to_tree([3, 3, 3, 4])
print(f"간선들: {edges}")
# 간선들: [(0, 3), (1, 3), (2, 3), (4, 3), (3, 4)]  ← 별 형태
```

최소 신장 트리에서의 자유 트리:

```
Kruskal 알고리즘의 결과는 자유 트리이다:
- n개의 정점을 n-1개의 최소 비용 간선으로 연결
- 사이클 없음, 연결됨 → 자유 트리
```

## 관련 개념

- [Rooted Tree](/knowledge/discrete-mathematics/trees/rooted-tree/)
- [Spanning Tree](/knowledge/discrete-mathematics/trees/spanning-tree/)
- [Minimum Spanning Tree](/knowledge/discrete-mathematics/trees/minimum-spanning-tree/)
- [Graph](/knowledge/algorithms/graph-algorithms/graph/)
