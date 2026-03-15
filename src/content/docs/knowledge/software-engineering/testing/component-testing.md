---
title: "컴포넌트 테스팅 (Component Testing)"
description: "컴포넌트 테스트(통합 테스트)는 여러 개별 단위(객체, 메서드)가 결합된 복합 컴포넌트의 인터페이스와 상호작용을 테스트하는 과정이다"
tags: ['Component Testing', 'Integration Testing', 'Interface Testing', 'Software Testing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/component-testing
sidebar:
  order: 3
---

## 핵심 개념

컴포넌트 테스트에서는 개별 단위의 올바른 동작을 가정하고, 컴포넌트 간의 인터페이스를 통한 상호작용에 초점을 맞춘다. 인터페이스 유형에는 매개변수 인터페이스, 공유 메모리 인터페이스, 프로시저 인터페이스, 메시지 패싱 인터페이스가 있다. 인터페이스 오류는 인터페이스 오용(잘못된 매개변수), 인터페이스 오해(잘못된 가정), 타이밍 오류의 세 가지 유형으로 분류된다.

## 예시

인터페이스 테스트: 정렬된 배열을 기대하는 이진 검색 메서드에 정렬되지 않은 배열을 전달했을 때의 동작을 확인한다. 또한 null 포인터, 빈 배열, 극단값 등의 경계 조건을 테스트한다.

## 관련 개념

- [단위 테스팅 (Unit Testing)](/knowledge/software-engineering/unit-testing/)
- [검증과 확인 (Verification and Validation)](/knowledge/software-engineering/verification-and-validation/)
