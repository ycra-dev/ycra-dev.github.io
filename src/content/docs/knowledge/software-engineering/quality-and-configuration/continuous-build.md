---
title: "지속적 빌드 (Continuous Build)"
description: "head의 최신 코드 변경을 통합하여 자동화된 빌드와 테스트를 실행하는 CI 자동화의 첫 번째 단계"
tags: ["Software Engineering", "CI/CD"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/continuous-build
sidebar:
  order: 324
---

## 핵심 개념

지속적 빌드(Continuous Build, CB)는 head의 최신 코드 변경을 통합하여 자동화된 빌드와 테스트를 실행하는 CI 자동화의 첫 번째 단계이다. "빌드 깨짐"은 컴파일 실패뿐 아니라 테스트 실패도 포함한다.

## 동작 원리

CB는 변경이 제출된 후 관련 테스트를 실행하고, 통과하면 "green"으로 표시한다. 이를 통해 저장소에 두 가지 버전의 head가 존재하게 된다:

- **True head**: 커밋된 최신 변경
- **Green head**: CB가 검증한 최신 변경

엔지니어는 두 버전 중 어느 것으로든 동기화할 수 있다. 안정적 환경에서 작업하려면 green head, 제출 전에는 true head와 동기화하는 것이 일반적이다. 대부분의 팀은 green head에서 릴리스 후보(RC)를 잘라낸다.

Presubmit vs Post-submit의 균형이 중요하다:
- Presubmit: 빠르고 신뢰할 수 있는 테스트만 (보통 단위 테스트)
- Post-submit: 더 큰 범위, 더 긴 시간의 테스트 허용
- Mid-air collision: 서로 다른 파일을 변경하는 두 변경이 함께 테스트를 실패시키는 드문 상황

## 예시

Presubmit에서 모든 테스트를 실행하지 않는 이유:
1. 너무 비쌈 - 엔지니어 생산성 저하
2. 테스트가 실패보다 훨씬 자주 통과하므로 효율성 확보 가능
3. 불안정한 테스트에 의한 차단은 비용이 너무 높음
4. Presubmit 실행 중 저장소가 변경될 수 있음 (mid-air collision)

일반적 규칙: presubmit에서 약간의 커버리지 손실을 허용하되, post-submit에서 잡아내고 롤백을 수용한다.

## 관련 개념

- [테스트 자동화 플랫폼 (Test Automation Platform)](/knowledge/software-engineering/testing/test-automation-platform/)
- [프리서밋 검사 (Presubmit Checks)](/knowledge/software-engineering/quality-and-configuration/presubmit-checks/)
- [릴리스 후보 (Release Candidate)](/knowledge/software-engineering/quality-and-configuration/release-candidate/)
