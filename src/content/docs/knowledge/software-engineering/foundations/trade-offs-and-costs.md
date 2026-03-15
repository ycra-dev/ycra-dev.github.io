---
title: "트레이드오프와 비용 (Trade-offs and Costs)"
description: "소프트웨어 엔지니어링 의사결정은 재정·자원·인력·기회·사회적 비용을 종합하여 증거에 기반한 합리적 선택을 하는 과정이다"
tags: ["Software Engineering", "Foundations", "Decision Making"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/trade-offs-and-costs
sidebar:
  order: 18
---

## 핵심 개념

소프트웨어 엔지니어링에서의 의사결정은 다양한 비용 요소 간의 트레이드오프를 평가하고, 증거에 기반하여 합리적인 선택을 하는 과정이다. Google에서 "비용(cost)"은 단순히 금전적 비용만이 아니라 다양한 요소를 포함한다.

## 동작 원리

Google이 정의하는 비용의 종류:

| 비용 유형 | 설명 |
|-----------|------|
| 재정적 비용 | 금전 |
| 자원 비용 | CPU 시간, 스토리지 |
| 인력 비용 | 엔지니어링 노력 |
| 거래 비용 | 행동을 취하는 데 드는 비용 |
| 기회 비용 | 행동을 취하지 않는 데 드는 비용 |
| 사회적 비용 | 선택이 사회 전체에 미치는 영향 |

Google에서는 "내가 그렇다고 했으니까(Because I said so)"라는 이유가 강하게 기피된다. 모든 결정에는 이유가 있어야 하며, 데이터·증거·선례·논거에 기반해야 한다.

소프트웨어 엔지니어링처럼 고도로 창의적이고 수익성 높은 분야에서는 재정적 비용보다 **인력 비용이 대개 제한 요소**이다.

## 예시

**화이트보드 마커 사례**: Google은 사무실 곳곳에 잠금 없는 수납장에 마커를 가득 비치한다. 1달러도 안 되는 제품을 아끼느라 브레인스토밍이 중단되는 것보다, 방해 없는 아이디어 회의를 최적화하는 것이 더 중요하다는 명시적 트레이드오프이다.

**분산 빌드 사례**: 로컬 빌드에서 분산 빌드로 전환 시, 엔지니어 시간 절약과 하드웨어 투자 최적화라는 이점이 비용을 크게 상회했다. 그러나 Jevons Paradox에 의해 불필요한 의존성 팽창이라는 예상치 못한 부작용도 발생했다.

## 관련 개념

- [소프트웨어 공학 vs 프로그래밍 (Software Engineering vs Programming)](/knowledge/software-engineering/foundations/software-engineering-vs-programming/)
- [시프트 레프트 (Shifting Left)](/knowledge/software-engineering/foundations/shifting-left/)
- [제번스 역설 (Jevons Paradox)](/knowledge/software-engineering/foundations/jevons-paradox/)
- [데이터 기반 의사결정 (Data-Driven Decisions)](/knowledge/software-engineering/foundations/data-driven-decisions/)
