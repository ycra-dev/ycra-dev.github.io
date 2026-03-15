---
title: "정책의 확장성 (Scalability of Policies)"
description: "조직이 반복 수행해야 하는 모든 작업은 인적 투입 측면에서 선형 이하로 확장 가능해야 하며, 정책은 프로세스를 확장 가능하게 만드는 강력한 도구이다"
tags: ["Software Engineering", "Foundations", "Scalability", "Automation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/scalability-of-policies
sidebar:
  order: 20
---

## 핵심 개념

조직이 반복적으로 수행해야 하는 모든 작업은 인적 투입 측면에서 확장 가능(선형 이하)해야 하며, 정책(policy)은 프로세스를 확장 가능하게 만드는 강력한 도구이다.

## 동작 원리

코드베이스가 선형적으로 성장하더라도, 코드 줄 수에 비례하는 노력이 필요한 작업이 있다면 문제가 된다. 이러한 비용은 천천히 확대되기 때문에 "끓는 개구리(boiled-frog)" 문제가 발생한다 — 점진적 변화로 인해 문제를 인식하지 못하다가, 갑자기 감당할 수 없게 된다.

확장성을 위한 핵심 질문: "조직의 규모가 10배 또는 100배 커지면, 이 작업을 어떻게 할 것인가?"

Google에서는 **전문성(expertise)과 규모의 경제(economies of scale)를 결합**할 때 특히 높은 성과를 얻는다. 소수의 전문가가 전체 코드베이스에 적용되는 도구나 정책을 만들면, 그 투자가 수만 명의 엔지니어에게 확산된다.

핵심 전략:
- 자동화 가능한 것 → 자동화
- 자동화할 수 없는 것 → 정책으로 표준화

## 예시

Google에서 프로그래밍 언어 업데이트(예: C++ 버전 업그레이드)를 진행할 때, 수십억 줄의 코드를 수동으로 수정하는 것은 불가능하다. 대신 자동화된 대규모 변경(Large-Scale Changes, LSC) 도구와 정책을 통해 전체 코드베이스에 걸쳐 변경을 적용한다. 이 접근법은 코드베이스의 크기에 선형 이하로 확장된다.

## 관련 개념

- [트레이드오프와 비용 (Trade-offs and Costs)](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
- [제번스 역설 (Jevons Paradox)](/knowledge/software-engineering/foundations/jevons-paradox/)
- [시프트 레프트 (Shifting Left)](/knowledge/software-engineering/foundations/shifting-left/)
- [지속 가능성 (Sustainability)](/knowledge/software-engineering/foundations/sustainability/)
