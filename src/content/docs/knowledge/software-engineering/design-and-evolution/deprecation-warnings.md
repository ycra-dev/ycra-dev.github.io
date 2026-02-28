---
title: "Deprecation Warnings"
description: "시스템이 deprecated 상태임을 프로그래밍적으로 표시하여 사용자에게 경고하고 이전을 유도하는 메커니즘"
tags: ["Software Engineering", "Design and Evolution"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/deprecation-warnings
sidebar:
  order: 53
---

## 핵심 개념

Deprecation warning은 시스템이 deprecated 상태임을 프로그래밍적으로 표시하여 사용자에게 경고하고 이전을 유도하는 메커니즘이다. 경고를 모든 곳에 남발하면 "경고 피로(alert fatigue)"가 발생하여 사용자들이 경고를 완전히 무시하게 된다.

## 동작 원리

효과적인 deprecation 경고에는 두 가지 속성이 필수적이다:

1. **Actionability(실행 가능성)**: 사용자가 경고를 보고 실제로 실행 가능한 행동을 취할 수 있어야 한다. 단순한 이론이 아니라 평균적인 엔지니어가 해당 문제 영역의 전문성으로 실제로 수행할 수 있는 수준이어야 한다.

2. **Relevance(관련성)**: 사용자가 실제로 해당 행동을 수행하는 시점에 경고가 표시되어야 한다. deprecated 함수를 사용하는 코드를 작성하는 시점에 경고하는 것이지, 코드가 저장소에 커밋된 지 몇 주 후가 아니다.

**경고 피로 방지**:
- 전이적(transitive) 맥락에서 경고가 축적되면 사용자들이 경고를 완전히 무시하게 된다
- 새로 변경된 라인에 대해서만 경고를 제한하여 deprecated 심볼의 새로운 사용에 대해서만 경고한다

## 예시

Google은 ErrorProne과 clang-tidy 같은 도구를 활용하여 경고를 타겟팅된 방식으로 노출한다. Java의 `@deprecated` 어노테이션과 같은 컴파일러 주석을 Tricorder 프레임워크가 리뷰 시점에 표시하며, 일부 경우에는 대체 코드로의 원클릭 수정도 제안한다.

## 관련 개념

- [Deprecation](/knowledge/software-engineering/design-and-evolution/deprecation/)
- [Advisory Deprecation](/knowledge/software-engineering/design-and-evolution/advisory-deprecation/)
- [Backsliding Prevention](/knowledge/software-engineering/design-and-evolution/backsliding-prevention/)
