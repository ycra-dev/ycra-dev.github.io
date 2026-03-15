---
title: "정형 기법 (Formal Methods)"
description: "소프트웨어의 형식적 모델(수학적 모델)을 정의하고 이를 분석하거나 프로그램이 이 모델과 일치하는지 증명하는 수학적 소프트웨어 개발 접근법이다"
tags: ['Formal Methods', 'Verification', 'Mathematical Proof', 'Model Checking', 'Specification']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/formal-methods
sidebar:
  order: 10
---

## 핵심 개념

형식적 방법은 자연어 요구사항을 형식적으로 정의된 의미론을 가진 수학적 언어로 변환하여 시스템 명세를 만드는 접근법이다. 형식적 명세는 시스템이 무엇을 해야 하는지에 대한 모호하지 않은 기술을 제공한다. 형식적 방법에는 정리 증명(theorem proving), 정제 기반 개발(refinement-based development), 모델 체킹(model checking) 등이 포함된다. B 방법은 파리 메트로 시스템 개발에 사용된 대표적인 형식적 방법이다. 형식적 방법은 명세 오류 발견, 프로그램과 명세의 불일치 발견에 효과적이지만, 도메인 전문가가 이해하기 어렵고, 대규모 시스템에 확장하기 어려우며, 도구 지원이 제한적이라는 이유로 산업계에서 제한적으로 채택되고 있다.

## 예시

B 방법을 사용한 파리 메트로 시스템 개발에서는 형식적 명세를 정교화(refinement)하여 프로그램을 생성했으며, 이 과정에서 소프트웨어 컴포넌트 테스트가 불필요해져 시스템 테스트만으로 충분했다.

## 관련 개념

- [신뢰성 (Dependability)](/knowledge/software-engineering/dependability/)
- [모델 검사 (Model Checking)](/knowledge/software-engineering/model-checking/)
- [정적 분석 (Static Analysis)](/knowledge/software-engineering/static-analysis/)
- [안전 사례 (Safety Case)](/knowledge/software-engineering/safety-case/)
- [신뢰 가능한 프로세스 (Dependable Processes)](/knowledge/software-engineering/dependable-processes/)
