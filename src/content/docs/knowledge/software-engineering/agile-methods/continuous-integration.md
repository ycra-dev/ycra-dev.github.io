---
title: "지속적 통합 (Continuous Integration)"
description: "지속적 통합(CI)은 개발자가 작성한 코드를 자주(하루에 여러 번) 공유 저장소에 통합하고, 자동화된 빌드 및 테스트를 통해 통합 문제를 조기에 발견하는 소프트웨어 개발 실천법이다"
tags: ['Continuous Integration', 'Ci', 'Automated Build', 'Automated Testing', 'DevOps']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/continuous-integration
sidebar:
  order: 6
---

## 핵심 개념

CI는 XP의 핵심 실천법 중 하나로, 개발자가 작업을 완료할 때마다 코드를 메인라인에 통합한다. 통합 시 자동화된 빌드와 전체 테스트 스위트가 실행되며, 테스트 실패 시 새로운 코드를 커밋한 개발자가 즉시 문제를 해결한다. 이를 통해 대규모 통합 문제를 방지하고, 항상 동작하는 시스템을 유지할 수 있다. CI는 자동화된 테스트 프레임워크와 빌드 도구(Jenkins, GitHub Actions 등)의 지원이 필수적이다.

구성 관리 관점에서, CI의 구체적 프로세스는 다음과 같다: (1) VC 시스템에서 메인라인 추출, (2) 시스템 빌드 및 자동 테스트, (3) 컴포넌트 변경 수행, (4) 개인 작업 공간에서 빌드/테스트, (5) 빌드 서버에 체크인, (6) 빌드 서버에서 빌드/테스트, (7) 테스트 통과 시 메인라인의 새 베이스라인으로 커밋. "빌드를 깨지 마라(never break the build)"는 CI의 중요한 원칙으로, 개발자에게 충분한 단위 테스트를 수행하도록 심리적 압박을 준다. 시스템이 매우 크거나 개발/대상 플랫폼이 다른 경우에는 일일 빌드(daily build)를 사용한다.

## 예시

CI 워크플로우: 개발자가 기능 구현 → git commit & push → CI 서버(Jenkins)가 자동으로 빌드 시작 → 단위 테스트, 통합 테스트 자동 실행 → 모든 테스트 통과 시 "Green" 상태 → 테스트 실패 시 개발자에게 알림 → 즉시 수정.

## 관련 개념

- [익스트림 프로그래밍 (Extreme Programming)](/knowledge/software-engineering/extreme-programming/)
- [테스트 주도 개발 (Test-driven Development)](/knowledge/software-engineering/test-driven-development/)
- [애자일 소프트웨어 개발 (Agile Software Development)](/knowledge/software-engineering/agile-software-development/)
- [시스템 빌드 (System Building)](/knowledge/software-engineering/system-building/)
- [구성 관리 (Configuration Management)](/knowledge/software-engineering/configuration-management/)
- [버전 관리 (Version Management)](/knowledge/software-engineering/version-management/)
