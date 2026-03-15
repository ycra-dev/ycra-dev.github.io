---
title: "소프트웨어 프로토타이핑 (Software Prototyping)"
description: "소프트웨어 프로토타이핑은 시스템의 초기 버전을 빠르게 구현하여 고객의 요구사항을 검증하고 설계 결정의 타당성을 확인하는 소프트웨어 개발 기법이다"
tags: ['Prototyping', 'Requirements Validation', 'Rapid Development', 'Throwaway Prototype']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-prototyping
sidebar:
  order: 9
---

## 핵심 개념

프로토타입은 요구사항 공학 과정에서 요구사항을 도출하고 검증하는 데 사용되거나, 설계 과정에서 UI 설계나 기술적 가능성을 탐색하는 데 사용된다. 프로토타입 개발 시 보통 일부 기능만 구현하며, 오류 처리나 비기능적 요구사항(성능, 보안 등)은 무시할 수 있다. 프로토타입은 사용 후 폐기(throw-away)되어야 하며, 실제 시스템의 기반으로 사용하면 안 된다. 이는 프로토타입이 유지보수성과 확장성을 고려하지 않고 개발되었기 때문이다.

## 예시

병원 정보 시스템의 프로토타입: 의사가 실제 화면을 보고 환자 정보 조회 방식에 대해 피드백을 제공할 수 있도록 UI만 구현하고, 실제 데이터베이스 연동이나 보안 기능은 생략한 형태로 개발한다.

## 관련 개념

- [요구사항 공학 (Requirements Engineering)](/knowledge/software-engineering/requirements-engineering/)
- [점진적 개발 (Incremental Development)](/knowledge/software-engineering/incremental-development/)
