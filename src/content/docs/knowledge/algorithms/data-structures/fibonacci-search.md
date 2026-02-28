---
title: "Fibonacci Search"
description: "피보나치 탐색(Fibonacci Search)은 정렬된 테이블에서 Fibonacci 수열을 분할점으로 사용하여 탐색하는 알고리즘으로, 곱셈이나 나눗셈 없이 덧셈과 뺄셈만으로 다음 탐색 위치를 결정한다"
tags: ["Fibonacci Search", "Searching", "Fibonacci", "Comparison Based", "Sorted Array", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/fibonacci-search
sidebar:
  order: 30
---

## 핵심 개념

피보나치 탐색(Fibonacci Search)은 정렬된 테이블에서 Fibonacci 수열을 분할점으로 사용하여 탐색하는 알고리즘이다. 곱셈이나 나눗셈 없이 덧셈과 뺄셈만으로 다음 탐색 위치를 결정한다는 것이 특징이다.

**Fibonacci 수열과의 관계:**
F(1) = 1, F(2) = 2, F(k) = F(k-1) + F(k-2)

N = F(k) - 1인 경우 테이블 크기를 완벽하게 커버한다.

## 동작 원리

1. 현재 Fibonacci 수 F(k)와 F(k-1)을 이용하여 분할점 결정
2. 분할점 i = F(k-1)에서 비교
3. K < K[i]: 좌측 F(k-1)-1 크기의 부분 탐색
4. K > K[i]: 우측 F(k-2)-1 크기의 부분 탐색
5. 다음 단계에서 k를 1 감소

**이진 탐색과의 비교:**
- 비교 횟수: 이진 탐색과 거의 동일한 O(log N)
- 장점: 곱셈/나눗셈 불필요 → 덧셈만으로 구현 가능 (하드웨어 비용 감소)
- 단점: 좌우 분할이 비대칭 (예: N=12에서 8:3으로 분할)

**실용적 의미:**
1960년대 하드웨어에서는 나눗셈이 매우 느렸으므로, 피보나치 탐색이 실용적 이점이 있었다. 현대 컴퓨터에서는 이진 탐색과 실질적인 성능 차이가 없다.

## 예시

```
Fibonacci 탐색 (N=12, F(6)=13 > 12 이므로 k=6 시작)
Fibonacci 수: F(1)=1, F(2)=2, F(3)=3, F(4)=5, F(5)=8, F(6)=13

피보나치 트리 (F(5)=8, F(4)=5):
            5
         /     \
        3       7
       / \     / \
      2   4   6   8
     /           \
    1              (범위 초과 처리)

탐색 단계 예시 (K를 7 찾기, N=12):
1. i=8 비교, K=7 < K[8]: 좌측 F(4)-1=4개 탐색
2. i=5 비교, K=7 > K[5]: 우측 F(3)-1=2개 탐색
3. i=7 비교, K=7 = K[7]: 탐색 성공 (3번 비교)
```

## 관련 개념

- [Binary Search](/knowledge/algorithms/data-structures/binary-search/)
- [Sequential Search](/knowledge/algorithms/data-structures/sequential-search/)
- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [AVL Tree](/knowledge/algorithms/data-structures/avl-tree/)
