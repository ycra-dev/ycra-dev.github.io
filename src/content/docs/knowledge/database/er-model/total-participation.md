---
title: "Total Participation"
description: "전체 참여(Total Participation)는 개체 집합 E의 모든 개체가 관계 집합 R에서 적어도 하나의 관계에 반드시 참여해야 하는 제약 조건으로, E-R 다이어그램에서 이중 선(double line)으로 표시된다"
tags: ['Total Participation', 'Entity Relationship', 'Constraints', 'Database Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/total-participation
sidebar:
  order: 5
---

## 핵심 개념

전체 참여는 개체의 존재가 관계를 통해 다른 개체와의 연관을 요구함을 의미한다. 이는 데이터베이스 설계에서 비즈니스 규칙을 정확하게 반영하는 데 중요한 역할을 한다.

카디널리티 제약에서 최소 카디널리티가 1(l..h 표기에서 l=1)이면 전체 참여를 의미한다. 예를 들어 1..1은 정확히 하나의 관계에 참여함을, 1..*은 하나 이상의 관계에 참여함을 의미한다.

전체 참여는 관계형 스키마로 변환될 때 중요한 영향을 미친다. 전체 참여가 있는 다대일 관계에서는 관계 집합의 스키마를 "다(many)" 쪽 개체 집합의 스키마와 결합할 수 있어, 별도의 관계 테이블이 불필요해진다. 이때 NOT NULL 제약을 사용하여 전체 참여를 보장할 수 있다.

약한 개체 집합은 항상 식별 관계에 전체 참여한다. 이는 약한 개체가 식별 개체 없이는 존재할 수 없기 때문이다. 전체 특수화(total specialization)에서도 상위 개체는 반드시 하나 이상의 하위 개체 집합에 속해야 한다.

## 예시

대학교에서 모든 학생이 반드시 지도교수를 가져야 하는 규칙:

```
instructor ──── advisor ════ student
               (0..*)        (1..1)
```

student에서 advisor로의 이중 선은 전체 참여를 나타낸다.

```sql
-- 관계 스키마 결합: student 테이블에 advisor 정보 포함
CREATE TABLE student (
    ID VARCHAR(5) PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    tot_cred NUMERIC(3,0),
    advisor_id VARCHAR(5) NOT NULL,  -- NOT NULL로 전체 참여 보장
    FOREIGN KEY (advisor_id) REFERENCES instructor(ID)
);
```

## 관련 개념

- [Partial Participation](/knowledge/database/partial-participation/)
- [Mapping Cardinality](/knowledge/database/mapping-cardinality/)
- [Weak Entity Set](/knowledge/database/weak-entity-set/)
- [Relationship Set](/knowledge/database/relationship-set/)
