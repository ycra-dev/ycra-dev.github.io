---
title: "SUT 구성 (SUT Configuration)"
description: "대형 테스트에서 시스템 언더 테스트(System Under Test)의 크기와 구성 방식으로, SUT의 범위에 따라 테스트의 충실도, 비용, 복잡성이 달라진다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/sut-configuration
sidebar:
  order: 73
---

## 핵심 개념

대형 테스트에서 가장 중요한 결정 중 하나는 SUT(System Under Test)의 크기와 구성이다. SUT가 클수록 충실도는 높아지지만, 설정 비용, 실행 시간, 유지보수 부담이 증가한다. SUT 설정의 자동화가 중요하다 - 수동 설정은 확장되지 않는다.

## 동작 원리

**SUT 크기 스펙트럼**:

1. **단일 프로세스 SUT**: 하나의 바이너리만 테스트하고, 의존성은 테스트 더블로 대체한다. 설정이 간단하지만 충실도가 제한적이다.

2. **단일 머신 SUT**: 여러 프로세스를 하나의 머신에서 실행한다. 서비스 간 실제 통신을 테스트할 수 있다.

3. **다중 머신 SUT**: 여러 머신에 걸쳐 서비스를 배포한다. 프로덕션에 가장 가까운 구성이지만 비용이 크다.

4. **프로덕션 SUT(공유 환경)**: 실제 프로덕션이나 스테이징 환경에서 테스트한다. 충실도가 가장 높지만, 비결정적이고 다른 테스트/사용자에게 영향을 줄 수 있다.

**핵심 트레이드오프**:
- SUT가 클수록 충실도는 높아지지만, 설정 비용, 실행 시간, 유지보수 부담이 증가한다
- SUT가 작을수록 제어가 쉽지만, 프로덕션 환경에서만 나타나는 문제를 놓칠 수 있다

## 예시

Google Cloud 같은 서비스의 SUT 구성 예시:
- **개발 중**: 단일 프로세스 SUT + Fake 의존성으로 빠른 피드백
- **PR 제출 시**: 허메틱 다중 프로세스 SUT로 통합 검증
- **릴리스 전**: 스테이징 환경의 전체 SUT로 E2E 검증
- **릴리스 후**: 프로덕션 프로빙으로 실시간 건강 확인

## 관련 개념

- [대형 테스팅 (Larger Testing)](/knowledge/software-engineering/testing/larger-testing/)
- [테스트 충실도 (Test Fidelity)](/knowledge/software-engineering/testing/test-fidelity/)
- [밀폐 테스팅 (Hermetic Testing)](/knowledge/software-engineering/testing/hermetic-testing/)
- [대형 테스트의 유형 (Types of Larger Tests)](/knowledge/software-engineering/testing/types-of-larger-tests/)
