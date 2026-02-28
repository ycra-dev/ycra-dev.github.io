---
title: "Dependency Management"
description: "우리가 직접 통제하지 않는 라이브러리, 패키지, 의존성 네트워크를 관리하는 것으로, 소프트웨어 엔지니어링에서 가장 도전적인 문제 중 하나"
tags: ["Software Engineering", "Dependencies"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/dependency-management
sidebar:
  order: 318
---

## 핵심 개념

의존성 관리(Dependency Management)는 우리가 직접 통제하지 않는 라이브러리, 패키지, 의존성 네트워크를 관리하는 것이다. 소스 컨트롤이 같은 조직 내에서의 코드 변경을 다루는 것과 달리, 의존성 관리는 조직 외부에서 발생하는 변경을 다룬다는 점에서 근본적으로 어렵다.

## 동작 원리

의존성 관리의 핵심 질문들:
- 외부 의존성의 버전 간 업데이트를 어떻게 하는가?
- 버전을 어떻게 기술하는가?
- 의존성에서 어떤 종류의 변경이 허용되는가?

의존성 관리의 4가지 이론적 접근법:
1. **Nothing Changes**: 아무것도 변경하지 않는 것 (비현실적)
2. **Semantic Versioning (SemVer)**: 버전 번호 체계로 호환성을 표현
3. **Bundled Distribution**: Linux 배포판처럼 호환 가능한 세트를 묶어 배포
4. **Live at Head**: 항상 모든 의존성의 최신 버전을 사용

Google은 내부적으로 대부분의 의존성이 내부 개발이므로 의존성 관리가 아닌 소스 컨트롤로 처리된다. 외부 프로젝트는 `third_party` 디렉토리를 통해 처리된다.

시간이 지남에 따라 모든 소프트웨어에 보안 버그가 발견되므로, 의존성의 일부는 장기적으로 반드시 업데이트해야 한다. 이것이 "Nothing Changes" 접근법이 비현실적인 이유다.

## 예시

Google의 `third_party` 정책 시나리오: Alice가 OSS 패키지를 다운로드하고 Bob과 함께 OWNERS로 등록. 시간이 지나면서 수천 개의 프로젝트가 간접 의존. Alice는 팀을 옮기고 Bob은 관리직으로 전환. 보안 취약점이 발견되면 아무도 업그레이드 경험이 없는 상태에서 긴급 업그레이드를 해야 하는 상황이 발생한다. 이것이 의존성 관리가 단순한 기술 문제가 아닌 조직 문제임을 보여준다.

## 관련 개념

- [Diamond Dependency Problem](/knowledge/software-engineering/quality-and-configuration/diamond-dependency-problem/)
- [Live at Head](/knowledge/software-engineering/quality-and-configuration/live-at-head/)
- [Minimum Version Selection](/knowledge/software-engineering/quality-and-configuration/minimum-version-selection/)
- [Bundled Distribution Model](/knowledge/software-engineering/quality-and-configuration/bundled-distribution-model/)
- [ABI vs API Compatibility](/knowledge/software-engineering/quality-and-configuration/abi-vs-api-compatibility/)
