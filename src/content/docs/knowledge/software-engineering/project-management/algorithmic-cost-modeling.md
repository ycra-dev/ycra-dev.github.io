---
title: "알고리즘적 비용 모델링 (Algorithmic Cost Modeling)"
description: "알고리즘적 비용 모델링은 프로젝트 크기, 개발 중인 소프트웨어 유형, 팀/프로세스/제품 요인의 추정치를 기반으로 수학적 공식을 사용하여 프로젝트 비용을 예측하는 방법이다"
tags: ['Cost Modeling', 'Estimation', 'Effort Estimation', 'Software Metrics', 'Function Points']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/algorithmic-cost-modeling
sidebar:
  order: 10
---

## 핵심 개념

기본 공식은 Effort = A x Size^B x M 형태로, A는 조직 관행에 의한 상수, Size는 코드 크기(SLOC) 또는 기능점수(function points), B는 복잡성 지수(1~1.5), M은 프로세스/제품/개발 속성을 반영하는 승수이다. 초기 단계에서 Size를 정확히 추정하기 어렵고, B와 M의 요인 추정이 주관적이라는 한계가 있다. 모델 사용자는 자체 과거 프로젝트 데이터로 모델을 보정(calibrate)해야 하지만, 충분한 데이터를 수집한 조직이 드물다. 최선, 예상, 최악의 세 가지 추정 범위를 개발하는 것이 권장된다. 실질적 적용은 주로 국방 및 항공우주 분야의 대기업에 한정되어 왔다.

## 예시

기본 공식 적용 예: Size = 128 KSLOC, B = 1.17일 때 초기 COCOMO 추정 = 730 person-months. 비용 인자(cost drivers)를 높은 값으로 설정하면 2306 person-months, 낮은 값으로 설정하면 295 person-months로, 초기 추정 대비 3배 이상 또는 1/3 이하로 변할 수 있다.

## 관련 개념

- [COCOMO 비용 모델링 (COCOMO Cost Modeling)](/knowledge/software-engineering/cocomo-cost-modeling/)
- [소프트웨어 가격 산정 (Software Pricing)](/knowledge/software-engineering/software-pricing/)
- [프로젝트 계획 (Project Planning)](/knowledge/software-engineering/project-planning/)
