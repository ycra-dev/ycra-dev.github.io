---
title: "Verification and Validation"
description: "검증(Verification)은 \"소프트웨어가 명세를 올바르게 구현했는가?\"를, 확인(Validation)은 \"소프트웨어가 고객의 실제 요구를 충족하는가?\"를 확인하는 과정이다"
tags: ['Verification', 'Validation', 'V And V', 'Software Testing', 'Software Inspection', 'Quality Assurance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/verification-and-validation
sidebar:
  order: 1
---

## 핵심 개념

검증은 소프트웨어가 기능적, 비기능적 요구사항 명세를 올바르게 충족하는지 확인하는 것이고, 확인은 소프트웨어가 실제 운영 환경에서 사용자의 기대를 충족하는지 확인하는 것이다. V&V의 목적은 시스템이 "목적에 부합(fit for purpose)"함을 보장하는 것이다. 소프트웨어 검사(inspection)는 정적 V&V 기법으로 실행 없이 소스 코드를 리뷰하는 것이고, 테스팅은 동적 V&V 기법으로 프로그램을 실행하여 결과를 확인하는 것이다. Dijkstra가 말했듯이, 테스팅은 오류의 존재는 보여줄 수 있지만 오류의 부재는 증명할 수 없다.

## 예시

검증 vs 확인 예시: 검증 - "요구사항 3.2에 명시된 대로 로그인 시 2단계 인증이 구현되었는가?" 확인 - "실제 사용자가 2단계 인증을 쉽게 사용할 수 있는가? 사용자 경험이 만족스러운가?"

## 관련 개념

- [Unit Testing](/knowledge/software-engineering/unit-testing/)
- [Release Testing](/knowledge/software-engineering/release-testing/)
- [Acceptance Testing](/knowledge/software-engineering/acceptance-testing/)
