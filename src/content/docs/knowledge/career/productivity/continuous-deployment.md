---
title: "Continuous Deployment (지속적 배포)"
description: "코드 변경이 자동화된 테스트를 통과하면 사람의 개입 없이 자동으로 프로덕션에 배포되는 릴리스 방식으로, 반복 속도와 안정성을 동시에 높인다"
tags: ["Career", "Productivity", "DevOps", "Engineering-Practice"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/productivity/continuous-deployment
sidebar:
  order: 211
---

## 핵심 개념

지속적 배포(Continuous Deployment)는 코드 변경이 자동화된 테스트를 통과하면 사람의 개입 없이 자동으로 프로덕션 서버에 배포되는 소프트웨어 릴리스 방식이다.

Quora의 사례: 하루에 40-50번 새 버전을 릴리스. 각 변경은 커밋 후 7분 만에 수천 개의 테스트를 통과하고 프로덕션에 배포. 대부분의 회사가 주간/월간/분기별 릴리스를 하는 것과 대조적이다.

## 동작 원리

**지속적 배포가 강력한 4가지 이유:**

1. **작고 점진적인 변경**: 대규모 배치 변경 대신 소규모 증분 변경으로 추론이 쉬워짐
2. **빠른 버그 수정**: 한 번의 세션에서 수정-배포-검증 사이클 완료 가능
3. **쉬운 디버깅**: 문제 발생 시 최근 소수의 변경만 조사하면 됨 (주간 릴리스는 수백 개 변경 조사 필요)
4. **실시간 데이터 수집**: 로깅 추가 후 수 분 내 데이터 확인 가능

**대규모 기능은 feature flag로 제어**: 준비될 때까지 비활성화하고, 내부 팀 → 베타 사용자 → 일부 트래픽 순서로 선택적 활성화.

**지원 인프라**: 자동 버전 관리/패키징, 병렬화된 테스트 프레임워크, 카나리 서버, 종합 대시보드/알림, 쉬운 롤백 도구.

## 예시

```bash
# 지속적 배포 파이프라인 (개념적)
git commit -m "Fix user signup validation"
  → 자동 빌드
  → 수천 개 유닛/통합 테스트 병렬 실행
  → 카나리 서버에 배포 & 검증
  → 프로덕션 롤아웃
  → 대시보드 모니터링
  → 이상 시 자동 롤백

# DB 스키마 마이그레이션의 차이
# 전통적 릴리스: 5단계 × 주간 릴리스 = 5주
# 지속적 배포: 5번 연속 배포 = 수 시간
```

Wealthfront: 금융 서비스(10억 달러 자산 관리)에서도 하루 30회 이상 배포. "주요 장점은 위험 감소"라고 전 CTO가 설명했다. 큰 배포가 아닌 작은 배포가 더 안전하다.

## 관련 개념

- [Iteration Speed](/knowledge/career/productivity/iteration-speed/) - 지속적 배포는 반복 속도를 극적으로 높인다
- [Time-Saving Tools](/knowledge/career/productivity/time-saving-tools/) - CD 파이프라인은 최고의 시간 절약 도구다
- [A/B Testing](/knowledge/career/foundations/ab-testing/) - CD로 A/B 테스트의 주기가 빨라진다
- [Automated Testing](/knowledge/software-engineering/foundations/automated-testing/) - CD는 자동화 테스트 없이는 불가능하다
