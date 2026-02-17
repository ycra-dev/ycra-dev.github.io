---
title: "Pipelining"
description: "파이프라이닝(Pipelining)은 여러 관계 연산을 파이프라인으로 결합하여, 한 연산의 결과를 중간 임시 릴레이션으로 저장하지 않고 바로 다음 연산에 전달하는 쿼리 평가 기법이다"
tags: ['Pipelining', 'Query Evaluation', 'Materialization', 'Iterator']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/pipelining
sidebar:
  order: 8
---

## 핵심 개념

쿼리 평가 방법은 크게 두 가지로 나뉜다.

**실체화(Materialization):** 표현식 트리의 가장 낮은 수준 연산부터 시작하여 각 중간 결과를 임시 릴레이션으로 디스크에 저장한다. 상위 연산은 이 임시 릴레이션을 입력으로 사용한다. 이 방식은 이해하기 쉽지만 임시 릴레이션의 디스크 쓰기/읽기 비용이 추가된다.

**파이프라이닝:** 여러 연산을 파이프라인으로 연결하여 중간 결과를 즉시 다음 연산에 전달한다. 두 가지 주요 이점이 있다:
1. 임시 릴레이션의 읽기/쓰기 비용을 제거하여 전체 비용을 줄인다.
2. 루트 연산부터 결과를 빠르게 생성할 수 있어 사용자에게 응답 시간이 단축된다.

**파이프라이닝 구현 방식:**

*요구 기반 파이프라인(Demand-Driven Pipeline):* 파이프라인 최상위 연산에서 반복적으로 튜플을 요청한다. 각 연산은 **이터레이터(Iterator)** 인터페이스를 구현하며 `open()`, `next()`, `close()` 함수를 제공한다. `next()` 호출 시 다음 결과 튜플을 반환하며, 필요하면 하위 입력의 `next()`를 호출한다.

*생산자 기반 파이프라인(Producer-Driven Pipeline):* 연산이 요청을 기다리지 않고 적극적으로 튜플을 생성한다. 인접한 연산 사이에 버퍼를 두고, 각 연산은 별도 프로세스/스레드로 동시 실행된다. 병렬 처리 시스템에서 유용하다.

**파이프라인 스테이지:** 쿼리 계획은 파이프라인 에지(pipelined edge)와 블로킹 에지(blocking/materialized edge)로 구분된다. 파이프라인 에지로 연결된 연산들은 동시 실행되며, 이들의 집합을 파이프라인 스테이지라 한다. 정렬과 같은 **블로킹 연산**은 입력을 모두 처리해야 출력을 시작할 수 있다.

## 예시

다음 쿼리의 평가를 고려하자:

```sql
SELECT name
FROM department NATURAL JOIN instructor
WHERE building = 'Watson';
```

실체화 방식:
```
1. σ_{building='Watson'}(department) → 임시 릴레이션 temp1 (디스크에 저장)
2. temp1 ⋈ instructor → 임시 릴레이션 temp2 (디스크에 저장)
3. Π_{name}(temp2) → 최종 결과
```

파이프라이닝 방식:
```
1. department에서 building='Watson'인 튜플 발견 시 즉시 조인 연산에 전달
2. 조인에서 매칭 튜플 발견 시 즉시 projection에 전달
3. projection 결과를 바로 출력
→ 중간 임시 릴레이션 불필요!
```

해시 조인의 경우 3개의 서브연산으로 분리된다:
- 분할(Partitioning) 단계: 입력에서 파이프라인 가능
- 빌드-프로브(Build-Probe) 단계: 출력을 파이프라인 가능
- 분할→빌드-프로브 사이는 블로킹 에지

## 관련 개념

- [Query Processing](/knowledge/database/query-processing/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
- [Hash Join](/knowledge/database/hash-join/)
- [External Sort-Merge](/knowledge/database/external-sort-merge/)
