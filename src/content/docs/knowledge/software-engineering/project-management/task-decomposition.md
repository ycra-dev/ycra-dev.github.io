---
title: "작업 분해 (Task Decomposition)"
description: "크고 복잡한 작업을 더 작고 관리 가능한 하위 작업으로 나누는 기법"
tags: ["Software Engineering", "Project Management", "Productivity"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/task-decomposition
sidebar:
  order: 27
---

## 핵심 개념

작업 분해(Task Decomposition)는 크고 복잡한 작업을 더 작고 관리 가능한 하위 작업으로 나누는 기법이다. "완료(Done)"를 정의하기 위한 전제 조건이 작업 분해이다. 큰 작업의 완료 시점은 판단하기 어렵지만, 잘 분해된 작은 작업은 끝났는지 아닌지를 명확히 알 수 있다.

## 동작 원리

작업 분해의 원칙:
- **명확한 완료 기준**: 각 하위 작업에 대해 "done"이 무엇인지 정의
- **측정 가능한 단위**: 진행 상황을 추적할 수 있는 크기
- **독립적 실행 가능**: 각 하위 작업을 독립적으로 수행할 수 있도록
- **테스트로 검증**: 가능하면 테스트 코드로 완료를 증명

"Done"의 조건은 명확(Clear), 가시적(Visible), 달성 가능(Achievable)해야 한다.

스마트하게 일하기:
- 필요한 것 이상을 하지 않는다 (YAGNI)
- 자동화할 수 있는 것은 자동화한다
- 우선순위를 정하고 가장 중요한 것부터 한다

## 예시

```
# 나쁜 작업 정의:
"사용자 인증 시스템 구현" → 너무 크고 모호

# 좋은 분해:
1. [x] 사용자 모델 정의 (email, password_hash)
2. [x] 비밀번호 해싱 유틸리티 작성
3. [ ] 회원가입 API 엔드포인트 구현
4. [ ] 로그인 API 엔드포인트 구현
5. [ ] JWT 토큰 생성/검증 구현
6. [ ] 인증 미들웨어 작성
7. [ ] 통합 테스트 작성

→ 각 항목은 1-4시간 내 완료 가능
→ 진행 상황을 정확히 추적 가능
```

## 관련 개념

- [YAGNI 원칙 (YAGNI)](/knowledge/software-engineering/design-and-evolution/yagni/)
- [테스트 주도 개발 (Test-Driven Development)](/knowledge/software-engineering/testing/test-driven-development/)
- [설계 스파이크 (Design Spike)](/knowledge/software-engineering/project-management/design-spike/)
- [타임박싱 (Timeboxing)](/knowledge/software-engineering/agile-methods/timeboxing/)
