---
title: "Software Evolution"
description: "소프트웨어 진화는 운영 중인 소프트웨어 시스템이 변화하는 비즈니스 요구, 환경 변화, 사용자 피드백에 대응하여 지속적으로 변경되고 적응하는 과정이다"
tags: ['Software Evolution', 'Software Change', 'Lehman Laws', 'Spiral Model', 'System Lifecycle']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-evolution
sidebar:
  order: 5
---

## 핵심 개념

대부분의 대규모 소프트웨어 시스템은 10년 이상의 수명을 가지며, 전체 소프트웨어 비용의 60-90%가 진화(유지보수) 비용이다. 소프트웨어 진화는 초기 개발과 분리된 별개의 활동이 아니라, 개발과 진화가 통합된 나선형(spiral) 프로세스로 이해해야 한다. Lehman의 법칙에 따르면, 사용 중인 프로그램은 지속적으로 변경되어야 유용성을 유지할 수 있으며, 변경이 진행됨에 따라 프로그램의 구조는 저하된다.

## 예시

소프트웨어 진화의 나선형 모델: 릴리즈 1 개발(요구사항 → 설계 → 구현 → 테스트 → 배포) → 사용자 피드백 수집 → 릴리즈 2 개발(변경 요청 반영) → 배포 → ... 이 과정이 시스템의 전체 수명 동안 반복된다.

## 관련 개념

- [Software Maintenance](/knowledge/software-engineering/software-maintenance/)
- [Legacy Systems](/knowledge/software-engineering/legacy-systems/)
- [Software Reengineering](/knowledge/software-engineering/software-reengineering/)
- [Refactoring](/knowledge/software-engineering/refactoring/)
