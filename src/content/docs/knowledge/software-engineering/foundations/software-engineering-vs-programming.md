---
title: "소프트웨어 공학 vs 프로그래밍 (Software Engineering vs Programming)"
description: "소프트웨어 엔지니어링은 시간에 대해 적분된 프로그래밍으로, 코드를 구축하고 유지보수하기 위한 모든 도구와 프로세스를 포괄한다"
tags: ["Software Engineering", "Foundations", "Sustainability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/software-engineering-vs-programming
sidebar:
  order: 11
---

## 핵심 개념

소프트웨어 엔지니어링은 단순한 코드 작성(프로그래밍)을 넘어, 시간의 흐름에 따라 코드를 구축하고 유지보수하기 위한 모든 도구와 프로세스를 포괄하는 분야이다. Google에서는 이를 "시간에 대해 적분된 프로그래밍(programming integrated over time)"으로 정의한다.

## 동작 원리

프로그래밍과 소프트웨어 엔지니어링 사이에는 세 가지 핵심적 차이가 있다:

- **Time and Change**: 코드가 수명 동안 어떻게 적응해야 하는가
- **Scale and Growth**: 조직이 진화하면서 어떻게 적응해야 하는가
- **Trade-offs and Costs**: 시간/변화와 규모/성장의 교훈을 바탕으로 어떻게 의사결정하는가

프로그래밍이 코드를 생성하는 즉각적인 행위라면, 소프트웨어 엔지니어링은 그 코드가 수명 주기(conception → introduction → maintenance → deprecation) 전체에 걸쳐 필요한 변화에 대응할 수 있도록 지속 가능하게 만드는 실천을 포함한다.

## 예시

모바일 앱의 평균 수명은 몇 년에 불과하지만, Google의 핵심 인프라 코드는 수십 년간 유지보수된다. 수명이 며칠짜리인 프로젝트에는 통합 테스트나 지속적 배포(CD)가 필요 없지만, 수십 년을 유지해야 하는 프로젝트에는 시맨틱 버저닝이나 의존성 관리가 필수적이다.

단기 코드와 장기 코드의 수명 사이에는 최소 100,000배의 차이가 있다. 양쪽 끝에 동일한 최선의 실천 방법이 보편적으로 적용된다고 가정하는 것은 어리석다.

## 관련 개념

- [시간에 걸친 프로그래밍 통합 (Programming Integrated Over Time)](/knowledge/software-engineering/foundations/programming-integrated-over-time/)
- [지속 가능성 (Sustainability)](/knowledge/software-engineering/foundations/sustainability/)
- [트레이드오프와 비용 (Trade-offs and Costs)](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
