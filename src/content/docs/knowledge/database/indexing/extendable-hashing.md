---
title: "Extendable Hashing"
description: "확장 가능 해싱(Extendable Hashing)은 데이터베이스의 크기 변화에 따라 해시 함수를 동적으로 수정할 수 있는 해싱 기법이다"
tags: ['Dynamic Hashing', 'Bucket Splitting', 'Bucket Address Table', 'Hash Prefix', 'Index']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/extendable-hashing
sidebar:
  order: 6
---

## 핵심 개념

확장 가능 해싱은 b비트 해시 값을 생성하는 해시 함수 h를 사용하지만, 전체 비트를 사용하지 않고 처음 i비트만 사용한다. i는 데이터베이스 크기에 따라 증가하거나 감소한다.

**핵심 구조**:
- **버킷 주소 테이블(Bucket Address Table)**: 2^i개의 엔트리를 가지며, 각 엔트리는 버킷에 대한 포인터를 저장한다. 여러 엔트리가 같은 버킷을 가리킬 수 있다.
- **전역 깊이(i)**: 버킷 주소 테이블에서 사용하는 해시 비트 수이다.
- **로컬 깊이(i_j)**: 각 버킷 j에 연결된 공통 해시 접두사의 길이이다. 버킷 j를 가리키는 테이블 엔트리 수는 2^(i - i_j)이다.

**검색**: 키 K의 해시 값 h(K)의 처음 i비트를 계산하고, 해당 테이블 엔트리가 가리키는 버킷에서 검색한다.

**삽입 시 버킷 오버플로 처리**:
- **i = i_j인 경우**: 하나의 테이블 엔트리만 해당 버킷을 가리키므로, i를 1 증가시켜 테이블 크기를 2배로 확장한다. 그런 다음 버킷을 분할하고 레코드를 재분배한다.
- **i > i_j인 경우**: 여러 테이블 엔트리가 해당 버킷을 가리키므로, 테이블 확장 없이 버킷만 분할한다. i_j를 1 증가시키고, 해당 테이블 엔트리의 절반을 새 버킷으로 재지정한다.

**장점**:
- 데이터베이스 크기 증가에도 성능이 저하되지 않는다.
- 미래 성장을 위한 버킷을 미리 예약할 필요 없이 동적으로 할당한다.
- 한 번에 하나의 버킷만 재구성하므로 오버헤드가 낮다.

**단점**:
- 버킷 주소 테이블이라는 추가 간접 참조 수준이 필요하다.
- 테이블 크기가 주기적으로 2배씩 증가하는 비용이 있다.

## 예시

```
-- 확장 가능 해싱 삽입 과정

초기: i=1, 2개 버킷
  주소 테이블:       버킷:
  [0] → Bucket A    A(i_j=1): [Mozart(Music), 0011...]
  [1] → Bucket B    B(i_j=1): [Srinivasan(CS), 1111..], [Wu(Finance), 1010...]

Einstein(Physics, hash=1001...) 삽입 → 버킷 B가 꽉 참!

i = i_j = 1 이므로, 테이블 확장 (i=1 → i=2):
  주소 테이블:       버킷:
  [00] → Bucket A   A(i_j=1): [Mozart]
  [01] → Bucket A
  [10] → Bucket C   C(i_j=2): [Wu(1010...), Einstein(1001...)]
  [11] → Bucket B   B(i_j=2): [Srinivasan(1111...)]

이후 Gold(Physics, hash=1010...) 삽입 → 버킷 C로
El Said(History, hash=1100...) 삽입 → 버킷 B로

버킷 B가 꽉 참! i=2, i_j=2 → 다시 테이블 확장 (i=3):
  주소 테이블 (8 엔트리):
  [000] → Bucket A    A(i_j=1): [Mozart]
  [001] → Bucket A
  [010] → Bucket A
  [011] → Bucket A
  [100] → Bucket C    C(i_j=2): [Wu, Einstein]
  [101] → Bucket C
  [110] → Bucket D    D(i_j=3): [El Said(1100...)]
  [111] → Bucket B    B(i_j=3): [Srinivasan(1111...)]
```

## 관련 개념

- [Linear Hashing](/knowledge/database/linear-hashing/)
- [Hash Partitioning](/knowledge/database/hash-partitioning/)
- [Log-Structured Merge Tree](/knowledge/database/log-structured-merge-tree/)
- [Bloom Filter](/knowledge/database/bloom-filter/)
