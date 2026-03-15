---
title: "바젤 (Bazel)"
description: "Google 내부 빌드 시스템 Blaze의 오픈소스 구현으로, 대규모 빌드에서 빠르고 정확한 빌드를 보장하는 아티팩트 기반 빌드 시스템"
tags: ["Software Engineering", "Build Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/bazel
sidebar:
  order: 302
---

## 핵심 개념

Bazel은 Google 내부 빌드 시스템 Blaze의 오픈소스 구현으로, 2015년에 공개되었다. 빠르고 정확한 빌드를 대규모에서 보장하는 아티팩트 기반 빌드 시스템이다. Facebook의 Buck, Twitter의 Pants도 Blaze에서 영감을 받아 만들어졌다.

## 동작 원리

Bazel/Blaze의 핵심 특성:

- **선언적 BUILD 파일**: Starlark(Python의 제한된 방언)로 작성된 빌드 규칙이 산출물과 의존성을 선언. Starlark는 재귀가 없고 파일 I/O가 금지되어 빌드 파일이 항상 결정적(deterministic)이 되도록 보장
- **허메틱(hermetic) 빌드**: 빌드는 선언된 입력에만 의존하며 외부 환경에 영향받지 않음. 빌드 시스템이 도구체인(컴파일러 포함)을 직접 관리
- **외부 의존성 관리**: `WORKSPACE` 파일에 외부 의존성과 정확한 버전(해시 포함)을 선언
- **확장 가능한 규칙**: 새로운 언어나 도구에 대한 빌드 규칙을 Starlark로 작성 가능

모든 빌드 규칙은 소스, 의존성(deps), 도구(tools)의 세 가지 입력을 가진다. 이 입력이 변경되지 않으면 출력이 동일하다는 보장 아래, 빌드 결과를 캐싱하고 변경되지 않은 부분은 재빌드를 건너뛴다.

Google 내부에서 Blaze는 엔지니어가 가장 좋아하는 도구 중 하나로, 수만 명의 엔지니어가 매일 사용하여 수십억 줄의 코드를 빌드한다.

## 예시

Starlark는 Python과 유사하지만 재귀가 없고 파일 I/O가 금지되어 있다. 이 제약 덕분에 빌드 파일을 정적으로 분석할 수 있고 결과가 항상 예측 가능하다.

```python
# BUILD 파일 예시
java_library(
    name = "mylib",
    srcs = glob(["*.java"]),
    deps = ["//java/com/example/common"],
)
```

외부 의존성은 `WORKSPACE` 파일에 선언하며, 해시(digest)를 함께 명시하여 정확한 버전을 보장한다.

## 관련 개념

- [아티팩트 기반 빌드 시스템 (Artifact-Based Build Systems)](/knowledge/software-engineering/quality-and-configuration/artifact-based-build-systems/)
- [밀폐 빌드 (Hermetic Builds)](/knowledge/software-engineering/quality-and-configuration/hermetic-builds/)
- [원격 실행과 캐싱 (Remote Execution and Caching)](/knowledge/software-engineering/quality-and-configuration/remote-execution-and-caching/)
- [빌드 의존성 관리 (Build Dependency Management)](/knowledge/software-engineering/quality-and-configuration/build-dependency-management/)
