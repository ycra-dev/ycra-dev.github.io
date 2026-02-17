---
title: "Chaining"
description: "체이닝(Chaining)은 해시 테이블에서 동일한 슬롯에 해싱되는 모든 원소를 연결 리스트로 관리하여 충돌을 해결하는 방법이다"
tags: ['Chaining', 'Collision Resolution', 'Hash Table', 'Linked List', 'Load Factor']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/chaining
sidebar:
  order: 10
---

## 핵심 개념

체이닝은 비재귀적 분할 정복의 한 형태로 볼 수 있다. n개의 입력 원소가 해시 함수에 의해 m개의 부분집합으로 무작위 분할되며, 각 부분집합의 크기는 약 n/m이다.

**연산과 시간 복잡도:**
- CHAINED-HASH-INSERT(T, x): LIST-PREPEND(T[h(x.key)], x) - O(1) 최악
- CHAINED-HASH-SEARCH(T, k): LIST-SEARCH(T[h(k)], k) - O(1 + alpha) 평균
- CHAINED-HASH-DELETE(T, x): LIST-DELETE(T[h(x.key)], x) - O(1) (이중 연결 리스트)

**성능 분석 (독립 균일 해싱 가정):**
- 적재율 alpha = n/m
- **정리 11.1:** 비성공 검색의 평균 시간 = Theta(1 + alpha)
  - 키 k는 균일하게 m개 슬롯 중 하나에 해싱되고, 해당 리스트 전체를 탐색
  - 기대 리스트 길이 = alpha
- **정리 11.2:** 성공 검색의 평균 시간 = Theta(1 + alpha)
  - Theta(2 + alpha/2 - alpha/2n) = Theta(1 + alpha)
- n = O(m)이면 alpha = O(1)이므로, 모든 딕셔너리 연산이 평균 O(1)

**최악의 경우:** 모든 n개 키가 같은 슬롯에 해싱되면 길이 n의 리스트가 생성되어 검색에 Theta(n) 시간 소요.

**보편적 해싱과의 결합 (따름정리 11.3):** 보편적 해시 함수를 사용하면, n = O(m)인 경우 s개의 INSERT/SEARCH/DELETE 연산의 총 기대 시간이 Theta(s)이다.

## 예시

```
// 체이닝 해시 테이블 연산
CHAINED-HASH-INSERT(T, x)
  LIST-PREPEND(T[h(x.key)], x)  // 슬롯의 리스트 앞에 삽입

CHAINED-HASH-SEARCH(T, k)
  return LIST-SEARCH(T[h(k)], k)  // 슬롯의 리스트에서 검색

CHAINED-HASH-DELETE(T, x)
  LIST-DELETE(T[h(x.key)], x)  // 슬롯의 리스트에서 삭제

// 예시: m = 9, alpha = n/m
// n = O(m)이면 alpha = O(1)
// -> 모든 연산 평균 O(1)

// 최악의 경우: 모든 키가 슬롯 0에 해싱
// T[0]: k1 -> k2 -> ... -> kn  (길이 n)
// 검색 시간: Theta(n)
```

## 관련 개념

- [Hash Table](/knowledge/algorithms/hash-table/)
- [Collision Resolution](/knowledge/algorithms/collision-resolution/)
- [Open Addressing](/knowledge/algorithms/open-addressing/)
- [Linked List](/knowledge/algorithms/linked-list/)
- [Hash Function](/knowledge/algorithms/hash-function/)
