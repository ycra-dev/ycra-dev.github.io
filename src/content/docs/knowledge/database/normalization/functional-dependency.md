---
title: "Functional Dependency"
description: "함수적 종속성(Functional Dependency)은 관계 스키마 r(R)에서 속성 집합 alpha가 속성 집합 beta의 값을 유일하게 결정하는 제약 조건으로, alpha -> beta로 표기하며, 모든 합법적 인스턴스에서 alpha 값이 같은 두 튜플은 반..."
tags: ['Functional Dependency', 'Normalization', 'Relational Design', 'Constraints']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/functional-dependency
sidebar:
  order: 1
---

## 핵심 개념

함수적 종속성은 관계형 데이터베이스 설계에서 가장 기본적인 제약 유형으로, 정규화 이론의 핵심 개념이다. 슈퍼키가 전체 튜플을 유일하게 식별하는 반면, 함수적 종속성은 특정 속성 값만을 유일하게 결정하므로 더 세밀한 제약을 표현할 수 있다.

슈퍼키는 함수적 종속성의 특수한 경우이다. K가 r(R)의 슈퍼키이면 함수적 종속성 K -> R이 성립한다. 함수적 종속성 alpha -> beta에서 beta가 alpha의 부분집합이면 자명한 함수적 종속성(trivial functional dependency)이라 한다.

함수적 종속성 집합 F가 주어졌을 때, F로부터 논리적으로 추론 가능한 모든 함수적 종속성의 집합을 F의 폐포(closure) F+라 한다. Armstrong의 공리(Axioms)를 사용하여 F+를 계산할 수 있다: 반사 규칙(reflexivity), 확장 규칙(augmentation), 이행 규칙(transitivity). 이 세 규칙은 건전(sound)하고 완전(complete)하다.

추가적인 유도 규칙으로 합집합 규칙(union rule), 분해 규칙(decomposition rule), 의사이행 규칙(pseudotransitivity rule)이 있으며, 이들은 Armstrong 공리로부터 증명 가능하다.

속성 집합 alpha의 폐포 alpha+는 F 하에서 alpha에 의해 함수적으로 결정되는 모든 속성의 집합이다. alpha+를 효율적으로 계산하는 알고리즘이 있으며, 이를 통해 슈퍼키 검증, 함수적 종속성 성립 여부 확인, F+ 계산 등을 수행할 수 있다.

## 예시

스키마 r(A, B, C, G, H, I)와 함수적 종속성 집합 F = {A -> B, A -> C, CG -> H, CG -> I, B -> H}:

```
-- A -> H는 F에 의해 논리적으로 함의됨 (이행 규칙: A -> B, B -> H => A -> H)
-- CG -> HI는 F에 의해 논리적으로 함의됨 (합집합 규칙)
-- AG -> I는 F에 의해 논리적으로 함의됨 (의사이행 규칙: A -> C, CG -> I => AG -> I)

-- (AG)+를 계산하는 과정:
-- 초기: result = AG
-- A -> B 적용: result = ABG
-- A -> C 적용: result = ABCG
-- CG -> H 적용: result = ABCGH
-- CG -> I 적용: result = ABCGHI
-- AG는 R의 슈퍼키 (모든 속성을 결정)
```

```sql
-- dept_name -> building, budget 함수적 종속성의 예
-- 같은 학과명이면 반드시 같은 건물과 예산을 가짐
SELECT dept_name, building, budget FROM department;
```

## 관련 개념

- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
- [Canonical Cover](/knowledge/database/canonical-cover/)
- [Decomposition](/knowledge/database/decomposition/)
- [Lossless-Join Decomposition](/knowledge/database/lossless-join-decomposition/)
