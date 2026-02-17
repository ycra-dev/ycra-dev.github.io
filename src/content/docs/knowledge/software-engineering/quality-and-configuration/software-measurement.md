---
title: "Software Measurement"
description: "소프트웨어 측정은 소프트웨어 시스템의 복잡성, 신뢰성 등의 속성을 정량화하여 소프트웨어 프로세스, 도구, 방법의 효과를 평가하는 활동이다"
tags: ['Software Measurement', 'Metrics', 'Cyclomatic Complexity', 'Static Analysis', 'Software Metrics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-measurement
sidebar:
  order: 5
---

## 핵심 개념

소프트웨어 메트릭은 제어 메트릭(프로세스 관리 지원)과 예측 메트릭(소프트웨어 특성 예측)으로 분류된다. 제품 메트릭은 동적 메트릭(실행 중 측정 - 효율성, 신뢰성)과 정적 메트릭(코드/설계/문서 분석 - 복잡성, 유지보수성)으로 나뉜다. 주요 정적 메트릭에는 Fan-in/Fan-out, 코드 길이, 순환 복잡도(cyclomatic complexity), 식별자 길이, 조건 중첩 깊이, Fog 지수가 있다. CK OO 메트릭 스위트에는 WMC, DIT, NOC, CBO, RFC, LCOM이 포함된다. 내부 속성(크기, 복잡성)과 외부 품질 속성(유지보수성, 이해가능성) 사이의 명확하고 일관된 관계를 확립하기 어려우며, 측정 결과의 해석에는 맥락이 중요하다.

## 예시

정적 메트릭 예시:
```
Fan-in/Fan-out: 함수 X를 호출하는 함수 수 / X가 호출하는 함수 수
Cyclomatic complexity: 프로그램의 제어 흐름 복잡도 측정
DIT (Depth of Inheritance Tree): 상속 트리의 이산 수준 수
CBO (Coupling Between Object Classes): 클래스 간 결합도 측정
```
변경 요청 수 분석 시, 요청이 줄었다면 소프트웨어 품질 향상 때문일 수도 있고, 시장 점유율 감소로 사용자가 줄어서일 수도 있어 맥락 분석이 필수적이다.

## 관련 개념

- [Software Quality Management](/knowledge/software-engineering/software-quality-management/)
- [Software Analytics](/knowledge/software-engineering/software-analytics/)
- [Reviews and Inspections](/knowledge/software-engineering/reviews-and-inspections/)
