---
title: "시스템 빌드 (System Building)"
description: "시스템 빌드는 프로그램 컴포넌트, 외부 라이브러리, 구성 파일 등을 어셈블하고 컴파일하여 실행 가능한 시스템을 생성하는 프로세스이다"
tags: ['System Building', 'Build Automation', 'Compilation', 'Continuous Integration', 'Build Tools']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/system-building
sidebar:
  order: 9
---

## 핵심 개념

시스템 빌드 도구는 빌드 스크립트 생성, 버전 관리 시스템 통합, 최소 재컴파일(minimal recompilation), 실행 파일 생성, 테스트 자동화, 보고, 문서 생성 등의 기능을 제공해야 한다. 빌드에는 개발 시스템, 빌드 서버, 대상 환경의 3가지 플랫폼이 관여할 수 있다. 에자일에서는 지속적 통합(continuous integration)을 통해 소스 코드 변경 후 메인라인을 자주 재빌드한다. 지속적 통합의 단계는 메인라인 추출, 빌드 및 테스트, 변경 수행, 개인 작업 공간에서 빌드/테스트, 빌드 서버에 체크인, 빌드 서버에서 빌드/테스트, 성공 시 커밋이다. 대규모 시스템이나 개발/대상 플랫폼이 다른 경우 일일 빌드(daily build) 시스템을 사용한다.

## 예시

소스 코드와 오브젝트 코드의 연결에는 두 가지 서명 방식이 사용된다. (1) 수정 타임스탬프: Comp.java의 타임스탬프가 17:03:05이고 Comp.class가 16:58:43이면 소스가 더 최근이므로 재컴파일 필요. (2) 소스 코드 체크섬: 소스 텍스트로부터 고유 번호를 계산하여, 같은 체크섬의 오브젝트 코드가 없으면 재컴파일 필요. Jenkins 같은 도구가 지속적 통합을 지원한다.

## 관련 개념

- [버전 관리 (Version Management)](/knowledge/software-engineering/version-management/)
- [변경 관리 (Change Management)](/knowledge/software-engineering/change-management/)
- [릴리스 관리 (Release Management)](/knowledge/software-engineering/release-management/)
