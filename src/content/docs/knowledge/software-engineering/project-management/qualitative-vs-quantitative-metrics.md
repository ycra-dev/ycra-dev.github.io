---
title: "Qualitative vs Quantitative Metrics"
description: "정량적 메트릭은 수치적 측정이고 정성적 메트릭은 주관적 경험이다 — 구글은 두 가지를 함께 사용하여 삼각측량(triangulation)한다"
tags: ["Software Engineering", "Project Management", "Metrics", "Measurement"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/qualitative-vs-quantitative-metrics
sidebar:
  order: 24
---

## 핵심 개념

정량적 메트릭(Quantitative Metrics)은 로그 데이터나 시스템 기록에서 얻는 수치적 측정이고, 정성적 메트릭(Qualitative Metrics)은 설문, 인터뷰 등을 통해 얻는 엔지니어의 주관적 경험과 인식이다. 구글은 두 가지를 함께 사용하여 삼각측량(triangulation)한다.

## 동작 원리

**정량적 메트릭**의 장점은 규모와 파워이다. 회사 전체의 엔지니어 경험을 장기간에 걸쳐 측정할 수 있고, 결과에 대한 확신을 가질 수 있다. 그러나 맥락이나 서사를 제공하지 못한다. 엔지니어가 왜 구식 도구를 사용했는지, 왜 표준 프로세스를 우회했는지 설명하지 못한다.

**정성적 메트릭**은 맥락과 서사를 제공하고, 다음 개선 단계에 대한 통찰을 준다. 구조화된 인터뷰, 사례 연구, 설문 등이 포함된다. 그러나 회상 편향(recall bias), 최신 편향(recency bias), 샘플링 편향(sampling bias)에 취약하다.

핵심 발견: **정량적 메트릭과 정성적 메트릭이 불일치하면, 보통 정량적 메트릭이 잘못된 것이다.** 이는 정량적 메트릭이 기대한 신호를 제대로 포착하지 못하고 있을 가능성을 나타낸다.

혼합 방법론(Mixed Methods)을 사용하여 진실에 삼각측량하는 것이 최선이다. 설문 데이터와 로그 데이터가 같은 방향을 가리키면 신뢰도가 높아지고, 다른 방향이면 추가 탐색이 필요하다.

## 예시

구글에서 엔지니어의 빌드 지연시간 중간값 메트릭을 만들었을 때, 경험 표본 연구(experience sampling study)를 통해 검증했다. 빌드가 시작되면 엔지니어에게 짧은 설문을 보냈는데, 일부 엔지니어가 "빌드를 시작하지 않았다"고 응답했다. 자동화 도구가 빌드를 시작했지만 엔지니어는 그 결과에 블로킹되지 않았던 것이다. 이를 통해 메트릭을 수정하여 자동 빌드를 제외했다. 정성적 데이터 없이는 이 문제를 발견하지 못했을 것이다.

## 관련 개념

- [Goals-Signals-Metrics Framework](/knowledge/software-engineering/project-management/goals-signals-metrics-framework/)
- [QUANTS Framework](/knowledge/software-engineering/project-management/quants-framework/)
- [Measuring Engineering Productivity](/knowledge/software-engineering/project-management/measuring-engineering-productivity/)
