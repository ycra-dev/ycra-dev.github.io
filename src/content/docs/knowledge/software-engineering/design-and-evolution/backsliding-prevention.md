---
title: "Backsliding Prevention"
description: "활발히 제거되고 있는 구식 시스템에 대한 새로운 사용이 추가되는 것을 방지하는 인프라와 도구"
tags: ["Software Engineering", "Design and Evolution"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/backsliding-prevention
sidebar:
  order: 54
---

## 핵심 개념

Backsliding prevention(후퇴 방지)은 Deprecation에서 흔히 간과되지만 매우 중요한 요소이다. 이것이 없으면 deprecation은 "두더지 잡기(whack-a-mole)" 게임이 된다: 사용자들은 익숙하거나 코드베이스에서 예시를 찾은 구식 시스템을 계속 사용하고, deprecation 팀은 이 새로운 사용들을 끊임없이 마이그레이션해야 한다.

## 동작 원리

Google은 두 가지 수준에서 backsliding을 방지한다:

**미시적 수준(Micro level)**:
- Tricorder 정적 분석 프레임워크를 사용하여 deprecated 시스템에 대한 호출을 추가하는 사용자에게 코드 리뷰 시점에 알림을 보낸다
- 적절한 대체품을 안내한다

**거시적 수준(Macro level)**:
- 빌드 시스템의 visibility whitelist를 사용하여 deprecated 시스템에 대한 새로운 의존성이 추가되지 않도록 한다
- 자동화 도구가 주기적으로 whitelist를 검사하고 마이그레이션된 시스템을 제거한다

## 예시

Java에서 `@deprecated` 어노테이션을 사용하면 Tricorder가 리뷰 시점에 새로운 사용을 자동으로 감지하고 경고한다. 빌드 시스템에서는 `visibility` 규칙을 설정하여 특정 패키지만 deprecated 라이브러리에 접근할 수 있도록 제한하고, 마이그레이션이 완료된 패키지는 자동으로 whitelist에서 제거된다.

## 관련 개념

- [Deprecation](/knowledge/software-engineering/design-and-evolution/deprecation/)
- [Deprecation Warnings](/knowledge/software-engineering/design-and-evolution/deprecation-warnings/)
- [Compulsory Deprecation](/knowledge/software-engineering/design-and-evolution/compulsory-deprecation/)
