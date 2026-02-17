---
title: "Cost Estimation"
description: "비용 추정(Cost Estimation)은 쿼리 최적화 과정에서 각 연산과 전체 평가 계획의 실행 비용을 예측하는 과정으로, 릴레이션의 통계 정보를 기반으로 결과 크기를 추정하고 이를 통해 디스크 접근 비용을 계산한다"
tags: ['Cost Estimation', 'Statistics', 'Histogram', 'Selectivity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/cost-estimation
sidebar:
  order: 12
---

## 핵심 개념

비용 추정을 위해 데이터베이스 시스템은 각 릴레이션에 대한 통계 정보를 카탈로그에 저장한다:
- **n_r**: 릴레이션 r의 튜플 수
- **b_r**: 릴레이션 r의 블록 수
- **l_r**: 릴레이션 r의 튜플 크기(바이트)
- **f_r**: 블로킹 팩터(한 블록에 담기는 튜플 수)
- **V(A, r)**: 릴레이션 r에서 속성 A의 고유 값 수

**Selection 크기 추정:**
- 동등 조건 `σ_{A=v}(r)`: 결과 크기 ≈ n_r / V(A, r)
- 비교 조건 `σ_{A≤v}(r)`: 균등 분포 가정 시, (v - min(A, r)) / (max(A, r) - min(A, r)) * n_r
- 결합 조건: 각 조건의 선택도(selectivity)를 곱하여 추정 (독립성 가정)
- 이접 조건: 포함-배제 원리로 추정

**조인 크기 추정:**
- 공통 속성이 없으면: n_r * n_s (카르테시안 곱)
- R ∩ S가 R의 키인 경우: 결과 ≤ n_s
- R ∩ S가 S에서 R을 참조하는 외래 키인 경우: 결과 = n_s
- 일반적인 경우: n_r * n_s / V(A, s) 또는 n_r * n_s / V(A, r) 중 작은 값

**히스토그램(Histogram):**
실제 데이터는 균등 분포가 아닌 경우가 많다. 히스토그램은 속성 값의 범위를 구간으로 나누고 각 구간의 값 수를 기록하여 더 정확한 추정을 가능하게 한다. 등-깊이 히스토그램(equi-depth histogram)이 가장 널리 사용되며, 각 구간에 거의 같은 수의 값이 들어간다. 히스토그램은 샘플링을 통해 계산되는 경우가 많다.

**고유 값 수 추정:** 조인이나 selection 후 결과의 고유 값 수 추정도 중요하다. 보통 min(V(A, r), n_{σ(r)})로 추정한다.

## 예시

instructor 릴레이션에서 n_r = 5000, V(dept_name, instructor) = 20일 때:

```
σ_{dept_name='Physics'}(instructor)의 결과 크기 추정:
  = n_r / V(dept_name, instructor)
  = 5000 / 20 = 250 튜플

instructor ⋈ teaches 자연 조인 크기 추정:
  n_instructor = 5000, n_teaches = 10000
  V(ID, instructor) = 5000  (ID는 키)

  조인 결과 ≤ n_teaches = 10000  (ID는 instructor의 키)
```

히스토그램을 사용한 보다 정확한 추정:
```
salary의 히스토그램이 다음과 같다면:
  [40000, 60000): 1500명
  [60000, 80000): 2000명
  [80000, 100000): 1500명

σ_{salary < 70000}(instructor):
  [40000, 60000) 구간: 1500명 전부
  [60000, 70000) 구간: 2000 * (70000-60000)/(80000-60000) = 1000명
  추정 결과 = 1500 + 1000 = 2500 튜플
```

## 관련 개념

- [Query Optimization](/knowledge/database/query-optimization/)
- [Equivalence Rules](/knowledge/database/equivalence-rules/)
- [Evaluation Plan](/knowledge/database/evaluation-plan/)
- [Join Ordering](/knowledge/database/join-ordering/)
