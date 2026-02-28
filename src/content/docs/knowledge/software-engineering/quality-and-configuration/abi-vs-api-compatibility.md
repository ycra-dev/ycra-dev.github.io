---
title: "ABI vs API Compatibility"
description: "API 호환성은 소스 코드 레벨의 인터페이스 호환성을, ABI 호환성은 바이너리 아티팩트 레벨의 호환성을 의미하며 의존성 관리에서 중요한 고려사항"
tags: ["Software Engineering", "Dependencies", "Compatibility"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/abi-vs-api-compatibility
sidebar:
  order: 322
---

## 핵심 개념

API 호환성은 소스 코드 레벨에서의 인터페이스 호환성을 의미하고, ABI(Application Binary Interface) 호환성은 바이너리 아티팩트 레벨에서의 호환성을 의미한다. 각 프로젝트는 서로 다른 호환성 약속을 하며, 이는 의존성으로 선택할 때 중요한 고려사항이다.

## 동작 원리

호환성 약속은 소프트웨어 엔지니어링 문제이지 프로그래밍 문제가 아니다. 시간에 따른 유지보수가 관련될 때 의존성 관리가 어려워진다. "작동하게 만들었다"와 "지원되는 방식으로 작동한다"의 차이를 구분하는 것이 중요하다.

의존성 임포트 시 고려할 질문들:
- 프로젝트에 실행 가능한 테스트가 있는가?
- 누가 제공하는가?
- 어떤 호환성을 지향하는가?
- 얼마나 오래 의존할 것인가?
- 얼마나 자주 호환성을 깨는 변경을 하는가?

## 예시

언어/프로젝트별 호환성 약속 비교:

| 프로젝트 | API 호환 | ABI 호환 |
|---------|---------|---------|
| C++ 표준 라이브러리 | 거의 무한한 하위 호환 | O (gcc/Linux에서 약 10년) |
| Java | O | O (JAR 파일 하위 호환) |
| Go | O (소스 호환) | X (다른 버전으로 빌드한 라이브러리 링크 불가) |
| Abseil (Google) | O + 자동 리팩토링 도구 | X |
| Boost | X (버전 간 호환 약속 없음) | X |

## 관련 개념

- [Dependency Management](/knowledge/software-engineering/quality-and-configuration/dependency-management/)
- [Live at Head](/knowledge/software-engineering/quality-and-configuration/live-at-head/)
- [Bundled Distribution Model](/knowledge/software-engineering/quality-and-configuration/bundled-distribution-model/)
