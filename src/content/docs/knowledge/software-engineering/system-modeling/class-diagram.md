---
title: "Class Diagram"
description: "클래스 다이어그램은 시스템의 클래스, 속성, 오퍼레이션, 그리고 클래스 간의 관계(연관, 일반화, 집합)를 표현하는 UML 구조 다이어그램이다"
tags: ['Class Diagram', 'Uml', 'Object Oriented', 'Inheritance', 'Association', 'Aggregation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/class-diagram
sidebar:
  order: 2
---

## 핵심 개념

클래스 다이어그램은 시스템의 정적 구조를 표현하며, 객체지향 시스템 모델에서 가장 중요한 다이어그램이다. 클래스 간의 관계에는 연관(association), 일반화(generalization/상속), 집합(aggregation), 합성(composition) 등이 있다. 일반화는 공통 속성과 오퍼레이션을 상위 클래스에 정의하고 하위 클래스가 이를 상속받는 관계를 나타낸다. 집합은 전체-부분 관계를 나타내며, 다이아몬드 기호로 표시된다.

## 예시

```
[Patient]
- name: String
- dateOfBirth: Date
- patientId: String
+ getAppointments(): List<Appointment>

       △ (상속)
       |
[OutPatient]          [InPatient]
- appointmentDate     - bedNumber
```

## 관련 개념

- [UML](/knowledge/software-engineering/uml/)
- [Object-oriented Design](/knowledge/software-engineering/object-oriented-design/)
- [Sequence Diagram](/knowledge/software-engineering/sequence-diagram/)
