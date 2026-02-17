---
title: "Third Normal Form"
description: "제3정규형(Third Normal Form, 3NF)은 관계 스키마 R이 함수적 종속성 집합 F에 대해, F+의 모든 함수적 종속성 alpha -> beta에서 (1) alpha -> beta가 자명하거나, (2) alpha가 R의 슈퍼키이거나, (3) beta ..."
tags: ['Third Normal Form', '3nf', 'Normalization', 'Relational Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/third-normal-form
sidebar:
  order: 4
---

## 핵심 개념

3NF는 BCNF보다 약한 정규형으로, BCNF의 처음 두 조건에 세 번째 조건(후보 키에 포함)을 추가한 것이다. 이 세 번째 조건은 BCNF와 달리 항상 종속성 보존 분해(dependency-preserving decomposition)를 보장한다는 점에서 실용적 가치가 있다.

BCNF를 만족하는 모든 관계는 자동으로 3NF도 만족한다. 그러나 3NF를 만족하면서 BCNF를 만족하지 않는 관계가 존재할 수 있다. 이 경우 3NF는 약간의 정보 중복을 허용하는 대신 종속성 보존을 보장한다.

3NF 분해 알고리즘은 정준 커버(canonical cover)를 기반으로 한다. 알고리즘은 다음 단계로 진행된다: (1) F의 정준 커버 Fc를 계산한다, (2) Fc의 각 함수적 종속성 alpha -> beta에 대해 스키마 (alpha, beta)를 결과에 추가한다, (3) 결과의 어떤 스키마도 F의 후보 키를 포함하지 않으면 후보 키를 포함하는 스키마를 추가한다. 이 알고리즘은 무손실성과 종속성 보존을 모두 보장한다.

데이터베이스 설계의 목표는 BCNF, 무손실 분해, 종속성 보존 세 가지이다. 세 가지를 모두 만족시킬 수 없을 때, BCNF와 종속성 보존(3NF) 사이에서 선택해야 한다. SQL에서 임의의 함수적 종속성을 효율적으로 검증하기 어렵기 때문에, 실무에서는 종속성 보존이 불가능하더라도 BCNF를 선택하는 경우가 많다.

## 예시

```
-- dept_advisor(s_ID, i_ID, dept_name)
-- 함수적 종속성: i_ID -> dept_name, s_ID dept_name -> i_ID
-- 후보 키: {s_ID, dept_name} 및 {s_ID, i_ID}

-- i_ID -> dept_name에서:
-- i_ID는 슈퍼키가 아님 (BCNF 위반)
-- 하지만 dept_name은 후보 키 {s_ID, dept_name}에 포함 (3NF 조건 3 만족)
-- 따라서 dept_advisor는 3NF를 만족하지만 BCNF는 만족하지 않음

-- BCNF 분해: (s_ID, i_ID)와 (i_ID, dept_name)
-- 이 분해는 s_ID, dept_name -> i_ID를 보존하지 못함

-- 3NF에서는 dept_advisor를 분해하지 않고 그대로 유지 가능
```

## 관련 개념

- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Dependency Preservation](/knowledge/database/dependency-preservation/)
- [Canonical Cover](/knowledge/database/canonical-cover/)
- [Decomposition](/knowledge/database/decomposition/)
- [Second Normal Form](/knowledge/database/second-normal-form/)
