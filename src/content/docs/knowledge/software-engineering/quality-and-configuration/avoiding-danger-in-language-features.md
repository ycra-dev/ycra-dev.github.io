---
title: "언어 기능의 위험 회피 (Avoiding Danger in Language Features)"
description: "버그 발생 가능성이 높거나 가독성을 해치는 언어 기능의 사용을 제한하거나 금지하는 스타일 가이드 규칙 유형 — 개별 자유를 제한하지만 코드베이스 전체의 안전성을 높인다"
tags: ["Software Engineering", "Quality", "Style Guide", "Language Features", "Risk Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/avoiding-danger-in-language-features
sidebar:
  order: 42
---

## 핵심 개념

언어 기능의 위험 회피는 프로그래밍 언어의 특정 기능이 버그 발생 가능성이 높거나, 가독성을 해치거나, 유지보수를 어렵게 만들 때 해당 기능의 사용을 제한하거나 금지하는 스타일 가이드의 규칙 유형이다.

## 동작 원리

모든 프로그래밍 언어에는 오용하기 쉬운 기능이 있다. 구글의 스타일 가이드는 이런 기능을 식별하고 사용을 제한한다. 이는 개별 엔지니어의 자유를 제한하지만, 코드베이스 전체의 안전성과 유지보수성을 높인다.

**위험한 기능의 유형**:
1. **복잡성을 숨기는 기능**: C++의 연산자 오버로딩, Python의 매직 메서드 등. 코드의 동작이 표면에서 보이지 않게 되어 이해하기 어려워진다.
2. **오류를 유발하는 기능**: C++의 예외, goto 문 등. 제어 흐름을 예측하기 어렵게 만든다.
3. **시간이 지나면 문제가 되는 기능**: 초기에는 편리하지만 장기적으로 기술 부채를 쌓는 기능들.

구글의 접근법은 단순한 "사용 금지"가 아니다. 각 제한의 근거를 문서화하고, 엔지니어가 왜 이 기능이 제한되는지 이해할 수 있게 한다. 또한 새로운 언어 버전이 나오면 규칙을 재평가한다.

**핵심 원칙**: 코드는 작성자가 아닌 읽는 사람을 위해 최적화되어야 한다. 작성 시의 편의보다 읽기, 유지보수, 디버깅의 용이성이 더 중요하다.

## 예시

구글의 C++ 스타일 가이드에서 대표적인 사례:
- **예외(Exceptions) 금지**: 기존 코드가 예외 안전하지 않고, 예외는 제어 흐름을 추론하기 어렵게 만든다
- **RTTI(Run-Time Type Information) 제한**: `dynamic_cast` 등의 사용을 제한하여 런타임 타입 확인 대신 정적 타입 체계 활용을 권장
- **`std::move` 사용 주의**: 이동 의미론의 미묘한 함정을 피하기 위한 가이드라인 제공

Python에서는 `**kwargs`의 무분별한 사용을 제한하여 함수 시그니처의 명확성을 유지한다.

## 관련 개념

- [스타일 가이드와 규칙 (Style Guides and Rules)](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
- [규칙 vs 가이드 (Rules vs Guidance)](/knowledge/software-engineering/quality-and-configuration/rules-vs-guidance/)
- [커뮤니케이션으로서의 코드 (Code as Communication)](/knowledge/software-engineering/quality-and-configuration/code-as-communication/)
