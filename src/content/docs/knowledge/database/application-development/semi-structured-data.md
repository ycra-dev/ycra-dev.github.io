---
title: "Semi-structured Data"
description: "반정형 데이터(Semi-structured Data)는 스키마가 자주 변하거나 각 레코드가 서로 다른 속성 집합을 가질 수 있는 복잡한 데이터로, 관계형 모델의 고정된 스키마와 달리 유연한 구조를 허용하는 데이터 표현 방식이다"
tags: ['Semi Structured Data', 'Json', 'Xml', 'Rdf', 'Data Model']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/semi-structured-data
sidebar:
  order: 1
---

## 핵심 개념

반정형 데이터는 전통적인 관계형 모델이 가정하는 고정 스키마의 한계를 극복하기 위해 등장했다. 관계형 모델에서는 모든 튜플이 동일한 속성 집합을 가져야 하지만, 현실의 많은 데이터는 이 가정에 맞지 않는다. 예를 들어, 제품 카탈로그에서 각 제품 종류는 서로 다른 속성을 가질 수 있다.

반정형 데이터의 핵심 특성은 세 가지이다. 첫째, 각 튜플이 잠재적으로 서로 다른 속성 집합을 가질 수 있다(와이드 컬럼, 희소 컬럼). 둘째, 속성이 비원자적(non-atomic) 값을 가질 수 있다. 예를 들어, 배열이나 중첩 객체가 속성값이 될 수 있다. 셋째, 속성이 구조화될 수 있어, E-R 모델의 복합 속성을 직접 모델링할 수 있다.

반정형 데이터의 주요 표현 형식으로는 JSON(JavaScript Object Notation), XML(eXtensible Markup Language), RDF(Resource Description Framework)가 있다. JSON은 웹 서비스에서 데이터 전송에 가장 널리 사용되며, XML은 보다 풍부한 문서 구조를 지원하고, RDF는 지식 그래프와 링크드 데이터에 적합하다.

현대 애플리케이션 아키텍처에서는 웹 서비스를 통해 데이터를 검색하고 애플리케이션 코드가 이를 표시하는 구조가 일반적이며, 반정형 데이터 형식(특히 JSON)이 이러한 데이터 교환의 표준 형식으로 자리잡았다.

## 예시

```json
// JSON 형식의 반정형 데이터 예시
{
  "ID": "00128",
  "name": {"first_name": "Zhang", "last_name": "Wei"},
  "dept_name": "Comp. Sci.",
  "tot_cred": 102,
  "address": [
    {"city": "Shanghai", "street": "Main St"},
    {"city": "Beijing", "street": "North Ave"}
  ]
}

// 같은 컬렉션의 다른 레코드가 다른 속성을 가질 수 있음
{
  "ID": "12345",
  "name": "Shankar",
  "dept_name": "Comp. Sci.",
  "scholarship": true
}
```

## 관련 개념

- [JSON](/knowledge/database/json/)
- [XML](/knowledge/database/xml/)
- [RDF](/knowledge/database/rdf/)
- [First Normal Form](/knowledge/database/first-normal-form/)
- [Entity-Relationship Model](/knowledge/database/entity-relationship-model/)
