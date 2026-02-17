---
title: "Equivalence Rules"
description: "동치 규칙(Equivalence Rules)은 관계 대수 표현식을 동등한 다른 표현식으로 변환할 수 있는 규칙들의 집합으로, 쿼리 옵티마이저가 더 효율적인 쿼리 계획을 탐색하는 데 사용된다"
tags: ['Equivalence Rules', 'Relational Algebra', 'Query Transformation', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/equivalence-rules
sidebar:
  order: 11
---

## 핵심 개념

주요 동치 규칙은 다음과 같다:

**Selection 관련 규칙:**
1. **Selection 분해:** `σ_{θ1∧θ2}(E) ≡ σ_{θ1}(σ_{θ2}(E))` - 결합 선택을 연속 선택으로 분해
2. **Selection 교환:** `σ_{θ1}(σ_{θ2}(E)) ≡ σ_{θ2}(σ_{θ1}(E))` - 선택 순서 교환 가능
3. **Selection과 조인의 상호작용:** 선택 조건이 한쪽 릴레이션의 속성만 참조하면 조인 아래로 내릴 수 있다: `σ_{θ1}(E1 ⋈ E2) ≡ σ_{θ1}(E1) ⋈ E2` (θ1이 E1의 속성만 참조할 때)

**조인 관련 규칙:**
4. **조인 교환법칙:** `E1 ⋈_θ E2 ≡ E2 ⋈_θ E1`
5. **조인 결합법칙:** `(E1 ⋈ E2) ⋈ E3 ≡ E1 ⋈ (E2 ⋈ E3)` - 자연 조인과 세타 조인에 적용
6. **세타 조인의 결합법칙:** 조인 조건이 적절히 분리 가능한 경우에 성립

**Projection 관련 규칙:**
7. **Projection의 연속:** 불필요한 중간 projection 제거 가능
8. **Selection과 Projection의 상호작용:** selection 조건에 사용되는 속성을 포함하면 projection과 selection 순서 교환 가능

**집합 연산 규칙:**
9. 합집합, 교집합의 교환법칙과 결합법칙
10. Selection이 집합 연산을 통과할 수 있는 규칙

동치 규칙 체계를 사용하면 주어진 표현식에서 도달 가능한 모든 동등한 표현식을 체계적으로 생성할 수 있다. 물리적 동치 규칙(physical equivalence rules)을 추가하면 논리 연산(예: 조인)을 물리 연산(예: 해시 조인, 중첩 루프 조인)으로 변환하여 모든 가능한 평가 계획을 생성할 수 있다.

## 예시

다음 쿼리의 동치 변환 예시:

```sql
SELECT name FROM instructor NATURAL JOIN department
WHERE building = 'Watson';
```

원래 표현식:
```
Π_name(σ_{building='Watson'}(instructor ⋈ department))
```

Selection 푸시다운 적용:
```
Π_name(instructor ⋈ σ_{building='Watson'}(department))
```

building은 department의 속성이므로 selection을 조인 아래로 내릴 수 있다. 이렇게 하면 department에서 먼저 Watson 건물인 학과만 필터링하여 조인에 참여하는 튜플 수를 줄인다.

조인 교환법칙 적용:
```
Π_name(σ_{building='Watson'}(department) ⋈ instructor)
```

## 관련 개념

- [Query Optimization](/knowledge/database/query-optimization/)
- [Heuristic Optimization](/knowledge/database/heuristic-optimization/)
- [Cost Estimation](/knowledge/database/cost-estimation/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
