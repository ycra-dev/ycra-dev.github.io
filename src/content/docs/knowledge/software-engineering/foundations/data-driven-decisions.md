---
title: "데이터 기반 의사결정 (Data-Driven Decisions)"
description: "데이터·증거·선례·논거를 종합하여 의사결정하는 접근법으로, 데이터가 없을 때에도 증거와 논거에 기반한 결정을 추구한다"
tags: ["Software Engineering", "Foundations", "Decision Making", "Leadership"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/data-driven-decisions
sidebar:
  order: 21
---

## 핵심 개념

데이터 기반 의사결정이란 데이터, 증거, 선례, 논거를 종합하여 의사결정을 내리는 접근법이다. Google에서는 "데이터 기반 문화"라고 단순화하지만, 실제로는 데이터가 없을 때에도 증거와 논거에 기반한 결정을 추구한다.

## 동작 원리

의사결정에서 두 가지 일반적인 시나리오가 존재한다:

1. **측정 가능한 경우**: CPU vs 네트워크, 달러 vs RAM 등 정량화 가능한 트레이드오프. 변환표(conversion table)를 만들어 모든 엔지니어가 자체적으로 분석할 수 있게 한다.

2. **측정 불가능한 경우**: 엔지니어 시간의 예측, 잘못 설계된 API의 비용, 제품 선택의 사회적 영향 등. 경험, 리더십, 선례에 의존한다.

데이터 기반 접근의 가장 중요한 부속물은 **"실수를 인정할 수 있는 능력"**이다. 결정은 당시의 데이터에 기반했지만, 새로운 데이터가 나타나면 방향을 바꿀 수 있어야 한다. 실수를 인정하는 리더가 더 존경받는다.

측정할 수 없는 것도 가치가 있을 수 있다. 리더가 해야 할 일은 판단을 행사하고, 중요한 것을 중요하다고 주장하는 것이다.

## 예시

엔지니어가 "2주를 투자해서 linked-list를 고성능 구조로 바꾸면 5 GiB의 RAM을 더 사용하지만 2000 CPU를 절약한다. 해야 할까?"라고 질문할 때, RAM과 CPU의 상대적 비용뿐 아니라 인력 비용(2주의 엔지니어 지원)과 기회 비용(2주 동안 다른 무엇을 만들 수 있었나)까지 고려해야 한다.

## 관련 개념

- [트레이드오프와 비용 (Trade-offs and Costs)](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
- [정책의 확장성 (Scalability of Policies)](/knowledge/software-engineering/foundations/scalability-of-policies/)
- [비난 없는 포스트모템 (Blameless Postmortem)](/knowledge/software-engineering/agile-methods/blameless-postmortem/)
