---
title: "Object-Relational Mapping"
description: "객체-관계 매핑(Object-Relational Mapping, ORM)은 관계형 데이터베이스의 튜플과 객체지향 프로그래밍 언어의 객체 사이의 자동 변환을 제공하는 시스템으로, 프로그래머가 SQL 대신 프로그래밍 언어의 객체 모델을 통해 데이터베이스에 접근할 수 ..."
tags: ['Orm', 'Object Relational Mapping', 'Hibernate', 'Django', 'Data Access']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/object-relational-mapping
sidebar:
  order: 5
---

## 핵심 개념

ORM의 핵심 목적은 객체지향 언어와 관계형 데이터베이스 사이의 임피던스 불일치(impedance mismatch)를 해소하는 것이다. 객체지향 언어는 객체, 상속, 연관 관계를 사용하는 반면, 관계형 데이터베이스는 테이블, 행, 외래 키를 사용한다. ORM은 이 두 모델 사이의 매핑을 자동화한다.

ORM의 동작 방식은 다음과 같다. 선택 조건에 기반하여 객체(또는 객체 집합)를 검색하면, ORM이 해당 SQL 쿼리를 생성하여 데이터베이스에서 데이터를 가져온 후 미리 정의된 매핑에 따라 객체를 생성한다. 프로그램이 객체를 수정하거나 새 객체를 생성하거나 삭제하면, save/commit 명령 시 ORM이 대응하는 INSERT, UPDATE, DELETE SQL 문을 자동 생성한다.

ORM의 주요 이점은 세 가지이다. 첫째, 프로그래머에게 고수준 객체 모델을 제공하여 데이터베이스 상세를 숨긴다. 둘째, 메모리에 캐시된 객체에 대한 연산은 데이터베이스 직접 접근보다 높은 성능을 제공할 수 있다. 셋째, 다양한 데이터베이스를 동일한 고수준 코드로 사용할 수 있어 데이터베이스 이전이 용이하다.

주요 ORM 시스템으로는 Java의 Hibernate(JPA 구현)와 Python의 Django ORM, SQLAlchemy가 있다. Hibernate는 @Entity, @Id 등의 어노테이션으로 매핑을 정의하고, HQL이라는 객체 기반 질의 언어를 제공한다. Django ORM은 모델 클래스 정의를 통해 매핑을 지정하며, migrate 도구로 스키마 생성과 마이그레이션을 자동화한다.

ORM의 단점으로는 대량 데이터 갱신 시 성능 비효율과 복잡한 질의에서의 비효율이 있으며, 이러한 경우 SQL을 직접 사용하여 ORM을 우회할 수 있다.

## 예시

```java
// Hibernate ORM 예시 (Java)
@Entity
public class Student {
    @Id String ID;
    String name;
    String department;
    int tot_cred;
}

// 객체 저장
Session session = getSessionFactory().openSession();
Transaction txn = session.beginTransaction();
Student stud = new Student("12328", "John Smith", "Comp. Sci.", 0);
session.save(stud);  // INSERT 문 자동 생성
txn.commit();
session.close();
```

```python
# Django ORM 예시 (Python)
from django.db import models

class Student(models.Model):
    id = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=20)
    dept_name = models.CharField(max_length=20)
    tot_cred = models.DecimalField(max_digits=3, decimal_places=0)

# 질의 실행
students = Student.objects.filter(name="Zhang")
for student in students:
    print(student.name, student.dept_name)
```

## 관련 개념

- [Semi-structured Data](/knowledge/database/semi-structured-data/)
- [Web Application Architecture](/knowledge/database/web-application-architecture/)
- [Servlet](/knowledge/database/servlet/)
- [REST API](/knowledge/database/rest-api/)
