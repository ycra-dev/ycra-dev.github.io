---
title: "Linear Hashing"
description: "선형 해싱(Linear Hashing)은 확장 가능 해싱의 대안적 동적 해싱 기법으로, 버킷 주소 테이블이라는 추가 간접 참조 없이 버킷 수를 점진적으로 확장하는 방식이다"
tags: ['Dynamic Hashing', 'Gradual Expansion', 'Overflow Bucket', 'Hash Index']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/linear-hashing
sidebar:
  order: 7
---

## 핵심 개념

선형 해싱은 확장 가능 해싱의 추가 간접 참조(버킷 주소 테이블) 비용을 피하면서 동적 해싱을 구현한다.

**핵심 아이디어**:
- 초기에 n개의 버킷으로 시작한다.
- 해시 함수 h_i(k) = k mod (2^i * n)을 사용한다. i는 분할 라운드를 나타낸다.
- 버킷이 오버플로되면, "다음 분할 대상" 버킷(오버플로된 버킷이 아닐 수 있음)을 분할한다.
- 분할 포인터(split pointer)가 순차적으로 이동하며, 버킷을 하나씩 분할한다.

**분할 과정**:
1. 분할 포인터가 가리키는 버킷의 모든 레코드에 대해 h_(i+1)을 적용한다.
2. 레코드가 원래 버킷에 남거나, 새로 추가된 버킷으로 이동한다.
3. 분할 포인터를 다음 버킷으로 이동시킨다.
4. 모든 원래 버킷이 분할되면(포인터가 한 바퀴 돌면), i를 1 증가시키고 포인터를 처음으로 되돌린다.

**검색**: 키 K에 대해 h_i(K)를 계산한다. 결과가 분할 포인터보다 작으면(이미 분할된 버킷), h_(i+1)(K)를 사용하여 올바른 버킷을 찾는다.

**확장 가능 해싱과의 비교**:
- 장점: 버킷 주소 테이블이 없으므로 추가 간접 참조가 없다. 메모리 오버헤드가 적다.
- 단점: 오버플로 버킷이 더 많이 필요할 수 있다. 분할이 오버플로된 버킷이 아닌 다른 버킷에서 발생할 수 있어, 특정 버킷의 오버플로 해결이 지연될 수 있다.

## 예시

```
-- 선형 해싱 예시 (초기 4개 버킷, i=0)
-- h_0(k) = k mod 4, h_1(k) = k mod 8

초기 (split pointer = 0):
  Bucket 0: [8, 16]
  Bucket 1: [5, 13]
  Bucket 2: [10, 14]
  Bucket 3: [7, 11]

삽입 key=20 → h_0(20) = 20 mod 4 = 0 → Bucket 0
Bucket 0이 꽉 참 → 오버플로!

분할: Bucket 0을 분할 (split pointer = 0)
  h_1 적용: key mod 8
  8 mod 8 = 0  → Bucket 0에 남음
  16 mod 8 = 0 → Bucket 0에 남음
  20 mod 8 = 4 → 새 Bucket 4로 이동

  Bucket 0: [8, 16]
  Bucket 1: [5, 13]
  Bucket 2: [10, 14]
  Bucket 3: [7, 11]
  Bucket 4: [20]
  split pointer = 1

검색 key=20:
  h_0(20) = 20 mod 4 = 0
  0 < split_pointer(1) → 이미 분할됨
  h_1(20) = 20 mod 8 = 4 → Bucket 4에서 검색

검색 key=14:
  h_0(14) = 14 mod 4 = 2
  2 ≥ split_pointer(1) → 아직 분할 안 됨
  → Bucket 2에서 검색

-- 전체 라운드 완료 시:
  모든 원래 버킷(0~3) 분할 완료 → 버킷 수 8개
  i = 1로 증가, split pointer = 0으로 리셋
  다음 라운드: h_1(k) = k mod 8, h_2(k) = k mod 16
```

## 관련 개념

- [Extendable Hashing](/knowledge/database/extendable-hashing/)
- [Hash Partitioning](/knowledge/database/hash-partitioning/)
- [Log-Structured Merge Tree](/knowledge/database/log-structured-merge-tree/)
- [Bloom Filter](/knowledge/database/bloom-filter/)
