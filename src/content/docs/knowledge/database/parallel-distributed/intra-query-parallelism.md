---
title: "Intra-Query Parallelism"
description: "질의 내 병렬성(Intra-Query Parallelism)은 단일 질의의 실행을 여러 노드에서 동시에 수행하여 응답 시간을 단축하는 병렬 처리 방식이다"
tags: ['Intraoperation Parallelism', 'Interoperation Parallelism', 'Pipeline Parallelism', 'Parallel Execution']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/intra-query-parallelism
sidebar:
  order: 17
---

## 핵심 개념

**연산 내 병렬성(Intraoperation Parallelism)**: 단일 연산(정렬, 조인, 집계 등)을 여러 노드에 분배하여 병렬로 수행한다. 릴레이션의 튜플 수가 매우 클 수 있으므로, 병렬성의 정도가 잠재적으로 매우 크다. 데이터베이스 시스템에서 대규모 병렬성을 활용하는 핵심 수단이다.

예를 들어, 릴레이션 정렬 시 범위 파티셔닝으로 데이터를 분배한 후 각 노드에서 독립적으로 정렬하면, n개 노드로 약 n배의 속도 향상을 얻을 수 있다.

**연산 간 병렬성(Interoperation Parallelism)**: 질의 계획 트리의 서로 다른 연산을 동시에 실행한다. 두 가지 형태가 있다.
- **독립 병렬성(Independent Parallelism)**: 서로 의존 관계가 없는 연산을 별도 노드에서 동시에 실행한다. 예를 들어, 조인의 왼쪽 입력과 오른쪽 입력에 대한 선택 연산을 동시에 수행한다.
- **파이프라인 병렬성(Pipelined Parallelism)**: 한 연산의 출력을 생성되는 즉시 다음 연산의 입력으로 전달한다. 소비자와 생산자가 동시에 실행되어, 중간 결과를 디스크에 저장할 필요가 없다.

일반적인 질의에서 연산의 수는 적으므로, 연산 간 병렬성만으로는 대규모 병렬성을 달성하기 어렵다. 따라서 연산 내 병렬성이 확장성의 핵심이지만, 두 형태를 조합하여 사용한다. 특히 공유 메모리 시스템의 다중 코어 환경에서는 연산 간 병렬성도 중요하다.

**질의 간 병렬성(Interquery Parallelism)**: 여러 독립적인 질의를 동시에 실행하는 것으로, 트랜잭션 처리 시스템의 처리량 향상에 중요하다. 개별 질의의 응답 시간을 줄이지는 않지만, 전체 시스템의 처리량(throughput)을 높인다.

## 예시

```
-- 질의: SELECT dept_name, AVG(salary)
--       FROM instructor JOIN department USING(dept_name)
--       WHERE building = 'Watson'
--       GROUP BY dept_name

연산자 트리:
        GroupBy(AVG)
            |
          Join
         /     \
    Select      Scan
  (building=    (instructor)
   'Watson')
      |
    Scan
  (department)

== 연산 내 병렬성 ==
Join 연산: 4개 노드에서 파티션 조인
  Node 0: join(dept_part0, inst_part0)
  Node 1: join(dept_part1, inst_part1)
  Node 2: join(dept_part2, inst_part2)
  Node 3: join(dept_part3, inst_part3)

== 연산 간 병렬성 (독립) ==
Scan(department) → Select(building='Watson')  [Node A에서]
Scan(instructor)                               [Node B에서]
→ 두 연산이 동시에 실행

== 파이프라인 병렬성 ==
Scan(instructor) → [튜플 생성] → Join → [결과 생성] → GroupBy
  각 단계가 동시에 실행, 중간 결과가 즉시 전달됨
```

## 관련 개념

- [Parallel Sort](/knowledge/database/parallel-sort/)
- [Parallel Join](/knowledge/database/parallel-join/)
- [Exchange Operator](/knowledge/database/exchange-operator/)
- [Parallel Query Optimization](/knowledge/database/parallel-query-optimization/)
- [Parallel Database System](/knowledge/database/parallel-database-system/)
