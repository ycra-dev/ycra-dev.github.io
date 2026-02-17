---
title: "Regression Testing"
description: "회귀 테스트는 소프트웨어 변경 후 기존에 성공적으로 통과한 테스트를 재실행하여, 변경으로 인해 새로운 결함이 도입되지 않았음을 확인하는 테스트 기법이다"
tags: ['Regression Testing', 'Automated Testing', 'Test Suite', 'Ci Cd', 'Change Verification']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/regression-testing
sidebar:
  order: 5
---

## 핵심 개념

회귀 테스트는 코드 수정, 리팩토링, 새 기능 추가 후에 기존 기능이 정상적으로 동작하는지 확인하는 데 필수적이다. 수동 회귀 테스트는 비용이 매우 높으므로, 자동화된 테스트가 사실상 필수이다. TDD에서는 모든 변경 후 전체 테스트 스위트를 실행하므로 자연스럽게 회귀 테스트가 수행된다. CI/CD 파이프라인에서 회귀 테스트 자동화는 핵심 구성 요소이다.

## 예시

회귀 테스트 시나리오: 로그인 기능을 수정한 후, 기존의 모든 테스트(로그인 성공, 로그인 실패, 비밀번호 재설정, 세션 관리 등)를 재실행하여 수정 사항이 다른 기능에 영향을 주지 않았음을 확인한다.

## 관련 개념

- [Test-driven Development](/knowledge/software-engineering/test-driven-development/)
- [Continuous Integration](/knowledge/software-engineering/continuous-integration/)
- [Unit Testing](/knowledge/software-engineering/unit-testing/)
