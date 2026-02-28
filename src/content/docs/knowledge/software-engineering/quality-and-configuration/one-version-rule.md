---
title: "One Version Rule"
description: "저장소의 모든 의존성에 대해 선택할 수 있는 버전이 하나만 존재해야 한다는 Google의 버전 관리 정책"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/one-version-rule
sidebar:
  order: 201
---

## 핵심 개념

One Version Rule은 "저장소의 모든 의존성에 대해 선택할 수 있는 버전이 하나만 존재해야 한다"는 Google의 버전 관리 정책이다. 개인 개발자에게 선택의 부재는 임의적 장애물처럼 느껴질 수 있지만, 조직 차원에서는 효율적 확장의 핵심 요소다.

## 동작 원리

One Version Rule의 핵심은 "개발자가 어떤 컴포넌트의 어떤 버전에 의존할지 선택의 여지가 없어야 한다"는 것이다:

- 서드파티 패키지는 저장소에 하나의 버전만 체크인될 수 있다
- 내부 패키지는 리패키징/리네이밍 없이 포크할 수 없다
- 같은 프로그램에 원본과 포크를 함께 링크하는 것이 기술적으로 안전해야 한다

동일 코드베이스에 복수 버전이 존재하면 "다이아몬드 의존성" 문제가 발생한다:
- 최선의 경우 빌드가 실패한다
- 최악의 경우 동일 라이브러리의 서로 다른 두 버전이 링크되어 이해하기 어려운 런타임 버그가 발생한다
- Java의 "shading" 같은 기술적 우회도 타입(vocabulary type)에 대해서는 작동하지 않는다

## 예시

한 팀이 공통 인프라 코드(Abseil이나 Guava)의 버그를 발견하고, 원래 위치에서 수정하는 대신 포크하여 버그를 우회한 시나리오를 생각해보자. 라이브러리나 심볼 이름을 변경하지 않고 포크하면, 코드베이스에 "원본"과 "포크" 사이의 분할이 생긴다. 이 두 파티션의 전이적 의존성 집합이 만나면 빌드가 깨지며, "새 의존성 추가"라는 단순한 작업도 전체 코드베이스의 테스트를 실행해야 하는 비용을 초래한다.

## 관련 개념

- [Source of Truth](/knowledge/software-engineering/quality-and-configuration/source-of-truth/)
- [Monorepo](/knowledge/software-engineering/quality-and-configuration/monorepo/)
- [Piper](/knowledge/software-engineering/quality-and-configuration/piper/)
