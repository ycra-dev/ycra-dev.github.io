---
title: "Style Guides and Rules"
description: "코드 작성의 규칙과 지침을 집약한 공식 문서 — 포매팅뿐만 아니라 코드를 작성하는 전체 관례를 포괄하며, 구글에서 규칙은 법이고 지침은 권장 사항이다"
tags: ["Software Engineering", "Quality", "Style Guide", "Consistency", "Readability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/style-guides-and-rules
sidebar:
  order: 39
---

## 핵심 개념

스타일 가이드는 코드 작성의 규칙(rules)과 지침(guidance)을 집약한 공식 문서로, 포매팅뿐만 아니라 코드를 작성하는 전체 관례(conventions)를 포괄한다. 구글에서 규칙은 법(law)이며, 지침은 권장 사항이다.

## 동작 원리

구글의 스타일 가이드는 단순한 코딩 스타일(들여쓰기, 중괄호 위치)을 넘어서 코드를 지배하는 전체 관례의 집합이다. "스타일"이라는 이름이 오해를 부를 수 있지만, 실제로는 언어 사용의 모범 사례, 금지된 기능, 네이밍 규칙, 패턴 등을 모두 포함한다.

**규칙(Rules) vs 지침(Guidance)**:
- **규칙**은 엄격하고 필수적인 법이다. 사전 승인 없이는 무시할 수 없다. 보편적으로 강제된다.
- **지침**은 권장 사항과 모범 사례이다. 따르는 것이 좋지만, 상황에 따라 변형할 여지가 있다.

구글이 스타일 가이드를 중요시하는 이유:
1. **일관성(Consistency)**: 코드베이스 전체가 일관되면 어떤 엔지니어든 어떤 코드든 읽고 이해할 수 있다
2. **규모에서의 효율**: 수만 명의 엔지니어가 수십억 줄의 코드를 공유하는 환경에서는 일관성이 필수적이다
3. **도구 지원**: 일관된 규칙은 자동 포매터, 린터, 정적 분석 도구의 효과를 극대화한다

스타일 가이드의 규칙은 변경 가능하다. 새로운 기능이 추가되거나 모범 사례가 진화하면 규칙도 업데이트된다. 이 점에서 스타일 가이드는 "살아있는 문서"이다.

## 예시

구글의 C++ 스타일 가이드는 예외(exceptions) 사용을 금지한다. 이는 기존 코드베이스가 예외 안전(exception-safe)하지 않기 때문이다. 새로운 프로젝트에서는 예외가 유용할 수 있지만, 기존 코드와의 일관성과 상호 운용성을 위해 이 규칙을 유지한다. 이는 "이 규칙이 절대적으로 최선인가?"가 아니라 "일관성과 트레이드오프를 고려할 때 최선인가?"라는 관점의 예이다.

## 관련 개념

- [Rules vs Guidance](/knowledge/software-engineering/quality-and-configuration/rules-vs-guidance/)
- [Consistency in Codebase](/knowledge/software-engineering/quality-and-configuration/consistency-in-codebase/)
- [Automated Tooling for Style](/knowledge/software-engineering/quality-and-configuration/automated-tooling-for-style/)
- [Code Review](/knowledge/software-engineering/quality-and-configuration/code-review/)
