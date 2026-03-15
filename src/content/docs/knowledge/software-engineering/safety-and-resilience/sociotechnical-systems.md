---
title: "사회기술 시스템 (Sociotechnical Systems)"
description: "컴퓨터 하드웨어, 소프트웨어, 인간, 프로세스, 규정 등을 포함하는 광범위한 시스템으로, 조직이나 비즈니스 목적을 지원하기 위해 설계된다"
tags: ['Sociotechnical Systems', 'System Engineering', 'Organizational Factors', 'Human Factors', 'Dependability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/sociotechnical-systems
sidebar:
  order: 10
---

## 핵심 개념

사회기술 시스템은 기술적 구성요소(하드웨어, 소프트웨어)와 비기술적 요소(사람, 프로세스, 규정)를 모두 포함하는 복합 시스템이다. 이 시스템은 장비 계층, 운영체제 계층, 통신 및 데이터 관리 계층, 애플리케이션 계층, 비즈니스 프로세스 계층, 조직 계층, 사회 계층으로 구성된 스택으로 모델링할 수 있다. 시스템의 의존성은 소프트웨어뿐만 아니라 하드웨어, 사람, 조직의 모든 요소에 의해 영향을 받는다. 하드웨어 장애, 소프트웨어 결함, 운영 오류는 상호 관련되어 있으며, 하나의 장애가 연쇄적으로 다른 장애를 유발할 수 있다. 따라서 의존 가능하고 안전한 소프트웨어를 설계할 때는 소프트웨어만이 아닌 전체 사회기술 시스템의 관점에서 접근해야 한다.

## 예시

야생 날씨 관측 시스템은 소프트웨어가 기상 관측 장비를 제어하고, 다른 소프트웨어 시스템과 통신하며, 기상 예보 프로세스와 이를 운영하는 사람들을 포함하는 사회기술 시스템이다. 법률 변경(사회 계층)이 조직 절차 변경과 비즈니스 프로세스 수정을 유발하고, 이것이 다시 통신 및 데이터 관리 계층의 변경까지 초래할 수 있다.

Mentcare 시스템(정신건강 환자 관리)은 환자 치료 품질 향상과 치료 비용 효율성 개선이라는 두 가지 비즈니스 목표를 지원하도록 설계되었으나, 보고 목표를 위한 추가 정보 입력이 임상직원의 환자 대면 시간을 줄여 두 목표가 상충하게 된 사례이다. 이는 사회기술 시스템에서 "사악한 문제(wicked problem)"의 전형적인 예로, 완전한 문제 명세가 불가능하고 이해관계자마다 문제를 다르게 인식한다.

## 관련 개념

- [신뢰성 (Dependability)](/knowledge/software-engineering/dependability/)
- [신뢰 가능한 프로세스 (Dependable Processes)](/knowledge/software-engineering/dependable-processes/)
- [사회기술적 복원력 (Sociotechnical Resilience)](/knowledge/software-engineering/sociotechnical-resilience/)
- [복원력 (Resilience)](/knowledge/software-engineering/resilience/)
- [시스템 공학 (Systems Engineering)](/knowledge/software-engineering/systems-engineering/)
- [창발적 속성 (Emergent Properties)](/knowledge/software-engineering/emergent-properties/)
- [시스템 오브 시스템즈 (Systems of Systems)](/knowledge/software-engineering/systems-of-systems/)
- [시스템 조달 (System Procurement)](/knowledge/software-engineering/system-procurement/)
