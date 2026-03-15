---
title: "게릿 (Gerrit)"
description: "Git 버전 관리 시스템과 긴밀하게 통합된 독립형 오픈소스 코드 리뷰 도구"
tags: ["Software Engineering", "Code Review", "Developer Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/gerrit
sidebar:
  order: 311
---

## 핵심 개념

Gerrit은 Git 버전 관리 시스템과 긴밀하게 통합된 독립형 오픈소스 코드 리뷰 도구이다. Google 내부에서는 monorepo에 호스팅할 수 없거나 원하지 않는 프로젝트(Chrome, Android 같은 오픈소스 프로젝트)에서 사용된다.

## 동작 원리

Critique가 Google 내부에서 가장 널리 사용되지만, Critique는 monorepo 및 내부 도구와의 긴밀한 상호 의존성으로 인해 외부에서 사용할 수 없다. 이 공백을 채우는 것이 Gerrit이다.

Gerrit의 주요 특성:
- Git의 웹 UI 제공: 코드 브라우징, 브랜치 머지, 커밋 체리픽, 코드 리뷰
- 세분화된 권한 모델: 저장소와 브랜치 단위 접근 제한
- 풍부한 플러그인 시스템: 커스텀 환경 통합
- 커밋 스태킹: 커밋을 쌓아 개별 리뷰 후 원자적으로 커밋 가능

Critique와 Gerrit 모두 각 커밋을 별도로 리뷰하는 동일한 모델을 사용한다. 그러나 Gerrit은 더 정교한 스코어링 시스템을 갖추고 있다. 예를 들어 리뷰어가 -2 점수를 부여하여 변경을 거부할 수 있는데, 이는 Critique의 "항상 긍정적인 LGTM/Approval" 모델과 대조된다.

## 예시

Google의 Chrome 팀과 Android 팀은 오픈소스 특성상 Gerrit을 사용한다. Gerrit의 웹사이트는 https://www.gerritcodereview.com에서 확인할 수 있다.

Gerrit은 오픈소스로서 더 다양한 변형과 사용 사례를 지원하며, 구성 가능성이 높아 조직별 요구사항에 맞게 커스터마이징할 수 있다.

## 관련 개념

- [크리틱 (Critique)](/knowledge/software-engineering/quality-and-configuration/critique/)
- [LGTM과 승인 (LGTM and Approval)](/knowledge/software-engineering/quality-and-configuration/lgtm-and-approval/)
