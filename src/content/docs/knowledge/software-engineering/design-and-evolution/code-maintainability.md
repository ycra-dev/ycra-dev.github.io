---
title: "코드 유지보수성 (Code Maintainability)"
description: "소프트웨어를 수정·확장·디버깅하기 쉽게 만드는 코드 품질 속성으로, 미래의 개발자(또는 자신)가 이해하고 변경하는 데 드는 비용을 최소화한다."
tags: ["Software Engineering", "Code Quality", "Design", "Technical Debt"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/code-maintainability
sidebar:
  order: 23
---

## 핵심 개념

코드는 한 번 쓰이지만 수십 번 읽힌다. 유지보수성 높은 코드는 처음 작성 시 약간 더 많은 노력이 들지만, 장기적으로 버그 수정·기능 추가·리팩토링 시 드는 비용을 극적으로 줄인다. 가장 고쳐야 할 버그는 나중에 고치기 어려운 버그가 아니라, 지금 고치기 어려운 버그다.

## 동작 원리

유지보수성의 핵심 속성:

| 속성 | 의미 | 측정 지표 |
|------|------|----------|
| 가독성 | 코드 의도를 빠르게 파악 가능 | 코드 리뷰 시간 |
| 모듈성 | 변경이 한 곳에만 영향 | 결합도(coupling) |
| 테스트 가능성 | 자동화 테스트 작성 용이 | 테스트 커버리지 |
| 단순성 | 불필요한 복잡성 없음 | 순환 복잡도 |
| 일관성 | 코딩 스타일 통일 | 린터 경고 수 |

기술 부채(Technical Debt): 지름길을 택해 빠르게 개발하면 이자가 붙어 나중에 더 큰 비용을 치른다. 정기적인 리팩토링으로 부채를 갚아야 한다.

## 예시

- **낮은 유지보수성**: 500줄짜리 함수, 의미 없는 변수명 (`x`, `temp`), 코피-페이스트된 코드, 하드코딩된 마법의 숫자
- **높은 유지보수성**: 단일 책임 함수, 설명적 이름 (`calculateMonthlyRevenue`), 공유 유틸리티 함수, 명명된 상수
- 소나큐브(SonarQube)의 "Technical Debt" 시간 지표: "이 코드를 리팩토링하는 데 예상 40시간"
- "Boy Scout Rule" 적용: PR 시마다 건드린 파일을 발견 시보다 조금 더 좋게 두고 나오기

## 관련 개념

- [리팩토링](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [보이스카우트 규칙](/knowledge/software-engineering/design-and-evolution/boy-scout-rule/)
- [코드 가독성](/knowledge/software-engineering/design-and-evolution/code-readability/)
- [정적 코드 분석](/knowledge/software-engineering/quality-and-configuration/static-code-analysis/)
