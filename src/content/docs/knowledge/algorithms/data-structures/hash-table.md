---
title: "Hash Table"
description: "해시 테이블(Hash Table)은 해시 함수를 사용하여 키를 배열 슬롯에 매핑하는 자료구조로, 딕셔너리 연산(INSERT, SEARCH, DELETE)을 평균 O(1) 시간에 지원한다"
tags: ['Hash Table', 'Data Structure', 'Dictionary', 'Hashing', 'Load Factor', 'Dynamic Set']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/hash-table
sidebar:
  order: 7
---

## 핵심 개념

해시 테이블은 직접 주소 테이블의 일반화이다. 해시 함수 h: U -> {0, 1, ..., m-1}를 사용하여 키 k를 슬롯 h(k)에 매핑한다. 테이블 크기 m은 보통 |U|보다 훨씬 작으므로 저장 공간이 O(|K|)로 줄어든다.

**적재율(Load Factor):** alpha = n/m (n은 저장된 원소 수, m은 슬롯 수)
- 체이닝: alpha >= 1 가능
- 개방 주소법: alpha < 1 (최대 1)

**충돌(Collision):** 두 키 k1, k2가 h(k1) = h(k2)인 경우 발생. |U| > m이므로 충돌은 필연적이다.

**충돌 해결 방법:**
1. **체이닝(Chaining):** 동일 슬롯의 원소들을 연결 리스트로 관리
2. **개방 주소법(Open Addressing):** 테이블 내에서 빈 슬롯을 탐색

**성능 분석 (독립 균일 해싱 가정):**
- 체이닝에서 비성공 검색: O(1 + alpha) 평균
- 체이닝에서 성공 검색: O(1 + alpha) 평균
- n = O(m)이면 모든 딕셔너리 연산이 평균 O(1)

해시 테이블은 Python의 내장 딕셔너리, 컴파일러의 심볼 테이블 등 실무에서 가장 널리 사용되는 자료구조 중 하나이다. 최악의 경우 O(n)이지만, 합리적인 가정 하에서 평균 O(1) 성능을 보장한다.

## 예시

```
// 해시 테이블 T[0:m-1], 해시 함수 h(k) = k mod m
// m = 9, 키 삽입: 5, 28, 19, 15, 20, 33, 12, 17, 10

// h(5) = 5, h(28) = 1, h(19) = 1 (충돌!), h(15) = 6
// h(20) = 2, h(33) = 6 (충돌!), h(12) = 3, h(17) = 8, h(10) = 1 (충돌!)

// 체이닝 결과:
// T[0]: []
// T[1]: [10] -> [19] -> [28]
// T[2]: [20]
// T[3]: [12]
// T[5]: [5]
// T[6]: [33] -> [15]
// T[8]: [17]

// alpha = 8/9 ≈ 0.89
// 평균 검색 시간: O(1 + 0.89) = O(1)
```

## TAOCP 분석 (Knuth, Vol.3)

TAOCP Section 6.4의 해시 테이블 주요 특성:

**다른 탐색 방법과의 비교 (Knuth의 31개 영어 단어 실험):**
- 이진 탐색: 약 20u (시간 단위)
- 최적 트리 탐색: 약 18u
- 해싱: 약 17.8u (가장 빠름, 공간도 효율적)

**해시 테이블의 한계 (Knuth 지적):**
1. 최솟값/최댓값 탐색 불가
2. 범위 탐색(range query) 비효율
3. 순서 탐색 불가
4. 최악의 경우 O(N)
5. 해시 함수 설계의 어려움

**완전 해싱(Perfect Hashing):**
N개의 정적 키에 대해 충돌 없이 매핑하는 h(K) 설계. 4131가지 함수 중 약 10^7분의 1만 완전 함수이므로 임의 발견은 거의 불가능하나, 알고리즘적으로 O(N) 기대 시간에 구성 가능.

**성능 요약 (적재율 α = N/M):**
- α < 1이면 평균 탐색 O(1)
- α → 1이면 성능 급격히 저하
- 최적 α: 0.5 ~ 0.75 (방법에 따라 다름)

## 관련 개념

- [Hash Function](/knowledge/algorithms/hash-function/)
- [Collision Resolution](/knowledge/algorithms/collision-resolution/)
- [Chaining](/knowledge/algorithms/chaining/)
- [Open Addressing](/knowledge/algorithms/open-addressing/)
- [Direct-Address Table](/knowledge/algorithms/direct-address-table/)
- [Linked List](/knowledge/algorithms/linked-list/)
