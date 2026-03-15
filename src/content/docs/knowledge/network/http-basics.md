---
title: "HTTP (HyperText Transfer Protocol)"
description: "웹 브라우저와 웹 서버 간에 데이터를 주고받기 위한 요청-응답 기반의 통신 프로토콜이다"
tags: ["Network", "Web", "HTTP", "Protocol"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/http-basics
sidebar:
  order: 20
---

## 핵심 개념

HTTP(HyperText Transfer Protocol)는 웹 브라우저(클라이언트)와 웹 서버 간에 데이터를 주고받기 위한 **요청-응답 기반의 통신 프로토콜**이다. 클라이언트가 요청(request)을 보내면 서버가 응답(response)을 반환하는 단순한 모델로 작동한다.

## 동작 원리

**주요 메서드(Method)**:
- **GET**: 서버로부터 자원을 요청한다. 웹 페이지를 열 때 브라우저가 보내는 기본 요청이다.
- **POST**: 서버에 데이터를 전송한다. 로그인 폼 제출, 파일 업로드 등에 사용된다.
- **PUT**, **DELETE** 등: 자원의 수정, 삭제에 사용된다.

**상태 코드(Status Code)**: 서버의 응답 결과를 숫자로 나타낸다.
- 200: 성공
- 301: 영구 이동(리다이렉트)
- 404: 자원을 찾을 수 없음
- 500: 서버 내부 오류

**무상태(Stateless) 프로토콜**: HTTP는 기본적으로 각 요청이 독립적이며, 서버는 이전 요청의 맥락을 기억하지 않는다. 이 한계를 극복하기 위해 쿠키가 사용된다.

**HTTPS**: HTTP에 TLS/SSL 암호화를 추가한 버전이다. 전송되는 데이터를 암호화하여 도청과 변조를 방지하며, 현대 웹에서는 사실상 표준이 되었다. 공개키 암호화를 사용하여 안전한 채널을 수립한다.

## 예시

브라우저에서 `http://www.example.com/page.html`을 입력하면:

```
1. 브라우저 → 서버: 요청
   GET /page.html HTTP/1.1
   Host: www.example.com

2. 서버 → 브라우저: 응답
   HTTP/1.1 200 OK
   Content-Type: text/html

   <html><body>Hello World</body></html>
```

POST 요청 예시 (로그인):
```
POST /login HTTP/1.1
Host: www.example.com
Content-Type: application/x-www-form-urlencoded

username=user1&password=secret123
```

## 관련 개념

- [URL](/knowledge/network/url/) - HTTP 요청의 대상 주소
- [HTML (하이퍼텍스트 마크업 언어)](/knowledge/network/html-basics/) - HTTP로 전송되는 주요 콘텐츠
- [쿠키 (Cookie)](/knowledge/network/cookie/) - HTTP의 무상태성을 보완하는 메커니즘
- [TCP/IP (기초 개념)](/knowledge/network/tcp-ip-basics/) - HTTP가 동작하는 하위 프로토콜
- [프로토콜 스택 (Protocol Stack)](/knowledge/network/protocol-stack/) - HTTP는 응용 계층 프로토콜

## 출처

- Understanding the Digital World, Chapter 10
