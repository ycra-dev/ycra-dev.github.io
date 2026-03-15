---
title: "단일 페이지 애플리케이션 (SPA)"
description: "SPA는 페이지 전체를 새로 불러오지 않고 하나의 페이지 안에서 콘텐츠를 동적으로 갱신하는 웹 애플리케이션 방식으로, 데스크톱 앱과 유사한 매끄러운 사용자 경험을 제공한다."
tags: ["Software Engineering", "SPA", "Web Development", "JavaScript", "AJAX"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/single-page-application
sidebar:
  order: 18
---

## 핵심 개념

SPA는 AJAX(Asynchronous JavaScript and XML) 기술의 발전으로 가능해졌다. 하나의 페이지만 로드하고 이후에는 필요한 데이터만 API를 통해 받아와 동적으로 페이지를 업데이트한다.

페이지 새로고침이 없기 때문에 **데스크톱 애플리케이션과 유사한 매끄러운 UX**를 제공한다. Angular, React, Vue.js 같은 프레임워크가 SPA 개발을 용이하게 한다.

SPA는 API를 통해 서버와 통신하며, 이는 웹 개발에서 API의 중요성이 커진 주요 이유 중 하나다.

## 동작 원리

```
전통적 웹앱: 페이지A → 서버 요청 → 페이지B (전체 리로드)
SPA:        페이지 로드 → API로 데이터 요청 → DOM 업데이트 (리로드 없음)
```

1. 최초 방문 시 HTML + JavaScript 앱 전체를 다운로드
2. 이후 사용자 행동에 따라 API로 데이터만 요청
3. 받은 데이터로 DOM을 동적으로 업데이트
4. URL 변경은 History API로 처리 (실제 페이지 이동 없음)

## 예시

- Gmail: 받은 편지함, 메일 작성 등을 페이지 이동 없이 처리
- Google Maps: 지도 이동, 검색을 하나의 페이지에서 처리
- Twitter/X: 타임라인을 스크롤하며 동적으로 콘텐츠 로드

## 관련 개념

- [서버 사이드 vs 클라이언트 사이드 렌더링 (SSR vs CSR)](/knowledge/software-engineering/systems-and-services/server-side-vs-client-side-rendering/)
- [웹 API (Web API)](/knowledge/software-engineering/systems-and-services/web-api/)
- [DOM](/knowledge/software-engineering/systems-and-services/dom/)
- [HTTP 프로토콜 (HTTP Protocol)](/knowledge/software-engineering/systems-and-services/http-protocol/)
