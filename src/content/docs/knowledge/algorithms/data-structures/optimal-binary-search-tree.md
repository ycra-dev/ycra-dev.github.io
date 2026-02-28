---
title: "Optimal Binary Search Tree"
description: "최적 이진 탐색 트리(Optimal Binary Search Tree)는 주어진 탐색 확률 분포에서 평균 탐색 비용이 최소가 되도록 구성된 이진 탐색 트리로, 키의 탐색 빈도가 알려진 정적 탐색에서 사용된다"
tags: ["Optimal Binary Search Tree", "Dynamic Programming", "Tree", "Optimization", "Static Searching", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/optimal-binary-search-tree
sidebar:
  order: 32
---

## 핵심 개념

최적 이진 탐색 트리(Optimal Binary Search Tree)는 주어진 탐색 확률 분포에서 평균 탐색 비용(비교 횟수)이 최소가 되도록 구성된 이진 탐색 트리다. 키의 탐색 빈도가 알려진 정적 탐색에서 사용된다.

**비용 모델:**
- p_i: 키 K_i를 탐색할 확률 (i = 1, ..., n)
- q_i: K_i와 K_{i+1} 사이의 미등재 키를 탐색할 확률 (i = 0, ..., n)
- 트리의 비용 = Σ p_i * (level(K_i) + 1) + Σ q_i * level(external_i)

**최적 부분구조(Optimal Substructure):**
최적 트리의 모든 서브트리도 최적이다. 이 성질 덕분에 동적 프로그래밍으로 O(n²) 또는 O(n³)에 해결 가능하다.

## 동작 원리

**Algorithm K (Knuth's O(n²) Algorithm):**
Knuth가 1971년 발견한 단조성(Monotonicity) 성질: 최적 루트 r[i,j]는 단조 증가한다.
- r[i, j-1] ≤ r[i, j] ≤ r[i+1, j]

이를 이용해 O(n³)에서 O(n²)으로 최적화 가능.

**Garsia-Wachs 알고리즘:**
q_i만 존재하는 특수 경우(알파벳 코딩 문제)에 대한 O(n log n) 알고리즘. 가중치를 Fibonacci-Huffman 방식으로 결합하며, 세 단계(Phase 1, 2, 3)로 작동한다.

**Theorem B (Shannon의 정보 엔트로피와의 관계):**
최적 이진 탐색 트리의 비용 C는 다음 부등식을 만족한다:
H(p₁,...,pₙ; q₀,...,qₙ) ≤ C < H(...) + 2
여기서 H는 엔트로피다.

**Theorem M (Mehlhorn):**
더 강한 상한: C ≤ H + 1

**실용적 적용:**
컴파일러의 예약어(reserved word) 탐색에 활용 가능. 예약어는 정적이며 빈도가 알려져 있으므로 최적 트리를 사전 구성하여 파싱 속도를 향상시킨다.

## 예시

```python
# 동적 프로그래밍으로 최적 BST 비용 계산
# c[i][j] = 키 K_{i+1},...,K_j와 miss q_i,...,q_j에 대한 최적 비용
# w[i][j] = p_{i+1} + ... + p_j + q_i + ... + q_j (가중합)
# r[i][j] = 최적 루트의 인덱스

def optimal_bst(p, q, n):
    c = [[0]*(n+1) for _ in range(n+2)]
    w = [[0]*(n+1) for _ in range(n+2)]
    r = [[0]*(n+1) for _ in range(n+2)]

    for i in range(n+1):
        w[i][i] = q[i]

    for l in range(1, n+1):  # 서브트리 크기
        for i in range(n+1-l):
            j = i + l
            w[i][j] = w[i][j-1] + p[j] + q[j]
            c[i][j] = float('inf')
            # r[i][j-1] ≤ root ≤ r[i+1][j] (Knuth의 단조성)
            for root in range(r[i][j-1], r[i+1][j]+1):
                cost = c[i][root-1] + c[root][j] + w[i][j]
                if cost < c[i][j]:
                    c[i][j] = cost
                    r[i][j] = root

    return c[0][n]  # 전체 최적 비용
```

## 관련 개념

- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [AVL Tree](/knowledge/algorithms/data-structures/avl-tree/)
- [Binary Search](/knowledge/algorithms/data-structures/binary-search/)
- [Fibonacci Search](/knowledge/algorithms/data-structures/fibonacci-search/)
