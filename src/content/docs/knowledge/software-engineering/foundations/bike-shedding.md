---
title: "Bike-Shedding"
description: "사소한 문제에 대해 불균형적으로 많은 시간을 소비하는 현상"
tags: ["Software Engineering", "Communication", "Team Dynamics"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/bike-shedding
sidebar:
  order: 24
---

## 핵심 개념

바이크셰딩(Bike-Shedding)은 사소한 문제에 대해 불균형적으로 많은 시간을 소비하는 현상이다. C. Northcote Parkinson의 우화에서 유래했다. 위원회가 원자력 발전소 설계는 수분 만에 승인하면서 옆 자전거 보관소 자재는 45분 토론한다.

## 동작 원리

핵심 원인: 복잡한 주제는 이해하기 어려워 발언을 꺼리지만, 단순한 주제는 누구나 의견을 낼 수 있다. 기술 업무에서 자주 발생한다 — 코드 포매팅, 변수명 등에 과도한 논쟁이 대표적이다.

대처법:
- 자동화할 수 있는 것은 자동화 (린터, 포매터)
- 논쟁이 길어지면 의식적으로 "이것이 정말 중요한 논의인가?" 확인
- 의사결정 시간 제한 설정
- 코딩 표준을 미리 정하여 자동화 도구에 위임

## 예시

```
PR 리뷰에서의 바이크셰딩:

아키텍처 결정 (중요한 것):
  → "LGTM" (수분 내 승인)

변수 이름 camelCase vs snake_case (사소한 것):
  → 20개 코멘트, 30분 토론

해결: 린터를 PR 체크에 추가하여 자동으로 강제
```

시간 제한 의사결정:
```
"5분 안에 결정이 안 나면 이 논의는 중요하지 않다.
 린터/포매터에 위임하거나 리더가 결정한다."
```

## 관련 개념

- [Coding Standard](/knowledge/software-engineering/foundations/coding-standard/)
- [Code Review](/knowledge/software-engineering/quality-and-configuration/code-review/)
