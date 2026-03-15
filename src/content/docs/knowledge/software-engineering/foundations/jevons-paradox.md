---
title: "제번스 역설 (Jevons Paradox)"
description: "자원 사용 효율이 증가하면 오히려 그 자원의 총 소비량이 증가하는 역설 — 인프라 효율 개선이 불필요한 자원 소비를 유발할 수 있다"
tags: ["Software Engineering", "Foundations", "Efficiency", "Trade-offs"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/jevons-paradox
sidebar:
  order: 19
---

## 핵심 개념

자원 사용 효율이 증가하면 오히려 그 자원의 총 소비량이 증가하는 역설적 현상이다. 소프트웨어 엔지니어링에서는 인프라 효율 개선이 불필요한 자원 소비 증가로 이어질 수 있다.

## 동작 원리

원래 경제학에서 석탄 효율 증가가 석탄 소비 증가로 이어진 현상을 설명하기 위해 제안되었다. 소프트웨어 엔지니어링에서도 동일한 패턴이 나타난다.

핵심 메커니즘은 **인센티브 구조의 변화**이다:
- 개인이 직접 비용을 느낄 때 → 효율적으로 자원을 사용하는 동기 존재
- 비용이 공유 인프라에 숨겨지면 → 최적화 동기가 사라짐

이는 "공유지의 비극"과도 유사한 패턴이다. 모든 트레이드오프 결정에서 하류 효과(downstream effects)를 예측하기 어렵다는 것을 보여주며, 시스템의 목표와 제약을 지속적으로 재평가해야 함을 시사한다.

## 예시

Google의 분산 빌드 시스템 사례:
- **이전 (로컬 빌드)**: 각 엔지니어가 빌드 시간을 직접 체감 → 불필요한 의존성을 줄이려는 동기 존재
- **이후 (분산 빌드)**: 빌드 비용이 개인에게 직접 느껴지지 않음 → 빌드 그래프의 불필요한 의존성이 급증

결국 Google은 새로운 생태계의 도구와 유지보수를 위해 추가 투자를 해야 했다.

## 관련 개념

- [트레이드오프와 비용 (Trade-offs and Costs)](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [정책의 확장성 (Scalability of Policies)](/knowledge/software-engineering/foundations/scalability-of-policies/)
