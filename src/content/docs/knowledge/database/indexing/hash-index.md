---
title: "Hash Index"
description: "해시 인덱스(Hash Index)는 해시 함수를 사용하여 검색 키 값을 버킷 주소에 매핑하는 인덱스 구조로, 동등 조건(equality) 검색을 O(1)에 가깝게 지원한다"
tags: ['Hash Index', 'Hash Function', 'Bucket', 'Overflow Chaining', 'Static Hashing', 'Dynamic Hashing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/hash-index
sidebar:
  order: 5
---

## 핵심 개념

해시 함수 h는 검색 키 집합 K를 버킷 주소 집합 B에 매핑한다. 인메모리 해시 인덱스에서 버킷은 포인터 배열이며, 각 포인터는 해당 버킷의 엔트리를 담은 연결 리스트의 헤드를 가리킨다.

삽입 시 검색 키 K_i에 대해 h(K_i)를 계산하여 해당 버킷에 인덱스 엔트리를 추가한다. 이 방식을 오버플로 체이닝(overflow chaining) 또는 폐쇄 주소(closed addressing)라 한다. 검색 시에도 h(K_i)를 계산하고 해당 버킷을 순회하여 일치하는 레코드를 찾는다. 서로 다른 검색 키가 같은 해시 값을 가질 수 있으므로(해시 충돌), 버킷 내 레코드의 검색 키를 반드시 확인해야 한다.

B+트리와 달리 해시 인덱스는 범위 검색을 지원하지 않는다(예: l <= v <= u 형태의 쿼리).

디스크 기반 해시 인덱스에서 버킷 오버플로가 발생하면 오버플로 버킷을 연결 리스트로 체인한다. 오버플로 확률을 줄이기 위해 버킷 수를 (n_r / f_r) * (1 + d)로 설정한다(d는 보통 0.2로, 약 20%의 여유 공간).

정적 해싱(static hashing)은 버킷 수가 고정되어 레코드 수가 크게 증가하면 비효율적이다. 동적 해싱(dynamic hashing) 기법인 선형 해싱(linear hashing)과 확장 해싱(extendable hashing)은 버킷 수를 점진적으로 증가시켜 이 문제를 해결한다.

## 예시

해시 인덱스의 동작 예시:

```
해시 함수: h(ID) = ID mod 4
버킷 수: 4

삽입:
  h(10101) = 10101 mod 4 = 1 → 버킷 1
  h(12121) = 12121 mod 4 = 1 → 버킷 1
  h(15151) = 15151 mod 4 = 3 → 버킷 3
  h(22222) = 22222 mod 4 = 2 → 버킷 2

버킷 0: (비어 있음)
버킷 1: [10101 → rec1] → [12121 → rec2]
버킷 2: [22222 → rec4]
버킷 3: [15151 → rec3]

검색: ID = 12121
  h(12121) = 1 → 버킷 1 탐색
  10101 ≠ 12121 → 다음
  12121 = 12121 → 발견!

검색: 10000 ≤ ID ≤ 20000
  → 해시 인덱스로는 효율적 처리 불가 (범위 검색 미지원)
```

## 관련 개념

- [B-Plus Tree](/knowledge/database/b-plus-tree/)
- [Ordered Index](/knowledge/database/ordered-index/)
- [Bitmap Index](/knowledge/database/bitmap-index/)
- [File Organization](/knowledge/database/file-organization/)
