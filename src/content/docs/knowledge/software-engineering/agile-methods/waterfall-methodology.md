---
title: "폭포수 방법론 (Waterfall Methodology)"
description: "폭포수 방법론은 소프트웨어 개발을 요구사항 분석, 설계, 구현, 테스트, 배포, 유지보수의 순차적 단계로 진행하는 전통적인 개발 방법론이다."
tags: ["Software Engineering", "Waterfall", "SDLC", "Methodology"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/waterfall-methodology
sidebar:
  order: 45
---

## 핵심 개념

폭포수 방법론은 SDLC(Software Development Life Cycle)를 순차적으로 따르는 방식이다. 각 단계는 이전 단계가 완료된 후에만 시작되며, 앞으로만 진행하고 뒤로 돌아가지 않는다.

SDLC의 각 단계:
1. **요구사항 분석**: 소프트웨어가 무엇을 해야 하는지 수집
2. **소프트웨어 설계**: 아키텍처와 상세 설계 (Big Upfront Design)
3. **구현**: 실제 코딩
4. **테스트**: QA가 테스트 계획에 따라 검증
5. **배포**: 프로덕션에 릴리즈
6. **유지보수**: 버그 수정과 기능 추가

## 동작 원리

폭포수의 가장 큰 문제는 요구사항이 변한다는 현실을 반영하지 못한다는 점이다. 모든 요구사항을 사전에 수집하려 해도 프로젝트 후반에 변경이 발생하면 이미 완료된 설계와 구현을 폐기하거나 변경 요청을 거부해야 한다.

```
폭포수 흐름:
요구사항 분석 → 소프트웨어 설계 → 구현 → 테스트 → 배포 → 유지보수
     ↓              ↓            ↓       ↓       ↓         ↓
  (한 방향으로만 진행, 되돌아가지 않음)
```

## 예시

```
실제 문제:
- 6개월 후 고객: "아, 요구사항이 바뀌었습니다"
- 이미 설계/구현 완료 → 대규모 재작업 또는 잘못된 제품 전달
```

폭포수가 여전히 유효한 경우: 요구사항이 매우 명확하고 변경 가능성이 낮은 프로젝트 (예: 정부 계약, 항공우주 소프트웨어)

## 관련 개념

- [애자일 개발 (Agile Development)](/knowledge/software-engineering/agile-methods/agile-development/)
- [애자일 방법론 (Agile Methodology)](/knowledge/software-engineering/agile-methods/agile-methodology/)
- [스크럼 (Scrum)](/knowledge/software-engineering/agile-methods/scrum/)
