---
title: "Evolving Style Guides"
description: "언어의 발전과 새로운 모범 사례에 따라 스타일 가이드를 지속적으로 업데이트하는 프로세스 — 스타일 가이드는 고정된 문서가 아닌 살아있는 문서이다"
tags: ["Software Engineering", "Quality", "Style Guide", "Change Management", "Sustainability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/evolving-style-guides
sidebar:
  order: 45
---

## 핵심 개념

스타일 가이드 진화(Evolving Style Guides)는 언어의 발전, 새로운 모범 사례, 조직의 요구 변화에 따라 스타일 가이드를 지속적으로 업데이트하는 프로세스이다. 스타일 가이드는 고정된 문서가 아닌 살아있는 문서(living document)이다.

## 동작 원리

프로그래밍 언어는 시간이 지남에 따라 진화한다. C++11, C++14, C++17, C++20은 각각 새로운 기능과 관용어를 도입했다. 스타일 가이드가 이런 변화를 반영하지 않으면 두 가지 문제가 발생한다:

1. **기회 상실**: 새로운 기능이 코드를 더 안전하고 명확하게 만들 수 있는데 활용하지 못한다
2. **비공식 관행 발생**: 엔지니어들이 가이드를 무시하고 새 기능을 사용하기 시작하면 일관성이 무너진다

구글의 스타일 가이드 업데이트 프로세스:
- 스타일 가이드에는 공식 소유자(owner)가 있다
- 변경은 제안, 토론, 승인의 절차를 거친다
- 새 언어 기능은 평가 후 허용/제한/금지로 분류된다
- 규칙의 근거가 바뀌면 규칙도 업데이트된다

**핵심 원칙**: 규칙은 시간이 지남에 따라 그 가치가 달라질 수 있다. 초기 Google에서 유효했던 규칙이 10년 후에는 불필요하거나 해로울 수 있다. 정기적인 재평가가 필요하다.

## 예시

구글의 C++ 스타일 가이드에서 `auto` 키워드의 사용 규칙이 대표적이다. C++11에서 `auto`가 도입되었을 때, 구글은 처음에 사용을 매우 보수적으로 제한했다. 그러나 시간이 지나면서 엔지니어들이 `auto`에 익숙해지고, 특정 패턴에서는 `auto`가 오히려 가독성을 높인다는 데이터가 쌓이자, 규칙을 완화하여 더 많은 상황에서 `auto` 사용을 허용했다.

## 관련 개념

- [Style Guides and Rules](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
- [Rules vs Guidance](/knowledge/software-engineering/quality-and-configuration/rules-vs-guidance/)
- [Sustainability](/knowledge/software-engineering/foundations/sustainability/)
- [Hyrum's Law](/knowledge/software-engineering/foundations/hyrums-law/)
