---
title: "Weak Entity Set"
description: "약한 개체 집합(Weak Entity Set)은 자체 속성만으로는 개체를 고유하게 식별할 수 없어, 식별 개체 집합(identifying entity set)의 기본 키와 자신의 판별자 속성(discriminator attributes)을 결합하여 개체를 식별하는..."
tags: ['Weak Entity Set', 'Entity Relationship', 'Database Design', 'Identifying Relationship']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/weak-entity-set
sidebar:
  order: 7
---

## 핵심 개념

약한 개체 집합은 다른 개체 집합에 존재 의존적(existence dependent)이다. 약한 개체 집합을 식별하는 강한 개체 집합을 식별 개체 집합(identifying entity set) 또는 소유 개체 집합(owner entity set)이라고 하며, 약한 개체 집합을 식별 개체 집합에 연결하는 관계를 식별 관계(identifying relationship)라고 한다.

식별 관계는 약한 개체 집합에서 식별 개체 집합으로의 다대일(many-to-one) 관계이며, 약한 개체 집합의 참여는 반드시 전체 참여(total participation)여야 한다. 식별 관계에는 기술적 속성(descriptive attributes)이 없어야 하는데, 그러한 속성은 약한 개체 집합 자체에 포함시킬 수 있기 때문이다.

약한 개체 집합의 기본 키는 식별 개체 집합의 기본 키와 약한 개체 집합의 판별자(discriminator)를 결합하여 구성된다. 판별자는 같은 식별 개체에 속하는 약한 개체들을 구별하는 속성 집합이다.

E-R 다이어그램에서 약한 개체 집합은 이중 사각형으로, 식별 관계는 이중 다이아몬드로, 판별자는 점선 밑줄로 표시한다. 약한 개체 집합이 관계형 스키마로 변환될 때, 식별 관계에 해당하는 별도의 스키마는 약한 개체 집합의 스키마와 중복되므로 생성할 필요가 없다.

## 예시

대학교 데이터베이스에서 section은 course에 의존하는 약한 개체 집합이다:

```
course ══════ sec_course ══════ section
(course_id)                     (sec_id, semester, year)
 강한 개체       식별 관계         약한 개체
```

section의 기본 키: {course_id, sec_id, semester, year}

```sql
CREATE TABLE section (
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester VARCHAR(6),
    year NUMERIC(4,0),
    building VARCHAR(15),
    room_number VARCHAR(7),
    time_slot_id VARCHAR(4),
    PRIMARY KEY (course_id, sec_id, semester, year),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
        ON DELETE CASCADE
);
```

sec_id, semester, year만으로는 section을 고유하게 식별할 수 없다(다른 과목에서 같은 sec_id를 가질 수 있음). course_id를 포함해야 비로소 고유 식별이 가능하다.

## 관련 개념

- [Entity Set](/knowledge/database/entity-set/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
- [Mapping Cardinality](/knowledge/database/mapping-cardinality/)
- [Total Participation](/knowledge/database/total-participation/)
- [E-R Diagram](/knowledge/database/e-r-diagram/)
