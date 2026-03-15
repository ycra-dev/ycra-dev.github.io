---
title: "OKR (목표와 핵심 결과)"
description: "목표와 핵심 결과를 쌍으로 정의하여 조직과 개인의 성과를 측정하는 목표 설정 프레임워크"
tags: ["Software Engineering", "Goal Setting", "Management", "Productivity"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/okr
sidebar:
  order: 31
---

## 핵심 개념

OKR(Objectives and Key Results)은 목표(Objective)와 핵심 결과(Key Results)를 쌍으로 정의하여 조직과 개인의 성과를 측정하는 목표 설정 프레임워크이다. Intel에서 시작되어 Google을 비롯한 많은 기술 기업에서 채택하고 있다.

## 동작 원리

OKR의 구조:

- **Objective (목표):** 정성적이고 영감을 주는 방향성. "무엇을 달성할 것인가"를 명확하게 표현한다. 측정 가능할 필요는 없지만, 구체적이고 행동 지향적이어야 한다.
- **Key Results (핵심 결과):** 목표 달성 여부를 판단하는 정량적 지표. 보통 목표당 2~5개의 KR을 설정한다. KR은 할 일(to-do) 목록이 아니라, 달성 지표(measurable outcome)여야 한다.

연쇄(Cascading) 구조: OKR은 회사 → 부서 → 팀 → 개인으로 연쇄된다. 개인의 작업이 조직의 큰 그림과 어떻게 연결되는지 명확해진다.

Stretch Goal 철학: OKR은 의도적으로 도전적인 목표를 설정한다. 100% 달성이 목표가 아니라, **60~80% 달성이 이상적**이다. 만약 매번 100% 달성한다면 목표가 너무 쉽게 설정된 것이다.

주기와 리듬: 보통 분기별로 OKR을 설정하고, 분기 말에 달성도를 점수화(0.0~1.0)하고 회고한다.

흔한 실수:
- KR을 할 일 목록으로 작성하는 것 (예: "디자인 문서 작성" → 태스크이지 결과가 아님)
- 너무 많은 OKR을 설정하여 집중이 분산되는 것
- OKR을 성과 평가와 직접 연결하여 도전적 목표 설정을 억제하는 것

## 예시

좋은 OKR vs 나쁜 OKR:

```
[좋은 OKR]
Objective: 결제 시스템의 신뢰성을 세계 수준으로 끌어올린다

Key Results:
  KR1: 결제 성공률 99.5% → 99.95%로 향상
  KR2: 결제 처리 평균 응답 시간 800ms → 200ms 이하로 단축
  KR3: 결제 관련 고객 불만 접수 건수 월 50건 → 10건 이하로 감소

→ 모든 KR이 측정 가능하고, 현재 상태와 목표 상태가 명확

[나쁜 OKR]
Objective: 결제 시스템 개선

Key Results:
  KR1: 결제 버그 수정하기
  KR2: 결제 모니터링 대시보드 만들기
  KR3: 결제 코드 리팩토링하기

→ KR이 할 일 목록이지 달성 지표가 아님
→ "개선"이 무엇을 의미하는지 불명확
```

연쇄 구조 예시:

```
[회사 OKR]
O: 아시아 시장에서 1위 플랫폼이 된다
  KR1: 일본/한국 MAU 50만 달성
  KR2: 현지 결제 수단 5개 이상 지원

    ↓ 연쇄

[엔지니어링 팀 OKR]
O: 아시아 사용자를 위한 최적의 사용 경험을 제공한다
  KR1: 아시아 리전 API 응답 시간 100ms 이하 달성
  KR2: 일본어/한국어 번역 커버리지 95% 이상
  KR3: 카카오페이, 라인페이 결제 연동 완료

    ↓ 연쇄

[개인 OKR - 백엔드 엔지니어]
O: 아시아 결제 연동을 성공적으로 완료한다
  KR1: 카카오페이 결제 API 연동 및 프로덕션 배포 완료
  KR2: 결제 연동 테스트 커버리지 90% 이상
  KR3: 결제 실패율 0.5% 이하 유지
```

## 관련 개념

- [일대일 미팅 (One-on-One Meeting)](/knowledge/software-engineering/project-management/one-on-one-meeting/)
- [SBI 프레임워크 (SBI Framework)](/knowledge/software-engineering/project-management/sbi-framework/)
- [커리어 래더 (Career Ladder)](/knowledge/software-engineering/project-management/career-ladder/)
