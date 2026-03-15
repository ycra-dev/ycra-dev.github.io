---
title: "테스트 충실도 (Test Fidelity)"
description: "테스트가 시스템 언더 테스트(SUT)의 실제 동작을 얼마나 정확하게 반영하는가를 나타내는 속성"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-fidelity
sidebar:
  order: 70
---

## 핵심 개념

충실도(Fidelity)는 대형 테스트가 존재하는 가장 근본적인 이유이다. 테스트가 시스템 언더 테스트(SUT)의 실제 동작을 얼마나 정확하게 반영하는가를 나타낸다. 핵심은 적절한 수준의 충실도를 선택하는 것이다.

## 동작 원리

**충실도의 구성 요소**:
1. **SUT 충실도**: 테스트 대상 시스템이 프로덕션과 얼마나 유사한가? 테스트 더블을 많이 사용할수록 충실도가 떨어진다.
2. **환경 충실도**: 테스트 환경이 프로덕션 환경과 얼마나 유사한가? 로컬 개발 환경 vs 스테이징 환경 vs 실제 프로덕션 환경.
3. **데이터 충실도**: 테스트에 사용되는 데이터가 실제 데이터와 얼마나 유사한가?

**충실도와 비용의 트레이드오프**:
- 충실도가 높을수록 테스트가 느리고, 비용이 크며, 관리가 어렵다
- 충실도가 낮을수록 테스트가 빠르지만, 실제 버그를 놓칠 수 있다
- 테스트 피라미드는 이 트레이드오프를 반영한다: 대부분의 테스트는 낮은 충실도(단위 테스트)로, 소수의 테스트만 높은 충실도(E2E)로 실행

**SUT의 크기와 충실도**:
- SUT가 넓을수록 충실도는 높아지지만, 비용과 복잡성도 증가한다

## 예시

충실도 수준별 테스트:
- **낮은 충실도**: Fake DB + Mock 외부 서비스로 단위 테스트 (빠르지만 실제 동작과 다를 수 있음)
- **중간 충실도**: 실제 DB + 허메틱 서버로 통합 테스트 (더 현실적이지만 느림)
- **높은 충실도**: 스테이징 환경에서 전체 시스템 E2E 테스트 (프로덕션에 가장 가까움)

## 관련 개념

- [대형 테스팅 (Larger Testing)](/knowledge/software-engineering/testing/larger-testing/)
- [밀폐 테스팅 (Hermetic Testing)](/knowledge/software-engineering/testing/hermetic-testing/)
- [SUT 구성 (SUT Configuration)](/knowledge/software-engineering/testing/sut-configuration/)
- [테스트 더블 (Test Doubles)](/knowledge/software-engineering/testing/test-doubles/)
