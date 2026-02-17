---
title: "Boyce-Codd Normal Form"
description: "보이스-코드 정규형(Boyce-Codd Normal Form, BCNF)은 관계 스키마 R이 함수적 종속성 집합 F에 대해, F+의 모든 비자명 함수적 종속성 alpha -> beta에서 alpha가 반드시 R의 슈퍼키여야 하는 정규형으로, 함수적 종속성에 기반한..."
tags: ['Bcnf', 'Normalization', 'Relational Design', 'Functional Dependency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/boyce-codd-normal-form
sidebar:
  order: 5
---

## 핵심 개념

BCNF는 함수적 종속성으로 발견할 수 있는 모든 중복을 제거하는 가장 바람직한 정규형이다. BCNF의 정의는 간단하다: F+의 모든 함수적 종속성 alpha -> beta에 대해, (1) alpha -> beta가 자명하거나 (2) alpha가 슈퍼키여야 한다.

BCNF 위반 여부를 검사할 때, F+의 모든 종속성을 검사하는 대신 F의 종속성만 검사하면 충분하다. 그러나 분해된 하위 스키마에 대해서는 F의 종속성만으로 부족할 수 있으며, F+에 속하는 추가 종속성을 고려해야 한다. 대안적 검사 방법으로, 하위 스키마 Ri의 모든 속성 부분집합 alpha에 대해 alpha+가 Ri - alpha의 어떤 속성도 포함하지 않거나 Ri의 모든 속성을 포함하는지 확인할 수 있다.

BCNF 분해 알고리즘은 위반하는 함수적 종속성을 사용하여 스키마를 반복적으로 분해한다. alpha -> beta가 BCNF를 위반하면, Ri를 (alpha 합집합 beta)와 (Ri - (beta - alpha))로 분해한다. 이 알고리즘은 무손실 분해를 보장하지만, 종속성 보존을 항상 보장하지는 않는다.

BCNF의 주요 한계는 일부 경우에 종속성 보존 분해가 불가능하다는 것이다. 이런 상황에서는 3NF로 타협하거나, BCNF를 선택하고 종속성 검증을 조인을 통해 수행해야 한다. 또한 다중값 종속성(multivalued dependency)에 의한 중복은 BCNF로도 제거할 수 없으며, 이를 위해 제4정규형(4NF)이 필요하다.

## 예시

```
-- BCNF가 아닌 관계:
-- in_dep(ID, name, salary, dept_name, building, budget)
-- 함수적 종속성: dept_name -> building, budget
-- dept_name은 슈퍼키가 아님 -> BCNF 위반

-- BCNF 분해:
-- alpha = dept_name, beta = {building, budget}
-- (alpha ∪ beta) = department(dept_name, building, budget)
-- (R - (beta - alpha)) = instructor(ID, name, dept_name, salary)
```

```sql
-- 분해 결과:
CREATE TABLE department (
    dept_name VARCHAR(20) PRIMARY KEY,
    building VARCHAR(15),
    budget NUMERIC(12,2)
);

CREATE TABLE instructor (
    ID VARCHAR(5) PRIMARY KEY,
    name VARCHAR(20),
    dept_name VARCHAR(20),
    salary NUMERIC(8,2),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);
-- 두 관계 모두 BCNF를 만족
```

## 관련 개념

- [Third Normal Form](/knowledge/database/third-normal-form/)
- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Decomposition](/knowledge/database/decomposition/)
- [Lossless-Join Decomposition](/knowledge/database/lossless-join-decomposition/)
- [Dependency Preservation](/knowledge/database/dependency-preservation/)
- [Canonical Cover](/knowledge/database/canonical-cover/)
