---
title: "Sustainability (소프트웨어 지속 가능성)"
description: "소프트웨어가 수명 주기 동안 필요한 변화에 대응할 수 있는 능력으로, 유지보수 가능성의 본질"
tags: ["Software Engineering", "Foundations", "Maintenance"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/sustainability
sidebar:
  order: 12
---

## 핵심 개념

소프트웨어의 지속 가능성(sustainability)이란 코드가 수명 주기 동안 필요한 변화에 대응할 수 있는 능력을 말한다. 단순히 "작동하는" 코드를 넘어 "유지보수 가능한" 코드를 만드는 것이 핵심이다.

## 동작 원리

지속 가능한 소프트웨어를 만들기 위해서는 코드의 전체 수명 주기 — 구상(conception)부터 도입(introduction), 유지보수(maintenance), 폐기(deprecation)까지 — 를 고려한 실천이 필요하다.

Google은 수십 년에 걸친 경험을 통해, 필요한 변화의 영향을 계획하고 관리하는 것이 장기적 지속 가능성의 본질임을 발견했다. 세 가지 측면에서 접근한다:

- **Culture (문화)**: 소프트웨어 개발의 집단적 특성을 강조하고 건강한 조직 성장을 위한 문화적 원칙
- **Processes (프로세스)**: 시간과 규모에 따라 작동하는 최선의 실천 방법
- **Tools (도구)**: 코드베이스의 성장과 노화에 따른 이점을 제공하는 도구 인프라 투자

## 예시

Google이 C++03에서 C++11로 전환할 때, 수십억 줄의 코드에서 namespace std 참조 방식을 변경했다. 이처럼 대규모 변화에 대응할 수 있는 코드베이스를 유지하는 것이 지속 가능성의 실제 모습이다.

## 관련 개념

- [Software Engineering vs Programming](/knowledge/software-engineering/foundations/software-engineering-vs-programming/)
- [Trade-offs and Costs](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
