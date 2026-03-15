---
title: "체이닝 (Chaining)"
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

## TAOCP 분석 (Knuth, Vol.3)

TAOCP Section 6.4의 체이닝 주요 특성:

**Knuth 성능 공식 (적재율 α = N/M):**
- 성공 탐색 평균 프로브 수: 1 + α/2
- 실패 탐색 평균 프로브 수: α
- α > 1도 허용됨 (리스트로 오버플로우 처리)

**삽입 위치 전략 (Knuth 제시):**
- **앞에 삽입(Front Insertion)**: 가장 최근 항목이 앞에 → 최근 참조 항목 빠른 탐색
- **뒤에 삽입(Rear Insertion)**: 동일 해시값 키들 삽입 순서 유지
- **정렬 삽입**: 리스트 내부에서 정렬 유지 → 실패 탐색 빠름

**병합 체이닝 (Coalesced Chaining):**
추가 리스트 메모리 없이 테이블 내부의 빈 슬롯들을 연결하여 오버플로우 처리. 삭제가 어렵지만 메모리 효율이 좋음.

**체이닝 vs 선형 탐사 성능 비교:**

| α   | 체이닝 성공 | 체이닝 실패 | 선형탐사 성공 | 선형탐사 실패 |
|-----|-----------|-----------|------------|------------|
| 0.5 | 1.25      | 0.5       | 1.50       | 2.50       |
| 0.7 | 1.35      | 0.7       | 2.17       | 6.06       |
| 1.0 | 1.50      | 1.0       | 불가        | 불가        |

체이닝이 실패 탐색에서 특히 우수하다.

## 관련 개념

- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/)
- [충돌 해결 (Collision Resolution)](/knowledge/algorithms/collision-resolution/)
- [개방 주소법 (Open Addressing)](/knowledge/algorithms/open-addressing/)
- [연결 리스트 (Linked List)](/knowledge/algorithms/linked-list/)
- [해시 함수 (Hash Function)](/knowledge/algorithms/hash-function/)
