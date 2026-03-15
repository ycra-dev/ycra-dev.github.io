---
title: "소프트웨어 분석 (Software Analytics)"
description: "소프트웨어 애널리틱스는 소프트웨어 및 소프트웨어 프로세스에 대한 대량의 데이터를 자동으로 마이닝하고 분석하여, 관리자와 엔지니어의 의사결정을 지원하는 통찰을 발견하는 기법이다"
tags: ['Software Analytics', 'Data Mining', 'Big Data', 'Decision Support', 'Software Intelligence']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-analytics
sidebar:
  order: 6
---

## 핵심 개념

소프트웨어 애널리틱스가 가능해진 두 가지 요인은 (1) 소프트웨어 제품 사용 시 자동 수집되는 사용자 데이터(장애 정보, 시스템 상태)와 (2) GitHub 등의 오픈소스 플랫폼과 공개 소프트웨어 엔지니어링 데이터 저장소이다. 명시적 모델 없이도 충분한 데이터가 있으면 상관관계를 발견하고 소프트웨어 속성을 예측할 수 있다. 일반 이론을 도출하기보다 특정 소프트웨어 개발자와 관리자에게 관심 있는 구체적 이슈에 대한 실시간 정보를 제공하는 것이 목적이다. 분석 도구는 사용이 쉽고, 빠르게 실행되며, 많은 매개변수를 측정하고, 대화형이어야 한다. 아직 초기 단계이며, 주로 대기업의 소프트웨어 제품 데이터에 기반하므로 커스텀 소프트웨어나 소규모 기업에 대한 적용 가능성은 불확실하다.

## 예시

Zhang 등의 연구에서 사용자 소프트웨어에 응답 시간과 시스템 상태 데이터를 수집하는 계측(instrumentation)을 추가하고, 응답 시간이 예상보다 클 때 데이터를 분석하여 성능 병목 현상을 자동으로 식별한 사례가 있다. 개발팀은 이 정보를 바탕으로 알고리즘을 개선하여 후속 릴리스에서 성능을 향상시켰다.

## 관련 개념

- [소프트웨어 측정 (Software Measurement)](/knowledge/software-engineering/software-measurement/)
- [소프트웨어 품질 관리 (Software Quality Management)](/knowledge/software-engineering/software-quality-management/)
