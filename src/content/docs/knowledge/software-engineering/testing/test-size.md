---
title: "Test Size"
description: "테스트가 소비하는 리소스와 허용 작업 범위에 따라 Small, Medium, Large로 분류하는 Google의 테스트 크기 기준"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-size
sidebar:
  order: 50
---

## 핵심 개념

Test Size는 Google이 테스트를 분류하는 주요 축 중 하나로, 테스트가 소비하는 리소스와 허용되는 작업 범위에 따라 Small, Medium, Large 세 단계로 구분한다. 크기 제약의 핵심 목적은 테스트의 **신뢰성과 속도**를 보장하는 것이다. 작은 테스트일수록 빠르고 안정적이며, 실패 시 원인을 파악하기 쉽다.

## 동작 원리

Google은 테스트 크기를 엄격하게 정의한다:

**Small Tests (소형 테스트)**:
- 단일 프로세스에서 실행되어야 한다
- 슬립, I/O 작업, 네트워크 호출 등이 불가능하다
- 거의 항상 결정적(deterministic)이다
- 약 60초 이내에 완료되어야 한다
- 전체 테스트의 약 80%를 차지하는 것이 이상적이다

**Medium Tests (중형 테스트)**:
- 단일 머신에서 실행되어야 한다
- localhost에 대한 네트워크 호출이 허용된다
- 약 300초 이내에 완료되어야 한다
- 데이터베이스 등 외부 의존성을 로컬에서 실행할 수 있다

**Large Tests (대형 테스트)**:
- 여러 머신에 걸쳐 실행될 수 있다
- 외부 서비스에 대한 네트워크 호출이 허용된다
- 비결정적(nondeterministic)일 수 있다
- 900초 이상 걸릴 수 있다

## 예시

Google의 권장 비율: 약 80% Small, 15% Medium, 5% Large 테스트. 이 비율은 "테스트 피라미드(Test Pyramid)"의 형태를 따르며, 빠르고 안정적인 소형 테스트를 기반으로 하고, 더 넓은 범위의 테스트는 상위 레이어에서 적은 수로 유지한다.

## 관련 개념

- [Test Scope](/knowledge/software-engineering/testing/test-scope/)
- [Test Pyramid](/knowledge/software-engineering/testing/test-pyramid/)
- [Flaky Tests](/knowledge/software-engineering/testing/flaky-tests/)
- [Larger Testing](/knowledge/software-engineering/testing/larger-testing/)
