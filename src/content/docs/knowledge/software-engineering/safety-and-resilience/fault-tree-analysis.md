---
title: "장애 트리 분석 (Fault Tree Analysis)"
description: "식별된 위험(hazard)에서 시작하여 그 위험의 가능한 원인을 역추적으로 분해하는 하향식(top-down) 위험 분석 기법이다"
tags: ['Fault Tree Analysis', 'Hazard Analysis', 'Safety', 'Top Down', 'Root Cause', 'And Gate', 'Or Gate']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/fault-tree-analysis
sidebar:
  order: 3
---

## 핵심 개념

결함 트리 분석은 하드웨어와 소프트웨어 위험을 모두 분석하기 위해 개발된 기법이다. 위험을 트리의 루트에 놓고, 해당 위험을 유발할 수 있는 시스템 상태를 식별한 후, 각 상태에 대해 다시 그 상태를 유발할 수 있는 시스템 상태를 식별하는 방식으로 근본 원인에 도달할 때까지 분해를 계속한다. 여러 근본 원인의 조합에서만 발생할 수 있는 위험은 단일 근본 원인의 위험보다 사고로 이어질 가능성이 낮다. 결함 트리의 분기에서 AND 게이트는 모든 하위 사건이 동시에 발생해야 위험이 발생함을 나타내고, OR 게이트는 어느 하나의 하위 사건만으로도 위험이 발생함을 나타낸다. 이 기법은 도메인 전문 지식 없이도 이해할 수 있어 널리 사용된다.

## 예시

인슐린 전달 시스템의 "잘못된 인슐린 용량 투여" 결함 트리: 루트 위험 -> (1) 혈당 수준 잘못 측정 -> (센서 고장 OR 잘못된 계산(알고리즘 오류 OR 산술 오류)), (2) 타이밍 문제 -> 시스템 타이머 장애, (3) 전달 시스템 장애 -> (잘못된 인슐린 요구량 계산 OR 펌프 신호 전송 실패).

## 관련 개념

- [위험 분석 (Hazard Analysis)](/knowledge/software-engineering/hazard-analysis/)
- [안전 필수 시스템 (Safety-Critical Systems)](/knowledge/software-engineering/safety-critical-systems/)
- [위험 평가 (Risk Assessment)](/knowledge/software-engineering/risk-assessment/)
- [안전 사례 (Safety Case)](/knowledge/software-engineering/safety-case/)
- [스위스 치즈 모델 (Swiss Cheese Model)](/knowledge/software-engineering/swiss-cheese-model/)
