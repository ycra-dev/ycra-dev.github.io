---
title: "Specialization"
description: "특수화(Specialization)는 개체 집합 내에서 다른 개체들과 구별되는 하위 그룹을 명시적으로 지정하는 하향식(top-down) 설계 과정으로, 상위 수준 개체 집합에서 하나 이상의 하위 수준 개체 집합을 도출한다"
tags: ['Specialization', 'Entity Relationship', 'Inheritance', 'Isa Relationship']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/specialization
sidebar:
  order: 8
---

## 핵심 개념

특수화는 개체 집합 내의 개체들 사이의 차이를 강조하기 위해 사용된다. 하위 수준 개체 집합은 상위 수준 개체 집합의 모든 속성을 상속(attribute inheritance)받으며, 추가적인 고유 속성이나 고유한 관계 집합에 참여할 수 있다.

특수화는 반복적으로 적용하여 설계를 세분화할 수 있다. 예를 들어 person을 employee와 student로 특수화하고, employee를 다시 instructor와 secretary로 특수화할 수 있다. 이런 구조를 ISA 관계("is a" relationship)라고 하며, E-R 다이어그램에서 속이 빈 화살표(hollow arrow-head)로 표시한다.

특수화에는 두 가지 중요한 제약이 있다. 첫째, 분리성 제약(disjointness constraint)으로, 중복 특수화(overlapping)는 개체가 여러 하위 집합에 동시에 속할 수 있는 경우이고, 분리 특수화(disjoint)는 최대 하나의 하위 집합에만 속할 수 있는 경우이다. 분리 특수화는 단일 화살표로, 중복 특수화는 별도의 화살표로 표시한다. 둘째, 완전성 제약(completeness constraint)으로, 전체 특수화(total)는 상위 개체가 반드시 하나 이상의 하위 집합에 속해야 하고, 부분 특수화(partial)는 속하지 않을 수도 있다.

특수화를 관계형 스키마로 변환하는 방법에는 두 가지가 있다. 방법 1은 상위 개체의 스키마와 각 하위 개체의 스키마를 별도로 만드는 것이고, 방법 2는 상위 스키마 없이 각 하위 개체에 상위 속성을 모두 포함시키는 것이다(분리 완전 특수화에만 적합).

## 예시

```
        person
       (ID, name, street, city)
         /          \
    employee      student
   (salary)     (tot_credits)
     /    \
instructor  secretary
  (rank)   (hours_per_week)
```

방법 1의 관계형 스키마 변환:
```sql
CREATE TABLE person (ID VARCHAR(10) PRIMARY KEY, name VARCHAR(20),
                     street VARCHAR(30), city VARCHAR(20));
CREATE TABLE employee (ID VARCHAR(10) PRIMARY KEY, salary NUMERIC(8,2),
                       FOREIGN KEY (ID) REFERENCES person(ID));
CREATE TABLE student (ID VARCHAR(10) PRIMARY KEY, tot_cred NUMERIC(3,0),
                      FOREIGN KEY (ID) REFERENCES person(ID));
```

## 관련 개념

- [Generalization](/knowledge/database/generalization/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
- [E-R Diagram](/knowledge/database/e-r-diagram/)
- [Total Participation](/knowledge/database/total-participation/)
- [Partial Participation](/knowledge/database/partial-participation/)
