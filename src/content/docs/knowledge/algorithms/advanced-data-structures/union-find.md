---
title: "유니온-파인드 (Union-Find)"
description: "Union-Find는 분리 집합(disjoint set)을 루트 트리의 포리스트(forest)로 표현하는 자료 구조이다"
tags: ['Union Find', 'Disjoint Set', 'Disjoint Set Forest', 'Rooted Tree', 'Inverse Ackermann']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/union-find
sidebar:
  order: 13
---

## 핵심 개념

**기본 구현**:
- MAKE-SET(x): 노드 x를 자신의 부모로 설정 (x.p = x), 랭크 0
- FIND-SET(x): x에서 부모 포인터를 따라 루트까지 올라감 (경로 압축 적용)
- UNION(x, y): FIND-SET으로 두 루트를 찾고, LINK로 합병

**LINK(x, y)**: 랭크가 작은 루트를 큰 루트의 자식으로 만듦. 같으면 임의로 선택하고 부모의 랭크 1 증가.

**랭크 기준 합병만**: O(m lg n) 시간
**경로 압축만**: Theta(n + f * (1 + log_{2+f/n} n)) 시간
**두 휴리스틱 결합**: O(m * alpha(n)) 시간

**alpha(n) (역 아커만 함수)**: 매우 느리게 증가하는 함수.
- A_0(j) = j + 1
- A_1(j) = 2j + 1
- A_2(j) = 2^{j+1} * (j+1) - 1
- A_4(1) >> 10^80 (관측 가능한 우주의 원자 수보다 큼)
- alpha(n) = min{k : A_k(1) >= n}
- 모든 실용적 목적에서 alpha(n) <= 4

**분할 상환 분석 (포텐셜 방법)**:
- 각 노드 x에 포텐셜 phi(x) = alpha(n) * x.rank (루트이거나 rank=0) 또는 (alpha(n) - level(x)) * x.rank - iter(x) (비루트, rank >= 1)
- MAKE-SET: O(1) 분할 상환 비용
- LINK: O(alpha(n)) 분할 상환 비용
- FIND-SET: O(alpha(n)) 분할 상환 비용 (경로 압축에 의해 포텐셜이 감소)

## 예시

```
MAKE-SET(x)
  x.p = x
  x.rank = 0

UNION(x, y)
  LINK(FIND-SET(x), FIND-SET(y))

LINK(x, y)
  if x.rank > y.rank
    y.p = x
  else x.p = y
    if x.rank == y.rank
      y.rank = y.rank + 1

FIND-SET(x)               // 경로 압축 적용
  if x != x.p             // 루트가 아니면
    x.p = FIND-SET(x.p)   // 부모를 루트로 변경 (재귀)
  return x.p

// 예: 8개 원소의 합병 과정
// MAKE-SET: {1},{2},{3},{4},{5},{6},{7},{8}
// UNION(1,2): {1,2} (1이 루트, rank=1)
// UNION(3,4): {3,4} (3이 루트, rank=1)
// UNION(1,3): {1,2,3,4} (1이 루트, rank=2; 3의 부모가 1)
// FIND-SET(4): 4->3->1 이후 경로 압축으로 4.p=1

// m 연산의 총 시간: O(m * alpha(n))
// 실용적으로 alpha(n) <= 4이므로 거의 O(m)
```

## 관련 개념

- [서로소 집합 (Disjoint Set)](/knowledge/algorithms/disjoint-set/)
- [경로 압축 (Path Compression)](/knowledge/algorithms/path-compression/)
- [랭크 기반 합치기 (Union by Rank)](/knowledge/algorithms/union-by-rank/)
- [분할 상환 분석 (Amortized Analysis)](/knowledge/algorithms/amortized-analysis/)
- [퍼텐셜 방법 (Potential Method)](/knowledge/algorithms/potential-method/)
