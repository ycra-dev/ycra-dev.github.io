---
title: "서버 사이드 vs 클라이언트 사이드 렌더링"
description: "서버 사이드 렌더링(SSR)은 서버에서 HTML을 완성하여 브라우저에 전송하는 방식이고, 클라이언트 사이드 렌더링(CSR)은 브라우저에서 JavaScript를 통해 페이지를 동적으로 구성하는 방식이다."
tags: ["Software Engineering", "SSR", "CSR", "Web Development", "Rendering"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/server-side-vs-client-side-rendering
sidebar:
  order: 17
---

## 핵심 개념

| 방식 | 동작 | 대표 기술 |
|------|------|-----------|
| SSR (서버 사이드) | 서버가 완전한 HTML 생성 후 전송 | PHP, ASP.NET, Ruby on Rails |
| CSR (클라이언트 사이드) | 서버가 JS 앱 전달, 브라우저에서 렌더링 | React, Angular, Vue |
| 하이브리드 | SSR과 CSR을 상황에 따라 조합 | Next.js, Nuxt.js |

CSR이 SPA(Single Page Application)로 발전했다. 두 방식을 하나의 웹 애플리케이션에 결합할 수도 있다.

## 동작 원리

```
SSR 흐름: 사용자 요청 → 서버가 HTML 완성 → 브라우저 표시
CSR 흐름: 사용자 요청 → 서버가 JS 앱 전달 → 브라우저에서 렌더링 → 데이터만 API로 요청
```

**SSR 장점**: 초기 로드 속도 빠름, SEO 유리
**SSR 단점**: 페이지 이동 시마다 서버 요청, 덜 매끄러운 UX

**CSR 장점**: 데스크톱 앱 같은 매끄러운 UX, 서버 부하 분산
**CSR 단점**: 초기 로드 느림, SEO 불리할 수 있음

## 예시

- **SSR**: PHP로 서버에서 HTML 생성 → 브라우저가 받아서 표시 (전통적 방식)
- **CSR**: React/Angular/Vue로 브라우저에서 페이지 동적 생성 (현대적 방식)
- **하이브리드**: Next.js — SSR과 CSR을 상황에 따라 조합

## 관련 개념

- [HTTP 프로토콜 (HTTP Protocol)](/knowledge/software-engineering/systems-and-services/http-protocol/)
- [단일 페이지 애플리케이션 (Single Page Application)](/knowledge/software-engineering/systems-and-services/single-page-application/)
- [웹 API (Web API)](/knowledge/software-engineering/systems-and-services/web-api/)
- [DOM](/knowledge/software-engineering/systems-and-services/dom/)
