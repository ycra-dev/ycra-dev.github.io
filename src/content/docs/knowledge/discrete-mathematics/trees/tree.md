---
title: "Tree (Graph Theory)"
description: "트리(tree)는 단순 순환(simple circuit)이 없는 연결 비방향 그래프이다"
tags: ['Tree', 'Graph', 'Connected Graph', 'Acyclic Graph', 'Forest', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/tree
sidebar:
  order: 1
---

## 핵심 개념

트리는 그래프 이론에서 가장 기본적이면서도 중요한 구조 중 하나이다. 트리의 핵심 성질은 다음과 같다:

1. **유일 경로 정리**: 비방향 그래프가 트리일 필요충분조건은 임의의 두 정점 사이에 유일한 단순 경로가 존재하는 것이다.
2. **간선 수 정리**: n개의 정점을 가진 트리는 정확히 n-1개의 간선을 가진다 (수학적 귀납법으로 증명).
3. **동치 조건**: n개의 정점을 가진 단순 그래프 G에 대해, (i) G가 연결, (ii) G에 단순 순환이 없음, (iii) G가 n-1개의 간선을 가짐 -- 이 세 조건 중 두 가지가 성립하면 나머지 하나도 성립하며 G는 트리이다.

포레스트(forest)는 단순 순환이 없는 비방향 그래프로, 각 연결 성분이 트리인 그래프이다.

트리는 컴퓨터 과학에서 탐색, 정렬, 코딩, 게임 이론, 네트워크 설계 등 광범위한 분야에 활용된다.

## 예시

```
트리인 그래프 G1:         트리가 아닌 그래프 G3:
  a --- b                   a --- b
  |                         |     |
  c --- d                   c --- d
                                  |
                            e ----+  (순환 e,b,a,d,e 존재)

트리의 간선 수:
- 정점 6개인 트리 → 간선 5개
- 정점 n개인 트리 → 간선 n-1개

포화 탄화수소 CnH(2n+2)의 그래프 모델:
- 탄소 원자: 차수 4인 정점
- 수소 원자: 차수 1인 정점
- 정점 수: 3n+2, 간선 수: 3n+1 → 트리
```

## 관련 개념

- [Rooted Tree](/knowledge/mathematics/rooted-tree/) - 루트가 지정된 트리
- [Graph](/knowledge/mathematics/graph/) - 트리의 상위 개념인 그래프
- [Spanning Tree](/knowledge/mathematics/spanning-tree/) - 그래프의 모든 정점을 포함하는 부분 트리
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 트리 성질 증명에 사용
