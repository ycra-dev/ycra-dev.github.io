---
title: "Code Review Types"
description: "변경의 성격에 따라 리뷰의 초점과 방법이 달라지는 구분 — 신규 코드, 동작 변경, 버그 수정, 리팩토링, 대규모 변경 등 유형마다 다른 관점이 필요하다"
tags: ["Software Engineering", "Quality", "Code Review", "Refactoring"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-review-types
sidebar:
  order: 51
---

## 핵심 개념

코드 리뷰 유형(Code Review Types)은 변경의 성격에 따라 리뷰의 초점과 방법이 달라지는 구분이다. 구글은 신규 코드, 동작 변경/개선, 버그 수정, 리팩토링, 대규모 변경 등 여러 유형을 인식한다.

## 동작 원리

**1. 그린필드 리뷰(Greenfield Reviews)**:
- 완전히 새로운 코드/프로젝트에 대한 리뷰
- API 설계, 아키텍처 결정, 테스트 전략에 초점
- 가장 시간이 많이 걸리는 유형
- 코드가 커밋된 후에는 바꾸기 어려운 결정이 많으므로 꼼꼼히 리뷰

**2. 동작 변경 및 개선(Behavioral Changes)**:
- 기존 코드의 기능을 수정하거나 새 기능을 추가
- 기존 코드와의 일관성, 하위 호환성에 주의
- 변경의 범위가 의도한 것과 일치하는지 확인

**3. 버그 수정(Bug Fixes)**:
- 일반적으로 작고 집중적인 변경
- 수정이 실제로 버그를 해결하는지, 다른 문제를 만들지 않는지 확인
- 회귀 테스트 추가가 필수

**4. 리팩토링과 대규모 변경(Refactoring and Large-Scale Changes)**:
- 동작을 변경하지 않는 구조적 개선
- 리팩토링에서는 동작이 변하지 않았음을 검증하는 것이 핵심
- 대규모 변경(LSC)은 코드베이스 전체에 영향을 미치므로 자동화와 특수 프로세스 필요

각 유형마다 리뷰어가 주의해야 할 점이 다르다. 그린필드에서는 "올바른 추상화인가?"를, 버그 수정에서는 "근본 원인을 다루는가?"를, 리팩토링에서는 "동작이 보존되는가?"를 중점적으로 확인한다.

## 예시

구글에서 한 엔지니어가 성능 개선을 위한 리팩토링 CL을 제출했는데, 리뷰어가 리팩토링 도중 미묘한 동작 변경이 섞여 있음을 발견했다. 리뷰어는 "리팩토링(동작 무변경)과 동작 변경을 별도의 CL로 분리해 주세요"라고 요청했다. 이렇게 분리하면 각각의 변경을 더 정확하게 리뷰할 수 있고, 문제가 생겼을 때 롤백도 쉬워진다.

## 관련 개념

- [Code Review](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [Code Review Best Practices](/knowledge/software-engineering/quality-and-configuration/code-review-best-practices/)
- [Large-Scale Changes](/knowledge/software-engineering/quality-and-configuration/large-scale-changes/)
