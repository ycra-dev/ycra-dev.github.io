---
title: "활동 다이어그램 (Activity Diagram)"
description: "활동 다이어그램은 프로세스나 데이터 처리의 활동 흐름을 표현하는 UML 다이어그램으로, 순차, 병렬, 조건 분기를 포함한 워크플로우를 모델링한다"
tags: ['Activity Diagram', 'Uml', 'Workflow', 'Process Flow', 'Business Process']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/activity-diagram
sidebar:
  order: 4
---

## 핵심 개념

활동 다이어그램은 비즈니스 프로세스 모델링이나 시스템의 데이터 처리 흐름을 표현하는 데 사용된다. 시작 노드, 종료 노드, 활동(action), 결정(decision) 노드, 포크(fork)/조인(join) 등의 요소로 구성된다. 포크와 조인은 병렬 실행을 표현하며, 결정 노드는 조건에 따른 분기를 나타낸다. 활동 다이어그램은 전통적인 순서도(flowchart)를 UML 문법으로 확장한 것으로 볼 수 있다.

## 예시

온라인 주문 처리 활동 다이어그램: 시작 → 주문 접수 → [포크] → (결제 처리 | 재고 확인) → [조인] → 배송 준비 → 발송 → 종료. 결정 노드: 재고 확인 → [재고 있음] → 배송 준비 / [재고 없음] → 주문 취소.

## 관련 개념

- [UML (통합 모델링 언어)](/knowledge/software-engineering/uml/)
- [상태 다이어그램 (State Diagram)](/knowledge/software-engineering/state-diagram/)
