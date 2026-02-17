---
title: "Mapping Cardinality"
description: "매핑 카디널리티(Mapping Cardinality)는 관계 집합을 통해 하나의 개체가 연관될 수 있는 다른 개체의 수를 표현하는 제약 조건으로, 이진 관계 집합에서 일대일(one-to-one), 일대다(one-to-many), 다대일(many-to-one), 다..."
tags: ['Mapping Cardinality', 'Entity Relationship', 'Database Design', 'Constraints']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/mapping-cardinality
sidebar:
  order: 4
---

## 핵심 개념

매핑 카디널리티는 이진 관계 집합을 기술하는 데 가장 유용하며, 현실 세계에서 허용되는 관계의 종류를 명세하는 데 사용된다.

개체 집합 A와 B 사이의 이진 관계 집합 R에 대해 네 가지 유형이 정의된다. 일대일(one-to-one)에서는 A의 개체가 B의 개체 최대 하나와 연관되고, B의 개체도 A의 개체 최대 하나와 연관된다. 일대다(one-to-many)에서는 A의 개체가 B의 개체 여러 개와 연관될 수 있지만, B의 개체는 A의 개체 최대 하나와만 연관된다. 다대일(many-to-one)은 일대다의 반대이며, 다대다(many-to-many)에서는 양쪽 개체 모두 상대편의 여러 개체와 연관될 수 있다.

E-R 다이어그램에서 카디널리티 제약은 관계 집합과 개체 집합을 연결하는 선의 유형으로 표현한다. 방향 있는 선(화살표, →)은 "최대 하나"를 의미하고, 방향 없는 선(—)은 "여러 개"를 의미한다. 또한 l..h 형식으로 최소 및 최대 카디널리티를 명시할 수 있는데, 최소값 1은 전체 참여를, 최대값 1은 최대 하나의 관계 참여를, 최대값 *는 제한 없음을 나타낸다.

카디널리티 제약은 관계 집합의 기본 키 선택에도 영향을 미친다. 다대다 관계에서는 참여하는 두 개체 집합의 기본 키 합집합이 관계의 기본 키가 되고, 일대다 또는 다대일 관계에서는 "다(many)" 쪽 개체 집합의 기본 키가 관계의 기본 키가 된다.

## 예시

대학교 데이터베이스에서 advisor 관계의 카디널리티:

```
instructor ←── advisor ════ student
(0..*)                      (1..1)
```

위 다이어그램에서 instructor 쪽의 0..*는 교수가 0명 이상의 학생을 지도할 수 있음을, student 쪽의 1..1은 각 학생이 정확히 한 명의 지도교수를 가져야 함을 의미한다. 이는 instructor에서 student으로의 일대다(one-to-many) 관계이며, student의 참여는 전체 참여(total participation)이다.

## 관련 개념

- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
- [Relationship Set](/knowledge/database/relationship-set/)
- [Total Participation](/knowledge/database/total-participation/)
- [Partial Participation](/knowledge/database/partial-participation/)
- [E-R Diagram](/knowledge/database/e-r-diagram/)
