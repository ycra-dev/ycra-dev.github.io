---
title: "Materialized View"
description: "실체화된 뷰(Materialized View)는 뷰의 내용을 미리 계산하여 저장해 두는 뷰로, 쿼리 시 뷰 정의를 다시 실행하지 않고 저장된 결과를 직접 읽어 쿼리 성능을 크게 향상시킬 수 있다"
tags: ['Materialized View', 'View Maintenance', 'Incremental Maintenance', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/materialized-view
sidebar:
  order: 15
---

## 핵심 개념

일반 뷰는 쿼리 정의만 저장하고 사용 시마다 재계산하지만, 실체화된 뷰는 결과 데이터 자체를 저장한다. 이는 중복 데이터이지만, 자주 사용되는 복잡한 집계나 조인 결과를 빠르게 제공할 수 있다.

**뷰 유지보수(View Maintenance):**
실체화된 뷰의 핵심 과제는 기본 릴레이션이 변경될 때 뷰를 최신 상태로 유지하는 것이다.

**증분 뷰 유지보수(Incremental View Maintenance):**
전체를 재계산하는 대신 변경된 부분만 반영한다:

- **조인:** v = r ⋈ s일 때, r에 i_r이 삽입되면 `v_new = v_old ∪ (i_r ⋈ s)`, r에서 d_r이 삭제되면 `v_new = v_old - (d_r ⋈ s)`

- **Selection:** v = σ_θ(r)일 때, 삽입/삭제된 튜플에 선택 조건을 적용하여 뷰에 추가/삭제

- **Projection:** 같은 값이 여러 소스에서 파생될 수 있으므로 카운트를 유지해야 한다

- **집계 연산:**
  - count, sum: 삽입/삭제 시 직접 업데이트 가능
  - avg: sum과 count를 별도로 유지하고, 평균은 sum/count로 계산
  - min, max: 삽입은 쉽지만, 최솟값/최댓값 삭제 시 다른 튜플을 조회해야 할 수 있음

**즉시 vs 지연 유지보수:**
- 즉시 유지보수(Immediate): 업데이트 트랜잭션의 일부로 뷰를 즉시 갱신
- 지연 유지보수(Deferred): 업데이트를 모아두었다가 나중에 일괄 적용 (예: 야간 배치)

**쿼리 최적화와 실체화된 뷰:**
옵티마이저는 쿼리가 실체화된 뷰를 사용하도록 재작성하여 비용을 줄일 수 있다. 반대로, 실체화된 뷰에 적절한 인덱스가 없으면 뷰 정의로 대체하여 기본 릴레이션의 인덱스를 활용하는 것이 더 효율적일 수도 있다.

## 예시

학과별 총 급여를 나타내는 실체화된 뷰:

```sql
CREATE VIEW department_total_salary(dept_name, total_salary) AS
  SELECT dept_name, SUM(salary)
  FROM instructor
  GROUP BY dept_name;
```

instructor에 새 튜플 ('CS', 85000) 삽입 시 증분 유지보수:
```
1. 실체화된 뷰에서 dept_name='CS' 그룹을 찾음
2. 해당 그룹의 total_salary에 85000을 더함
3. count를 1 증가

전체 재계산 없이 O(1)에 뷰 갱신 완료
```

v = r ⋈ s에서 r에 튜플 집합 i_r 삽입 시:
```
새로운 결과 = 기존 뷰 ∪ (i_r ⋈ s)
→ i_r ⋈ s만 계산하면 됨 (전체 r ⋈ s 재계산 불필요)
```

## 관련 개념

- [Query Optimization](/knowledge/database/query-optimization/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
- [Cost Estimation](/knowledge/database/cost-estimation/)
- [Heuristic Optimization](/knowledge/database/heuristic-optimization/)
