---
title: "Data Bias (데이터 편향)"
description: "데이터 자체도 편향될 수 있으며, 데이터의 출처와 수집 방법을 비판적으로 검토하고 상관관계와 인과관계를 구분해야 한다"
tags: ["Career", "Foundations", "Data", "Statistics"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/data-bias
sidebar:
  order: 213
---

## 핵심 개념

"데이터 기반 의사결정"이 좋다는 데는 모두 동의하지만, **데이터 자체가 편향될 수 있다**는 사실은 종종 간과된다.

데이터는 사람이 수집하거나, 사람이 프로그래밍한 컴퓨터가 수집한다. 모든 사람은 편향을 가지고 있으므로, 수집된 데이터에도 그 편향이 반영될 수 있다.

## 동작 원리

**세 가지 주요 데이터 편향 원인:**

1. **수집 방법 편향**: 무엇을 측정하고 무엇을 측정하지 않을지를 결정하는 것 자체가 편향이다. 어떤 지표를 선택하는가가 어떤 결론에 도달하는가를 결정한다.

2. **불완전한 데이터**: 모든 데이터는 현실의 일부만 포착한다. 설문 응답자가 전체 사용자를 대표하지 않을 수 있고, 로그에 기록되지 않은 오류가 있을 수 있다.

3. **상관관계 vs 인과관계 혼동**: 두 변수가 함께 변한다고 해서 하나가 다른 하나의 원인인 것은 아니다.

**비판적 검토를 위한 질문들:**
- "이 데이터는 누가, 어떤 목적으로 수집했는가?"
- "측정되지 않은 것은 무엇인가?"
- "이 상관관계에 다른 설명이 가능한가?"
- "샘플 크기가 결론을 내리기에 충분한가?"

## 예시

**수집 편향:** 영어로만 된 설문을 통해 "사용자 만족도가 높다"고 결론내면, 영어가 모국어가 아닌 사용자의 불만이 반영되지 않는다.

**상관관계 vs 인과관계:** "아이스크림 판매량이 올라가면 익사 사고가 늘어난다" → 아이스크림이 익사를 유발하는 것이 아니라, **여름**이라는 공통 원인이 있다.

**지표 선택 편향:** "평균 응답 시간 50ms"는 좋아 보이지만, p99가 5초라면 100명 중 1명은 끔찍한 경험을 하고 있다.

## 관련 개념

- [Critical Thinking](/knowledge/career/foundations/critical-thinking/) - 편견을 제거하는 사고 방법
- [Theory vs Belief](/knowledge/career/foundations/theory-vs-belief/) - 사실과 신념의 구분
- [Data-Driven Decisions](/knowledge/career/professional-development/data-driven-decisions/) - 데이터에 기반한 의사결정
- [Actionable Metrics](/knowledge/career/foundations/actionable-metrics/) - 행동으로 이어지는 지표 설계
