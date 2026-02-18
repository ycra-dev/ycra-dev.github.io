---
title: "Query Processor"
description: "질의 처리기(Query Processor)는 데이터베이스 시스템에서 데이터 접근을 단순화하고 원활하게 하며, 사용자가 물리적 수준의 세부사항을 이해하지 않고도 좋은 성능을 얻을 수 있도록 하는 구성요소이다"
tags: ['Query Processor', 'Query Optimization', 'Ddl Interpreter', 'Dml Compiler']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/query-processor
sidebar:
  order: 6
---

## 핵심 개념

질의 처리기는 비절차적 언어로 작성된 갱신과 질의를 논리적 수준에서 물리적 수준의 효율적인 연산 순서로 변환하는 역할을 한다. 질의 처리기는 세 가지 주요 구성요소로 이루어진다.

DDL 인터프리터(DDL Interpreter)는 DDL 문을 해석하고 정의를 데이터 사전에 기록한다. 데이터 사전에는 테이블 구조, 제약 조건, 권한 정보 등 메타데이터가 저장된다.

DML 컴파일러(DML Compiler)는 질의 언어의 DML 문을 질의 평가 엔진이 이해할 수 있는 저수준 명령어로 구성된 평가 계획(evaluation plan)으로 변환한다. 하나의 질의는 여러 대안적 평가 계획으로 변환될 수 있으며, DML 컴파일러는 질의 최적화(query optimization)를 수행하여 가장 비용이 낮은 평가 계획을 선택한다.

질의 평가 엔진(Query Evaluation Engine)은 DML 컴파일러가 생성한 저수준 명령어를 실행한다.

질의 최적화는 질의 처리기의 핵심 기능 중 하나로, 동일한 결과를 반환하는 여러 대안적 평가 전략 중에서 가장 효율적인 것을 선택하는 과정이다. 이를 통해 사용자는 효율성을 고려하지 않고 논리적 수준에서 질의를 작성할 수 있다.

## 예시

다음 SQL 질의가 질의 처리기를 통해 처리되는 과정:

```sql
select instructor.ID, department.dept_name
from instructor, department
where instructor.dept_name = department.dept_name
  and department.budget > 95000;
```

1. DDL 인터프리터: instructor와 department 테이블의 메타데이터를 데이터 사전에서 확인
2. DML 컴파일러: 여러 평가 계획 생성 후 최적의 계획 선택 (예: 인덱스 활용 여부 결정)
3. 질의 평가 엔진: 최적화된 계획에 따라 실제 데이터를 검색하고 결과 반환

## 관련 개념

- [Storage Manager](/knowledge/database/storage-manager/)
