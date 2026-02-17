---
title: "Schema Tuning"
description: "스키마 튜닝(Schema Tuning)은 데이터베이스의 물리적 스키마(인덱스, 구체화된 뷰, 파티셔닝)와 논리적 스키마(관계 분해, 비정규화)를 조정하여 특정 애플리케이션의 쿼리와 업데이트 성능을 최적화하는 과정이다"
tags: ['Schema Tuning', 'Physical Schema', 'Logical Schema', 'Index Tuning', 'Materialized View', 'Partitioning', 'Denormalization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/schema-tuning
sidebar:
  order: 3
---

## 핵심 개념

스키마 튜닝은 물리적 스키마 튜닝과 논리적 스키마 튜닝으로 구분된다.

**물리적 스키마 튜닝**은 애플리케이션 코드에 영향을 주지 않으므로 가장 비침습적(least disruptive)인 튜닝 방법이다.

1. **인덱스 튜닝**: 쿼리가 병목이면 적절한 인덱스를 생성하여 속도를 향상시키고, 업데이트가 병목이면 불필요한 인덱스를 제거한다. 인덱스 유형(해시, B+-트리, LSM 트리)의 선택도 중요하다. 범위 쿼리가 빈번하면 B+-트리가, 쓰기 부하가 높으면 LSM 트리가 적합하다. 클러스터드 인덱스는 관계당 하나만 가능하므로, 가장 많은 쿼리와 업데이트에 이점을 주는 인덱스를 클러스터드로 설정해야 한다.

2. **구체화된 뷰(Materialized View) 활용**: 집계 쿼리 등을 크게 가속화할 수 있으나, 저장 공간과 유지 비용(즉시 유지 vs 지연 유지)을 고려해야 한다. 즉시 유지(immediate maintenance)는 갱신 트랜잭션 속도를 저하시키고, 지연 유지(deferred maintenance)는 뷰가 일시적으로 불일치할 수 있다.

3. **수평 파티셔닝(Horizontal Partitioning)**: 대형 관계를 날짜 등의 속성으로 파티셔닝하면, 특정 날짜 범위를 조건으로 하는 쿼리가 관련 파티션만 접근하면 된다. 각 파티션에 독립적인 인덱스를 생성할 수 있어 인덱스 크기가 작아지고 검색과 삽입이 빨라진다.

4. **자동화된 물리적 설계 도구**: 대부분의 상용 데이터베이스는 워크로드(과거 쿼리 및 업데이트 이력)를 분석하여 인덱스와 구체화된 뷰를 추천하는 튜닝 위저드를 제공한다. 탐욕적 휴리스틱(greedy heuristic)을 사용하여 최대 이점을 주는 인덱스나 뷰를 반복적으로 선택한다.

**논리적 스키마 튜닝**은 쿼리 성능을 개선하기 위해 스키마 자체를 변경하는 것이다.

1. **수직 파티셔닝(Vertical Partitioning)**: 정규형 제약 내에서 관계를 수직으로 분해하면, 자주 접근하는 속성만 포함하는 소형 관계를 사용할 수 있다. 컬럼 스토어(column store)는 이를 극단적으로 적용한 방식이다.

2. **비정규화(Denormalization)**: instructor와 department의 조인 결과를 저장하여 조인 비용을 절약할 수 있지만, 일관성 유지에 더 많은 노력이 필요하다. 구체화된 뷰가 이러한 이점을 제공하면서도 일관성 유지를 데이터베이스 시스템에 맡길 수 있으므로 더 선호된다.

## 예시

수직 파티셔닝 예시:

```sql
-- 원래 관계
course(course_id, title, dept_name, credits)

-- 수직 파티셔닝
course_credit(course_id, credits)
course_title_dept(course_id, title, dept_name)

-- course_id와 credits만 자주 접근한다면
-- course_credit 관계를 사용하면 더 빠름
-- (title, dept_name을 가져올 필요 없음)
```

수평 파티셔닝 예시:

```sql
-- 날짜 속성으로 파티셔닝된 관계
-- 각 파티션은 (year, month) 조합에 해당

-- 특정 날짜 조건의 쿼리
SELECT * FROM large_relation
WHERE date = '2018-06-01';

-- 해당 월의 파티션만 접근하면 됨
-- 파티션별 인덱스도 작아서 더 빠름
```

## 관련 개념

- [Performance Tuning](/knowledge/database/performance-tuning/)
- [Query Tuning](/knowledge/database/query-tuning/)
- [TPC Benchmark](/knowledge/database/tpc-benchmark/)
- [Database Standardization](/knowledge/database/database-standardization/)
