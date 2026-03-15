---
title: "스토리 포인트 (Story Points)"
description: "사용자 스토리의 복잡도와 노력을 나타내는 상대적 추정 단위"
tags: ["Software Engineering", "Agile", "Estimation", "Scrum"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/story-points
sidebar:
  order: 41
---

## 핵심 개념

스토리 포인트(Story Points)는 사용자 스토리의 복잡도, 노력, 불확실성을 종합적으로 나타내는 상대적 추정 단위이다. 절대적인 시간(예: 3일)이 아니라 다른 작업과의 상대적 크기를 비교하여 산정한다. 팀 간 비교는 의미 없으며, 각 팀의 속도(velocity)를 측정하는 데 사용된다.

## 동작 원리

왜 시간이 아닌 포인트인가:
- 시간 추정은 개인마다 다르다 (시니어 1일 = 주니어 3일)
- 시간 추정은 "약속"처럼 느껴져 압박감을 만들고 과소추정을 유발
- 회의, 코드 리뷰 등 부수 작업을 빼먹기 쉽다

피보나치 수열 기반 사이징: 1, 2, 3, 5, 8, 13, 21. 작업이 클수록 불확실성이 커지므로 세밀한 구분(6 vs 7)이 무의미하다.

**플래닝 포커(Planning Poker)**: 팀원이 동시에 카드를 공개하여 앵커링 편향을 방지한다. 추정치가 크게 다르면 가정의 차이를 토론한다.

**벨로시티(Velocity)**: 한 스프린트에서 완료한 스토리 포인트의 합. 여러 스프린트를 거치면 예측에 활용 가능.

## 예시

상대적 추정:
```
기준점(Anchor): "단일 필드 유효성 검사 추가" = 1 포인트

추정 대상:
- "버튼 텍스트 변경" → 1 포인트
- "새로운 CRUD API" → 5 포인트
- "결제 시스템 연동" → 13 포인트 (불확실성 높음)
- "DB 마이그레이션 + 무중단 배포" → 21 포인트 (분해 필요!)
```

플래닝 포커 세션:
```
스토리: "사용자 프로필 이미지 업로드 기능"

[동시 공개]
  김개발: 5    박개발: 8    이개발: 5    최개발: 13

[토론]
  최개발(13): "이미지 리사이징, CDN 설정, EXIF 처리까지 하면 복잡해요"
  김개발(5):  "CDN은 이미 있고 리사이징 라이브러리도 있어요"
  최개발:     "그럼 8로 수정합니다"

[재투표] → 합의: 8 포인트
```

벨로시티 활용:
```
최근 5스프린트: 28, 32, 25, 30, 35
평균: 30 포인트/스프린트

남은 백로그: 120 포인트
예상 완료: 120 ÷ 30 = 약 4스프린트 (8주)
→ PM에게 "약 2개월 소요 예상" 커뮤니케이션
```

## 관련 개념

- [사용자 스토리 (User Story)](/knowledge/software-engineering/agile-methods/user-story/)
- [스크럼 (Scrum)](/knowledge/software-engineering/agile-methods/scrum/)
- [애자일 소프트웨어 개발 (Agile Software Development)](/knowledge/software-engineering/agile-methods/agile-software-development/)
