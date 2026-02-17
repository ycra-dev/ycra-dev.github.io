---
title: "RDF"
description: "RDF(Resource Description Framework)는 개체-관계 모델에 기반한 데이터 표현 표준으로, 데이터를 (주어, 술어, 목적어) 형태의 트리플(triple)로 표현하며, 그래프 기반의 지식 표현과 질의를 지원한다"
tags: ['Rdf', 'Knowledge Graph', 'Semi Structured Data', 'Sparql', 'Triple']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/rdf
sidebar:
  order: 4
---

## 핵심 개념

RDF의 기본 데이터 단위는 트리플(triple)이며, (subject, predicate, object)의 구조를 가진다. 주어(subject)는 개체의 식별자이고, 술어(predicate)는 속성명이나 관계명이며, 목적어(object)는 속성값이나 관련 개체의 식별자이다. E-R 모델과 달리 RDF는 이진 관계(binary relationship)만 지원한다.

RDF 표현은 매우 자연스러운 그래프 해석을 가진다. 개체와 속성값은 노드(node)로, 속성명과 관계는 간선(edge)으로 표현된다. 이러한 그래프 표현을 지식 그래프(knowledge graph)라 하며, 위키데이터(Wikidata), DBPedia, Freebase 등 대규모 지식 베이스에서 사용된다.

개체 타입 정보는 instance-of 관계로 표현하고, 타입-하위타입 관계는 subtype 간선으로 표현한다. E-R 모델이나 관계 스키마와 달리, RDF는 새로운 속성이나 관계 유형을 쉽게 추가할 수 있어 유연성이 높다.

n-ary 관계를 표현하기 위해 실체화(reification) 기법을 사용한다. 관계를 나타내는 인공 개체를 생성하고, 이 개체와 관계에 참여하는 각 개체를 이진 관계로 연결한다. 또한 문맥(context) 속성을 추가한 쿼드(quad) 형태로 확장할 수도 있다.

SPARQL은 RDF 데이터를 질의하기 위해 설계된 언어로, 트리플 패턴(triple pattern)을 기반으로 한다. 트리플 패턴은 RDF 트리플과 유사하지만 변수를 포함할 수 있으며, 여러 트리플 패턴 간의 공유 변수가 조인 조건을 형성한다.

Linked Open Data 프로젝트는 독립적으로 생성된 여러 지식 그래프를 연결하여 공개적으로 접근 가능하게 하는 것을 목표로 하며, 이를 통해 여러 지식 그래프의 정보를 결합한 질의가 가능하다.

## 예시

```
-- RDF 트리플 표현 (대학 데이터베이스)
10101   instance-of     instructor .
10101   name            "Srinivasan" .
10101   salary          "6500" .
00128   instance-of     student .
00128   name            "Zhang" .
CS-101  instance-of     course .
CS-101  title           "Intro. to Computer Science" .
CS-101  course_dept     comp_sci .
10101   teaches         sec1 .
00128   takes           sec1 .
```

```
-- SPARQL 질의: "Intro. to Computer Science"를 수강한 학생 이름
select ?name
where {
    ?cid title "Intro. to Computer Science" .
    ?sid sec_course ?cid .
    ?id takes ?sid .
    ?id name ?name .
}
-- 공유 변수 ?cid, ?sid, ?id가 조인 조건을 형성
```

## 관련 개념

- [Semi-structured Data](/knowledge/database/semi-structured-data/)
- [JSON](/knowledge/database/json/)
- [XML](/knowledge/database/xml/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
