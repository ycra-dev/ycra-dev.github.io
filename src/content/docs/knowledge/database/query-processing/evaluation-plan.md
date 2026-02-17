---
title: "Evaluation Plan"
description: "평가 계획(Evaluation Plan)은 쿼리의 관계 대수 표현식에 각 연산의 구체적인 실행 알고리즘과 사용할 인덱스 등을 주석으로 지정한 것으로, 쿼리를 실제로 실행하는 완전한 전략을 정의한다"
tags: ['Evaluation Plan', 'Query Execution', 'Physical Operator', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/evaluation-plan
sidebar:
  order: 9
---

## 핵심 개념

평가 계획은 쿼리의 논리적 표현(관계 대수)에 물리적 실행 방법을 결합한 것이다. 관계 대수 연산에 실행 방법을 지정한 것을 **평가 프리미티브(evaluation primitive)**라 하며, 프리미티브들의 시퀀스가 평가 계획을 구성한다.

**평가 계획의 구성 요소:**
- 각 릴레이션 연산에 대한 알고리즘 선택 (예: 해시 조인 vs 병합 조인)
- 사용할 인덱스 지정
- 연산 간 데이터 전달 방식 (실체화 vs 파이프라이닝)
- 연산 실행 순서

**계획 선택 과정:**
1. 동치 규칙을 적용하여 다양한 동등 표현식 생성
2. 물리적 동치 규칙을 적용하여 논리 연산을 물리 연산으로 변환
3. 각 계획의 비용 추정
4. 최저 비용 계획 선택

**물리적 연산자의 예:**
- Selection: 선형 스캔, 인덱스 스캔, 비트맵 스캔
- 조인: 중첩 루프, 블록 중첩 루프, 인덱스 중첩 루프, 해시 조인, 병합 조인
- 정렬: 외부 정렬-병합
- 집계: 정렬 기반, 해시 기반

**Plan Caching:** 동일한 쿼리가 상수 값만 바뀌어 반복 실행되는 경우, 최적화된 계획을 캐시하여 재사용한다. 이는 매번 최적화 비용을 지불하지 않으면서도 합리적인 성능을 제공한다. 단, 상수 값에 따라 최적 계획이 달라질 수 있으므로 파라메트릭 쿼리 최적화가 대안이 될 수 있다.

쿼리 실행 엔진(query-execution engine)은 선택된 평가 계획을 받아 실행하고 결과를 반환한다.

## 예시

다음 쿼리에 대한 두 가지 가능한 평가 계획:

```sql
SELECT name FROM instructor
WHERE salary < 75000;
```

계획 A (인덱스 사용):
```
  Π_name
    ↑
  σ_{salary<75000} [B+-tree index on salary 사용]
    ↑
  instructor
```

계획 B (선형 스캔):
```
  Π_name
    ↑
  σ_{salary<75000} [linear scan]
    ↑
  instructor
```

salary에 인덱스가 있고 선택도가 낮으면(적은 튜플이 조건을 만족) 계획 A가 효율적이다. salary < 75000이 대부분의 튜플을 포함하면 계획 B가 더 나을 수 있다.

복합 조인 쿼리의 평가 계획 예:
```
  Π_name
    ↑ (파이프라이닝)
  ⋈_{hash join}
   / \
  σ_{dept='CS'}  teaches (인덱스 스캔)
    ↑             ↑ (블로킹)
  instructor
  (선형 스캔)
```

## 관련 개념

- [Query Processing](/knowledge/database/query-processing/)
- [Query Optimization](/knowledge/database/query-optimization/)
- [Pipelining](/knowledge/database/pipelining/)
- [Cost Estimation](/knowledge/database/cost-estimation/)
