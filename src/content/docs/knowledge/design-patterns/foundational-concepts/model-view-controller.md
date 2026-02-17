---
title: "Model-View-Controller"
description: "사용자 인터페이스를 Model(데이터), View(화면 표현), Controller(입력 처리)의 세 가지 객체로 분리하는 아키텍처 패턴"
tags: ['MVC', 'Architectural Pattern', 'User Interface', 'Decoupling']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/model-view-controller
sidebar:
  order: 2
---

## 핵심 개념

Smalltalk-80에서 사용자 인터페이스 구축을 위해 도입된 MVC 트라이어드. Model은 애플리케이션 데이터를 담당하고, View는 화면에 데이터를 표현하며, Controller는 사용자 입력에 대한 반응을 정의한다. MVC 이전에는 이 세 가지 관심사가 하나의 객체에 혼재되어 있었다. MVC는 구독/통지(subscribe/notify) 프로토콜을 통해 Model과 View를 분리하여, 하나의 Model에 여러 View를 붙일 수 있다. View-Controller 관계는 Strategy 패턴의 예시이고, 중첩 View는 Composite 패턴의 예시이며, Model과 View 사이의 구독/통지는 Observer 패턴의 예시이다.

## 예시

```
// Model: 스프레드시트 데이터
// View 1: 테이블 뷰 (표 형태로 표시)
// View 2: 막대 그래프
// View 3: 파이 차트
// Model 데이터가 변경되면 모든 View에 자동 통지
model.addObserver(tableView);
model.addObserver(barChart);
model.addObserver(pieChart);
```

## 관련 개념

[Observer Pattern](/knowledge/language/design-patterns/observer-pattern/), [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/), [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/), [Design Pattern](/knowledge/language/design-patterns/design-pattern/)
