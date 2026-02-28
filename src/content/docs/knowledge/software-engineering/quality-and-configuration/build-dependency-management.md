---
title: "Build Dependency Management"
description: "빌드 시스템에서 내부 모듈 간 의존성과 외부 서드파티 라이브러리에 대한 의존성을 선언하고 해결하는 프로세스"
tags: ["Software Engineering", "Build Systems", "Dependencies"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/build-dependency-management
sidebar:
  order: 304
---

## 핵심 개념

빌드 의존성 관리는 빌드 시스템에서 내부 모듈 간의 의존성과 외부 서드파티 라이브러리에 대한 의존성을 선언하고 해결하는 프로세스이다. 빌드 시스템에서 의존성은 모든 것의 핵심이다.

## 동작 원리

**내부 의존성**: 같은 소스 저장소 내의 모듈 간 의존성이다. Bazel에서는 `BUILD` 파일의 `deps` 필드로 명시한다. 빌드 시스템은 전이적 의존성(transitive dependencies)을 자동으로 해결하지만, 내부 의존성의 경우 `deps`에 명시된 직접 의존성만으로 빌드한다. 이는 불필요한 의존성이 숨겨지는 것을 방지한다.

**외부 의존성**: 저장소 외부의 아티팩트이다. Bazel에서는 `WORKSPACE` 파일에서 다운로드 위치와 해시를 명시한다. 주요 과제는 다이아몬드 의존성 문제다: A가 B와 C에 의존하고, B와 C가 D의 서로 다른 버전에 의존하는 경우 충돌이 발생한다.

**가시성(Visibility)**: 각 빌드 타겟은 어떤 다른 타겟이 자신에 의존할 수 있는지를 visibility 규칙으로 제어한다. 이를 통해 공개 API와 내부 구현을 분리하고, deprecated 시스템에 대한 새로운 의존성 추가를 방지할 수 있다.

## 예시

Bazel의 `BUILD` 파일에서:
- `visibility = ["//visibility:public"]`: 누구나 의존 가능
- `visibility = ["//java/com/example/myproduct:__subpackages__"]`: 특정 패키지와 하위 패키지만 의존 가능

이 visibility 규칙은 deprecated 라이브러리의 backsliding prevention에도 활용된다. deprecated 라이브러리의 visibility를 기존 사용자만으로 제한하면, 새로운 의존성이 추가되지 않도록 컴파일 타임에 강제할 수 있다.

## 관련 개념

- [Bazel](/knowledge/software-engineering/quality-and-configuration/bazel/)
- [Dependency Management](/knowledge/software-engineering/quality-and-configuration/dependency-management/)
- [Diamond Dependency Problem](/knowledge/software-engineering/quality-and-configuration/diamond-dependency-problem/)
