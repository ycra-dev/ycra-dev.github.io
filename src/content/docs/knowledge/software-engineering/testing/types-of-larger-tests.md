---
title: "Types of Larger Tests"
description: "대형 테스트의 다양한 유형으로, 기능 테스트, A/B 차이 테스트, UAT, 프로빙, 배포 설정 테스트 등 각각 다른 목적과 특성을 가진다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/types-of-larger-tests
sidebar:
  order: 72
---

## 핵심 개념

대형 테스트는 단일한 형태가 아니라 다양한 유형이 존재하며, 각각 다른 목적과 특성을 가진다. Google에서는 빌드 시, 배포 전, 배포 후 단계에 따라 서로 다른 유형의 대형 테스트를 적용한다.

## 동작 원리

Google에서 사용하는 주요 대형 테스트 유형들:

1. **기능 테스트(Functional Testing)**: 하나의 바이너리에 대해 실제 동작을 검증한다. 테스트 더블을 최소화하고, 공개 API나 UI를 통해 테스트한다.

2. **브라우저/UI 테스트**: Selenium WebDriver 같은 도구로 웹 UI를 통해 시스템을 테스트한다. 가장 높은 충실도를 제공하지만 느리고 불안정하다.

3. **성능/부하/스트레스 테스트**: 시스템의 성능 특성을 검증한다. 응답 시간, 처리량, 리소스 사용량 등을 측정한다.

4. **배포 설정 테스트(Deployment Configuration Testing)**: 프로덕션 환경의 설정이 올바른지 검증한다. 잘못된 설정은 큰 장애의 원인이 된다.

5. **탐색적 테스트(Exploratory Testing)**: 자동화와 수동을 결합한 방식으로, 알려지지 않은 문제를 발견하기 위해 시스템을 자유롭게 탐색한다.

6. **A/B 차이 테스트(A/B Diff Testing)**: 시스템의 이전 버전과 새 버전의 출력을 비교하여 의도치 않은 변경을 감지한다.

7. **UAT(User Acceptance Testing)**: 자동화된 테스트와 수동 테스트를 통해 사용자의 핵심 여정(user journey)이 올바르게 동작하는지 검증한다.

8. **프로빙/카나리아 분석(Probers and Canary Analysis)**: 프로덕션 환경에서 실행되며, 실시간으로 시스템 건강을 모니터링한다.

## 예시

Google에서의 대형 테스트 구조:
- **빌드 시**: 기능 테스트, 허메틱 통합 테스트 실행
- **배포 전**: A/B 차이 테스트, 성능 테스트 실행
- **배포 후**: 프로빙, 카나리아 분석으로 프로덕션 모니터링
- **주기적**: 탐색적 테스트, UAT으로 전체 사용자 시나리오 검증

## 관련 개념

- [Larger Testing](/knowledge/software-engineering/testing/larger-testing/)
- [Test Fidelity](/knowledge/software-engineering/testing/test-fidelity/)
- [Hermetic Testing](/knowledge/software-engineering/testing/hermetic-testing/)
- [SUT Configuration](/knowledge/software-engineering/testing/sut-configuration/)
