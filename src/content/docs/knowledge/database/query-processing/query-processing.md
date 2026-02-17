---
title: "Query Processing"
description: "쿼리 처리(Query Processing)란 데이터베이스에서 데이터를 추출하기 위한 일련의 활동을 의미하며, 고수준 데이터베이스 언어의 쿼리를 물리적 파일 시스템 수준에서 사용할 수 있는 표현식으로 변환하고, 다양한 쿼리 최적화 변환을 거쳐 실제 쿼리를 평가하는 ..."
tags: ['Query Processing', 'Database', 'Query Evaluation', 'Relational Algebra']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/query-processing
sidebar:
  order: 1
---

## 핵심 개념

쿼리 처리의 기본 단계는 세 가지로 구성된다. 첫째, **파싱과 번역(Parsing and Translation)** 단계에서 SQL과 같은 고수준 언어를 확장 관계 대수(extended relational algebra) 기반의 내부 표현으로 변환한다. 파서는 사용자 쿼리의 구문을 검사하고, 쿼리에 나타나는 릴레이션 이름이 데이터베이스에 존재하는지 확인한다. 뷰를 사용하는 경우, 뷰를 정의하는 관계 대수 표현식으로 대체한다.

둘째, **최적화(Optimization)** 단계에서는 주어진 쿼리에 대해 여러 가지 계산 방법 중 가장 비용이 적은 방법을 선택한다. 동일한 SQL 쿼리도 여러 관계 대수 표현으로 변환될 수 있으며, 각 표현은 다시 여러 알고리즘으로 실행될 수 있다. 쿼리 평가 비용을 최소화하는 쿼리 평가 계획을 선택하는 것이 이 단계의 목표이다.

셋째, **평가(Evaluation)** 단계에서 선택된 쿼리 평가 계획을 실제로 실행하여 결과를 출력한다.

관계 대수 연산에 실행 방법을 지정하는 주석을 단 것을 **평가 프리미티브(evaluation primitive)**라 하며, 쿼리를 평가할 수 있는 프리미티브 연산의 시퀀스를 **쿼리 실행 계획(query-execution plan)** 또는 **쿼리 평가 계획(query-evaluation plan)**이라 한다.

## 예시

다음 SQL 쿼리를 고려하자:

```sql
SELECT salary
FROM instructor
WHERE salary < 75000;
```

이 쿼리는 두 가지 관계 대수 표현으로 변환될 수 있다:

1. `σ_{salary<75000}(Π_{salary}(instructor))` - 먼저 projection 후 selection
2. `Π_{salary}(σ_{salary<75000}(instructor))` - 먼저 selection 후 projection

두 번째 표현이 일반적으로 더 효율적인데, selection을 먼저 수행하면 처리할 튜플 수가 줄어들기 때문이다. 또한 salary 속성에 B+-tree 인덱스가 있다면, 선형 스캔 대신 인덱스를 사용하여 더 효율적으로 실행할 수 있다.

## 관련 개념

- [Query Cost](/knowledge/database/query-cost/)
- [Selection Operation](/knowledge/database/selection-operation/)
- [Query Optimization](/knowledge/database/query-optimization/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
- [Pipelining](/knowledge/database/pipelining/)
