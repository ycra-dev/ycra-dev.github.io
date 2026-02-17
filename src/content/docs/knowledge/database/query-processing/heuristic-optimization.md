---
title: "Heuristic Optimization"
description: "휴리스틱 최적화(Heuristic Optimization)는 비용 기반 최적화의 계산 부담을 줄이기 위해 경험적 규칙을 사용하여 쿼리 변환을 수행하는 방식으로, 비용 추정 없이도 일반적으로 좋은 성능을 제공하는 변환을 적용한다"
tags: ['Heuristic Optimization', 'Selection Pushdown', 'Query Transformation', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/heuristic-optimization
sidebar:
  order: 14
---

## 핵심 개념

**주요 휴리스틱 규칙:**

1. **Selection을 가능한 한 빨리 수행(Perform selections early):** 가장 중요한 휴리스틱으로, selection을 쿼리 트리의 하단으로 이동시켜 조인에 참여하는 튜플 수를 줄인다. selection은 릴레이션 크기를 크게 줄일 수 있으며 인덱스 사용도 가능하게 한다.

2. **Projection을 가능한 한 빨리 수행(Perform projections early):** 불필요한 속성을 일찍 제거하여 중간 결과의 크기를 줄인다. 보통 selection이 projection보다 먼저 수행되어야 한다.

3. **카르테시안 곱 회피(Avoid Cartesian products):** 조인 조건이 없는 카르테시안 곱은 매우 비싸므로 가능한 피한다.

**휴리스틱의 한계:**
휴리스틱은 항상 최적을 보장하지는 않는다. 예를 들어, selection을 조인 전에 수행하면 대부분 유리하지만, 외부 릴레이션이 매우 작고 내부 릴레이션에 조인 속성 인덱스가 있지만 selection 속성에는 인덱스가 없는 경우, selection을 먼저 수행하면 전체 스캔이 필요하여 오히려 비용이 증가할 수 있다.

**실용적 접근:**
대부분의 상용 시스템은 휴리스틱과 비용 기반 최적화를 결합한다:
- 조인 이외의 연산에는 휴리스틱 변환 적용
- 조인 순서에는 비용 기반 동적 프로그래밍 적용

**Plan Caching:** 같은 쿼리가 상수 값만 바뀌어 반복 실행될 때, 처음 최적화된 계획을 캐시하여 재사용한다. 이는 최적화 비용을 크게 줄이지만, 상수 값에 따라 최적 계획이 달라지면 비효율적일 수 있다.

**비용 예산(Cost Budget):** 대부분의 옵티마이저는 최적화에 비용 예산을 설정한다. 저렴한 계획이 발견되면 예산을 줄이고, 비싼 계획만 발견되면 예산을 늘려 최적화에 더 많은 시간을 투자한다.

## 예시

다음 쿼리의 휴리스틱 최적화:

```sql
SELECT name
FROM instructor, teaches, course
WHERE instructor.ID = teaches.ID
  AND teaches.course_id = course.course_id
  AND dept_name = 'Physics';
```

최적화 전:
```
Π_name(σ_{dept_name='Physics' ∧ instructor.ID=teaches.ID
  ∧ teaches.course_id=course.course_id}
  (instructor × teaches × course))
```

휴리스틱 적용 후:
```
1. Selection 분해 및 푸시다운:
   Π_name(
     σ_{dept_name='Physics'}(instructor)
     ⋈_{ID} teaches
     ⋈_{course_id} course
   )

2. 카르테시안 곱 → 조인으로 변환 (이미 적용됨)

3. 불필요한 속성 일찍 제거:
   Π_name(
     Π_{ID,name}(σ_{dept_name='Physics'}(instructor))
     ⋈_{ID} Π_{ID,course_id}(teaches)
     ⋈_{course_id} course
   )
```

## 관련 개념

- [Query Optimization](/knowledge/database/query-optimization/)
- [Equivalence Rules](/knowledge/database/equivalence-rules/)
- [Cost Estimation](/knowledge/database/cost-estimation/)
- [Join Ordering](/knowledge/database/join-ordering/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
