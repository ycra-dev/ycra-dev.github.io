---
title: "테스트 피라미드 (Test Pyramid)"
description: "테스트 스위트의 이상적인 구성 비율을 시각적으로 표현한 모델로, 하단에 많은 단위 테스트, 상단에 소수의 E2E 테스트를 배치하는 피라미드 형태"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-pyramid
sidebar:
  order: 53
---

## 핵심 개념

테스트 피라미드는 Martin Fowler가 대중화한 개념으로, 테스트 스위트의 이상적인 구성 비율을 시각적으로 표현한 모델이다. Google에서도 테스트 전략의 기본 모델로 사용한다. 하단에 많은 수의 단위 테스트, 중간에 통합 테스트, 상단에 소수의 E2E 테스트를 배치한다.

## 동작 원리

**피라미드 구조**:
- **하단 (80%)**: 소형/단위 테스트 - 빠르고 안정적이며 유지보수가 쉽다
- **중단 (15%)**: 중형/통합 테스트 - 컴포넌트 간 상호작용을 검증한다
- **상단 (5%)**: 대형/E2E 테스트 - 전체 시스템을 검증하지만 느리고 불안정할 수 있다

**안티패턴 - 아이스크림 콘(Ice Cream Cone)**:
피라미드의 반대 형태로, E2E 테스트가 가장 많고 단위 테스트가 가장 적은 구조이다. 이 패턴은 느리고, 불안정하며, 유지보수 비용이 높다. 수동 테스트에 과도하게 의존하는 조직에서 흔히 발생한다.

**안티패턴 - 모래시계(Hourglass)**:
단위 테스트와 E2E 테스트는 많지만 통합 테스트가 부족한 구조이다. 이는 컴포넌트 간 상호작용 결함을 놓칠 수 있다.

## 예시

프로젝트에 100개의 테스트가 있다면:
- 약 80개: 개별 함수/클래스에 대한 단위 테스트
- 약 15개: 서비스 간 통합 테스트
- 약 5개: 전체 사용자 시나리오를 검증하는 E2E 테스트

## 관련 개념

- [테스트 크기 (Test Size)](/knowledge/software-engineering/testing/test-size/)
- [테스트 범위 (Test Scope)](/knowledge/software-engineering/testing/test-scope/)
- [대형 테스팅 (Larger Testing)](/knowledge/software-engineering/testing/larger-testing/)
