---
title: "E-R Diagram"
description: "E-R 다이어그램(Entity-Relationship Diagram)은 개체-관계 모델의 다이어그램 표현으로, 데이터베이스의 전체 논리적 구조를 시각적으로 표현하기 위해 사각형, 다이아몬드, 타원, 선 등의 기호를 사용하는 그래픽 표기법이다"
tags: ['E-R Diagram', 'Entity Relationship', 'Database Design', 'Visual Modeling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/er-diagram
sidebar:
  order: 10
---

## 핵심 개념

E-R 다이어그램은 단순하고 명확하여 E-R 모델이 널리 사용되는 주요 이유 중 하나이다. 기본 구성 요소와 표기법은 다음과 같다.

개체 집합(entity set)은 사각형으로 표현한다. 사각형은 두 부분으로 나뉘며, 상단에 개체 집합 이름, 하단에 속성 목록을 표시한다. 기본 키 속성에는 밑줄을 긋는다. 약한 개체 집합은 이중 사각형으로 표현하고, 판별자(discriminator)에는 점선 밑줄을 사용한다.

관계 집합(relationship set)은 다이아몬드로 표현하며, 참여하는 개체 집합에 선으로 연결한다. 식별 관계는 이중 다이아몬드로 표시한다. 관계의 기술적 속성은 점선으로 다이아몬드에 연결된 나뉘지 않은 사각형으로 표현한다.

카디널리티 제약은 선의 유형으로 표현한다. 화살표(→)는 "최대 하나"를, 일반 선(—)은 "다수"를 의미한다. 전체 참여(total participation)는 이중 선으로 표시한다. 더 구체적인 제약은 l..h 형식(예: 0..*, 1..1)으로 표현할 수 있다.

특수화/일반화는 속이 빈 화살표로 하위 개체에서 상위 개체로의 ISA 관계를 표현한다. 분리 특수화는 단일 화살표, 중복 특수화는 별도의 화살표를 사용한다. 전체 특수화는 "total" 키워드와 점선으로 표시한다.

복합 속성은 들여쓰기로 하위 속성을 나타내고, 다중값 속성은 중괄호({})로, 유도 속성은 괄호(())로 표현한다. 집계(aggregation)는 관계 집합을 감싸는 사각형으로 표현하여, 관계를 상위 수준 개체로 취급할 수 있게 한다.

## 예시

대학교 E-R 다이어그램의 핵심 구성요소:

```
[department] ──── <course_dept> ════ [course]
 dept_name                           course_id
 building                            title
 budget                              credits

[instructor] ════ <teaches> ──── [section]  ══ <sec_course> ══ [course]
 ID                               sec_id (판별자)
 name                             semester (판별자)
 salary                           year (판별자)

════ : 전체 참여 (이중 선)
──── : 부분 참여 (단일 선)
→    : "최대 하나" (화살표)
< >  : 관계 집합 (다이아몬드)
[ ]  : 개체 집합 (사각형)
[[ ]]: 약한 개체 집합 (이중 사각형)
```

## 관련 개념

- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
- [Entity Set](/knowledge/database/entity-set/)
- [Relationship Set](/knowledge/database/relationship-set/)
- [Mapping Cardinality](/knowledge/database/mapping-cardinality/)
- [Weak Entity Set](/knowledge/database/weak-entity-set/)
- [Specialization](/knowledge/database/specialization/)
- [Generalization](/knowledge/database/generalization/)
