---
title: "애자일 방법론 (Agile Methodology)"
description: "애자일은 반복적이고 점진적인 개발 방식을 강조하는 소프트웨어 개발 방법론의 총칭으로, 짧은 개발 주기로 소프트웨어를 반복 개발한다."
tags: ["Software Engineering", "Agile", "Scrum", "Methodology"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/agile-methodology
sidebar:
  order: 44
---

## 핵심 개념

오늘날 대부분의 소프트웨어 개발팀이 적어도 애자일을 한다고 주장한다. 하지만 "매일 서서 하는 회의(스탠드업)가 있다고 해서 스크럼을 하고 있는 것은 아니다."

두 가지 주요 방법론 비교:
- **폭포수(Waterfall)**: 순차적 접근. 요구사항 → 설계 → 구현 → 테스트 → 배포. 테스트가 프로젝트 맨 마지막에 수행된다.
- **애자일(Agile)**: 반복적 접근. 각 이터레이션(보통 2주)마다 테스트가 함께 진행된다.

애자일에서는 개발자와 테스터가 훨씬 더 긴밀하게 협력해야 하며, **품질은 전체 팀의 책임**이 된다.

## 동작 원리

애자일이 덜 선행적인 설계를 강조하더라도, 설계 자체는 여전히 필요하다. "임의로 나무를 못질하는 것으로는 집을 지을 수 없다."

```
Waterfall: 요구분석(3개월) -> 설계(2개월) -> 개발(6개월) -> 테스트(2개월) -> 배포
Agile:     [스프린트1: 설계+개발+테스트] -> [스프린트2] -> ... -> 지속적 배포
```

## 예시

일반적인 Scrum 기반 애자일 워크플로우:
1. **스프린트 계획(Sprint Planning)**: 2주 동안 수행할 작업 선정
2. **데일리 스탠드업(Daily Standup)**: 매일 15분 진행 상황 공유
3. **스프린트 개발**: 선정된 기능 구현 + 테스트
4. **스프린트 리뷰(Sprint Review)**: 완성된 기능 데모
5. **회고(Retrospective)**: 프로세스 개선점 논의

## 관련 개념

- [Agile Development](/knowledge/software-engineering/agile-methods/agile-development/)
- [Waterfall Methodology](/knowledge/software-engineering/agile-methods/waterfall-methodology/)
- [Scrum](/knowledge/software-engineering/agile-methods/scrum/)
