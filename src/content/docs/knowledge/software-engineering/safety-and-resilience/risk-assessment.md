---
title: "Risk Assessment"
description: "위험(hazard)의 발생 확률과 그 결과의 심각성을 평가하여 해당 위험의 수용 가능성을 판단하는 프로세스이다"
tags: ['Risk Assessment', 'Safety', 'Probability', 'Severity', 'Intolerable', 'Alarp', 'Acceptable']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/risk-assessment
sidebar:
  order: 9
---

## 핵심 개념

리스크 평가에서 각 위험에 대해 수용 가능성은 리스크로 표현되며, 리스크는 사고의 가능성과 그 결과를 고려한다. 세 가지 리스크 범주가 사용된다: (1) 허용 불가(intolerable) 리스크는 인명을 위협하므로 반드시 방지해야 하고, (2) 합리적으로 실행 가능한 최저 수준(ALARP) 리스크는 비용 등 다른 고려사항에 따라 최소화해야 하며, (3) 수용 가능(acceptable) 리스크는 경미한 손해만 유발하므로 비용이 크게 증가하지 않는 한 줄여야 한다. 이 범주의 경계는 고정되어 있지 않으며, 시스템이 배치될 사회의 위험 수용 정도에 따라 달라진다. 시간이 지남에 따라 사회는 점점 더 위험을 기피하는 경향이 있어 경계가 하향 이동한다.

## 예시

인슐린 펌프 시스템의 리스크 분류: 인슐린 과다 투여(중간 확률, 높은 심각도 -> 허용 불가), 인슐린 과소 투여(중간 확률, 낮은 심각도 -> 수용 가능), 하드웨어 모니터링 시스템 장애(중간 확률, 중간 심각도 -> ALARP), 알레르기 반응(낮은 확률, 낮은 심각도 -> 수용 가능).

## 관련 개념

- [Hazard Analysis](/knowledge/software-engineering/hazard-analysis/)
- [Safety-Critical Systems](/knowledge/software-engineering/safety-critical-systems/)
- [Safety Case](/knowledge/software-engineering/safety-case/)
- [Security Risk Assessment](/knowledge/software-engineering/security-risk-assessment/)
- [Fault Tree Analysis](/knowledge/software-engineering/fault-tree-analysis/)
