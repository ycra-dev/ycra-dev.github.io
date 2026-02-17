---
title: "First Normal Form"
description: "제1정규형(First Normal Form, 1NF)은 관계의 모든 속성의 도메인이 원자적(atomic) 값만을 가지는 정규형으로, 속성 값이 더 이상 분해할 수 없는 단일 값이어야 함을 요구한다"
tags: ['First Normal Form', '1nf', 'Normalization', 'Relational Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/first-normal-form
sidebar:
  order: 2
---

## 핵심 개념

제1정규형은 관계형 모델의 가장 기본적인 요구사항이다. 속성 도메인이 원자적이라 함은, 해당 도메인의 요소들이 더 이상 나눌 수 없는 단위로 취급됨을 의미한다. 집합 값(set-valued), 복합(composite), 다중값(multivalued) 속성은 1NF를 위반한다.

원자성의 개념은 속성의 사용 방식에 따라 달라질 수 있다. 예를 들어 "CS-101"이라는 과목 번호는 학과 코드("CS")와 과목 번호("101")로 분해 가능하지만, 애플리케이션에서 이를 하나의 단위로만 사용한다면 원자적으로 간주할 수 있다.

E-R 모델에서 복합 속성과 다중값 속성을 관계형 스키마로 변환할 때 1NF를 자연스럽게 달성한다. 복합 속성은 각 구성 요소를 별도의 속성으로 분리하고, 다중값 속성은 별도의 관계로 표현한다.

1NF는 정규화의 첫 번째 단계이며, 이후의 정규형(2NF, 3NF, BCNF 등)은 모두 1NF를 전제로 한다. 분해와 관련된 정규화가 아니라 속성 도메인과 관련된 정규형이라는 점에서 다른 정규형과 성격이 다르다.

## 예시

1NF를 위반하는 경우와 해결:

```sql
-- 1NF 위반: phone_numbers가 집합 값
-- instructor(ID, name, {phone_number})

-- 1NF를 만족하도록 변환:
CREATE TABLE instructor (
    ID VARCHAR(5) PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE instructor_phone (
    ID VARCHAR(5),
    phone_number VARCHAR(15),
    PRIMARY KEY (ID, phone_number),
    FOREIGN KEY (ID) REFERENCES instructor(ID)
);

-- 1NF 위반: address가 복합 속성
-- instructor(ID, name, address(street, city, state))

-- 1NF를 만족하도록 변환:
CREATE TABLE instructor (
    ID VARCHAR(5) PRIMARY KEY,
    name VARCHAR(20),
    street VARCHAR(30),
    city VARCHAR(20),
    state VARCHAR(2)
);
```

## 관련 개념

- [Second Normal Form](/knowledge/database/second-normal-form/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Decomposition](/knowledge/database/decomposition/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
