---
title: "Safety Case"
description: "시스템이 주어진 환경에서 주어진 용도에 적합하게 안전하다는 것을 설득력 있고 타당하게 주장하는 증거의 체계적 문서이다"
tags: ['Safety Case', 'Safety', 'Evidence', 'Argument', 'Regulation', 'Compliance', 'Documentation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/safety-case
sidebar:
  order: 5
---

## 핵심 개념

안전 사례는 시스템의 설명, 시스템 개발에 사용된 프로세스 정보, 그리고 시스템이 안전하다는 것을 입증하는 논리적 주장을 포함한다. 안전 사례는 시스템 설명, 안전 요구사항, 위험 및 리스크 분석, 설계 분석, 검증 및 검증, 검토 보고서, 팀 역량, 프로세스 품질 보증, 변경 관리 프로세스 등으로 구성된다. 안전 사례의 주장은 보통 "주장 기반(claim based)" 주장으로 제시되며, 이용 가능한 증거에 기반하여 안전 주장이 타당함을 논증한다. 안전 사례는 매우 크고 복잡한 문서이며, 생산과 유지에 매우 비용이 많이 든다. 소프트웨어나 하드웨어 변경 시 안전 사례의 상당 부분을 다시 작성해야 할 수 있다.

## 예시

인슐린 펌프의 안전 사례 주장 예시: "주장: 인슐린 펌프가 계산하는 최대 단일 용량은 maxDose를 초과하지 않는다." 증거로 소프트웨어 안전 주장, 400개 테스트에서의 코드 커버리지 결과, 정적 분석 보고서가 제시되며, 이 증거가 주장을 정당화함을 논증한다.

## 관련 개념

- [Safety-Critical Systems](/knowledge/software-engineering/safety-critical-systems/)
- [Hazard Analysis](/knowledge/software-engineering/hazard-analysis/)
- [Formal Methods](/knowledge/software-engineering/formal-methods/)
- [Risk Assessment](/knowledge/software-engineering/risk-assessment/)
- [Static Analysis](/knowledge/software-engineering/static-analysis/)
