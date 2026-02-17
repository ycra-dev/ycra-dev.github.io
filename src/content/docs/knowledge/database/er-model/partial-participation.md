---
title: "Partial Participation"
description: "부분 참여(Partial Participation)는 개체 집합 E의 일부 개체가 관계 집합 R의 어떤 관계에도 참여하지 않을 수 있는 상태로, 전체 참여와 대비되며 E-R 다이어그램에서 단일 선(single line)으로 표시된다"
tags: ['Partial Participation', 'Entity Relationship', 'Constraints', 'Database Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/partial-participation
sidebar:
  order: 6
---

## 핵심 개념

부분 참여는 개체 집합의 모든 개체가 특정 관계에 참여할 필요가 없음을 의미한다. 카디널리티 제약에서 최소 카디널리티가 0(l..h 표기에서 l=0)이면 부분 참여를 나타낸다. 예를 들어 0..* 또는 0..1은 부분 참여를 의미한다.

대학교 예시에서 instructor 개체 집합의 advisor 관계 참여는 부분 참여이다. 모든 교수가 학생을 지도할 필요는 없으므로, 일부 instructor 개체만 advisor 관계에 참여한다. 반면 student의 advisor 관계 참여가 전체 참여라면, 모든 학생은 반드시 지도교수가 있어야 한다.

부분 참여를 관계형 스키마로 변환할 때, 관계 집합의 스키마를 개체 집합과 결합하면 참여하지 않는 개체에 대해 NULL 값이 사용된다. 예를 들어 instructor 스키마에 advisor 정보를 포함하면, 학생을 지도하지 않는 교수의 경우 해당 속성이 NULL이 된다.

특수화에서도 부분 특수화(partial specialization)가 기본값이다. 이 경우 상위 수준 개체가 어떤 하위 수준 개체 집합에도 속하지 않을 수 있다. 예를 들어, person의 employee와 student로의 특수화가 부분적이면, 직원도 학생도 아닌 사람이 존재할 수 있다.

## 예시

```
instructor ──── advisor ════ student
(부분 참여)                  (전체 참여)
  0..*                        1..1
```

instructor는 단일 선(부분 참여): 학생을 지도하지 않는 교수 허용
student는 이중 선(전체 참여): 모든 학생은 반드시 지도교수 필요

```sql
-- 부분 참여의 관계 스키마 (별도 테이블)
CREATE TABLE advisor (
    s_ID VARCHAR(5),
    i_ID VARCHAR(5),
    PRIMARY KEY (s_ID),
    FOREIGN KEY (s_ID) REFERENCES student(ID),
    FOREIGN KEY (i_ID) REFERENCES instructor(ID)
);
-- instructor에 지도 학생이 없어도 advisor에 해당 행 없음 (부분 참여 허용)
```

## 관련 개념

- [Total Participation](/knowledge/database/total-participation/)
- [Mapping Cardinality](/knowledge/database/mapping-cardinality/)
- [E-R Diagram](/knowledge/database/e-r-diagram/)
- [Relationship Set](/knowledge/database/relationship-set/)
- [Specialization](/knowledge/database/specialization/)
