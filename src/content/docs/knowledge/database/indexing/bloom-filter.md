---
title: "Bloom Filter"
description: "블룸 필터(Bloom Filter)는 원소가 집합에 속하는지를 확률적으로 판별하는 공간 효율적인 데이터 구조이다"
tags: ['Probabilistic Data Structure', 'Membership Test', 'False Positive', 'Hash Function', 'Space Efficient']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/bloom-filter
sidebar:
  order: 14
---

## 핵심 개념

블룸 필터는 m비트의 비트 배열과 k개의 독립적인 해시 함수 h1, h2, ..., hk로 구성된다. 각 해시 함수는 원소를 0부터 m-1 사이의 값으로 매핑한다.

**삽입**: 원소 x를 삽입할 때, h1(x), h2(x), ..., hk(x) 위치의 비트를 모두 1로 설정한다.

**검색**: 원소 x의 멤버십을 확인할 때, h1(x), h2(x), ..., hk(x) 위치의 비트를 모두 검사한다.
- 하나라도 0이면 → x는 확실히 집합에 없다 (거짓 음성 없음).
- 모두 1이면 → x가 집합에 있을 가능성이 높다 (하지만 거짓 양성 가능).

**거짓 양성 확률**: n개 원소가 삽입된 후 거짓 양성 확률은 약 (1 - e^(-kn/m))^k이다. m/n의 비율이 클수록, 그리고 적절한 k 값을 선택할수록 거짓 양성 확률이 낮아진다. 최적의 해시 함수 수는 k = (m/n) * ln(2)이다.

**주요 응용**:
- **LSM 트리 최적화**: 키가 어느 레벨에 존재하는지 블룸 필터로 빠르게 확인하여 불필요한 디스크 접근을 줄인다.
- **분산 질의 처리의 세미조인**: 조인 키의 블룸 필터를 전송하여 네트워크 비용을 절감한다.
- **캐시 필터링**: 캐시에 없는 항목에 대한 불필요한 조회를 방지한다.
- **중복 제거**: 대규모 데이터에서 이미 처리된 항목을 빠르게 확인한다.

블룸 필터는 삭제를 지원하지 않는다. 삭제가 필요한 경우 카운팅 블룸 필터(Counting Bloom Filter)를 사용하며, 각 비트 대신 카운터를 사용한다.

## 예시

```
-- 블룸 필터 예시 (m=16 비트, k=3 해시 함수)

초기 상태: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
                                    비트 위치: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15

삽입 "alice":
  h1("alice")=2, h2("alice")=7, h3("alice")=13
  결과: [0,0,1,0, 0,0,0,1, 0,0,0,0, 0,1,0,0]

삽입 "bob":
  h1("bob")=5, h2("bob")=7, h3("bob")=11
  결과: [0,0,1,0, 0,1,0,1, 0,0,0,1, 0,1,0,0]

검색 "alice":
  위치 2,7,13 모두 1 → "아마도 있음" (정확!)

검색 "charlie":
  h1("charlie")=2, h2("charlie")=5, h3("charlie")=11
  위치 2,5,11 모두 1 → "아마도 있음" (거짓 양성!)
  실제로 "charlie"는 삽입하지 않았지만, 다른 원소들이 해당 비트를 1로 설정

검색 "dave":
  h1("dave")=1, h2("dave")=5, h3("dave")=9
  위치 1은 0 → "확실히 없음" (정확!)

-- LSM 트리에서의 활용:
Level 0: Bloom Filter → "key123 있을 수 있음" → 확인 → 있음!
Level 1: 접근할 필요 없음 (디스크 I/O 절약)
```

## 관련 개념

- [Log-Structured Merge Tree](/knowledge/database/log-structured-merge-tree/)
- [Distributed Query Processing](/knowledge/database/distributed-query-processing/)
- [Hash Partitioning](/knowledge/database/hash-partitioning/)
- [Version Vector](/knowledge/database/version-vector/)
