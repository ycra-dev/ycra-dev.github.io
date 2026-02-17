---
title: "Generalization"
description: "일반화(Generalization)는 여러 개체 집합들이 공유하는 공통 특성을 기반으로 하나의 상위 수준 개체 집합으로 합성하는 상향식(bottom-up) 설계 과정으로, 특수화(Specialization)의 역과정이다"
tags: ['Generalization', 'Entity Relationship', 'Inheritance', 'Database Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/generalization
sidebar:
  order: 9
---

## 핵심 개념

일반화는 여러 개체 집합이 동일한 속성을 가지고 동일한 관계 집합에 참여하는 경우, 이들의 공통점을 인식하여 상위 수준의 개체 집합으로 통합하는 과정이다. 이를 통해 하위 수준 개체 집합 간의 유사성을 강조하고 차이를 숨기며, 공유 속성의 반복을 피해 표현을 경제적으로 만든다.

예를 들어, instructor 개체 집합(instructor_id, instructor_name, instructor_salary, rank)과 secretary 개체 집합(secretary_id, secretary_name, secretary_salary, hours_per_week)은 식별자, 이름, 급여라는 개념적으로 동일한 속성을 가지고 있다. 이들을 일반화하여 employee라는 상위 수준 개체 집합(ID, name, salary)을 만들 수 있다.

상위 수준 개체 집합을 슈퍼클래스(superclass), 하위 수준 개체 집합을 서브클래스(subclass)라고도 한다. 속성 상속은 모든 계층을 통해 적용되므로, instructor와 secretary는 employee의 salary뿐 아니라 person의 ID, name, street, city도 상속받는다.

실제 E-R 다이어그램에서는 특수화와 일반화를 구분하지 않으며, 동일한 표기법을 사용한다. 설계 과정에서 두 접근법을 조합하여 데이터베이스 애플리케이션과 사용자 요구사항을 완전히 표현한다. 차이점은 출발점과 목표에 있을 뿐이다: 특수화는 하나의 개체 집합에서 시작하여 차이점을 강조하고, 일반화는 여러 개체 집합에서 시작하여 공통점을 강조한다.

계층 구조(hierarchy)에서 각 개체 집합은 하나의 ISA 관계에만 하위로 참여하는 단일 상속(single inheritance)을 가진다. 격자 구조(lattice)에서는 다중 상속(multiple inheritance)이 가능하여 개체 집합이 둘 이상의 ISA 관계에 하위로 참여할 수 있다.

## 예시

일반화의 상향식 과정:

```
instructor(instructor_id, instructor_name, instructor_salary, rank)
secretary(secretary_id, secretary_name, secretary_salary, hours_per_week)

-- 공통 속성 인식: id, name, salary
-- 일반화 결과:

employee(ID, name, salary)
    ├── instructor(rank)
    └── secretary(hours_per_week)
```

일반화의 결과로 생성되는 관계형 스키마는 특수화의 결과와 동일하다.

## 관련 개념

- [Specialization](/knowledge/database/specialization/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
- [E-R Diagram](/knowledge/database/e-r-diagram/)
- [Entity Set](/knowledge/database/entity-set/)
