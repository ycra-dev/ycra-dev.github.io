---
title: "아티팩트 기반 빌드 시스템 (Artifact-Based Build Systems)"
description: "산출물과 의존성을 선언적으로 기술하고 빌드 방법은 시스템이 결정하는 빌드 시스템"
tags: ["Software Engineering", "Build Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/artifact-based-build-systems
sidebar:
  order: 301
---

## 핵심 개념

아티팩트 기반 빌드 시스템은 빌드 파일이 "무엇을(what)" 만들 것인지를 선언적으로 기술하고, "어떻게(how)" 만들지는 시스템이 결정하는 빌드 시스템이다. Bazel, Buck, Pants가 대표적이다. 빌드 파일은 튜링 완전한 스크립트가 아닌 선언적 매니페스트다.

## 동작 원리

아티팩트 기반 빌드 시스템에서 엔지니어는 빌드할 아티팩트, 의존성, 제한된 옵션만 기술한다. 빌드 시스템이 컴파일 단계의 구성, 실행, 스케줄링을 모두 담당한다.

이 접근법은 함수형 프로그래밍과 유사하다. 빌드를 순수 함수처럼 취급한다: 동일한 입력(소스 + 의존성)은 항상 동일한 출력을 생성해야 한다. 이를 통해 입력이 변경되지 않았다면 이전 빌드 결과를 안전하게 재사용할 수 있다.

주요 장점:
- **병렬화**: 빌드 단계 간 충돌이 없음을 보장하므로 안전하게 병렬 실행 가능
- **증분 빌드의 정확성**: 각 빌드 규칙의 입력이 변경되었는지 정확히 판단 가능
- **재현성**: 빌드 환경의 차이에 관계없이 동일한 결과 보장

단점은 유연성 제한이다. 빌드 파일에서 임의의 스크립트를 실행할 수 없으므로 처음에는 불편하게 느껴질 수 있다. 그러나 이 제약이 시스템 차원의 강력한 보장을 가능하게 한다.

## 예시

Bazel의 `BUILD` 파일 예시:
```python
java_binary(
    name = "MyBinary",
    srcs = ["MyBinary.java"],
    deps = [
        ":mylib",
    ],
)

java_library(
    name = "mylib",
    srcs = ["MyLibrary.java", "MyHelper.java"],
    visibility = ["//java/com/example/myproduct:__subpackages__"],
    deps = [
        "//java/com/example/common",
        "//java/com/example/myproduct/otherlib",
    ],
)
```

엔지니어는 `blaze build :MyBinary` 명령만 실행하면 시스템이 나머지를 처리한다.

## 관련 개념

- [태스크 기반 빌드 시스템 (Task-Based Build Systems)](/knowledge/software-engineering/quality-and-configuration/task-based-build-systems/)
- [바젤 (Bazel)](/knowledge/software-engineering/quality-and-configuration/bazel/)
- [밀폐 빌드 (Hermetic Builds)](/knowledge/software-engineering/quality-and-configuration/hermetic-builds/)
- [원격 실행과 캐싱 (Remote Execution and Caching)](/knowledge/software-engineering/quality-and-configuration/remote-execution-and-caching/)
