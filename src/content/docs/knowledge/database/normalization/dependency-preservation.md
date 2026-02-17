---
title: "Dependency Preservation"
description: "종속성 보존(Dependency Preservation)은 관계 스키마 R의 분해 D = {R1, R2, "
tags: ['Dependency Preservation', 'Decomposition', 'Normalization', 'Functional Dependency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/dependency-preservation
sidebar:
  order: 8
---

## 핵심 개념

종속성 보존은 데이터베이스 갱신 시 제약 조건 검증의 효율성과 직결된다. 종속성이 보존되면 각 함수적 종속성을 단일 관계에서만 확인할 수 있으므로 조인 없이도 제약을 검증할 수 있다. 종속성이 보존되지 않으면 여러 관계를 조인한 후에야 일부 종속성을 확인할 수 있어 검증 비용이 크게 증가한다.

F의 Ri에 대한 제한(restriction) Fi는 F+에 속하면서 Ri의 속성만 포함하는 모든 함수적 종속성의 집합이다. 제한은 F가 아닌 F+를 사용하므로, F에 명시적으로 나타나지 않더라도 논리적으로 유도 가능한 종속성도 포함된다.

종속성 보존 여부를 검증하는 효율적인 알고리즘이 있다. F의 각 함수적 종속성 alpha -> beta에 대해, result를 alpha로 초기화하고, 각 Ri에 대해 (result 교집합 Ri)+를 계산하여 Ri와의 교집합을 result에 추가하는 과정을 result가 변하지 않을 때까지 반복한다. result가 beta의 모든 속성을 포함하면 해당 종속성이 보존된다. 이 알고리즘은 F+를 직접 계산하지 않아 다항 시간에 동작한다.

BCNF 분해는 항상 종속성을 보존하지는 않는다. 종속성 보존이 필요할 때는 3NF 분해를 선택할 수 있으며, 3NF 분해 알고리즘은 항상 무손실이면서 종속성을 보존하는 분해를 생성한다. 다만 SQL에서 임의의 함수적 종속성 검증이 어려우므로, 실무에서는 종속성 보존보다 BCNF를 선호하는 경우가 많다.

## 예시

```
-- dept_advisor(s_ID, i_ID, dept_name)
-- F: i_ID -> dept_name, s_ID dept_name -> i_ID

-- BCNF 분해: R1(s_ID, i_ID), R2(i_ID, dept_name)
-- R1의 제한: 빈 집합 (비자명 종속성 없음)
-- R2의 제한: i_ID -> dept_name
-- F' = {i_ID -> dept_name}
-- s_ID, dept_name -> i_ID는 R1에도 R2에도 완전히 포함되지 않음
-- F'+ ≠ F+ -> 종속성 보존 실패!

-- 종속성 보존 테스트 (s_ID, dept_name -> i_ID):
-- result = {s_ID, dept_name}
-- R1 = {s_ID, i_ID}: result ∩ R1 = {s_ID}, s_ID+ = {s_ID} -> 추가 없음
-- R2 = {i_ID, dept_name}: result ∩ R2 = {dept_name}, dept_name+ = {dept_name}
-- -> result에 변화 없음, i_ID를 포함하지 않음 -> 보존 실패
```

## 관련 개념

- [Decomposition](/knowledge/database/decomposition/)
- [Lossless-Join Decomposition](/knowledge/database/lossless-join-decomposition/)
- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Canonical Cover](/knowledge/database/canonical-cover/)
