---
title: "REST API"
description: "REST API(Representational State Transfer API)는 표준 HTTP 요청을 통해 웹 서비스 함수를 호출하는 아키텍처 스타일로, URL을 통해 리소스를 식별하고 HTTP 메서드로 작업을 수행하며, 주로 JSON 형식으로 데이터를 교환하..."
tags: ['Rest', 'Api', 'Web Service', 'Http', 'Json']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/rest-api
sidebar:
  order: 9
---

## 핵심 개념

REST(Representational State Transfer)는 웹 서비스를 구현하는 가장 널리 사용되는 접근법이다. RESTful 웹 서비스에서 함수 호출은 표준 HTTP 요청으로 이루어지며, 매개변수는 HTTP 요청 매개변수로 전송된다. 애플리케이션 서버가 요청을 처리(데이터베이스 갱신 포함 가능)하고 결과를 생성하여 HTTP 응답으로 반환한다. 결과 인코딩에는 JSON이 가장 널리 사용되며, XML도 사용된다.

RESTful 웹 서비스의 가장 일반적인 클라이언트는 웹 브라우저에서 실행되는 JavaScript 코드이다. JavaScript는 Ajax(Asynchronous JavaScript and XML) 기술을 사용하여 비동기적으로(배경에서, 사용자 상호작용을 차단하지 않고) 웹 서버와 통신하고 데이터를 가져와 표시한다. 예를 들어, 지도 인터페이스에서 스크롤 시 새로 표시할 부분을 JavaScript가 RESTful 인터페이스로 가져와 화면에 표시한다.

웹 서비스는 프론트엔드뿐 아니라 백엔드에서도 다른 백엔드 시스템의 기능을 활용하기 위해 점점 더 많이 사용된다. Amazon S3, Google Cloud Storage, Microsoft Azure 같은 웹 기반 스토리지 시스템은 데이터 저장/검색을 위한 웹 서비스 API를 제공한다. 텍스트-음성 변환, 음성 인식, 비전 API 등도 웹 서비스로 제공된다.

모바일 앱에서도 백엔드에 데이터를 저장하는 경우 거의 반드시 웹 서비스를 사용한다. 실제로 동일한 백엔드를 사용하여 웹 프론트엔드(JavaScript)와 여러 모바일 플랫폼(Android, iOS)을 위한 다수의 프론트엔드를 구축하는 것이 일반적이다.

보다 복잡하고 덜 자주 사용되는 방식인 "Big Web Services"는 XML 인코딩, WSDL을 통한 형식적 API 정의, HTTP 위에 구축된 SOAP 프로토콜을 사용한다.

## 예시

```javascript
// JavaScript(jQuery)를 사용한 RESTful 웹 서비스 호출

// 자동완성을 위한 웹 서비스 연결
$("#name").autocomplete({
    source: "/autocomplete_name"
});

// 비동기 데이터 조회 및 DataTable 표시
function loadTableAsync() {
    var params = {
        persontype: $("#persontype").val(),
        name: $("#name").val()
    };
    var url = "/person_query_ajax?" + jQuery.param(params);
    myTable.ajax.url(url).load();
    // 비동기 실행: 함수 즉시 반환, 데이터 도착 시 테이블 자동 갱신
}
```

```
-- RESTful 웹 서비스 요청/응답 예시

-- 요청: GET /person_query_ajax?persontype=student&name=Zhang
-- 응답 (JSON):
{
    "data": [
        {"id": "00128", "name": "Zhang", "dept_name": "Comp. Sci."},
        {"id": "54321", "name": "Zhang", "dept_name": "Physics"}
    ]
}
```

## 관련 개념

- [Web Application Architecture](/knowledge/database/web-application-architecture/)
- [Servlet](/knowledge/database/servlet/)
- [JSON](/knowledge/database/json/)
- [Session Management](/knowledge/database/session-management/)
