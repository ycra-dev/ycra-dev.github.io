---
title: "Hash Partitioning"
description: "해시 파티셔닝은 파티셔닝 속성에 해시 함수를 적용하여 각 튜플을 특정 노드에 할당하는 데이터 분배 기법이다"
tags: ['Partitioning', 'Hash Function', 'Point Query', 'Data Distribution']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/hash-partitioning
sidebar:
  order: 8
---

## 핵심 개념

해시 파티셔닝의 핵심은 좋은 해시 함수의 선택이다. 이상적인 해시 함수는 균일성(uniformity)과 무작위성(randomness)을 가져야 한다. 균일성은 모든 버킷에 동일한 수의 검색 키 값을 할당하는 것이고, 무작위성은 실제 키 값 분포와 무관하게 각 버킷이 대략 같은 수의 값을 갖는 것이다.

**장점**:
- 점 질의(특정 값 검색)에 매우 효율적이다. 해시 함수로 정확한 노드를 바로 찾을 수 있다.
- 데이터 분포가 고르지 않더라도 좋은 해시 함수가 데이터를 균등하게 분배한다.

**단점**:
- 범위 질의를 효율적으로 처리할 수 없다. 해시 함수가 값을 무작위로 분배하므로 범위 내 값들이 여러 노드에 흩어진다.
- 노드 수가 변경되면 대부분의 데이터를 재분배해야 한다(이 문제는 consistent hashing으로 해결).
- 속성 값의 스큐(특정 값이 매우 빈번한 경우)가 있으면 특정 노드에 부하가 집중될 수 있다.

해시 파티셔닝은 종종 범위 파티셔닝과 결합하여 사용된다. 먼저 키에 해시를 적용한 후, 해시 값에 대해 범위 파티셔닝을 수행하는 방식이다. 이렇게 하면 데이터 분포 스큐를 줄이면서도 태블릿 크기를 유연하게 제어할 수 있다.

## 예시

```
-- 해시 파티셔닝 예시 (4개 노드)
-- 해시 함수: h(dept_name) = sum(ASCII values) mod 4

h("Physics")  = (80+104+121+...) mod 4 = 2  → Node 2
h("Music")    = (77+117+115+...) mod 4 = 1  → Node 1
h("Finance")  = (70+105+110+...) mod 4 = 0  → Node 0
h("History")  = (72+105+115+...) mod 4 = 3  → Node 3

-- 점 질의: dept_name = 'Physics'
1. h("Physics") = 2
2. Node 2에만 질의 전송
3. O(1) 노드 접근

-- 범위 질의: dept_name BETWEEN 'History' AND 'Physics'
1. 해시 값은 범위와 무관하게 분산
2. 모든 노드에 질의 전송 필요 → 비효율적
```

## 관련 개념

- [Data Partitioning](/knowledge/database/data-partitioning/)
- [Range Partitioning](/knowledge/database/range-partitioning/)
- [Consistent Hashing](/knowledge/database/consistent-hashing/)
- [Extendable Hashing](/knowledge/database/extendable-hashing/)
- [Linear Hashing](/knowledge/database/linear-hashing/)
