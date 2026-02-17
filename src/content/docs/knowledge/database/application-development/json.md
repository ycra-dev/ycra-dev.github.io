---
title: "JSON"
description: "JSON(JavaScript Object Notation)은 복잡한 데이터 타입의 텍스트 기반 표현 형식으로, 애플리케이션 간 데이터 전송과 복잡한 데이터 저장에 가장 널리 사용되는 반정형 데이터 형식이다"
tags: ['Json', 'Semi Structured Data', 'Data Exchange', 'Web Service']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/json
sidebar:
  order: 2
---

## 핵심 개념

JSON은 원래 JavaScript 언어에서 유래했으나, 현재는 거의 모든 프로그래밍 언어에서 지원되는 범용 데이터 교환 형식이 되었다. 웹 서비스와 Ajax 기반 웹 애플리케이션에서 서버와 클라이언트 간 데이터를 전송하는 데 가장 많이 사용된다.

JSON의 기본 데이터 타입은 수치(number), 문자열(string), 불리언(boolean), 배열(array), 객체(object), null이다. 객체는 키-값 쌍의 집합으로 중괄호({})로 표현되며, 배열은 순서가 있는 값의 나열로 대괄호([])로 표현된다. 이들의 중첩을 통해 복잡한 구조를 표현할 수 있다.

JSON은 관계형 모델과 비교하여 여러 확장을 제공한다. 각 레코드(객체)가 서로 다른 속성 집합을 가질 수 있고, 속성이 배열이나 중첩 객체 같은 비원자적 값을 가질 수 있으며, 복합 속성을 직접 모델링할 수 있다. 이러한 유연성 덕분에 스키마가 자주 변하는 애플리케이션에 적합하다.

많은 데이터베이스 시스템이 JSON 데이터 타입을 네이티브로 지원한다. PostgreSQL, MySQL, Oracle, MongoDB 등이 JSON 데이터의 저장, 인덱싱, 질의를 지원한다. HTML5의 IndexedDB도 JSON 객체를 저장하며 여러 속성에 대한 인덱스를 지원한다.

RESTful 웹 서비스에서 JSON은 결과를 인코딩하는 가장 널리 사용되는 형식이며, JavaScript 코드가 브라우저에서 비동기적으로(Ajax) 데이터를 가져와 표시할 때 사용된다.

## 예시

```json
// 대학 데이터베이스의 JSON 표현
{
  "student": [
    {
      "ID": "00128",
      "name": "Zhang",
      "dept_name": "Comp. Sci.",
      "tot_cred": 102,
      "takes": [
        {"course_id": "CS-101", "semester": "Fall", "year": 2017, "grade": "A"},
        {"course_id": "CS-347", "semester": "Fall", "year": 2017, "grade": "A-"}
      ]
    }
  ]
}
```

```javascript
// Ajax에서 JSON 데이터 활용 (jQuery)
$.ajax({
    url: "/person_query_ajax",
    data: {persontype: "student", name: "Zhang"},
    success: function(result) {
        // result는 JSON 객체로 자동 파싱됨
        console.log(result.data[0].name);
    }
});
```

## 관련 개념

- [Semi-structured Data](/knowledge/database/semi-structured-data/)
- [XML](/knowledge/database/xml/)
- [REST API](/knowledge/database/rest-api/)
- [Web Application Architecture](/knowledge/database/web-application-architecture/)
