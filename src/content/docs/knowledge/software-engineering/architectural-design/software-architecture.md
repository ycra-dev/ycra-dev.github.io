---
title: "Software Architecture"
description: "소프트웨어 아키텍처는 시스템의 전체 구조를 정의하는 것으로, 주요 구성요소(컴포넌트), 그들 간의 관계, 그리고 컴포넌트 분배 방식을 포함한다"
tags: ['Software Architecture', 'System Design', 'Architectural Views', '4plus1 View', 'Component']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-architecture
sidebar:
  order: 1
---

## 핵심 개념

아키텍처 설계는 요구사항 공학과 설계 사이를 잇는 핵심 단계로, 시스템을 주요 컴포넌트로 분해하고 그들 간의 통신 방식을 정의한다. 아키텍처 설계 결정에는 사용할 아키텍처 패턴, 시스템 분배 방식, 사용할 아키텍처 스타일 등이 포함된다. Krutchen의 4+1 뷰 모델은 아키텍처를 논리 뷰, 프로세스 뷰, 개발 뷰, 물리 뷰의 네 가지 관점으로 표현하며, 유스 케이스가 이들을 연결한다. 아키텍처는 비기능적 요구사항(성능, 보안, 가용성 등)의 달성에 큰 영향을 미친다.

## 예시

4+1 아키텍처 뷰: (1) 논리 뷰 - 시스템의 기능적 분해(클래스/패키지), (2) 프로세스 뷰 - 런타임 프로세스 및 통신, (3) 개발 뷰 - 소프트웨어 모듈 구조, (4) 물리 뷰 - 하드웨어 배치, (+1) 유스 케이스 뷰 - 시나리오로 뷰 간 일관성 검증.

## 관련 개념

- [Architectural Patterns](/knowledge/software-engineering/architectural-patterns/)
- [MVC Pattern](/knowledge/software-engineering/mvc-pattern/)
- [Layered Architecture](/knowledge/software-engineering/layered-architecture/)
- [Non-functional Requirements](/knowledge/software-engineering/non-functional-requirements/)
