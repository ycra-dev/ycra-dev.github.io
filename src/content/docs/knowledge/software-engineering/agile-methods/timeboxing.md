---
title: "Timeboxing"
description: "특정 활동에 고정된 시간 제한을 미리 설정하여 수확 체감을 방지하는 시간 관리 기법"
tags: ["Software Engineering", "Productivity", "Time Management", "Agile"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/timeboxing
sidebar:
  order: 43
---

## 핵심 개념

타임박싱(Timeboxing)은 특정 활동에 고정된 시간 제한을 미리 설정하여 수확 체감(diminishing returns)을 방지하는 시간 관리 기법이다. 리서치, 디버깅, 스파이크 등 "더 하면 더 좋을 것 같은" 활동을 적절한 시점에 멈추게 해준다.

## 동작 원리

프로세스:
1. 작업 시작 전에 시간 제한 설정 (예: 30분)
2. 타이머가 끝나면 진전이 있으면 두 번째 타임박스 설정
3. 두 번째에도 해결 안 되면 즉시 도움 요청

멈추는 것에는 훈련이 필요하다 — "조금만 더 하면 될 것 같은데"라는 유혹을 이겨내야 한다. 자기 책임감을 유지하면서도 무한 삽질을 방지하는 균형점을 찾는 것이 핵심이다.

스크럼에서의 타임박싱:
- 스프린트 자체가 타임박스 (2주)
- 일일 스탠드업 (15분)
- 스프린트 계획 (4시간)
- 스프린트 회고 (2시간)

## 예시

신입 개발자의 효과적 질문 타임박스:
```
"이 버그를 30분 안에 파악해보겠다"
  → 30분 후 진전 없음
  → 시니어에게 질문

질문 시 포함할 내용:
  1. 문제: API 응답이 항상 500 에러 반환
  2. 시도한 것: 로그 확인, 디버거로 X 지점까지 추적
  3. 발견한 것: Y 변수가 예상과 다른 값 가짐
  4. 추측: Z 서비스와의 통신 문제일 수 있음
```

개인 연구 타임박싱:
```
"새로운 라이브러리를 30분 동안 조사한 후 결정하겠다"
  → 30분: 문서, 예시, 이슈 훑기
  → 결정: 채택 or 포기 or 추가 30분 타임박스

무한 리서치 방지:
  ❌ "완전히 이해하고 나서 시작할게요" → 무한 지연
  ✓ "30분 조사 후 프로토타입 시작" → 실행 우선
```

## 관련 개념

- [Four Stages of Competence](/knowledge/software-engineering/foundations/four-stages-of-competence/)
- [Design Spike](/knowledge/software-engineering/project-management/design-spike/)
- [Task Decomposition](/knowledge/software-engineering/project-management/task-decomposition/)
