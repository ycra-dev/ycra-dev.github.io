---
title: "CI Is Alerting"
description: "CI와 프로덕션 모니터링/알림이 동일한 개념적 프레임워크를 공유한다는 통찰로, 가능한 빨리 자동으로 문제를 식별하는 공통 목적을 가짐"
tags: ["Software Engineering", "CI/CD", "Monitoring"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/ci-is-alerting
sidebar:
  order: 325
---

## 핵심 개념

"CI는 알림이다(CI Is Alerting)"는 CI와 프로덕션 모니터링/알림이 동일한 개념적 프레임워크를 공유한다는 통찰이다. CI가 배포 전 문제를 테스트 실패로 감지하고, 알림이 배포 후 문제를 메트릭으로 감지한다. 둘 다 가능한 빨리 자동으로 문제를 식별하는 것을 목적으로 한다.

## 동작 원리

CI와 알림은 개발자 워크플로에서 동일한 목적을 수행한다. CI는 워크플로의 초기(왼쪽)를 담당하고, 알림은 후기(오른쪽)를 담당한다.

공유하는 개념적 프레임워크:
- 지역적 신호(단위 테스트, 격리된 통계) vs 교차 의존성 신호(통합 테스트, 블랙박스 프로빙)
- 취약한 원인 기반 경고/테스트: 임의의 임계값/불변량 위반, 전체 건강과의 근본적 연결 부재
- 충실도 vs 비용 트레이드오프: End-to-end 신호가 가장 높은 충실도지만 flakiness, 리소스 비용, 디버깅 난이도도 높음

SRE에서 배울 수 있는 CI 정책 제안:
1. CI 100% green rate는 프로덕션 100% 가동률만큼 비싸다
2. 모든 경고를 동등하게 취급하는 것은 올바르지 않다 - 실제 영향이 없으면 무시가 정답
3. "최신 CI가 green이 아니면 커밋 금지" 정책은 잘못된 방향일 수 있다

## 예시

SRE 유추:
- flaky 테스트 = 몇 분마다 울리는 거짓 알람 → 둘 다 actionable하지 않으면 제거해야
- 원인 기반 경고: "한 시간 전 재시도 증가" → 유용한 디버깅 정보지만 이상적 감지 방법은 아님
- 취약한 테스트: "JPEG 압축기가 다른 바이트를 반환" → 디버깅에 유용하지만 이상적 테스트는 아님

SRE의 "Error Budget" 개념을 CI에 적용: 완벽함은 거의 최선의 목표가 아니다.

## 관련 개념

- [Test Automation Platform](/knowledge/software-engineering/testing/test-automation-platform/)
- [Hermetic Testing in CI](/knowledge/software-engineering/testing/hermetic-testing-in-ci/)
