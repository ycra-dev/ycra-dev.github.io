---
title: "Array"
description: "배열(Array)은 연속된 메모리 공간에 동일한 크기의 원소를 저장하는 기본 자료구조로, 인덱스를 통해 임의의 원소에 O(1) 시간에 접근할 수 있다"
tags: ['Array', 'Data Structure', 'Elementary', 'Contiguous Memory', 'Random Access']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/array
sidebar:
  order: 2
---

## 핵심 개념

배열은 RAM 모델에서 가장 기본적인 자료구조이다. 첫 번째 원소의 메모리 주소가 a이고, 각 원소가 b바이트를 차지하며, 시작 인덱스가 s일 때, i번째 원소는 메모리 주소 a + b(i - s)에 위치한다. 이 산술 연산으로 인해 어떤 인덱스든 상수 시간에 접근이 가능하다.

행렬(Matrix)은 1차원 배열을 사용하여 표현할 수 있으며, 행 우선(row-major) 또는 열 우선(column-major) 순서로 저장된다. 행 우선 순서에서 m x n 행렬의 M[i,j] 원소는 인덱스 n(i-1) + j에 위치한다 (1-origin 기준).

**시간 복잡도:**
- 원소 접근: O(1)
- 정렬되지 않은 배열에서 삽입/삭제: O(1) / O(n)
- 정렬된 배열에서 검색(이진 검색): O(lg n)
- 정렬된 배열에서 삽입/삭제: O(n)

배열의 장점은 단순함과 임의 접근이며, 단점은 크기가 고정되고 삽입/삭제 시 원소 이동이 필요할 수 있다는 것이다.

## 예시

```
// 배열 주소 계산 (0-origin indexing)
// 시작 주소 a, 원소 크기 b바이트
// i번째 원소 주소 = a + b * i

// 행 우선 순서 행렬 접근 (0-origin)
// m x n 행렬에서 M[i][j]의 1차원 인덱스 = n*i + j
// 예: 2x3 행렬에서 M[1][2] = 3*1 + 2 = 5번째 위치

// 블록 표현도 가능
// 4x4 행렬을 2x2 블록으로 나누어 저장
// 블록 내부는 연속적으로, 블록 간에도 연속적으로 저장
```

## 관련 개념

- [Data Structure](/knowledge/algorithms/data-structure/)
- [Stack](/knowledge/algorithms/stack/)
- [Queue](/knowledge/algorithms/queue/)
- [Linked List](/knowledge/algorithms/linked-list/)
- [Hash Table](/knowledge/algorithms/hash-table/)
