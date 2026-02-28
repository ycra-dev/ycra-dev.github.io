---
title: "QUANTS Framework"
description: "엔지니어링 생산성의 다섯 가지 핵심 구성요소를 기억하기 위한 Google의 니모닉 — Quality, Attention, iNtellectual complexity, Tempo/velocity, Satisfaction"
tags: ["Software Engineering", "Project Management", "Metrics", "Framework"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/quants-framework
sidebar:
  order: 23
---

## 핵심 개념

QUANTS는 구글이 엔지니어링 생산성의 다섯 가지 핵심 구성요소를 기억하기 위해 사용하는 니모닉이다. Quality(품질), Attention(주의력), iNtellectual complexity(지적 복잡성), Tempo/velocity(속도), Satisfaction(만족도)의 약자이다.

## 동작 원리

다섯 구성요소는 서로 트레이드오프 관계에 있다. 한 측면만 개선하려다 다른 측면을 악화시키는 것을 방지하기 위해, 모든 측면에 대한 목표를 고려해야 한다:

- **Quality of the code (코드 품질)**: 코드의 품질은 어떤가? 테스트 케이스가 회귀를 방지할 만큼 충분한가? 아키텍처가 위험과 변화를 잘 완화하는가?
- **Attention from engineers (엔지니어의 주의력)**: 엔지니어가 얼마나 자주 몰입 상태(flow)에 도달하는가? 알림에 얼마나 방해받는가? 도구가 컨텍스트 스위칭을 유발하는가?
- **iNtellectual complexity (지적 복잡성)**: 작업을 완료하는 데 인지 부하가 얼마나 필요한가? 문제의 본질적 복잡성은 어떤가? 불필요한 복잡성이 있는가?
- **Tempo and velocity (속도)**: 엔지니어가 얼마나 빠르게 작업을 완료하는가? 릴리스를 얼마나 빠르게 배포하는가?
- **Satisfaction (만족도)**: 엔지니어가 도구에 얼마나 만족하는가? 업무와 결과물에 얼마나 만족하는가? 번아웃을 겪고 있는가?

핵심 통찰은 속도만 추구하면 품질이 떨어지고, 품질만 추구하면 속도가 떨어진다는 것이다. 코드 리뷰를 제거하면 속도는 빨라지지만 품질이 무너진다. 모든 5개 영역에 목표가 필요한 것은 아니지만, 각 영역을 **검토**하는 것이 중요하다.

## 예시

Readability 프로세스를 QUANTS로 평가할 때:

| 구성요소 | 목표 |
|---------|------|
| **Q**uality | readability를 통해 더 높은 품질, 일관성, 코드 건강 문화를 기대 |
| **A**ttention | 해당 없음 (주의력 관련 목표 없음) |
| i**N**tellectual complexity | 엔지니어가 코드베이스와 코딩 모범 사례를 학습하고 멘토링을 받음 |
| **T**empo/velocity | readability 획득 후 더 빠르고 효율적으로 작업 완료 |
| **S**atisfaction | 프로세스에 대한 긍정적 감정과 가치 인식 |

## 관련 개념

- [Goals-Signals-Metrics Framework](/knowledge/software-engineering/project-management/goals-signals-metrics-framework/)
- [Measuring Engineering Productivity](/knowledge/software-engineering/project-management/measuring-engineering-productivity/)
- [Qualitative vs Quantitative Metrics](/knowledge/software-engineering/project-management/qualitative-vs-quantitative-metrics/)
