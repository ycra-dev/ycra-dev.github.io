---
title: "Task-Based Build Systems"
description: "빌드 단계를 스크립트 형태의 태스크로 정의하고 의존성을 관리하는 빌드 시스템"
tags: ["Software Engineering", "Build Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/task-based-build-systems
sidebar:
  order: 300
---

## 핵심 개념

태스크 기반 빌드 시스템은 엔지니어가 빌드 단계를 스크립트 형태의 태스크로 직접 정의하고, 태스크 간 의존성을 관리하는 빌드 시스템이다. Ant, Maven, Gradle이 대표적이다. 엔지니어가 "어떻게(how)" 빌드할지를 직접 지시한다.

## 동작 원리

태스크 기반 빌드 시스템은 엔지니어가 빌드 스크립트를 원칙적이고 모듈화된 방식으로 작성하도록 돕지만, 심각한 구조적 단점이 있다.

1. **병렬화의 어려움**: 태스크가 튜링 완전한 스크립트 언어로 작성되므로 시스템이 태스크가 무엇을 하는지 분석할 수 없다. 두 태스크가 같은 리소스를 동시에 쓸 수 있으므로 안전하게 병렬화하기 어렵다.

2. **증분 빌드의 부정확성**: 태스크가 이전 빌드 결과를 재사용할 수 있는지 판단하기 어렵다. 정확한 결과를 보장하려면 출력 디렉토리를 정리하고 처음부터 전체를 재빌드해야 한다.

3. **유지보수 비용**: 빌드 스크립트 자체가 유지보수가 필요한 코드가 되며, 복잡해질수록 디버깅이 어려워진다.

핵심 문제는 시스템이 태스크에 너무 많은 권한을 부여한다는 것이다. 엔지니어에게 빌드 과정의 세부 단계를 임의로 정의하게 하면, 시스템이 빌드의 정확성이나 성능을 보장할 수 있는 여지가 줄어든다.

## 예시

Ant 빌드 파일에서는 `javac` 태스크, `jar` 태스크 등을 XML로 정의하고 의존성을 설정한다. 결국 실행되는 것은 셸 스크립트와 유사하지만, 모듈화와 의존성 관리의 이점이 있다. 그러나 개발자가 `clean` 없이 빌드를 실행하면 이전 빌드의 stale 결과가 포함될 수 있어 "항상 clean build를 하라"는 악명 높은 조언이 생긴다.

## 관련 개념

- [Artifact-Based Build Systems](/knowledge/software-engineering/quality-and-configuration/artifact-based-build-systems/)
- [Bazel](/knowledge/software-engineering/quality-and-configuration/bazel/)
- [Hermetic Builds](/knowledge/software-engineering/quality-and-configuration/hermetic-builds/)
