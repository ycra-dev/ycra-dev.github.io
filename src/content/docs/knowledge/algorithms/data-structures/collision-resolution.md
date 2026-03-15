---
title: "충돌 해결 (Collision Resolution)"
description: "충돌 해결(Collision Resolution)은 두 개 이상의 키가 동일한 해시 테이블 슬롯에 매핑될 때(h(k1) = h(k2)), 이를 처리하는 기법의 총칭이다"
tags: ['Collision Resolution', 'Hashing', 'Collision', 'Hash Table', 'Chaining', 'Open Addressing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/collision-resolution
sidebar:
  order: 12
---

## 핵심 개념

해시 테이블에서 |U| > m이므로 비둘기집 원리에 의해 충돌은 불가피하다. 충돌을 효과적으로 해결하는 두 가지 주요 접근법이 있다.

**1. 체이닝(Chaining):**
- 같은 슬롯에 해싱되는 모든 원소를 연결 리스트로 관리
- 각 슬롯은 리스트의 헤드를 가리킨다
- 적재율 alpha > 1 가능
- 삽입 O(1), 삭제 O(1) (이중 연결 리스트), 검색 O(1 + alpha) 평균
- 외부 저장 공간(포인터, 리스트 노드) 필요

**2. 개방 주소법(Open Addressing):**
- 모든 원소가 해시 테이블 내부에 저장됨
- 슬롯이 차면 탐색 순서(probe sequence)에 따라 다음 빈 슬롯을 찾음
- 적재율 alpha <= 1 (테이블이 가득 차면 삽입 불가)
- 포인터 불필요, 같은 메모리에 더 많은 슬롯 확보 가능
- 삭제가 까다로움 (DELETED 마커 필요하거나 선형 탐색의 경우 재배치)

**선택 기준:**
- 삭제가 빈번하면 체이닝이 유리
- 메모리 효율성과 캐시 성능이 중요하면 개방 주소법 (특히 선형 탐색)
- 보편적 해싱을 사용하면 어느 방법이든 좋은 평균 성능 보장

충돌 해결 방법의 선택은 해시 테이블의 전체 성능에 결정적인 영향을 미치며, 적재율, 메모리 구조, 삭제 빈도 등을 고려하여 결정해야 한다.

## 예시

```
// 체이닝: 슬롯마다 연결 리스트
// h(k1) = h(k4) = 1, h(k5) = h(k2) = h(k7) = 4
// T[1]: k4 -> k1
// T[4]: k7 -> k2 -> k5

// 개방 주소법: 탐색 순서에 따라 빈 슬롯 탐색
// 선형 탐색: h(k, i) = (h1(k) + i) mod m
// 이중 해싱: h(k, i) = (h1(k) + i*h2(k)) mod m

// 개방 주소법 삽입
HASH-INSERT(T, k)
  i = 0
  repeat
    q = h(k, i)
    if T[q] == NIL
      T[q] = k
      return q
    else i = i + 1
  until i == m
  error "hash table overflow"
```

## 관련 개념

- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/)
- [체이닝 (Chaining)](/knowledge/algorithms/chaining/)
- [개방 주소법 (Open Addressing)](/knowledge/algorithms/open-addressing/)
- [해시 함수 (Hash Function)](/knowledge/algorithms/hash-function/)
- [연결 리스트 (Linked List)](/knowledge/algorithms/linked-list/)
