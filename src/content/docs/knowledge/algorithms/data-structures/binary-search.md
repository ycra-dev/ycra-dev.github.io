---
title: "이진 탐색 (Binary Search)"
description: "이진 탐색(Binary Search)은 정렬된 테이블에서 탐색 범위를 절반씩 줄여 나가며 목표 키를 찾는 알고리즘으로, O(log N)의 시간 복잡도를 갖는다"
tags: ["Binary Search", "Searching", "Divide And Conquer", "Sorted Array", "Comparison Based", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/binary-search
sidebar:
  order: 29
---

## 핵심 개념

이진 탐색(Binary Search)은 정렬된 테이블에서 탐색 범위를 절반씩 줄여 나가며 목표 키를 찾는 알고리즘이다. Knuth의 Algorithm B로 정의되며, O(log N)의 시간 복잡도를 갖는다.

**성능 분석:**
- 성공적 탐색: 평균 약 lg N - 1번의 비교
- 실패 탐색: 정확히 ⌊lg N⌋ + 1번의 비교
- 최악의 경우: ⌈lg(N+1)⌉번의 비교

## 동작 원리

**Algorithm B (Binary Search):**
1. 현재 탐색 범위의 중간 인덱스 m = ⌊(l+u)/2⌋ 계산
2. K = K[m]이면 탐색 성공
3. K < K[m]이면 하위 절반(l..m-1) 탐색
4. K > K[m]이면 상위 절반(m+1..u) 탐색
5. 범위가 비면 탐색 실패

**균등 이진 탐색(Uniform Binary Search, Algorithm U):**
각 레벨에서 사용되는 δ(delta) 값을 미리 테이블에 저장하여, 중간점 m을 매번 계산하지 않고 빠르게 이동한다. 비교 트리의 모든 같은 레벨 노드가 동일한 δ 값을 사용하므로 "균등"이라 불린다.

**Fibonacci 탐색과의 차이:**
이진 탐색은 항상 중간점을 선택하는 반면, Fibonacci 탐색은 Fibonacci 수에 기반한 분할점을 사용하여 덧셈만으로 다음 위치를 계산할 수 있다.

## 예시

```
Algorithm B (Binary Search):
  입력: 정렬된 배열 K[1..N], 탐색 키 K
  B1. l ← 1, u ← N
  B2. if l > u: NOT_FOUND
  B3. m ← ⌊(l+u)/2⌋
  B4. if K = K[m]: FOUND at m
      if K < K[m]: u ← m-1, goto B2
      if K > K[m]: l ← m+1, goto B2

N=16인 경우 최대 5번의 비교로 탐색 완료
⌈lg(16+1)⌉ = ⌈4.09⌉ = 5
```

## 관련 개념

- [순차 탐색 (Sequential Search)](/knowledge/algorithms/data-structures/sequential-search/)
- [피보나치 탐색 (Fibonacci Search)](/knowledge/algorithms/data-structures/fibonacci-search/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [최적 이진 탐색 트리 (Optimal Binary Search Tree)](/knowledge/algorithms/data-structures/optimal-binary-search-tree/)
