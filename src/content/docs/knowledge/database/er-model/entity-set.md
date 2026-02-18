---
title: "Entity Set"
description: "개체(entity)는 현실 세계에서 다른 모든 객체와 구별 가능한 \"사물\" 또는 \"객체\"이며, 개체 집합(entity set)은 동일한 속성(property)을 공유하는 같은 유형의 개체들의 집합이다"
tags: ['Entity Set', 'Entity', 'Database Design', 'E R Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/entity-set
sidebar:
  order: 2
---

## 핵심 개념

개체는 사람이나 책처럼 구체적일 수도 있고, 과목이나 항공편 예약처럼 추상적일 수도 있다. 각 개체는 속성의 집합으로 표현되며, 일부 속성 값의 집합은 개체를 유일하게 식별해야 한다. 예를 들어, 대학의 각 사람은 개체이며, `person_id` 속성 값으로 고유하게 식별된다.

개체 집합은 모델링에서 종종 추상적인 의미로 사용된다. 실제로 개체 집합에 속하는 개체들의 구체적인 모음을 개체 집합의 확장(extension)이라고 한다. 이 구분은 관계(relation)와 관계 인스턴스(relation instance)의 차이와 유사하다.

개체 집합은 서로 배타적(disjoint)일 필요가 없다. 예를 들어, 대학의 모든 사람으로 구성된 `person` 개체 집합을 정의할 수 있으며, 한 `person` 개체가 `instructor` 개체이면서 동시에 `student` 개체일 수도 있다.

각 개체는 각 속성에 대한 값을 가진다. 예를 들어, 특정 `instructor` 개체는 `ID`에 12121, `name`에 Wu, `dept_name`에 Finance, `salary`에 90000 값을 가질 수 있다.

E-R 다이어그램에서 개체 집합은 직사각형으로 표현되며, 상단에는 개체 집합 이름이, 하단에는 모든 속성 이름이 나열된다. 기본 키에 해당하는 속성은 밑줄로 표시된다.

## 예시

대학교 데이터베이스의 개체 집합 예시:

- `instructor`: 속성 (ID, name, salary) - 모든 교수의 집합
- `student`: 속성 (ID, name, tot_cred) - 모든 학생의 집합
- `course`: 속성 (course_id, title, credits) - 모든 과목의 집합
- `department`: 속성 (dept_name, building, budget) - 모든 학과의 집합

```
+------------------+
|    instructor    |
+------------------+
| ID               |
| name             |
| salary           |
+------------------+
```

## 관련 개념

- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
- [Relationship Set](/knowledge/database/relationship-set/)
- [Weak Entity Set](/knowledge/database/weak-entity-set/)
