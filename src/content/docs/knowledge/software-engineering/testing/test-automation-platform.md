---
title: "테스트 자동화 플랫폼 (Test Automation Platform)"
description: "Google의 글로벌 지속적 빌드 시스템으로, 전체 코드베이스에 대해 자동화된 테스트를 실행하고 거의 모든 변경의 게이트웨이 역할을 하는 대규모 CI 인프라"
tags: ["Software Engineering", "CI/CD", "Testing", "Google Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-automation-platform
sidebar:
  order: 300
---

## 핵심 개념

TAP(Test Automation Platform)은 Google의 글로벌 지속적 빌드 시스템으로, 전체 코드베이스에 대해 자동화된 테스트를 실행하고, 모노레포 환경에서 거의 모든 변경의 게이트웨이 역할을 하는 대규모 CI 인프라이다. 하루 50,000건 이상의 고유 변경과 40억 개 이상의 개별 테스트 케이스를 처리한다.

## 동작 원리

TAP은 두 가지 버전의 head를 도입한다:
- **True head**: 커밋된 최신 변경
- **Green head**: CB(Continuous Build)가 검증한 최신 변경

기본 프로세스: 엔지니어가 코드를 제출 → TAP이 관련 테스트를 실행 → 성공 또는 실패를 보고 → 테스트가 통과하면 코드베이스에 진입을 허용.

Presubmit 최적화: 모든 테스트를 presubmit에서 실행하면 너무 비싸므로, 각 팀이 빠른 테스트 서브셋(보통 단위 테스트)을 presubmit으로 지정. Presubmit 통과 후 변경이 제출되면, TAP이 비동기적으로 잠재적 영향 테스트를 모두 실행한다.

Build Cop 제도: 각 팀에는 프로젝트의 모든 테스트 통과를 책임지는 Build Cop이 있다. 누가 깨뜨렸든 상관없이 빌드를 수리한다.

## 예시

TAP에서 테스트 실패가 발생하면 Build Cop이 즉시 대응한다:
1. 문제를 일으킨 변경 식별
2. 롤백(선호) 또는 전진 수정(더 위험) 결정
3. 문화적 규범: 실패 중인 테스트 위에 새 작업을 커밋하지 않음

## 관련 개념

- [밀폐 테스팅 (Hermetic Testing)](/knowledge/software-engineering/testing/hermetic-testing/)
- [TAP 트레인 (TAP Train)](/knowledge/software-engineering/design-and-evolution/tap-train/)
- [프리서밋 검사 (Presubmit Checks)](/knowledge/software-engineering/quality-and-configuration/presubmit-checks/)
- [지속적 빌드 (Continuous Build)](/knowledge/software-engineering/quality-and-configuration/continuous-build/)
