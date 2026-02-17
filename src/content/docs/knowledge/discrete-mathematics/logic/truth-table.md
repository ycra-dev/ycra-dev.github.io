---
title: "Truth Table"
description: "진리표(Truth Table)는 합성 명제를 구성하는 모든 명제 변수의 가능한 진리값 조합에 대해 해당 합성 명제의 진리값을 체계적으로 나열한 표이다"
tags: ['Truth Table', 'Propositional Logic', 'Evaluation', 'Compound Proposition']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/truth-table
sidebar:
  order: 3
---

## 핵심 개념

진리표는 논리학에서 합성 명제의 진리값을 결정하고, 논리적 동치를 확인하며, 논증의 타당성을 검증하는 핵심 도구이다.

n개의 명제 변수가 포함된 합성 명제의 진리표는 2^n개의 행을 가진다. 각 행은 명제 변수들의 진리값 조합 하나에 해당한다. 예를 들어, 2개의 변수(p, q)가 있으면 TT, TF, FT, FF의 4가지 조합으로 4행이 필요하고, 3개의 변수라면 8행이 필요하다.

진리표 구성 시, 합성 명제를 단계적으로 분해하여 각 부분 식(subexpression)의 진리값을 별도의 열에 기록한다. 최종 열에서 전체 합성 명제의 진리값을 구한다.

진리표의 주요 활용:
- **항진명제(tautology) 판별**: 모든 행에서 참인 합성 명제
- **모순(contradiction) 판별**: 모든 행에서 거짓인 합성 명제
- **논리적 동치 확인**: 두 합성 명제의 진리값 열이 동일한지 비교
- **만족가능성(satisfiability) 판단**: 참이 되는 진리값 할당이 존재하는지 확인
- **논증 타당성 검증**: 전제가 모두 참일 때 결론도 참인지 확인

변수가 많아지면(예: 20개 변수 → 2^20 = 1,048,576행) 진리표를 사용하는 것이 비실용적이므로, 논리적 동치 법칙이나 추론 규칙을 사용한 대안적 증명 방법이 필요하다.

## 예시

합성 명제 (p ∨ ¬q) → (p ∧ q)의 진리표:
```
p | q | ¬q | p ∨ ¬q | p ∧ q | (p ∨ ¬q) → (p ∧ q)
T | T |  F |    T   |   T   |         T
T | F |  T |    T   |   F   |         F
F | T |  F |    F   |   F   |         T
F | F |  T |    T   |   F   |         F
```

항진명제와 모순의 예:
```
p | ¬p | p ∨ ¬p | p ∧ ¬p
T |  F |    T   |    F     ← p ∨ ¬p는 항진명제, p ∧ ¬p는 모순
F |  T |    T   |    F
```

## 관련 개념

- [Proposition](/knowledge/mathematics/proposition/) - 진리표의 기본 단위인 명제
- [Logical Connective](/knowledge/mathematics/logical-connective/) - 진리표에서 평가되는 논리 연산자
- [Logical Equivalence](/knowledge/mathematics/logical-equivalence/) - 진리표를 통해 검증할 수 있는 동치 관계
- [Satisfiability](/knowledge/mathematics/satisfiability/) - 진리표를 통한 만족가능성 판단
