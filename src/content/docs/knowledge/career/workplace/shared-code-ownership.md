---
title: "Shared Code Ownership (공유 코드 소유권)"
description: "팀 내 여러 엔지니어가 코드와 시스템에 대한 지식을 공유하여 버스 팩터를 높이고 개인 병목을 제거하는 팀 관행이다"
tags: ["Career", "Workplace", "Team Building", "Engineering"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/workplace/shared-code-ownership
sidebar:
  order: 217
---

## 핵심 개념

**버스 팩터(Bus Factor)**: 팀이 기능을 유지하기 위해 최소 몇 명이 필요한지를 나타내는 수치. 버스 팩터 1 = 핵심 인원 1명이 아프거나 퇴사하면 프로젝트가 중단된다.

혼자만 코드를 소유하는 것이 유혹적인 이유는 지식의 희소성이 높은 수요와 가치를 만든다는 착각 때문이다. 실제로는 고우선순위 버그가 항상 자신에게 라우팅되고, 유지보수/장애 대응에 시간이 묶이며, 새로운 것을 배우고 만들 자유를 잃는다.

## 동작 원리

Facebook의 Nimrod Hoofien: "아무도 유일하게 한 가지를 할 수 있는 위치에 놓여서는 안 된다. 모든 작업을 여러 사람이 할 수 있어야 개발의 자유도와 유연성이 높아진다."

공유 소유권 증진 전략:
- 1인 팀 회피 (단독 소유자 없애기)
- 코드 리뷰 상호 수행
- 태스크/책임 로테이션
- 높은 코드 가독성 유지
- 소프트웨어 결정에 대한 테크 토크 진행
- 설계 문서 및 코드 주석 문서화
- 복잡한 워크플로우/우회법 문서화
- 다른 팀원 교육/멘토링에 시간 투자

## 예시

```
# 버스 팩터 개선 전략

before = {
    "로그 프로세서": ["엔지니어A"],       # bus factor = 1 (위험!)
    "결제 시스템": ["엔지니어B"],         # bus factor = 1 (위험!)
    "웹 프론트엔드": ["엔지니어C", "엔지니어D"]  # bus factor = 2 (OK)
}

after = {
    "로그 프로세서": ["엔지니어A", "엔지니어C"],  # 페어 리뷰 + 문서화
    "결제 시스템": ["엔지니어B", "엔지니어D"],    # 로테이션
    "웹 프론트엔드": ["엔지니어C", "엔지니어D", "엔지니어A"]  # 크로스 학습
}

# 개선 결과: 누구나 온콜 가능
# → 시니어는 새 프로젝트에 집중, 주니어는 시스템 학습 기회
```

- Ooyala 하와이 사례: 저자가 로그 프로세서의 유일한 전문가로 마우나 로아 화산 하이킹 중 "Logs processor down" 문자를 받음 — 팀, 고객, 저자 모두에게 나쁜 상황

## 관련 개념

- [Onboarding](/knowledge/career/workplace/onboarding/) - 온보딩을 통해 신입도 코드 오너십에 참여
- [Engineering Culture](/knowledge/career/workplace/engineering-culture/) - 공유 소유권은 좋은 엔지니어링 문화의 핵심 요소
- [Post-Mortems](/knowledge/career/workplace/post-mortems/) - 장애 발생 시 공유 소유권이 빠른 해결을 가능하게 함
