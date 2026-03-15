---
title: "문서 유형 (Documentation Types)"
description: "엔지니어링 문서는 용도와 대상에 따라 참조 문서, 디자인 문서, 튜토리얼, 개념 설명 문서, 랜딩 페이지 등 여러 유형으로 분류된다 — 한 문서가 한 가지 목적만 수행해야 한다"
tags: ["Software Engineering", "Quality", "Documentation", "Technical Writing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/documentation-types
sidebar:
  order: 55
---

## 핵심 개념

엔지니어링 문서는 용도와 대상에 따라 참조 문서, 디자인 문서, 튜토리얼, 개념 설명 문서, 랜딩 페이지 등 여러 유형으로 분류된다. 가장 중요한 원칙은 **한 문서가 한 가지 목적만 수행해야 한다**는 것이다.

## 동작 원리

각 문서 유형은 서로 다른 목적과 대상 독자를 가진다:

1. **참조 문서(Reference Documentation)**: 코드 주석으로 작성되는 가장 일반적인 형태. API의 사용법, 파라미터, 반환값 등을 설명한다. 파일 주석, 클래스 주석, 함수 주석이 포함된다.

2. **디자인 문서(Design Documents)**: 구현 전에 작성하는 가장 유용한 문서. 설계 목표, 대안 설계, 트레이드오프를 기록한다. 시간이 지나면 구현 기록으로서 가치를 지닌다.

3. **튜토리얼(Tutorials)**: 새로운 사용자가 시스템을 처음 사용할 때 필요한 단계별 안내서. "Hello World" 예제가 대표적이다.

4. **개념 설명 문서(Conceptual Documentation)**: API나 시스템의 개요를 제공하는 문서. 작성이 가장 어렵지만 단편적인 코드 주석만으로는 이해할 수 없는 전체적인 그림을 제공한다.

5. **랜딩 페이지(Landing Pages)**: 다른 문서로의 진입점 역할. 탐색 기능과 링크를 제공한다.

여러 유형을 섞으면 문서가 혼란스러워지고 유지보수가 어려워진다.

## 예시

좋은 튜토리얼의 특징:
- 각 단계마다 번호를 매긴다
- 사전 준비사항을 먼저 명시한다
- 전체 시스템이 아닌 특정 기능 하나에 집중한다
- 짧은 시간(30분 이내) 안에 완료 가능해야 한다
- "Hello World" 스타일로 최소한의 결과물을 빠르게 보여준다

## 관련 개념

- [코드로서의 문서 (Documentation as Code)](/knowledge/software-engineering/quality-and-configuration/documentation-as-code/)
- [기술 대상 독자 (Technical Audience)](/knowledge/software-engineering/quality-and-configuration/technical-audience/)
- [코드 주석 (Code Comments)](/knowledge/software-engineering/quality-and-configuration/code-comments/)
