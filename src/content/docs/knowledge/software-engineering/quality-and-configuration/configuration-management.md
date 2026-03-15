---
title: "구성 관리 (Configuration Management)"
description: "구성 관리(CM)는 소프트웨어 시스템의 변경 사항을 체계적으로 관리하여, 시스템의 무결성과 추적 가능성을 보장하는 프로세스이다"
tags: ['Configuration Management', 'Version Control', 'Git', 'Release Management', 'Change Management']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/configuration-management
sidebar:
  order: 7
---

## 핵심 개념

구성 관리(CM)는 변화하는 소프트웨어 시스템을 관리하기 위한 정책, 프로세스, 도구의 집합으로, 버전 관리(version management), 시스템 빌드(system building), 변경 관리(change management), 릴리즈 관리(release management)의 네 가지 주요 활동으로 구성된다. 소프트웨어 시스템은 개발과 사용 중에 버그 수정, 요구사항 변경, 플랫폼 업데이트, 경쟁 대응 등으로 끊임없이 변경된다. 효과적인 CM 절차가 없으면 잘못된 버전을 수정하거나, 잘못된 버전을 고객에게 전달하거나, 소스 코드의 위치를 잊어버리는 등의 문제가 발생할 수 있다. 소프트웨어 개발은 개발 단계, 시스템 테스트 단계, 릴리즈 단계의 3단계로 진행되며, 대규모 시스템에서는 여러 버전이 동시에 서로 다른 단계에 있을 수 있다. Git은 현대적인 분산 버전 관리 시스템의 대표적인 예이다.

## 예시

Git을 사용한 구성 관리 워크플로우: 기능 브랜치 생성(git branch feature-login) → 개발 및 커밋(git commit) → 풀 리퀘스트 생성 → 코드 리뷰 → 메인 브랜치 병합(git merge) → 릴리즈 태그 생성(git tag v1.0).

## 관련 개념

- [소프트웨어 프로세스 (Software Process)](/knowledge/software-engineering/software-process/)
- [소프트웨어 진화 (Software Evolution)](/knowledge/software-engineering/software-evolution/)
- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/continuous-integration/)
- [버전 관리 (Version Management)](/knowledge/software-engineering/version-management/)
- [시스템 빌드 (System Building)](/knowledge/software-engineering/system-building/)
- [변경 관리 (Change Management)](/knowledge/software-engineering/change-management/)
- [릴리스 관리 (Release Management)](/knowledge/software-engineering/release-management/)
