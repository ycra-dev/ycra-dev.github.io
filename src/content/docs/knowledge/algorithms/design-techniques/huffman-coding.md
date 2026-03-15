---
title: "허프만 코딩 (Huffman Coding)"
description: "허프만 코딩(Huffman Coding)은 각 문자의 출현 빈도를 이용하여 최적의 접두사 없는 이진 코드(prefix-free binary code)를 구성하는 그리디 알고리즘이다"
tags: ['Huffman Coding', 'Greedy Algorithm', 'Data Compression', 'Prefix Free Code', 'Binary Tree']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/huffman-coding
sidebar:
  order: 11
---

## 핵심 개념

**접두사 없는 코드(Prefix-Free Code)**: 어떤 코드워드도 다른 코드워드의 접두사가 되지 않는 코드. 이 조건 덕분에 인코딩된 문자열을 모호함 없이 복호화할 수 있다. 최적 데이터 압축은 접두사 없는 코드로 항상 달성 가능하다.

**이진 트리 표현**: 접두사 없는 코드는 이진 트리로 표현된다. 각 리프는 문자에 대응하고, 루트에서 리프까지의 경로가 코드워드를 결정한다 (왼쪽=0, 오른쪽=1). 최적 코드의 트리는 반드시 완전 이진 트리(full binary tree)이다.

**트리 비용**: B(T) = sum{c.freq * d_T(c)} (c의 빈도 x c의 깊이)

**알고리즘**: 상향식(bottom-up)으로 트리를 구성한다.
1. 각 문자를 하나의 노드로 시작하여 최소 우선순위 큐에 넣는다.
2. 빈도가 가장 낮은 두 노드를 추출하여 합병한다.
3. 합병된 노드의 빈도는 두 자식 빈도의 합이다.
4. n-1번 합병하면 트리가 완성된다.

**정당성 증명**:
- **보조정리 15.2 (그리디 선택 성질)**: 빈도가 가장 낮은 두 문자 x, y는 최적 코드에서 같은 길이의 코드워드를 가지며 마지막 비트만 다르다 (즉, 최대 깊이의 형제 리프).
- **보조정리 15.3 (최적 부분 구조)**: x, y를 합병한 z를 포함하는 알파벳 C'에 대한 최적 트리 T'에서, z를 x, y의 부모로 확장하면 C에 대한 최적 트리 T가 된다.

**실행 시간**: O(n lg n) (이진 최소 힙 사용 시). 큐 초기화 O(n), n-1번 반복에서 각각 두 번의 EXTRACT-MIN과 한 번의 INSERT, 각각 O(lg n).

## 예시

```
// 문자 빈도: a:45 b:13 c:12 d:16 e:9 f:5 (단위: 천)
// 고정 길이 코드: 3비트 x 100,000 = 300,000 비트
// 허프만 코드: 224,000 비트 (약 25% 절약)
// a=0, b=101, c=100, d=111, e=1101, f=1100

HUFFMAN(C)
  n = |C|
  Q = C                    // 최소 우선순위 큐 초기화
  for i = 1 to n - 1
    allocate new node z
    x = EXTRACT-MIN(Q)     // 빈도 최소 노드 추출
    y = EXTRACT-MIN(Q)     // 빈도 두 번째 최소 노드 추출
    z.left = x
    z.right = y
    z.freq = x.freq + y.freq
    INSERT(Q, z)
  return EXTRACT-MIN(Q)    // 루트 반환
```

## 관련 개념

- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/)
- [탐욕 선택 속성 (Greedy Choice Property)](/knowledge/algorithms/greedy-choice-property/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/binary-search-tree/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
