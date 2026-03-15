---
title: "개발자-QA 협업 (Developer-QA Collaboration)"
description: "개발자와 QA 엔지니어가 버그의 재현·수정·검증 과정에서 긴밀하게 협력하여 버그 수정 사이클을 효율화하는 팀 실천이다."
tags: ["Software Engineering", "Testing", "QA", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/developer-qa-collaboration
sidebar:
  order: 11
---

## 핵심 개념

개발자와 QA의 비효율적 관계: QA가 버그를 발견하면 버그 트래커에 올리고, 개발자는 재현이 안 된다고 닫아버리고, QA는 다시 재열고, 개발자는 또 닫는다. 이 핑퐁 게임은 시간과 에너지를 낭비한다. 효과적인 협력은 이 사이클을 3단계로 단축한다.

## 동작 원리

버그 수정의 최적 사이클:

```
1. QA가 버그 발견 → 명확한 재현 단계와 스크린샷/로그 첨부
2. 개발자에게 직접 보여주기 (버그 트래커만 아니라)
3. 개발자가 수정 후 "이 테스트 케이스로 검증해주세요"라고 구체적 요청
4. QA가 해당 케이스 + 회귀 테스트 실행
```

QA의 효과적 버그 리포트 요소:
- 재현 단계 (Step 1, 2, 3...)
- 예상 동작 vs 실제 동작
- 환경 정보 (OS, 브라우저, 버전)
- 스크린샷, 로그, 에러 메시지

개발자의 역할: QA를 적으로 보지 않고, 버그를 사용자 전에 발견해주는 동맹으로 인식한다.

## 예시

- 버그 재현 회의: QA와 개발자가 함께 앉아 5분 안에 버그 재현 → 원인 파악 시간 단축
- "어떤 입력값으로 재현되나요?" → QA: "userId=999이고 role=guest일 때 발생합니다" → 즉시 테스트 작성
- 버그 수정 후: "회원가입 → 로그아웃 → 로그인 → 프로필 접근" 시나리오로 검증 요청

## 관련 개념

- [자동화 테스트](/knowledge/software-engineering/testing/automated-testing/)
- [회귀 테스트](/knowledge/software-engineering/testing/regression-testing/)
- [블랙박스 테스트](/knowledge/software-engineering/testing/black-box-testing/)
