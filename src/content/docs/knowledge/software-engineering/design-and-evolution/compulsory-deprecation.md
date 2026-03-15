---
title: "강제적 디프리케이션 (Compulsory Deprecation)"
description: "구식 시스템의 제거 마감일이 명시되어 있으며, 해당 날짜 이후에도 의존하는 사용자의 시스템이 더 이상 작동하지 않게 되는 강제적 deprecation 방식"
tags: ["Software Engineering", "Design and Evolution"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/compulsory-deprecation
sidebar:
  order: 52
---

## 핵심 개념

Compulsory deprecation이 효과적으로 확장되려면, 마이그레이션 전문 지식을 하나의 전문 팀에 집중시켜야 한다. 이 팀은 보통 구 시스템을 제거하는 책임을 맡은 팀이며, 다른 팀들의 마이그레이션을 돕는 인센티브와 경험, 도구를 갖추고 있다.

## 동작 원리

**집행 메커니즘(enforcement mechanism)이 필수적이다**:
- 비준수 사용자를 충분한 경고 후에 "깨뜨릴 수 있는(break)" 권한이 deprecation 팀에 부여되어야 한다
- 이 권한이 없으면 고객 팀은 기능 개발을 우선시하며 deprecation 작업을 무시하게 된다

**전담 인력이 반드시 필요하다**:
- 전담 인력 없는 강제 deprecation은 "unfunded mandate"로 인식되어 마찰을 유발한다
- Google은 compulsory deprecation에 반드시 전문 팀이 완료까지 전담할 것을 강력히 권장한다

**점진적 중단 전략**:
- 시스템 제거 전 수개월~수주에 걸쳐 점진적으로 기간이 늘어나는 계획된 중단(planned outages)을 실시한다
- 알려지지 않은 의존성을 발견하는 데 효과적이다

## 예시

Google에서는 구현 전용 심볼의 이름을 변경하여 예상치 못한 의존성을 파악하기도 한다. 이것은 Google의 DiRT(Disaster Recovery Testing) 훈련과 유사하며, 알려지지 않은 의존성을 발견하는 데 효과적이다.

## 관련 개념

- [디프리케이션 (Deprecation)](/knowledge/software-engineering/design-and-evolution/deprecation/)
- [권고적 디프리케이션 (Advisory Deprecation)](/knowledge/software-engineering/design-and-evolution/advisory-deprecation/)
- [디프리케이션 프로세스 소유자 (Deprecation Process Owners)](/knowledge/software-engineering/design-and-evolution/deprecation-process-owners/)
- [퇴보 방지 (Backsliding Prevention)](/knowledge/software-engineering/design-and-evolution/backsliding-prevention/)
