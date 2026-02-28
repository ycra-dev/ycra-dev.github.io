---
title: "Documentation Review"
description: "기술 문서에 대해 기술적 정확성, 대상 독자 적합성, 문서 작성 품질 등 다양한 관점의 리뷰를 수행하는 프로세스 — 세 가지 리뷰 유형은 각각 다른 전문성과 관점이 필요하다"
tags: ["Software Engineering", "Quality", "Documentation", "Code Review", "Process"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/documentation-review
sidebar:
  order: 57
---

## 핵심 개념

기술 문서에 대해 기술적 정확성, 대상 독자 적합성, 문서 작성 품질 등 다양한 관점의 리뷰를 수행하는 프로세스이다.

## 동작 원리

Google에서는 문서 리뷰를 세 가지 유형으로 구분한다:

1. **기술 리뷰(Technical Review)**: 주제 전문가(SME)가 기술적 정확성을 검증한다. "이 내용이 정확한가?"에 초점을 맞춘다.

2. **대상 독자 리뷰(Audience Review)**: 해당 문서의 대상 독자와 유사한 사람이 이해도를 검증한다. "이 내용이 이해되는가?"에 초점을 맞춘다. 가장 유용하지만 가장 간과되는 리뷰 유형이다.

3. **작문 리뷰(Writing Review)**: 테크니컬 라이터나 자원 봉사자가 문서의 명확성, 일관성, 스타일을 검토한다. "이 문장이 잘 읽히는가?"에 초점을 맞춘다.

이 세 가지 리뷰는 동시에 진행할 수 없다. 기술 리뷰어에게 문법까지 확인하라고 하면, 아마 기술적 정확성도 문법도 제대로 검토하지 못할 것이다. 각 리뷰를 별도로 진행하되, 모든 문서에 세 가지 리뷰가 필요한 것은 아니다.

## 예시

코드 리뷰와 마찬가지로 문서 리뷰도 변경 목록(changelist)의 일부로 진행될 수 있다. 코드를 수정하면서 함께 수정된 문서도 같은 리뷰 프로세스에서 검토한다. 이를 통해 코드와 문서의 동기화가 유지된다.

## 관련 개념

- [Code Review](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [Documentation as Code](/knowledge/software-engineering/quality-and-configuration/documentation-as-code/)
- [Technical Audience](/knowledge/software-engineering/quality-and-configuration/technical-audience/)
