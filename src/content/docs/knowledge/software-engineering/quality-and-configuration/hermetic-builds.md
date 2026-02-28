---
title: "Hermetic Builds"
description: "선언된 입력에만 의존하고 외부 환경에 영향받지 않아 어떤 머신에서든 동일한 결과를 재현할 수 있는 빌드"
tags: ["Software Engineering", "Build Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/hermetic-builds
sidebar:
  order: 305
---

## 핵심 개념

허메틱(hermetic) 빌드는 선언된 입력에만 의존하고 외부 환경(네트워크, 로컬 파일시스템 등)에 영향받지 않아 어떤 머신에서든 동일한 결과를 재현할 수 있는 빌드를 의미한다. "내 머신에서는 빌드되는데..." 문제를 원천적으로 방지한다.

## 동작 원리

허메틱 빌드의 핵심 원칙:
- 빌드에 필요한 모든 도구(컴파일러 포함)가 빌드 시스템에 의해 관리됨
- 개발자 머신에 설치된 도구 버전에 의존하지 않음
- 네트워크 접근이 빌드 과정에서 차단됨
- 타임스탬프 등 비결정적 입력이 제거됨

이 속성이 보장되면 다음이 가능해진다:
1. **캐싱 안전성**: 입력 해시만으로 빌드 결과를 안전하게 재사용
2. **원격 실행**: 어떤 워커 머신에서든 동일한 결과를 보장하므로 분산 빌드 가능
3. **재현성**: 과거의 어떤 빌드도 정확히 재현 가능하여 디버깅과 감사에 유용
4. **증분 빌드의 정확성**: 변경된 입력만 재빌드하면 되므로 빠르고 정확한 증분 빌드

태스크 기반 빌드 시스템에서는 태스크가 임의의 코드를 실행할 수 있으므로 허메틱 빌드를 보장하기 어렵다. 아티팩트 기반 시스템에서는 빌드 규칙의 입출력이 명시적이므로 시스템 차원에서 허메틱을 강제할 수 있다.

## 예시

Bazel에서는 `--sandbox_block_path` 플래그로 빌드 중 특정 경로 접근을 차단하고, 각 빌드 액션은 샌드박스된 환경에서 실행된다. 도구체인(컴파일러, 링커 등)도 `WORKSPACE` 파일에서 선언된 특정 버전이 다운로드되어 사용된다.

예를 들어, 빌드 중에 `~/local_lib`에 설치된 라이브러리를 우연히 참조하더라도 Bazel의 샌드박스가 이를 차단하여 빌드 실패로 명시적으로 알려준다.

## 관련 개념

- [Bazel](/knowledge/software-engineering/quality-and-configuration/bazel/)
- [Artifact-Based Build Systems](/knowledge/software-engineering/quality-and-configuration/artifact-based-build-systems/)
- [Remote Execution and Caching](/knowledge/software-engineering/quality-and-configuration/remote-execution-and-caching/)
- [Hermetic Testing](/knowledge/software-engineering/testing/hermetic-testing/)
