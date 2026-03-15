---
title: "시간에 걸친 프로그래밍 통합 (Programming Integrated Over Time)"
description: "소프트웨어 엔지니어링은 시간에 대해 적분된 프로그래밍으로, 개발·수정·유지보수를 모두 포함하는 확장된 행위이다"
tags: ["Software Engineering", "Foundations", "Definition"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/programming-integrated-over-time
sidebar:
  order: 14
---

## 핵심 개념

"소프트웨어 엔지니어링은 시간에 대해 적분된 프로그래밍이다(Software engineering is programming integrated over time)." 프로그래밍이 코드를 생성하는 즉각적인 행위라면, 소프트웨어 엔지니어링은 개발(development), 수정(modification), 유지보수(maintenance)를 모두 포함한다.

## 동작 원리

프로그래밍과 소프트웨어 엔지니어링 사이에는 세 가지 핵심적 차이가 있다: 시간(time), 규모(scale), 그리고 트레이드오프(trade-offs).

시간이라는 차원이 추가되면 프로그래밍과는 완전히 다른 문제 영역이 생긴다. 정육면체가 정사각형이 아니듯, 거리가 속도가 아니듯, 소프트웨어 엔지니어링은 프로그래밍이 아니다.

단기 코드와 장기 코드의 수명 사이에는 최소 100,000배의 차이가 있다. 양쪽 끝에 동일한 최선의 실천 방법이 보편적으로 적용된다고 가정하는 것은 어리석다.

## 예시

수명이 며칠짜리인 프로젝트에는 통합 테스트나 지속적 배포(CD)가 필요 없지만, 수십 년을 유지해야 하는 프로젝트에는 시맨틱 버저닝이나 의존성 관리가 필수적이다. 모바일 앱의 평균 수명은 몇 년에 불과하지만, Google의 핵심 인프라 코드는 수십 년간 유지보수된다.

## 관련 개념

- [소프트웨어 공학 vs 프로그래밍 (Software Engineering vs Programming)](/knowledge/software-engineering/foundations/software-engineering-vs-programming/)
- [지속 가능성 (Sustainability)](/knowledge/software-engineering/foundations/sustainability/)
- [하이럼의 법칙 (Hyrum's Law)](/knowledge/software-engineering/foundations/hyrums-law/)
- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
