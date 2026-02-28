---
title: "Live at Head"
description: "항상 모든 의존성의 최신 버전을 사용하고 의존자들이 적응하기 어려운 방식으로 변경하지 않는 의존성 관리 모델"
tags: ["Software Engineering", "Dependencies"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/live-at-head
sidebar:
  order: 320
---

## 핵심 개념

Live at Head는 트렁크 기반 개발(Trunk-Based Development)의 의존성 관리 확장으로, 항상 모든 의존성의 최신 버전을 사용하고 의존자들이 적응하기 어려운 방식으로 변경하지 않는 모델이다. SemVer 버전 번호 대신 테스트와 CI를 통해 변경의 안전성을 판단한다.

## 동작 원리

Live at Head는 SemVer를 버리고, 의존성을 고정(pin)하지 않으며, 의존성 제공자가 변경을 커밋하기 전에 전체 생태계에 대해 테스트할 것을 전제로 한다.

핵심 패러다임 전환:
- **API 제공자**: 하위 의존자들의 테스트가 깨지면 커밋하지 않거나, 자동 리팩토링 도구를 제공
- **API 소비자**: 테스트를 통과 상태로 유지하고, 지원되는 방식으로 의존성 사용
- **변경이 "안전한가"의 판단**: SemVer 번호가 아닌 테스트 통과 여부

이 모델은 Google 내부에서는 비용이 높지만 효과적이며, 대부분의 비용과 인센티브를 올바른 곳에 배치한다. 하지만 OSS 생태계에서는 아직 대규모로 검증되지 않았다.

버전 선택 원칙: "모든 것의 가장 최근 안정 버전은 무엇인가?" 제공자가 책임감 있게 변경했다면 모두 원활하게 작동한다.

## 예시

Google의 Abseil 프로젝트가 이 접근법의 실례이다. Abseil은 ABI 호환성은 약속하지 않지만, 호환성을 깨는 API 변경 시 자동 리팩토링 도구를 제공하여 소비자의 최대 비용이 "이 도구를 실행하라"가 되도록 한다. 이로써 어떤 버전에 대해 작성된 의존성이든 최신 버전을 사용할 수 있다.

## 관련 개념

- [Dependency Management](/knowledge/software-engineering/quality-and-configuration/dependency-management/)
- [Diamond Dependency Problem](/knowledge/software-engineering/quality-and-configuration/diamond-dependency-problem/)
- [Minimum Version Selection](/knowledge/software-engineering/quality-and-configuration/minimum-version-selection/)
- [ABI vs API Compatibility](/knowledge/software-engineering/quality-and-configuration/abi-vs-api-compatibility/)
