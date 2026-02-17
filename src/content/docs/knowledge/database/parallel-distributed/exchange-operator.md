---
title: "Exchange Operator"
description: "교환 연산자(Exchange Operator)는 병렬 질의 실행에서 노드 간 데이터 재분배를 담당하는 특수 연산자이다"
tags: ['Parallel Query Processing', 'Data Repartitioning', 'Volcano', 'Pipeline Parallelism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/exchange-operator
sidebar:
  order: 16
---

## 핵심 개념

교환 연산자는 Volcano 병렬 질의 처리 시스템에서 처음 도입되었다. 핵심 아이디어는 병렬화 로직을 질의 처리 로직과 분리하는 것이다.

**동작 방식**:
- 송신 측(sender): 입력 튜플을 파티셔닝 함수에 따라 적절한 목적지 노드로 전송한다.
- 수신 측(receiver): 다른 노드에서 전송된 튜플을 수신하여 상위 연산자에 전달한다.
- 송신과 수신이 병렬로 동작하여 파이프라인 병렬성을 구현한다.

**교환 연산자의 세 가지 변형**:
1. **재파티셔닝(Repartition)**: 해시나 범위 기반으로 튜플을 다른 노드들에 재분배한다. 병렬 조인이나 병렬 정렬 전에 데이터를 적절히 분배하는 데 사용된다.
2. **비파티셔닝 병합(Unpartitioned Merge)**: 여러 노드의 결과를 하나의 노드로 모은다. 최종 결과를 수집하거나 집계에 사용된다.
3. **정렬 병합(Ordered Merge)**: 여러 노드의 정렬된 결과를 병합하여 전체적으로 정렬된 결과를 생성한다.

교환 연산자의 장점은 모듈성이다. 기존의 정렬, 조인, 선택 등의 연산자는 수정 없이 그대로 사용하고, 교환 연산자를 질의 계획 트리에 삽입함으로써 병렬 실행을 달성한다. 이를 통해 순차적 질의 최적화기의 결과에 교환 연산자를 추가하는 방식으로 병렬 질의 계획을 생성할 수 있다.

## 예시

```
-- 순차 질의 계획:
    Project
      |
    Join (r.A = s.A)
    /         \
  Scan(r)    Scan(s)

-- 교환 연산자를 삽입한 병렬 질의 계획:
         Project
           |
    Exchange(Merge)     ← 결과를 한 노드로 수집
           |
    Join (r.A = s.A)    ← 각 노드에서 로컬 조인
    /              \
Exchange(Hash A)  Exchange(Hash A)  ← A 기준 해시 재분배
    |                |
  Scan(r)          Scan(s)          ← 각 노드에서 로컬 스캔

-- 실행 흐름 (3개 노드):
Node 0: Scan(r0) → Exchange 송신 → Exchange 수신 → Join → Exchange 송신
Node 1: Scan(r1) → Exchange 송신 → Exchange 수신 → Join → Exchange 송신
Node 2: Scan(r2) → Exchange 송신 → Exchange 수신 → Join → Exchange 송신
                                                          ↓
                                              최종 노드: Exchange 수신 → Project
```

## 관련 개념

- [Parallel Join](/knowledge/database/parallel-join/)
- [Parallel Sort](/knowledge/database/parallel-sort/)
- [Intra-Query Parallelism](/knowledge/database/intra-query-parallelism/)
- [Parallel Query Optimization](/knowledge/database/parallel-query-optimization/)
