---
title: "안전 필수 시스템 (Safety-Critical Systems)"
description: "시스템 운영이 항상 안전해야 하는 시스템으로, 시스템이 명세에 부합하든 그렇지 않든 사람이나 환경에 피해를 주어서는 안 되는 시스템이다"
tags: ['Safety Critical', 'Safety', 'Hazard', 'System Failure', 'Human Injury', 'Software Safety']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/safety-critical-systems
sidebar:
  order: 1
---

## 핵심 개념

안전 핵심 시스템은 주요 안전 핵심 소프트웨어(primary safety-critical software)와 보조 안전 핵심 소프트웨어(secondary safety-critical software)로 분류된다. 주요 안전 핵심 소프트웨어는 시스템의 컨트롤러로 내장되어 오작동이 하드웨어 고장과 인명 피해로 이어질 수 있다. 보조 안전 핵심 소프트웨어는 간접적으로 부상을 유발할 수 있는 소프트웨어이다. 안전성은 신뢰성과 다른 개념이며, 신뢰성 있는 시스템도 불안전할 수 있고 그 반대도 가능하다. 명세 불완전성, 하드웨어 오작동, 운영자 오류 등으로 인해 신뢰성만으로는 안전성을 보장할 수 없다. 안전 핵심 시스템 개발에서는 위험(hazard) 회피, 위험 탐지 및 제거, 피해 제한이라는 세 가지 접근법이 사용된다.

## 예시

인슐린 펌프 시스템은 주요 안전 핵심 시스템으로, 시스템 장애가 사용자에게 상해를 입힐 수 있다. Mentcare 정신 건강 환자 관리 시스템은 보조 안전 핵심 시스템으로, 장애로 인해 불안정한 환자가 적절히 치료받지 못해 본인이나 타인에게 상해를 입힐 수 있다.

## 관련 개념

- [위험 분석 (Hazard Analysis)](/knowledge/software-engineering/hazard-analysis/)
- [안전 사례 (Safety Case)](/knowledge/software-engineering/safety-case/)
- [신뢰성 (Dependability)](/knowledge/software-engineering/dependability/)
- [신뢰성 (Reliability)](/knowledge/software-engineering/reliability/)
- [장애 트리 분석 (Fault Tree Analysis)](/knowledge/software-engineering/fault-tree-analysis/)
- [위험 평가 (Risk Assessment)](/knowledge/software-engineering/risk-assessment/)
