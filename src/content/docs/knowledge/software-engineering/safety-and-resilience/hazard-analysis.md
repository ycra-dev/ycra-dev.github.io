---
title: "위험 분석 (Hazard Analysis)"
description: "안전 핵심 시스템에서 위험(hazard)의 근본 원인을 발견하는 프로세스로, 어떤 이벤트 또는 이벤트 조합이 위험을 유발할 수 있는 시스템 장애를 초래하는지 분석한다"
tags: ['Hazard Analysis', 'Safety', 'Risk', 'Root Cause', 'Deductive', 'Inductive']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/hazard-analysis
sidebar:
  order: 2
---

## 핵심 개념

위험 분석은 위험 식별, 위험 평가, 위험 분석, 리스크 감소의 네 가지 활동으로 구성된다. 위험 식별은 시스템을 위협할 수 있는 위험을 파악하고, 위험 평가는 가장 위험하거나 발생 가능성이 높은 위험의 우선순위를 정한다. 위험 분석은 하향식(deductive) 또는 상향식(inductive) 접근법으로 근본 원인을 분석한다. 가장 널리 사용되는 기법 중 하나인 결함 트리 분석(fault tree analysis)은 위험을 트리의 루트에 놓고, 그 위험을 유발할 수 있는 시스템 상태를 역추적하여 근본 원인까지 분해한다. 여러 근본 원인의 조합에서만 발생하는 위험은 단일 근본 원인의 위험보다 사고로 이어질 가능성이 적다. 위험 분석 결과는 위험 레지스터에 기록되며, 이는 규제 기관에 제출되는 안전 사례의 일부가 된다.

## 예시

인슐린 투여 시스템의 결함 트리에서 "잘못된 인슐린 용량 투여"라는 위험의 근본 원인은 세 가지: (1) 혈당 수준의 잘못된 측정(센서 고장 또는 잘못된 계산), (2) 전달 시스템 장애(잘못된 계산 또는 신호 전송 실패), (3) 타이밍 문제(시스템 타이머 장애).

## 관련 개념

- [안전 필수 시스템 (Safety-Critical Systems)](/knowledge/software-engineering/safety-critical-systems/)
- [장애 트리 분석 (Fault Tree Analysis)](/knowledge/software-engineering/fault-tree-analysis/)
- [위험 평가 (Risk Assessment)](/knowledge/software-engineering/risk-assessment/)
- [안전 사례 (Safety Case)](/knowledge/software-engineering/safety-case/)
- [신뢰성 (Dependability)](/knowledge/software-engineering/dependability/)
