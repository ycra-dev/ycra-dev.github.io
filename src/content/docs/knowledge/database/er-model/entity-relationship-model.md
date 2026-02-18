---
title: "Entity-Relationship Model"
description: "개체-관계 모델(Entity-Relationship Model, E-R 모델)은 데이터베이스 설계를 용이하게 하기 위해 개발된 고수준 데이터 모델로, 현실 세계의 기업 구조를 개체 집합(entity set), 관계 집합(relationship set), 속성(at..."
tags: ['Entity Relationship', 'Data Modeling', 'Database Design', 'Conceptual Schema']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/entity-relationship-model
sidebar:
  order: 1
---

## 핵심 개념

E-R 모델은 데이터베이스의 전체 논리적 구조를 나타내는 기업 스키마(enterprise schema)를 명세하는 데 사용된다. 현실 세계의 의미와 상호작용을 개념적 스키마로 매핑하는 데 매우 유용하며, 많은 데이터베이스 설계 도구가 E-R 모델의 개념을 활용한다.

E-R 모델의 설계 과정은 여러 단계를 거친다. 먼저 개념적 설계(conceptual design) 단계에서 사용자 요구사항을 E-R 다이어그램으로 표현한다. 이후 논리적 설계(logical design) 단계에서 고수준 개념 스키마를 관계형 데이터 모델 같은 구현 데이터 모델로 변환한다. 마지막으로 물리적 설계(physical design) 단계에서 파일 구조와 인덱스를 결정한다.

E-R 모델을 사용할 때 설계자가 피해야 할 두 가지 주요 함정이 있다. 첫째는 정보의 중복(redundancy)으로, 동일한 정보가 불필요하게 반복 저장되면 데이터 불일치가 발생할 수 있다. 둘째는 불완전성(incompleteness)으로, 나쁜 설계는 기업의 특정 측면을 모델링하기 어렵거나 불가능하게 만들 수 있다.

E-R 모델에는 기본 개념 외에도 특수화(specialization), 일반화(generalization), 집계(aggregation) 같은 확장 기능이 있어 더 복잡한 현실 세계의 구조를 표현할 수 있다.

E-R 설계는 관계형 스키마의 집합으로 변환될 수 있으며, 각 개체 집합과 관계 집합에 대해 고유한 관계 스키마가 할당된다. 이것이 E-R 다이어그램에서 관계형 데이터베이스 설계를 도출하는 기초가 된다.

## 예시

대학교 데이터베이스의 E-R 모델 설계 예시:

개체 집합: `instructor`, `student`, `course`, `section`, `department`

관계 집합: `advisor` (instructor-student), `teaches` (instructor-section), `takes` (student-section)

이러한 개체와 관계를 E-R 다이어그램으로 표현하고, 이를 다음과 같은 관계형 스키마로 변환할 수 있다:

```sql
CREATE TABLE instructor (
    ID VARCHAR(5),
    name VARCHAR(20),
    dept_name VARCHAR(20),
    salary NUMERIC(8,2),
    PRIMARY KEY (ID),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);
```

## 관련 개념

- [Entity Set](/knowledge/database/entity-set/)
- [Relationship Set](/knowledge/database/relationship-set/)
- [Weak Entity Set](/knowledge/database/weak-entity-set/)
- [Mapping Cardinality](/knowledge/database/mapping-cardinality/)
