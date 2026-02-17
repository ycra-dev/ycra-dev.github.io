---
title: "Decomposition"
description: "분해(Decomposition)는 \"좋은 형태\"가 아닌 관계 스키마를 여러 개의 더 작은 관계 스키마로 나누는 과정으로, 불필요한 정보 중복을 제거하면서도 정보 손실 없이 데이터를 저장하고 검색할 수 있게 하는 정규화의 핵심 기법이다"
tags: ['Decomposition', 'Normalization', 'Relational Design', 'Schema Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/decomposition
sidebar:
  order: 6
---

## 핵심 개념

분해는 관계형 데이터베이스 설계에서 나쁜 스키마를 좋은 형태로 변환하는 기본적인 방법이다. 나쁜 스키마의 대표적인 문제는 정보의 반복(중복)인데, 이는 저장 공간의 낭비뿐 아니라 갱신 시 불일치(update anomaly)를 야기한다.

분해의 핵심 원칙은 두 가지이다. 첫째, 무손실 분해(lossless decomposition)여야 한다. 분해된 관계들을 자연 조인(natural join)했을 때 원래 관계를 정확히 복원할 수 있어야 한다. 손실 분해(lossy decomposition)는 조인 시 원래 없던 가짜 튜플(spurious tuples)이 생성되어 정보가 왜곡된다. 둘째, 가능하면 종속성 보존(dependency preservation) 분해여야 한다. 원래 스키마의 함수적 종속성을 분해된 개별 관계에서 각각 검증할 수 있어야 한다.

BCNF 분해 알고리즘은 BCNF를 위반하는 함수적 종속성 alpha -> beta를 찾아 스키마를 (alpha 합집합 beta)와 (R - (beta - alpha))로 나눈다. 이 과정을 모든 스키마가 BCNF를 만족할 때까지 반복한다.

3NF 분해 알고리즘은 정준 커버를 기반으로 한다. 각 함수적 종속성 alpha -> beta에 대해 스키마 (alpha, beta)를 생성하고, 결과에 후보 키를 포함하는 스키마가 없으면 추가한다. 이 알고리즘은 무손실성과 종속성 보존을 모두 보장한다.

분해 시 두 가지 알고리즘 사이의 트레이드오프가 존재한다. BCNF는 더 강한 중복 제거를 제공하지만 종속성 보존이 불가능할 수 있고, 3NF는 약간의 중복을 허용하지만 항상 무손실이면서 종속성을 보존하는 분해를 제공한다.

## 예시

```
-- 원래 스키마:
-- class(course_id, title, dept_name, credits, sec_id, semester, year,
--       building, room_number, capacity, time_slot_id)

-- 함수적 종속성:
-- course_id -> title, dept_name, credits
-- building, room_number -> capacity
-- course_id, sec_id, semester, year -> building, room_number, time_slot_id

-- BCNF 분해 과정:
-- 1단계: course_id -> title, dept_name, credits 위반
--   course(course_id, title, dept_name, credits)
--   class-1(course_id, sec_id, semester, year, building,
--           room_number, capacity, time_slot_id)

-- 2단계: building, room_number -> capacity 위반
--   classroom(building, room_number, capacity)
--   section(course_id, sec_id, semester, year, building,
--           room_number, time_slot_id)
```

## 관련 개념

- [Lossless-Join Decomposition](/knowledge/database/lossless-join-decomposition/)
- [Dependency Preservation](/knowledge/database/dependency-preservation/)
- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
- [Functional Dependency](/knowledge/database/functional-dependency/)
