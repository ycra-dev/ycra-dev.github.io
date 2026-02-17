---
title: "Component-Based Software Engineering"
description: "컴포넌트 기반 소프트웨어 엔지니어링(CBSE)은 표준화된 재사용 가능한 컴포넌트를 정의, 구현, 통합/조합하여 시스템을 개발하는 소프트웨어 개발 접근법이다"
tags: ['Cbse', 'Component Based', 'Software Engineering', 'Reuse', 'Interface', 'Deployment']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/component-based-software-engineering
sidebar:
  order: 8
---

## 핵심 개념

CBSE는 객체 지향 개발이 기대했던 광범위한 재사용을 달성하지 못한 것에 대한 불만에서 1990년대 후반에 등장했다. 컴포넌트는 인터페이스로 정의되며, 독립적이고 배포 가능하며 문서화되고 표준화되어야 한다. CBSE의 핵심 요소는 독립적인 컴포넌트(인터페이스로 완전히 명세), 컴포넌트 표준(인터페이스 정의와 통합 촉진), 미들웨어(컴포넌트 통신 지원), 컴포넌트 기반에 맞는 개발 프로세스이다. CBSE 프로세스에는 재사용을 위한 개발(development for reuse)과 재사용에 의한 개발(development with reuse) 두 가지 유형이 있다. 서비스 지향 소프트웨어 엔지니어링이 점진적으로 내장 컴포넌트 방식의 CBSE를 대체하고 있다.

## 예시

센서 데이터 수집 컴포넌트는 "provides" 인터페이스(add, remove, start, stop, test, report, listAll 메서드)와 "requires" 인터페이스(sensorData, sensorManagement)를 통해 다른 컴포넌트와 상호작용한다.

## 관련 개념

- [Software Reuse](/knowledge/software-engineering/software-reuse/)
- [Component Model](/knowledge/software-engineering/component-model/)
- [Component Composition](/knowledge/software-engineering/component-composition/)
- [Service-Oriented Architecture](/knowledge/software-engineering/service-oriented-architecture/)
- [Middleware](/knowledge/software-engineering/middleware/)
