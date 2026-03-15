---
title: "경로 압축 (Path Compression)"
description: "경로 압축(Path Compression)은 분리 집합 포리스트에서 FIND-SET 연산 시 탐색 경로(find path)상의 모든 노드가 루트를 직접 가리키도록 만드는 휴리스틱이다"
tags: ['Path Compression', 'Union Find', 'Disjoint Set', 'Heuristic', 'Find Set']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/path-compression
sidebar:
  order: 15
---

## 핵심 개념

**동작 원리**: FIND-SET(x)를 수행할 때:
1. x에서 루트까지 부모 포인터를 따라 올라가며 루트를 찾는다 (첫 번째 패스).
2. 재귀가 되감기면서 경로상의 모든 노드의 부모를 루트로 직접 변경한다 (두 번째 패스).

이것은 **two-pass method**이다: 첫 패스에서 루트를 찾고, 두 번째 패스에서 경로를 평탄화한다.

**핵심 특성**:
- 경로 압축은 랭크(rank)를 변경하지 않는다. 랭크는 높이의 상한(upper bound)으로만 유지된다.
- 경로 압축 후 실제 트리 높이는 줄어들지만, 랭크는 그대로 유지된다.
- 경로 압축 단독 사용 시: n개 MAKE-SET과 f개 FIND-SET의 최악 시간은 Theta(n + f * (1 + log_{2+f/n} n)).

**랭크 기준 합병과의 결합**: 두 휴리스틱을 함께 사용하면 m개 연산에 O(m * alpha(n)) 시간이 든다. 여기서 alpha(n)은 역 아커만 함수로, 모든 실용적 크기에서 4 이하이다.

**분할 상환 분석에서의 역할**: 경로 압축은 노드의 level과 iter 값을 변화시켜 포텐셜을 감소시킨다. FIND-SET에서 탐색 경로의 s개 노드 중 최소 s - (alpha(n) + 2)개의 노드가 포텐셜이 1 이상 감소한다 (보조정리 19.13).

## 예시

```
FIND-SET(x)
  if x != x.p              // x가 루트가 아니면
    x.p = FIND-SET(x.p)    // 부모를 루트로 갱신 (경로 압축)
  return x.p

// 경로 압축 전:
//        a (루트)
//        |
//        b
//        |
//        c
//        |
//        d
//        |
//        e

// FIND-SET(e) 실행 후:
//        a (루트)
//      / | \ \
//     b  c  d  e
// 경로상의 모든 노드(b,c,d,e)가 루트 a를 직접 가리킴

// 비재귀 버전:
FIND-SET-ITERATIVE(x)
  // 1단계: 루트 찾기
  root = x
  while root != root.p
    root = root.p
  // 2단계: 경로상 모든 노드의 부모를 루트로 설정
  while x != root
    next = x.p
    x.p = root
    x = next
  return root
```

## 관련 개념

- [Union Find](/knowledge/algorithms/union-find/)
- [랭크 기반 합치기 (Union by Rank)](/knowledge/algorithms/union-by-rank/)
- [서로소 집합 (Disjoint Set)](/knowledge/algorithms/disjoint-set/)
- [분할 상환 분석 (Amortized Analysis)](/knowledge/algorithms/amortized-analysis/)
