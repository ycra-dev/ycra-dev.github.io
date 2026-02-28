---
title: "Hermetic Testing in CI"
description: "CI 환경에서 밀폐 백엔드를 사용하여 외부 의존성 없이 완전히 자체 포함된 환경에서 테스트를 실행하는 접근법"
tags: ["Software Engineering", "Testing", "CI/CD"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/hermetic-testing-in-ci
sidebar:
  order: 302
---

## 핵심 개념

CI 환경에서의 밀폐 테스트(Hermetic Testing in CI)는 라이브 백엔드 대신 완전히 자체 포함된 테스트 환경(샌드박스 서버 등)을 사용하여 테스트를 실행하는 접근법이다. 결정성(determinism)과 격리(isolation)를 보장하여 flaky test를 줄이고 테스트 신뢰도를 높인다.

## 동작 원리

라이브 백엔드와 통신하는 테스트는 불안정하므로, 대규모 스코프 테스트에 밀폐 백엔드를 사용한다.

밀폐 테스트의 두 가지 핵심 속성:
1. **결정성**: 동일한 애플리케이션과 테스트 코드로 두 번 실행하면 동일한 결과. 외부 의존성에 의한 변동이 제거됨
2. **격리**: 프로덕션 문제가 테스트에 영향 없음, 반대도 마찬가지

밀폐 백엔드 구현 방식:
- **Fake**: 실제 백엔드보다 저렴하지만 유지보수 필요, 충실도 제한
- **완전 밀폐 스택**: 전체 스택을 샌드박스로 시작 (소규모 앱에 적합)
- **Record/Replay**: 라이브 백엔드 응답을 녹화, 캐싱, 재생 (대규모 시스템에 인기)

Record/Replay의 트레이드오프: 캐시를 너무 많이 사용하면 실제 문제를 놓치고, 너무 적게 사용하면 불필요한 실패가 발생한다.

## 예시

Google Assistant의 밀폐 테스트 전환 사례:
- 비밀폐 presubmit 시절: 50건 이상의 코드 변경이 테스트 결과를 무시하고 우회하는 날도 있었음
- 밀폐 전환 후: 실행 시간 14배 단축, 사실상 flakiness 제로
- 아직 실패는 발생하지만 찾기 쉽고 롤백이 용이

DisplayAds 팀: presubmit마다 약 400개 서버를 처음부터 시작하는 완전 밀폐 환경을 운영한다.

## 관련 개념

- [Hermetic Testing](/knowledge/software-engineering/testing/hermetic-testing/)
- [Test Automation Platform](/knowledge/software-engineering/testing/test-automation-platform/)
- [Hermetic Builds](/knowledge/software-engineering/quality-and-configuration/hermetic-builds/)
- [Presubmit Checks](/knowledge/software-engineering/quality-and-configuration/presubmit-checks/)
