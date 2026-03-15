---
title: "콘웨이의 법칙 (Conway's Law)"
description: "시스템을 설계하는 조직은 자신의 커뮤니케이션 구조를 반영하는 설계를 만든다"
tags: ["Software Engineering", "Architecture", "Organization"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/architectural-design/conways-law
sidebar:
  order: 12
---

## 핵심 개념

콘웨이의 법칙(Conway's Law)은 "시스템을 설계하는 조직은 자신의 커뮤니케이션 구조를 반영하는 설계를 만든다"는 관찰이다. Melvin Conway가 1967년에 제시했다. 소프트웨어의 구조는 그것을 만든 조직의 구조를 거울처럼 반영한다 — 이는 의도적이 아니라 자연스럽게 발생한다.

## 동작 원리

실제 사례:
- 3개 팀이 컴파일러를 개발하면 3-pass 컴파일러가 나온다
- 프론트엔드/백엔드 팀이 분리되면 API가 자연스럽게 팀 경계가 된다
- 원격 팀 간의 모듈은 결합도가 낮고, 같은 사무실 팀의 모듈은 결합도가 높은 경향

이 법칙의 교훈:
- 소프트웨어를 고치려면 먼저 팀을 고쳐야 한다
- 원하는 아키텍처에 맞게 팀 구조를 설계해야 한다 (**역 콘웨이 기동, Inverse Conway Maneuver**)
- QA와 개발자 사이의 관계도 소프트웨어 품질에 직접적으로 영향을 미친다

## 예시

팀 구조가 소프트웨어 구조에 반영되는 예:

```
팀 구조:                    소프트웨어 구조:
┌─────────────┐            ┌─────────────┐
│ Frontend팀  │◄──────────►│ React SPA   │
├─────────────┤    API     ├─────────────┤
│ Backend팀   │◄──────────►│ REST API    │
├─────────────┤    DB      ├─────────────┤
│ Data팀      │◄──────────►│ PostgreSQL  │
└─────────────┘            └─────────────┘

→ 팀 경계 = API 경계 = 모듈 경계
```

역 콘웨이 기동 적용:
```
목표 아키텍처: 마이크로서비스
→ 팀을 도메인 기반으로 재편성

Before:
  Frontend팀 + Backend팀 + DBA팀
  → Monolith (모든 팀이 하나의 코드베이스를 공유)

After:
  주문팀 (주문 서비스 전체 담당)
  결제팀 (결제 서비스 전체 담당)
  사용자팀 (사용자 서비스 전체 담당)
  → Microservices (팀 경계 = 서비스 경계)
```

## 관련 개념

- [소프트웨어 아키텍처 (Software Architecture)](/knowledge/software-engineering/architectural-design/software-architecture/)
- [응집도 (Cohesion)](/knowledge/software-engineering/architectural-design/cohesion/)
- [결합도 (Coupling)](/knowledge/software-engineering/architectural-design/coupling/)
- [도메인 주도 설계 (Domain-Driven Design)](/knowledge/software-engineering/architectural-design/domain-driven-design/)
