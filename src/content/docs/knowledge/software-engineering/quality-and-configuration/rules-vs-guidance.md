---
title: "Rules vs Guidance"
description: "규칙은 반드시 따라야 하는 필수적 법칙이고 지침은 상황에 따라 변형할 수 있는 권장 사항이다 — 구글에서 이 구분은 명확하며 스타일 가이드에서 규칙은 강제되고 지침은 안내된다"
tags: ["Software Engineering", "Quality", "Style Guide", "Governance"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/rules-vs-guidance
sidebar:
  order: 40
---

## 핵심 개념

규칙(Rules)은 반드시 따라야 하는 필수적 법칙이고, 지침(Guidance)은 모범 사례와 권장 사항으로 상황에 따라 변형할 수 있다. 구글에서 이 구분은 명확하며, 스타일 가이드에서 규칙은 강제(enforce)되고 지침은 안내(guide)된다.

## 동작 원리

**규칙의 특성**:
- 보편적으로 강제된다 (예외는 사전 승인 필요)
- 도구로 자동 검증 가능해야 이상적이다
- 최소화해야 한다 - 꼭 필요한 것만 규칙으로 만든다
- 규칙을 만들 때 반드시 근거를 문서화한다

**지침의 형태**:
- 프라이머(Primer): 언어 기초 문서
- 코드 작성 팁(Tips of the Week): 주간 모범 사례 공유
- 코드 리뷰 코멘트 모음: 자주 발생하는 패턴에 대한 안내
- 언어별 모범 사례 문서

**규칙을 만드는 기준**: 구글은 규칙 하나를 추가할 때 그 규칙이 조직에 가져다주는 이점이 인지 부하(모든 엔지니어가 해당 규칙을 기억해야 함)를 능가하는지 신중하게 평가한다. 규칙은 최소한으로 유지하되, 존재하는 규칙은 반드시 강제한다.

## 예시

구글의 Python 스타일 가이드에서:
- **규칙**: "들여쓰기는 4스페이스를 사용한다" - 이것은 자동 포매터가 강제하며 예외가 없다
- **지침**: "함수는 하나의 책임만 가져야 한다" - 이것은 좋은 사례이지만 상황에 따라 합리적인 예외가 있을 수 있다

규칙이 지침보다 엄격하기 때문에, "이건 규칙으로 만들어야 할까 지침으로 만들어야 할까?"는 매우 중요한 판단이다.

## 관련 개념

- [Style Guides and Rules](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
- [Consistency in Codebase](/knowledge/software-engineering/quality-and-configuration/consistency-in-codebase/)
- [Automated Tooling for Style](/knowledge/software-engineering/quality-and-configuration/automated-tooling-for-style/)
