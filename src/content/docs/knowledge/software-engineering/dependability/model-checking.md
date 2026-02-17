---
title: "Model Checking"
description: "시스템의 형식적 상태 모델을 생성하고 특수 소프트웨어 도구를 사용하여 그 모델의 정확성을 전수 검사하는 형식적 분석 접근법이다"
tags: ['Model Checking', 'Formal Verification', 'State Model', 'Temporal Logic', 'Exhaustive Analysis']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/model-checking
sidebar:
  order: 11
---

## 핵심 개념

모델 체킹은 시스템의 확장된 유한 상태 모델을 사용하며, 모델은 사용하는 모델 체킹 도구의 언어로 표현된다(예: SPIN은 Promela 사용). 바람직한 시스템 속성을 식별하여 시간 논리(temporal logic) 기반의 형식적 표기법으로 작성하면, 모델 체커가 모든 가능한 상태 전이(경로)를 탐색하여 각 경로에서 해당 속성이 유지되는지 확인한다. 속성이 유지되면 모델이 정확함을 확인하고, 유지되지 않으면 반례를 출력한다. 모델 체킹은 특히 동시성 시스템의 검증에 유용하며, 인터리브된 동시 전이를 탐색하여 잠재적 문제를 발견할 수 있다. NASA의 화성 탐사 차량 제어 소프트웨어와 Airbus의 항공 전자 소프트웨어 개발에 사용되었다. 그러나 계산 비용이 매우 높아 대규모 시스템에서는 비실용적일 수 있다.

## 예시

야생 날씨 시스템에서 모델 체커로 검증할 수 있는 속성의 예: "시스템은 항상 '기록(recording)' 상태에서 '전송(transmitting)' 상태에 도달할 수 있어야 한다." SPIN, SLAM(Microsoft), PRISM 등의 모델 체킹 도구가 있다.

## 관련 개념

- [Formal Methods](/knowledge/software-engineering/formal-methods/)
- [Static Analysis](/knowledge/software-engineering/static-analysis/)
- [Safety-Critical Systems](/knowledge/software-engineering/safety-critical-systems/)
- [Safety Case](/knowledge/software-engineering/safety-case/)
