---
title: "Consistency in Codebase"
description: "모든 코드가 동일한 규칙과 패턴을 따르는 상태 — 어떤 엔지니어든 코드베이스의 어느 부분이든 쉽게 읽고 이해할 수 있게 만드는 핵심 속성"
tags: ["Software Engineering", "Quality", "Consistency", "Readability", "Scalability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/consistency-in-codebase
sidebar:
  order: 41
---

## 핵심 개념

코드베이스의 일관성(Consistency)은 모든 코드가 동일한 규칙과 패턴을 따르는 상태로, 어떤 엔지니어든 코드베이스의 어느 부분이든 쉽게 읽고 이해할 수 있게 만드는 핵심 속성이다.

## 동작 원리

구글은 약 20억 줄의 코드를 하나의 모노레포(monorepo)에서 관리하고, 수만 명의 엔지니어가 이 코드를 공유한다. 이 규모에서 일관성은 선택이 아닌 필수이다.

일관성의 이점:
- **읽기 용이성**: 코드를 읽는 시간이 쓰는 시간보다 훨씬 많다. 일관된 코드는 읽기가 훨씬 쉽다.
- **이동 용이성**: 엔지니어가 다른 팀의 코드를 다룰 때 별도 학습이 필요 없다.
- **도구 지원**: 일관된 패턴은 자동 리팩토링, 정적 분석, IDE 지원을 효과적으로 만든다.
- **대규모 변경**: 코드베이스 전체에 걸친 변경(예: API 마이그레이션)이 가능해진다.

일관성은 반드시 "최선의 방법"을 의미하지 않는다. 때로는 특정 규칙이 최적이 아닐 수 있지만, 일관성 자체의 가치가 개별 최적화의 가치를 초과한다. "한 가지 방법으로 하는 것"이 "각자 최선의 방법으로 하는 것"보다 대규모 조직에서는 더 효율적이다.

단, 일관성에는 범위가 있다. 구글은 "로컬 일관성"(같은 파일, 같은 패키지 내), "프로젝트 일관성", "조직 일관성"의 계층을 인식하며, 좁은 범위의 일관성이 넓은 범위의 일관성보다 우선한다.

## 예시

구글에서 새로운 C++ 기능(예: `std::optional`)이 도입될 때, 스타일 가이드가 이 기능 사용을 허용할지, 어떻게 사용할지를 결정한다. 가이드 업데이트 전까지는 모든 엔지니어가 기존 패턴(예: `absl::optional`)을 사용해야 한다. 이렇게 하면 한 코드베이스에 두 가지 패턴이 무질서하게 섞이는 것을 방지할 수 있다.

## 관련 개념

- [Style Guides and Rules](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
- [Large-Scale Changes](/knowledge/software-engineering/quality-and-configuration/large-scale-changes/)
- [Sustainability](/knowledge/software-engineering/foundations/sustainability/)
