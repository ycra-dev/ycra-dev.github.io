---
title: "Query Optimization"
description: "쿼리 최적화(Query Optimization)란 주어진 쿼리를 평가하는 가장 비용이 적은 방법을 찾는 과정으로, 동치 규칙을 사용하여 다양한 평가 계획을 생성하고, 각 계획의 비용을 추정하여 최적의 계획을 선택하는 것을 의미한다"
tags: ['Query Optimization', 'Cost Based', 'Evaluation Plan', 'Database']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/query-optimization
sidebar:
  order: 10
---

## 핵심 개념

쿼리 최적화는 두 가지 주요 접근 방식이 있다.

**비용 기반 최적화(Cost-Based Optimization):** 가능한 모든(또는 다수의) 평가 계획을 생성하고, 각 계획의 비용을 추정한 후, 가장 비용이 적은 계획을 선택한다. 이를 위해 릴레이션의 통계 정보(튜플 수, 블록 수, 속성의 고유 값 수 등)와 히스토그램을 사용한다.

비용 기반 최적화의 핵심 과정은 다음과 같다:
1. 동치 규칙을 사용하여 동등한 관계 대수 표현식 생성
2. 각 표현식에 대해 물리적 연산자를 지정하여 평가 계획 생성
3. 통계 정보를 사용하여 각 계획의 비용 추정
4. 가장 비용이 적은 계획 선택

**동적 프로그래밍(Dynamic Programming):** 조인 순서 최적화에서 사용되는 핵심 기법이다. 릴레이션 부분집합에 대한 최적 조인 계획을 저장하고, 더 큰 부분집합의 최적 계획을 구축할 때 재사용한다. n개 릴레이션의 최적 조인 순서를 찾는 데 O(3^n) 시간이 소요된다. System R 옵티마이저는 left-deep 조인 순서만 고려하여 O(n * 2^n) 시간으로 줄인다.

**Interesting Sort Order:** 조인 결과의 정렬 순서가 후속 연산에 유용할 수 있으므로, 비용이 약간 더 높더라도 유용한 정렬 순서를 생성하는 계획을 고려한다.

최적화 비용 자체가 상당할 수 있으므로, 대부분의 시스템은 비용 예산을 설정하고 예산을 초과하면 그때까지 찾은 최선의 계획을 반환한다.

## 예시

```sql
SELECT name
FROM instructor NATURAL JOIN teaches NATURAL JOIN course
WHERE dept_name = 'Physics';
```

이 쿼리에 대해 옵티마이저가 고려하는 대안들:

```
계획 1: 먼저 selection 적용 후 조인
  Π_name(σ_{dept_name='Physics'}(instructor) ⋈ teaches ⋈ course)

계획 2: 조인 후 selection 적용
  Π_name(σ_{dept_name='Physics'}(instructor ⋈ teaches ⋈ course))

계획 3: 다른 조인 순서
  Π_name(σ_{dept_name='Physics'}((teaches ⋈ course) ⋈ instructor))
```

계획 1이 일반적으로 가장 효율적인데, selection을 먼저 수행하면 조인에 참여하는 튜플 수가 크게 줄기 때문이다.

## 관련 개념

- [Query Processing](/knowledge/database/query-processing/)
- [Equivalence Rules](/knowledge/database/equivalence-rules/)
- [Cost Estimation](/knowledge/database/cost-estimation/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
- [Join Ordering](/knowledge/database/join-ordering/)
- [Heuristic Optimization](/knowledge/database/heuristic-optimization/)
