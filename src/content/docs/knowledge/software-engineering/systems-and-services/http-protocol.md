---
title: "HTTP 프로토콜"
description: "HTTP는 웹 브라우저와 웹 서버 간에 데이터를 주고받기 위한 통신 프로토콜로, 웹의 근간을 이루는 무상태(stateless) 프로토콜이다."
tags: ["Software Engineering", "HTTP", "Web Development", "Protocol"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/http-protocol
sidebar:
  order: 15
---

## 핵심 개념

웹 브라우저가 특정 리소스(URI)에 대한 요청(request)을 웹 서버에 보내면, 서버는 해당 콘텐츠를 찾아 HTML, CSS, JavaScript로 구성된 응답(response)을 보낸다.

HTTP의 핵심 특성은 **무상태(stateless)**다. 각 요청은 독립적이며 이전 요청에 대한 정보를 기억하지 않는다. 이로 인해 웹 애플리케이션은 요청 간에 상태를 관리하는 별도의 메커니즘(세션, 쿠키 등)이 필요하다.

이 무상태 특성이 웹 개발을 데스크톱 개발과 근본적으로 다르게 만드는 핵심 요소다.

## 동작 원리

```
클라이언트(브라우저)         서버
      |                       |
      |-- HTTP 요청 (GET) ---> |
      |                       | (HTML 생성)
      |<-- HTTP 응답 (200) --- |
      |                       |
```

주요 HTTP 메서드:
- **GET**: 데이터 조회
- **POST**: 데이터 생성
- **PUT/PATCH**: 데이터 수정
- **DELETE**: 데이터 삭제

## 예시

```
GET /index.html HTTP/1.1
Host: www.example.com

HTTP/1.1 200 OK
Content-Type: text/html
<html>...</html>
```

실제 흐름:
- 브라우저에서 URL 입력 → HTTP GET 요청 → 서버가 HTML 응답 반환 → 브라우저가 렌더링
- 폼 제출 → HTTP POST 요청 → 서버가 데이터 처리 후 응답 반환
- REST API 호출 → HTTP GET/POST/PUT/DELETE → JSON 데이터 응답

## 관련 개념

- [Web API](/knowledge/software-engineering/systems-and-services/web-api/)
- [Server-Side vs Client-Side Rendering](/knowledge/software-engineering/systems-and-services/server-side-vs-client-side-rendering/)
- [Single Page Application](/knowledge/software-engineering/systems-and-services/single-page-application/)
- [DOM](/knowledge/software-engineering/systems-and-services/dom/)
