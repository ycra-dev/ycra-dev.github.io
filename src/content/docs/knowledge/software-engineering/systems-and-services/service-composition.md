---
title: "서비스 합성 (Service Composition)"
description: "서비스 합성은 기존 서비스를 조합하고 구성하여 새로운 복합 서비스를 생성하는 프로세스로, 워크플로우 기반으로 비즈니스 프로세스를 지원한다"
tags: ['Service Composition', 'Workflow', 'Bpmn', 'Orchestration', 'Compensation', 'Business Process']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/service-composition
sidebar:
  order: 14
---

## 핵심 개념

서비스 합성의 주요 단계는 개요 워크플로우 수립, 서비스 발견, 가능한 서비스 선택, 워크플로우 세분화, 워크플로우 프로그램 생성, 완성된 서비스 테스트이다. 워크플로우는 비즈니스 프로세스 모델로, BPMN(Business Process Modeling Notation) 또는 UML 활동 다이어그램으로 작성된다. BPMN의 핵심 요소에는 활동(둥근 사각형), 이벤트(원), 게이트웨이(다이아몬드), 시퀀스/메시지 흐름(화살표)이 있다. 보상 액션(compensation action)은 이미 완료된 작업을 취소해야 할 때 사용된다. 외부 서비스 테스트의 어려움으로 서비스 제어 불가, 동적 바인딩의 비결정성, 비기능적 동작의 불확실성, 비용 모델, 보상 액션 테스트 등이 있다.

## 예시

항공사의 여행 패키지 서비스는 항공편 예약 서비스, 호텔 예약 서비스, 렌터카/택시 서비스, 여행 가이드 서비스, 현지 관광지 예약 서비스를 워크플로우로 조합한다. 호텔이 비어있지 않으면 항공편 예약을 취소하는 보상 액션이 필요하다.

## 관련 개념

- [서비스 지향 아키텍처 (Service-Oriented Architecture)](/knowledge/software-engineering/service-oriented-architecture/)
- [서비스 공학 (Service Engineering)](/knowledge/software-engineering/service-engineering/)
- [RESTful 서비스 (RESTful Service)](/knowledge/software-engineering/restful-service/)
- [컴포넌트 합성 (Component Composition)](/knowledge/software-engineering/component-composition/)
