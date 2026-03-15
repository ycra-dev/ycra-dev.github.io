---
title: "디자인 패턴 (Design Pattern)"
description: "소프트웨어 설계에서 반복적으로 발생하는 문제에 대한 재사용 가능한 솔루션을 체계적으로 기술한 것"
tags: ['Design Pattern', 'Software Design', 'Reuse', 'Object Oriented']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/design-pattern
sidebar:
  order: 1
---

## 핵심 개념

Christopher Alexander가 건축 분야에서 제안한 패턴 개념을 소프트웨어 설계에 적용한 것. 디자인 패턴은 이름(name), 문제(problem), 해법(solution), 결과(consequences)의 4가지 핵심 요소로 구성된다. 패턴 이름은 설계 어휘를 높은 추상화 수준으로 확장하며, 동료와의 커뮤니케이션과 문서화를 용이하게 한다. 패턴은 특정 컨텍스트에서 반복적으로 발생하는 설계 문제와 그 핵심 해결책을 기술하여, 같은 해법을 무한히 재사용할 수 있게 한다. GoF 카탈로그는 목적(purpose)에 따라 생성(Creational), 구조(Structural), 행위(Behavioral) 패턴으로 분류하고, 범위(scope)에 따라 클래스 패턴과 객체 패턴으로 구분한다.

## 예시

```
// 패턴의 4가지 요소 예시 (Strategy 패턴)
// 이름: Strategy
// 문제: 알고리즘을 동적으로 교체해야 할 때
// 해법: 알고리즘을 객체로 캡슐화
// 결과: 유연성 증가, 간접 호출 비용 발생
```

## 관련 개념

[Model-View-Controller](/knowledge/language/design-patterns/model-view-controller/), [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/), [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/), [Framework](/knowledge/language/design-patterns/framework/)
