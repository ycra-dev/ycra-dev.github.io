---
title: "MVC Pattern"
description: "MVC(Model-View-Controller) 패턴은 시스템을 모델(데이터와 비즈니스 로직), 뷰(사용자 인터페이스), 컨트롤러(사용자 입력 처리)의 세 구성요소로 분리하는 아키텍처 패턴이다"
tags: ['MVC', 'Model View Controller', 'Separation Of Concerns', 'Web Framework', 'Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/mvc-pattern
sidebar:
  order: 6
---

## 핵심 개념

MVC 패턴은 관심사 분리(separation of concerns) 원칙을 적용하여 UI와 비즈니스 로직을 독립적으로 개발하고 변경할 수 있게 한다. 모델은 시스템의 데이터와 상태를 관리하며, 뷰는 데이터를 사용자에게 표시하고, 컨트롤러는 사용자 입력을 해석하여 모델과 뷰에 전달한다. 하나의 모델에 대해 여러 개의 뷰가 존재할 수 있어, 같은 데이터를 다른 형태로 표현할 수 있다. 웹 프레임워크(Spring MVC, Django, Ruby on Rails 등)에서 널리 사용된다.

## 예시

웹 애플리케이션에서의 MVC: Model - 데이터베이스의 학생 정보를 관리하는 Student 클래스, View - 학생 목록을 HTML 테이블로 표시하는 템플릿, Controller - "/students" URL 요청을 처리하여 Student 모델에서 데이터를 가져와 View에 전달하는 핸들러.

## 관련 개념

- [Architectural Patterns](/knowledge/software-engineering/architectural-patterns/)
- [Software Architecture](/knowledge/software-engineering/software-architecture/)
- [Layered Architecture](/knowledge/software-engineering/layered-architecture/)
