---
title: "Application Framework"
description: "애플리케이션 프레임워크는 관련 애플리케이션 군(family)에 대한 재사용 가능한 아키텍처를 제공하는 통합된 소프트웨어 산출물(클래스, 객체, 컴포넌트)의 집합이다"
tags: ['Application Framework', 'Software Reuse', 'MVC', 'Inversion Of Control', 'Web Framework', 'Middleware']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/application-framework
sidebar:
  order: 3
---

## 핵심 개념

프레임워크는 특정 유형의 애플리케이션에서 공통적으로 사용되는 기능을 지원하며, 개발자가 특정 기능을 추가하여 전문화할 수 있도록 설계된다. 가장 널리 사용되는 것은 웹 애플리케이션 프레임워크(WAF)로, Model-View-Controller(MVC) 패턴을 기반으로 한다. 프레임워크는 "제어의 역전(Inversion of Control)" 개념을 적용하여, 애플리케이션별 객체가 아닌 프레임워크 객체가 시스템 제어를 담당한다. 콜백과 훅 메서드를 통해 개발자가 제공한 기능과 프레임워크가 연결된다. 프레임워크 종류에는 시스템 인프라 프레임워크, 미들웨어 통합 프레임워크, 엔터프라이즈 애플리케이션 프레임워크가 있다.

## 예시

Django(Python), Spring(Java), Ruby on Rails 등의 웹 프레임워크는 보안(인증/접근 제어), 동적 웹 페이지 생성, 데이터베이스 통합, 세션 관리, AJAX/HTML5 지원 등의 기능을 제공한다.

## 관련 개념

- [Software Reuse](/knowledge/software-engineering/software-reuse/)
- [Software Product Line](/knowledge/software-engineering/software-product-line/)
- [Component-Based Software Engineering](/knowledge/software-engineering/component-based-software-engineering/)
- [Middleware](/knowledge/software-engineering/middleware/)
