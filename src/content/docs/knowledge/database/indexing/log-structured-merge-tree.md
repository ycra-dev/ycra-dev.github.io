---
title: "Log-Structured Merge Tree"
description: "로그 구조 병합 트리(Log-Structured Merge Tree, LSM Tree)는 높은 쓰기 처리량을 최적화한 인덱스 구조로, 인메모리 트리(L0)와 디스크 기반 트리들(L1, L2, "
tags: ['Lsm Tree', 'Write Amplification', 'Stepped Merge', 'Rolling Merge', 'Compaction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/log-structured-merge-tree
sidebar:
  order: 13
---

## 핵심 개념

**기본 구조**:
- **L0 (메모리)**: 새로운 삽입은 먼저 인메모리 트리(보통 B+-트리 또는 건너뛰기 리스트)에 저장된다. 쓰기 성능이 매우 빠르다.
- **L1, L2, ..., Lk (디스크)**: 각 레벨의 크기는 이전 레벨의 일정 배수이다. 데이터는 순차적 쓰기로 디스크에 기록된다.

**롤링 병합(Rolling Merge)**: L0이 가득 차면, L0의 데이터를 L1과 병합하여 새로운 L1을 생성한다. L1이 가득 차면 L2와 병합하는 식으로 계단식 병합이 진행된다.

**Stepped-Merge 변형**: 기본 LSM 트리의 각 레벨에 하나의 트리 대신 여러 개의 트리(보통 T개)를 허용한다. 레벨에 T개의 트리가 모이면 이를 병합하여 다음 레벨에 하나의 트리로 추가한다.
- 장점: 병합 빈도가 줄어들어 쓰기 증폭(write amplification)이 감소한다.
- 단점: 각 레벨에 여러 트리가 있으므로, 검색 시 여러 트리를 확인해야 한다.

**쓰기 증폭(Write Amplification)**: 하나의 데이터가 삽입 후 여러 번의 병합을 거치면서 반복적으로 디스크에 쓰이는 현상이다. LSM 트리의 주요 비용 요소이며, stepped-merge는 이를 줄인다.

**블룸 필터 최적화**: 각 레벨/트리에 블룸 필터를 유지하여, 검색 시 키가 존재하지 않는 레벨의 트리를 건너뛸 수 있다. 이를 통해 점 질의의 성능을 크게 향상시킨다.

**삭제와 업데이트**: 실제 삭제 대신 "삭제 표시(tombstone)"를 삽입한다. 병합 과정에서 삭제 표시와 원본 데이터가 만나면 둘 다 제거된다. 업데이트도 유사하게 새 버전을 삽입하고, 병합 시 구 버전을 제거한다.

BigTable, HBase, Cassandra, MongoDB(WiredTiger), RocksDB 등 현대 키-값 저장소에서 핵심 인덱스 구조로 사용된다.

## 예시

```
-- LSM 트리 구조 (T=3 stepped-merge)

Level 0 (메모리):
  [인메모리 B+-트리: 최근 삽입된 데이터]

Level 1 (디스크, 최대 3개 트리):
  Tree1.1: [a-d 범위] ← L0에서 병합된 결과
  Tree1.2: [c-g 범위]
  Tree1.3: [b-f 범위] ← 3개 모이면 → L2로 병합

Level 2 (디스크, 최대 3개 트리):
  Tree2.1: [a-m 범위] ← L1에서 병합된 결과
  Tree2.2: [b-n 범위]

-- 삽입 흐름:
1. INSERT key=42 → L0 (메모리, 즉시 완료)
2. L0 가득 참 → L0를 정렬하여 L1에 새 트리 추가
3. L1에 3개 트리 모임 → 3개를 병합하여 L2에 새 트리 추가

-- 점 질의: WHERE key = 42
1. L0 (메모리) 확인 → 없음
2. L1 블룸필터 확인:
   Tree1.1 BF: "없을 수 있음" → 건너뜀
   Tree1.2 BF: "있을 수 있음" → 디스크 접근 → 없음 (거짓 양성)
   Tree1.3 BF: "있을 수 있음" → 디스크 접근 → 찾음!

-- 삭제 처리:
DELETE key=42 → L0에 tombstone 삽입: (key=42, DELETE)
나중에 병합 시: (key=42, value=X) + (key=42, DELETE) → 둘 다 제거

-- 쓰기 증폭:
데이터 1회 삽입 → L0→L1 병합(1회 쓰기) → L1→L2 병합(1회 쓰기) → ...
총 디스크 쓰기 = O(레벨 수 × T) 배
```

## 관련 개념

- [Bloom Filter](/knowledge/database/bloom-filter/)
- [Parallel Key-Value Store](/knowledge/database/parallel-key-value-store/)
- [Extendable Hashing](/knowledge/database/extendable-hashing/)
- [Linear Hashing](/knowledge/database/linear-hashing/)
