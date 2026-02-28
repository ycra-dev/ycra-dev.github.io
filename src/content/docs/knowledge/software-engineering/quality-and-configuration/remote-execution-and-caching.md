---
title: "Remote Execution and Caching"
description: "빌드 단계를 분산 워커에서 실행하고 산출물을 공유 캐시에 저장하여 재사용하는 기술"
tags: ["Software Engineering", "Build Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/remote-execution-and-caching
sidebar:
  order: 303
---

## 핵심 개념

원격 실행(Remote Execution)은 빌드 단계를 중앙 서버의 분산 워커들에서 실행하는 것이고, 원격 캐싱(Remote Caching)은 빌드 산출물을 공유 캐시에 저장하여 다른 엔지니어나 CI 시스템이 재사용하는 기술이다. 두 기술 모두 허메틱(hermetic) 빌드가 전제되어야 한다.

## 동작 원리

아티팩트 기반 빌드 시스템이 원격 실행과 캐싱을 가능하게 하는 핵심 이유는 빌드의 각 단계가 "순수 함수"처럼 동작하기 때문이다. 입력이 동일하면 출력도 동일하므로 다음이 가능해진다.

**원격 캐싱**: 빌드 액션의 입력 해시를 키로 사용하여 결과를 저장한다. 다른 엔지니어가 동일한 입력으로 빌드를 실행하면 이미 캐시된 결과를 다운로드한다. 개별 머신의 성능에 관계없이 빠른 빌드가 가능하다.

**원격 실행**: 로컬 워크스테이션 대신 클라우드의 분산 워커 풀에서 빌드 단계를 실행한다. 수천 개의 코어를 동시에 활용할 수 있어 대규모 빌드도 빠르게 완료된다. 원격 실행이 제대로 작동하려면 빌드가 허메틱해야 한다 — 선언되지 않은 로컬 환경에 의존하면 안 된다.

Google의 분산 빌드 시스템은 코드 변경 사항을 수 분 내에 빌드하고 테스트할 수 있게 하며, 이는 monorepo와 trunk-based development의 핵심 인에이블러(enabler)다.

## 예시

Google에서 엔지니어가 `blaze build`를 실행하면, 빌드 시스템이 액션 그래프의 각 단계를 분산 워커로 전송한다. 동일한 라이브러리를 다른 엔지니어가 이미 빌드한 적이 있다면 그 결과가 캐시에서 반환된다. 이를 통해 수백만 줄의 코드 변경도 수 분 내에 빌드/테스트가 가능하며, CI 파이프라인에서도 동일한 캐시를 공유하여 프리서밋 테스트가 빠르게 실행된다.

## 관련 개념

- [Bazel](/knowledge/software-engineering/quality-and-configuration/bazel/)
- [Artifact-Based Build Systems](/knowledge/software-engineering/quality-and-configuration/artifact-based-build-systems/)
- [Hermetic Builds](/knowledge/software-engineering/quality-and-configuration/hermetic-builds/)
