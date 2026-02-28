---
title: "Web API"
description: "Web API는 프로그램 간에 데이터를 주고받고 기능을 호출할 수 있도록 정의된 인터페이스로, 특히 웹에서 클라이언트와 서버 간 통신에 사용된다."
tags: ["Software Engineering", "API", "Web Development", "REST", "HTTP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/web-api
sidebar:
  order: 19
---

## 핵심 개념

웹 개발에서 API는 한 프로그램이 다른 프로그램에게 명령을 보내 작업을 수행하거나 데이터를 반환받을 수 있는 **명세(specification)**다.

SPA와 클라이언트 사이드 렌더링 애플리케이션에서 API는 필수적이다. 서버 사이드 렌더링에서는 서버가 직접 데이터에 접근할 수 있지만, 클라이언트 사이드 렌더링에서는 브라우저 안에서 실행되는 애플리케이션이 서버와 통신할 **명시적인 방법**이 필요하기 때문이다.

모바일 앱, SPA 등 다양한 클라이언트가 동일한 API를 공유할 수 있다는 것이 API 방식의 큰 장점이다.

## 동작 원리

REST API는 HTTP 메서드를 활용한 API 설계 방식이다:
- **GET /users**: 사용자 목록 조회
- **GET /users/123**: 특정 사용자 조회
- **POST /users**: 새 사용자 생성
- **PUT /users/123**: 사용자 수정
- **DELETE /users/123**: 사용자 삭제

## 예시

```javascript
// JavaScript에서 REST API 호출 예시
fetch('https://api.example.com/users/123')
  .then(response => response.json())
  .then(data => {
    console.log(data.name);  // API에서 받은 사용자 데이터
  });

// POST 요청으로 데이터 전송
fetch('https://api.example.com/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ product: 'Widget', quantity: 5 })
});
```

## 관련 개념

- [Single Page Application](/knowledge/software-engineering/systems-and-services/single-page-application/)
- [Back-End Development](/knowledge/software-engineering/foundations/back-end-development/)
- [HTTP Protocol](/knowledge/software-engineering/systems-and-services/http-protocol/)
- [RESTful Service](/knowledge/software-engineering/systems-and-services/restful-service/)
