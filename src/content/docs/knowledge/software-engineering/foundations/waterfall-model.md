---
title: "폭포수 모델 (Waterfall Model)"
description: "폭포수 모델은 소프트웨어 개발의 기본 프로세스 활동을 요구사항 정의, 시스템 및 소프트웨어 설계, 구현 및 단위 테스트, 통합 및 시스템 테스트, 운영 및 유지보수의 단계로 나누고 순차적으로 진행하는 계획 기반 프로세스 모델이다"
tags: ['Waterfall Model', 'Software Process Model', 'Plan Driven', 'Sequential Development']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/waterfall-model
sidebar:
  order: 5
---

## 핵심 개념

폭포수 모델에서 각 단계는 이전 단계가 완료된 후에 시작되며, 원칙적으로 이전 단계로의 되돌아감이 없다. 이 모델은 요구사항이 잘 이해되고 변경 가능성이 낮은 프로젝트에 적합하다. 하드웨어 시스템과 함께 개발되는 대규모 시스템 공학 프로젝트에서 주로 사용된다. 단점은 요구사항 변경에 대응하기 어렵고, 고객이 시스템을 직접 사용해보기 전까지 문제를 발견하기 어렵다는 것이다. V-모델은 폭포수 모델의 변형으로 각 개발 단계에 대응하는 테스트 단계를 명시한다.

## 예시

```
요구사항 정의 → 시스템 설계 → 구현 → 통합 테스트 → 운영/유지보수
         ↓           ↓         ↓          ↓
    요구사항 문서   설계 문서   코드    테스트 보고서
```

## 관련 개념

- [소프트웨어 프로세스 (Software Process)](/knowledge/software-engineering/software-process/)
- [점진적 개발 (Incremental Development)](/knowledge/software-engineering/incremental-development/)
- [요구사항 공학 (Requirements Engineering)](/knowledge/software-engineering/requirements-engineering/)
- [검증과 확인 (Verification and Validation)](/knowledge/software-engineering/verification-and-validation/)
