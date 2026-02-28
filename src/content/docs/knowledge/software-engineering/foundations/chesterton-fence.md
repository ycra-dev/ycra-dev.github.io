---
title: "Chesterton's Fence"
description: "무언가를 변경하거나 제거하기 전에 그것이 왜 존재하는지 먼저 이해해야 한다는 원칙 — 레거시 코드와 기존 결정을 다룰 때 핵심 지침"
tags: ["Software Engineering", "Foundations", "Decision Making", "Legacy"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/chesterton-fence
sidebar:
  order: 22
---

## 핵심 개념

무언가를 변경하거나 제거하기 전에, 그것이 왜 존재하는지 먼저 이해해야 한다는 원칙이다. 길 한가운데 울타리가 있다면, 그것이 왜 세워졌는지 이해하기 전에는 철거해서는 안 된다.

## 동작 원리

소프트웨어 엔지니어링에서 Chesterton's Fence는 레거시 코드, 기존 정책, 또는 기술적 결정을 변경할 때 특히 중요하다. "이 코드는 왜 이렇게 작성되었는가?"를 이해하지 못한 채 리팩토링하면, 원래 해결하려 했던 문제를 다시 도입할 위험이 있다.

Google은 결정을 재검토하고 실수를 인정하는 것을 장려하지만, 이는 "기존 결정의 근거를 이해한 후에" 변경해야 한다는 전제를 포함한다. 데이터가 변하고 새로운 맥락이 나타나면 방향 전환이 필요하지만, **원래 결정의 이유를 파악하는 것이 선행**되어야 한다.

이 원칙은 코드 리뷰에서도 적용된다. 리뷰어가 코멘트를 달 때 관련 참조 자료를 제공하여 작성자가 스타일 가이드라인의 근거를 이해할 수 있도록 한다.

## 예시

Google의 readability 프로세스에서 리뷰어들은 코멘트에 관련 참조(citations)를 제공한다. 가이드라인의 근거가 불분명할 경우, 작성자는 설명을 요청할 수 있다. 이렇게 "왜?"를 이해하는 문화는 맹목적 규칙 준수가 아닌, 원칙에 기반한 의사결정을 가능하게 한다.

## 관련 개념

- [Data-Driven Decisions](/knowledge/software-engineering/foundations/data-driven-decisions/)
- [Trade-offs and Costs](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
