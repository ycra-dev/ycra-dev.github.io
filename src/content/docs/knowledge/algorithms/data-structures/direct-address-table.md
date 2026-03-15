---
title: "직접 주소 테이블 (Direct-Address Table)"
description: "직접 주소 테이블(Direct-Address Table)은 키의 전체 집합(universe) U = {0, 1, "
tags: ['Direct Address Table', 'Data Structure', 'Dictionary', 'Hash Table', 'Array']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/direct-address-table
sidebar:
  order: 9
---

## 핵심 개념

직접 주소 테이블 T[0:m-1]에서 각 슬롯(slot)은 키 전체 집합 U의 한 키에 대응한다. 슬롯 k는 키가 k인 원소를 가리키거나, 해당 키의 원소가 없으면 NIL을 저장한다.

**핵심 연산과 시간 복잡도 (모두 O(1)):**
- DIRECT-ADDRESS-SEARCH(T, k): return T[k]
- DIRECT-ADDRESS-INSERT(T, x): T[x.key] = x
- DIRECT-ADDRESS-DELETE(T, x): T[x.key] = NIL

**장점:** 모든 딕셔너리 연산이 O(1) 최악의 경우 시간에 수행된다.

**단점:**
- 키 전체 집합 U가 크거나 무한하면, 크기 |U|인 테이블을 할당하는 것이 비현실적이거나 불가능하다
- 실제 저장되는 키 집합 K가 U에 비해 매우 작으면, 할당된 대부분의 공간이 낭비된다

이러한 한계를 극복하기 위해 해시 테이블이 등장했다. 해시 테이블은 해시 함수를 사용하여 키를 더 작은 범위의 슬롯에 매핑함으로써, 저장 공간을 O(|K|)로 줄이면서도 평균 O(1) 접근 시간을 유지한다.

## 예시

```
// 전체 집합 U = {0, 1, ..., 9}
// 실제 키 집합 K = {2, 3, 5, 8}

DIRECT-ADDRESS-SEARCH(T, k)
  return T[k]

DIRECT-ADDRESS-INSERT(T, x)
  T[x.key] = x

DIRECT-ADDRESS-DELETE(T, x)
  T[x.key] = NIL

// T[0]=NIL, T[1]=NIL, T[2]=원소, T[3]=원소,
// T[4]=NIL, T[5]=원소, T[6]=NIL, T[7]=NIL,
// T[8]=원소, T[9]=NIL
// -> 10개 슬롯 중 4개만 사용, 6개 낭비
```

## 관련 개념

- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/)
- [해시 함수 (Hash Function)](/knowledge/algorithms/hash-function/)
- [배열 (Array)](/knowledge/algorithms/array/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
