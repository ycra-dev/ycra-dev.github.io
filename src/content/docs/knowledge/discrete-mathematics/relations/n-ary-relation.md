---
title: "n-ary Relation and Relational Database"
description: "집합 A1, A2, "
tags: ['N Ary Relation', 'Database', 'Relational Model', 'Primary Key', 'SQL', 'Data Mining']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/n-ary-relation
sidebar:
  order: 3
---

## 핵심 개념

**관계형 데이터 모델(Relational Data Model)**: 데이터베이스의 레코드들을 n-튜플로, 데이터베이스 전체를 n항 관계로 표현한다. 관계는 테이블(table)로 표시되며, 각 열은 속성(attribute)에 대응된다.

**기본 키(Primary Key)**: 해당 도메인의 값만으로 n-튜플을 유일하게 식별할 수 있는 도메인. 예를 들어 학번은 기본 키가 될 수 있지만, 전공은 여러 학생이 같은 전공을 가질 수 있으므로 기본 키가 될 수 없다.

**복합 키(Composite Key)**: 여러 도메인의 카르테시안 곱이 n-튜플을 유일하게 결정하는 경우.

**주요 연산들**:
- **선택(Selection) sigma_C**: 조건 C를 만족하는 n-튜플만 추출
- **사영(Projection) P_{i1,...,im}**: 특정 필드만 남기고 나머지 삭제
- **조인(Join) J_p**: 공통 필드로 두 관계를 결합

**데이터 마이닝**: 트랜잭션 데이터베이스에서 연관 규칙(association rule)을 찾는다. 항목 집합 I가 포함된 트랜잭션의 비율을 지지도(support), 조건부 확률을 신뢰도(confidence)라 한다.

## 예시

학생 데이터베이스 (4항 관계):
```
(Ackermann, 231455, Computer Science, 3.88)
(Adams,     888323, Physics,          3.45)
(Chou,      102147, Computer Science, 3.49)
```

SQL을 사용한 질의:
```sql
-- 선택 + 사영 연산: 컴퓨터과학 전공자의 이름과 GPA
SELECT Student_name, GPA
FROM Students
WHERE Major = 'Computer Science';
-- 결과: (Ackermann, 3.88), (Chou, 3.49)

-- 조인 연산: 두 테이블을 공통 필드로 결합
SELECT Professor, Time
FROM Teaching_assignments, Class_schedule
WHERE Department = 'Mathematics';
```

파이썬으로 관계 연산 구현:
```python
# 선택 연산
def selection(relation, condition):
    return {t for t in relation if condition(t)}

# 사영 연산
def projection(relation, indices):
    return {tuple(t[i] for i in indices) for t in relation}

students = [
    ("Ackermann", 231455, "CS", 3.88),
    ("Adams", 888323, "Physics", 3.45),
    ("Chou", 102147, "CS", 3.49),
]

# GPA > 3.5인 학생 선택
high_gpa = selection(set(map(tuple, students)), lambda t: t[3] > 3.5)
# {("Ackermann", 231455, "CS", 3.88)}

# 이름과 GPA만 사영
names_gpa = projection(set(map(tuple, students)), [0, 3])
# {("Ackermann", 3.88), ("Adams", 3.45), ("Chou", 3.49)}
```

## 관련 개념

- [Binary Relation](/knowledge/mathematics/binary-relation/) - n항 관계는 이항 관계의 일반화
- [Set](/knowledge/mathematics/set/) - 관계는 카르테시안 곱의 부분집합
- [Function](/knowledge/mathematics/function/) - 기본 키가 있는 n항 관계는 함수의 그래프와 유사
