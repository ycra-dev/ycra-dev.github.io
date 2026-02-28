---
title: "URL (Uniform Resource Locator)"
description: "웹 상의 자원의 위치를 고유하게 지정하는 주소 체계로 protocol://domain/path 형식으로 구성된다"
tags: ["Network", "Web", "URL", "Addressing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/url
sidebar:
  order: 19
---

## 핵심 개념

URL(Uniform Resource Locator)은 웹 상의 자원(웹 페이지, 이미지, 파일 등)의 위치를 고유하게 지정하는 주소 체계로, `protocol://domain/path` 형식으로 구성된다.

## 동작 원리

URL은 웹의 핵심 구성 요소로, 인터넷에 존재하는 모든 자원에 접근하기 위한 표준화된 주소이다. URL의 구조는 세 가지 주요 부분으로 나뉜다.

**프로토콜(Protocol)**: 자원에 접근하는 방식을 지정한다. `http`, `https`, `ftp`, `mailto` 등이 있다. `https`는 암호화된 통신을 사용하는 보안 버전이다.

**도메인(Domain)**: 자원이 위치한 서버를 식별한다. `www.amazon.com`처럼 사람이 읽을 수 있는 이름으로, DNS를 통해 IP 주소로 변환된다.

**경로(Path)**: 서버 내에서 특정 자원의 위치를 나타낸다. `/books/computer-science/index.html`처럼 디렉토리 구조를 반영한다.

추가 구성요소:
- **쿼리 문자열** (`?key=value`): 서버에 추가 정보를 전달
- **프래그먼트** (`#section`): 페이지 내 특정 위치를 가리킴

URL은 Tim Berners-Lee가 월드 와이드 웹을 발명하면서 함께 설계한 것으로, 웹의 세 가지 핵심 기술(URL, HTTP, HTML) 중 하나이다.

## 예시

```
https://www.example.com/products/laptop?color=silver&page=2#reviews

- 프로토콜: https (암호화된 HTTP)
- 도메인: www.example.com
- 경로: /products/laptop
- 쿼리 문자열: ?color=silver&page=2
- 프래그먼트: #reviews
```

일상적인 URL 예시:
- `http://www.amazon.com` — 아마존 홈페이지
- `https://mail.google.com/mail/inbox` — Gmail 받은편지함
- `ftp://files.example.com/documents/report.pdf` — FTP 파일 접근

## 관련 개념

- [HTTP](/knowledge/network/http-basics/) - URL의 프로토콜 부분에서 가장 흔히 사용되는 프로토콜
- [HTML](/knowledge/network/html-basics/) - 하이퍼링크에 URL을 사용하여 문서 연결
- [DNS](/knowledge/network/dns-basics/) - 도메인 이름을 IP 주소로 변환
- [IP 주소 (IP Address)](/knowledge/network/ip-address/) - URL의 도메인이 최종적으로 가리키는 주소

## 출처

- Understanding the Digital World, Chapter 10
