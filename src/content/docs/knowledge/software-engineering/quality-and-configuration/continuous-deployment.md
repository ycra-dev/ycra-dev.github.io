---
title: "지속적 배포 (Continuous Deployment)"
description: "코드 변경이 자동화된 파이프라인을 통과하면 수동 승인 없이 자동으로 프로덕션에 배포되는 소프트웨어 릴리즈 자동화 방식이다."
tags: ["Software Engineering", "CI/CD", "DevOps", "Automation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/continuous-deployment
sidebar:
  order: 13
---

## 핵심 개념

CI/CD 파이프라인의 마지막 단계다. CI(지속적 통합)는 코드를 합치고 테스트하는 것이고, CD(지속적 배포)는 합격한 코드를 자동으로 서버에 올리는 것이다. 지속적 배포(Continuous Deployment)와 지속적 전달(Continuous Delivery)을 구분해야 한다: 전달은 마지막 단계에 수동 승인이 있고, 배포는 완전 자동이다.

**지속적 배포가 강력한 4가지 이유:**

1. **작고 점진적인 변경**: 대규모 배치 변경 대신 소규모 증분 변경으로 추론이 쉬워짐
2. **빠른 버그 수정**: 한 번의 세션에서 수정-배포-검증 사이클 완료 가능
3. **쉬운 디버깅**: 문제 발생 시 최근 소수의 변경만 조사하면 됨 (주간 릴리스는 수백 개 변경 조사 필요)
4. **실시간 데이터 수집**: 로깅 추가 후 수 분 내 데이터 확인 가능

## 동작 원리

```
[코드 푸시]
    ↓
[빌드] → 실패 시 알림, 머지 차단
    ↓
[단위 테스트] → 실패 시 중단
    ↓
[통합 테스트] → 실패 시 중단
    ↓
[스테이징 배포] → 스모크 테스트
    ↓
[프로덕션 배포] ← 지속적 전달은 여기서 승인 필요
    ↓
[모니터링] → 이상 시 자동 롤백
```

핵심 요소:
- **기능 플래그(Feature flags)**: 배포와 릴리즈를 분리 (코드는 배포되어 있지만 기능은 끄기)
- **카나리 배포**: 전체 트래픽의 1-5%에만 먼저 배포하여 검증
- **블루-그린 배포**: 두 환경을 번갈아 사용하여 즉시 롤백 가능

## 예시

- GitHub Actions, GitLab CI, Jenkins, CircleCI로 파이프라인 구성
- AWS CodeDeploy: EC2 인스턴스에 자동 배포
- Kubernetes: `kubectl rollout` 명령으로 무중단 배포
- **Netflix**: 하루에 수백 번 프로덕션 배포
- **Quora**: 하루 40-50번 릴리스. 커밋 후 7분 만에 수천 개 테스트를 통과하고 프로덕션 배포
- **Wealthfront**: 금융 서비스(10억 달러 자산 관리)에서도 하루 30회 이상 배포. "주요 장점은 위험 감소" — 큰 배포가 아닌 작은 배포가 더 안전하다

## 관련 개념

- [지속적 통합](/knowledge/software-engineering/agile-methods/continuous-integration/)
- [데브옵스 (DevOps)](/knowledge/software-engineering/quality-and-configuration/system-building/)
- [버전 관리](/knowledge/software-engineering/quality-and-configuration/version-management/)
- [Iteration Speed](/knowledge/career/productivity/iteration-speed/) - 지속적 배포는 반복 속도를 극적으로 높인다
- [자동화 테스팅](/knowledge/software-engineering/foundations/automated-testing/) - CD는 자동화 테스트 없이는 불가능하다
