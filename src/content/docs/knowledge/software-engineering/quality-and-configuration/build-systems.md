---
title: "빌드 시스템 (Build Systems)"
description: "엔지니어가 작성한 소스 코드를 머신이 읽을 수 있는 실행 바이너리로 변환하는 시스템으로, 속도(fast)와 정확성(correct)이라는 두 가지 핵심 속성을 최적화해야 한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/build-systems
sidebar:
  order: 211
---

## 핵심 개념

빌드 시스템은 엔지니어가 작성한 소스 코드를 머신이 읽을 수 있는 실행 바이너리로 변환하는 시스템이다. 좋은 빌드 시스템의 두 가지 목표는 **빠름(fast)**과 **정확함(correct)**이다. 많은 구형 빌드 시스템은 속도와 정확성 사이에서 타협하지만, Bazel의 핵심 목표는 이 둘 사이의 선택을 불필요하게 만드는 것이다.

## 동작 원리

빌드 시스템의 진화 단계:
1. **컴파일러 직접 호출**: 소규모에서만 작동
2. **빌드 스크립트**: 의존성이 복잡해지면 한계
3. **태스크 기반 빌드 시스템**: Ant, Maven, Gradle 등. 유연하지만 정확성과 병렬화에 한계
4. **아티팩트 기반 빌드 시스템**: Bazel, Buck, Pants 등. 선언적 매니페스트로 정확성과 속도 모두 달성

**속도의 의미**: 개발자가 단일 명령어로 빌드를 실행하고 수 초 내에 결과를 받을 수 있어야 한다.

**정확성의 의미**: 어떤 개발자가 어떤 머신에서 빌드를 실행하든 동일한 결과를 얻어야 한다.

Google 엔지니어들이 가장 좋아하는 것 중 하나로 빌드 시스템을 꼽을 정도로, 빌드 시스템에 대한 투자가 크다.

## 예시

Google의 내부 빌드 시스템인 Blaze는 여러 전 Google 직원에 의해 재구현되었고, 2015년에 Bazel이라는 이름으로 오픈소스화되었다. Blaze/Bazel 덕분에 저수준 라이브러리 작성자가 전체 코드베이스에 걸쳐 수백만 개의 테스트와 바이너리로 변경 사항의 안전성을 검증하고, 수만 개의 소스 파일에 걸친 대규모 변경(LSC)도 안전하게 제출할 수 있다.

## 관련 개념

- [모노레포 (Monorepo)](/knowledge/software-engineering/quality-and-configuration/monorepo/)
- [밀폐 테스팅 (Hermetic Testing)](/knowledge/software-engineering/testing/hermetic-testing/)
