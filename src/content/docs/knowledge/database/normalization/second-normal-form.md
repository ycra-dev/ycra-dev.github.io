---
title: "Second Normal Form"
description: "제2정규형(Second Normal Form, 2NF)은 관계가 제1정규형을 만족하면서, 모든 비주요 속성(non-prime attribute)이 후보 키 전체에 완전 함수적 종속(fully functionally dependent)하는 정규형으로, 후보 키의 진..."
tags: ['Second Normal Form', '2nf', 'Normalization', 'Relational Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/second-normal-form
sidebar:
  order: 3
---

## 핵심 개념

제2정규형은 역사적 의의를 가지는 정규형이다. 실무에서는 2NF 대신 3NF나 BCNF를 직접 목표로 설계하는 것이 일반적이다. 2NF의 핵심 개념은 부분 종속의 제거이다.

부분 종속(partial dependency)이란 비주요 속성이 후보 키의 진부분집합에 의해 결정되는 경우를 말한다. 예를 들어, 관계 R(A, B, C)에서 {A, B}가 후보 키이고 A -> C가 성립하면, C는 후보 키의 일부인 A에만 종속되므로 부분 종속이다. 이런 부분 종속은 정보의 중복을 야기한다.

2NF를 달성하려면 부분 종속을 유발하는 속성을 별도의 관계로 분리한다. 위 예시에서 R(A, B, C)를 R1(A, C)과 R2(A, B)로 분해하면 2NF를 만족한다.

후보 키가 단일 속성으로 구성된 관계는 자동으로 2NF를 만족한다. 부분 종속은 복합 키를 가진 관계에서만 발생할 수 있기 때문이다. 모든 3NF 관계는 2NF를 만족하고, 모든 BCNF 관계도 2NF를 만족한다.

## 예시

```sql
-- 2NF를 위반하는 관계:
-- takes(student_id, course_id, grade, student_name)
-- 후보 키: {student_id, course_id}
-- 부분 종속: student_id -> student_name (키의 일부에만 종속)

-- 2NF로 분해:
CREATE TABLE student_info (
    student_id VARCHAR(5) PRIMARY KEY,
    student_name VARCHAR(20)
);

CREATE TABLE takes (
    student_id VARCHAR(5),
    course_id VARCHAR(8),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student_info(student_id)
);
```

분해 전: student_name이 student_id에 의해서만 결정되어 부분 종속 발생.
분해 후: 각 관계에서 비주요 속성이 후보 키 전체에 완전 종속.

## 관련 개념

- [First Normal Form](/knowledge/database/first-normal-form/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Decomposition](/knowledge/database/decomposition/)
