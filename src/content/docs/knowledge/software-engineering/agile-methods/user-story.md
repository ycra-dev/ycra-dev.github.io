---
title: "User Story"
description: "사용자 관점에서 요구사항을 서술하는 애자일의 작업 단위"
tags: ["Software Engineering", "Agile", "Requirements", "User Story"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/user-story
sidebar:
  order: 40
---

## 핵심 개념

사용자 스토리(User Story)는 "As a <사용자>, I want to <기능> so that <이유>" 형식으로, 사용자 관점에서 요구사항을 서술하는 애자일의 작업 단위이다. 기술적 구현이 아닌 사용자 가치에 초점을 맞춘다. 전통적인 수백 페이지 요구사항 명세서(SRS)의 대안이다.

## 동작 원리

좋은 사용자 스토리의 조건 (INVEST):
- **Independent**: 다른 스토리에 의존하지 않고 독립적으로 구현 가능
- **Negotiable**: 세부 구현은 대화를 통해 조율 가능
- **Valuable**: 사용자에게 실질적 가치를 제공
- **Estimable**: 크기를 추정할 수 있을 만큼 명확
- **Small**: 한 스프린트 내에 완료할 수 있을 만큼 작음
- **Testable**: 완료 여부를 확인할 수 있는 기준이 존재

**수용 기준(Acceptance Criteria)**: Given-When-Then 형식으로 작성하면 테스트 가능하고 모호하지 않다.

**에픽(Epic)**: 한 스프린트에 들어가기엔 너무 큰 스토리. 여러 개의 작은 스토리로 분해해야 한다.

## 예시

```
[좋은 예]
"As a 온라인 쇼핑 고객,
 I want to 장바구니에 담긴 상품의 수량을 변경할 수 있기를 원한다
 so that 결제 전에 주문 내용을 조정할 수 있다."

수용 기준:
- Given: 장바구니에 상품이 1개 이상 담겨 있을 때
  When: 수량을 1~99 사이의 값으로 변경하면
  Then: 총 금액이 자동으로 재계산된다

[나쁜 예]
"장바구니 수량 변경 기능 구현"
→ 누구를 위한 건지, 왜 필요한지 알 수 없음
→ 완료 기준 없음
```

스토리를 태스크로 분해:
```
스토리: "사용자가 소셜 로그인으로 가입할 수 있다"

태스크:
  □ Google OAuth 2.0 클라이언트 설정 (0.5일)
  □ 백엔드 OAuth 콜백 API 구현 (1일)
  □ 프론트엔드 소셜 로그인 버튼 UI (0.5일)
  □ 기존 이메일 계정과 소셜 계정 연동 로직 (1일)
  □ 단위 테스트 및 통합 테스트 (0.5일)
```

## 관련 개념

- [Scrum](/knowledge/software-engineering/agile-methods/scrum/)
- [Story Points](/knowledge/software-engineering/agile-methods/story-points/)
- [Agile Software Development](/knowledge/software-engineering/agile-methods/agile-software-development/)
- [Design Spike](/knowledge/software-engineering/project-management/design-spike/)
