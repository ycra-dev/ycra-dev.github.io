---
title: "Design Spike"
description: "시간 제한이 있는 탐색적 조사로 설계 불확실성을 제거하는 기법"
tags: ["Software Engineering", "Agile", "Design", "Prototyping"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/design-spike
sidebar:
  order: 29
---

## 핵심 개념

디자인 스파이크(Design Spike)는 시간 제한이 있는 탐색적 조사(timeboxed exploration)다. Extreme Programming(XP)에서 유래했으며, 설계 기간 중 깊은 사고와 예측 가능한 전달 사이의 긴장을 관리하는 방법이다. 스파이크의 목적은 코드를 완성하는 것이 아니라 최대한 빨리 많이 배우는 것이다.

## 동작 원리

스파이크는 스프린트에 별도의 태스크로 할당하여 다른 작업 걱정 없이 깊은 사고에 집중할 수 있게 한다. 실험적 코드를 작성하여 아이디어를 검증한다:
- 초안 API 작성
- 부분 구현으로 가능성 확인
- 성능 테스트
- A/B 테스트

핵심 원칙:
- **실험 코드에 집착하지 말 것**: 증명 후 버리거나 재작성한다
- **테스트나 폴리싱에 시간 쓰지 말 것**: 완성도보다 학습이 목적이다
- **시간 제한 준수**: 타임박스가 끝나면 결과를 공유하고 다음 단계를 결정한다

RFD(Request for Decision)는 경량 설계 리뷰로, 스파이크보다 빠른 팀 내 의사결정에 적합하다.

## 예시

```
[스파이크 정의]
목표: 새 캐시 레이어가 P99 지연을 개선하는지 확인
기간: 2일
담당: 이개발

[스파이크 실행]
1. Redis 프로토타입 구현 (완성도 필요 없음)
2. 벤치마크 실행
   → 결과: P99 800ms → 120ms (85% 개선)
3. 결과를 팀과 공유

[스파이크 결과]
✓ 캐시 도입 타당성 확인
→ 본격 설계 문서 작성으로 진행
→ 프로토타입 코드는 폐기 후 재구현
```

스파이크 vs 일반 태스크:
```
일반 태스크:
  - 완성된 코드 필요
  - 테스트 포함
  - 코드 리뷰 통과
  - 프로덕션 배포

스파이크:
  - 실험 코드만 필요 (버릴 것)
  - 테스트 불필요
  - 리뷰 불필요
  - 배포 없음
  → 빠른 학습이 목적
```

## 관련 개념

- [Design Document](/knowledge/software-engineering/project-management/design-document/)
- [Timeboxing](/knowledge/software-engineering/agile-methods/timeboxing/)
- [Task Decomposition](/knowledge/software-engineering/project-management/task-decomposition/)
- [YAGNI](/knowledge/software-engineering/design-and-evolution/yagni/)
