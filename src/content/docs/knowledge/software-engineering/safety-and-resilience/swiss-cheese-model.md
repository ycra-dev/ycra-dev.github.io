---
title: "스위스 치즈 모델 (Swiss Cheese Model)"
description: "James Reason이 제안한 시스템 장애 이론으로, 방어 계층이 견고한 장벽이 아닌 구멍이 있는 스위스 치즈 조각과 같아서, 모든 계층의 취약점(구멍)이 동시에 정렬될 때 장애가 발생한다고 설명한다"
tags: ['Swiss Cheese Model', 'Defense Layers', 'Failure Theory', 'Latent Conditions', 'Barrier', 'James Reason']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/swiss-cheese-model
sidebar:
  order: 4
---

## 핵심 개념

스위스 치즈 모델에서 각 방어 계층의 취약점(잠재적 조건)은 에멘탈 치즈의 구멍에 비유된다. 이 구멍들은 정적이지 않고, 시스템 상태와 운영 인력에 따라 크기와 위치가 변한다. 예를 들어, 운영자들이 서로의 작업을 검토하는 시스템에서 두 운영자가 같은 실수를 할 가능성은 정상 상황에서는 낮지만(작은 구멍), 과부하 상태에서는 실수 가능성이 증가한다(구멍이 커짐). 외부 트리거 이벤트(인적 오류 또는 사이버 공격)가 발생했을 때 모든 방어 장벽이 실패하면(치즈 구멍이 정렬되면) 전체 시스템 장애가 발생한다. 이 모델은 회복탄력성 향상을 위한 네 가지 전략을 제시한다: 외부 이벤트 발생 확률 감소, 방어 계층 수 증가, 다양한 유형의 장벽 설계, 잠재적 조건(구멍) 최소화.

## 예시

항공 교통 관제 시스템의 다중 방어 계층: (1) 충돌 경고 시스템(소프트웨어 검사) - 항공기의 궤적을 추정하여 교차할 경우 경보, (2) 공식화된 기록 절차(사람 검사) - 발급된 관제 지시를 기록하고 확인, (3) 협력적 검토(사람 검사) - 관제사 팀이 서로의 작업을 지속적으로 모니터링하고 실수를 감지. 과부하 상태에서 이 세 계층의 "구멍"이 모두 정렬되면 사고가 발생할 수 있다.

## 관련 개념

- [복원력 (Resilience)](/knowledge/software-engineering/resilience/)
- [심층 방어 (Defense in Depth)](/knowledge/software-engineering/defense-in-depth/)
- [사회기술적 복원력 (Sociotechnical Resilience)](/knowledge/software-engineering/sociotechnical-resilience/)
- [장애 트리 분석 (Fault Tree Analysis)](/knowledge/software-engineering/fault-tree-analysis/)
- [중복성과 다양성 (Redundancy and Diversity)](/knowledge/software-engineering/redundancy-and-diversity/)
