---
title: "상태 다이어그램 (State Diagram)"
description: "상태 다이어그램은 시스템이나 객체의 상태 변화와 상태 간 전이를 유발하는 이벤트를 표현하는 UML 동적 다이어그램이다"
tags: ['State Diagram', 'Uml', 'State Machine', 'Event Driven', 'State Transition']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/state-diagram
sidebar:
  order: 5
---

## 핵심 개념

상태 다이어그램은 이벤트 기반(event-driven) 모델링에 사용되며, 시스템이 외부 또는 내부 이벤트에 어떻게 반응하는지를 표현한다. 각 상태는 둥근 사각형으로, 전이는 화살표로 표현되며, 전이에는 이벤트와 가드 조건(guard condition)이 부여될 수 있다. 상태 다이어그램은 특히 실시간 시스템이나 임베디드 시스템에서 중요하며, 시스템의 모든 가능한 상태와 전이를 명시적으로 표현하여 누락된 이벤트 처리를 발견하는 데 유용하다.

## 예시

주문 처리 시스템의 상태 다이어그램: [주문 접수] --결제완료--> [결제 확인] --재고확인--> [배송 준비] --발송--> [배송 중] --수령확인--> [완료]. 대안 전이: [결제 확인] --재고없음--> [취소].

## 관련 개념

- [UML (통합 모델링 언어)](/knowledge/software-engineering/uml/)
- [활동 다이어그램 (Activity Diagram)](/knowledge/software-engineering/activity-diagram/)
