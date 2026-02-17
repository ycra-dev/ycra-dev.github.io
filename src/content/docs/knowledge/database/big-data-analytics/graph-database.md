---
title: "Graph Database"
description: "그래프 데이터베이스(Graph Database)는 노드(node)와 에지(edge)로 이루어진 그래프 데이터를 저장하고, 경로 질의(path query)와 같은 그래프 특화 연산을 효율적으로 처리하도록 설계된 데이터베이스 시스템이다"
tags: ['Graph Database', 'Neo4j', 'Cypher', 'Graph Processing', 'Big Data']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/graph-database
sidebar:
  order: 6
---

## 핵심 개념

그래프는 데이터베이스가 다루어야 하는 중요한 데이터 유형이다. 컴퓨터 네트워크(라우터가 노드, 링크가 에지), 도로 네트워크(교차점이 노드, 도로가 에지), 웹 페이지(페이지가 노드, 하이퍼링크가 에지) 등이 그래프로 모델링될 수 있다. E-R 모델에서도 모든 엔티티를 노드로, 모든 이진 관계를 에지로 모델링할 수 있다.

그래프는 관계형 모델에서 node(ID, label, node_data)와 edge(fromID, toID, label, edge_data) 두 릴레이션으로 표현할 수 있다. 그러나 Neo4j 같은 그래프 데이터베이스는 여러 추가 기능을 제공한다:
- 릴레이션을 노드 또는 에지로 식별하는 특별한 구문
- 경로 질의를 쉽게 표현할 수 있는 질의 언어
- 그래프 질의의 효율적인 구현
- 그래프 시각화 지원

대규모 그래프의 병렬 처리를 위한 두 가지 접근법이 있다:
1. **MapReduce/대수적 프레임워크**: 그래프를 릴레이션으로 표현하고 Spark 같은 시스템으로 처리
2. **벌크 동기 처리(BSP)**: Pregel/Apache Giraph처럼 각 정점에서 반복적 계산을 수행하며, 이웃 노드와 메시지를 주고받는 방식

## 예시

Neo4j의 Cypher 질의 언어 예시:

```cypher
MATCH (i:instructor)<-[:advisor]-(s:student)
WHERE i.dept_name = 'Comp. Sci.'
RETURN i.ID AS ID, i.name AS name, collect(s.name) AS advisees
```

이 질의는 컴퓨터과학과의 각 교수와 그 교수의 지도 학생 목록을 반환한다.

재귀적 에지 탐색 예시:

```cypher
MATCH (c1:course)-[:prereq*1..]->(c2:course)
RETURN c1.course_id, c2.course_id
```

이 질의는 직접 및 간접 선수과목 관계를 모두 찾는다. `*1..`은 최소 1개 이상의 prereq 에지를 가진 경로를 의미한다.

## 관련 개념

- [Apache Spark](/knowledge/database/apache-spark/)
- [MapReduce](/knowledge/database/mapreduce/)
- [Streaming Data](/knowledge/database/streaming-data/)
- [NoSQL](/knowledge/database/nosql/)
