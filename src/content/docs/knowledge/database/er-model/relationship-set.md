---
title: "Relationship Set"
description: "관계(relationship)는 여러 개체 간의 연관(association)이며, 관계 집합(relationship set)은 같은 유형의 관계들의 집합으로, 수학적으로 n >= 2개의 (가능하면 동일하지 않은) 개체 집합에 대한 수학적 관계의 부분집합이다"
tags: ['Relationship Set', 'Relationship', 'E R Model', 'Database Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/relationship-set
sidebar:
  order: 3
---

## 핵심 개념

관계 집합은 E-R 다이어그램에서 마름모(diamond)로 표현되며, 관련된 개체 집합(직사각형)들에 선으로 연결된다. 예를 들어, `advisor` 관계 집합은 `instructor`와 `student` 개체 집합을 연결하여 교수와 학생 간의 지도 관계를 나타낸다.

개체 집합이 관계 집합에 참여하는 것을 참여(participation)라고 한다. 관계에서 개체가 수행하는 기능을 역할(role)이라 하며, 대부분의 경우 역할은 암시적이다. 그러나 같은 개체 집합이 관계 집합에 두 번 이상 참여하는 재귀적 관계 집합(recursive relationship set)에서는 명시적 역할 이름이 필요하다. 예를 들어, `prereq` 관계에서 `course` 개체 집합은 과목과 선수과목 두 가지 역할로 참여한다.

관계는 기술적 속성(descriptive attribute)을 가질 수 있다. 예를 들어, `takes` 관계 집합에는 학생이 받은 성적을 기록하는 `grade` 속성이 있을 수 있다.

관계 집합의 차수(degree)는 참여하는 개체 집합의 수이다. 이진(binary) 관계 집합은 차수가 2이고, 삼항(ternary) 관계 집합은 차수가 3이다. 대부분의 데이터베이스 관계 집합은 이진이지만, 때로는 3개 이상의 개체 집합을 포함하는 관계도 필요하다.

비이진 관계 집합은 항상 여러 이진 관계 집합으로 대체할 수 있지만, 이는 항상 바람직한 것은 아니다. 이진으로 변환하면 추가적인 식별 속성이 필요하고, 삼항 관계의 제약 조건을 이진 관계의 제약 조건으로 번역하기 어려울 수 있다.

## 예시

대학교 데이터베이스의 관계 집합 예시:

```
instructor ---<advisor>--- student
  (ID)                      (ID)
  (name)                    (name)
  (salary)                  (tot_cred)
```

삼항 관계 집합 예시: `proj_guide`는 `instructor`, `student`, `project` 세 개체 집합을 연결하여 어떤 교수가 어떤 프로젝트에서 어떤 학생을 지도하는지를 표현한다.

기술적 속성을 가진 관계: `takes` 관계에 `grade` 속성을 부착하여 학생이 특정 섹션에서 받은 성적을 기록한다.

## 관련 개념

- [Entity Set](/knowledge/database/entity-set/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
- [Mapping Cardinality](/knowledge/database/mapping-cardinality/)
