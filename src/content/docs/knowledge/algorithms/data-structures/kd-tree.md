---
title: "k-d 트리 (k-d Tree)"
description: "k-d 트리(k-dimensional tree)는 k차원 공간에서 점들을 효율적으로 탐색하기 위한 이진 공간 분할 트리로, 각 레벨에서 하나의 차원을 기준으로 공간을 두 반공간으로 분할한다"
tags: ["k-d Tree", "Multidimensional", "Spatial Searching", "Range Query", "Nearest Neighbor", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/kd-tree
sidebar:
  order: 40
---

## 핵심 개념

k-d 트리(k-dimensional tree)는 k차원 공간에서 점들을 효율적으로 탐색하기 위한 이진 공간 분할 트리로, 각 레벨에서 하나의 차원을 기준으로 공간을 두 반공간으로 분할한다. Jon Louis Bentley(1975)가 고안했다.

**기본 구조:**
- 각 내부 노드는 k차원 점을 하나 저장
- 레벨 d에서는 d mod k번째 차원을 기준으로 분할
- 왼쪽 서브트리: 해당 차원의 값이 현재 노드보다 작은 점들
- 오른쪽 서브트리: 값이 크거나 같은 점들

## 동작 원리

**구축:**
균형잡힌 k-d 트리를 위해 각 레벨에서 중앙값(median)을 루트로 선택. 전체 구축 시간: O(k * N log N)

**범위 탐색 (Range Search):**
주어진 직사각형(또는 초직육면체) 범위 내의 모든 점 검색.
평균 O(N^{1-1/k}) 시간 (N개 균등 분포 점)

**최근접 이웃 탐색 (Nearest Neighbor Search):**
1. 탐색 점 Q와 같은 방향의 서브트리를 먼저 탐색
2. 현재 최근접 거리 d*와 분할 평면 거리를 비교
3. 반대쪽 서브트리도 탐색 가능성이 있으면 재귀 탐색
4. 평균 O(log N), 최악 O(N)

**실용적 한계:**
- 차원이 높아질수록(k≥20) 성능 급락 (차원의 저주, Curse of Dimensionality)
- 균형이 맞지 않으면 최악 성능 O(N)
- 점이 균등 분포가 아니면 분할이 비효율적

**변형:**
- 적응형 k-d 트리: 각 레벨에서 데이터 산포가 최대인 차원 선택
- k-d B-트리: 외부 저장장치에 최적화된 형태

## 예시

```python
# 2-d 트리 예시 (k=2, 좌표 (x, y))
# 점 집합: {(3,6), (17,15), (13,15), (6,12), (9,1), (2,7), (10,19)}

# 구축 (레벨 0: x 기준, 레벨 1: y 기준):
# 중앙값으로 (10,19) 선택 → 루트
#   x < 10: {(3,6), (6,12), (9,1), (2,7)}
#   x >= 10: {(17,15), (13,15)}

# 2-d 트리:
#            (10, 19)  [x-split]
#           /          \
#     (6, 12)        (13, 15)  [y-split]
#    /      \           \
# (3, 6)  (9, 1)     (17, 15)  [x-split]
#    \
#  (2, 7)

def kd_nearest(node, query, depth=0):
    if node is None:
        return None, float('inf')

    k = len(query)
    axis = depth % k
    diff = query[axis] - node.point[axis]

    near = node.left if diff < 0 else node.right
    far = node.right if diff < 0 else node.left

    best, best_dist = kd_nearest(near, query, depth+1)

    dist = euclidean(node.point, query)
    if dist < best_dist:
        best, best_dist = node.point, dist

    if diff**2 < best_dist:
        other, other_dist = kd_nearest(far, query, depth+1)
        if other_dist < best_dist:
            best, best_dist = other, other_dist

    return best, best_dist
```

## 관련 개념

- [다중 속성 검색 (Multiattribute Retrieval)](/knowledge/algorithms/data-structures/multiattribute-retrieval/)
- [트라이 (Trie)](/knowledge/algorithms/data-structures/trie/)
- [B-트리 (B-Tree)](/knowledge/algorithms/data-structures/b-tree/)
- [디지털 탐색 트리 (Digital Search Tree)](/knowledge/algorithms/data-structures/digital-search-tree/)
