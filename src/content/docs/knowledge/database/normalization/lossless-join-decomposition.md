---
title: "Lossless-Join Decomposition"
description: "무손실 조인 분해(Lossless-Join Decomposition)는 관계 R을 R1과 R2로 분해했을 때, R의 모든 합법적 인스턴스 r에 대해 r = Pi_R1(r) 자연조인 Pi_R2(r)이 성립하는 분해로, 분해 후 자연 조인으로 원래 관계를 정확히 복원..."
tags: ['Lossless Join', 'Decomposition', 'Normalization', 'Relational Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/lossless-join-decomposition
sidebar:
  order: 7
---

## 핵심 개념

무손실 분해는 정규화에서 가장 중요한 요구사항이다. 손실 분해(lossy decomposition)에서는 분해된 관계를 조인할 때 원래 없던 가짜 튜플(spurious tuples)이 생성되어 정보가 왜곡된다. "손실(lossy)"이라는 이름은 튜플이 줄어들어서가 아니라 오히려 늘어나서 정보가 손실되기 때문이다.

함수적 종속성을 사용하여 무손실 분해를 검증할 수 있다. R을 R1과 R2로 분해할 때, 다음 중 적어도 하나의 함수적 종속성이 F+에 있으면 무손실 분해이다: (1) R1 교집합 R2 -> R1, 또는 (2) R1 교집합 R2 -> R2. 즉, 두 스키마의 공통 속성이 R1 또는 R2의 슈퍼키를 형성하면 무손실 분해이다.

BCNF 분해 알고리즘에서, alpha -> beta를 위반하는 종속성으로 Ri를 (Ri - beta)와 (alpha, beta)로 분해할 때, (Ri - beta) 교집합 (alpha, beta) = alpha이고 alpha -> beta가 성립하므로 alpha -> (alpha, beta)이 성립하여 항상 무손실 분해가 된다.

무손실 분해 후 SQL에서의 제약 보장을 위해, R1 교집합 R2가 R1의 기본 키가 되어야 하고, R1 교집합 R2가 R2에서 R1을 참조하는 외래 키가 되어야 한다.

여러 스키마로의 동시 분해에 대한 무손실 검증은 더 복잡하며, 다중값 종속성 같은 다른 제약 유형도 무손실성을 보장할 수 있다.

## 예시

```
-- 무손실 분해의 예:
-- in_dep(ID, name, salary, dept_name, building, budget)
-- 분해: instructor(ID, name, dept_name, salary)
--       department(dept_name, building, budget)

-- 검증: instructor ∩ department = {dept_name}
-- dept_name -> building, budget (즉, dept_name -> department)
-- 따라서 무손실 분해!

-- 손실 분해의 예:
-- employee(ID, name, street, city, salary)
-- 분해: employee1(ID, name)
--       employee2(name, street, city, salary)

-- 검증: employee1 ∩ employee2 = {name}
-- name -> ID 성립하지 않음 (동명이인 가능)
-- name -> street, city, salary도 성립하지 않음
-- 따라서 손실 분해!
```

조인 시 동명이인의 정보가 섞여 원래 없던 조합이 생성된다.

## 관련 개념

- [Decomposition](/knowledge/database/decomposition/)
- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Dependency Preservation](/knowledge/database/dependency-preservation/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
