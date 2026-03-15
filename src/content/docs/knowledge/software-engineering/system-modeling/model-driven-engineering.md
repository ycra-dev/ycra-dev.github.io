---
title: "모델 주도 공학 (Model-driven Engineering)"
description: "모델 주도 공학(MDE)은 프로그램보다 모델을 개발의 주요 산출물로 취급하여, 모델에서 자동으로 실행 가능한 코드를 생성하는 소프트웨어 개발 접근법이다"
tags: ['Mde', 'Mda', 'Model Driven', 'Code Generation', 'Abstraction', 'Omg']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/model-driven-engineering
sidebar:
  order: 6
---

## 핵심 개념

MDE에서는 추상 수준이 서로 다른 모델 간의 변환을 통해 소프트웨어를 개발한다. 모델 주도 아키텍처(MDA)는 MDE의 구체적 구현으로 OMG(Object Management Group)에서 정의했다. MDA는 세 가지 추상 수준의 모델을 정의한다: CIM(Computation Independent Model, 도메인 모델), PIM(Platform Independent Model, 플랫폼 독립 모델), PSM(Platform Specific Model, 플랫폼 종속 모델). MDE의 장점은 추상화를 통한 복잡도 관리이지만, 모델 변환의 정확성과 효율적인 코드 생성이 과제이다.

## 예시

MDA 변환 과정: CIM(비즈니스 요구사항 모델) → PIM(Java/C# 독립적 설계 모델) → PSM(Java EE 특화 모델) → 코드(Java 소스 코드 자동 생성). 예: PIM에서 "고객 관리" 클래스를 정의하면, PSM에서 JPA Entity로 변환되고, 최종적으로 Java 코드가 생성된다.

## 관련 개념

- [UML (통합 모델링 언어)](/knowledge/software-engineering/uml/)
- [소프트웨어 프로세스 (Software Process)](/knowledge/software-engineering/software-process/)
